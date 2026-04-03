import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Those credentials did not work. Check your email and password and try again.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }} className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Welcome back</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>Sign in to your CutHire account.</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>

          {error && (
            <div role="alert" aria-live="polite" className="text-sm p-3 rounded-md" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
          New to CutHire? <Link to="/signup" className="font-medium underline" style={{ color: 'var(--color-primary)' }}>Create an account</Link>
        </p>
      </div>
    </div>
  )
}
