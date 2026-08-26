import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Lock,
  Cpu,
  Sparkles,
  HeartPulse,
  FileText,
  CheckCircle2,
  ChevronRight,
  Stethoscope,
  TrendingUp,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { MOCK_PATIENTS } from '@/data/mockPatients'

export const HeroSection: React.FC = () => {
  const [activePatientIdx, setActivePatientIdx] = useState(0)
  const currentPatient = MOCK_PATIENTS[activePatientIdx]

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-32 overflow-hidden">
      {/* Background Soft Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#3157D5]/10 via-[#4F46E5]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-[#45A878]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container size="xl">
        {/* Top Trust Badge */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E8ECF2] shadow-xs rounded-full text-xs font-semibold text-[#344054] mb-8"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3157D5] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3157D5]" />
            </span>
            <span className="text-[#3157D5] font-bold">FedAvg v2.4.1</span>
            <span className="text-[#D0D5DD]">|</span>
            <span className="text-[#667085]">Privacy-Preserving Clinical NLP Platform</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] max-w-5xl leading-[1.08]"
          >
            Clinical intelligence <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3157D5] via-[#4361EE] to-[#2563EB]">
              without moving patient data.
            </span>
          </motion.h1>

          {/* Supporting Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-[#667085] max-w-3xl leading-relaxed font-normal"
          >
            Federated learning enables distributed hospitals to collaboratively train clinical NLP models (<span className="text-[#111827] font-semibold">DistilBERT-Bio</span>) for EHR summarisation, entity extraction, and automated triage—keeping sensitive clinical data strictly inside local hospital walls.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/dashboard">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Explore Live Platform
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline">
                How Federated Learning Works
              </Button>
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-[#667085] font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#45A878]" />
              <span>Zero Raw EHR Egress</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#3157D5]" />
              <span>Flower FL + FedAvg Aggregator</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#E05252]" />
              <span>Clinical Triage Decision Support</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Interactive Floating Clinical Card Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 relative max-w-5xl mx-auto"
        >
          {/* Floating Satellite Chip Top-Left: Privacy Boundary */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex absolute -top-6 -left-8 z-20 items-center gap-2 bg-white/95 border border-[#E8ECF2] shadow-lg shadow-[#3157D5]/5 rounded-2xl px-4 py-2.5 backdrop-blur-md"
          >
            <div className="h-8 w-8 rounded-xl bg-[#F0FDF4] text-[#15803D] flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-[#111827]">VPC Data Locality</p>
              <p className="text-[10px] text-[#667085]">Raw notes never leave Hospital</p>
            </div>
          </motion.div>

          {/* Floating Satellite Chip Top-Right: Federated Weights */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="hidden lg:flex absolute -top-6 -right-8 z-20 items-center gap-2 bg-white/95 border border-[#E8ECF2] shadow-lg shadow-[#3157D5]/5 rounded-2xl px-4 py-2.5 backdrop-blur-md"
          >
            <div className="h-8 w-8 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center">
              <Cpu className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-[#111827]">Weight Sync Only</p>
              <p className="text-[10px] text-[#667085]">Δw = 412 KB per round</p>
            </div>
          </motion.div>

          {/* Floating Satellite Chip Bottom-Right: F1 Metric */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="hidden lg:flex absolute -bottom-6 -right-6 z-20 items-center gap-2 bg-white/95 border border-[#E8ECF2] shadow-lg shadow-[#3157D5]/5 rounded-2xl px-4 py-2.5 backdrop-blur-md"
          >
            <div className="h-8 w-8 rounded-xl bg-[#FEFCE8] text-[#854D0E] flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-[#111827]">DistilBERT-Bio F1</p>
              <p className="text-[10px] font-mono font-bold text-[#45A878]">91.2% Global Micro-F1</p>
            </div>
          </motion.div>

          {/* Main Floating Clinical Interface Container */}
          <Card className="border border-[#E8ECF2] shadow-2xl rounded-3xl bg-white/95 backdrop-blur-xl p-0 overflow-hidden">
            {/* Top Interactive Patient Case Selector Bar */}
            <div className="bg-[#F8FAFC] border-b border-[#E8ECF2] px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#475467] uppercase tracking-wider">
                  Live Simulated Cases:
                </span>
                <div className="flex gap-1.5">
                  {MOCK_PATIENTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePatientIdx(idx)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        activePatientIdx === idx
                          ? 'bg-[#3157D5] text-white shadow-xs'
                          : 'bg-white border border-[#E8ECF2] text-[#475467] hover:bg-[#F1F4F9]'
                      }`}
                    >
                      {p.name} ({p.triageStatus})
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#667085]">
                <span className="h-2 w-2 rounded-full bg-[#45A878]" />
                <span>Node: {currentPatient.hospitalOrigin.split(' ')[0]}</span>
              </div>
            </div>

            {/* Main Clinical Note + AI Inference Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E8ECF2]">
              {/* Left Column: Raw De-identified Clinical Encounter */}
              <div className="lg:col-span-5 p-6 sm:p-7 space-y-4 bg-[#FAFBFD]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#3157D5]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#344054]">
                      Local Unstructured EHR
                    </span>
                  </div>
                  <Badge variant="outline" size="sm">
                    {currentPatient.mrn}
                  </Badge>
                </div>

                <div className="bg-white border border-[#E8ECF2] rounded-xl p-4 font-mono text-xs text-[#344054] leading-relaxed max-h-[280px] overflow-y-auto space-y-2">
                  <div className="text-[10px] text-[#98A2B3] pb-1 border-b border-[#F1F4F9]">
                    ADMISSION NOTE — {currentPatient.admissionDate}
                  </div>
                  <p className="whitespace-pre-line">
                    {currentPatient.rawClinicalNote.slice(0, 360)}...
                  </p>
                </div>

                {/* Vitals Ribbon */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div className="bg-white border border-[#E8ECF2] rounded-lg p-2">
                    <span className="text-[10px] text-[#667085] block font-medium">Heart Rate</span>
                    <span className="text-xs font-bold text-[#111827] tabular-nums">
                      {currentPatient.vitals.heartRate} bpm
                    </span>
                  </div>
                  <div className="bg-white border border-[#E8ECF2] rounded-lg p-2">
                    <span className="text-[10px] text-[#667085] block font-medium">Blood Press</span>
                    <span className="text-xs font-bold text-[#111827] tabular-nums">
                      {currentPatient.vitals.bloodPressure}
                    </span>
                  </div>
                  <div className="bg-white border border-[#E8ECF2] rounded-lg p-2">
                    <span className="text-[10px] text-[#667085] block font-medium">SpO2</span>
                    <span className="text-xs font-bold text-[#111827] tabular-nums">
                      {currentPatient.vitals.spO2}%
                    </span>
                  </div>
                  <div className="bg-white border border-[#E8ECF2] rounded-lg p-2">
                    <span className="text-[10px] text-[#667085] block font-medium">Resp Rate</span>
                    <span className="text-xs font-bold text-[#111827] tabular-nums">
                      {currentPatient.vitals.respiratoryRate}/m
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: DistilBERT-Bio AI Output (Summary, Entities, Triage) */}
              <div className="lg:col-span-7 p-6 sm:p-7 space-y-5 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                      AI Clinical Intelligence Interpretation
                    </span>
                  </div>

                  {/* Triage Badge */}
                  <Badge
                    variant={
                      currentPatient.triageStatus === 'RED'
                        ? 'triage-red'
                        : currentPatient.triageStatus === 'YELLOW'
                        ? 'triage-yellow'
                        : 'triage-green'
                    }
                    size="md"
                    dot
                  >
                    TRIAGE {currentPatient.triageStatus}
                  </Badge>
                </div>

                {/* AI Summary Block */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                    EHR Summarisation (Abstractive BioBERT)
                  </span>
                  <div className="bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl p-3.5 text-xs text-[#111827] leading-relaxed">
                    <p className="font-semibold text-[#3157D5] mb-1">
                      {currentPatient.summary.chiefComplaint}
                    </p>
                    <p className="text-[#475467]">
                      {currentPatient.summary.clinicalImpression}
                    </p>
                  </div>
                </div>

                {/* Extracted Medical Entities (NER) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold uppercase tracking-wider text-[#667085]">
                      Named Entity Recognition ({currentPatient.entities.length} Extracted)
                    </span>
                    <span className="font-mono text-[10px] text-[#45A878]">
                      Avg Confidence: {(currentPatient.summary.modelConfidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {currentPatient.entities.map((e) => (
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
                          <span className="opacity-60 text-[9px] ml-1 font-mono">
                            {e.ontologyCode.split(' ')[0]}
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Risk Indicators & Actions */}
                <div className="pt-2 border-t border-[#F1F4F9] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#667085]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#45A878]" />
                    <span>Federated Weights v2.4.1 (On-Device Inference)</span>
                  </div>
                  <Link
                    to={`/patients/${currentPatient.id}`}
                    className="text-[#3157D5] font-semibold hover:underline flex items-center gap-1"
                  >
                    Full Case Analysis <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  )
}
