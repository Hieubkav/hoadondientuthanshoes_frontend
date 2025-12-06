'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import InvoiceForm, { InvoiceFormValues } from '../components/InvoiceForm';
import { Invoice } from '../types';

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadInvoice();
  }, [id]);

  const loadInvoice = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/invoices/${id}`);
      setInvoice(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải thông tin hóa đơn');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: InvoiceFormValues) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.patch(`/invoices/${id}`, {
        seller_tax_code: values.seller_tax_code.trim(),
        invoice_code: values.invoice_code.trim(),
        image: values.image.trim() || null,
      });

      setSuccess('Cập nhật hóa đơn thành công');
      setTimeout(() => router.push('/admin/invoices'), 800);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        setError(firstError?.[0] || 'Cập nhật thất bại');
      } else {
        setError(err.response?.data?.message || 'Cập nhật thất bại');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!invoice && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">Không tìm thấy hóa đơn</p>
        <Link href="/admin/invoices" className="text-indigo-600 hover:underline mt-2 inline-block">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Chỉnh sửa hóa đơn</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Mã: {invoice?.invoice_code}
          </p>
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

      {invoice && (
        <InvoiceForm
          initialValues={{
            seller_tax_code: invoice.seller_tax_code,
            invoice_code: invoice.invoice_code,
            image: invoice.image ?? '',
          }}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Cập nhật"
          extraActions={
            <Link
              href="/admin/invoices"
              className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
            >
              Huỷ
            </Link>
          }
        />
      )}
    </div>
  );
}
