import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const categoryGroups = [
  { title: 'Frontend', items: ['HTML', 'CSS', 'Tailwind', 'JavaScript', 'React', 'GSAP', 'Framer Motion'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication', 'Server Architecture'] },
  { title: 'Product & Build', items: ['WordPress', 'UI Systems', 'Responsive Design', 'SEO', 'Performance Optimization', 'Testing'] },
]

export default function Skills() {
  return (
    <>
      <SEO title="Skills | Hassan Noor" description="Technical skills and expertise" />

      <section className="page-shell">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-tag">Capabilities</span>
            <h1 className="page-title">Technical expertise</h1>
            <p className="page-copy">A focused stack for elegant product experiences, robust systems, and polished delivery.</p>
          </motion.div>

          <div className="skills-layout">
            {categoryGroups.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="skill-category-panel"
              >
                <h3>{group.title}</h3>
                <div className="skills-grid">
                  {group.items.map((item) => (
                    <span key={item} className="skill-pill">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
