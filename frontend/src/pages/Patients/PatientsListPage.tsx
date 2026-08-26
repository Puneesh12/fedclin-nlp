import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  FileText,
  AlertTriangle,
  Hospital,
  Activity,
  Plus,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_PATIENTS } from '@/data/mockPatients'

export const PatientsListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTriage, setSelectedTriage] = useState<'ALL' | 'RED' | 'YELLOW' | 'GREEN'>('ALL')
  const [selectedNode, setSelectedNode] = useState('ALL')

  const filteredPatients = MOCK_PATIENTS.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.summary.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.entities.some(e => e.text.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTriage = selectedTriage === 'ALL' || patient.triageStatus === selectedTriage
    const matchesNode = selectedNode === 'ALL' || patient.hospitalOrigin.includes(selectedNode)

    return matchesSearch && matchesTriage && matchesNode
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#111827]">
              Clinical Patient Queue & Triage Registry
            </h1>
            <Badge variant="privacy" size="sm">De-Identified Data</Badge>
          </div>
          <p className="text-xs text-[#667085]">
            Distributed EHR records processed locally across simulated hospital VPC partitions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/clinical-ai">
            <Button size="sm" variant="primary" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              Process New Clinical Note
            </Button>
          </Link>
        </div>
      </div>

      {/* Synthetic Data Disclaimer Callout */}
      <div className="p-3.5 bg-[#EEF2FF]/70 border border-[#D9E2FE] rounded-2xl flex items-center justify-between text-xs text-[#3157D5]">
        <div className="flex items-center gap-2">
          <Hospital className="h-4 w-4 shrink-0" />
          <span>
            <strong>Research Simulation Mode:</strong> Displaying partition-isolated clinical notes. Raw records reside in respective hospital VPCs.
          </span>
        </div>
        <span className="font-mono text-[11px] font-semibold">Zero-Egress Active</span>
      </div>

      {/* Filter and Search Toolbar */}
      <Card className="p-4 border-[#E8ECF2] bg-white space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="h-4 w-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Patient MRN, symptom, diagnosis, or medication..."
              className="w-full text-xs bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl pl-9 pr-4 py-2.5 text-[#111827] placeholder:text-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
            />
          </div>

          {/* Triage Filter Buttons */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider mr-1">
              Triage:
            </span>
            {(['ALL', 'RED', 'YELLOW', 'GREEN'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTriage(t)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedTriage === t
                    ? t === 'RED'
                      ? 'bg-[#E05252] text-white'
                      : t === 'YELLOW'
                      ? 'bg-[#E6B84A] text-white'
                      : t === 'GREEN'
                      ? 'bg-[#45A878] text-white'
                      : 'bg-[#3157D5] text-white'
                    : 'bg-[#F8FAFC] border border-[#E8ECF2] text-[#475467] hover:bg-[#F1F4F9]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Hospital Node Filter */}
          <select
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
            className="text-xs bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl px-3 py-2 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
          >
            <option value="ALL">All Hospital Nodes</option>
            <option value="Hospital A">Hospital Node A (Cardiology)</option>
            <option value="Hospital B">Hospital Node B (Oncology)</option>
            <option value="Hospital C">Hospital Node C (General Med)</option>
          </select>
        </div>
      </Card>

      {/* Patient Records List */}
      <div className="space-y-3">
        {filteredPatients.length === 0 ? (
          <Card className="p-12 text-center border-[#E8ECF2] space-y-3">
            <Users className="h-8 w-8 text-[#98A2B3] mx-auto" />
            <h3 className="font-bold text-sm text-[#111827]">No clinical cases match your filters</h3>
            <p className="text-xs text-[#667085]">Try clearing search parameters or adjusting triage criteria.</p>
          </Card>
        ) : (
          filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              hover
              className="p-5 border-[#E8ECF2] bg-white transition-all space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F4F9]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center font-bold text-xs">
                    {patient.age}y / {patient.gender[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#111827]">{patient.name}</h3>
                      <Badge variant="outline" size="sm">{patient.mrn}</Badge>
                    </div>
                    <span className="text-xs text-[#667085] flex items-center gap-1.5 mt-0.5">
                      <Hospital className="h-3.5 w-3.5 text-[#3157D5]" />
                      {patient.hospitalOrigin} • Admitted {patient.admissionDate}
                    </span>
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
                    <Button size="sm" variant="primary" rightIcon={<ChevronRight className="h-3.5 w-3.5" />}>
                      Examine Patient File
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Chief Complaint & AI Synthesis */}
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#111827]">AI Clinical Synthesis: </span>
                <span className="text-[#475467]">{patient.summary.chiefComplaint}</span>
              </div>

              {/* Vitals & Entity Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {patient.entities.map((e) => (
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
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-[#667085]">
                  <span>HR: {patient.vitals.heartRate} bpm</span>
                  <span>BP: {patient.vitals.bloodPressure}</span>
                  <span>SpO2: {patient.vitals.spO2}%</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
