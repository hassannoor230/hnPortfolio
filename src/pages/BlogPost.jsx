import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, GoldLine, SectionLabel, Tag, LoadingSpinner } from '../components/UI'
import api from '../lib/api'
import SEO from '../components/SEO'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Tag as TagIcon } from 'lucide-react'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get(`/blog/${slug}`)
        if (active) {
          setPost(res.data.data || null)
          if (res.data.data) {
            api.post(`/blog/${slug}/views`).catch(() => {})
          }
        }
      } catch {} finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [slug])

  useEffect(() => {
    let active = true
    const loadRecent = async () => {
      try {
        const res = await api.get('/blog?limit=4')
        if (active) setRecentPosts(res.data.data || [])
      } catch {}
    }
    loadRecent()
    return () => { active = false }
  }, [])

  if (loading) {
    return (
      <section style={{ padding: '160px 0', background: 'var(--bg)' }}>
        <Container><LoadingSpinner /></Container>
      </section>
    )
  }

  if (!post) {
    return (
      <section style={{ padding: '160px 0', background: 'var(--bg)' }}>
        <SEO title="Post Not Found" noindex />
        <Container>
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--text)', marginBottom: '16px' }}>Post Not Found</h2>
            <Link to="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>← Back to Blog</Link>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section style={{ padding: '160px 0', background: 'var(--bg)' }}>
      <SEO title={`${post.title} — Hassan Noor`} description={post.excerpt || post.metaDescription} />
      <Container>
        <FadeIn>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }} data-cursor="Back"><ArrowLeft size={16} />Back to Blog</Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <article style={{ maxWidth: '720px', margin: '0 auto' }}>
            {post.coverImage && (
              <div style={{ aspectRatio: '21/9', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '48px' }}>
                <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            )}

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '24px' }}>{post.title}</h1>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} />{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>—</span>
              <span>{Math.max(1, Math.ceil((post.content || '').split(/\s+/).length / 200))} min read</span>
            </div>

            {post.category && <Tag style={{ marginBottom: '24px' }}>{post.category}</Tag>}

            <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'var(--text-dim)', marginBottom: '48px', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                {post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </div>
            )}
          </article>
        </FadeIn>

        {recentPosts.length > 0 && (
          <FadeIn delay={0.3}>
            <div style={{ maxWidth: '720px', margin: '0 auto', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>More Articles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {recentPosts.slice(0, 4).filter(p => p.slug !== post.slug).map(p => (
                  <Link key={p._id} to={`/blog/${p.slug}`} style={{ display: 'flex', gap: '16px', textDecoration: 'none', color: 'inherit' }}>
                    {p.coverImage ? <img src={p.coverImage} alt={p.title} style={{ width: '60px', height: '60px', objectFit: 'cover', border: '1px solid var(--border)' }} loading="lazy" /> : <div style={{ width: '60px', height: '60px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '10px' }}>No img</div>}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.3, marginBottom: '4px' }}>{p.title}</h4>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{new Date(p.publishedAt || p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  )
}
