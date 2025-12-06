'use client';

import { FileText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-gradient-to-r from-white via-blue-50 to-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg shadow-sm">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">
            E-INVOICE<span className="text-blue-600">NET</span>
          </span>
        </div>
      </div>
    </header>
  );
}
