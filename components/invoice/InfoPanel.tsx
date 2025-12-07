'use client';

import { ViewKey } from './types';

interface InfoPanelProps {
  onNavigate: (view: ViewKey) => void;
  currentView: ViewKey;
}

export function InfoPanel({ onNavigate, currentView }: InfoPanelProps) {
  const links: Array<{ id: ViewKey; text: string }> = [
    { id: 'what-is', text: 'Hóa đơn điện tử là gì?' },
    { id: 'legal', text: 'Quy định pháp luật về hóa đơn điện tử' },
    { id: 'guide', text: 'Hướng dẫn tra cứu hóa đơn' },
    { id: 'minutes', text: 'Biên bản điều chỉnh, hủy, thu hồi hóa đơn' },
  ];

  return (
    <div className=" text-white ">
      <div className="px-[15px] py-[15px]">
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
              <div className="block px-[30px] py-1 text-[13px] leading-relaxed">
                {link.text}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-[15px] py-[15px] mt-0">
        <div
          onClick={() => onNavigate('search')}
          className="flex items-center gap-1 text-[13px] font-bold hover:underline cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 32 32"
            className="flex-shrink-0"
          >
            <circle cx="16" cy="16" r="14" fill="#ffffff" />
            <path
              d="M22 16 H13 M16 11 L10 16 L16 21"
              fill="none"
              stroke="#003f97"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Tra cứu hóa đơn
        </div>
      </div>
    </div>
  );
}
