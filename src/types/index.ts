export interface EditorProfile {
  id: string
  user_id: string
  display_name: string
  tagline: string
  bio: string
  specialties: string[]
  hourly_rate: number
  turnaround_days: number
  rating: number
  review_count: number
  completed_projects: number
  is_verified: boolean
  availability: 'available' | 'busy' | 'unavailable'
  created_at: string
  deleted_at: string | null
}

export interface Project {
  id: string
  user_id: string
  title: string
  description: string
  budget_min: number
  budget_max: number
  category: string
  deadline_days: number
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  deleted_at: string | null
}

export interface Proposal {
  id: string
  user_id: string
  project_id: string
  editor_id: string
  cover_letter: string
  proposed_rate: number
  estimated_days: number
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  deleted_at: string | null
}

export interface Review {
  id: string
  user_id: string
  editor_id: string
  project_id: string
  rating: number
  comment: string
  created_at: string
  deleted_at: string | null
}

export type UserRole = 'buyer' | 'seller'

export interface UserMeta {
  id: string
  user_id: string
  role: UserRole
  full_name: string
  created_at: string
}
