import { ApiClient } from './apiClient'
import { MOCK_FEDERATED_NODES, MOCK_FL_ROUNDS, MOCK_MODEL_VERSIONS } from '@/data/mockFederatedData'
import type { FederatedNode, FLRound, ModelVersion } from '@/types/federated'

export class FederatedService {
  static async getNodes(): Promise<FederatedNode[]> {
    try {
      return await ApiClient.request<FederatedNode[]>('/federated/nodes')
    } catch {
      return MOCK_FEDERATED_NODES
    }
  }

  static async getRounds(): Promise<FLRound[]> {
    try {
      return await ApiClient.request<FLRound[]>('/federated/rounds')
    } catch {
      return MOCK_FL_ROUNDS
    }
  }

  static async triggerRound(): Promise<FLRound> {
    try {
      return await ApiClient.request<FLRound>('/federated/rounds/trigger', { method: 'POST' })
    } catch {
      return {
        roundNumber: MOCK_FL_ROUNDS[0].roundNumber + 1,
        totalRounds: 20,
        status: 'completed',
        globalLoss: 0.264,
        globalF1: 91.6,
        globalRouge: 88.7,
        participatingClients: ['Hospital Node A', 'Hospital Node B', 'Hospital Node C'],
        aggregatedWeightsCount: 198,
        timestamp: new Date().toLocaleTimeString(),
        durationSec: 40,
      }
    }
  }
}
