'use client';

import { ViewKey } from './types';

interface NavBarProps {
  onNavigate: (view: ViewKey) => void;
  currentView: ViewKey;
}

export function NavBar({ onNavigate, currentView }: NavBarProps) {
  return (
    <nav className="flex items-center justify-end gap-6 pl-4 pt-2 pb-4">
      <button
        className="text-white font-bold text-[0.84rem] uppercase hover:text-[#fcae1d] transition-colors mb-[8px]"
        onClick={() => onNavigate('search')}
      >
        TRA CỨU HÓA ĐƠN
      </button>
      <button
        className="text-white font-bold text-[0.84rem] uppercase hover:text-[#fcae1d] transition-colors mb-[8px]"
        onClick={() => onNavigate('contact')}
      >
        LIÊN HỆ
      </button>
    </nav>
  );
}
