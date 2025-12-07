import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface InfoPanelProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ onNavigate, currentView }) => {
  const links = [
    { id: 'what-is', text: "Hóa đơn điện tử là gì?" },
    { id: 'legal', text: "Quy định pháp luật về hóa đơn điện tử" },
    { id: 'guide', text: "Hướng dẫn tra cứu hóa đơn" },
    { id: 'minutes', text: "Biên bản điều chỉnh, hủy, thu hồi hóa đơn" }
  ];

  return (
    <div className="bg-[#004a9e] text-white border border-white/30 shadow-sm">
      {/* Header of Panel */}
      <div className="p-[15px] border-b border-white/20">
        <h3 className="font-bold text-[16px]">Thông tin về hóa đơn điện tử</h3>
      </div>
      
      {/* Links List */}
      <div className="p-0">
        <ul className="">
          {links.map((link) => (
            <li 
              key={link.id} 
              className={`border-b border-white/20 last:border-0 hover:bg-white/10 transition-colors cursor-pointer ${currentView === link.id ? 'bg-white/20' : ''}`}
              onClick={() => onNavigate(link.id)}
            >
              <div className="block px-[15px] py-3 text-[13px] leading-relaxed">
                {link.text}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Back Link */}
      <div className="p-[15px] mt-4">
        <div 
          onClick={() => onNavigate('search')}
          className="flex items-center gap-1 text-[13px] font-bold hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3" />
          Tra cứu hóa đơn
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;