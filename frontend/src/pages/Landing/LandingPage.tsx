import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { ValuePropSection } from '@/components/landing/ValuePropSection'
import { FederatedFlowVisualizer } from '@/components/landing/FederatedFlowVisualizer'
import { ClinicalAIShowcase } from '@/components/landing/ClinicalAIShowcase'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ValuePropSection />
        <FederatedFlowVisualizer />
        <ClinicalAIShowcase />
      </main>
      <Footer />
    </div>
  )
}
