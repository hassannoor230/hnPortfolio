import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import api from '../lib/api'
import SEO from '../components/SEO'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

function FadeInUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function renderContent(content) {
  if (!content) return null
  const lines = content.split('\n').filter(l => l.trim())
  return lines.map((line, i) => {
    if (line.startsWith('# ')) return <h1 key={i} className="title-strong mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{line.slice(2)}</h1>
    if (line.startsWith('## ')) return <h2 key={i} className="title-strong mb-3" style={{ fontSize: '1.75rem', marginTop: '2rem' }}>{line.slice(3)}</h2>
    if (line.startsWith('### ')) return <h3 key={i} className="title-strong mb-2" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>{line.slice(4)}</h3>
    if (line.startsWith('> ')) return <blockquote key={i} className="body text-dim mb-4" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem', fontStyle: 'italic' }}>{line.slice(2)}</blockquote>
    if (line.startsWith('```')) return null
    if (line.trim()) return <p key={i} className="body text-dim mb-4" style={{ lineHeight: 1.8 }}>{line}</p>
    return <br key={i} />
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get(`/blog/${slug}`)
        if (active) setPost(res.data.data)
        if (active) api.post(`/blog/${slug}/views`).catch(() => {})
      } catch {
        if (active) setNotFound(true)
      } finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [slug])

  if (loading) {
    return <div className="container" style={{ paddingTop: '6rem' }}>Loading...</div>
  }

  if (notFound || !post) {
    return (
      <div className="container" style={{ paddingTop: '6rem', textAlign: 'center' }}>
        <h1 className="display-strong">Post not found</h1>
        <Link to="/blog" className="mt-3 caption text-accent">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt || post.metaDescription} />

      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <FadeIn>
            <Link to="/blog" className="flex-gap caption text-dim hover:text-accent" style={{ gap: '0.5rem', marginBottom: '3rem' }}>
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex-between mb-4" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>{post.category || 'General'}</SectionLabel>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
              {post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex-gap" style={{ gap: '1.5rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              <div className="flex-gap" style={{ gap: '0.4rem', alignItems: 'center' }}>
                <Calendar size={12} />
                <span className="caption">{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              {post.readingTime && (
                <div className="flex-gap" style={{ gap: '0.4rem', alignItems: 'center' }}>
                  <Clock size={12} />
                  <span className="caption">{post.readingTime} min read</span>
                </div>
              )}
            </div>
          </FadeIn>

          {post.coverImage && (
            <FadeIn delay={0.4}>
              <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: 'auto', marginBottom: '3rem' }} loading="eager" />
            </FadeIn>
          )}

          <FadeIn delay={0.5}>
            <div className="blog-content">
              {renderContent(post.content)}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
