import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Tra cứu Hóa đơn Điện tử | E-InvoiceNet",
  description: "Hệ thống tra cứu hóa đơn điện tử - Nhập thông tin để kiểm tra tính hợp lệ và tải về bản thể hiện.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
