import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../api'
import { LoadingSpinner } from '../../components/UI'
import { TrendingUp, Eye, Users, BarChart3, Calendar } from 'lucide-react'

const StatCard = ({ title, value, icon, trend }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      {icon}
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{title}</span>
    </div>
    <div style={{ fontFamily: 'var(--font-body)', fontSize: '28px', fontWeight: 700, color: 'var(--text)' }}>{value}</div>
    {trend && <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gold)', marginTop: '8px' }}>{trend}</div>}
  </motion.div>
)

export default function AnalyticsAdmin() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/analytics')
      .then(res => setStats(res.data))
      .catch(() => setStats({ totalVisitors: 0, totalPageViews: 0, totalInquiries: 0, topPages: [] }))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <BarChart3 size={24} color="var(--gold)" />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text)' }}>Analytics</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <StatCard title="Total Visitors" value={stats?.totalVisitors || 0} icon={<Users size={20} color="var(--gold)" />} trend={stats?.visitorsTrend} />
        <StatCard title="Page Views" value={stats?.totalPageViews || 0} icon={<Eye size={20} color="var(--gold)" />} trend={stats?.pageViewsTrend} />
        <StatCard title="Total Inquiries" value={stats?.totalInquiries || 0} icon={<Calendar size={20} color="var(--gold)" />} />
        <StatCard title="Conversion Rate" value={stats?.conversionRate ? `${stats.conversionRate}%` : '0%'} icon={<TrendingUp size={20} color="var(--gold)" />} />
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', marginBottom: '16px' }}>Top Pages</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(stats?.topPages || []).map((page, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < (stats.topPages.length - 1) ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{page.path}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>{page.views} views</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

