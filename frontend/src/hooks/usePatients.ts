import { useState, useMemo } from 'react'
import { MOCK_PATIENTS } from '@/data/mockPatients'
import type { Patient, TriageLevel } from '@/types/patient'

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTriage, setSelectedTriage] = useState<string>('ALL')
  const [selectedHospital, setSelectedHospital] = useState<string>('ALL')

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.triageReason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.rawClinicalNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.summary?.chiefComplaint && patient.summary.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTriage = selectedTriage === 'ALL' || patient.triageStatus === selectedTriage
      const matchesHospital = selectedHospital === 'ALL' || patient.hospitalOrigin.includes(selectedHospital)

      return matchesSearch && matchesTriage && matchesHospital
    })
  }, [patients, searchQuery, selectedTriage, selectedHospital])

  return {
    patients,
    filteredPatients,
    searchQuery,
    setSearchQuery,
    selectedTriage,
    setSelectedTriage,
    selectedHospital,
    setSelectedHospital,
    totalCount: patients.length,
    filteredCount: filteredPatients.length,
  }
}
