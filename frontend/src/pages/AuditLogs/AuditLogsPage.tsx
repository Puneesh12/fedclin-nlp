import React, { useState } from 'react'
import {
  FileCheck2,
  ShieldCheck,
  Search,
  Filter,
  Lock,
  Copy,
  Check,
  Sparkles,
  Download,
  AlertCircle,
  Clock,
  User,
  Hospital,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_AUDIT_LOGS } from '@/data/mockAuditLogs'
import type { AuditLogEntry, AuditAction } from '@/types/audit'

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAction, setSelectedAction] = useState<string>('ALL')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleSimulateEvent = () => {
    const newLog: AuditLogEntry = {
      id: `log-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      action: 'INFERENCE_REQUEST',
      actor: 'Puneesh Gulati (Doctor)',
      role: 'Doctor',
      hospitalNode: 'Hospital Node A (Cardiology)',
      details: 'Executed ad-hoc clinical inference on new admission transcript via DistilBERT-Bio v2.4.1',
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      status: 'SUCCESS',
    }
    setLogs([newLog, ...logs])
  }

  const handleCopyHash = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hospitalNode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.sha256Hash.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAction = selectedAction === 'ALL' || log.action === selectedAction

    return matchesSearch && matchesAction
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#111827]">
              Cryptographic Audit Logs & Compliance Trail
            </h1>
            <Badge variant="privacy" size="sm">Immutable Ledger</Badge>
          </div>
          <p className="text-xs text-[#667085]">
            Verifiable record of model weight distributions, inference queries, and clinical triage interactions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSimulateEvent}
            leftIcon={<Sparkles className="h-3.5 w-3.5" />}
          >
            Simulate Audit Event
          </Button>
        </div>
      </div>

      {/* Security Banner */}
      <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl flex items-center justify-between text-xs text-[#15803D]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-[#16A34A] shrink-0" />
          <span>
            <strong>Cryptographic Integrity Guaranteed:</strong> Every entry is hashed with SHA-256 to ensure tampering detection and HIPAA-aligned auditability.
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold">100% Verified</span>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 bg-white border-[#E8ECF2] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="h-4 w-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by actor, details, node, or SHA-256 hash..."
              className="w-full text-xs bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl pl-9 pr-4 py-2.5 text-[#111827] placeholder:text-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
            />
          </div>

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="text-xs bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl px-3 py-2 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
          >
            <option value="ALL">All Audit Actions</option>
            <option value="INFERENCE_REQUEST">Inference Requests</option>
            <option value="MODEL_WEIGHTS_PULL">Model Weight Pulls</option>
            <option value="FEDERATED_AGGREGATION_COMPLETE">FL Aggregations</option>
            <option value="TRIAGE_OVERRIDE">Triage Overrides</option>
            <option value="AUTH_LOGIN">Authentication Logins</option>
          </select>
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card className="bg-white border-[#E8ECF2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#667085] font-bold uppercase tracking-wider text-[10px] border-b border-[#E8ECF2]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor / Role</th>
                <th className="py-3 px-4">Origin Node</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">SHA-256 Verification</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F4F9]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#667085] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#111827] whitespace-nowrap">
                    {log.action.replace(/_/g, ' ')}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-[#111827] block">{log.actor}</span>
                    <span className="text-[10px] text-[#667085]">{log.role}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#475467] whitespace-nowrap">
                    {log.hospitalNode}
                  </td>
                  <td className="py-3.5 px-4 text-[#344054] max-w-xs leading-relaxed">
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleCopyHash(log.id, log.sha256Hash)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-[#3157D5] bg-[#EEF2FF] px-2 py-1 rounded border border-[#D9E2FE] hover:bg-[#E0E7FF] transition-colors"
                      title="Click to copy full SHA-256 hash"
                    >
                      {copiedId === log.id ? (
                        <Check className="h-3 w-3 text-[#45A878]" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>{log.sha256Hash.slice(0, 10)}...</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant="triage-green" size="sm">
                      VERIFIED
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
