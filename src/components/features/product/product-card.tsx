'use client'; // <--- Bắt buộc có để dùng onClick

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { Product, Category } from '@prisma/client';
import { useCart } from '@/hooks/use-cart'; // <--- Import hook
import { MouseEventHandler } from 'react';

// Định nghĩa kiểu dữ liệu cho props
interface ProductCardProps {
  product: Product & { category: Category };
}

export default function ProductCard({ product }: ProductCardProps) {
  const cart = useCart(); // <--- Gọi hook

  // Hàm xử lý khi bấm nút Thêm
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault(); // Chặn việc click nhầm vào Link sản phẩm bên ngoài
    event.stopPropagation();

    cart.addItem(product);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          )}
          {product.inventory === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold uppercase tracking-wider">
                Hết hàng
              </span>
            </div>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-red-500">Hot</Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4 flex-1">
        <div className="text-sm text-muted-foreground mb-1">
          {product.category.name}
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg leading-tight mb-2 hover:text-primary line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(Number(product.price))}
          </span>
          {product.originalPrice &&
            Number(product.originalPrice) > Number(product.price) && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(Number(product.originalPrice))}
              </span>
            )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          className="w-full gap-2"
          disabled={product.inventory === 0}
          onClick={onAddToCart} // <--- Gắn sự kiện click
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inventory > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
        </Button>
      </CardFooter>
    </Card>
  );
}
