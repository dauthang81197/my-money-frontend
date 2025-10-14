'use client';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
  activeNav?: string;
  title?: string;
  subtitle?: string;
  userName?: string;
  showExportButton?: boolean;
  showCreateReportButton?: boolean;
  onNavChange?: (nav: string) => void;
  onExport?: () => void;
  onCreateReport?: () => void;
}

export default function DashboardLayout({
  children,
  activeNav = 'Reports',
  title,
  subtitle,
  userName,
  showExportButton = true,
  showCreateReportButton = true,
  onNavChange,
  onExport,
  onCreateReport
}: DashboardLayoutProps) {
  const [currentNav, setCurrentNav] = useState(activeNav);

  const handleNavChange = (nav: string) => {
    setCurrentNav(nav);
    if (onNavChange) {
      onNavChange(nav);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-800">
      {/* Sidebar */}
      <Sidebar 
        activeNav={currentNav} 
        onNavChange={handleNavChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          title={title}
          subtitle={subtitle}
          userName={userName}
          showExportButton={showExportButton}
          showCreateReportButton={showCreateReportButton}
          onExport={onExport}
          onCreateReport={onCreateReport}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 