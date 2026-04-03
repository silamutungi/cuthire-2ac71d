import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { formatCurrency, formatDate } from '../lib/utils'
import { Plus, Briefcase, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import type { Project } from '../types'

const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

const SEED_PROJECTS: Project[] = [
  { id: 'p1', user_id: 'u1', title: 'YouTube channel intro and outro package', description: '', budget_min: 150, budget_max: 300, category: 'YouTube & Content', deadline_days: 5, status: 'in_progress', created_at: new Date(Date.now() - 86400000 * 2).toISOString(), deleted_at: null },
  { id: 'p2', user_id: 'u1', title: 'Product launch reel — 60 seconds', description: '', budget_min: 400, budget_max: 800, category: 'Reels & Shorts', deadline_days: 3, status: 'open', created_at: new Date(Date.now() - 86400000 * 1).toISOString(), deleted_at: null },
  { id: 'p3', user_id: 'u1', title: 'Annual conference highlight film', description: '', budget_min: 1200, budget_max: 2000, category: 'Corporate Video', deadline_days: 14, status: 'completed', created_at: new Date(Date.now() - 86400000 * 14).toISOString(), deleted_at: null },
]

const STATUS_CONFIG: Record<Project['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof Clock }> = {
  open: { label: 'Open', variant: 'default', icon: Clock },
  in_progress: { label: 'In progress', variant: 'secondary', icon: Briefcase },
  completed: { label: 'Completed', variant: 'outline', icon: CheckCircle },
  cancelled: { label: 'Cancelled', variant: 'destructive', icon: AlertCircle },
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(isSupabaseConfigured ? [] : SEED_PROJECTS)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email ?? '')
    })
    fetchProjects()
  }, [])

  async function fetchProjects() {
    setLoading(true)
    setError('')
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
    setLoading(false)
    if (fetchError) {
      setError('We could not load your projects. Check your connection and try again.')
      return
    }
    setProjects(data as Project[])
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }} className="py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Your dashboard</h1>
            {userEmail && <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{userEmail}</p>}
          </div>
          <Button asChild>
            <Link to="/browse">
              <Plus size={16} strokeWidth={2} aria-hidden="true" className="mr-2" />
              Post a project
            </Link>
          </Button>
        </div>

        {!isSupabaseConfigured && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-3 rounded-md mb-6">
            Viewing sample data — <a href="#setup" className="underline font-medium">connect your database</a> to go live.
          </div>
        )}

        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Your projects</h2>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--color-bg-muted)' }} />
            ))}
          </div>
        )}

        {error && (
          <div role="alert" aria-live="polite" className="p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
            <AlertCircle size={20} strokeWidth={2} aria-hidden="true" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Could not load projects</p>
              <p className="text-sm mt-0.5">{error}</p>
              <button onClick={fetchProjects} className="text-sm underline mt-2" style={{ color: 'var(--color-primary)' }}>Try again</button>
            </div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20 rounded-2xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
            <div className="text-4xl mb-4" aria-hidden="true">🎬</div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No projects yet</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Post your first project and start receiving proposals from verified editors.</p>
            <Button>Post your first project</Button>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="space-y-4">
            {projects.map(project => {
              const cfg = STATUS_CONFIG[project.status]
              const Icon = cfg.icon
              return (
                <div key={project.id} className="p-5 rounded-xl border flex items-center gap-4" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold truncate" style={{ color: 'var(--color-text)' }}>{project.title}</h3>
                      <Badge variant={cfg.variant}>
                        <Icon size={12} strokeWidth={2} className="mr-1" aria-hidden="true" />
                        {cfg.label}
                      </Badge>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {project.category} · {formatCurrency(project.budget_min)}–{formatCurrency(project.budget_max)} · Posted {formatDate(project.created_at)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
