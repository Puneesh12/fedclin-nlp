import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Network,
  Cpu,
  Lock,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Database,
  Layers,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_FEDERATED_NODES, MOCK_FL_ROUNDS } from '@/data/mockFederatedData'

export const FederatedFlowVisualizer: React.FC = () => {
  const [activeRound, setActiveRound] = useState(14)
  const [isPlaying, setIsPlaying] = useState(true)
  const [simStep, setSimStep] = useState<'local_train' | 'gradient_upload' | 'fedavg_aggregate' | 'global_broadcast'>('gradient_upload')

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setSimStep((prev) => {
        if (prev === 'local_train') return 'gradient_upload'
        if (prev === 'gradient_upload') return 'fedavg_aggregate'
        if (prev === 'fedavg_aggregate') return 'global_broadcast'
        return 'local_train'
      })
    }, 2800)
    return () => clearInterval(interval)
  }, [isPlaying])

  const stepLabels = {
    local_train: '1. Local Fine-Tuning: On-premise DistilBERT-Bio computes gradients on private EHRs',
    gradient_upload: '2. Zero-Data Weight Push: Nodes transmit encrypted weight deltas (Δw = 412 KB) to Flower',
    fedavg_aggregate: '3. FedAvg Coordinator: Mathematical aggregation combines weighted parameters',
    global_broadcast: '4. Global Checkpoint Broadcast: Updated model v2.4.1 synchronized back to all nodes',
  }

  return (
    <section id="how-it-works" className="py-24 bg-white border-b border-[#E8ECF2] relative overflow-hidden">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" size="md" className="mb-4">
            Decentralized FL Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111827] leading-tight">
            The model travels. <br />
            <span className="text-[#3157D5]">The patient data doesn't.</span>
          </h2>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">
            Witness how Flower federated orchestration and FedAvg aggregate clinical knowledge across three simulated hospital environments without transmitting a single byte of raw patient notes.
          </p>

          {/* Privacy Guarantee Pill */}
          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-full text-xs font-semibold text-[#15803D]">
            <ShieldCheck className="h-4 w-4" />
            Strict Architectural Boundary: Weight Updates ($\Delta w$) Only • Zero EHR Transfer
          </div>
        </div>

        {/* Interactive Simulation Controls Bar */}
        <div className="bg-[#F8FAFC] border border-[#E8ECF2] rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={isPlaying ? 'outline' : 'primary'}
              onClick={() => setIsPlaying(!isPlaying)}
              leftIcon={isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            >
              {isPlaying ? 'Pause Simulation' : 'Play Live FL Round'}
            </Button>
            <div className="h-4 w-px bg-[#D0D5DD]" />
            <span className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#3157D5] animate-ping" />
              Round {activeRound} / 20
            </span>
            <Badge variant="privacy" size="sm">Flower 1.8 Protocol</Badge>
          </div>

          <div className="text-xs font-medium text-[#475467] bg-white px-3 py-1.5 rounded-xl border border-[#E8ECF2]">
            Status: <span className="text-[#3157D5] font-semibold">{stepLabels[simStep]}</span>
          </div>
        </div>

        {/* Visual FL Network Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAFBFD] border border-[#E8ECF2] rounded-3xl p-6 sm:p-10 shadow-xs relative">
          {/* Left: 3 Distributed Hospital Nodes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                Simulated Hospital VPCs (On-Premise)
              </span>
              <Badge variant="privacy" size="sm">3 Nodes Online</Badge>
            </div>

            {MOCK_FEDERATED_NODES.map((node) => (
              <Card
                key={node.id}
                className="p-4 border-[#E8ECF2] bg-white shadow-xs relative overflow-hidden transition-all"
              >
                {/* Node Active Border Highlight when uploading */}
                {simStep === 'gradient_upload' && (
                  <motion.div
                    layoutId="upload-highlight"
                    className="absolute inset-0 border-2 border-[#3157D5] rounded-2xl pointer-events-none"
                  />
                )}

                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center font-bold text-xs">
                      {node.name.split(' ')[2]}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#111827]">{node.name}</h4>
                      <span className="text-[10px] text-[#667085]">{node.specialization} Focus</span>
                    </div>
                  </div>
                  <Badge variant="privacy" size="sm">{node.localDatasetSize.toLocaleString()} EHRs</Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F1F4F9] text-[11px]">
                  <div>
                    <span className="text-[#98A2B3] text-[9px] block">Local Loss</span>
                    <span className="font-mono font-bold text-[#111827]">{node.localLoss}</span>
                  </div>
                  <div>
                    <span className="text-[#98A2B3] text-[9px] block">Local F1</span>
                    <span className="font-mono font-bold text-[#45A878]">{node.localF1}%</span>
                  </div>
                  <div>
                    <span className="text-[#98A2B3] text-[9px] block">Weight Delta</span>
                    <span className="font-mono font-bold text-[#3157D5]">412 KB</span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-[#667085] flex items-center gap-1 font-mono">
                  <Lock className="h-3 w-3 text-[#45A878]" />
                  <span>Private Clinical Dataset (VPC Locked)</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Middle: Dynamic Animated Data Streams (Model Weights Only) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative flex flex-col items-center">
                <motion.div
                  animate={{
                    x: simStep === 'gradient_upload' ? [0, 20, 0] : simStep === 'global_broadcast' ? [0, -20, 0] : 0,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-12 w-12 rounded-2xl bg-[#3157D5] text-white flex items-center justify-center shadow-lg shadow-[#3157D5]/20"
                >
                  <Zap className="h-6 w-6" />
                </motion.div>
                <span className="text-[10px] font-bold text-[#3157D5] mt-2 font-mono uppercase tracking-wider">
                  {simStep === 'gradient_upload'
                    ? 'Pushing Δw...'
                    : simStep === 'fedavg_aggregate'
                    ? 'Averaging...'
                    : simStep === 'global_broadcast'
                    ? 'Broadcasting...'
                    : 'Local Epoch...'}
                </span>
                <span className="text-[9px] text-[#98A2B3] font-mono">Encrypted GRPC</span>
              </div>
            </div>
          </div>

          {/* Right: Central Flower FedAvg Aggregator & Global Model */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                Central Flower Coordinator
              </span>
              <Badge variant="brand" size="sm">FedAvg Strategy</Badge>
            </div>

            <Card className="p-6 border-[#3157D5]/30 bg-gradient-to-br from-white to-[#EEF2FF]/40 shadow-md rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#3157D5] text-white flex items-center justify-center shadow-sm">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#111827]">Flower Aggregation Server</h4>
                    <span className="text-[11px] text-[#667085]">FedAvg Parameter Coordinator</span>
                  </div>
                </div>
                <span className="h-3 w-3 rounded-full bg-[#45A878] animate-pulse" />
              </div>

              <div className="bg-white border border-[#E8ECF2] rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#667085]">Global Model Checkpoint</span>
                  <span className="font-mono font-bold text-[#3157D5]">distilbert-bio-v2.4.1</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#667085]">Aggregation Algorithm</span>
                  <span className="font-mono font-semibold text-[#111827]">w = Σ (n_k / N) * w_k</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#667085]">Global Micro F1-Score</span>
                  <span className="font-mono font-bold text-[#45A878]">91.2%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#667085]">Global ROUGE-L</span>
                  <span className="font-mono font-bold text-[#45A878]">88.4%</span>
                </div>
              </div>

              {/* Aggregation Formula Pill */}
              <div className="p-3 bg-[#EEF2FF]/80 rounded-xl border border-[#D9E2FE] text-[11px] text-[#3157D5] space-y-1">
                <span className="font-bold block">Mathematical Privacy Guarantee</span>
                <p className="text-[10px] text-[#475467] leading-relaxed">
                  Only local gradient updates are aggregated. Raw tokens and clinical notes remain strictly inaccessible to central server operators.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}
