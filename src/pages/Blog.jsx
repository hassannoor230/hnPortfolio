import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import api from '../lib/api'
import SEO from '../components/SEO'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'

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

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/blog')
        if (active) setPosts(res.data.data || [])
      } catch { if (active) setPosts([]) }
      finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  return (
    <>
      <SEO title="Blog | Hassan Noor" description="Thoughts on development, design, and technology." />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Blog</SectionLabel>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              Writing
            </h1>
            <p className="body text-dim" style={{ maxWidth: '600px', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Thoughts on development, design, and the craft of building digital products.
            </p>
          </FadeIn>

          {loading ? (
            <div className="caption text-muted">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="caption text-muted">No blog posts yet.</div>
          ) : (
            <div>
              {posts.map((post, i) => (
                <FadeInUp key={post._id} delay={i * 0.08}>
                  <Link to={`/blog/${post.slug}`} className="blog-post-preview" style={{ display: 'block', borderBottom: '1px solid var(--border)', padding: '3rem 0' }}>
                    <div className="flex-between" style={{ gap: '2rem' }}>
                      <div>
                        <div className="label text-accent mb-2">{post.category || 'General'}</div>
                        <h3 className="title-strong text-primary" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h3>
                        <p className="body text-dim" style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>{post.excerpt || post.content?.slice(0, 150) + '...'}</p>
                        <div className="caption text-dim">{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                      {post.coverImage && (
                        <img src={post.coverImage} alt={post.title} style={{ width: '120px', height: '80px', objectFit: 'cover', flexShrink: '0' }} loading="lazy" />
                      )}
                    </div>
                  </Link>
                </FadeInUp>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
