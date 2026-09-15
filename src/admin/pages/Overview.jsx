import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from './api'
import { LoadingSpinner, GoldLine, SectionLabel } from '../components/UI'
import {
  FolderOpen, Award, Users, BookOpen, MailCheck, FileText, TrendingUp, Eye
} from 'lucide-react'

export default function Overview() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/admin/overview')
        if (active) setStats(res.data.data)
      } catch {} finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}><LoadingSpinner /></div>

  const cards = [
    { label: 'Total Projects', value: stats?.totalProjects || 0, icon: FolderOpen },
    { label: 'Featured Projects', value: stats?.featuredProjects || 0, icon: TrendingUp },
    { label: 'Total Skills', value: stats?.totalTestimonials ? '—' : 0, icon: Award },
    { label: 'Published Blogs', value: stats?.publishedBlogs || 0, icon: BookOpen },
    { label: 'Unread Inquiries', value: stats?.unreadInquiries || 0, icon: MailCheck },
    { label: 'Total Testimonials', value: stats?.totalTestimonials || 0, icon: Users },
    { label: 'Resume Downloads', value: stats?.resumeDownloads || 0, icon: FileText },
    { label: 'Total Views', value: stats?.totalViews || '—', icon: Eye },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <GoldLine />
        <SectionLabel>Dashboard</SectionLabel>
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>Overview</h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)', marginBottom: '40px' }}>Real-time metrics from your portfolio</p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
      }}>
        {cards.map(card => (
          <motion.div key={card.label} whileHover={{ y: -2 }} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            padding: '28px', borderRadius: '6px', transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <card.icon size={22} color="var(--gold)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{card.label}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 600, color: 'var(--text)' }}>{card.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
