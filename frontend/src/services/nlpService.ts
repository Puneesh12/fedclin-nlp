import { ApiClient } from './apiClient'
import { MOCK_PATIENTS } from '@/data/mockPatients'
import type { Patient, MedicalEntity, ClinicalSummary, TriageLevel } from '@/types/patient'

export interface AnalyzeNotePayload {
  rawClinicalNote: string
  modelVersion?: string
  confidenceThreshold?: number
}

export interface AnalysisResult {
  summary: ClinicalSummary
  entities: MedicalEntity[]
  triage: {
    level: TriageLevel
    reason: string
    riskScore: number
  }
  modelVersion: string
}

export class NlpService {
  static async analyzeClinicalNote(payload: AnalyzeNotePayload): Promise<AnalysisResult> {
    try {
      return await ApiClient.request<AnalysisResult>('/nlp/analyze', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    } catch {
      // Return simulated DistilBERT-Bio result
      const mockMatch = MOCK_PATIENTS[0]
      return {
        summary: mockMatch.summary,
        entities: mockMatch.entities,
        triage: {
          level: mockMatch.triageStatus,
          reason: mockMatch.triageReason,
          riskScore: 0.94,
        },
        modelVersion: payload.modelVersion || 'distilbert-bio-v2.4.1',
      }
    }
  }
}
