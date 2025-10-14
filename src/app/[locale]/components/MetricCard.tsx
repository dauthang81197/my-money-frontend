'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function MetricCard({ title, value, change, isPositive }: MetricCardProps) {
  return (
    <div className="bg-neutral-700 rounded-lg p-6">
      <h3 className="text-neutral-400 text-sm mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-white text-2xl font-bold">{value}</span>
        <div className={`flex items-center gap-1 ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
    </div>
  );
} 