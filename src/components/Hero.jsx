import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Animated background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        mask: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="container"
        css={{ width: '100%' }}
      >
        <div style={{ maxWidth: '900px', paddingTop: '100px', paddingBottom: '80px' }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}
          >
            <span style={{ display: 'block', width: '48px', height: '1px', background: 'var(--gold)' }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>MERN Stack Developer</span>
          </motion.div>

          {/* Main heading */}
          <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 9vw, 120px)',
                fontWeight: 600,
                lineHeight: 0.92,
                color: 'var(--text)',
                letterSpacing: '-2px',
              }}
            >
              Hassan
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '40px' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 9vw, 120px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 0.92,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201,168,76,0.7)',
                letterSpacing: '-2px',
              }}
            >
              Noor
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--text-dim)',
              maxWidth: '480px',
              lineHeight: 1.8,
              marginBottom: '56px',
            }}
          >
           I am a professional MERN Stack Developer & WordPress Expert dedicated to building high-performance, scalable, and conversion-focused websites for startups and businesses.

In today’s competitive digital world, your website is more than just a presence — it’s your brand identity, sales machine, and growth engine. I help founders and businesses transform their ideas into powerful, user-friendly web applications that deliver real results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
          >
            <motion.button
              onClick={() => scrollTo('works')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--gold)',
                border: 'none',
                color: 'var(--bg)',
                padding: '16px 40px',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >→</motion.span>
            </motion.button>
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.03, background: 'rgba(201,168,76,0.08)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.4)',
                color: 'var(--text)',
                padding: '16px 40px',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}
            >
              Let's Talk
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            style={{
              display: 'flex',
              gap: '60px',
              marginTop: '80px',
              paddingTop: '48px',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { num: '50+', label: 'Projects Completed' },
              { num: '5+', label: 'Years Experience' },
              { num: '30+', label: 'Happy Clients' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '42px',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          writingMode: 'vertical-rl',
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: '1px', height: '60px', background: 'linear-gradient(var(--gold), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
