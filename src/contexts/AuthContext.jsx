import React, { createContext, useContext, useEffect, useState } from 'react'
import api, { setAuthToken } from '../lib/api'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
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
    if (token) {
      setAuthToken(token)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    fetchMe()
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    if (res.data.success) {
      const token = res.data.data.token
      localStorage.setItem('adminToken', token)
      setAuthToken(token)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
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

  const updateProfile = async (data) => {
    const res = await api.put('/auth/profile', data)
    if (res.data.success) setAdmin(res.data.data)
    return res.data
  }

  const changePassword = async (currentPassword, newPassword) => {
    const res = await api.put('/auth/change-password', { currentPassword, newPassword })
    return res.data
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, updateProfile, changePassword, fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider