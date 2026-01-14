import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/server/actions/product.actions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Check, Truck, ShieldCheck } from 'lucide-react';

// 1. Cập nhật kiểu dữ liệu: params là Promise
interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 2. Fix trong hàm generateMetadata
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // BẮT BUỘC: Phải await params trước khi dùng
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Sản phẩm không tồn tại' };

  return {
    title: `${product.name} | TechGear`,
    description: product.description,
  };
}

// 3. Fix trong component chính
export default async function ProductPage({ params }: ProductPageProps) {
  // BẮT BUỘC: Phải await params trước khi dùng
  const { slug } = await params;

  // Lấy dữ liệu sản phẩm
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* CỘT TRÁI: ẢNH SẢN PHẨM */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Không có ảnh
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              {product.category.name}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(Number(product.price))}
            </span>
            {product.originalPrice &&
              Number(product.originalPrice) > Number(product.price) && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(Number(product.originalPrice))}
                </span>
              )}
          </div>

          <div className="border-t border-b py-4 space-y-2">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" /> Tình trạng:{' '}
              {product.inventory > 0 ? 'Còn hàng' : 'Hết hàng'}
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Bảo hành chính
              hãng 12 tháng
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Miễn phí vận chuyển
              toàn quốc
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              size="lg"
              className="flex-1 text-lg h-12 gap-2"
              disabled={product.inventory === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.inventory > 0 ? 'Thêm vào giỏ ngay' : 'Tạm hết hàng'}
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-12">
              Mua trả góp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
