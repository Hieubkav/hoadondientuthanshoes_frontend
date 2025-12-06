import { Header, Footer, InvoiceLookupForm, InfoPanel } from '@/components/invoice';

export const metadata = {
    title: 'Tra cứu hóa đơn điện tử',
    description: 'Hệ thống tra cứu hóa đơn điện tử - Nhập thông tin để kiểm tra tính hợp lệ và tải về bản thể hiện.',
};

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    {/* Left Column: The Main Form */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                        <div className="space-y-4 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                                Tra cứu hóa đơn điện tử
                            </h1>
                        </div>
                        
                        <InvoiceLookupForm />
                    </div>

                    {/* Right Column: Informational Links & Help */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                        <InfoPanel />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
