'use client';

import { Download } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  showExportButton?: boolean;
  showCreateReportButton?: boolean;
  onExport?: () => void;
  onCreateReport?: () => void;
}

export default function Header({
  title = "Welcome back, John",
  subtitle = "Measure your advertising ROI and report website traffic.",
  userName = "John",
  showExportButton = true,
  showCreateReportButton = true,
  onExport,
  onCreateReport
}: HeaderProps) {
  return (
    <header className="bg-neutral-700 p-6 border-b border-neutral-600">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">
            {title.replace('John', userName)}
          </h1>
          <p className="text-neutral-400">{subtitle}</p>
        </div>
        <div className="flex gap-3">
          {showExportButton && (
            <button 
              className="flex items-center gap-2 bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-neutral-500 transition-colors"
              onClick={onExport}
            >
              <Download className="w-4 h-4" />
              Export data
            </button>
          )}
          {showCreateReportButton && (
            <button 
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary-4 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
              onClick={onCreateReport}
            >
              Create report
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 