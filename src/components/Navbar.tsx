import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'
import { Menu, X, Film } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const navLinkStyle = (path: string) => ({
    color: location.pathname === path ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    fontWeight: location.pathname === path ? 600 : 400
  })

  return (
    <nav
      className="sticky top-0 z-[600] border-b"
      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" aria-label="CutHire home">
          <Film size={20} strokeWidth={2} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>CutHire</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/browse" className="text-sm transition-colors" style={navLinkStyle('/browse')}>Browse editors</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm transition-colors" style={navLinkStyle('/dashboard')}>Dashboard</Link>
              <button onClick={handleLogout} className="text-sm min-h-[44px] px-3" style={{ color: 'var(--color-text-secondary)' }}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
              <Button asChild size="sm">
                <Link to="/signup">Join free</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-md"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} strokeWidth={2} aria-hidden="true" /> : <Menu size={20} strokeWidth={2} aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <Link to="/browse" className="block text-sm h-11 flex items-center" style={{ color: 'var(--color-text)' }}>Browse editors</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block text-sm h-11 flex items-center" style={{ color: 'var(--color-text)' }}>Dashboard</Link>
              <button onClick={handleLogout} className="block text-sm h-11 flex items-center w-full text-left" style={{ color: 'var(--color-text-secondary)' }}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm h-11 flex items-center" style={{ color: 'var(--color-text)' }}>Sign in</Link>
              <Button asChild className="w-full">
                <Link to="/signup">Join free</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
