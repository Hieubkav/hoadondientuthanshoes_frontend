import React from 'react';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="w-full bg-transparent h-[70px] flex items-center relative z-20">
      <div className="max-w-[1170px] mx-auto w-full px-4 flex justify-between items-center">
        {/* Logo Text simulation */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => onNavigate('search')}
        >
          <span className="text-[#fcae1d] font-bold text-2xl uppercase tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>E-</span>
          <span className="text-white font-bold text-2xl uppercase tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>INVOICE</span>
          <span className="text-white font-bold text-2xl uppercase tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>NET</span>
        </div>

        {/* Top Navigation */}
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
};

export default Header;