import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Users2,
  KeyRound,
  ServerCrash,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Zero-Egress Data Locality',
      desc: 'Raw clinical notes, patient identifiers, and unmasked EHR text remain strictly inside the local hospital boundary. Zero patient records cross the network.',
      badge: 'VPC Enclave',
    },
    {
      icon: ShieldCheck,
      title: 'Differential Privacy Bound',
      desc: 'Gradient clipping and calibrated Gaussian noise injection preserve participant privacy budgets (ε = 1.42, δ = 10⁻⁵) against model inversion attacks.',
      badge: 'DP-SGD Ready',
    },
    {
      icon: Users2,
      title: 'Granular Role-Based Access',
      desc: 'Dedicated permission matrices for Doctors, Nurses, Researchers, and System Administrators ensuring least-privilege clinical access.',
      badge: 'RBAC + JWT',
    },
    {
      icon: FileCheck2,
      title: 'SHA-256 Cryptographic Audit Logs',
      desc: 'Every model inference, gradient pull, physician triage override, and administrative action is recorded into an immutable audit trail.',
      badge: 'Immutable Hash',
    },
  ]

  return (
    <section id="security" className="py-24 bg-[#F7F9FC] border-b border-[#E8ECF2]">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" size="md" className="mb-4">
            Security & Governance
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
            HIPAA-aligned architectural principles
          </h2>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">
            Constructed from the ground up for strict healthcare security, mathematical privacy guarantees, and verifiable institutional compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card hover className="p-6 h-full flex flex-col justify-between bg-white border-[#E8ECF2]">
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="privacy" size="sm" className="mb-3">
                      {pillar.badge}
                    </Badge>
                    <h3 className="text-base font-bold text-[#111827] mb-2 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F1F4F9] flex items-center gap-1.5 text-[11px] text-[#059669] font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Architecturally Enforced</span>
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
