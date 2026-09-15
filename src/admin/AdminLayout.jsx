import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdminAuth } from './auth'
import {
  LayoutDashboard, FolderOpen, BarChart3, Code, Users, Award, BookOpen,
  Mail, FileText, Settings, LogOut, Menu,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', to: '/admin/overview', icon: LayoutDashboard },
  { label: 'Projects', to: '/admin/projects', icon: FolderOpen },
  { label: 'Skills', to: '/admin/skills', icon: Award },
  { label: 'Experience', to: '/admin/experience', icon: Code },
  { label: 'Education', to: '/admin/education', icon: BookOpen },
  { label: 'Testimonials', to: '/admin/testimonials', icon: Users },
  { label: 'Blog', to: '/admin/blog', icon: BookOpen },
  { label: 'Resumes', to: '/admin/resume', icon: FileText },
  { label: 'Inquiries', to: '/admin/inquiries', icon: Mail },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
]

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <style>{`
        @media (max-width: 768px) {
          .admin-desktop-sidebar { display: none !important; }
        }
      `}</style>

      <div className="admin-desktop-sidebar" style={{
        width: '260px', flexShrink: 0, background: 'var(--surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: 'var(--text)' }}>Hassan Noor</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Admin Panel</div>
        </div>

        <nav style={{ padding: '12px 0', flex: 1 }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px',
              fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
              color: isActive ? 'var(--gold)' : 'var(--text-dim)', textDecoration: 'none',
              borderLeft: isActive ? '2px solid var(--gold)' : 'transparent',
              transition: 'all 0.2s',
            })}>
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          <motion.button whileHover={{ scale: 1.02 }} onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px',
            background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)',
            fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }} data-cursor="Logout">
            <LogOut size={16} />Logout
          </motion.button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header style={{
          height: '64px', flexShrink: 0, background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', padding: '0 32px', gap: '24px',
        }}>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-dim)' }}>
              {admin?.name || admin?.email}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
