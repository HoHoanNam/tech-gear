import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Định nghĩa các route công khai (không cần đăng nhập)
const isPublicRoute = createRouteMatcher([
  '/',
  '/shop(.*)',
  '/products(.*)',
  '/api/webhooks(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

// Thêm từ khóa 'async' và dùng 'await auth()'
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // Dùng await để chờ auth() trả về object, sau đó mới gọi .protect()
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
