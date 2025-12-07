'use client';

import Image from 'next/image';
import { ViewKey } from './types';

interface HeaderProps {
  onNavigate: (view: ViewKey) => void;
  currentView: ViewKey;
}

export function Header({ onNavigate, currentView }: HeaderProps) {
  return (
    <header className="w-full bg-transparent h-[70px] max-md:h-[56px] flex items-center relative z-20">
      <div className="max-w-[1170px] mx-auto w-full px-4 max-md:px-3 flex justify-between items-center">
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
            className="h-auto max-md:w-[180px]"
          />
        </div>
      </div>
    </header>
  );
}
