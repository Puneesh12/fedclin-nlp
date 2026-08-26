import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: '*' }))
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'fedclin-nlp-backend',
    timestamp: new Date().toISOString(),
    privacyMode: 'ZERO_EGRESS_VPC',
  })
})

// Authentication Mock / Pass-through
app.post('/api/v1/auth/login', (req, res) => {
  const { email } = req.body
  res.json({
    token: 'jwt_mock_token_fedclin_' + Date.now(),
    user: {
      id: 'usr-1',
      name: 'Puneesh Gulati',
      email: email || 'puneeshgulati05@gmail.com',
      role: 'Doctor',
      hospitalAffiliation: 'Hospital Node A (Cardiology)',
    },
  })
})

// FL Coordination Status endpoint
app.get('/api/v1/federated/status', (req, res) => {
  res.json({
    activeRound: 14,
    totalRounds: 20,
    modelVersion: 'distilbert-bio-v2.4.1',
    nodesOnline: 3,
    status: 'TRAINING_IN_PROGRESS',
    privacyBudgetUsed: 1.42,
  })
})

app.listen(PORT, () => {
  console.log(`[FedClinNLP Backend] Listening on port ${PORT}`)
})
