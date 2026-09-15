import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Contact from './components/Contact'
import Footer from './components/Footer'

function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const followerX = useSpring(cursorX, { damping: 25, stiffness: 220 })
  const followerY = useSpring(cursorY, { damping: 25, stiffness: 220 })

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 6)
      cursorY.set(e.clientY - 6)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: 0, top: 0,
          width: 12, height: 12,
          background: 'var(--gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          x: cursorX,
          y: cursorY,
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: -12, top: -12,
          width: 36, height: 36,
          border: '1px solid rgba(201,168,76,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          x: followerX,
          y: followerY,
        }}
      />
    </>
  )
}

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '64px',
          fontWeight: 600,
          color: 'var(--gold)',
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        HN
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
        }}
      >
        Loading...
      </motion.p>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <PageLoader key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Works />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
