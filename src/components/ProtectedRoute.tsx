import { useState, useEffect, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session)
      setChecking(false)
    })
  }, [])

  if (checking) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} aria-label="Loading" />
      </div>
    )
  }

  if (!authenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}
