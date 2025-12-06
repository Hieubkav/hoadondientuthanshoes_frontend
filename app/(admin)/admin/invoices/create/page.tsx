'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import InvoiceForm, { InvoiceFormValues } from '../components/InvoiceForm';

export default function CreateInvoicePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (values: InvoiceFormValues) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/invoices', {
        seller_tax_code: values.seller_tax_code.trim(),
        invoice_code: values.invoice_code.trim(),
        image: values.image.trim() || null,
      });

      setSuccess('Tạo hóa đơn thành công');
      setTimeout(() => router.push('/admin/invoices'), 800);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        setError(firstError?.[0] || 'Tạo hóa đơn thất bại');
      } else {
        setError(err.response?.data?.message || 'Tạo hóa đơn thất bại');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tạo hóa đơn</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Nhập thông tin hóa đơn mới.</p>
        </div>
        <Link
          href="/admin/invoices"
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          Quay lại danh sách
        </Link>
      </div>

      {success && (
        <div className="p-4 bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-200 rounded-lg border border-green-300 dark:border-green-500/40">
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-200 rounded-lg border border-red-300 dark:border-red-500/40">
          {error}
        </div>
      )}

      <InvoiceForm
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Tạo hóa đơn"
        extraActions={
          <Link
            href="/admin/invoices"
            className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
          >
            Huỷ
          </Link>
        }
      />
    </div>
  );
}
