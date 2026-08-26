import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ShieldCheck, ExternalLink, FileText, Cpu, Lock, Code2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E8ECF2] pt-16 pb-12 mt-24">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#F1F4F9]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#3157D5] text-white flex items-center justify-center shadow-sm">
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#111827]">
                FedClin<span className="text-[#3157D5]">NLP</span>
              </span>
              <Badge variant="privacy" size="sm">v2.4.1</Badge>
            </div>
            
            <p className="text-sm text-[#667085] leading-relaxed max-w-sm">
              Privacy-first clinical artificial intelligence platform. Enables multi-hospital collaborative training of DistilBERT-Bio models via Federated Averaging (FedAvg) with zero raw-data transmission.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Puneesh12/fedclin-nlp"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8ECF2] text-xs font-medium text-[#475467] hover:bg-[#F8FAFC] hover:text-[#111827] transition-colors"
              >
                <Code2 className="h-3.5 w-3.5 text-[#3157D5]" />
                GitHub Repository
                <ExternalLink className="h-3 w-3 text-[#98A2B3]" />
              </a>
              <span className="inline-flex items-center gap-1 text-xs text-[#059669] font-medium bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Zero-Data Egress
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
              Clinical Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-[#667085]">
              <li><Link to="/dashboard" className="hover:text-[#3157D5] transition-colors">Executive Overview</Link></li>
              <li><Link to="/patients" className="hover:text-[#3157D5] transition-colors">Patient Queue & Triage</Link></li>
              <li><Link to="/clinical-ai" className="hover:text-[#3157D5] transition-colors">EHR Summarisation</Link></li>
              <li><Link to="/clinical-ai" className="hover:text-[#3157D5] transition-colors">Medical NER Explorer</Link></li>
            </ul>
          </div>

          {/* Research & FL */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
              Research & FL
            </h4>
            <ul className="space-y-2.5 text-sm text-[#667085]">
              <li><Link to="/federated-learning" className="hover:text-[#3157D5] transition-colors">Flower FL Topology</Link></li>
              <li><Link to="/analytics" className="hover:text-[#3157D5] transition-colors">Centralized vs Fed Benchmarks</Link></li>
              <li><Link to="/analytics" className="hover:text-[#3157D5] transition-colors">Non-IID Data Distribution</Link></li>
              <li><Link to="/audit-logs" className="hover:text-[#3157D5] transition-colors">Cryptographic Audit Logs</Link></li>
            </ul>
          </div>

          {/* Governance & Disclaimers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5 text-sm text-[#667085]">
              <li><span className="text-[#344054]">HIPAA-Aligned Principles</span></li>
              <li><span className="text-[#344054]">De-identified Partitions</span></li>
              <li><span className="text-[#344054]">Differential Privacy Bound</span></li>
              <li><span className="text-[#344054]">MIT Academic License</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#98A2B3]">
          <p>
            © 2026 Puneesh Gulati (<a href="https://github.com/Puneesh12" target="_blank" rel="noreferrer" className="underline hover:text-[#667085]">@Puneesh12</a>). Research prototype evaluated on de-identified public clinical corpora.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-[#667085]">
              <Lock className="h-3 w-3 text-[#3157D5]" />
              Architectural Zero-Knowledge Guarantee
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
