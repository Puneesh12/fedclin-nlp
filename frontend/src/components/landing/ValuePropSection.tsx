import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Cpu,
  Lock,
  Layers,
  Database,
  GitMerge,
  Hospital,
  Workflow,
  Sparkles,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const ValuePropSection: React.FC = () => {
  const pillars = [
    {
      icon: Lock,
      badge: 'Zero-Egress Architecture',
      title: 'Data Stays in the Hospital VPC',
      description:
        'Patient records and sensitive clinical notes never leave the hospital boundary. Only encrypted mathematical model parameters are transmitted for global aggregation.',
      color: '#3157D5',
      bgColor: '#EEF2FF',
    },
    {
      icon: Cpu,
      badge: 'DistilBERT-Bio NLP',
      title: 'Domain-Specialized Clinical Transformer',
      description:
        'Trained on biomedical terminology and clinical corpora, achieving high token-level precision for medical entities, medication dosages, and risk stratification.',
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
    },
    {
      icon: GitMerge,
      badge: 'Flower FedAvg Engine',
      title: 'Decentralized Weight Aggregation',
      description:
        'Flower orchestration aggregates gradient updates across heterogeneous hospital partitions with differential privacy guarantees and audit logging.',
      color: '#45A878',
      bgColor: '#F0FDF4',
    },
  ]

  return (
    <section id="platform" className="py-24 bg-white border-y border-[#E8ECF2]">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" size="md" className="mb-4">
            Core Architectural Principles
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
            Designed for clinical trust, <br className="hidden sm:block" />
            engineered for mathematical privacy.
          </h2>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">
            Eliminate traditional healthcare data silos without compromising patient confidentiality or regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card hover className="h-full flex flex-col justify-between p-8 border-[#E8ECF2]">
                  <div>
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: pillar.bgColor, color: pillar.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <Badge variant="outline" size="sm" className="mb-3">
                      {pillar.badge}
                    </Badge>

                    <h3 className="text-xl font-bold text-[#111827] tracking-tight mb-3">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-[#667085] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F1F4F9] flex items-center gap-2 text-xs font-semibold text-[#3157D5]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Research-grade reproducibility</span>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
