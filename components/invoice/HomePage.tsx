'use client';

import { useState } from 'react';
import {
  Header,
  NavBar,
  InvoiceLookupForm,
  InfoPanel,
  WhatIsEInvoice,
  LegalRegulations,
  LookupGuide,
  AdjustmentMinutes,
  ContactPage,
} from '@/components/invoice';
import { ViewKey } from './types';

export function HomePage() {
  const [currentView, setCurrentView] = useState<ViewKey>('search');

  const renderContent = () => {
    switch (currentView) {
      case 'what-is':
        return <WhatIsEInvoice />;
      case 'legal':
        return <LegalRegulations />;
      case 'guide':
        return <LookupGuide />;
      case 'minutes':
        return <AdjustmentMinutes />;
      case 'contact':
        return <ContactPage />;
      case 'search':
      default:
        return <InvoiceLookupForm />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] relative font-sans">
      <div className="absolute top-0 left-0 w-full h-[450px] max-md:h-[280px] bg-[#003f97] z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onNavigate={setCurrentView} currentView={currentView} />

        <main className="flex-grow w-full max-w-[1170px] mx-auto px-4 max-md:px-3 py-8 max-md:py-4 relative">
          <div className="flex flex-col lg:flex-row gap-4 items-start justify-center">
            <div className="w-full lg:flex-1 relative">
              <div className="absolute -top-[48px] right-0 z-10 max-md:hidden">
                <NavBar onNavigate={setCurrentView} currentView={currentView} />
              </div>
              {renderContent()}
            </div>

            <div className="w-full lg:w-[300px] flex-shrink-0 max-md:mt-4">
              <InfoPanel onNavigate={setCurrentView} currentView={currentView} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
