import { useEffect } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import { useScrollReveal } from '../hooks/scroll'
import { Container, SectionLabel, SectionTitle, GoldLine, Tag, StatNumber } from '../components/UI'
import api from '../lib/api'
import { useState } from 'react'

export default function About() {
  const { settings } = useSettings()
  useScrollReveal()
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [stats, setStats] = useState({ totalProjects: 0, totalTestimonials: 0 })

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const [skillsRes, expRes, testimonialsRes] = await Promise.all([
          api.get('/skills'),
          api.get('/experience'),
          api.get('/testimonials'),
        ])
        if (active) {
          setSkills(skillsRes.data.data || [])
          setExperience(expRes.data.data || [])
          setStats({ totalProjects: 0, totalTestimonials: (testimonialsRes.data.data || []).length })
        }
      } catch {}
    }
    load()
    return () => { active = false }
  }, [])

  const grouped = skills.reduce((acc, s) => {
    if (!s.visible) return acc
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <section id="about" style={{ padding: '160px 0 120px', background: 'var(--bg-2)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '100px', alignItems: 'start' }}>
          <div className="reveal-left">
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img
                src={settings?.profileImage || '/Me.png'}
                alt={settings?.siteName || 'Hassan Noor'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.7), transparent 40%)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>{settings?.siteName || 'Hassan Noor'}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>{settings?.headline || 'MERN Stack Developer'}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
              <StatNumber value="5+" label="Years" />
              <StatNumber value={stats.totalTestimonials} label="Reviews" />
              <StatNumber value="30+" label="Clients" />
            </div>
          </div>

          <div>
            <div className="reveal-up" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <GoldLine />
                <SectionLabel>Who I Am</SectionLabel>
              </div>
              <SectionTitle>Building digital<br /><span style={{ fontWeight: 300, fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.6)' }}>experiences.</span></SectionTitle>
            </div>

            <div className="reveal-up" style={{ marginBottom: '48px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'var(--text-dim)', lineHeight: 1.9, marginBottom: '20px' }}>
                {settings?.bio || 'I am a professional MERN Stack Developer dedicated to building high-performance, scalable, and conversion-focused web applications.'}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'var(--text-dim)', lineHeight: 1.9 }}>
                My philosophy is simple: every pixel matters. I blend technical precision with creative vision to build products that resonate, scale, and convert.
              </p>
            </div>

            <div className="reveal-up" style={{ marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <GoldLine />
                <SectionLabel>What I Build</SectionLabel>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  'Full-Stack MERN Applications',
                  'Custom Admin Dashboards',
                  'E-Commerce & Booking Systems',
                  'REST API Development',
                  'Premium Landing Pages',
                  'WordPress & Headless CMS',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ width: '6px', height: '6px', background: 'var(--gold)', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <GoldLine />
                <SectionLabel>Technologies</SectionLabel>
              </div>
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} style={{ marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px' }}>{category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {items.map((skill) => (
                      <Tag key={skill._id}>{skill.name}</Tag>
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(grouped).length === 0 && (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Skills will be updated from the admin panel.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}