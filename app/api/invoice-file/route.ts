import { NextRequest } from 'next/server';

/**
 * Proxy tải file hóa đơn về cùng origin (tránh CORS và khác port).
 * Query: ?image=<encoded image url>
 */
export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('image');

  if (!imageUrl) {
    return new Response(JSON.stringify({ message: 'Thiếu tham số image' }), { status: 400 });
  }

  // Chỉ cho phép http/https
  if (!/^https?:\/\//i.test(imageUrl)) {
    return new Response(JSON.stringify({ message: 'URL không hợp lệ' }), { status: 400 });
  }

  // Ép hostname về 127.0.0.1 nếu người dùng gửi localhost để tránh Node fetch dùng ::1
  let proxiedUrl = imageUrl;
  try {
    const parsed = new URL(imageUrl);
    if (parsed.hostname === 'localhost') {
      parsed.hostname = '127.0.0.1';
      proxiedUrl = parsed.toString();
    }
  } catch {
    return new Response(JSON.stringify({ message: 'URL không hợp lệ' }), { status: 400 });
  }

  try {
    const upstream = await fetch(proxiedUrl, {
      // Không gửi credentials; ảnh đang public
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return new Response(JSON.stringify({ message: 'Không lấy được file' }), { status: 502 });
    }

    // Lấy content-type từ upstream, mặc định image/png
    const contentType = upstream.headers.get('content-type') || 'image/png';

    // Đặt tên file từ query hoặc fallback
    const urlObj = new URL(imageUrl);
    const fileName =
      urlObj.pathname.split('/').pop() || `hoa-don-${Date.now()}.png`;

    const arrayBuffer = await upstream.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Lỗi tải file' }), { status: 500 });
  }
}
