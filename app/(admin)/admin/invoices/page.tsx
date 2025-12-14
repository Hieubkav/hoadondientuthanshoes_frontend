'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Image as ImageIcon, ArrowUp, ArrowDown, ArrowUpDown, FileText } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/app/context/AuthContext';
import { Invoice, PaginationMeta } from './types';

type Toast = { id: number; type: 'success' | 'error'; message: string };
type SortField = 'seller_tax_code' | 'invoice_code' | 'created_at' | null;
type SortDirection = 'asc' | 'desc';

export default function InvoicesPage() {
  const { loading: authLoading } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    loadInvoices(page, sortField, sortDirection);
  }, [page, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} className="text-slate-400" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp size={14} className="text-indigo-600 dark:text-indigo-400" />
    ) : (
      <ArrowDown size={14} className="text-indigo-600 dark:text-indigo-400" />
    );
  };

  const loadInvoices = async (pageNumber = 1, sort: SortField = null, direction: SortDirection = 'asc') => {
    setPageLoading(true);
    setError('');

    try {
      const params: Record<string, any> = { page: pageNumber };
      if (sort) {
        params.sort_by = sort;
        params.sort_direction = direction;
      }

      const response = await api.get('/invoices', { params });

      const payload = response.data.data;
      const items = Array.isArray(payload) ? payload : payload?.data ?? [];
      const pagination = Array.isArray(payload) ? null : payload?.meta ?? null;

      setInvoices(items);
      setMeta(pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải danh sách hóa đơn');
    } finally {
      setPageLoading(false);
    }
  };

  const pushToast = (type: Toast['type'], message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa hóa đơn này?')) return;

    try {
      await api.delete(`/invoices/${id}`);
      pushToast('success', 'Đã xoá hóa đơn');
      await loadInvoices(page, sortField, sortDirection);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Xoá thất bại';
      pushToast('error', msg);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Quản lý hóa đơn</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Danh sách hóa đơn điện tử.
          </p>
        </div>
        <Link
          href="/admin/invoices/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
        >
          + Tạo hóa đơn
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-500/40">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700">
              <tr className="text-left text-xs font-semibold uppercase text-slate-700 dark:text-slate-200">
                <th className="px-4 py-3 w-12">STT</th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors select-none"
                  onClick={() => handleSort('seller_tax_code')}
                >
                  <div className="flex items-center gap-2">
                    Mã số thuế
                    {getSortIcon('seller_tax_code')}
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors select-none"
                  onClick={() => handleSort('invoice_code')}
                >
                  <div className="flex items-center gap-2">
                    Mã hóa đơn
                    {getSortIcon('invoice_code')}
                  </div>
                </th>
                <th className="px-4 py-3 w-24">Ảnh</th>
                <th
                  className="px-4 py-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors select-none"
                  onClick={() => handleSort('created_at')}
                >
                  <div className="flex items-center gap-2">
                    Ngày tạo
                    {getSortIcon('created_at')}
                  </div>
                </th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500 dark:text-slate-400"
                  >
                    Chưa có hóa đơn nào
                  </td>
                </tr>
              ) : (
                invoices.map((invoice, idx) => {
                  const rowNumber = ((meta?.current_page ?? 1) - 1) * (meta?.per_page ?? invoices.length) + idx + 1;
                  const zebra = idx % 2 === 0
                    ? 'bg-white dark:bg-slate-800/60'
                    : 'bg-slate-50 dark:bg-slate-800/40';

                  return (
                    <tr
                      key={invoice.id}
                      className={`${zebra} border-b last:border-0 border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors`}
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-slate-700 dark:text-slate-100">
                        {rowNumber}
                      </td>
                      <td className="px-4 py-4 text-slate-900 dark:text-white font-medium">
                        {invoice.seller_tax_code}
                      </td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                        {invoice.invoice_code}
                      </td>
                      <td className="px-4 py-4">
                        {invoice.image ? (
                          invoice.image.toLowerCase().endsWith('.pdf') ? (
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex flex-col items-center justify-center shadow-sm">
                              <FileText size={24} className="text-white" />
                              <span className="text-[10px] font-bold text-white mt-0.5">PDF</span>
                            </div>
                          ) : (
                            <img
                              src={invoice.image}
                              alt="Invoice"
                              className="w-16 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                            />
                          )
                        ) : (
                          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                            <ImageIcon size={20} className="text-slate-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {new Date(invoice.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/invoices/${invoice.id}`}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700"
                            title="Chỉnh sửa"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(invoice.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-slate-700"
                            title="Xoá"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {meta && (
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg shadow px-4 py-3 border border-slate-200 dark:border-slate-700">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            Trang {meta.current_page} / {meta.last_page} - Tổng {meta.total} hóa đơn
          </span>
          {meta.last_page > 1 && (
            <div className="space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={meta.current_page <= 1}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Trước
              </button>
              <button
                onClick={() => setPage((p) => (meta.current_page >= meta.last_page ? p : p + 1))}
                disabled={meta.current_page >= meta.last_page}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Sau
              </button>
            </div>
          )}
        </div>
      )}

      {/* Toast stack */}
      <div className="fixed top-6 right-6 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`min-w-[240px] max-w-sm px-4 py-3 rounded-lg shadow-lg border ${
              toast.type === 'success'
                ? 'bg-green-600 text-white border-green-500'
                : 'bg-red-600 text-white border-red-500'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
