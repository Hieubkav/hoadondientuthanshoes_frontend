import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import { 
  WhatIsEInvoice, 
  LegalRegulations, 
  LookupGuide, 
  AdjustmentMinutes,
  ContactPage
} from './components/StaticPages';

export default function App() {
  const [currentView, setCurrentView] = useState('search');

  const renderContent = () => {
    switch (currentView) {
      case 'search':
        return <SearchForm />;
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
      default:
        return <SearchForm />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] relative font-sans">
      {/* Blue Background Top Half */}
      <div className="absolute top-0 left-0 w-full h-[450px] bg-[#004a9e] z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onNavigate={setCurrentView} currentView={currentView} />
        
        <main className="flex-grow w-full max-w-[1170px] mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            
            {/* Main Content Area */}
            <div className="w-full lg:flex-1">
              {renderContent()}
            </div>

            {/* Right Info Sidebar - Fixed width approx 300px */}
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