import React, { useState } from 'react'
import {
  Brain,
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Tag,
  Download,
  Copy,
  Check,
  Hospital,
  Activity,
  Layers,
  Settings2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_PATIENTS } from '@/data/mockPatients'
import type { MedicalEntity, TriageLevel } from '@/types/patient'

interface PresetCase {
  title: string
  specialty: string
  note: string
  triage: TriageLevel
  summary: {
    chiefComplaint: string
    clinicalImpression: string
    riskFactors: string[]
    actions: string[]
  }
  entities: MedicalEntity[]
}

const PRESET_CASES: PresetCase[] = [
  {
    title: 'Acute Coronary Syndrome (STEMI)',
    specialty: 'Cardiology (Hospital Node A)',
    triage: 'RED',
    note: `EMERGENCY ADMISSION NOTE
Patient: #4821 | Age: 64 | Male | Admitted: 2026-08-26 18:45
CHIEF COMPLAINT:
Severe retrosternal crushing chest pain radiating to left arm and jaw for 90 minutes. Dyspnea, nausea, and diaphoresis present.
VITALS: HR 118 bpm, BP 168/98 mmHg, SpO2 92% ambient air, RR 24/min.
ECG: 2.5mm ST elevation in leads V2-V5. Troponin I 480 ng/L (elevated).
PLAN: Primary PCI catheterization lab activation. Aspirin 325mg and Clopidogrel 600mg administered.`,
    summary: {
      chiefComplaint: 'Acute anterior STEMI with ischemic chest pain and diaphoresis.',
      clinicalImpression: 'Critical cardiovascular emergency requiring emergent percutaneous coronary intervention.',
      riskFactors: ['Troponin I 480 ng/L', 'ST elevation V2-V5', 'Refractory to sublingual Nitroglycerin'],
      actions: ['Immediate Cath Lab transfer', 'DAPT loading completed', 'Continuous telemetry monitoring'],
    },
    entities: [
      { id: 'e1', text: 'retrosternal crushing chest pain', category: 'symptom', confidence: 0.98, ontologyCode: 'SNOMED: 29857009', startIndex: 110, endIndex: 142 },
      { id: 'e2', text: 'Dyspnea', category: 'symptom', confidence: 0.96, ontologyCode: 'SNOMED: 267036007', startIndex: 185, endIndex: 192 },
      { id: 'e3', text: 'diaphoresis', category: 'symptom', confidence: 0.94, ontologyCode: 'SNOMED: 52613005', startIndex: 205, endIndex: 216 },
      { id: 'e4', text: 'ST elevation V2-V5', category: 'diagnosis', confidence: 0.99, ontologyCode: 'ICD-10: I21.09', startIndex: 290, endIndex: 308 },
      { id: 'e5', text: 'Troponin I 480 ng/L', category: 'lab_value', confidence: 0.97, ontologyCode: 'LOINC: 10839-9', startIndex: 310, endIndex: 329 },
      { id: 'e6', text: 'Aspirin 325mg', category: 'medication', confidence: 0.98, ontologyCode: 'RxNorm: 1191', startIndex: 410, endIndex: 423 },
      { id: 'e7', text: 'Clopidogrel 600mg', category: 'medication', confidence: 0.97, ontologyCode: 'RxNorm: 32968', startIndex: 428, endIndex: 445 },
      { id: 'e8', text: 'Primary PCI catheterization', category: 'procedure', confidence: 0.96, ontologyCode: 'SNOMED: 41976001', startIndex: 350, endIndex: 377 },
    ],
  },
  {
    title: 'Febrile Neutropenia',
    specialty: 'Oncology (Hospital Node B)',
    triage: 'YELLOW',
    note: `ONCOLOGY DAY CARE ADMISSION NOTE
Patient: #3914 | Age: 52 | Female | Admitted: 2026-08-26 14:20
CHIEF COMPLAINT:
Fever 38.6°C at home with shivering 8 days post Cycle 3 AC-T chemotherapy for invasive ductal breast cancer.
VITALS: HR 104 bpm, BP 112/70 mmHg, SpO2 97%, RR 19/min, Temp 38.6°C.
LABS: Absolute Neutrophil Count (ANC) 420/mcL (severe neutropenia), WBC 1.8.
PLAN: Blood cultures stat. Empiric IV Cefepime 2g q8h. Subcutaneous Filgrastim 300mcg daily.`,
    summary: {
      chiefComplaint: 'Post-chemotherapy febrile neutropenia (ANC 420/mcL).',
      clinicalImpression: 'Moderate oncologic urgency at risk of rapid septic decompensation without broad-spectrum coverage.',
      riskFactors: ['Severe neutropenia (ANC < 500)', 'Fever 38.6°C', 'Immunosuppressed status'],
      actions: ['Stat blood cultures', 'Empiric IV Cefepime 2g', 'Daily Filgrastim G-CSF support'],
    },
    entities: [
      { id: 'e20', text: 'Fever 38.6°C', category: 'symptom', confidence: 0.99, ontologyCode: 'SNOMED: 386661006', startIndex: 110, endIndex: 122 },
      { id: 'e21', text: 'invasive ductal breast cancer', category: 'diagnosis', confidence: 0.97, ontologyCode: 'ICD-10: C50.919', startIndex: 180, endIndex: 209 },
      { id: 'e22', text: 'ANC 420/mcL', category: 'lab_value', confidence: 0.96, ontologyCode: 'LOINC: 751-8', startIndex: 300, endIndex: 311 },
      { id: 'e23', text: 'IV Cefepime 2g', category: 'medication', confidence: 0.97, ontologyCode: 'RxNorm: 20481', startIndex: 370, endIndex: 384 },
      { id: 'e24', text: 'Filgrastim 300mcg', category: 'medication', confidence: 0.95, ontologyCode: 'RxNorm: 228476', startIndex: 405, endIndex: 422 },
      { id: 'e25', text: 'Blood cultures stat', category: 'procedure', confidence: 0.94, ontologyCode: 'SNOMED: 301095005', startIndex: 345, endIndex: 364 },
    ],
  },
  {
    title: 'Acute Asthmatic Exacerbation',
    specialty: 'Pulmonology / Emergency',
    triage: 'RED',
    note: `EMERGENCY CLINICAL ENCOUNTER
Patient: #5109 | Age: 29 | Female | Admitted: 2026-08-27 01:10
CHIEF COMPLAINT:
Severe acute shortness of breath and audible wheezing refractory to rescue Albuterol inhaler x4 at home. Speaks in 2-3 word sentences.
VITALS: HR 126 bpm, BP 138/86 mmHg, SpO2 89% room air, RR 32/min (intercostal retractions).
PLAN: Continuous nebulized Albuterol + Ipratropium. IV Methylprednisolone 60mg stat. High-flow O2 via non-rebreather mask.`,
    summary: {
      chiefComplaint: 'Status asthmaticus with acute hypoxemic respiratory distress.',
      clinicalImpression: 'Critical airway urgency with impending respiratory fatigue; requires immediate aggressive bronchodilation.',
      riskFactors: ['SpO2 89% on ambient air', 'Severe tachypnea RR 32/min', 'Refractory to home SABA'],
      actions: ['Continuous duo-neb bronchodilators', 'Systemic IV corticosteroids', 'High-flow oxygen therapy'],
    },
    entities: [
      { id: 'e30', text: 'shortness of breath', category: 'symptom', confidence: 0.98, ontologyCode: 'SNOMED: 267036007', startIndex: 110, endIndex: 129 },
      { id: 'e31', text: 'audible wheezing', category: 'symptom', confidence: 0.97, ontologyCode: 'SNOMED: 56018004', startIndex: 134, endIndex: 150 },
      { id: 'e32', text: 'Albuterol inhaler', category: 'medication', confidence: 0.98, ontologyCode: 'RxNorm: 435', startIndex: 175, endIndex: 192 },
      { id: 'e33', text: 'intercostal retractions', category: 'symptom', confidence: 0.95, ontologyCode: 'SNOMED: 248550003', startIndex: 290, endIndex: 313 },
      { id: 'e34', text: 'Methylprednisolone 60mg', category: 'medication', confidence: 0.97, ontologyCode: 'RxNorm: 6902', startIndex: 380, endIndex: 403 },
      { id: 'e35', text: 'nebulized Albuterol + Ipratropium', category: 'procedure', confidence: 0.96, ontologyCode: 'SNOMED: 371530005', startIndex: 335, endIndex: 368 },
    ],
  },
  {
    title: 'Kaggle MTSamples: Congestive Heart Failure',
    specialty: 'Cardiovascular (Kaggle Dataset)',
    triage: 'YELLOW',
    note: `SUBJECTIVE: A 71-year-old female with ischemic cardiomyopathy (EF 30%) presents with progressive shortness of breath, 3-pillow orthopnea, and bilateral lower extremity edema worsening over 5 days.
OBJECTIVE: Vitals: BP 152/88 mmHg, HR 96 bpm, RR 22/min, SpO2 91% on room air. Jugular venous distension noted at 8 cm. Bibasilar pulmonary crackles on auscultation. 3+ pitting pedal edema bilaterally. BNP elevated at 1,450 pg/mL.
ASSESSMENT: Acute decompensated heart failure exacerbation secondary to dietary sodium indiscretion.
PLAN: Admit to telemetry. Administer IV Furosemide 80 mg stat. Continue carvedilol and lisinopril. Fluid restriction to 1.5 L/day.`,
    summary: {
      chiefComplaint: 'Acute decompensated congestive heart failure with orthopnea and peripheral edema.',
      clinicalImpression: 'Fluid overload crisis requiring immediate IV loop diuresis and inpatient telemetry monitoring.',
      riskFactors: ['BNP 1,450 pg/mL', 'Ischemic cardiomyopathy (EF 30%)', 'Bilateral 3+ pitting edema'],
      actions: ['IV Furosemide 80mg stat', 'Strict 1.5L fluid restriction', 'Continuous telemetry monitoring'],
    },
    entities: [
      { id: 'e40', text: 'shortness of breath', category: 'symptom', confidence: 0.98, ontologyCode: 'SNOMED: 267036007', startIndex: 88, endIndex: 107 },
      { id: 'e41', text: 'orthopnea', category: 'symptom', confidence: 0.97, ontologyCode: 'SNOMED: 68673006', startIndex: 118, endIndex: 127 },
      { id: 'e42', text: 'pedal edema', category: 'symptom', confidence: 0.96, ontologyCode: 'SNOMED: 267038008', startIndex: 160, endIndex: 171 },
      { id: 'e43', text: 'ischemic cardiomyopathy', category: 'diagnosis', confidence: 0.98, ontologyCode: 'ICD-10: I25.5', startIndex: 35, endIndex: 58 },
      { id: 'e44', text: 'BNP 1,450 pg/mL', category: 'lab_value', confidence: 0.99, ontologyCode: 'LOINC: 30934-4', startIndex: 380, endIndex: 395 },
      { id: 'e45', text: 'IV Furosemide 80 mg', category: 'medication', confidence: 0.98, ontologyCode: 'RxNorm: 4603', startIndex: 520, endIndex: 539 },
    ],
  },
]

export const ClinicalAIPage: React.FC = () => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0)
  const [noteText, setNoteText] = useState(PRESET_CASES[0].note)
  const [confidenceThreshold, setConfidenceThreshold] = useState(85)
  const [selectedModel, setSelectedModel] = useState('distilbert-bio-v2.4.1')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentResult, setCurrentResult] = useState<PresetCase>(PRESET_CASES[0])
  const [copied, setCopied] = useState(false)

  const handleSelectPreset = (idx: number) => {
    setSelectedCaseIdx(idx)
    setNoteText(PRESET_CASES[idx].note)
    setCurrentResult(PRESET_CASES[idx])
  }

  const handleRunAnalysis = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentResult(PRESET_CASES[selectedCaseIdx])
    }, 650)
  }

  const handleCopyJSON = () => {
    const payload = JSON.stringify(
      {
        model_version: selectedModel,
        triage_level: currentResult.triage,
        summary: currentResult.summary,
        entities: currentResult.entities.filter((e) => e.confidence * 100 >= confidenceThreshold),
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
    navigator.clipboard.writeText(payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const visibleEntities = currentResult.entities.filter(
    (e) => e.confidence * 100 >= confidenceThreshold
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#111827]">
              Clinical AI NLP Workbench
            </h1>
            <Badge variant="brand" size="sm">DistilBERT-Bio</Badge>
          </div>
          <p className="text-xs text-[#667085]">
            Abstractive clinical summarization, multi-ontology entity extraction, and automated triage scoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyJSON}
            leftIcon={copied ? <Check className="h-3.5 w-3.5 text-[#45A878]" /> : <Copy className="h-3.5 w-3.5" />}
          >
            {copied ? 'Copied JSON' : 'Export Structured JSON'}
          </Button>

          <Button
            size="sm"
            variant="primary"
            isLoading={isProcessing}
            onClick={handleRunAnalysis}
            leftIcon={<Sparkles className="h-3.5 w-3.5" />}
          >
            Execute Inference
          </Button>
        </div>
      </div>

      {/* Model & Parameter Control Bar */}
      <Card className="p-4 bg-white border-[#E8ECF2] shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {/* Model Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
              Active Federated Model Checkpoint
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full text-xs font-semibold bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl px-3 py-2 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
            >
              <option value="distilbert-bio-v2.4.1">distilbert-bio-v2.4.1 (FedAvg Round 14 - Production)</option>
              <option value="distilbert-bio-v2.3.0">distilbert-bio-v2.3.0 (FedAvg Round 10 - Staging)</option>
            </select>
          </div>

          {/* Confidence Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                Confidence Threshold
              </label>
              <span className="text-xs font-mono font-bold text-[#3157D5]">
                ≥ {confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min={70}
              max={99}
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-2 bg-[#E8ECF2] rounded-lg appearance-none cursor-pointer accent-[#3157D5]"
            />
          </div>

          {/* Preset Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
              Quick Case Presets
            </label>
            <div className="flex gap-1.5">
              {PRESET_CASES.map((c, idx) => (
                <button
                  key={c.title}
                  onClick={() => handleSelectPreset(idx)}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg truncate transition-all ${
                    selectedCaseIdx === idx
                      ? 'bg-[#3157D5] text-white shadow-xs'
                      : 'bg-[#F8FAFC] border border-[#E8ECF2] text-[#475467] hover:bg-[#F1F4F9]'
                  }`}
                  title={c.title}
                >
                  {c.title.split(' ')[0]} ({c.triage})
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Split-Screen Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Note Input */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#344054] flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-[#3157D5]" />
              Physician Admission Note (Raw Text)
            </span>
            <span className="text-[10px] text-[#98A2B3] font-mono">
              {noteText.length} chars • {noteText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={18}
            className="w-full bg-white border border-[#E8ECF2] rounded-2xl p-4 font-mono text-xs text-[#344054] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 focus:border-[#3157D5] shadow-xs resize-none"
            placeholder="Paste clinical admission transcript or EHR record..."
          />

          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E8ECF2] flex items-center justify-between text-xs text-[#667085]">
            <span>Preset: {PRESET_CASES[selectedCaseIdx].specialty}</span>
            <Button size="sm" variant="ghost" onClick={() => setNoteText('')} className="text-xs h-7 px-2">
              Clear Text
            </Button>
          </div>
        </div>

        {/* Right Column: AI Extraction Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#344054] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#3157D5]" />
              NLP Synthesis & Triage Urgency Assessment
            </span>

            <Badge
              variant={
                currentResult.triage === 'RED'
                  ? 'triage-red'
                  : currentResult.triage === 'YELLOW'
                  ? 'triage-yellow'
                  : 'triage-green'
              }
              size="md"
              dot
            >
              TRIAGE {currentResult.triage}
            </Badge>
          </div>

          <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-5">
            {/* Abstractive Summary */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block">
                1. Abstractive Clinical Summary
              </span>
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E8ECF2] text-xs leading-relaxed space-y-1.5">
                <p className="font-bold text-[#111827]">
                  {currentResult.summary.chiefComplaint}
                </p>
                <p className="text-[#475467]">
                  {currentResult.summary.clinicalImpression}
                </p>
              </div>
            </div>

            {/* Extracted Medical Named Entities */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                  2. Medical Named Entities ({visibleEntities.length} Above Threshold)
                </span>
                <span className="text-[10px] text-[#45A878] font-mono">
                  DistilBERT-Bio Tokenizer (Sub-token)
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {visibleEntities.map((e) => (
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
                    <span className="opacity-60 text-[9px] ml-1 font-mono">
                      {(e.confidence * 100).toFixed(0)}%
                    </span>
                    {e.ontologyCode && (
                      <span className="text-[9px] bg-white/60 px-1 rounded ml-1 font-mono">
                        {e.ontologyCode}
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Risk Stratification & Recommended Interventions */}
            <div className="pt-3 border-t border-[#F1F4F9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#FEF2F2]/60 rounded-xl border border-[#FECACA] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#991B1B] block">
                  Identified Clinical Risk Factors
                </span>
                <ul className="space-y-1 text-[#7F1D1D]">
                  {currentResult.summary.riskFactors.map((r, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3 w-3 text-[#E05252] shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-[#F0FDF4]/60 rounded-xl border border-[#BBF7D0] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#166534] block">
                  Physician Next Steps
                </span>
                <ul className="space-y-1 text-[#14532D]">
                  {currentResult.summary.actions.map((a, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-[#45A878] shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
