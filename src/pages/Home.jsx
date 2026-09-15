import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Sparkles, Layers3, Gauge, Palette, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import api from '../lib/api'
import { useSettings } from '../contexts/SettingsContext'

gsap.registerPlugin(ScrollTrigger)

const skillShowcase = [
  'HTML', 'CSS', 'Tailwind', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'GSAP', 'Framer Motion', 'WordPress', 'REST APIs'
]

const process = [
  { number: '01', title: 'Discover', text: 'I align product goals, user flows, and brand positioning before a single line of code is written.' },
  { number: '02', title: 'Design', text: 'Clear interfaces, refined interaction patterns, and conversion-driven UX that still feels premium.' },
  { number: '03', title: 'Build', text: 'I ship responsive, high-performance web experiences with a thoughtful engineering foundation.' },
  { number: '04', title: 'Launch', text: 'From QA to deployment, I help you move confidently into production with polish and clarity.' },
]

const testimonials = [
  {
    quote: 'Hassan combines visual taste with technical discipline. The result felt premium, fast, and deeply considered from the first click to the final deployment.',
    author: 'Client — SaaS Founder',
  },
  {
    quote: 'He translated a rough idea into a calm, elegant product experience. The communication was effortless and the execution was sharp.',
    author: 'Product Lead — Studio Brand',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  const { settings } = useSettings()
  const [projects, setProjects] = useState([])
  const heroRef = useRef(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/projects?featured=true&limit=3')
        if (active) setProjects(res.data.data || [])
      } catch {
        if (active) setProjects([])
      }
    }
    load()
    return () => { active = false }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-ghost-word', {
        opacity: 0,
        y: 70,
        stagger: 0.12,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.35,
      })

      gsap.from('.hero-kicker, .hero-copy, .hero-actions', {
        opacity: 0,
        y: 22,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power3.out',
      })

      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const name = settings?.siteName || 'Hassan Noor'
  const headline = settings?.headline || 'Front-End & MERN Stack Developer'
  const bio = settings?.bio || 'I build high-performance digital experiences that feel premium, intentional, and effortless for users.'
  const firstName = name.split(' ')[0] || 'Hassan'
  const lastName = name.split(' ').slice(1).join(' ') || 'Noor'

  return (
    <div className="landing-page" ref={heroRef}>
      <section className="hero-shell">
        <div className="container hero-layout">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.2}
            className="hero-copy-block"
          >
            <div className="hero-kicker">
              <span className="eyebrow-line" />
              <span>{settings?.availability || 'Available for select projects'}</span>
            </div>

            <h1 className="hero-name" aria-label={name}>
              <span className="hero-word">{firstName}</span>
              <span className="hero-ghost-word">{lastName}</span>
            </h1>

            <div className="hero-subtitle-wrap">
              <p className="hero-subtitle">{headline}</p>
            </div>

            <p className="hero-copy">{bio}</p>

            <div className="hero-actions">
              <Link to="/works" className="btn btn--primary" data-cursor="View work">
                View Selected Work
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn--secondary" data-cursor="Contact">
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="hero-aside"
          >
            <div className="side-panel">
              <span className="panel-label">Focus</span>
              <p>High-end product design, front-end systems, and scalable MERN builds for modern brands.</p>
              <div className="panel-metrics">
                <div>
                  <strong>5+</strong>
                  <span>Years crafting web experiences</span>
                </div>
                <div>
                  <strong>30+</strong>
                  <span>Products launched and refined</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="indicator-bar" />
        </div>
      </section>

      <section className="reveal-section trust-bar">
        <div className="container trust-grid">
          <div>
            <span className="section-tag">Selected stack</span>
          </div>
          <div className="skill-marquee">
            {skillShowcase.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal-section about-section">
        <div className="container section-grid two-up">
          <div className="section-heading-block">
            <span className="section-tag">About</span>
            <h2>Precise design. Strong engineering. Premium outcomes.</h2>
          </div>

          <div className="about-copy">
            <p>
              I&apos;m a developer who cares deeply about brand clarity, thoughtful UX, and technical performance.
              My work sits between product strategy and polished execution — blending elegant interfaces with reliable, scalable architecture.
            </p>
            <p>
              Whether it&apos;s a launch-ready marketing site, a dashboard, or a full-stack product experience, I build systems that feel calm, confident, and conversion-aware.
            </p>
          </div>
        </div>
      </section>

      <section className="reveal-section" id="skills">
        <div className="container">
          <div className="section-heading-block header-spread">
            <span className="section-tag">Capabilities</span>
            <h2>Built for modern product teams.</h2>
          </div>

          <div className="skills-grid">
            {skillShowcase.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="skill-pill"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal-section work-section">
        <div className="container">
          <div className="section-heading-block header-spread">
            <span className="section-tag">Selected work</span>
            <h2>Design systems with measurable impact.</h2>
          </div>

          <div className="featured-projects">
            {projects.length === 0 ? (
              <div className="empty-state">Projects will appear here as soon as they are added to the portfolio CMS.</div>
            ) : (
              projects.map((project, index) => (
                <Link key={project._id || index} to={`/projects/${project.slug}`} className="project-panel" data-cursor={project.title}>
                  <div className="project-media">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.title} loading="lazy" />
                    ) : (
                      <div className="project-placeholder">No preview available</div>
                    )}
                  </div>
                  <div className="project-info">
                    <div className="project-meta">
                      <span>{project.category || 'Product Experience'}</span>
                      <span>{project.year || '2024'}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {(project.technologies || ['React', 'Node.js']).slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-cta">
                      View project
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="reveal-section process-section">
        <div className="container">
          <div className="section-heading-block header-spread">
            <span className="section-tag">Approach</span>
            <h2>A clear process from concept to launch.</h2>
          </div>

          <div className="process-grid">
            {process.map((step) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="process-card"
              >
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal-section testimonial-section">
        <div className="container">
          <div className="section-heading-block header-spread">
            <span className="section-tag">Testimonials</span>
            <h2>Trusted by teams building what&apos;s next.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote key={item.author} className="testimonial-card">
                <Quote size={20} className="quote-icon" />
                <p>“{item.quote}”</p>
                <footer>{item.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal-section cta-section">
        <div className="container cta-box">
          <div>
            <span className="section-tag">Let&apos;s build</span>
            <h2>Need a premium digital presence that actually converts?</h2>
          </div>

          <div className="cta-actions">
            <Link to="/contact" className="btn btn--primary" data-cursor="Start a project">
              Start a Project
            </Link>
            <a href="https://github.com/hassannoor230" target="_blank" rel="noreferrer" className="btn btn--secondary" data-cursor="GitHub">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
