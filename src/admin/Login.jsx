import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminAuth } from './auth'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAdminAuth()
  const [email, setEmail] = useState('admin@hassannoor.dev')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login(email, password)
      if (res.success) {
        window.location.href = '/admin/overview'
      } else {
        setError(res.message || 'Login failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '60px', height: '60px', margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--gold)', fontFamily: 'var(--font-display)',
            fontSize: '24px', fontWeight: 600, color: 'var(--gold)', letterSpacing: '2px',
          }}>HN</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600,
            color: 'var(--text)', marginBottom: '8px',
          }}>Admin Login</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7 }}>
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{
              padding: '14px 20px', marginBottom: '24px', background: 'rgba(176,122,122,0.1)',
              border: '1px solid rgba(176,122,122,0.3)', color: '#B07A7A',
              fontFamily: 'var(--font-body)', fontSize: '13px', borderRadius: '4px',
            }}>{error}</motion.div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block', fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px',
              fontFamily: 'var(--font-body)',
            }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@hassannoor.dev"
              required
              style={{
                width: '100%', padding: '14px 20px', background: 'var(--surface)',
                border: '1px solid var(--border)', color: 'var(--text)',
                fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block', fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px',
              fontFamily: 'var(--font-body)',
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '14px 20px 14px 44px', background: 'var(--surface)',
                  border: '1px solid var(--border)', color: 'var(--text)',
                  fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer',
              }} aria-label={showPass ? 'Hide password' : 'Show password'}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit" disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            style={{
              width: '100%', padding: '16px 24px', background: 'var(--gold)',
              border: 'none', color: 'var(--bg)', fontFamily: 'var(--font-body)',
              fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase',
              fontWeight: 600, cursor: loading ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '10px', opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid var(--bg)', borderTopColor: 'transparent', borderRadius: '50%' }}
              />
            ) : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div style={{
          marginTop: '32px', textAlign: 'center',
          fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px',
          color: 'var(--text-muted)',
        }}>
          &copy; {new Date().getFullYear()} Hassan Noor — Admin Panel
        </div>
      </motion.div>
    </div>
  )
}
