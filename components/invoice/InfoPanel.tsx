'use client';

import { ArrowLeft } from 'lucide-react';

interface InfoPanelProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export function InfoPanel({ onNavigate, currentView }: InfoPanelProps) {
  const links = [
    { id: 'what-is', text: 'Hóa đơn điện tử là gì?' },
    { id: 'legal', text: 'Quy định pháp luật về hóa đơn điện tử' },
    { id: 'guide', text: 'Hướng dẫn tra cứu hóa đơn' },
    { id: 'minutes', text: 'Biên bản điều chỉnh, hủy, thu hồi hóa đơn' },
  ];

  return (
    <div className=" text-white ">
      <div className="p-[15px] ">
        <h3 className="font-bold text-[16px]">Thông tin về hóa đơn điện tử</h3>
      </div>

      <div>
        <ul>
          {links.map((link) => (
            <li
              key={link.id}
              className={` hover:bg-white/10 transition-colors cursor-pointer ${currentView === link.id ? 'bg-white/20' : ''}`}
              onClick={() => onNavigate(link.id)}
            >
              <div className="block px-[15px] py-1 text-[13px] leading-relaxed">
                {link.text}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-[15px] mt-0">
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
}
