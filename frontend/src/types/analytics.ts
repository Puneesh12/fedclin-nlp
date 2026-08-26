export interface BenchmarkComparison {
  metric: string
  centralized: number
  federated: number
  unit: '%' | 'ms' | 'MB' | 'rounds'
  description: string
  delta: number
}

export interface NonIIDNodeDistribution {
  nodeId: string
  nodeName: string
  specialization: string
  categoryBreakdown: {
    category: string
    percentage: number
    sampleCount: number
    color: string
  }[]
}

export interface TrainingConvergencePoint {
  round: number
  centralizedLoss: number
  federatedLoss: number
  centralizedF1: number
  federatedF1: number
}
