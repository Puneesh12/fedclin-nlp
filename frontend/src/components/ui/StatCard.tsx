import React from 'react'
import { Card } from './Card'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive?: boolean
    label?: string
  }
  badge?: React.ReactNode
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badge,
  className,
}) => {
  return (
    <Card hover className={cn('relative overflow-hidden p-6', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#111827] tabular-nums">
              {value}
            </span>
            {badge}
          </div>
          {subtitle && (
            <p className="text-xs text-[#667085] mt-1.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="h-11 w-11 rounded-xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-[#F1F4F9] flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              'font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-0.5',
              trend.isPositive
                ? 'bg-[#F0FDF4] text-[#15803D]'
                : 'bg-[#FEF2F2] text-[#B91C1C]'
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
          {trend.label && (
            <span className="text-[#667085]">{trend.label}</span>
          )}
        </div>
      )}
    </Card>
  )
}
