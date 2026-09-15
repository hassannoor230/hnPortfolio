import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AdminAuthProvider } from './auth'
import AdminRoute from './AdminRoute'
import AdminLayout from './AdminLayout'
import Login from './Login'
import Overview from './pages/Overview'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Testimonials from './pages/Testimonials'
import Blog from './pages/Blog'
import Inquiries from './pages/Inquiries'
import Resume from './pages/Resume'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="blog" element={<Blog />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="resume" element={<Resume />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminRoutes />
    </AdminAuthProvider>
  )
}
