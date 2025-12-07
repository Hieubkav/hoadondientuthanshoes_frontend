'use client';

import { useEffect, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onRefresh: (code: string) => void;
}

export function Captcha({ onRefresh }: CaptchaProps) {
  const [code, setCode] = useState('');

  const generateCode = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
    onRefresh(result);
  }, [onRefresh]);

  useEffect(() => {
    generateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div 
        className="h-11 w-32 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center select-none relative overflow-hidden"
        aria-label="Captcha Image"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]" />
        
        <span 
          className="text-2xl font-mono font-bold tracking-widest text-slate-700"
          style={{
            textShadow: '2px 1px 1px rgba(0,0,0,0.1)',
            transform: 'rotate(-2deg)'
          }}
        >
          {code}
        </span>
        
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-300 transform -rotate-12" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-300 transform rotate-6" />
      </div>
      
      <button 
        type="button" 
        onClick={generateCode}
        className="p-2 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
        title="Lấy mã khác"
      >
        <RefreshCw className="h-5 w-5" />
      </button>
    </div>
  );
}
