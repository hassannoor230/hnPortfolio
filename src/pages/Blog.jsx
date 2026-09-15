import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, GoldLine, SectionLabel, SectionTitle, LoadingSpinner, EmptyState } from '../components/UI'
import api from '../lib/api'
import SEO from '../components/SEO'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>
}

const categories = ['All', 'Development', 'Design', 'Technology', 'Personal', 'Tutorial']

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    let activeFlag = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/blog?limit=12&page=${page}`)
        if (activeFlag) {
          const items = res.data.data || []
          setPosts(items)
          setHasMore(items.length === 12)
        }
      } catch {} finally {
        if (activeFlag) setLoading(false)
      }
    }
    load()
    return () => { activeFlag = false }
  }, [page])

  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active)

  return (
    <section id="blog" style={{ padding: '160px 0', background: 'var(--bg)', position: 'relative' }}>
      <SEO title="Blog — Hassan Noor" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <Container>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <GoldLine />
            <SectionLabel>Thoughts & Insights</SectionLabel>
          </div>
          <SectionTitle>Blog</SectionTitle>
        </FadeIn>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActive(cat); setPage(1) }} style={{
              padding: '8px 18px', border: '1px solid', borderColor: active === cat ? 'var(--gold)' : 'var(--border)',
              background: active === cat ? 'var(--gold)' : 'transparent', color: active === cat ? 'var(--bg)' : 'var(--text-dim)',
              fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}>{cat}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ height: '320px', background: 'var(--surface)', animation: 'shimmer 1.5s infinite' }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState title="No articles yet" description="Blog posts will appear here once published." />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
            {filtered.map((post, i) => (
              <FadeIn key={post._id} delay={i * 0.1}>
                <motion.a href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ aspectRatio: '21/9', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                      {post.coverImage ? <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>No image</div>}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text)', lineHeight: 1.2 }}>{post.title}</h3>
                    {post.excerpt && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7 }}>{post.excerpt}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                      <span>{(post.tags || []).slice(0, 2).join(', ')}</span>
                    </div>
                  </article>
                </motion.a>
              </FadeIn>
            ))}
          </div>
        )}

        {hasMore && !loading && filtered.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button onClick={() => setPage(p => p + 1)} style={{ padding: '12px 36px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>Load More</button>
          </div>
        )}
      </Container>
    </section>
  )
}
