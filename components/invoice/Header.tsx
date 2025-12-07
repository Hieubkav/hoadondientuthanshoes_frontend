'use client';

import Image from 'next/image';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export function Header({ onNavigate, currentView }: HeaderProps) {
  return (
    <header className="w-full bg-transparent h-[70px] flex items-center relative z-20">
      <div className="max-w-[1170px] mx-auto w-full px-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate('search')}
        >
          <Image
            src="/logo.png"
            alt="E-Invoice NET"
            width={312}
            height={78}
            className="h-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <button
            className={`text-white font-bold text-sm uppercase hover:text-[#fcae1d] transition-colors ${currentView === 'search' ? 'text-white' : 'text-white/80'}`}
            onClick={() => onNavigate('search')}
          >
            TRA CỨU HÓA ĐƠN
          </button>
          <button
            className={`text-white font-bold text-sm uppercase hover:text-[#fcae1d] transition-colors ${currentView === 'contact' ? 'text-white' : 'text-white/80'}`}
            onClick={() => onNavigate('contact')}
          >
            LIÊN HỆ
          </button>
        </nav>
      </div>
    </header>
  );
}
