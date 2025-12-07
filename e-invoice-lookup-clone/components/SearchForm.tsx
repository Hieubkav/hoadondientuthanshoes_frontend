import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Twitter, Printer, Download, X, AlertCircle } from 'lucide-react';

const SearchForm: React.FC = () => {
  const [taxId, setTaxId] = useState('');
  const [invoiceCode, setInvoiceCode] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState('BWHE2');
  const [showModal, setShowModal] = useState(false);
  
  const INVOICE_IMAGE_URL = "https://tse1.mm.bing.net/th/id/OIP.jSgipmHW83V4EhPzsYWVBgHaKe?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3";

  // Generate captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  const handleSearch = () => {
    // Reset modal state
    setShowModal(false);

    // Validation Logic
    if (taxId !== '123') {
      alert("Mã số thuế bên bán không chính xác! (Gợi ý: 123)");
      return;
    }

    if (invoiceCode !== '123') {
      alert("Mã nhận hóa đơn không chính xác! (Gợi ý: 123)");
      return;
    }

    if (captcha.toUpperCase() !== captchaCode.toUpperCase()) {
      alert("Mã kiểm tra không đúng. Vui lòng nhập lại!");
      generateCaptcha(); // Refresh captcha on error for security UX
      setCaptcha('');
      return;
    }

    // If all valid
    setShowModal(true);
  };

  const handlePrint = () => {
    // Open a new window for printing the image specifically
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>In Hóa Đơn</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 20px; }
              img { width: 100%; max-width: 210mm; height: auto; }
              @media print {
                @page { margin: 0; size: auto; }
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            <img src="${INVOICE_IMAGE_URL}" onload="window.print();window.close()" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(INVOICE_IMAGE_URL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `HoaDon_${invoiceCode}.jpg`; // Tên file khi tải về
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback for simple direct link if fetch fails due to CORS
      window.open(INVOICE_IMAGE_URL, '_blank');
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="p-10 flex-grow">
          <h2 className="text-[28px] text-[#555555] text-center mb-10 font-normal leading-tight">
            Nhập thông tin tìm kiếm hóa đơn điện tử
          </h2>

          <div className="w-full max-w-[700px] mx-auto space-y-5">
            {/* Seller Tax ID */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-[170px] text-right text-[#333] text-sm pt-2 sm:pt-0 pr-6 font-normal">
                Mã số thuế bên bán <span className="text-red-500">(*)</span>
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="Nhập 123"
                className="flex-1 border border-[#ccc] h-[34px] px-3 text-sm bg-white text-black font-medium focus:outline-none focus:border-[#66afe9] focus:ring-1 focus:ring-[#66afe9] shadow-inner transition-colors"
              />
            </div>

            {/* Invoice Code */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-[170px] text-right text-[#333] text-sm pt-2 sm:pt-0 pr-6 font-normal">
                Mã nhận hóa đơn <span className="text-red-500">(*)</span>
              </label>
              <input
                type="text"
                value={invoiceCode}
                onChange={(e) => setInvoiceCode(e.target.value)}
                placeholder="Nhập 123"
                className="flex-1 border border-[#ccc] h-[34px] px-3 text-sm bg-white text-black font-medium focus:outline-none focus:border-[#66afe9] focus:ring-1 focus:ring-[#66afe9] shadow-inner transition-colors"
              />
            </div>

            {/* Captcha Section */}
            <div className="flex flex-col sm:flex-row">
              <label className="w-[170px] text-right text-[#333] text-sm pt-2 pr-6 font-normal">
                Mã kiểm tra: <span className="text-red-500">(*)</span>
              </label>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {/* Captcha Image Display */}
                  <div 
                    className="bg-[#f2f6fc] border border-[#bce8f1] h-[40px] px-4 flex items-center justify-center select-none min-w-[150px] relative overflow-hidden cursor-pointer"
                    onClick={generateCaptcha}
                    title="Click để lấy mã khác"
                  >
                    <span className="text-[#31708f] font-bold text-xl tracking-[0.4em] font-serif z-10 relative italic">
                      {captchaCode}
                    </span>
                    
                    {/* Interference Lines (Strikethrough effect) - 2 thin lines only */}
                    <div className="absolute top-[45%] left-0 w-full h-[1px] bg-[#31708f] opacity-70 rotate-3 z-20"></div>
                    <div className="absolute top-[55%] left-0 w-full h-[1px] bg-[#31708f] opacity-70 -rotate-3 z-20"></div>
                  </div>
                  
                  <button 
                    className="flex items-center gap-1 text-[#333] text-xs hover:text-blue-600 transition-colors border border-[#ddd] px-3 h-[40px] bg-white rounded-sm"
                    onClick={generateCaptcha}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Lấy mã khác</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="w-full sm:w-[150px] border border-[#ccc] h-[34px] px-3 text-sm bg-white text-black font-medium focus:outline-none focus:border-[#66afe9] focus:ring-1 focus:ring-[#66afe9] shadow-inner transition-colors"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row mt-6">
              <div className="w-[170px] hidden sm:block pr-6"></div>
              <div className="flex-1">
                 <button 
                  onClick={handleSearch}
                  className="bg-[#5cb85c] hover:bg-[#449d44] border border-[#4cae4c] text-white px-4 py-2 text-sm font-normal rounded-[3px] transition-colors"
                 >
                  Tìm hóa đơn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer / Share Section */}
        <div className="border-t border-[#eee] py-4 px-8">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[#777] text-sm">Chia sẻ:</span>
            
            <a href="#" className="w-[30px] h-[30px] bg-[#dd4b39] flex items-center justify-center text-white rounded-[2px] hover:opacity-90 transition-opacity">
              <span className="font-bold text-sm">G+</span>
            </a>
            
            <a href="#" className="w-[30px] h-[30px] bg-[#55acee] flex items-center justify-center text-white rounded-[2px] hover:opacity-90 transition-opacity">
              <Twitter className="w-4 h-4 fill-current" />
            </a>
            
            <a href="#" className="w-[30px] h-[30px] bg-[#3b5998] flex items-center justify-center text-white rounded-[2px] hover:opacity-90 transition-opacity">
               <span className="font-bold text-lg">f</span>
            </a>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-[900px] max-h-[95vh] flex flex-col relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#eee] bg-[#f8f8f8]">
              <h3 className="text-[#333] font-bold text-sm">Chi tiết hóa đơn</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#999] hover:text-[#333] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Image) */}
            <div className="flex-1 overflow-auto bg-[#525659] p-4 flex justify-center">
              <div className="bg-white shadow-lg p-1 max-w-[210mm] w-full">
                <img 
                  src={INVOICE_IMAGE_URL} 
                  alt="Invoice" 
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Modal Footer (Buttons) */}
            <div className="border-t border-[#eee] p-3 bg-white flex justify-end items-center gap-2">
              
              <button 
                onClick={handlePrint}
                className="flex items-center gap-1 bg-[#5bc0de] hover:bg-[#46b8da] border border-[#46b8da] text-white px-3 py-1.5 rounded-[3px] text-sm font-normal transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>In hóa đơn</span>
              </button>

              <button 
                onClick={handleDownload}
                className="flex items-center gap-1 bg-[#f0ad4e] hover:bg-[#eea236] border border-[#eea236] text-white px-3 py-1.5 rounded-[3px] text-sm font-normal transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Tải hóa đơn</span>
              </button>

              <button 
                onClick={() => setShowModal(false)}
                className="flex items-center gap-1 bg-white hover:bg-[#e6e6e6] border border-[#ccc] text-[#333] px-3 py-1.5 rounded-[3px] text-sm font-normal transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Đóng</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchForm;