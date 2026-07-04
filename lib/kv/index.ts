import { isKvConfigured } from '@/lib/kv/config';

export { isKvConfigured } from '@/lib/kv/config';

/**
 * KV Storage Utilities for Admin Panel
 *
 * Uses Cloudflare Workers KV binding via getRequestContext()
 * instead of @vercel/kv REST API.
 */

// ─── Cloudflare KV client ────────────────────────────────────────────

type CloudflareKV = {
  get(key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream' }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number; metadata?: unknown }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{
    keys: Array<{ name: string; metadata?: unknown }>;
    list_complete: boolean;
    cursor?: string;
  }>;
};

async function getKV(): Promise<CloudflareKV | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = getCloudflareContext();
    const kv = (ctx.env as Record<string, unknown>).KV as CloudflareKV | undefined;
    return kv ?? null;
  } catch {
    return null;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────

async function kvGetJSON<T>(key: string): Promise<T | null> {
  const kv = await getKV();
  if (!kv) return null;
  try {
    const raw = await kv.get(key, { type: 'text' });
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function kvSetJSON(key: string, value: unknown): Promise<void> {
  const kv = await getKV();
  if (!kv) throw new Error('KV not available');
  await kv.put(key, JSON.stringify(value));
}

async function kvDelete(key: string): Promise<void> {
  const kv = await getKV();
  if (!kv) return;
  await kv.delete(key);
}

async function kvListKeys(prefix: string): Promise<string[]> {
  const kv = await getKV();
  if (!kv) return [];
  const allKeys: string[] = [];
  let cursor: string | undefined;
  do {
    const result = await kv.list({ prefix, limit: 1000, cursor });
    for (const k of result.keys) {
      allKeys.push(k.name);
    }
    cursor = result.list_complete ? undefined : result.cursor;
  } while (cursor);
  return allKeys;
}

// ─── Types ───────────────────────────────────────────────────────────

const defaultStats = (): DashboardStats => ({
  newLeadsToday: 0,
  totalLeads: 0,
  chatbotSessionsToday: 0,
  lastContentUpdate: 'Never',
});

// Demo Mode
export async function getDemoMode(): Promise<boolean> {
  if (!(await isKvConfigured())) return false;
  try {
    const enabled = await kvGetJSON<boolean>('demo_mode');
    return enabled || false;
  } catch (error) {
    console.error('Error getting demo mode:', error);
    return false;
  }
}

export async function setDemoMode(enabled: boolean): Promise<void> {
  if (!(await isKvConfigured())) return;
  try {
    await kvSetJSON('demo_mode', enabled);
  } catch (error) {
    console.error('Error setting demo mode:', error);
    throw error;
  }
}

// Stats
export interface DashboardStats {
  newLeadsToday: number;
  totalLeads: number;
  chatbotSessionsToday: number;
  lastContentUpdate: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!(await isKvConfigured())) return defaultStats();
  try {
    const stats = await kvGetJSON<DashboardStats>('dashboard_stats');
    return stats || defaultStats();
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    return defaultStats();
  }
}

export async function updateDashboardStats(
  stats: Partial<DashboardStats>
): Promise<void> {
  if (!(await isKvConfigured())) return;
  try {
    const current = await getDashboardStats();
    await kvSetJSON('dashboard_stats', {...current, ...stats});
  } catch (error) {
    console.error('Error updating dashboard stats:', error);
    throw error;
  }
}

// Leads
export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  locale: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export async function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> {
  if (!(await isKvConfigured())) return '';
  try {
    const id = `lead:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    const leadData: Lead = {
      ...lead,
      id,
      status: lead.status || 'new',
      createdAt: new Date().toISOString()
    };

    await kvSetJSON(id, leadData);

    // Update stats
    const stats = await getDashboardStats();
    await updateDashboardStats({
      totalLeads: stats.totalLeads + 1,
      newLeadsToday: stats.newLeadsToday + 1
    });

    return id;
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
}

export async function getLeads(): Promise<Lead[]> {
  if (!(await isKvConfigured())) return [];
  try {
    const keys = await kvListKeys('lead:');
    if (keys.length === 0) return [];

    const leads = await Promise.all(
      keys.map(key => kvGetJSON<Lead>(key))
    );

    return leads
      .filter((lead): lead is Lead => lead !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error getting leads:', error);
    return [];
  }
}

export async function updateLeadStatus(
  leadId: string,
  status: Lead['status']
): Promise<void> {
  if (!(await isKvConfigured())) return;
  try {
    const lead = await kvGetJSON<Lead>(leadId);
    if (lead) {
      await kvSetJSON(leadId, {...lead, status});
    }
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }
}

// Chatbot Sessions
export interface ChatSession {
  id: string;
  sessionId: string;
  locale: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  createdAt: string;
  lastActivityAt: string;
  read: boolean;
  flagged: boolean;
}

export async function saveChatSession(
  sessionId: string,
  locale: string,
  userMessage: string,
  assistantMessage: string
): Promise<void> {
  if (!(await isKvConfigured())) return;
  try {
    const key = `chat:${sessionId}`;
    const existing = await kvGetJSON<ChatSession>(key);
    const now = new Date().toISOString();

    const message = {
      role: 'user' as const,
      content: userMessage,
      timestamp: now,
    };

    const assistantMsg = {
      role: 'assistant' as const,
      content: assistantMessage,
      timestamp: now,
    };

    if (existing) {
      existing.messages.push(message, assistantMsg);
      existing.lastActivityAt = now;
      existing.read = false;
      await kvSetJSON(key, existing);
    } else {
      const session: ChatSession = {
        id: key,
        sessionId,
        locale,
        messages: [message, assistantMsg],
        createdAt: now,
        lastActivityAt: now,
        read: false,
        flagged: false,
      };
      await kvSetJSON(key, session);

      const stats = await getDashboardStats();
      await updateDashboardStats({
        chatbotSessionsToday: stats.chatbotSessionsToday + 1,
      });
    }
  } catch (error) {
    console.error('Error saving chat session:', error);
  }
}

export async function updateChatSession(
  sessionId: string,
  updates: Partial<Pick<ChatSession, 'read' | 'flagged'>>
): Promise<ChatSession | null> {
  if (!(await isKvConfigured())) return null;
  try {
    const key = `chat:${sessionId}`;
    const existing = await kvGetJSON<ChatSession>(key);
    if (!existing) return null;

    const updated: ChatSession = {...existing, ...updates};
    await kvSetJSON(key, updated);
    return updated;
  } catch (error) {
    console.error('Error updating chat session:', error);
    throw error;
  }
}

export async function getChatSessions(): Promise<ChatSession[]> {
  if (!(await isKvConfigured())) return [];
  try {
    const keys = await kvListKeys('chat:');
    if (keys.length === 0) return [];

    const sessions = await Promise.all(
      keys.map(key => kvGetJSON<ChatSession>(key))
    );

    return sessions
      .filter((session): session is ChatSession => session !== null)
      .map(session => ({
        ...session,
        lastActivityAt: session.lastActivityAt ?? session.createdAt,
        read: session.read ?? true,
        flagged: session.flagged ?? false,
      }))
      .sort(
        (a, b) =>
          new Date(b.lastActivityAt).getTime() -
          new Date(a.lastActivityAt).getTime()
      );
  } catch (error) {
    console.error('Error getting chat sessions:', error);
    return [];
  }
}

// Content
export async function getContent<T = unknown>(key: string, fallback: T): Promise<T> {
  if (!(await isKvConfigured())) return fallback;
  try {
    const content = await kvGetJSON<T>(`content:${key}`);
    return content || fallback;
  } catch (error) {
    console.error(`Error getting content for ${key}:`, error);
    return fallback;
  }
}

export async function setContent<T = unknown>(key: string, value: T): Promise<void> {
  if (!(await isKvConfigured())) return;
  try {
    await kvSetJSON(`content:${key}`, value);
    await updateDashboardStats({
      lastContentUpdate: new Date().toISOString()
    });
  } catch (error) {
    console.error(`Error setting content for ${key}:`, error);
    throw error;
  }
}

// Cleanup utilities
export async function clearChatLogs(): Promise<void> {
  if (!(await isKvConfigured())) return;
  try {
    const keys = await kvListKeys('chat:');
    if (keys.length > 0) {
      await Promise.all(keys.map(key => kvDelete(key)));
    }
  } catch (error) {
    console.error('Error clearing chat logs:', error);
    throw error;
  }
}

export async function resetContent(): Promise<void> {
  if (!(await isKvConfigured())) return;
  try {
    const keys = await kvListKeys('content:');
    if (keys.length > 0) {
      await Promise.all(keys.map(key => kvDelete(key)));
    }
  } catch (error) {
    console.error('Error resetting content:', error);
    throw error;
  }
}
