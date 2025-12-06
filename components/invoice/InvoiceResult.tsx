'use client';

import { useState } from 'react';
import { Eye, Download, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface Invoice {
  id: number;
  seller_tax_code: string;
  invoice_code: string;
  image: string;
  image_url?: string;
  download_url?: string;
}

interface InvoiceResultProps {
  invoice: Invoice;
  onClose: () => void;
}

export function InvoiceResult({ invoice, onClose }: InvoiceResultProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const getImageUrl = () => {
    const imagePath = invoice.image_url || invoice.image;
    if (!imagePath) return '';
    
    if (imagePath.startsWith('http')) return imagePath;
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
    
    if (imagePath.startsWith('/storage/')) {
      return baseUrl + imagePath;
    }
    return `${baseUrl}/storage/${imagePath}`;
  };

  const imageUrl = getImageUrl();
  const downloadHref = imageUrl
    ? `/api/invoice-file?image=${encodeURIComponent(imageUrl)}`
    : '';

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
        {imageUrl ? (
          <Button variant="outline" className="w-full" asChild>
            <a
              href={downloadHref}
              download={`hoa-don-${invoice.invoice_code}.png`}
            >
              <Download className="h-4 w-4 mr-2" />
              Tải về
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            <Download className="h-4 w-4 mr-2" />
            Tải về
          </Button>
        )}
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
          <DialogTitle className="sr-only">Xem hóa đơn</DialogTitle>
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
