'use client';

import { useState } from 'react';
import { Images, X } from 'lucide-react';
import MediaModal from '../../components/MediaModal';
import { MediaItem } from '../../media/types';

export interface InvoiceFormValues {
  seller_tax_code: string;
  invoice_code: string;
  image: string;
}

interface InvoiceFormProps {
  initialValues?: Partial<InvoiceFormValues>;
  onSubmit: (values: InvoiceFormValues) => Promise<void>;
  submitting: boolean;
  submitLabel?: string;
  extraActions?: React.ReactNode;
}

export default function InvoiceForm({
  initialValues,
  onSubmit,
  submitting,
  submitLabel = 'Lưu',
  extraActions,
}: InvoiceFormProps) {
  const [values, setValues] = useState<InvoiceFormValues>({
    seller_tax_code: initialValues?.seller_tax_code ?? '',
    invoice_code: initialValues?.invoice_code ?? '',
    image: initialValues?.image ?? '',
  });
  const [mediaOpen, setMediaOpen] = useState(false);

  const handleChange = (field: keyof InvoiceFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectMedia = (item: MediaItem) => {
    handleChange('image', item.url);
    setMediaOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Mã số thuế bên bán <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={values.seller_tax_code}
              onChange={(e) => handleChange('seller_tax_code', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nhập mã số thuế bên bán"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Mã nhận hóa đơn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={values.invoice_code}
              onChange={(e) => handleChange('invoice_code', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nhập mã nhận hóa đơn"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Ảnh hóa đơn
            </label>
            {values.image ? (
              <div className="relative inline-block">
                <img
                  src={values.image}
                  alt="Invoice"
                  className="max-w-xs max-h-48 rounded-lg border border-slate-200 dark:border-slate-600 object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleChange('image', '')}
                  className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMediaOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition"
              >
                <Images size={20} />
                Chọn ảnh từ thư viện
              </button>
            )}
            {values.image && (
              <button
                type="button"
                onClick={() => setMediaOpen(true)}
                className="mt-2 ml-3 text-sm text-indigo-600 hover:text-indigo-700"
              >
                Đổi ảnh khác
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            {submitting ? 'Đang xử lý...' : submitLabel}
          </button>
          {extraActions}
        </div>
      </form>

      <MediaModal
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        onSelect={handleSelectMedia}
      />
    </>
  );
}
