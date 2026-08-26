import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Activity,
  Tag,
  ShieldCheck,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_PATIENTS } from '@/data/mockPatients'
import type { Patient } from '@/types/patient'

export const EHRInteractiveDemo: React.FC = () => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0)
  const [inputText, setInputText] = useState(MOCK_PATIENTS[0].rawClinicalNote)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzedPatient, setAnalyzedPatient] = useState<Patient>(MOCK_PATIENTS[0])

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx)
    setInputText(MOCK_PATIENTS[idx].rawClinicalNote)
    setAnalyzedPatient(MOCK_PATIENTS[idx])
  }

  const handleRunInference = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalyzedPatient(MOCK_PATIENTS[selectedPresetIdx])
    }, 600)
  }

  return (
    <section id="demo" className="py-24 bg-[#F7F9FC] border-b border-[#E8ECF2]">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" size="md" className="mb-4">
            Interactive Product Preview
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
            Experience Clinical NLP in Action
          </h2>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">
            Test the fine-tuned DistilBERT-Bio inference engine on unstructured clinical admission notes and inspect real-time entity recognition and automated triage stratification.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-[#E8ECF2] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#475467] pl-2">
              Select Sample Note:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MOCK_PATIENTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedPresetIdx === idx
                      ? 'bg-[#3157D5] text-white shadow-sm'
                      : 'bg-[#F8FAFC] text-[#475467] hover:bg-[#F1F4F9] border border-[#E8ECF2]'
                  }`}
                >
                  {p.name} ({p.hospitalOrigin.split(' ')[0]}) — {p.triageStatus}
                </button>
              ))}
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            isLoading={isAnalyzing}
            onClick={handleRunInference}
            leftIcon={<Sparkles className="h-3.5 w-3.5" />}
          >
            Run Clinical Inference
          </Button>
        </div>

        {/* Split-Screen Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Raw Clinical Note Input */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#344054] flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-[#3157D5]" />
                Physician Admission Transcript (Raw Text)
              </span>
              <Badge variant="privacy" size="sm">Local On-Device Input</Badge>
            </div>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={16}
                className="w-full bg-white border border-[#E8ECF2] rounded-2xl p-4 font-mono text-xs text-[#344054] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 focus:border-[#3157D5] shadow-xs resize-none"
                placeholder="Enter freeform clinical notes, vitals, and physician observations..."
              />
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#98A2B3] bg-white/90 px-2 py-0.5 rounded border border-[#E8ECF2]">
                {inputText.length} characters
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time AI Extraction */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#344054] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#3157D5]" />
                DistilBERT-Bio Extraction & Triage Result
              </span>

              <Badge
                variant={
                  analyzedPatient.triageStatus === 'RED'
                    ? 'triage-red'
                    : analyzedPatient.triageStatus === 'YELLOW'
                    ? 'triage-yellow'
                    : 'triage-green'
                }
                size="md"
                dot
              >
                TRIAGE {analyzedPatient.triageStatus}
              </Badge>
            </div>

            <Card className="p-6 bg-white border-[#E8ECF2] shadow-sm rounded-2xl space-y-5">
              {/* Abstractive Summary */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block mb-1.5">
                  1. Clinical Brief & Assessment
                </span>
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E8ECF2] text-xs text-[#111827] leading-relaxed space-y-1">
                  <p className="font-semibold text-[#3157D5]">
                    {analyzedPatient.summary.chiefComplaint}
                  </p>
                  <p className="text-[#475467]">
                    {analyzedPatient.summary.clinicalImpression}
                  </p>
                </div>
              </div>

              {/* Medical NER Tags */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                    2. Medical Entities ({analyzedPatient.entities.length} Detected)
                  </span>
                  <span className="text-[10px] font-mono text-[#059669]">
                    Model Confidence: {(analyzedPatient.summary.modelConfidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analyzedPatient.entities.map((ent) => (
                    <Badge
                      key={ent.id}
                      variant={
                        ent.category === 'symptom'
                          ? 'entity-symptom'
                          : ent.category === 'medication'
                          ? 'entity-medication'
                          : ent.category === 'diagnosis'
                          ? 'entity-diagnosis'
                          : ent.category === 'procedure'
                          ? 'entity-procedure'
                          : 'entity-lab'
                      }
                      size="sm"
                    >
                      {ent.text}
                      {ent.ontologyCode && (
                        <span className="text-[9px] opacity-60 ml-1 font-mono">
                          {ent.ontologyCode}
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Triage Justification & Vitals */}
              <div className="pt-3 border-t border-[#F1F4F9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
                    Risk Justification
                  </span>
                  <p className="text-[#475467] leading-relaxed">
                    {analyzedPatient.triageReason}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
                    Key Action Plan
                  </span>
                  <ul className="space-y-1 text-[#344054]">
                    {analyzedPatient.summary.recommendedActions.map((act, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-[#45A878] shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}
