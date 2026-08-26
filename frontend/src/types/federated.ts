export type NodeStatus = 'active' | 'training' | 'aggregating' | 'idle' | 'offline'

export interface FederatedNode {
  id: string
  name: string
  specialization: 'Cardiology' | 'Oncology' | 'General Medicine' | 'Pulmonology'
  status: NodeStatus
  localDatasetSize: number // e.g. 14200 records
  localLoss: number
  localF1: number
  lastUpdated: string
  gradientPayloadSizeKb: number
  localEpochs: number
  privacyBudgetUsed: number // e.g. 1.2 epsilon
  ipAddressMasked: string
}

export interface FLRound {
  roundNumber: number
  totalRounds: number
  status: 'completed' | 'in_progress' | 'pending'
  globalLoss: number
  globalF1: number
  globalRouge: number
  participatingClients: string[]
  aggregatedWeightsCount: number
  timestamp: string
  durationSec: number
}

export interface ModelVersion {
  version: string // e.g. "distilbert-bio-v2.4.1"
  experimentId: string
  architecture: string // "DistilBERT-Bio (6-layer, 768-dim)"
  roundsCompleted: number
  totalParameters: string // "66.4M"
  globalF1: number
  globalRougeL: number
  createdAt: string
  status: 'production' | 'staging' | 'archived'
  storageUri: string
}
