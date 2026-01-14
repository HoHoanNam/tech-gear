import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User, Search, Menu } from 'lucide-react'; // Icon từ thư viện lucide-react (có sẵn trong shadcn)

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 1. LOGO & MOBILE MENU */}
        <div className="flex items-center gap-4">
          {/* Nút Menu Mobile (Ẩn trên màn hình lớn) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
              TechGear
            </span>
          </Link>
        </div>

        {/* 2. NAVIGATION (Menu chính - Hiện trên Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Trang chủ
          </Link>
          <Link href="/shop" className="transition-colors hover:text-primary">
            Sản phẩm
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            Về chúng tôi
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-primary"
          >
            Liên hệ
          </Link>
        </nav>

        {/* 3. ACTIONS (Search, Cart, User) */}
        <div className="flex items-center gap-2">
          {/* Nút Search (Icon only trên mobile) */}
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {/* Nút Giỏ hàng */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {/* Badge số lượng (Demo số 0) */}
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>

          {/* Nút User / Đăng nhập */}
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
