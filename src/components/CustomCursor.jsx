import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const followerX = useSpring(cursorX, { damping: 28, stiffness: 300 })
  const followerY = useSpring(cursorY, { damping: 28, stiffness: 300 })
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const labelRef = useRef(null)
  const label = useRef('')
  const visible = useRef(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 5)
      cursorY.set(e.clientY - 5)
      if (!visible.current) {
        visible.current = true
        dotRef.current.style.opacity = '1'
        followerRef.current.style.opacity = '1'
      }
    }
    const over = (e) => {
      const el = e.currentTarget
      const text = el.dataset.cursor
      if (text) {
        label.current = text
        if (labelRef.current) labelRef.current.textContent = text
      } else {
        label.current = ''
        if (labelRef.current) labelRef.current.textContent = ''
      }
      dotRef.current.style.transform = 'scale(2.4)'
      dotRef.current.style.background = 'var(--bg)'
      followerRef.current.style.width = '64px'
      followerRef.current.style.height = '64px'
      followerRef.current.style.borderColor = 'var(--gold)'
    }
    const leave = () => {
      label.current = ''
      if (labelRef.current) labelRef.current.textContent = ''
      dotRef.current.style.transform = 'scale(1)'
      dotRef.current.style.background = 'var(--gold)'
      followerRef.current.style.width = '32px'
      followerRef.current.style.height = '32px'
      followerRef.current.style.borderColor = 'rgba(201,169,110,0.5)'
    }
    const down = () => { if (dotRef.current) dotRef.current.style.transform = 'scale(1.4)' }
    const up = () => { if (dotRef.current) dotRef.current.style.transform = 'scale(1)' }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', leave)
      el.addEventListener('mousedown', down)
      el.addEventListener('mouseup', up)
    })
    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <motion.div
        ref={dotRef}
        style={{
          position: 'fixed', left: 0, top: 0,
          width: 10, height: 10,
          background: 'var(--gold)', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 99999,
          mixBlendMode: 'difference', opacity: 0,
          transform: 'scale(1)',
          transition: 'transform 0.2s var(--ease), background 0.2s, width 0.2s, height 0.2s',
        }}
      />
      <motion.div
        ref={followerRef}
        style={{
          position: 'fixed', left: -16, top: -16,
          width: 32, height: 32,
          border: '1px solid rgba(201,169,110,0.5)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 99998,
          opacity: 0, x: followerX, y: followerY,
          transition: 'opacity 0.2s, width 0.2s, height 0.2s, border-color 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span ref={labelRef} style={{
          position: 'absolute', bottom: '-22px', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--gold)', whiteSpace: 'nowrap',
        }} />
      </motion.div>
    </>
  )
}