import React, { useState } from 'react';
import { HelpCircle, FileQuestion, BookOpen, AlertTriangle, ChevronDown, Download, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

// Mock content data
const TOPICS = [
  {
    id: 'definition',
    icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
    title: "Hóa đơn điện tử là gì?",
    desc: "Khái niệm và lợi ích cơ bản",
    content: (
      <div className="space-y-4 pt-2">
        <p className="font-medium text-slate-800 text-sm leading-relaxed">
          Hóa đơn điện tử là hóa đơn có mã hoặc không mã của cơ quan thuế được thể hiện ở dạng dữ liệu điện tử do tổ chức, cá nhân bán hàng hóa, cung cấp dịch vụ lập bằng phương tiện điện tử.
        </p>
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-blue-700 mb-1 text-sm">a) Hóa đơn có mã CQT</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Được CQT cấp mã trước khi bán hàng. Mã gồm số giao dịch duy nhất và chuỗi mã hóa.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-blue-700 mb-1 text-sm">b) Hóa đơn không có mã CQT</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Do tổ chức bán hàng gửi cho người mua không có mã của CQT.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'regulations',
    icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
    title: "Quy định pháp luật",
    desc: "Nghị định 123, Thông tư 78...",
    content: (
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold text-slate-800 border-b pb-2">Văn bản pháp quy</h3>
        <ul className="space-y-3">
          <li className="flex gap-2 items-start">
            <FileText className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-800 text-sm">Nghị định 123/2020/NĐ-CP</p>
              <Button variant="link" className="h-auto p-0 text-red-600 gap-1 text-xs">
                <Download className="h-3 w-3" /> Tải PDF
              </Button>
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <FileText className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-800 text-sm">Thông tư 78/2021/TT-BTC</p>
              <Button variant="link" className="h-auto p-0 text-red-600 gap-1 text-xs">
                <Download className="h-3 w-3" /> Tải PDF
              </Button>
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <FileText className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-800 text-sm">Quyết định 1450/QĐ-TCT</p>
              <Button variant="link" className="h-auto p-0 text-red-600 gap-1 text-xs">
                <Download className="h-3 w-3" /> Tải PDF
              </Button>
            </div>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'guide',
    icon: <FileQuestion className="h-5 w-5 text-green-500" />,
    title: "Hướng dẫn tra cứu",
    desc: "Các bước thực hiện chi tiết",
    content: (
      <div className="space-y-3 text-sm text-slate-700 pt-2">
        <p><span className="font-bold text-orange-600">B1:</span> Nhập Mã nhận HĐ và Mã kiểm tra.</p>
        <p><span className="font-bold text-orange-600">B2:</span> Nhấn <strong>Tìm hóa đơn</strong>.</p>
        <p><span className="font-bold text-orange-600">B3:</span> Tùy chọn:</p>
        <ul className="list-disc list-inside pl-2 space-y-1 text-xs bg-slate-50 p-2 rounded">
          <li>Tải về: <span className="font-medium">Download file hóa đơn</span></li>
          <li>Ký số: <span className="font-medium">Thực hiện ký hóa đơn</span></li>
        </ul>
        <p><span className="font-bold text-orange-600">Lưu ý:</span> Cần cắm USB Token để thực hiện ký số.</p>
      </div>
    )
  },
  {
    id: 'troubleshoot',
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    title: "Biên bản điều chỉnh, hủy",
    desc: "Xử lý sai sót hóa đơn",
    content: (
      <div className="space-y-4 pt-2">
        <div className="p-3 border border-orange-100 bg-orange-50/50 rounded-md">
          <h3 className="text-sm font-bold text-orange-700 mb-1">Điều chỉnh hóa đơn</h3>
          <p className="text-xs text-slate-700 mb-2">
            Khi sai sót về tiền, địa chỉ, hàng hóa... hai bên lập biên bản điều chỉnh.
          </p>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1 w-full bg-white">
            <Download className="h-3 w-3" /> Mẫu Biên bản
          </Button>
        </div>

        <div className="p-3 border border-red-100 bg-red-50/50 rounded-md">
          <h3 className="text-sm font-bold text-red-700 mb-1">Hủy/Thu hồi hóa đơn</h3>
          <p className="text-xs text-slate-700 mb-2">
            Khi hủy dịch vụ hoặc sai sót nghiêm trọng cần thay thế hóa đơn mới.
          </p>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1 w-full bg-white">
            <Download className="h-3 w-3" /> Mẫu Biên bản
          </Button>
        </div>
      </div>
    )
  }
];

export const InfoPanel: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string | null>('definition');

  const toggleTopic = (id: string) => {
    setActiveTopicId(current => current === id ? null : id);
  };

  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          Thông tin cần biết
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {TOPICS.map((topic) => {
          const isOpen = activeTopicId === topic.id;
          return (
            <div 
              key={topic.id} 
              className={`rounded-lg transition-all duration-300 border ${isOpen ? 'bg-white border-primary/20 shadow-sm' : 'border-transparent hover:bg-white hover:border-slate-100'}`}
            >
              <button 
                onClick={() => toggleTopic(topic.id)}
                className="flex items-start text-left gap-4 p-3 w-full"
              >
                <div className={`mt-0.5 p-2 rounded-full shadow-sm ring-1 transition-colors ${isOpen ? 'bg-primary/5 ring-primary/20' : 'bg-white ring-slate-100'}`}>
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium transition-colors ${isOpen ? 'text-primary' : 'text-slate-900'}`}>
                    {topic.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {topic.desc}
                  </p>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-300 transition-transform duration-300 self-center ${isOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-3 pb-4 pt-0 border-t border-dashed border-slate-100 mt-1 mx-3">
                    {topic.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};