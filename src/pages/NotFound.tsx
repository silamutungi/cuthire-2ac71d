import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh' }} className="flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-primary)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase' }}>404</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Page not found</h1>
        <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: 'var(--color-text-secondary)' }}>The page you are looking for does not exist or has been moved.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" className="mr-2" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}
