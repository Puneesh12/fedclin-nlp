import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ArrowRight, ShieldCheck, Activity } from 'lucide-react'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <Navbar />
      <main className="flex-1">
        <Container size="xl" className="py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2FF] border border-[#D9E2FE] rounded-full text-xs font-semibold text-[#3157D5] mb-6">
            <ShieldCheck className="h-3.5 w-3.5" />
            Decentralized Healthcare Intelligence • HIPAA-Aligned
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827] max-w-4xl mx-auto leading-tight">
            Clinical intelligence <br />
            <span className="text-[#3157D5]">without moving patient data.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#667085] max-w-2xl mx-auto leading-relaxed">
            Federated learning enables hospitals to collaboratively train clinical NLP models (DistilBERT-Bio) for EHR summarisation, entity extraction, and triage while strictly keeping raw clinical data on-premise.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Explore Platform & Dashboard
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline">
                How It Works
              </Button>
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
