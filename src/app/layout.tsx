import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import 2 component vừa tạo
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TechGear - Sàn thương mại điện tử công nghệ',
  description: 'Mua sắm thiết bị công nghệ chính hãng',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* Flex-col và min-h-screen giúp Footer luôn nằm dưới cùng dù nội dung ngắn */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
