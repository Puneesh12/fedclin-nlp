import { useState, useCallback } from 'react'
import { MOCK_FL_ROUNDS, MOCK_FEDERATED_NODES } from '@/data/mockFederatedData'
import type { FLRound, FederatedNode } from '@/types/federated'

export function useFederatedTraining() {
  const [rounds, setRounds] = useState<FLRound[]>(MOCK_FL_ROUNDS)
  const [nodes] = useState<FederatedNode[]>(MOCK_FEDERATED_NODES)
  const [isSimulating, setIsSimulating] = useState(false)

  const triggerNextRound = useCallback(() => {
    setIsSimulating(true)
    setTimeout(() => {
      const nextRoundNum = rounds[0].roundNumber + 1
      const newRound: FLRound = {
        roundNumber: nextRoundNum,
        totalRounds: 20,
        status: 'completed',
        globalLoss: Number((rounds[0].globalLoss - 0.012).toFixed(3)),
        globalF1: Number((rounds[0].globalF1 + 0.3).toFixed(1)),
        globalRouge: Number((rounds[0].globalRouge + 0.2).toFixed(1)),
        participatingClients: ['Hospital Node A', 'Hospital Node B', 'Hospital Node C'],
        aggregatedWeightsCount: 198,
        timestamp: new Date().toLocaleTimeString(),
        durationSec: 42,
      }
      setRounds(prev => [newRound, ...prev])
      setIsSimulating(false)
    }, 1000)
  }, [rounds])

  return {
    rounds,
    nodes,
    latestRound: rounds[0],
    isSimulating,
    triggerNextRound,
  }
}
