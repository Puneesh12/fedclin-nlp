import React, { createContext, useContext, useState } from 'react'
import type { UserRole } from '@/types/auth'

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  currentHospitalNode: string
  setCurrentHospitalNode: (node: string) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('Doctor')
  const [currentHospitalNode, setCurrentHospitalNode] = useState('Hospital Node A (Cardiology)')

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        currentHospitalNode,
        setCurrentHospitalNode,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export const useRoleContext = () => {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRoleContext must be used within a RoleProvider')
  }
  return context
}
