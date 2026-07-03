import {kv} from '@vercel/kv';
import {isKvConfigured} from '@/lib/kv/config';

export {isKvConfigured} from '@/lib/kv/config';

/**
 * KV Storage Utilities for Admin Panel
 */

const defaultStats = (): DashboardStats => ({
  newLeadsToday: 0,
  totalLeads: 0,
  chatbotSessionsToday: 0,
  lastContentUpdate: 'Never',
});

// Demo Mode
export async function getDemoMode(): Promise<boolean> {
  if (!isKvConfigured()) return false;

  try {
    const enabled = await kv.get<boolean>('demo_mode');
    return enabled || false;
  } catch (error) {
    console.error('Error getting demo mode:', error);
    return false;
  }
}

export async function setDemoMode(enabled: boolean): Promise<void> {
  if (!isKvConfigured()) return;

  try {
    await kv.set('demo_mode', enabled);
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
  if (!isKvConfigured()) return defaultStats();

  try {
    const stats = await kv.get<DashboardStats>('dashboard_stats');
    return stats || defaultStats();
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    return defaultStats();
  }
}

export async function updateDashboardStats(
  stats: Partial<DashboardStats>
): Promise<void> {
  if (!isKvConfigured()) return;

  try {
    const current = await getDashboardStats();
    await kv.set('dashboard_stats', {...current, ...stats});
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
  if (!isKvConfigured()) return '';

  try {
    const id = `lead:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    const leadData: Lead = {
      ...lead,
      id,
      status: lead.status || 'new',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(id, leadData);
    
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
  if (!isKvConfigured()) return [];

  try {
    const keys = await kv.keys('lead:*');
    if (keys.length === 0) return [];
    
    const leads = await Promise.all(
      keys.map(key => kv.get<Lead>(key))
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
  if (!isKvConfigured()) return;

  try {
    const lead = await kv.get<Lead>(leadId);
    if (lead) {
      await kv.set(leadId, {...lead, status});
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
  if (!isKvConfigured()) return;

  try {
    const key = `chat:${sessionId}`;
    const existing = await kv.get<ChatSession>(key);
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
      await kv.set(key, existing);
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
      await kv.set(key, session);

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
  if (!isKvConfigured()) return null;

  try {
    const key = `chat:${sessionId}`;
    const existing = await kv.get<ChatSession>(key);
    if (!existing) return null;

    const updated: ChatSession = {...existing, ...updates};
    await kv.set(key, updated);
    return updated;
  } catch (error) {
    console.error('Error updating chat session:', error);
    throw error;
  }
}

export async function getChatSessions(): Promise<ChatSession[]> {
  if (!isKvConfigured()) return [];

  try {
    const keys = await kv.keys('chat:*');
    if (keys.length === 0) return [];
    
    const sessions = await Promise.all(
      keys.map(key => kv.get<ChatSession>(key))
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
export async function getContent<T = any>(key: string, fallback: T): Promise<T> {
  if (!isKvConfigured()) return fallback;

  try {
    const content = await kv.get<T>(`content:${key}`);
    return content || fallback;
  } catch (error) {
    console.error(`Error getting content for ${key}:`, error);
    return fallback;
  }
}

export async function setContent<T = any>(key: string, value: T): Promise<void> {
  if (!isKvConfigured()) return;

  try {
    await kv.set(`content:${key}`, value);
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
  if (!isKvConfigured()) return;

  try {
    const keys = await kv.keys('chat:*');
    if (keys.length > 0) {
      await Promise.all(keys.map(key => kv.del(key)));
    }
  } catch (error) {
    console.error('Error clearing chat logs:', error);
    throw error;
  }
}

export async function resetContent(): Promise<void> {
  if (!isKvConfigured()) return;

  try {
    const keys = await kv.keys('content:*');
    if (keys.length > 0) {
      await Promise.all(keys.map(key => kv.del(key)));
    }
  } catch (error) {
    console.error('Error resetting content:', error);
    throw error;
  }
}
