import { ApiClient } from './apiClient'
import { MOCK_PATIENTS } from '@/data/mockPatients'
import type { Patient } from '@/types/patient'

export class PatientService {
  static async getPatients(): Promise<Patient[]> {
    try {
      return await ApiClient.request<Patient[]>('/patients')
    } catch {
      return MOCK_PATIENTS
    }
  }

  static async getPatientById(id: string): Promise<Patient | undefined> {
    try {
      return await ApiClient.request<Patient>(`/patients/${id}`)
    } catch {
      return MOCK_PATIENTS.find((p) => p.id === id) || MOCK_PATIENTS[0]
    }
  }
}
