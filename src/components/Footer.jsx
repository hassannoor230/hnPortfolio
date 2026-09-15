import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-2 border-t">
      <div className="container" style={{ padding: '4rem 0 3rem' }}>
        <div className="grid grid-cols-2" style={{ gap: '3rem' }}>
          <div>
            <div className="label text-accent mb-3">Hassan Noor</div>

            <div className="caption text-dim mb-4">
              MERN Stack Developer building premium digital experiences.
            </div>

            <div className="flex-gap gap-3">
              <SocialLink href="https://github.com/hassannoor230" icon={<Github size={16} />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/hassan-noor-509794325/" icon={<Linkedin size={16} />} label="LinkedIn" />
              <SocialLink href="mailto:hassannoor2309@gmail.com" icon={<Mail size={16} />} label="Email" />
            </div>
          </div>

          <div className="flex-gap" style={{ flexDirection: 'column', gap: '1.5rem' }}>
            <FooterLinks
              title="Navigation"
              links={[
                { label: 'Work', to: '/works' },
                { label: 'About', to: '/about' },
                { label: 'Skills', to: '/skills' },
                { label: 'Experience', to: '/experience' },
                { label: 'Contact', to: '/contact' },
              ]}
            />
            <FooterLinks
              title="Connect"
              links={[
                { label: 'Admin Login', to: '/admin/login' },
                { label: 'Blog', to: '/blog' },
                { label: 'Testimonials', to: '/testimonials' },
              ]}
            />
          </div>
        </div>

        <div className="border-t" style={{ marginTop: '3rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="caption text-muted">
            &copy; {year} Hassan Noor. All rights reserved.
          </div>
          <Link to="/admin/login" className="caption text-muted hover:text-accent">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-center"
      style={{ width: '40px', height: '40px', border: '1px solid var(--border)', borderRadius: '0', color: 'var(--text-dim)', transition: 'all 0.3s ease' }}
      onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--text)' }}
      onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-dim)' }}
      aria-label={label}
    >
      {icon}
    </a>
  )
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <div className="label text-accent mb-3">{title}</div>
      <div className="flex-gap" style={{ flexDirection: 'column', gap: '0.75rem' }}>
        {links.map(link => (
          <Link key={link.to} to={link.to} className="caption text-dim hover:text-accent" style={{ lineHeight: 1.5 }}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
