import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'
import { Film } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    if (!menuOpen) return
    function handlePointerDown(e: PointerEvent) {
      if (
        drawerRef.current && !drawerRef.current.contains(e.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <>
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/browse"
              className="text-sm transition-colors"
              style={{
                color: isActive('/browse') ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive('/browse') ? 600 : 400
              }}
            >
              Browse editors
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm transition-colors"
                  style={{
                    color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontWeight: isActive('/dashboard') ? 600 : 400
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm min-h-[44px] px-3 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Sign in
                </Link>
                <Button asChild size="sm">
                  <Link to="/signup">Join free</Link>
                </Button>
              </>
            )}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            ref={hamburgerRef}
            className="md:hidden flex flex-col items-center justify-center w-11 h-11 rounded-md gap-[5px] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2"
            style={{ color: 'var(--color-text)' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[700] md:hidden transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.45)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none'
        }}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed top-0 right-0 h-full w-72 max-w-[85vw] z-[800] md:hidden flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg-elevated, var(--color-bg))',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.18)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform'
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 h-16 border-b flex-shrink-0"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="CutHire home"
            onClick={() => setMenuOpen(false)}
          >
            <Film size={18} strokeWidth={2} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span className="font-bold text-base" style={{ color: 'var(--color-text)' }}>CutHire</span>
          </Link>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-1" aria-label="Mobile menu">
          <Link
            to="/browse"
            className="flex items-center h-12 px-3 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: isActive('/browse') ? 'var(--color-primary)' : 'var(--color-text)',
              backgroundColor: isActive('/browse') ? 'var(--color-primary-muted, rgba(255,80,0,0.08))' : 'transparent',
              fontWeight: isActive('/browse') ? 600 : 400
            }}
          >
            Browse editors
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center h-12 px-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--color-text)',
                  backgroundColor: isActive('/dashboard') ? 'var(--color-primary-muted, rgba(255,80,0,0.08))' : 'transparent',
                  fontWeight: isActive('/dashboard') ? 600 : 400
                }}
              >
                Dashboard
              </Link>
              <div className="mt-auto pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button
                  onClick={handleLogout}
                  className="flex items-center h-12 w-full px-3 rounded-lg text-sm transition-colors hover:opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center h-12 px-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive('/login') ? 'var(--color-primary)' : 'var(--color-text)',
                  backgroundColor: isActive('/login') ? 'var(--color-primary-muted, rgba(255,80,0,0.08))' : 'transparent',
                  fontWeight: isActive('/login') ? 600 : 400
                }}
              >
                Sign in
              </Link>
              <div className="mt-4 px-3">
                <Button asChild className="w-full">
                  <Link to="/signup">Join free</Link>
                </Button>
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  )
}
