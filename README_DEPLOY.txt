
HƯỚNG DẪN DEPLOY BLOG PHẠM HOÀI VŨ

1. ĐỐI VỚI VERCEL (KHUYÊN DÙNG):
   - Bước 1: Upload toàn bộ code này lên GitHub.
   - Bước 2: Truy cập Vercel.com, kết nối GitHub và chọn Repository này.
   - Bước 3: Vercel sẽ tự động nhận diện Vite và deploy. Bạn không cần làm gì thêm.

2. ĐỐI VỚI PROFREEHOST (HOẶC HOSTING CPANEL):
   - Bước 1: Mở CMD/Terminal tại thư mục này.
   - Bước 2: Chạy lệnh `npm install` (chỉ làm lần đầu).
   - Bước 3: Chạy lệnh `npm run build`.
   - Bước 4: Tìm thư mục tên là 'dist' vừa được tạo ra.
   - Bước 5: Mở File Manager trên ProFreeHost, vào thư mục 'htdocs'.
   - Bước 6: Upload TOÀN BỘ file/thư mục bên trong 'dist' vào 'htdocs'.
   - Lưu ý: Đảm bảo file .htaccess cũng được upload để tránh lỗi 404.

3. TÀI KHOẢN ADMIN MẶC ĐỊNH:
   - User: admin
   - Pass: 0927099940@Phv
