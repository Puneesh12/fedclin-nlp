import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Shield, Cpu, Menu, X, ArrowRight, Database, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Clinical AI', href: '#clinical-ai' },
    { name: 'Research', href: '#research' },
    { name: 'Security', href: '#security' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'glass-header border-b border-[#E8ECF2] shadow-sm py-3'
          : 'bg-transparent py-4'
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#3157D5] to-[#4F46E5] text-white flex items-center justify-center shadow-md shadow-[#3157D5]/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-[#111827]">
                  FedClin<span className="text-[#3157D5]">NLP</span>
                </span>
                <span className="inline-block px-1.5 py-0.2 text-[10px] font-semibold uppercase tracking-wider bg-[#EEF2FF] text-[#3157D5] rounded border border-[#D9E2FE]">
                  Research
                </span>
              </div>
              <span className="text-[10px] text-[#667085] -mt-0.5 hidden sm:block">
                Federated Clinical Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-[#E8ECF2] rounded-full px-3 py-1.5 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-[#475467] hover:text-[#111827] hover:bg-[#F1F4F9] rounded-full transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E8ECF2] rounded-lg shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#45A878] animate-pulse" />
              <span className="text-[11px] font-mono text-[#344054]">3 Nodes Active</span>
            </div>

            <Link to="/dashboard">
              <Button size="sm" variant="primary" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#475467] hover:text-[#111827] hover:bg-[#F1F4F9] border border-[#E8ECF2]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white rounded-2xl border border-[#E8ECF2] shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-[#344054] hover:bg-[#F1F4F9] rounded-lg transition-colors flex items-center justify-between"
                >
                  {link.name}
                  <ChevronRight className="h-4 w-4 text-[#98A2B3]" />
                </a>
              ))}
              <div className="pt-3 border-t border-[#F1F4F9] flex flex-col gap-2">
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="md" variant="primary" className="w-full justify-center">
                    Launch Clinical Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
