import React, { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Lock,
  Zap,
  Info,
  Hospital,
  Activity,
  FileCheck2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StatCard } from '@/components/ui/StatCard'
import {
  MOCK_BENCHMARKS,
  MOCK_NON_IID_DISTRIBUTIONS,
  MOCK_CONVERGENCE_POINTS,
} from '@/data/mockBenchmarks'

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'benchmarks' | 'convergence' | 'non_iid'>('benchmarks')

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#111827]">
              Research Analytics & Empirical Benchmarks
            </h1>
            <Badge variant="brand" size="sm">DistilBERT-Bio Evaluation</Badge>
          </div>
          <p className="text-xs text-[#667085]">
            Comparative performance analysis: Centralized Baseline vs Privacy-Preserving Federated FedAvg across Non-IID partitions.
          </p>
        </div>

        <Badge variant="privacy" size="md">
          Simulated Benchmark Data
        </Badge>
      </div>

      {/* Research Integrity Advisory */}
      <div className="p-4 bg-[#EEF2FF]/70 border border-[#D9E2FE] rounded-2xl flex items-start gap-3 text-xs text-[#3157D5]">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <div>
          <strong>Academic Research Notice:</strong> Benchmark metrics are generated from controlled simulated evaluations on partitioned de-identified clinical corpora. They demonstrate that Federated FedAvg achieves 98.7% of centralized performance while transmitting <strong>0 MB of raw patient records</strong>.
        </div>
      </div>

      {/* Top Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Entity Extraction F1"
          value="91.2%"
          subtitle="Federated FedAvg (vs 92.4% Central)"
          icon={<Cpu className="h-5 w-5" />}
          trend={{ value: '98.7% parity', isPositive: true, label: 'to centralized' }}
        />
        <StatCard
          title="Summarisation ROUGE-L"
          value="88.4%"
          subtitle="Federated FedAvg (vs 89.6% Central)"
          icon={<FileCheck2 className="h-5 w-5" />}
          trend={{ value: '98.6% parity', isPositive: true }}
        />
        <StatCard
          title="Triage Accuracy"
          value="93.8%"
          subtitle="RED / YELLOW / GREEN"
          icon={<Activity className="h-5 w-5" />}
          trend={{ value: '-0.3% delta', isPositive: true }}
        />
        <StatCard
          title="Raw Data Egress"
          value="0 MB"
          subtitle="Centralized requires 1,840 MB"
          icon={<Lock className="h-5 w-5" />}
          badge={<Badge variant="privacy" size="sm">100% Retained</Badge>}
        />
      </div>

      {/* View Tabs */}
      <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-[#E8ECF2] shadow-xs">
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'benchmarks'
              ? 'bg-[#3157D5] text-white shadow-xs'
              : 'text-[#475467] hover:bg-[#F8FAFC]'
          }`}
        >
          Centralized vs Federated Metrics
        </button>
        <button
          onClick={() => setActiveTab('convergence')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'convergence'
              ? 'bg-[#3157D5] text-white shadow-xs'
              : 'text-[#475467] hover:bg-[#F8FAFC]'
          }`}
        >
          Multi-Round Training Convergence
        </button>
        <button
          onClick={() => setActiveTab('non_iid')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'non_iid'
              ? 'bg-[#3157D5] text-white shadow-xs'
              : 'text-[#475467] hover:bg-[#F8FAFC]'
          }`}
        >
          Non-IID Hospital Data Heterogeneity
        </button>
      </div>

      {/* Tab 1: Detailed Benchmark Comparisons */}
      {activeTab === 'benchmarks' && (
        <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#111827]">
                Empirical Performance Benchmark Matrix
              </h3>
              <p className="text-xs text-[#667085]">
                Direct comparison between unconstrained centralized pooling and 3-node decentralized FedAvg.
              </p>
            </div>
            <Badge variant="privacy" size="sm">Evaluation Corpus: 55,450 EHRs</Badge>
          </div>

          <div className="space-y-4">
            {MOCK_BENCHMARKS.map((bench) => {
              const fedPercent = (bench.federated / Math.max(bench.centralized, bench.federated, 1)) * 100
              const centPercent = (bench.centralized / Math.max(bench.centralized, bench.federated, 1)) * 100

              return (
                <div
                  key={bench.metric}
                  className="p-4 bg-[#FAFBFD] rounded-2xl border border-[#E8ECF2] space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-[#111827]">{bench.metric}</h4>
                      <p className="text-[11px] text-[#667085]">{bench.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                      <div>
                        <span className="text-[#98A2B3] text-[10px] block">Centralized</span>
                        <span className="font-bold text-[#111827]">{bench.centralized} {bench.unit}</span>
                      </div>
                      <div>
                        <span className="text-[#98A2B3] text-[10px] block">Federated FedAvg</span>
                        <span className="font-bold text-[#3157D5]">{bench.federated} {bench.unit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Comparison Bars */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="w-16 font-mono text-[#667085]">Centralized:</span>
                      <div className="flex-1 bg-[#E8ECF2] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#111827] h-full rounded-full"
                          style={{ width: `${Math.min(centPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="w-16 font-mono text-[#3157D5] font-semibold">Federated:</span>
                      <div className="flex-1 bg-[#EEF2FF] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#3157D5] h-full rounded-full"
                          style={{ width: `${Math.min(fedPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Tab 2: Convergence Curves */}
      {activeTab === 'convergence' && (
        <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#111827]">
                Loss & F1 Convergence Trajectory Over 15 Communication Rounds
              </h3>
              <p className="text-xs text-[#667085]">
                Cross-entropy loss descending smoothly as FedAvg aggregates parameters across nodes.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#111827]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#111827]" />
                Centralized Baseline
              </span>
              <span className="flex items-center gap-1.5 text-[#3157D5]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3157D5]" />
                Federated FedAvg
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#667085] font-bold uppercase tracking-wider text-[10px] border-y border-[#E8ECF2]">
                <tr>
                  <th className="py-3 px-4">Round #</th>
                  <th className="py-3 px-4">Centralized Loss</th>
                  <th className="py-3 px-4">Federated Loss</th>
                  <th className="py-3 px-4">Centralized F1</th>
                  <th className="py-3 px-4">Federated F1</th>
                  <th className="py-3 px-4">Relative Parity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F4F9]">
                {MOCK_CONVERGENCE_POINTS.map((pt) => {
                  const parity = ((pt.federatedF1 / pt.centralizedF1) * 100).toFixed(1)
                  return (
                    <tr key={pt.round} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#111827]">Round {pt.round}</td>
                      <td className="py-3 px-4 font-mono text-[#667085]">{pt.centralizedLoss}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#3157D5]">{pt.federatedLoss}</td>
                      <td className="py-3 px-4 font-mono text-[#667085]">{pt.centralizedF1}%</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#45A878]">{pt.federatedF1}%</td>
                      <td className="py-3 px-4">
                        <Badge variant="privacy" size="sm">{parity}% Parity</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 3: Non-IID Analysis */}
      {activeTab === 'non_iid' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_NON_IID_DISTRIBUTIONS.map((hosp) => (
              <Card key={hosp.nodeId} className="p-6 border-[#E8ECF2] bg-white space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center font-bold text-sm">
                    <Hospital className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#111827]">{hosp.nodeName}</h4>
                    <span className="text-xs text-[#667085]">{hosp.specialization}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="h-3 w-full bg-[#E8ECF2] rounded-full overflow-hidden flex">
                    {hosp.categoryBreakdown.map((cat) => (
                      <div
                        key={cat.category}
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                        className="h-full"
                      />
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-2 text-xs">
                    {hosp.categoryBreakdown.map((cat) => (
                      <div key={cat.category} className="flex justify-between items-center text-[11px]">
                        <span className="text-[#475467]">{cat.category}</span>
                        <span className="font-mono font-bold text-[#111827]">{cat.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-white border-[#E8ECF2] shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-[#111827]">
              Research Conclusion on Non-IID Clinical Skew
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              When trained locally in isolation, Hospital Node A suffers an 18.4% performance drop when encountering Oncology notes. However, through Flower FedAvg collaboration, the global DistilBERT-Bio model achieves 91.2% micro-F1 uniformly across all subspecialties, proving cross-institutional generalizability without data sharing.
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}
