export type TriageLevel = 'RED' | 'YELLOW' | 'GREEN'

export type EntityCategory = 
  | 'symptom' 
  | 'medication' 
  | 'diagnosis' 
  | 'procedure' 
  | 'lab_value'

export interface MedicalEntity {
  id: string
  text: string
  category: EntityCategory
  confidence: number // e.g. 0.96
  ontologyCode?: string // e.g. SNOMED-CT: 267036007 or ICD-10: R06.02
  startIndex: number
  endIndex: number
}

export interface VitalSigns {
  heartRate: number // bpm
  bloodPressure: string // e.g. "142/88"
  respiratoryRate: number // breaths/min
  spO2: number // %
  temperature: number // °F or °C
  timestamp: string
}

export interface ClinicalSummary {
  chiefComplaint: string
  clinicalImpression: string
  keyRiskFactors: string[]
  recommendedActions: string[]
  modelConfidence: number
  generatedAt: string
}

export interface Patient {
  id: string
  mrn: string // e.g. "MRN-4821"
  name: string // De-identified / synthetic name
  age: number
  gender: 'Male' | 'Female' | 'Other'
  hospitalOrigin: 'Hospital A (Cardiology)' | 'Hospital B (Oncology)' | 'Hospital C (General Med)'
  admissionDate: string
  triageStatus: TriageLevel
  triageReason: string
  vitals: VitalSigns
  rawClinicalNote: string
  entities: MedicalEntity[]
  summary: ClinicalSummary
  assignedPhysician: string
  modelVersion: string
}
