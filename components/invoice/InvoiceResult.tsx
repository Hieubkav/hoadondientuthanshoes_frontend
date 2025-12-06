'use client';

import { useState } from 'react';
import { Eye, Download, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface Invoice {
  id: number;
  seller_tax_code: string;
  invoice_code: string;
  image: string;
  image_url?: string;
}

interface InvoiceResultProps {
  invoice: Invoice;
  onClose: () => void;
}

export function InvoiceResult({ invoice, onClose }: InvoiceResultProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const getImageUrl = () => {
    if (invoice.image_url) {
      if (invoice.image_url.startsWith('http')) return invoice.image_url;
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || '';
      return `${baseUrl}${invoice.image_url}`;
    }
    if (invoice.image?.startsWith('http')) return invoice.image;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || '';
    return `${baseUrl}/storage/${invoice.image}`;
  };
  
  const imageUrl = getImageUrl();

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hoa-don-${invoice.invoice_code}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>In hóa đơn - ${invoice.invoice_code}</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
              img { max-width: 100%; height: auto; }
              @media print { body { margin: 0; } img { max-width: 100%; } }
            </style>
          </head>
          <body>
            <img src="${imageUrl}" onload="window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="rounded-xl border bg-card shadow-lg p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-green-700">
          Tìm thấy hóa đơn!
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative aspect-[3/4] max-h-[400px] bg-slate-100 rounded-lg overflow-hidden border">
        <img
          src={imageUrl}
          alt={`Hóa đơn ${invoice.invoice_code}`}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsViewOpen(true)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Xem
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Tải về
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handlePrint}
        >
          <Printer className="h-4 w-4 mr-2" />
          In
        </Button>
      </div>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          <div className="relative w-full h-full overflow-auto p-4">
            <img
              src={imageUrl}
              alt={`Hóa đơn ${invoice.invoice_code}`}
              className="w-full h-auto"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
