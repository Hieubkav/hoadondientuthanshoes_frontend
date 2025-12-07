'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, Twitter, X, Printer, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Info } from 'lucide-react';
import { CaptchaCanvas } from './CaptchaCanvas';
import { ViewKey } from './types';

interface InvoiceLookupFormProps {
  onNavigate?: (view: ViewKey) => void;
  currentView?: ViewKey;
}

type Invoice = {
  id: number;
  seller_tax_code: string;
  invoice_code: string;
  image: string | null;
  image_url?: string | null;
  download_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');
const LOOKUP_URL = `${API_BASE_URL}/public/invoices/lookup`;

const createCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 4; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export function InvoiceLookupForm({ onNavigate, currentView }: InvoiceLookupFormProps) {
  const [taxId, setTaxId] = useState('');
  const [invoiceCode, setInvoiceCode] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState<string>('BWHE2');
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPdf, setIsPdf] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [renderedUrl, setRenderedUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pdfLoading, setPdfLoading] = useState(false);


  const buildImageUrl = () => {
    if (!invoice) return '';

    const imagePath = invoice.image_url || invoice.image || '';
    if (!imagePath) return '';

    // Keep absolute URL unchanged to avoid switching host/port
    if (/^https?:\/\//i.test(imagePath)) return imagePath;

    const apiRoot =
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, '') ||
      'http://localhost:8000';

    const normalizedPath = imagePath.startsWith('/storage/')
      ? imagePath
      : `/storage/${imagePath.replace(/^\//, '')}`;

    return `${apiRoot}${normalizedPath}`;
  };

  const buildProxyDownloadUrl = (rawUrl: string, opts?: { inline?: boolean }) => {
    const base = `/api/invoice-file?image=${encodeURIComponent(rawUrl)}`;
    return opts?.inline ? `${base}&inline=1` : base;
  };

  const renderPdfPage = useCallback(async (doc: any, pageNumber: number) => {
    const page = await doc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.2 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    setRenderedUrl(canvas.toDataURL('image/png'));
  }, []);

  const loadPdfDocument = useCallback(
    async (url: string) => {
      setPdfLoading(true);
      try {
        const pdfjsLib = await import('pdfjs-dist');
        const workerModule = await import('pdfjs-dist/build/pdf.worker.min.mjs');
        const workerCandidate =
          (workerModule as any)?.default ??
          (workerModule as any)?.src ??
          (workerModule as any);
        const workerSrc =
          typeof workerCandidate === 'string'
            ? workerCandidate
            : workerCandidate?.toString?.();

        // Fallback CDN nếu bundler không trả về URL hợp lệ
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          workerSrc && workerSrc !== '[object Module]'
            ? workerSrc
            : 'https://unpkg.com/pdfjs-dist@4.5.136/build/pdf.worker.min.js';

        const doc = await pdfjsLib.getDocument({ url, withCredentials: false }).promise;
        setPdfDoc(doc);
        setTotalPages(doc.numPages || 1);
        setCurrentPage(1);
        await renderPdfPage(doc, 1);
      } catch (err) {
        console.error(err);
        setError('Không tải được PDF hóa đơn.');
      } finally {
        setPdfLoading(false);
      }
    },
    [renderPdfPage],
  );


  const generateCaptcha = useCallback(() => {
    setCaptchaCode(createCaptcha());
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  useEffect(() => {
    if (!invoice) {
      setRenderedUrl('');
      setSourceUrl('');
      setIsPdf(false);
      setTotalPages(1);
      setCurrentPage(1);
      setPdfDoc(null);
      setPdfLoading(false);
      return;
    }

    const rawUrl = buildImageUrl();
    setSourceUrl(rawUrl);
    if (!rawUrl) return;

    const pdfFile = /\.pdf($|\?)/i.test(rawUrl);
    setIsPdf(pdfFile);

    if (pdfFile) {
      const inlineUrl = buildProxyDownloadUrl(rawUrl, { inline: true });
      loadPdfDocument(inlineUrl);
    } else {
      setPdfDoc(null);
      setPdfLoading(false);
      setRenderedUrl(rawUrl);
      setTotalPages(1);
      setCurrentPage(1);
    }
  }, [invoice, loadPdfDocument]);

  useEffect(() => {
    if (!isPdf || !pdfDoc) return;

    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
      return;
    }

    renderPdfPage(pdfDoc, safePage);
  }, [currentPage, isPdf, pdfDoc, totalPages, renderPdfPage]);


  const handleSearch = async () => {
    setError(null);
    setMessage(null);
    setInvoice(null);

    if (!taxId.trim()) {
      setError('Vui lòng nhập Mã số thuế bên bán.');
      return;
    }

    if (!invoiceCode.trim()) {
      setError('Vui lòng nhập Mã nhận hóa đơn.');
      return;
    }

    if (!captcha.trim()) {
      setError('Vui lòng nhập Mã kiểm tra.');
      return;
    }

    if (captcha.toUpperCase() !== captchaCode.toUpperCase()) {
      setError('Mã kiểm tra không đúng. Vui lòng nhập lại.');
      generateCaptcha();
      setCaptcha('');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(LOOKUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_tax_code: taxId.trim(),
          invoice_code: invoiceCode.trim(),
        }),
        cache: 'no-store',
      });

      const payload = await response
        .json()
        .catch(() => ({ success: false, message: 'Không thể phân tích phản hồi từ máy chủ.' }));

      if (!response.ok || payload?.success === false) {
        const messageText =
          payload?.message || 'Không thể tìm thấy hóa đơn. Vui lòng kiểm tra lại thông tin.';
        throw new Error(messageText);
      }

      setInvoice(payload.data as Invoice);
      setMessage(payload.message || 'Tìm thấy hóa đơn!');
      setShowModal(true);
      setCurrentPage(1);
    } catch (err) {
      const messageText = err instanceof Error ? err.message : 'Có lỗi xảy ra, vui lòng thử lại.';
      setError(messageText);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const targetUrl = sourceUrl || buildImageUrl();
    if (!targetUrl) return;

    const proxiedUrl = buildProxyDownloadUrl(targetUrl, { inline: true });
    const isPdfFile = isPdf || /\.pdf($|\?)/i.test(targetUrl);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.open(proxiedUrl, '_blank');
      return;
    }

    const html = isPdfFile
      ? `
        <html>
          <head>
            <title>In Hoa Don</title>
            <style>
              body { margin: 0; padding: 0; }
              iframe { width: 100vw; height: 100vh; border: none; }
              @media print { @page { margin: 0; size: auto; } }
            </style>
          </head>
          <body>
            <iframe src="${proxiedUrl}" onload="const frame=this; setTimeout(() => { try { frame.contentWindow.focus(); frame.contentWindow.print(); } catch(e) { window.focus(); window.print(); } }, 150);" ></iframe>
          </body>
        </html>
      `
      : `
        <html>
          <head>
            <title>In Hoa Don</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: flex-start; padding: 0; }
              img { width: 100%; max-width: 210mm; height: auto; }
              @media print { @page { margin: 0; size: auto; } body { padding: 0; } }
            </style>
          </head>
          <body>
            <img src="${proxiedUrl}" onload="window.focus(); window.print(); setTimeout(() => window.close(), 300);" />
          </body>
        </html>
      `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleDownload = async () => {
    const targetUrl = sourceUrl || buildImageUrl();
    if (!targetUrl) return;

    // Proxy qua API route cung origin de tranh CORS
    const downloadUrl = buildProxyDownloadUrl(targetUrl);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `HoaDon_${invoice?.invoice_code || invoiceCode}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modalImageUrl = renderedUrl || buildImageUrl();

  return (
    <>
      <div className="bg-white shadow-lg overflow-hidden min-h-[500px] max-md:min-h-0 flex flex-col">
        <div className="px-30 max-md:px-4 py-10 max-md:py-6 flex-grow">
          <h2 className="text-[28px] max-md:text-[20px] text-[#555555] text-center mb-10 max-md:mb-6 font-normal leading-tight">
            Nhập thông tin tìm kiếm hóa đơn điện tử
          </h2>

          <div className="w-full max-w-[700px] mx-auto space-y-5 max-md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-[170px] max-md:w-full text-right max-md:text-left text-[#333] text-sm pt-2 sm:pt-0 pr-6 max-md:pr-0 max-md:pb-1 font-normal">
                Mã số thuế bên bán <span className="text-red-500">(*)</span>
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="Nhập mã số thuế"
                className="flex-1 border border-[#ccc] h-[34px] max-md:h-[40px] px-3 text-sm bg-white text-black font-medium focus:outline-none focus:border-[#66afe9] focus:ring-1 focus:ring-[#66afe9] shadow-inner transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-[170px] max-md:w-full text-right max-md:text-left text-[#333] text-sm pt-2 sm:pt-0 pr-6 max-md:pr-0 max-md:pb-1 font-normal">
                Mã nhận hóa đơn <span className="text-red-500">(*)</span>
              </label>
              <input
                type="text"
                value={invoiceCode}
                onChange={(e) => setInvoiceCode(e.target.value)}
                placeholder="Nhập mã nhận hóa đơn"
                className="flex-1 border border-[#ccc] h-[34px] max-md:h-[40px] px-3 text-sm bg-white text-black font-medium focus:outline-none focus:border-[#66afe9] focus:ring-1 focus:ring-[#66afe9] shadow-inner transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row">
              <label className="w-[170px] max-md:w-full text-right max-md:text-left text-[#333] text-sm pt-2 pr-6 max-md:pr-0 max-md:pb-1 font-normal">
                Mã kiểm tra: <span className="text-red-500">(*)</span>
              </label>

              <div className="flex-1">
                <div className="flex items-center gap-2 max-md:flex-wrap">
                  <CaptchaCanvas code={captchaCode} onClick={generateCaptcha} />

                  <input
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="flex-1 max-md:w-full border border-[#ccc] h-[40px] px-3 text-sm bg-white text-black font-medium focus:outline-none focus:border-[#66afe9] focus:ring-1 focus:ring-[#66afe9] shadow-inner transition-colors"
                  />
                </div>

                <div className="mt-3 flex justify-end max-md:justify-center">
                  <button
                    onClick={handleSearch}
                    className="bg-[#5cb85c] hover:bg-[#449d44] border border-[#4cae4c] text-white px-4 py-2 max-md:px-6 max-md:py-3 text-sm font-normal rounded-[3px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 max-md:w-full max-md:justify-center"
                    type="button"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Tìm hóa đơn
                  </button>
                </div>

                {error && (
                  <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fafafa] py-4 px-8 max-md:px-4">
          <div className="flex items-center justify-end max-md:justify-center gap-2">
            <span className="text-black text-sm">Chia sẻ:</span>

            <button
              onClick={() => window.open('https://workspaceupdates.googleblog.com/2023/04/new-community-features-for-google-chat-and-an-update-currents%20.html', 'google_share', 'width=800,height=600,left=100,top=100')}
              className="w-[25.5px] h-[25.5px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
              title="Chia sẻ trên Google"
            >
              <img
                src="/g.png"
                alt="Google"
                className="w-full h-full object-contain"
              />
            </button>

            <button
              onClick={() => window.open('https://x.com/intent/tweet?url=http%3A%2F%2Ftracuutvan.einvoice.com.vn%2Ftra-cuu-hoa-don', 'twitter_share', 'width=600,height=400,left=200,top=200')}
              className="w-[25.5px] h-[25.5px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
              title="Chia sẻ trên Twitter/X"
            >
              <img
                src="/tt.png"
                alt="Twitter"
                className="w-full h-full object-contain"
              />
            </button>

            <button
              onClick={() => window.open('https://www.facebook.com/share_channel/?type=reshare&link=http%3A%2F%2Ftracuutvan.einvoice.com.vn%2Ftra-cuu-hoa-don&app_id=966242223397117&source_surface=external_reshare&display&hashtag#', 'facebook_share', 'width=800,height=600,left=150,top=150')}
              className="w-[25.5px] h-[25.5px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
              title="Chia sẻ trên Facebook"
            >
              <img
                src="/fb.png"
                alt="Facebook"
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>


      </div>
      <div className="text-start md:text-left py-2">
        <p className="text-gray-600 text-xs">
          © 2017 Giải pháp hóa đơn điện tử{' '}
          <a 
            href="https://einvoice.vn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 underline hover:text-blue-800"
          >
            Einvoice
          </a>
          {' '}phát triển bởi{' '}
          <a 
            href="http://thaison.vn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 underline hover:text-blue-800"
          >
            Thái Sơn
          </a>
        </p>
      </div>

      {showModal && invoice && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setShowModal(false)}
            className="fixed top-4 right-6 z-[60] text-white hover:text-gray-200 transition-colors bg-black/40 hover:bg-black/60 rounded-full p-2"
            title="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex min-h-full flex-col items-center justify-start p-4 md:py-8">
            <div className="bg-white shadow-2xl max-w-[210mm] w-full relative mb-4 transition-transform min-h-[200px]">
              {pdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-[#337ab7]" />
                </div>
              )}

              {modalImageUrl ? (
                <img src={modalImageUrl} alt="Invoice Content" className="w-full h-auto block" />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-50 flex items-center justify-center text-gray-500 text-sm">
                  Không hiển thị nội dung
                </div>
              )}

              <div className="absolute bottom-2 right-4 text-[10px] text-gray-400">
                Page {currentPage} / {totalPages}
              </div>
            </div>

            <div className="bg-white rounded-[3px] shadow-lg max-w-[210mm] w-full p-3 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1 || pdfLoading}
                    className="p-1.5 border border-[#ccc] rounded-[3px] hover:bg-[#eee] disabled:opacity-50 text-[#555]"
                    title="Trang đầu"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || pdfLoading}
                    className="p-1.5 border border-[#ccc] rounded-[3px] hover:bg-[#eee] disabled:opacity-50 text-[#555]"
                    title="Trang trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="min-w-[74px] h-8 px-3 flex items-center justify-center border rounded-[3px] text-sm font-medium bg-[#337ab7] border-[#337ab7] text-white">
                    {currentPage} / {totalPages}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages || pdfLoading}
                    className="p-1.5 border border-[#ccc] rounded-[3px] hover:bg-[#eee] text-[#555] disabled:opacity-50"
                    title="Trang sau"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage >= totalPages || pdfLoading}
                    className="p-1.5 border border-[#ccc] rounded-[3px] hover:bg-[#eee] text-[#555] disabled:opacity-50"
                    title="Trang cuối"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end">
                  <Info className="w-5 h-5 text-red-500 mr-2" />

                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 bg-[#5bc0de] hover:bg-[#46b8da] border border-[#46b8da] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-normal transition-colors shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span>In hóa đơn</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 bg-[#f0ad4e] hover:bg-[#eea236] border border-[#eea236] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-normal transition-colors shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Tải hóa đơn</span>
                  </button>

                  <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block"></div>

                  <button
                    onClick={() => setShowModal(false)}
                    className="flex items-center gap-1 text-[#999] hover:text-[#333] px-2 py-1.5 transition-colors font-bold text-lg"
                  >
                    <X className="w-6 h-6" />
                    <span className="text-sm font-normal">Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
