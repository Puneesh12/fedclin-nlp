export type AuditAction = 
  | 'INFERENCE_REQUEST'
  | 'MODEL_WEIGHTS_PULL'
  | 'FEDERATED_ROUND_START'
  | 'FEDERATED_AGGREGATION_COMPLETE'
  | 'TRIAGE_OVERRIDE'
  | 'EHR_EXPORT'
  | 'AUTH_LOGIN'
  | 'CONFIG_CHANGE'

export interface AuditLogEntry {
  id: string
  timestamp: string
  action: AuditAction
  actor: string
  role: 'Doctor' | 'Nurse' | 'Researcher' | 'Admin' | 'System'
  hospitalNode: string
  details: string
  sha256Hash: string
  status: 'SUCCESS' | 'WARNING' | 'DENIED'
}
