import { useState, useCallback } from 'react'
import { MOCK_AUDIT_LOGS } from '@/data/mockAuditLogs'
import type { AuditLogEntry, AuditAction } from '@/types/audit'

export function useAuditTrail() {
  const [logs, setLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS)

  const logEvent = useCallback((action: AuditAction, details: string, actor: string = 'Dr. Puneesh Gulati', role: any = 'Doctor') => {
    const hash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      action,
      actor,
      role,
      hospitalNode: 'Hospital Node A (Cardiology)',
      details,
      sha256Hash: hash,
      status: 'SUCCESS',
    }
    setLogs(prev => [newEntry, ...prev])
  }, [])

  return {
    logs,
    logEvent,
    totalLogs: logs.length,
  }
}
