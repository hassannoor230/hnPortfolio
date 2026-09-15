import { createContext, useContext, useEffect, useState } from 'react'
import api, { setAuthToken } from './api'

const AdminAuthContext = createContext(null)

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = async () => {
    try {
      const res = await api.get('/auth/me')
      setAdmin(res.data.data)
    } catch {
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) setAuthToken(token)
    fetchMe()
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    if (res.data.success) {
      const token = res.data.data.token
      localStorage.setItem('adminToken', token)
      setAuthToken(token)
      setAdmin(res.data.data.admin)
    }
    return res.data
  }

  const logout = async () => {
    try { await api.post('/auth/logout') } catch {}
    localStorage.removeItem('adminToken')
    setAuthToken(null)
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export default AdminAuthProvider
