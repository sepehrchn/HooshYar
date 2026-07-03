'use client';

import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {StatCard} from '@/components/admin/StatCard';
import {
  Inbox,
  MessageSquare,
  Users,
  Clock,
  ExternalLink,
  ToggleLeft,
} from 'lucide-react';
import {useAdminLocale} from '@/hooks/useAdminLocale';

export default function AdminDashboard() {
  const {data: session, status} = useSession();
  const {t, isRTL} = useAdminLocale();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8A91B0]">{t('loading')}</div>
      </div>
    );
  }

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <h1 className="text-3xl font-bold text-[#F2F4FF] mb-2">{t('dashboard')}</h1>
        <p className="text-[#8A91B0]">{t('dashboardSubtitle')}</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('newLeadsToday')}
          value="3"
          icon={Inbox}
          accent="cyan"
          subtitle={t('fromYesterday')}
        />
        <StatCard
          title={t('totalLeads')}
          value="47"
          icon={Users}
          accent="violet"
          subtitle={t('allTime')}
        />
        <StatCard
          title={t('chatSessionsToday')}
          value="12"
          icon={MessageSquare}
          accent="magenta"
          subtitle={t('today')}
        />
        <StatCard
          title={t('lastUpdate')}
          value="2h"
          icon={Clock}
          accent="muted"
          subtitle={t('ago')}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-sm rounded-xl border border-[rgba(255,255,255,0.12)] p-6">
          <h3 className="text-lg font-semibold text-[#F2F4FF] mb-4 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#3FE8F4]" />
            {t('recentLeads')}
          </h3>

          <div className="space-y-3">
            {[
              {
                name: 'محمد رضایی',
                service: 'AI Automation',
                time: isRTL ? '۵ دقیقه پیش' : '5 min ago',
                color: '#3FE8F4',
              },
              {
                name: 'Sara Johnson',
                service: 'Web Development',
                time: isRTL ? '۱ ساعت پیش' : '1 hour ago',
                color: '#9D5CFF',
              },
              {
                name: 'علی احمدی',
                service: 'Chatbot Development',
                time: isRTL ? '۳ ساعت پیش' : '3 hours ago',
                color: '#E63CD8',
              },
            ].map((lead, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#F2F4FF] mb-1">
                    {lead.name}
                  </div>
                  <div
                    className="text-xs px-2 py-0.5 rounded inline-block"
                    style={{
                      backgroundColor: `${lead.color}20`,
                      color: lead.color,
                    }}
                  >
                    {lead.service}
                  </div>
                </div>
                <div className="text-xs text-[#8A91B0]">{lead.time}</div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {false && (
            <div className="text-center py-8 text-[#8A91B0]">{t('noLeads')}</div>
          )}

          <button className="w-full mt-4 py-2 text-sm text-[#3FE8F4] hover:text-[#F2F4FF] transition-colors">
            {t('viewAllLeads')}
          </button>
        </div>

        {/* Recent Chatbot Sessions */}
        <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-sm rounded-xl border border-[rgba(255,255,255,0.12)] p-6">
          <h3 className="text-lg font-semibold text-[#F2F4FF] mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#E63CD8]" />
            {t('recentChats')}
          </h3>

          <div className="space-y-3">
            {[
              {
                flag: '🇮🇷',
                messages: 8,
                time: isRTL ? '۱۰ دقیقه پیش' : '10 min ago',
              },
              {
                flag: '🇬🇧',
                messages: 5,
                time: isRTL ? '۲۵ دقیقه پیش' : '25 min ago',
              },
              {
                flag: '🇮🇷',
                messages: 12,
                time: isRTL ? '۱ ساعت پیش' : '1 hour ago',
              },
            ].map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{session.flag}</span>
                  <div>
                    <div className="text-sm text-[#F2F4FF]">
                      {session.messages} {t('messages')}
                    </div>
                    <div className="text-xs text-[#8A91B0]">{session.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {false && (
            <div className="text-center py-8 text-[#8A91B0]">{t('noChats')}</div>
          )}

          <button className="w-full mt-4 py-2 text-sm text-[#E63CD8] hover:text-[#F2F4FF] transition-colors">
            {t('viewAllSessions')}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <a
          href="/fa"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-[rgba(63,232,244,0.1)] border border-[rgba(63,232,244,0.3)] rounded-lg text-[#3FE8F4] hover:bg-[rgba(63,232,244,0.15)] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm font-medium">{t('viewSite')}</span>
        </a>

        <button
          type="button"
          className="flex items-center gap-2 px-6 py-3 bg-[rgba(157,92,255,0.1)] border border-[rgba(157,92,255,0.3)] rounded-lg text-[#9D5CFF] hover:bg-[rgba(157,92,255,0.15)] transition-colors"
        >
          <ToggleLeft className="w-4 h-4" />
          <span className="text-sm font-medium">{t('toggleDemo')}</span>
        </button>
      </div>
    </div>
  );
}
