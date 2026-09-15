import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export function useScrollReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) => io.observe(el))
    }, 100)

    return () => { clearTimeout(timer); io.disconnect() }
  }, [pathname])
}