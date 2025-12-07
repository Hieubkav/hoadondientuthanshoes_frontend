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
            width={296}
            height={74}
            className="h-auto"
          />
        </div>
      </div>
    </header>
  );
}
