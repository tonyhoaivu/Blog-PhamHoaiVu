
import { Post } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'anhdv-boot-2024-premium',
    title: 'Anhdv Boot 2024 v24.1 Premium - Bộ công cụ cứu hộ máy tính số 1',
    slug: 'anhdv-boot-2024-premium',
    summary: 'Phiên bản Premium đầy đủ tính năng nhất của Anhdv Boot. Hỗ trợ WinPE cực nhanh, tích hợp sẵn các phần mềm cứu hộ mới nhất 2024.',
    content: `
      <h2>Giới thiệu Anhdv Boot 2024 Premium</h2>
      <p>Anhdv Boot là bộ công cụ cứu hộ máy tính chuyên nghiệp được Phạm Hoài Vũ tin dùng và chia sẻ. Bản 2024 v24.1 mang đến khả năng tương thích tuyệt vời với các dòng CPU Intel Gen 14 và AMD mới nhất.</p>
      <h3>Các tính năng đặc quyền bản Premium</h3>
      <ul>
        <li>Tích hợp Win11PE, Win10PE, Win8PE và cả Mini XP cho máy đời cổ.</li>
        <li>Hỗ trợ nhận diện ổ cứng NVMe Gen 4, Gen 5 tốt nhất.</li>
        <li>Bổ sung thêm bộ công cụ giải mã dữ liệu bị virus mã hóa.</li>
        <li>Giao diện hiện đại, dễ sử dụng, tốc độ boot cực nhanh.</li>
      </ul>
      <h2>Hướng dẫn tạo USB Boot</h2>
      <p>Các bạn tải file về, sử dụng công cụ 1 click đi kèm trong bộ cài để tạo USB. Lưu ý sao lưu dữ liệu USB trước khi thực hiện.</p>
    `,
    author: 'Phạm Hoài Vũ',
    date: '2024-11-01',
    labels: ['USB Boot', 'Premium', 'Tools'],
    thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop',
    popular: true,
    views: 15420,
    downloads: [
      {
        version: 'v24.1 Premium',
        size: '4.2 GB',
        md5: '7D8E9F10A2B3C4D5E6F7',
        sha1: 'SHA1-ANHDV-PREMIUM-2024',
        freeLink: 'https://drive.google.com/file/d/example-free',
        proLink: 'https://phamhoaivu.com/donate'
      }
    ]
  },
  {
    id: 'windows-11-ltsc-2024-iot',
    title: 'Windows 11 LTSC 2024 IoT Enterprise - Bản Windows nhẹ nhất',
    slug: 'windows-11-ltsc-2024-iot',
    summary: 'Chia sẻ bản ISO Windows 11 LTSC 2024 chính chủ từ Microsoft. Đã được lược bỏ các app rác, chạy cực mượt cho máy cấu hình yếu và chơi game.',
    content: `
      <h2>Windows 11 LTSC 2024 là gì?</h2>
      <p>Đây là phiên bản hỗ trợ dài hạn (Long Term Servicing Channel) của Microsoft dành cho các doanh nghiệp và thiết bị IoT. Đặc điểm là không có Store, không Edge (có thể cài lại), không có các ứng dụng bloatware gây nặng máy.</p>
      <h3>Tại sao nên dùng bản LTSC cho máy cá nhân?</h3>
      <p>Nếu bạn là người yêu thích sự ổn định và tối giản, LTSC là lựa chọn số 1. Nó chiếm rất ít RAM và CPU, giúp máy tính của bạn hoạt động ở hiệu suất tối đa.</p>
      <h2>Thông tin bản build</h2>
      <p>Build 26100.1742 chính thức từ MSDN. Đã tích hợp sẵn Driver cơ bản và bypass TPM 2.0.</p>
    `,
    author: 'Phạm Hoài Vũ',
    date: '2024-10-15',
    labels: ['Windows 11', 'Operating System', 'ISO'],
    thumbnail: 'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=800&auto=format&fit=crop',
    popular: true,
    views: 8940,
    downloads: [
      {
        version: 'Build 26100.1742',
        size: '4.8 GB',
        md5: 'A1B2C3D4E5F607080900',
        sha1: 'SHA1-WIN11-LTSC-2024',
        freeLink: 'https://fshare.vn/file/example',
        proLink: 'https://phamhoaivu.com/buy-key'
      }
    ]
  },
  {
    id: 'office-2021-ltsc-aio',
    title: 'Microsoft Office 2021 LTSC AIO - Cài đặt tự động 1 click',
    slug: 'office-2021-ltsc-aio',
    summary: 'Bộ cài Office 2021 đầy đủ các ứng dụng Word, Excel, PowerPoint. Tích hợp công cụ kích hoạt bản quyền tự động vĩnh viễn.',
    content: `
      <h2>Office 2021 LTSC Pro Plus</h2>
      <p>Phiên bản Office ổn định nhất hiện nay dành cho dân văn phòng. Không cần đăng nhập tài khoản Microsoft, sử dụng offline hoàn toàn thoải mái.</p>
      <h3>Bộ cài bao gồm:</h3>
      <ul>
        <li>Word 2021</li>
        <li>Excel 2021 (hỗ trợ hàm mới)</li>
        <li>PowerPoint 2021</li>
        <li>Outlook, Access, Publisher...</li>
      </ul>
      <p>Lưu ý: Tắt Windows Defender trước khi giải nén để tránh bị xóa file kích hoạt.</p>
    `,
    author: 'Phạm Hoài Vũ',
    date: '2024-09-20',
    labels: ['Office', 'Software', 'Tools'],
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    popular: false,
    views: 12050,
    downloads: [
      {
        version: 'v2021.10 Update',
        size: '3.5 GB',
        md5: 'OFFICE2021MD5CHECK',
        freeLink: 'https://mediafire.com/example',
        proLink: 'https://phamhoaivu.com/donate'
      }
    ]
  },
  {
    id: 'driver-easy-pro-2024',
    title: 'DriverEasy Pro v5.8.1 Full - Tự động cập nhật Driver',
    slug: 'driver-easy-pro-2024',
    summary: 'Phần mềm tìm và tải Driver còn thiếu cho máy tính tốt nhất hiện nay. Cơ sở dữ liệu khổng lồ với hơn 8 triệu Driver.',
    content: `
      <h2>DriverEasy Pro 5.8.1</h2>
      <p>Việc tìm kiếm Driver thủ công rất mất thời gian. Với DriverEasy Pro, bạn chỉ cần 1 click để quét và tải toàn bộ Driver cho Card màn hình, Chipset, Audio, Wifi...</p>
      <h3>Tính năng bản Pro:</h3>
      <ul>
        <li>Tốc độ tải xuống cực nhanh.</li>
        <li>Tự động tạo điểm khôi phục hệ thống trước khi cài.</li>
        <li>Gỡ bỏ Driver cũ, lỗi thời.</li>
      </ul>
    `,
    author: 'Phạm Hoài Vũ',
    date: '2024-11-05',
    labels: ['Software', 'Driver', 'Tools'],
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    popular: false,
    views: 4500,
    downloads: [
      {
        version: 'v5.8.1 Full',
        size: '15 MB',
        md5: 'DRIVER-EASY-PRO-MD5',
        freeLink: 'https://mega.nz/file/example',
        proLink: 'https://drivereasy.com/buy'
      }
    ]
  }
];
