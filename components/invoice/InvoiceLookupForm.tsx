'use client';

import { useState, useCallback } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Captcha } from './Captcha';
import { InvoiceResult } from './InvoiceResult';

interface Invoice {
  id: number;
  seller_tax_code: string;
  invoice_code: string;
  image: string;
}

export function InvoiceLookupForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    taxId: '',
    invoiceCode: '',
    captchaInput: ''
  });
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const handleCaptchaRefresh = useCallback((code: string) => {
    setGeneratedCaptcha(code);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setInvoice(null);

    if (!formData.taxId || !formData.invoiceCode || !formData.captchaInput) {
      setStatus('error');
      setStatusMessage('Vui lòng điền đầy đủ các trường bắt buộc.');
      setLoading(false);
      return;
    }

    if (formData.captchaInput.toUpperCase() !== generatedCaptcha) {
      setStatus('error');
      setStatusMessage('Mã kiểm tra không chính xác. Vui lòng thử lại.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/invoices/lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          seller_tax_code: formData.taxId,
          invoice_code: formData.invoiceCode,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMessage('Đã tìm thấy hóa đơn!');
        setInvoice(result.data);
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Không tìm thấy hóa đơn. Vui lòng kiểm tra lại thông tin.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResult = () => {
    setInvoice(null);
    setStatus('idle');
    setFormData({ taxId: '', invoiceCode: '', captchaInput: '' });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 text-card-foreground shadow-xl border-t-4 border-t-blue-600 p-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="space-y-1.5 mb-6">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Thông tin tìm kiếm</h3>
          <p className="text-sm text-slate-600">
            Nhập mã số thuế bên bán, mã nhận hóa đơn và mã kiểm tra để tra cứu.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="taxId">
                Mã số thuế bên bán <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="taxId" 
                name="taxId"
                placeholder="Ví dụ: 010023XXXX" 
                value={formData.taxId}
                onChange={handleChange}
                className="h-11"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="invoiceCode">
                Mã nhận hóa đơn <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="invoiceCode" 
                name="invoiceCode"
                placeholder="Nhập mã bí mật trên hóa đơn" 
                value={formData.invoiceCode}
                onChange={handleChange}
                className="h-11"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="captchaInput">
                Mã kiểm tra <span className="text-destructive">*</span>
              </Label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Captcha onRefresh={handleCaptchaRefresh} />
                <Input 
                  id="captchaInput" 
                  name="captchaInput"
                  placeholder="Nhập 5 ký tự trong hình" 
                  className="w-full sm:w-auto flex-grow h-11"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4" />
              <span>{statusMessage}</span>
            </div>
          )}
          {status === 'success' && !invoice && (
            <div className="flex items-center gap-2 p-3 text-sm text-green-700 bg-green-100 rounded-md animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{statusMessage}</span>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full text-base font-semibold h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Tìm hóa đơn
              </>
            )}
          </Button>
        </form>
      </div>

      {invoice && (
        <InvoiceResult invoice={invoice} onClose={handleCloseResult} />
      )}
    </div>
  );
}
