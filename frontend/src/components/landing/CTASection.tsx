import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, ShieldCheck, Activity, Terminal } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <Container size="xl">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#111827] via-[#1E293B] to-[#0F172A] p-8 sm:p-14 text-white overflow-hidden shadow-2xl border border-[#334155]">
          {/* Subtle Glow circles in background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3157D5]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#45A878]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/90 backdrop-blur-md">
              <Activity className="h-3.5 w-3.5 text-[#45A878]" />
              Research Prototype Evaluated on De-Identified Corpora
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to explore privacy-preserving clinical AI?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Access the clinical dashboard to triage patient records, observe live Flower federated rounds, evaluate centralized vs federated benchmark metrics, and inspect cryptographically verified audit trails.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Launch Clinical Dashboard
                </Button>
              </Link>

              <a
                href="https://github.com/Puneesh12/fedclin-nlp"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                  leftIcon={<Code2 className="h-4 w-4 text-[#60A5FA]" />}
                >
                  View Source on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
