'use client';

import { useState } from 'react';
import {
  Header,
  NavBar,
  Footer,
  InvoiceLookupForm,
  InfoPanel,
  WhatIsEInvoice,
  LegalRegulations,
  LookupGuide,
  AdjustmentMinutes,
  ContactPage,
} from '@/components/invoice';

type ViewKey = 'search' | 'what-is' | 'legal' | 'guide' | 'minutes' | 'contact';

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
      <div className="absolute top-0 left-0 w-full h-[450px] bg-[#004a9e] z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onNavigate={setCurrentView} currentView={currentView} />

        <main className="flex-grow w-full max-w-[1170px] mx-auto px-4 py-8 relative">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <div className="w-full lg:flex-1 relative">
              <div className="absolute -top-[48px] right-0 z-10">
                <NavBar onNavigate={setCurrentView} currentView={currentView} />
              </div>
              {renderContent()}
            </div>

            <div className="w-full lg:w-[300px] flex-shrink-0">
              <InfoPanel onNavigate={setCurrentView} currentView={currentView} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
