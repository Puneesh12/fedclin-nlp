import React, { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Brain,
  Network,
  BarChart3,
  FileCheck2,
  Settings,
  Activity,
  Shield,
  ChevronDown,
  Building2,
  UserCheck,
  Search,
  Bell,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export const DashboardLayout: React.FC = () => {
  const location = useLocation()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState('All Simulated Nodes (Coordinator)')
  const [currentRole, setCurrentRole] = useState<'Doctor' | 'Nurse' | 'Researcher' | 'Admin'>('Doctor')

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Patients & Triage', path: '/patients', icon: Users, badge: '3' },
    { name: 'Clinical AI Workbench', path: '/clinical-ai', icon: Brain },
    { name: 'Federated Learning', path: '/federated-learning', icon: Network, live: true },
    { name: 'Analytics & Benchmarks', path: '/analytics', icon: BarChart3 },
    { name: 'Audit Logs', path: '/audit-logs', icon: FileCheck2 },
    { name: 'Node Settings', path: '/settings', icon: Settings },
  ]

  const hospitalNodes = [
    'All Simulated Nodes (Coordinator)',
    'Hospital Node A (Cardiology Hub)',
    'Hospital Node B (Cancer Center)',
    'Hospital Node C (Metropolitan General)',
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row text-[#111827]">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#E8ECF2] sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#3157D5] text-white flex items-center justify-center font-bold">
            <Activity className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-[#111827]">
            FedClin<span className="text-[#3157D5]">NLP</span>
          </span>
        </Link>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded-lg border border-[#E8ECF2] text-[#475467]"
        >
          {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E8ECF2] flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#F1F4F9]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#3157D5] to-[#4F46E5] text-white flex items-center justify-center shadow-md shadow-[#3157D5]/20">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-[#111827]">
                  FedClin<span className="text-[#3157D5]">NLP</span>
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#667085] block -mt-0.5">
                Clinical Intelligence System
              </span>
            </div>
          </Link>
        </div>

        {/* Hospital Node Selector */}
        <div className="px-4 py-3 border-b border-[#F1F4F9]">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] mb-1.5 block">
            Simulated Node Scope
          </label>
          <div className="relative">
            <select
              value={selectedNode}
              onChange={(e) => setSelectedNode(e.target.value)}
              className="w-full text-xs font-medium bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl px-2.5 py-2 text-[#111827] appearance-none focus:outline-none focus:ring-1 focus:ring-[#3157D5] pr-8 truncate cursor-pointer"
            >
              {hospitalNodes.map((node) => (
                <option key={node} value={node}>
                  {node}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] px-3 mb-2">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group',
                  isActive
                    ? 'bg-[#EEF2FF] text-[#3157D5] shadow-xs'
                    : 'text-[#475467] hover:bg-[#F8FAFC] hover:text-[#111827]'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn('h-4 w-4 transition-colors', isActive ? 'text-[#3157D5]' : 'text-[#667085] group-hover:text-[#111827]')} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#FEF2F2] text-[#B91C1C] rounded-md border border-[#FECACA]">
                    {item.badge}
                  </span>
                )}
                {item.live && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#45A878] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45A878]" />
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* FL Active Status Footer in Sidebar */}
        <div className="p-4 border-t border-[#F1F4F9] bg-[#F8FAFC]/60">
          <div className="rounded-xl border border-[#E8ECF2] bg-white p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#111827] flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#3157D5]" />
                FL FedAvg Round 14
              </span>
              <span className="text-[10px] font-mono text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">
                Active
              </span>
            </div>
            <div className="w-full bg-[#F1F4F9] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#3157D5] h-full rounded-full w-[70%]" />
            </div>
            <div className="flex justify-between text-[10px] text-[#667085] font-mono">
              <span>DistilBERT-Bio v2.4.1</span>
              <span>14/20 Rnds</span>
            </div>
          </div>
        </div>

        {/* User Info & Role Switcher */}
        <div className="p-3 border-t border-[#F1F4F9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#EEF2FF] border border-[#D9E2FE] text-[#3157D5] font-bold flex items-center justify-center text-xs">
              PG
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#111827]">Puneesh Gulati</span>
              <div className="flex items-center gap-1">
                <select
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value as any)}
                  className="text-[10px] text-[#667085] bg-transparent border-none p-0 cursor-pointer focus:ring-0 font-medium"
                >
                  <option value="Doctor">Role: Doctor</option>
                  <option value="Nurse">Role: Nurse</option>
                  <option value="Researcher">Role: Researcher</option>
                  <option value="Admin">Role: Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E8ECF2] px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="relative w-64 sm:w-80">
              <Search className="h-3.5 w-3.5 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, MRN, SNOMED tag or FL round..."
                className="w-full text-xs bg-[#F8FAFC] border border-[#E8ECF2] rounded-xl pl-9 pr-3 py-2 text-[#111827] placeholder:text-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-[#3157D5]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="hidden sm:inline-flex">
              <Button size="sm" variant="ghost" className="text-xs">
                Landing Page <ArrowUpRight className="h-3 w-3 ml-1 text-[#98A2B3]" />
              </Button>
            </Link>

            <Badge variant="privacy" size="sm" dot>
              Zero-Egress VPC
            </Badge>

            <div className="h-4 w-px bg-[#E8ECF2]" />

            <button
              className="p-2 rounded-xl text-[#667085] hover:text-[#111827] hover:bg-[#F8FAFC] relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="h-2 w-2 rounded-full bg-[#E05252] absolute top-1.5 right-1.5" />
            </button>
          </div>
        </header>

        {/* Nested Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
