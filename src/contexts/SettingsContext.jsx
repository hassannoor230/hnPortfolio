import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api'

const SettingsContext = createContext(null)

export function useSettings() {
  return useContext(SettingsContext)
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings')
        if (active) setSettings(res.data.data)
      } catch {
        if (active) setSettings(null)
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchSettings()
    return () => { active = false }
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider