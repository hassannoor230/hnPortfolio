import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from './auth'
import { LoadingSpinner } from '../components/UI'

export default function AdminRoute() {
  const { admin, loading } = useAdminAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
        <LoadingSpinner />
      </div>
    )
  }

  if (!admin) return <Navigate to="/admin/login" replace />

  return <Outlet />
}
