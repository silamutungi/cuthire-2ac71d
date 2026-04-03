import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="border-t py-10"
      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Film size={16} strokeWidth={2} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span className="font-bold text-base" style={{ color: 'var(--color-text)' }}>CutHire</span>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
            <Link to="/browse" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Browse editors</Link>
            <Link to="/privacy" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Privacy Policy</Link>
            <Link to="/terms" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Terms of Service</Link>
            <a href="mailto:hello@cuthire.com" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Contact</a>
          </nav>
        </div>
        <p className="mt-6 text-xs" style={{ color: 'var(--color-text-muted)' }}>© {year} CutHire. All rights reserved.</p>
      </div>
    </footer>
  )
}
