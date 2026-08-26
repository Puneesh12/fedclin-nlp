export const MOCK_BACKEND_PATIENTS = [
  {
    id: 'pat-4821',
    mrn: 'MRN-4821',
    name: 'Patient #4821',
    age: 64,
    gender: 'Male',
    hospitalOrigin: 'Hospital Node A (Cardiology)',
    triageStatus: 'RED',
    admissionDate: '2026-08-26 18:45',
    vitals: { heartRate: 118, bloodPressure: '168/98', spO2: 92, respiratoryRate: 24, temperature: 37.4 }
  },
  {
    id: 'pat-3914',
    mrn: 'MRN-3914',
    name: 'Patient #3914',
    age: 52,
    gender: 'Female',
    hospitalOrigin: 'Hospital Node B (Oncology)',
    triageStatus: 'YELLOW',
    admissionDate: '2026-08-26 14:20',
    vitals: { heartRate: 104, bloodPressure: '112/70', spO2: 97, respiratoryRate: 19, temperature: 38.6 }
  }
]
