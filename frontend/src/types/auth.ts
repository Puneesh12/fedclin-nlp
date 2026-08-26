export type UserRole = 'Doctor' | 'Nurse' | 'Researcher' | 'Admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  hospitalAffiliation: string
  avatarUrl?: string
  token?: string
}
