import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Activity,
  Heart,
  Thermometer,
  Wind,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  Tag,
  Stethoscope,
  Lock,
  ChevronRight,
  UserCheck,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_PATIENTS } from '@/data/mockPatients'

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const patient = MOCK_PATIENTS.find((p) => p.id === id) || MOCK_PATIENTS[0]

  const [highlightEntities, setHighlightEntities] = useState(true)
  const [physicianConfirmed, setPhysicianConfirmed] = useState(false)

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/patients">
            <Button size="sm" variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Patient Queue
            </Button>
          </Link>
          <div className="h-4 w-px bg-[#D0D5DD]" />
          <span className="text-xs text-[#667085] font-mono">
            EHR ID: {patient.mrn}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={physicianConfirmed ? 'secondary' : 'primary'}
            onClick={() => setPhysicianConfirmed(!physicianConfirmed)}
            leftIcon={<UserCheck className="h-4 w-4" />}
          >
            {physicianConfirmed ? 'Physician Validated ✓' : 'Confirm AI Triage'}
          </Button>
        </div>
      </div>

      {/* Patient Profile Card */}
      <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F1F4F9]">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#3157D5] to-[#4F46E5] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#3157D5]/20 shrink-0">
              {patient.age}y
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
                  {patient.name}
                </h1>
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
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#667085] mt-1.5 font-medium">
                <span>Gender: <strong className="text-[#111827]">{patient.gender}</strong></span>
                <span>MRN: <strong className="text-[#111827]">{patient.mrn}</strong></span>
                <span>Origin: <strong className="text-[#111827]">{patient.hospitalOrigin}</strong></span>
                <span>Attending: <strong className="text-[#111827]">{patient.assignedPhysician}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F8FAFC] px-3.5 py-2 rounded-xl border border-[#E8ECF2] text-xs font-mono text-[#475467]">
            <Lock className="h-3.5 w-3.5 text-[#45A878]" />
            <span>Node VPC Isolation Active</span>
          </div>
        </div>

        {/* Clinical Vitals Grid */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-3">
            Vital Signs Telemetry (Admission Timestamp: {patient.vitals.timestamp})
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#E8ECF2] text-center space-y-1">
              <span className="text-[10px] font-bold text-[#667085] uppercase">Heart Rate</span>
              <div className="text-lg font-extrabold text-[#111827] font-mono tabular-nums">
                {patient.vitals.heartRate} <span className="text-xs font-normal text-[#667085]">bpm</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${patient.vitals.heartRate > 100 ? 'bg-[#FEF2F2] text-[#B91C1C]' : 'bg-[#F0FDF4] text-[#15803D]'}`}>
                {patient.vitals.heartRate > 100 ? 'Tachycardia' : 'Normal'}
              </span>
            </div>

            <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#E8ECF2] text-center space-y-1">
              <span className="text-[10px] font-bold text-[#667085] uppercase">Blood Pressure</span>
              <div className="text-lg font-extrabold text-[#111827] font-mono tabular-nums">
                {patient.vitals.bloodPressure}
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[#475467] border border-[#E8ECF2]">
                Arterial
              </span>
            </div>

            <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#E8ECF2] text-center space-y-1">
              <span className="text-[10px] font-bold text-[#667085] uppercase">Oxygen SpO2</span>
              <div className="text-lg font-extrabold text-[#111827] font-mono tabular-nums">
                {patient.vitals.spO2}%
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${patient.vitals.spO2 < 95 ? 'bg-[#FEF2F2] text-[#B91C1C]' : 'bg-[#F0FDF4] text-[#15803D]'}`}>
                {patient.vitals.spO2 < 95 ? 'Hypoxemia' : 'Adequate'}
              </span>
            </div>

            <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#E8ECF2] text-center space-y-1">
              <span className="text-[10px] font-bold text-[#667085] uppercase">Resp Rate</span>
              <div className="text-lg font-extrabold text-[#111827] font-mono tabular-nums">
                {patient.vitals.respiratoryRate} <span className="text-xs font-normal text-[#667085]">/min</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${patient.vitals.respiratoryRate > 20 ? 'bg-[#FEF2F2] text-[#B91C1C]' : 'bg-[#F0FDF4] text-[#15803D]'}`}>
                {patient.vitals.respiratoryRate > 20 ? 'Tachypneic' : 'Eupneic'}
              </span>
            </div>

            <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#E8ECF2] text-center space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-[#667085] uppercase">Temperature</span>
              <div className="text-lg font-extrabold text-[#111827] font-mono tabular-nums">
                {patient.vitals.temperature}°C
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${patient.vitals.temperature > 38.0 ? 'bg-[#FEFCE8] text-[#854D0E]' : 'bg-[#F0FDF4] text-[#15803D]'}`}>
                {patient.vitals.temperature > 38.0 ? 'Febrile' : 'Afebrile'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Split: Raw Note vs AI Interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Original Clinical Admission Note */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#344054] flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-[#3157D5]" />
              Original Physician Admission Transcript
            </span>

            <button
              onClick={() => setHighlightEntities(!highlightEntities)}
              className="text-xs font-semibold text-[#3157D5] hover:underline flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {highlightEntities ? 'Hide Entity Highlighting' : 'Highlight Entities'}
            </button>
          </div>

          <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs">
            <div className="font-mono text-xs text-[#344054] leading-loose whitespace-pre-line bg-[#F8FAFC] p-4 rounded-xl border border-[#E8ECF2] max-h-[460px] overflow-y-auto">
              {patient.rawClinicalNote}
            </div>
          </Card>
        </div>

        {/* Right: AI Synthesis & Clinical Risk Assessment */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#344054] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#3157D5]" />
              DistilBERT-Bio Clinical Synthesis
            </span>
            <Badge variant="privacy" size="sm">
              Confidence: {(patient.summary.modelConfidence * 100).toFixed(1)}%
            </Badge>
          </div>

          <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-5">
            {/* Chief Complaint */}
            <div className="p-4 bg-[#EEF2FF]/70 border border-[#D9E2FE] rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3157D5] block">
                Primary Clinical Impression
              </span>
              <p className="text-xs font-bold text-[#111827]">
                {patient.summary.chiefComplaint}
              </p>
              <p className="text-xs text-[#475467] leading-relaxed pt-1">
                {patient.summary.clinicalImpression}
              </p>
            </div>

            {/* Risk Factors & Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#FEF2F2]/60 rounded-xl border border-[#FECACA] space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-[#991B1B] block">
                  Identified Risk Flags
                </span>
                <ul className="space-y-1 text-[#7F1D1D]">
                  {patient.summary.keyRiskFactors.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-[#E05252] shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-[#F0FDF4]/60 rounded-xl border border-[#BBF7D0] space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-[#166534] block">
                  AI Action Plan
                </span>
                <ul className="space-y-1 text-[#14532D]">
                  {patient.summary.recommendedActions.map((a, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#45A878] shrink-0 mt-0.5" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Extracted Medical Named Entities */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block mb-2">
                Medical Entities ({patient.entities.length} Detected)
              </span>
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
                    {e.ontologyCode && (
                      <span className="text-[9px] opacity-60 ml-1 font-mono">
                        {e.ontologyCode}
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Model Metadata Footer */}
            <div className="pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-[11px] text-[#667085] font-mono">
              <span>Model: {patient.modelVersion}</span>
              <span>Generated: {patient.summary.generatedAt}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
