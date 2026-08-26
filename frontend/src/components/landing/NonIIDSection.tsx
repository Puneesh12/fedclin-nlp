import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Layers, BarChart2, ShieldAlert, CheckCircle2, Hospital } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MOCK_NON_IID_DISTRIBUTIONS } from '@/data/mockBenchmarks'

export const NonIIDSection: React.FC = () => {
  return (
    <section id="research" className="py-24 bg-white border-b border-[#E8ECF2]">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" size="md" className="mb-4">
            Research Evaluation & Robustness
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
            Real hospitals don't have identical data.
          </h2>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">
            In clinical reality, different healthcare facilities possess highly skewed, non-independent and non-identically distributed (Non-IID) patient populations. FedClinNLP is evaluated on heterogeneous partitions to prevent local domain collapse.
          </p>
        </div>

        {/* 3 Skewed Hospital Partitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MOCK_NON_IID_DISTRIBUTIONS.map((hosp, idx) => (
            <motion.div
              key={hosp.nodeId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card hover className="p-6 border-[#E8ECF2] bg-[#FAFBFD] space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center font-bold text-xs">
                      <Hospital className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#111827]">{hosp.nodeName}</h4>
                      <span className="text-[11px] text-[#667085]">{hosp.specialization}</span>
                    </div>
                  </div>
                </div>

                {/* Distribution Stacked Bar */}
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-[#E8ECF2] rounded-full overflow-hidden flex">
                    {hosp.categoryBreakdown.map((cat) => (
                      <div
                        key={cat.category}
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                        title={`${cat.category}: ${cat.percentage}%`}
                        className="h-full"
                      />
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-2 text-xs">
                    {hosp.categoryBreakdown.map((cat) => (
                      <div key={cat.category} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-[#344054] truncate max-w-[170px]">{cat.category}</span>
                        </div>
                        <span className="font-mono font-bold text-[#111827]">{cat.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8ECF2] flex items-center justify-between text-[10px] text-[#667085] font-mono">
                  <span>Non-IID Skew Index</span>
                  <span className="font-bold text-[#3157D5]">Dirichlet α = 0.5</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Research Takeaway Callout */}
        <div className="p-6 bg-[#EEF2FF]/60 border border-[#D9E2FE] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#3157D5] text-white flex items-center justify-center shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#111827]">
                Cross-Domain Generalization Guarantee
              </h4>
              <p className="text-xs text-[#475467] leading-relaxed">
                By performing weighted federated averaging across Cardiology, Oncology, and General Medicine nodes, the global DistilBERT-Bio model generalizes across diverse clinical vocabulary without local mode collapse.
              </p>
            </div>
          </div>

          <Badge variant="privacy" size="md">
            Dirichlet Skew Tested
          </Badge>
        </div>
      </Container>
    </section>
  )
}
