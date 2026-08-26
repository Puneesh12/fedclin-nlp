import { MOCK_BACKEND_PATIENTS } from '../data/patient.store.js'

export const getPatients = (req, res) => {
  const { node } = req.query
  let results = MOCK_BACKEND_PATIENTS

  if (node) {
    results = results.filter(p => p.hospitalOrigin.includes(node))
  }

  res.json({
    count: results.length,
    patients: results,
    zeroEgress: true,
  })
}

export const getPatientById = (req, res) => {
  const { id } = req.params
  const patient = MOCK_BACKEND_PATIENTS.find(p => p.id === id)

  if (!patient) {
    return res.status(404).json({ error: 'Patient record not found in local node partition' })
  }

  res.json(patient)
}
