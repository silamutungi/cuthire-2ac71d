import { Link } from 'react-router-dom'
import { Star, Shield, Zap, Users, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'

const SPECIALTIES = ['Cinematic Films', 'YouTube & Content', 'Corporate Video', 'Reels & Shorts', 'Documentaries', 'Wedding Videos']

const FEATURES = [
  { icon: '🎬', title: 'Verified Editing Talent', desc: 'Every editor is reviewed and verified. Browse portfolios, reviews, and completed project counts before you commit.' },
  { icon: '🔒', title: 'Secure Payment Escrow', desc: 'Funds are held safely until you approve the final cut. Buyer protection on every project, no exceptions.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Filter by delivery time. Get a polished cut in 24 hours or choose editors who specialize in longer-form work.' },
  { icon: '🌍', title: 'Global Talent Pool', desc: 'Access editors across every timezone, style, and budget — from indie creators to broadcast professionals.' },
]

const STATS = [
  { value: '12,400+', label: 'Verified editors' },
  { value: '98,000+', label: 'Projects delivered' },
  { value: '4.8★', label: 'Average rating' },
  { value: '48hr', label: 'Avg. first delivery' },
]

export default function Home() {
  return (
    <>
      <section
        className="relative flex items-end md:items-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://gudiuktjzynkjvtqmuvi.supabase.co/storage/v1/object/public/hero-images/86482cfd-e3b5-4bf2-81a7-63186f1795ff-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100svh'
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.60) 60%, rgba(0,0,0,0.78) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-16 pt-32 md:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-4 md:mb-6">
            Hire the editor<br className="hidden sm:block" /> your footage deserves.
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
            CutHire connects brands, creators, and studios with verified freelance video editors — at every budget, for every format.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
              <Link to="/browse">Start browsing editors</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base border-white/50 text-white hover:bg-white/10">
              <Link to="/signup">List your editing services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg)' }} className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-left">
                <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{s.value}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }} className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Every format. Every style.</h2>
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>Browse by specialty and find an editor who has done exactly this before.</p>
          <div className="flex flex-wrap gap-3">
            {SPECIALTIES.map((s) => (
              <Link
                key={s}
                to={`/browse?specialty=${encodeURIComponent(s)}`}
                className="inline-flex items-center h-11 px-5 rounded-full border text-sm font-medium transition-colors"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', backgroundColor: 'var(--color-bg)' }}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg)' }} className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--color-text)' }}>Built for both sides of the edit.</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">🎥</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>For brands and creators</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Post your project in 2 minutes. Receive proposals from verified editors within hours. Pay only when you approve the final cut.</p>
              <ul className="space-y-2 mb-6">
                {['No subscription required', 'Buyer protection on every order', 'Revisions included by default'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle size={16} strokeWidth={2} style={{ color: 'var(--color-success)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link to="/signup">Post a project free</Link>
              </Button>
            </div>
            <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="text-4xl mb-4" aria-hidden="true">✂️</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>For video editors</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>List your services, set your own rates, and get matched with clients whose projects fit your style. Your work, your schedule.</p>
              <ul className="space-y-2 mb-6">
                {['Free to list your services', 'Keep 85% of every project', 'Instant payout on approval'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle size={16} strokeWidth={2} style={{ color: 'var(--color-success)' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/signup">Join as an editor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)' }} className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--color-text)' }}>Why CutHire works.</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-5">
                <div className="text-4xl flex-shrink-0" aria-hidden="true">{f.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg)' }} className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Shield size={16} strokeWidth={2} aria-hidden="true" />
              Buyer protection on every order
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Star size={16} strokeWidth={2} aria-hidden="true" />
              Verified seller profiles
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Zap size={16} strokeWidth={2} aria-hidden="true" />
              Escrow-protected payments
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Users size={16} strokeWidth={2} aria-hidden="true" />
              Global editor community
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
