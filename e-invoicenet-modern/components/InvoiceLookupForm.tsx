import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Button } from './ui/Button';
import { Captcha } from './Captcha';

export const InvoiceLookupForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    taxId: '',
    invoiceCode: '',
    captchaInput: ''
  });
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCaptchaRefresh = (code: string) => {
    setGeneratedCaptcha(code);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Reset status when user types to encourage re-submission
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    // Simulate validation and API call
    setTimeout(() => {
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

      // Success simulation
      setStatus('success');
      setStatusMessage('Đã tìm thấy hóa đơn! Đang tải dữ liệu...');
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Thông tin tìm kiếm</CardTitle>
        <CardDescription>
          Nhập mã số thuế bên bán, mã nhận hóa đơn và mã kiểm tra để tra cứu.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-8">
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
                  className="w-full sm:w-auto flex-grow"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4" />
              <span>{statusMessage}</span>
            </div>
          )}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-3 text-sm text-green-700 bg-green-100 rounded-md animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{statusMessage}</span>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full text-base font-semibold" disabled={loading}>
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
      </CardContent>
    </Card>
  );
};