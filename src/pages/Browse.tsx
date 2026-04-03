import { useState } from 'react'
import { Search, Star, CheckCircle, SlidersHorizontal } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { formatCurrency } from '../lib/utils'
import type { EditorProfile } from '../types'

const isSupabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

const SEED_EDITORS: EditorProfile[] = [
  { id: '1', user_id: 'u1', display_name: 'Marco Reyes', tagline: 'Cinematic storyteller for branded content and films', bio: '', specialties: ['Cinematic Films', 'Corporate Video'], hourly_rate: 85, turnaround_days: 5, rating: 4.9, review_count: 142, completed_projects: 218, is_verified: true, availability: 'available', created_at: '', deleted_at: null },
  { id: '2', user_id: 'u2', display_name: 'Priya Nair', tagline: 'YouTube & Reels specialist — 50M+ views delivered', bio: '', specialties: ['YouTube & Content', 'Reels & Shorts'], hourly_rate: 55, turnaround_days: 2, rating: 4.8, review_count: 97, completed_projects: 340, is_verified: true, availability: 'available', created_at: '', deleted_at: null },
  { id: '3', user_id: 'u3', display_name: 'James Okafor', tagline: 'Documentary and long-form editorial craftsman', bio: '', specialties: ['Documentaries', 'Corporate Video'], hourly_rate: 110, turnaround_days: 10, rating: 4.9, review_count: 61, completed_projects: 89, is_verified: true, availability: 'busy', created_at: '', deleted_at: null },
  { id: '4', user_id: 'u4', display_name: 'Sofia Lindqvist', tagline: 'Wedding films that make people cry (in a good way)', bio: '', specialties: ['Wedding Videos', 'Cinematic Films'], hourly_rate: 70, turnaround_days: 7, rating: 5.0, review_count: 88, completed_projects: 132, is_verified: true, availability: 'available', created_at: '', deleted_at: null },
  { id: '5', user_id: 'u5', display_name: 'Derek Chen', tagline: 'Fast, clean edits for social-first brands', bio: '', specialties: ['Reels & Shorts', 'YouTube & Content'], hourly_rate: 45, turnaround_days: 1, rating: 4.7, review_count: 213, completed_projects: 501, is_verified: false, availability: 'available', created_at: '', deleted_at: null },
  { id: '6', user_id: 'u6', display_name: 'Amara Diallo', tagline: 'Corporate video and product launch specialist', bio: '', specialties: ['Corporate Video', 'Cinematic Films'], hourly_rate: 95, turnaround_days: 4, rating: 4.8, review_count: 77, completed_projects: 155, is_verified: true, availability: 'available', created_at: '', deleted_at: null },
]

const CATEGORIES = ['All', 'YouTube & Content', 'Cinematic Films', 'Reels & Shorts', 'Corporate Video', 'Documentaries', 'Wedding Videos']

const availabilityColor = (a: string) => a === 'available' ? 'var(--color-success)' : a === 'busy' ? 'var(--color-warning)' : 'var(--color-text-muted)'

export default function Browse() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const editors = isSupabaseConfigured ? [] : SEED_EDITORS

  const filtered = editors.filter(e => {
    const matchesSearch = e.display_name.toLowerCase().includes(search.toLowerCase()) || e.tagline.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || e.specialties.includes(category)
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }} className="py-10">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Browse video editors</h1>
        <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>Find the right editor for your project — verified talent, every budget.</p>

        {!isSupabaseConfigured && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-3 rounded-md mb-6 flex items-center justify-between">
            <span>Viewing sample editors — <a href="#setup" className="underline font-medium">connect your database</a> to go live.</span>
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search editors"
            />
          </div>
          <Button variant="outline" aria-label="Filter editors">
            <SlidersHorizontal size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="inline-flex items-center h-9 px-4 rounded-full text-sm font-medium border transition-colors"
              style={{
                backgroundColor: category === c ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                color: category === c ? '#ffffff' : 'var(--color-text)',
                borderColor: category === c ? 'var(--color-primary)' : 'var(--color-border)'
              }}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4" aria-hidden="true">🎬</div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No editors match your search</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Try a broader search or browse all categories.</p>
            <Button onClick={() => { setSearch(''); setCategory('All') }}>Browse all editors</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map(editor => (
              <div key={editor.id} className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>{editor.display_name}</h2>
                      {editor.is_verified && <CheckCircle size={16} strokeWidth={2} style={{ color: 'var(--color-success)' }} aria-label="Verified editor" />}
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{editor.tagline}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>{formatCurrency(editor.hourly_rate)}<span className="text-xs font-normal" style={{ color: 'var(--color-text-muted)' }}>/hr</span></div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{editor.turnaround_days}d delivery</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {editor.specialties.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} strokeWidth={2} style={{ color: 'var(--color-warning)' }} aria-hidden="true" />
                    <span className="font-medium" style={{ color: 'var(--color-text)' }}>{editor.rating}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>({editor.review_count})</span>
                    <span className="ml-1" style={{ color: 'var(--color-text-muted)' }}>· {editor.completed_projects} projects</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: availabilityColor(editor.availability) }}
                      aria-hidden="true"
                    />
                    <span style={{ color: 'var(--color-text-secondary)' }}>{editor.availability === 'available' ? 'Available now' : editor.availability === 'busy' ? 'Busy' : 'Unavailable'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
