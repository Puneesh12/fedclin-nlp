import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  Brain,
  Network,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Activity,
  Hospital,
  ChevronRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_PATIENTS } from '@/data/mockPatients'
import { MOCK_FEDERATED_NODES, MOCK_FL_ROUNDS } from '@/data/mockFederatedData'
import { MOCK_AUDIT_LOGS } from '@/data/mockAuditLogs'

export const OverviewPage: React.FC = () => {
  const [filterHospital, setFilterHospital] = useState('ALL')

  const filteredPatients = filterHospital === 'ALL'
    ? MOCK_PATIENTS
    : MOCK_PATIENTS.filter(p => p.hospitalOrigin.includes(filterHospital))

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111827]">
              Clinical Intelligence & Research Overview
            </h1>
            <Badge variant="brand" size="sm">Flower 1.8 Engine</Badge>
          </div>
          <p className="text-sm text-[#667085]">
            Real-time monitoring of federated DistilBERT-Bio training and decentralized clinical triage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/clinical-ai">
            <Button size="md" variant="primary" leftIcon={<Sparkles className="h-4 w-4" />}>
              Open NLP Workbench
            </Button>
          </Link>
          <Link to="/federated-learning">
            <Button size="md" variant="outline" leftIcon={<Network className="h-4 w-4" />}>
              Control Room
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Executive Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="On-Premise Clinical EHRs"
          value="55,450"
          subtitle="Across 3 hospital partitions"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: '1,240 this week', isPositive: true, label: 'locally ingested' }}
        />
        <StatCard
          title="Active FL FedAvg Round"
          value="14 / 20"
          subtitle="Flower coordinator active"
          icon={<Network className="h-5 w-5" />}
          badge={<Badge variant="privacy" size="sm">Δw = 412 KB</Badge>}
        />
        <StatCard
          title="Global DistilBERT-Bio F1"
          value="91.2%"
          subtitle="Micro-avg across 5 entities"
          icon={<Brain className="h-5 w-5" />}
          trend={{ value: '+2.3%', isPositive: true, label: 'vs local baseline' }}
        />
        <StatCard
          title="Privacy Budget (DP-SGD)"
          value="ε = 1.42"
          subtitle="δ = 10⁻⁵ (Zero Data Egress)"
          icon={<Lock className="h-5 w-5" />}
          badge={<Badge variant="privacy" size="sm">VPC Isolated</Badge>}
        />
      </div>

      {/* Hospital Nodes Status Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hospital className="h-4 w-4 text-[#3157D5]" />
            <h2 className="text-base font-bold text-[#111827]">
              Participating Hospital Nodes (Flower 1.8 Clients)
            </h2>
          </div>
          <span className="text-xs text-[#667085] font-mono">3 / 3 Nodes Online</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_FEDERATED_NODES.map((node) => (
            <Card key={node.id} hover className="p-5 border-[#E8ECF2] bg-white space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center font-bold text-sm shadow-xs">
                    {node.name.split(' ')[2]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#111827]">{node.name}</h3>
                    <span className="text-xs text-[#667085]">{node.specialization} Specialization</span>
                  </div>
                </div>
                <Badge
                  variant={node.status === 'training' ? 'brand' : node.status === 'aggregating' ? 'privacy' : 'default'}
                  size="sm"
                  dot
                >
                  {node.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-[#F8FAFC] rounded-xl border border-[#E8ECF2] text-xs">
                <div>
                  <span className="text-[10px] text-[#667085] block">Dataset</span>
                  <span className="font-bold text-[#111827] font-mono">{node.localDatasetSize.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#667085] block">Loss</span>
                  <span className="font-bold text-[#111827] font-mono">{node.localLoss}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#667085] block">Local F1</span>
                  <span className="font-bold text-[#45A878] font-mono">{node.localF1}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#667085] pt-1">
                <span className="font-mono">{node.ipAddressMasked}</span>
                <span className="text-[#3157D5] font-semibold">{node.lastUpdated}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Split Grid: Recent Patients Queue + Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Patients & Triage Queue */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#111827]">
                Clinical Queue & AI Triage Assessments
              </h2>
              <p className="text-xs text-[#667085]">
                Real-time patient classification inferred via DistilBERT-Bio v2.4.1.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 bg-white p-1 rounded-xl border border-[#E8ECF2]">
              {['ALL', 'Hospital A', 'Hospital B', 'Hospital C'].map((hosp) => (
                <button
                  key={hosp}
                  onClick={() => setFilterHospital(hosp)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    filterHospital === hosp
                      ? 'bg-[#3157D5] text-white shadow-xs'
                      : 'text-[#667085] hover:text-[#111827]'
                  }`}
                >
                  {hosp}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                hover
                className="p-5 border-[#E8ECF2] bg-white transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F1F4F9]">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#F1F4F9] text-[#111827] flex items-center justify-center font-bold text-xs">
                      {patient.age}y
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#111827]">{patient.name}</h3>
                        <Badge variant="outline" size="sm">{patient.mrn}</Badge>
                      </div>
                      <span className="text-xs text-[#667085]">{patient.hospitalOrigin}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        patient.triageStatus === 'RED'
                          ? 'triage-red'
                          : patient.triageStatus === 'YELLOW'
                          ? 'triage-yellow'
                          : 'triage-green'
                      }
                      size="md"
                      dot
                    >
                      TRIAGE {patient.triageStatus}
                    </Badge>

                    <Link to={`/patients/${patient.id}`}>
                      <Button size="sm" variant="outline" rightIcon={<ChevronRight className="h-3.5 w-3.5" />}>
                        Examine Case
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Summary snippet */}
                <div className="text-xs text-[#344054]">
                  <span className="font-bold text-[#111827]">AI Synthesis: </span>
                  {patient.summary.chiefComplaint}
                </div>

                {/* Extracted Entities preview chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {patient.entities.slice(0, 5).map((e) => (
                    <Badge
                      key={e.id}
                      variant={
                        e.category === 'symptom'
                          ? 'entity-symptom'
                          : e.category === 'medication'
                          ? 'entity-medication'
                          : e.category === 'diagnosis'
                          ? 'entity-diagnosis'
                          : e.category === 'procedure'
                          ? 'entity-procedure'
                          : 'entity-lab'
                      }
                      size="sm"
                    >
                      {e.text}
                    </Badge>
                  ))}
                  {patient.entities.length > 5 && (
                    <span className="text-[10px] text-[#98A2B3] self-center">
                      +{patient.entities.length - 5} more
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Cryptographic Audit Stream */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#45A878]" />
              Verifiable Audit Stream
            </h2>
            <Link to="/audit-logs" className="text-xs font-semibold text-[#3157D5] hover:underline">
              View All
            </Link>
          </div>

          <Card className="p-4 bg-white border-[#E8ECF2] shadow-xs space-y-3.5">
            {MOCK_AUDIT_LOGS.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="pb-3 border-b border-[#F1F4F9] last:border-0 last:pb-0 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#111827] text-[11px]">
                    {log.action.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] text-[#98A2B3] font-mono">{log.timestamp.split(' ')[1]}</span>
                </div>
                <p className="text-[#667085] text-[11px] leading-relaxed">
                  {log.details}
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#98A2B3]">
                  <span>{log.actor} ({log.role})</span>
                  <span className="text-[#3157D5]">#{log.sha256Hash.slice(0, 8)}</span>
                </div>
              </div>
            ))}
          </Card>

          {/* Clinical Disclaimer Box */}
          <div className="p-4 bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl text-xs text-[#92400E] space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-[#D97706]" />
              AI Decision Support Advisory
            </span>
            <p className="text-[11px] leading-relaxed">
              Triage risk alerts and extracted clinical entities are generated by simulated DistilBERT-Bio weights to augment licensed physician evaluations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
