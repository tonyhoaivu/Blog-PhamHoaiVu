
import React from 'react';
import { Page } from '../types';

interface StaticPagesProps {
  type: Page;
}

const StaticPages: React.FC<StaticPagesProps> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-primary-600 p-12 text-center text-white">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            {type === Page.ABOUT ? 'Giới thiệu về tôi' : 'Liên hệ với tôi'}
          </h1>
          <p className="text-primary-100 font-medium">PHẠM HOÀI VŨ BLOG - CHIA SẺ VÀ KẾT NỐI</p>
        </div>
        
        <div className="p-10 md:p-16 space-y-8">
          {type === Page.ABOUT ? (
            <div className="prose dark:prose-invert max-w-none text-lg">
              <p className="font-bold text-xl text-primary-600">Chào bạn, tôi là Phạm Hoài Vũ.</p>
              <p>Blog này được xây dựng với mục tiêu chia sẻ những kiến thức, bộ cài Windows tối ưu nhất, các bản USB Boot cứu hộ máy tính chuyên nghiệp và những phần mềm hữu ích mà tôi đã sưu tầm và kiểm tra kỹ lưỡng.</p>
              <h3>Sứ mệnh của Blog</h3>
              <p>Giúp người dùng tiếp cận với công nghệ một cách đơn giản, an toàn và hiệu quả nhất. Tất cả các file được chia sẻ trên blog đều được tôi trực tiếp kiểm tra mã Checksum (MD5/SHA1) và quét virus trước khi đăng tải.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: 'Bài viết', val: '500+' },
                  { label: 'Lượt xem', val: '1.2M' },
                  { label: 'Năm kn', val: '5+' },
                  { label: 'Cộng đồng', val: '10K+' }
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-black text-primary-600">{s.val}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight">Thông tin liên hệ</h2>
                <p className="text-gray-500">Mọi thắc mắc về lỗi link tải, góp ý bài viết hoặc hợp tác quảng cáo, vui lòng liên hệ với tôi qua các kênh sau:</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                     <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                     </div>
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                       <p className="font-bold dark:text-white">phamhoaivu@gmail.com</p>
                     </div>
                  </div>
                   <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                     <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                       </svg>
                     </div>
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase">Facebook</p>
                       <p className="font-bold dark:text-white">fb.com/phamhoaivu.prc</p>
                     </div>
                  </div>
                </div>
              </div>
              <div>
                 <form className="space-y-4">
                    <input type="text" placeholder="Họ và tên" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    <input type="email" placeholder="Địa chỉ Email" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    <textarea placeholder="Nội dung tin nhắn..." rows={5} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"></textarea>
                    <button className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary-500/20">Gửi thông tin</button>
                 </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticPages;
