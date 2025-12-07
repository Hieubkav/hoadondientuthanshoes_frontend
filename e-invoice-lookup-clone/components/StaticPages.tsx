import React from 'react';
import { FileText, File } from 'lucide-react';

export const WhatIsEInvoice: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-sm p-10 min-h-[500px]">
      <h2 className="text-[24px] text-[#ff9600] font-bold mb-6">
        Hóa đơn điện tử là gì?
      </h2>
      <div className="text-[#333] text-[14px] leading-6 space-y-4 text-justify">
        <p>
          <span className="font-bold text-[#e67e22]">Hóa đơn điện tử</span> là <strong>hóa đơn có mã</strong> hoặc <strong>không mã của cơ quan thuế</strong> được thể hiện ở dạng dữ liệu điện tử do tổ chức, cá nhân bán hàng hóa, cung cấp dịch vụ lập bằng phương tiện điện tử để ghi nhận thông tin bán hàng hóa, cung cấp dịch vụ theo quy định của pháp luật về kế toán, pháp luật về thuế, bao gồm cả trường hợp <strong>hóa đơn được khởi tạo từ máy tính tiền có kết nối chuyển dữ liệu điện tử với cơ quan thuế</strong> trong đó:
        </p>
        <p>
          a) <strong>Hóa đơn điện tử có mã của cơ quan thuế</strong> là hóa đơn điện tử được cơ quan thuế cấp mã trước khi tổ chức, cá nhân bán hàng hóa, cung cấp dịch vụ cho người mua.
        </p>
        <p>
          Mã của cơ quan thuế trên hóa đơn điện tử bao gồm số giao dịch là một dãy số duy nhất do hệ thống của cơ quan thuế tạo ra và một chuỗi ký tự được cơ quan thuế mã hóa dựa trên thông tin của người bán lập trên hóa đơn.
        </p>
        <p>
          b) <strong>Hóa đơn điện tử không có mã của cơ quan thuế</strong> là hóa đơn điện tử do tổ chức bán hàng hóa, cung cấp dịch vụ gửi cho người mua không có mã của cơ quan thuế.
        </p>
      </div>
    </div>
  );
};

export const LegalRegulations: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-sm p-10 min-h-[500px]">
      <h2 className="text-[24px] text-[#ff9600] font-bold mb-6">
        Thông tư, Quyết định về hóa đơn điện tử
      </h2>
      <div className="space-y-6">
        <div>
            <p className="text-[#333] text-[14px] italic font-medium mb-2">- Nghị định 123 quy định về hoá đơn, chứng từ</p>
            <a href="#" className="flex items-center gap-2 text-[#ff9600] hover:underline">
                <FileText className="w-8 h-8 text-red-600" />
                <span className="text-sm">Tải định dạng <span className="font-bold">File PDF</span></span>
            </a>
        </div>

        <div>
            <p className="text-[#333] text-[14px] italic font-medium mb-2">- Thông tư 78 hướng dẫn thực hiện một số điều của Luật Quản Lý thuế ngày 13 tháng 6 năm 2019, Nghị định số 123/2020/NĐ-CP ngày 19 tháng 10 năm 2020 của Chính phủ quy định về hoá đơn, chứng từ</p>
            <a href="#" className="flex items-center gap-2 text-[#ff9600] hover:underline">
                <FileText className="w-8 h-8 text-red-600" />
                <span className="text-sm">Tải định dạng <span className="font-bold">File PDF</span></span>
            </a>
        </div>

        <div>
            <p className="text-[#333] text-[14px] italic font-medium mb-2">- Quyết định 1450 ban hành Quy định về thành phần chứa dữ liệu nghiệp vụ hoá đơn điện tử và phương thức truyền nhận với cơ quan thuế</p>
            <a href="#" className="flex items-center gap-2 text-[#ff9600] hover:underline">
                <FileText className="w-8 h-8 text-red-600" />
                <span className="text-sm">Tải định dạng <span className="font-bold">File PDF</span></span>
            </a>
        </div>

        <div>
             <p className="text-[#333] text-[14px] italic font-medium mb-2">- Quyết định 1510 sửa đổi, bổ sung quyết định số 1450/QĐ-TCT ngày 7 tháng 10 năm 2021 của tổng cục trưởng tổng cục thuế ban hành quy định về thành phần chứa dữ liệu nghiệp vụ hoá đơn điện tử và phương thức truyền nhận với cơ quan thuế</p>
            <a href="#" className="flex items-center gap-2 text-[#ff9600] hover:underline">
                <File className="w-8 h-8 text-blue-600" />
                <span className="text-sm">Tải định dạng <span className="font-bold">File Word</span></span>
            </a>
        </div>
      </div>
    </div>
  );
};

export const LookupGuide: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-sm p-10 min-h-[500px]">
      <h2 className="text-[24px] text-[#ff9600] font-bold mb-6">
        Hướng dẫn tra cứu hóa đơn trên website
      </h2>
      <div className="text-[#333] text-[14px] leading-7 space-y-3">
        <p><strong>Bước 1:</strong> Truy cập vào website tra cứu hóa đơn.</p>
        <p><strong>Bước 2:</strong> Nhập thông tin của hóa đơn cần tra cứu vào các ô tương ứng như:</p>
        <ul className="list-none pl-5">
            <li>- Mã nhận HĐ (*)</li>
            <li>- Số hóa đơn, Tên đơn vị, Tên Chi nhánh, Mẫu số ký hiệu,... (Nếu có)</li>
        </ul>
        <p>Nhập Mã kiểm tra và nhấn vào nút Tìm hoá đơn để tra cứu hóa đơn với thông tin đã nhập</p>
        <p><strong>Bước 3:</strong> Sau khi Hóa đơn hiển thị trên màn hình, bạn có thể tùy chọn:</p>
        <ul className="list-disc pl-10">
            <li>Tải hóa đơn về lưu trữ bằng cách nhấn vào nút <span className="text-[#ff9600] font-bold">Download file hóa đơn</span></li>
            <li>Ký điện tử vào hóa đơn bằng cách nhấn vào nút <span className="text-[#ff9600] font-bold">Thực hiện ký hóa đơn</span></li>
        </ul>
        <p><strong>Bước 4:</strong> Nếu bên mua chọn <span className="text-[#ff9600] font-bold">Thực hiện ký hóa đơn</span>, bạn cần cắm chữ ký số bạn sẽ dùng để ký vào máy tính. Trường hợp trình duyệt của bạn chưa cài đặt Java để chạy chữ ký số, bạn vui lòng thực hiện tải về và cài đặt Java theo như hướng dẫn đính kèm.</p>
        <p><strong>Bước 5:</strong> Trình duyệt sẽ tìm kiếm và hiển thị tất cả những chữ ký số đang kết nối đến máy tính của bạn. Bạn chọn chữ ký số dùng để ký hóa đơn và nhấn nút <span className="text-[#ff9600] font-bold">Chọn</span>.</p>
        <p><strong>Bước 6:</strong> Sau khi chọn xong chữ ký số và thực hiện ký xong, website sẽ báo về kết quả <span className="text-[#ff9600] font-bold">Ký thành công</span>.</p>
        <p><strong>Bước 7:</strong> Bạn có thể tải về file hóa đơn có đầy đủ chữ ký của hai bên bằng cách nhấn vào <span className="text-[#ff9600] font-bold">Download file hóa đơn</span>.</p>
      </div>
    </div>
  );
};

export const AdjustmentMinutes: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-sm p-10 min-h-[500px]">
      {/* Section 1 */}
      <div className="mb-8">
        <h2 className="text-[24px] text-[#ff9600] font-bold mb-4">
          Biên bản điều chỉnh hóa đơn
        </h2>
        <p className="text-[#333] text-[14px] leading-6 mb-4 text-justify">
          Trong quá trình sử dụng hóa đơn điện tử có thể phát sinh các sai sót về mã số thuế, số tiền, địa chỉ hoặc hàng hóa dịch vụ và khách hàng có nhu cầu muốn chỉnh sửa thông tin trên hóa đơn lại cho chính xác. Lúc này bên bán và bên mua sẽ cùng thống nhất lập Biên bản điều chỉnh hóa đơn có chữ ký và đóng dấu của hai bên (hoặc thực hiện ký số điện tử), mỗi bên giữ một bản để xuất trình khi cơ quan thuế kiểm tra.
        </p>
        <a href="#" className="flex items-center gap-2 text-[#555] italic hover:text-blue-600">
             <File className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-bold">Mẫu Biên bản điều chỉnh hóa đơn</span>
        </a>
      </div>

      {/* Section 2 */}
      <div>
        <h2 className="text-[24px] text-[#ff9600] font-bold mb-4">
          Biên bản hủy, thu hồi hóa đơn
        </h2>
        <p className="text-[#333] text-[14px] leading-6 mb-4 text-justify">
          Trong trường hợp bên bán đã lập và giao hóa đơn nhưng khách hàng muốn muốn hủy bỏ dịch vụ, hàng hóa đã mua hoặc hóa đơn điện tử được lập lúc đầu bị sai thông tin khách hàng và khách hàng có nhu cầu muốn hủy bỏ hóa đơn ban đầu và lập hóa đơn mới thay thế cho hóa đơn cũ. Lúc này bên bán và bên mua sẽ cùng thống nhất lập Biên bản hủy/thu hồi hóa đơn có chữ ký và đóng dấu của hai bên( hoặc thực hiện ký số điện tử), mỗi bên giữ một bản để xuất trình khi cơ quan thuế kiểm tra. Hóa đơn đã lập sẽ được thu hồi và hủy bỏ, không còn giá trị pháp lý.
        </p>
        <a href="#" className="flex items-center gap-2 text-[#555] italic hover:text-blue-600">
             <File className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-bold">Mẫu Biên bản hủy hóa đơn</span>
        </a>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-sm p-10 min-h-[500px]">
        <div className="space-y-4 text-[#333] text-[14px] leading-6">
            <p className="text-justify">
                Nhằm nâng cao chất lượng dịch vụ, giảm bớt thời gian in ấn hóa đơn, tuân thủ theo các quy định của Thông tư 153/2010/TT-BTC hướng dẫn thực hiện nghị định 51/2010/NĐ-CP về hóa đơn tự in, hóa đơn điện tử, được Tổng cục thuế kiểm tra đạt tiêu chuẩn sử dụng, chúng tôi tiến hành áp dụng phần mềm hóa đơn điện tử, mọi vướng mắc xin liên hệ:
            </p>
            
            <div className="mt-6">
                <h3 className="font-bold uppercase text-[14px]">CÔNG TY PHÁT TRIỂN CÔNG NGHỆ THÁI SƠN</h3>
                <p><span className="font-bold">Trụ sở chính:</span> Số 11, Đặng Thùy Trâm, Hoàng Quốc Việt, Cầu Giấy, Hà Nội.</p>
                <p>Điện thoại: 024.37545222 &nbsp;&nbsp;&nbsp; Fax: 024.37545223</p>
            </div>

             <div className="mt-4">
                <h3 className="font-bold text-[14px]">Chi nhánh TP.HCM:</h3>
                <p>33A - Cửu Long- F.2-Tân Bình, TP.HCM.</p>
                <p>Điện thoại: 028.35470355. FAX: 028.35470356</p>
            </div>

            <div className="mt-4">
                <h3 className="font-bold text-[14px]">Chi nhánh Bình Dương:</h3>
                <p>B4-08 Cao ốc BICONSI ,Yersin ,Thủ Dầu Một, Bình Dương.</p>
                <p>Điện thoại : 0274.3848886, Fax: 0274.3848882</p>
            </div>
            
             <div className="mt-4">
                <h3 className="font-bold text-[14px]">Chi nhánh Đồng Nai:</h3>
                <p>93/75 Đồng Khởi, Khu phố 8 , Tân Phong, TP.Biên Hoà, Đồng Nai.</p>
                <p>Điện thoại : 0251.8871868, Fax: 0251.8871866</p>
            </div>

             <div className="mt-4">
                <h3 className="font-bold text-[14px]">Chi nhánh Đà Nẵng:</h3>
                <p>36 - Đào Duy Từ, Thanh Khê, TP.ĐÀ NẴNG .</p>
                <p>Điện thoại : 0236.3868363, Fax: 0236.3868364</p>
            </div>
        </div>
    </div>
  );
};
