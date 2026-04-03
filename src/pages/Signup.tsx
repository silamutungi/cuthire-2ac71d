import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } }
    })
    setLoading(false)
    if (authError) {
      setError('We could not create your account. ' + authError.message)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }} className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Join CutHire</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>Create your account — free for buyers and sellers.</p>

        <div className="flex rounded-lg border overflow-hidden mb-6" style={{ borderColor: 'var(--color-border)' }}>
          {(['buyer', 'seller'] as const).map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="flex-1 h-11 text-sm font-medium transition-colors"
              style={{
                backgroundColor: role === r ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                color: role === r ? '#ffffff' : 'var(--color-text)'
              }}
              aria-pressed={role === r}
            >
              {r === 'buyer' ? 'Hiring an editor' : 'Offering services'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" type="text" autoComplete="name" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" />
          </div>

          {error && (
            <div role="alert" aria-live="polite" className="text-sm p-3 rounded-md" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? 'Creating account...' : (role === 'buyer' ? 'Create buyer account' : 'Create editor account')}
          </Button>
        </form>

        <p className="mt-4 text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
          By signing up you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
        <p className="mt-4 text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account? <Link to="/login" className="font-medium underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
