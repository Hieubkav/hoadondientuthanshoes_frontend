'use client';

interface NavBarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export function NavBar({ onNavigate, currentView }: NavBarProps) {
  return (
    <nav className="flex items-center justify-end gap-4 pl-4 pt-4 pb-2">
      <button
        className="text-white font-bold text-xs uppercase hover:text-[#fcae1d] transition-colors"
        onClick={() => onNavigate('search')}
      >
        TRA CỨU HÓA ĐƠN
      </button>
      <button
        className="text-white font-bold text-xs uppercase hover:text-[#fcae1d] transition-colors"
        onClick={() => onNavigate('contact')}
      >
        LIÊN HỆ
      </button>
    </nav>
  );
}
