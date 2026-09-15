import { useEffect } from 'react'

export default function useAnalytics() {
  useEffect(() => {
    let hasTracked = false

    const track = async () => {
      if (hasTracked) return
      hasTracked = true
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/analytics/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || '',
            userAgent: navigator.userAgent || '',
            device: /mobile|tablet/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
          }),
        })
      } catch {}
    }

    const t = setTimeout(track, 500)
    return () => clearTimeout(t)
  }, [])
}
