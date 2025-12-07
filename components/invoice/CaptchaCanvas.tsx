'use client';

import { useEffect, useRef } from 'react';

interface CaptchaCanvasProps {
  code: string;
  onClick?: () => void;
}

export function CaptchaCanvas({ code, onClick }: CaptchaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 200;
    const height = 60;
    canvas.width = width;
    canvas.height = height;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Add blue noise dots (similar to the reference image)
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 1.2 + 0.5;
      const opacity = Math.random() * 0.7 + 0.3;

      ctx.fillStyle = `rgba(70, 130, 180, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw text
    ctx.font = 'italic bold 42px Arial, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const centerY = height / 2;
    // Reduce spacing to make characters closer together
    const charSpacing = 32;
    const totalTextWidth = charSpacing * code.length;
    const startX = (width - totalTextWidth) / 2 + charSpacing / 2;
    // Use consistent angle for all characters (increased to ~30 degrees)
    const consistentAngle = -0.45;

    for (let i = 0; i < code.length; i++) {
      ctx.save();

      const x = startX + i * charSpacing;
      const y = centerY;

      ctx.translate(x, y);
      ctx.rotate(consistentAngle);
      ctx.globalAlpha = 0.45;

      // Light blue stroke for outline/shadow effect
      ctx.strokeStyle = '#2224f7';
      ctx.lineWidth = 2.5;
      ctx.strokeText(code[i], 0, 0);

      // Light blue fill
      ctx.fillStyle = '#2224f7';
      ctx.fillText(code[i], 0, 0);

      ctx.restore();
    }

    // Light border
    ctx.strokeStyle = '#d0d0d0';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  }, [code]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-[#ccc] h-[40px] cursor-pointer select-none flex-shrink-0 hover:opacity-85 transition-opacity"
      onClick={onClick}
      title="Click để lấy mã khác"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}
