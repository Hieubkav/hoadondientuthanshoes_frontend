import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InvoiceLookupForm } from './components/InvoiceLookupForm';
import { InfoPanel } from './components/InfoPanel';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: The Main Form */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Tra cứu hóa đơn điện tử
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Nhập thông tin từ hóa đơn của bạn để kiểm tra tính hợp lệ và tải về bản thể hiện.
              </p>
            </div>
            
            <InvoiceLookupForm />
          </div>

          {/* Right Column: Informational Links & Help */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <InfoPanel />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}