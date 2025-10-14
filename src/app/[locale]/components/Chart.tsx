'use client';

import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface ChartProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  type?: 'line' | 'bar' | 'area' | 'donut';
  height?: string;
  showLegend?: boolean;
  legendItems?: Array<{ label: string; color: string }>;
}

export default function Chart({
  title,
  value,
  change,
  isPositive,
  type = 'line',
  height = 'h-64',
  showLegend = false,
  legendItems = []
}: ChartProps) {
  return (
    <div className="bg-neutral-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
          <div className="flex items-center gap-4">
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
        {showLegend && (
          <div className="flex items-center gap-4">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-neutral-400 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Chart Placeholder */}
      <div className={`${height} bg-neutral-600 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-400">{title} Chart</p>
          <p className="text-neutral-500 text-sm">
            {type === 'line' && 'Line chart showing trends over time'}
            {type === 'bar' && 'Bar chart showing data distribution'}
            {type === 'area' && 'Area chart with filled regions'}
            {type === 'donut' && 'Donut chart with central display'}
          </p>
        </div>
      </div>
    </div>
  );
} 