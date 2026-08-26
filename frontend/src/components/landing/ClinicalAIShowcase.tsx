import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  FileText,
  Tag,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export const ClinicalAIShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summarization' | 'ner' | 'triage'>('ner')

  return (
    <section id="clinical-ai" className="py-24 bg-[#F7F9FC]">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" size="md" className="mb-4">
            Clinical AI Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            Three pillars of clinical intelligence
          </h2>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">
            DistilBERT-Bio transformer models fine-tuned collaboratively across distributed hospital nodes to assist clinical decision-making.
          </p>

          {/* Clinical Decision Support Banner */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl text-xs text-[#92400E]">
            <AlertTriangle className="h-4 w-4 text-[#D97706] shrink-0" />
            <span>
              <strong>Clinical Decision Support System:</strong> Designed to augment physician workflows. Does not replace autonomous licensed medical judgement.
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white p-1.5 rounded-2xl border border-[#E8ECF2] shadow-xs">
            <button
              onClick={() => setActiveTab('summarization')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all',
                activeTab === 'summarization'
                  ? 'bg-[#3157D5] text-white shadow-sm'
                  : 'text-[#475467] hover:text-[#111827]'
              )}
            >
              <FileText className="h-4 w-4" />
              1. EHR Summarisation
            </button>
            <button
              onClick={() => setActiveTab('ner')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all',
                activeTab === 'ner'
                  ? 'bg-[#3157D5] text-white shadow-sm'
                  : 'text-[#475467] hover:text-[#111827]'
              )}
            >
              <Tag className="h-4 w-4" />
              2. Medical NER
            </button>
            <button
              onClick={() => setActiveTab('triage')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all',
                activeTab === 'triage'
                  ? 'bg-[#3157D5] text-white shadow-sm'
                  : 'text-[#475467] hover:text-[#111827]'
              )}
            >
              <Activity className="h-4 w-4" />
              3. Triage Classification
            </button>
          </div>
        </div>

        {/* Dynamic Capability Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {activeTab === 'summarization' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <Badge variant="brand" size="sm">Abstractive BioBERT</Badge>
                <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                  Instant Clinical Synthesis from Unstructured Physician Notes
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Transforms multi-page freeform clinical encounter notes, telemetry transcripts, and discharge summaries into structured, actionable physician briefs.
                </p>
                <ul className="space-y-2.5 text-xs text-[#344054]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#45A878]" />
                    <span>Extracts Chief Complaint & Clinical Trajectory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#45A878]" />
                    <span>Synthesizes Differential Diagnosis & Key Risk Factors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#45A878]" />
                    <span>Cross-correlates vitals and lab alerts automatically</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7">
                <Card className="p-6 bg-white border-[#E8ECF2] shadow-lg rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9]">
                    <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                      Structured Clinical Brief Preview
                    </span>
                    <Badge variant="privacy" size="sm">ROUGE-L: 88.4%</Badge>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E8ECF2]">
                      <span className="text-[10px] font-bold uppercase text-[#667085] block mb-1">
                        Chief Complaint
                      </span>
                      <p className="font-semibold text-[#111827]">
                        Acute anterior STEMI presenting with crushing chest pain, dyspnea, and elevated troponin.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#FEF2F2] p-3 rounded-xl border border-[#FECACA]">
                        <span className="text-[10px] font-bold uppercase text-[#991B1B] block mb-1">
                          Key Risk Factors
                        </span>
                        <p className="text-[#991B1B]">
                          Troponin I 480 ng/L, ST elevation V2-V5, refractory to Nitroglycerin.
                        </p>
                      </div>
                      <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0]">
                        <span className="text-[10px] font-bold uppercase text-[#166534] block mb-1">
                          Recommended Action
                        </span>
                        <p className="text-[#166534]">
                          Immediate primary PCI catheterization activation; DAPT loading dose administered.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'ner' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <Badge variant="brand" size="sm">Sub-Token Extraction</Badge>
                <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                  Medical Named Entity Recognition & Clinical Ontologies
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Identifies and categorizes biomedical concepts with standard ontology mappings (SNOMED-CT, ICD-10, LOINC, and RxNorm).
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9]">
                    <span className="font-bold block">Symptoms</span>
                    <span className="text-[10px] opacity-80">Pain, Dyspnea, Fever</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#ECFEFF] border border-[#CFFAFE] text-[#0E7490]">
                    <span className="font-bold block">Medications</span>
                    <span className="text-[10px] opacity-80">Dosages & Routes</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
                    <span className="font-bold block">Diagnoses</span>
                    <span className="text-[10px] opacity-80">ICD-10 Categorization</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]">
                    <span className="font-bold block">Lab Values</span>
                    <span className="text-[10px] opacity-80">Reference Range Check</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card className="p-6 bg-white border-[#E8ECF2] shadow-lg rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9]">
                    <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                      Interactive Entity Highlighting Sample
                    </span>
                    <Badge variant="privacy" size="sm">F1-Score: 91.2%</Badge>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl text-xs font-mono leading-loose text-[#344054]">
                    Patient presents with{' '}
                    <span className="bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] px-1.5 py-0.5 rounded font-semibold">
                      crushing retrosternal chest pain
                    </span>{' '}
                    and acute{' '}
                    <span className="bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] px-1.5 py-0.5 rounded font-semibold">
                      dyspnea
                    </span>
                    . History of{' '}
                    <span className="bg-[#FFF1F2] text-[#BE123C] border border-[#FFE4E6] px-1.5 py-0.5 rounded font-semibold">
                      coronary artery disease
                    </span>
                    . Administered sublingual{' '}
                    <span className="bg-[#ECFEFF] text-[#0E7490] border border-[#CFFAFE] px-1.5 py-0.5 rounded font-semibold">
                      Nitroglycerin 0.4mg
                    </span>
                    . Stat ECG confirms{' '}
                    <span className="bg-[#FFF1F2] text-[#BE123C] border border-[#FFE4E6] px-1.5 py-0.5 rounded font-semibold">
                      acute anterior STEMI
                    </span>{' '}
                    with{' '}
                    <span className="bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-1.5 py-0.5 rounded font-semibold">
                      Troponin I 480 ng/L
                    </span>
                    . Scheduled for emergent{' '}
                    <span className="bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7] px-1.5 py-0.5 rounded font-semibold">
                      cardiac catheterization
                    </span>
                    .
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'triage' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <Badge variant="brand" size="sm">Risk Stratification</Badge>
                <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                  Algorithmic Emergency Triage & Urgency Scoring
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Evaluates clinical features, physiological vitals, and extracted lab anomalies to provide immediate three-tier triage flags for emergency admissions.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
                    <span className="h-3 w-3 rounded-full bg-[#E05252] shrink-0" />
                    <div>
                      <strong className="text-[#991B1B]">RED (Immediate High Risk):</strong> Critical instability, STEMI, severe sepsis, airway compromise.
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FEFCE8] border border-[#FEF08A]">
                    <span className="h-3 w-3 rounded-full bg-[#E6B84A] shrink-0" />
                    <div>
                      <strong className="text-[#854D0E]">YELLOW (Clinical Review):</strong> Febrile neutropenia, moderate distress, abnormal labs.
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
                    <span className="h-3 w-3 rounded-full bg-[#45A878] shrink-0" />
                    <div>
                      <strong className="text-[#166534]">GREEN (Routine / Ambulatory):</strong> Stable vitals, minor viral illnesses, scheduled follow-up.
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="p-5 border-[#FECACA] bg-[#FEF2F2]/30 space-y-3">
                    <Badge variant="triage-red" size="sm" dot>RED TRIAGE</Badge>
                    <h4 className="font-bold text-sm text-[#991B1B]">Patient #4821</h4>
                    <p className="text-xs text-[#7F1D1D] leading-relaxed">
                      Anterior STEMI with Troponin 480 ng/L and tachypnea.
                    </p>
                    <span className="text-[10px] font-semibold text-[#991B1B] block pt-2 border-t border-[#FECACA]">
                      Cath Lab Transfer
                    </span>
                  </Card>

                  <Card className="p-5 border-[#FEF08A] bg-[#FEFCE8]/30 space-y-3">
                    <Badge variant="triage-yellow" size="sm" dot>YELLOW TRIAGE</Badge>
                    <h4 className="font-bold text-sm text-[#854D0E]">Patient #3914</h4>
                    <p className="text-xs text-[#78350F] leading-relaxed">
                      Post-chemo fever (38.6°C) with severe neutropenia (ANC 420).
                    </p>
                    <span className="text-[10px] font-semibold text-[#854D0E] block pt-2 border-t border-[#FEF08A]">
                      Blood Cultures & IV Cefepime
                    </span>
                  </Card>

                  <Card className="p-5 border-[#BBF7D0] bg-[#F0FDF4]/30 space-y-3">
                    <Badge variant="triage-green" size="sm" dot>GREEN TRIAGE</Badge>
                    <h4 className="font-bold text-sm text-[#166534]">Patient #1052</h4>
                    <p className="text-xs text-[#14532D] leading-relaxed">
                      Mild upper respiratory symptoms, normal vitals (SpO2 99%).
                    </p>
                    <span className="text-[10px] font-semibold text-[#166534] block pt-2 border-t border-[#BBF7D0]">
                      Outpatient Supportive Care
                    </span>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
