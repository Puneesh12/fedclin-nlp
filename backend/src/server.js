import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { auditLoggerMiddleware } from './middleware/audit.middleware.js'
import { rateLimiter } from './middleware/security.middleware.js'
import { loginUser, verifySession } from './controllers/auth.controller.js'
import { getPatients, getPatientById } from './controllers/patient.controller.js'
import nlpRouter from './routes/nlp.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(rateLimiter())
app.use(auditLoggerMiddleware)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'fedclin-nlp-backend',
    timestamp: new Date().toISOString(),
    privacyMode: 'ZERO_EGRESS_VPC',
  })
})

// Authentication Routes
app.post('/api/v1/auth/login', loginUser)
app.get('/api/v1/auth/session', verifySession)

// Patient Records Routes
app.get('/api/v1/patients', getPatients)
app.get('/api/v1/patients/:id', getPatientById)

// Clinical NLP Inference Proxy
app.use('/api/v1/nlp', nlpRouter)

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
