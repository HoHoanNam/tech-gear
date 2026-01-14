'use client'; // <--- Bắt buộc có vì dùng hooks

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Search, Menu } from 'lucide-react';
// Import các component của Clerk
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useCart } from '@/hooks/use-cart'; // <--- Import hook
import { useEffect, useState } from 'react';

export default function Header() {
  const cart = useCart();
  const [mounted, setMounted] = useState(false);

  // Fix lỗi Hydration (Next.js server khác client)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO & MOBILE MENU */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
              TechGear
            </span>
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Trang chủ
          </Link>
          <Link href="/shop" className="transition-colors hover:text-primary">
            Sản phẩm
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {/* Chỉ hiển thị Badge khi đã mounted để tránh lỗi hydration */}
              {mounted && cart.items.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Button>
          </Link>

          {/* Logic hiển thị nút User */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Đăng nhập
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
