import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getLatestProducts } from '@/server/actions/product.actions';
import ProductCard from '@/components/features/product/product-card';

export default async function Home() {
  // 1. Gọi data trực tiếp từ Server Action
  const products = await getLatestProducts();

  return (
    <div className="pb-10">
      {/* HERO SECTION */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Công nghệ đỉnh cao <br />{' '}
            <span className="text-primary">Trong tầm tay bạn</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Săn deal công nghệ giá tốt nhất thị trường. Laptop, Điện thoại,
            Tablet chính hãng bảo hành dài hạn.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8">
              Mua ngay
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Xem ưu đãi
            </Button>
          </div>
        </div>
      </section>

      {/* PRODUCT LIST SECTION */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Sản phẩm mới nhất
          </h2>
          <Link
            href="/shop"
            className="hidden md:flex items-center text-primary hover:underline"
          >
            Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Grid hiển thị sản phẩm */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Chưa có sản phẩm nào. Hãy chạy Seed Data!
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/shop">
            <Button variant="outline">Xem tất cả sản phẩm</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
