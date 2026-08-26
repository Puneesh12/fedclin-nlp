import React, { useState } from 'react'
import {
  Network,
  Cpu,
  Server,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Database,
  Lock,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Settings2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StatCard } from '@/components/ui/StatCard'
import { MOCK_FEDERATED_NODES, MOCK_FL_ROUNDS, MOCK_MODEL_VERSIONS } from '@/data/mockFederatedData'
import type { FLRound } from '@/types/federated'

export const FederatedLearningPage: React.FC = () => {
  const [rounds, setRounds] = useState<FLRound[]>(MOCK_FL_ROUNDS)
  const [isSimulatingRound, setIsSimulatingRound] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'topology' | 'rounds' | 'weights'>('topology')

  const handleTriggerNextRound = () => {
    setIsSimulatingRound(true)
    setTimeout(() => {
      setIsSimulatingRound(false)
      const nextRoundNum = rounds[0].roundNumber + 1
      const newRound: FLRound = {
        roundNumber: nextRoundNum,
        totalRounds: 20,
        status: 'completed',
        globalLoss: Number((rounds[0].globalLoss - 0.015).toFixed(3)),
        globalF1: Number((rounds[0].globalF1 + 0.4).toFixed(1)),
        globalRouge: Number((rounds[0].globalRouge + 0.3).toFixed(1)),
        participatingClients: ['Hospital Node A', 'Hospital Node B', 'Hospital Node C'],
        aggregatedWeightsCount: 198,
        timestamp: new Date().toLocaleTimeString(),
        durationSec: 41,
      }
      setRounds([newRound, ...rounds])
    }, 1200)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#111827]">
              Federated Learning Operations & Control Room
            </h1>
            <Badge variant="brand" size="sm">Flower 1.8 FedAvg</Badge>
          </div>
          <p className="text-xs text-[#667085]">
            Decentralized multi-hospital model training coordinator, round progress, and encrypted weight telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="primary"
            isLoading={isSimulatingRound}
            onClick={handleTriggerNextRound}
            leftIcon={<Play className="h-3.5 w-3.5" />}
          >
            Execute FedAvg Round {rounds[0].roundNumber + 1}
          </Button>
        </div>
      </div>

      {/* 4 Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Global Model"
          value="v2.4.1"
          subtitle="DistilBERT-Bio (66.4M params)"
          icon={<Cpu className="h-5 w-5" />}
          badge={<Badge variant="privacy" size="sm">Production</Badge>}
        />
        <StatCard
          title="Completed Rounds"
          value={`${rounds[0].roundNumber} / 20`}
          subtitle="Convergence threshold: 92% F1"
          icon={<Network className="h-5 w-5" />}
          trend={{ value: 'Round In-Flight', isPositive: true }}
        />
        <StatCard
          title="Global Aggregated Loss"
          value={rounds[0].globalLoss}
          subtitle="Cross-entropy over token tags"
          icon={<Activity className="h-5 w-5" />}
          trend={{ value: '-0.032', isPositive: true, label: 'last 2 rounds' }}
        />
        <StatCard
          title="Avg Node Communication"
          value="412 KB"
          subtitle="Zero raw EHR transmission"
          icon={<Lock className="h-5 w-5" />}
          badge={<Badge variant="privacy" size="sm">Δw encrypted</Badge>}
        />
      </div>

      {/* View Switcher Tabs */}
      <div className="flex justify-between items-center bg-white p-1.5 rounded-2xl border border-[#E8ECF2] shadow-xs">
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedTab('topology')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              selectedTab === 'topology'
                ? 'bg-[#3157D5] text-white shadow-xs'
                : 'text-[#475467] hover:bg-[#F8FAFC]'
            }`}
          >
            Hospital Topology & VPCs
          </button>
          <button
            onClick={() => setSelectedTab('rounds')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              selectedTab === 'rounds'
                ? 'bg-[#3157D5] text-white shadow-xs'
                : 'text-[#475467] hover:bg-[#F8FAFC]'
            }`}
          >
            Multi-Round History ({rounds.length})
          </button>
          <button
            onClick={() => setSelectedTab('weights')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              selectedTab === 'weights'
                ? 'bg-[#3157D5] text-white shadow-xs'
                : 'text-[#475467] hover:bg-[#F8FAFC]'
            }`}
          >
            Layer Parameter Weights
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#667085] pr-3">
          <span className="h-2 w-2 rounded-full bg-[#45A878] animate-pulse" />
          <span>Server: grpc://flower.internal:8080</span>
        </div>
      </div>

      {/* Dynamic Tab Views */}
      {selectedTab === 'topology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_FEDERATED_NODES.map((node) => (
              <Card key={node.id} hover className="p-6 border-[#E8ECF2] bg-white space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center font-bold text-sm">
                      {node.name.split(' ')[2]}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#111827]">{node.name}</h3>
                      <span className="text-xs text-[#667085]">{node.specialization} Partition</span>
                    </div>
                  </div>
                  <Badge variant="privacy" size="sm" dot>
                    Online
                  </Badge>
                </div>

                <div className="space-y-2 py-3 px-3.5 bg-[#FAFBFD] rounded-xl border border-[#E8ECF2] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Local Training Loss</span>
                    <span className="font-mono font-bold text-[#111827]">{node.localLoss}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Local Token F1</span>
                    <span className="font-mono font-bold text-[#45A878]">{node.localF1}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Private Dataset Size</span>
                    <span className="font-mono font-semibold text-[#111827]">{node.localDatasetSize.toLocaleString()} notes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Privacy Budget (ε)</span>
                    <span className="font-mono text-[#3157D5] font-semibold">{node.privacyBudgetUsed} / 3.0</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F4F9] flex items-center justify-between text-[11px] text-[#667085] font-mono">
                  <span>{node.ipAddressMasked}</span>
                  <span className="text-[#45A878] font-bold">Local Epochs: {node.localEpochs}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Central Flower Aggregator Box */}
          <Card className="p-6 border-[#D9E2FE] bg-gradient-to-r from-white via-[#EEF2FF]/30 to-white shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-[#3157D5] text-white flex items-center justify-center shadow-md shadow-[#3157D5]/20">
                  <Server className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#111827]">
                    Central Flower Coordinator & Model Registry
                  </h3>
                  <p className="text-xs text-[#667085]">
                    Aggregating weights using FedAvg: <code className="text-[#3157D5] font-mono">w_t+1 = Σ (n_k / n) * w_t+1^k</code>
                  </p>
                </div>
              </div>

              <Badge variant="brand" size="md">
                66.4M Parameters Aggregated
              </Badge>
            </div>
          </Card>
        </div>
      )}

      {selectedTab === 'rounds' && (
        <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#111827]">
              Federated Training Rounds Timeline
            </h3>
            <span className="text-xs text-[#667085]">Latest rounds on top</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#667085] font-bold uppercase tracking-wider text-[10px] border-y border-[#E8ECF2]">
                <tr>
                  <th className="py-3 px-4">Round #</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Global Loss</th>
                  <th className="py-3 px-4">Global F1</th>
                  <th className="py-3 px-4">ROUGE-L</th>
                  <th className="py-3 px-4">Clients</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F4F9]">
                {rounds.map((r) => (
                  <tr key={r.roundNumber} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#111827]">
                      Round {r.roundNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={r.status === 'completed' ? 'triage-green' : 'brand'}
                        size="sm"
                        dot
                      >
                        {r.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#111827]">{r.globalLoss}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#45A878]">{r.globalF1}%</td>
                    <td className="py-3.5 px-4 font-mono text-[#3157D5]">{r.globalRouge}%</td>
                    <td className="py-3.5 px-4 text-[#475467]">{r.participatingClients.length} Nodes</td>
                    <td className="py-3.5 px-4 font-mono text-[#667085]">{r.durationSec}s</td>
                    <td className="py-3.5 px-4 text-[#667085]">{r.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedTab === 'weights' && (
        <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#111827]">
                DistilBERT-Bio Layer Parameter Deltas ($\Delta w$)
              </h3>
              <p className="text-xs text-[#667085]">
                Mathematical gradient tensors serialized for FedAvg aggregation (No clinical text encoded).
              </p>
            </div>
            <Badge variant="privacy" size="sm">PyTorch State Dict</Badge>
          </div>

          <div className="font-mono text-xs bg-[#1E293B] text-slate-200 p-4 rounded-xl space-y-2 overflow-x-auto">
            <div className="text-slate-400 pb-2 border-b border-slate-700">
              # FedAvg Aggregation Payload Tensor Manifest (Round 14)
            </div>
            <p className="text-emerald-400">transformer.embeddings.word_embeddings.weight: [28996, 768] (Δ = 0.0042)</p>
            <p className="text-blue-400">transformer.layer.0.attention.q_lin.weight: [768, 768] (Δ = 0.0018)</p>
            <p className="text-blue-400">transformer.layer.0.attention.k_lin.weight: [768, 768] (Δ = 0.0019)</p>
            <p className="text-blue-400">transformer.layer.0.attention.v_lin.weight: [768, 768] (Δ = 0.0024)</p>
            <p className="text-purple-400">transformer.layer.5.output.LayerNorm.weight: [768] (Δ = 0.0007)</p>
            <p className="text-amber-400">classifier.weight: [5, 768] (Δ = 0.0089) # NER Token Classifier Head</p>
            <p className="text-amber-400">triage_classifier.weight: [3, 768] (Δ = 0.0112) # RED/YELLOW/GREEN Head</p>
          </div>
        </Card>
      )}
    </div>
  )
}
