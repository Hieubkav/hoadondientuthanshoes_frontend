'use client';

export function Footer() {
  return (
    <footer className="w-full py-2 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-xs text-center md:text-left">
          © 2017 Giải pháp hóa đơn điện tử{' '}
          <a 
            href="https://einvoice.vn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Einvoice
          </a>{' '}
          phát triển bởi{' '}
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
    </footer>
  );
}
