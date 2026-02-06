
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
    labels: ['BOOT USB', 'Thủ thuật'],
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
    labels: ['Win 11'],
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
    id: 'driver-hp-m15w-laserjet',
    title: 'Driver Máy In HP LaserJet M15w - Bản cài đặt ổn định nhất',
    slug: 'driver-hp-m15w-laserjet',
    summary: 'Bộ Driver đầy đủ tính năng cho máy in HP M15w. Hỗ trợ in không dây, tương thích hoàn toàn với Windows 10 và 11.',
    content: `
      <h2>Driver HP LaserJet M15w</h2>
      <p>Cung cấp bộ cài đặt đầy đủ từ HP, giúp máy tính nhận diện máy in nhanh chóng qua cổng USB hoặc WiFi.</p>
    `,
    author: 'Phạm Hoài Vũ',
    date: '2024-11-20',
    labels: ['Máy In', 'Driver PC'],
    thumbnail: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop',
    popular: false,
    views: 4500,
    downloads: [
      {
        version: 'Full Software v46.4',
        size: '150 MB',
        md5: 'HP-DRIVER-MD5',
        freeLink: 'https://support.hp.com',
        proLink: 'https://phamhoaivu.com/donate'
      }
    ]
  },
  {
    id: 'pubg-mobile-config-2024',
    title: 'Config PUBG Mobile 120FPS - Mượt mà cho máy cấu hình yếu',
    slug: 'pubg-mobile-config-2024',
    summary: 'Chia sẻ bộ cài đặt tối ưu cho PUBG Mobile, giúp mở khóa 120FPS và giảm giật lag hiệu quả.',
    content: `
      <h2>Tối ưu PUBG Mobile 120FPS</h2>
      <p>Bản config mới nhất hỗ trợ các dòng máy Android tầm trung có thể trải nghiệm mượt mà không nóng máy.</p>
    `,
    author: 'Phạm Hoài Vũ',
    date: '2024-11-10',
    labels: ['Mobile Game', 'Thủ thuật'],
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    popular: false,
    views: 3200,
    downloads: [
      {
        version: 'Config v3.0',
        size: '5 MB',
        md5: 'PUBG-CONFIG-MD5',
        freeLink: 'https://mediafire.com/example',
        proLink: 'https://phamhoaivu.com/donate'
      }
    ]
  }
];
