import React, { useState } from 'react'
import {
  Settings,
  ShieldCheck,
  Server,
  Lock,
  Database,
  Save,
  Check,
  RotateCcw,
  Sliders,
  Cpu,
  Key,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const SettingsPage: React.FC = () => {
  const [epsilonBudget, setEpsilonBudget] = useState(1.42)
  const [fastApiUrl, setFastApiUrl] = useState('http://localhost:8000/api/v1')
  const [flowerUrl, setFlowerUrl] = useState('ws://localhost:8080/flower')
  const [useMockData, setUseMockData] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveSettings = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#111827]">
              Node & Privacy Settings
            </h1>
            <Badge variant="privacy" size="sm">Local Hospital Node</Badge>
          </div>
          <p className="text-xs text-[#667085]">
            Configure differential privacy budgets, backend FastAPI endpoints, and Flower FL coordinator connections.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={handleSaveSettings}
          leftIcon={isSaved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
        >
          {isSaved ? 'Settings Saved ✓' : 'Save Configuration'}
        </Button>
      </div>

      {/* 1. Differential Privacy Settings */}
      <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#111827]">
                Differential Privacy (DP-SGD) Budgeting
              </h3>
              <p className="text-xs text-[#667085]">
                Controls Gaussian gradient noise calibration and clipping thresholds.
              </p>
            </div>
          </div>
          <Badge variant="brand" size="sm">ε = {epsilonBudget} / 3.0</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#344054]">Epsilon (ε) Privacy Loss Ceiling</span>
            <span className="font-mono font-bold text-[#3157D5]">{epsilonBudget}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={3.0}
            step={0.05}
            value={epsilonBudget}
            onChange={(e) => setEpsilonBudget(Number(e.target.value))}
            className="w-full h-2 bg-[#E8ECF2] rounded-lg appearance-none cursor-pointer accent-[#3157D5]"
          />
          <div className="flex justify-between text-[10px] text-[#98A2B3] font-mono">
            <span>High Privacy (ε = 0.5)</span>
            <span>Balanced (ε = 1.5)</span>
            <span>Higher Utility (ε = 3.0)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E8ECF2]">
            <span className="text-[10px] text-[#98A2B3] block">Delta (δ) Failure Bound</span>
            <span className="font-mono font-bold text-[#111827]">1.0e-5</span>
          </div>
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E8ECF2]">
            <span className="text-[10px] text-[#98A2B3] block">L2 Norm Gradient Clip (C)</span>
            <span className="font-mono font-bold text-[#111827]">1.0</span>
          </div>
        </div>
      </Card>

      {/* 2. Service Endpoints */}
      <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#F1F4F9]">
          <div className="h-8 w-8 rounded-xl bg-[#F0FDF4] text-[#15803D] flex items-center justify-center">
            <Server className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#111827]">
              Microservice Connection Endpoints
            </h3>
            <p className="text-xs text-[#667085]">
              Configure integration routes for Node API, Python FastAPI NLP, and Flower FL server.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#344054] block mb-1">
              Python FastAPI Clinical NLP Service URL
            </label>
            <input
              type="text"
              value={fastApiUrl}
              onChange={(e) => setFastApiUrl(e.target.value)}
              className="w-full font-mono bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl px-3 py-2 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
            />
          </div>

          <div>
            <label className="font-bold text-[#344054] block mb-1">
              Flower Federated Learning Server (WebSocket / gRPC)
            </label>
            <input
              type="text"
              value={flowerUrl}
              onChange={(e) => setFlowerUrl(e.target.value)}
              className="w-full font-mono bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl px-3 py-2 text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-xl border border-[#E8ECF2]">
            <div>
              <span className="font-bold text-[#111827] block">Simulated Data Mode</span>
              <span className="text-[#667085] text-[11px]">Use partitioned local research datasets when backend is offline</span>
            </div>
            <input
              type="checkbox"
              checked={useMockData}
              onChange={(e) => setUseMockData(e.target.checked)}
              className="h-4 w-4 text-[#3157D5] rounded border-[#D0D5DD] focus:ring-[#3157D5]"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
