// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Đang reset và tạo dữ liệu mẫu mới...');

  // 1. Xóa dữ liệu cũ
  try {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  } catch (error) {
    console.log(
      '⚠️ Không thể xóa dữ liệu cũ (có thể do chưa có bảng), tiếp tục...'
    );
  }

  // 2. Tạo Category
  const catLaptop = await prisma.category.create({
    data: { name: 'Laptop', slug: 'laptop' },
  });
  const catPhone = await prisma.category.create({
    data: { name: 'Điện thoại', slug: 'dien-thoai' },
  });
  const catTablet = await prisma.category.create({
    data: { name: 'Máy tính bảng', slug: 'may-tinh-bang' },
  });

  // 3. Tạo Product với ẢNH CHUẨN (Đã test hoạt động)
  await prisma.product.createMany({
    data: [
      {
        name: 'MacBook Pro 14 M3',
        slug: 'macbook-pro-14-m3',
        description:
          'Chip Apple M3 mạnh mẽ, màn hình Liquid Retina XDR tuyệt đẹp. Thời lượng pin lên đến 22 giờ.',
        price: 39990000,
        originalPrice: 45000000,
        inventory: 10,
        // Ảnh Macbook Pro (ID: 1517336714731-489689fd1ca4)
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=1000',
        ],
        categoryId: catLaptop.id,
        isFeatured: true,
      },
      {
        name: 'Dell XPS 13',
        slug: 'dell-xps-13',
        description:
          'Thiết kế nhôm nguyên khối, mỏng nhẹ, màn hình InfinityEdge.',
        price: 42500000,
        inventory: 5,
        // Ảnh Laptop Dell (ID: 1593642632823-8f78536788c6)
        images: [
          'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=1000',
        ],
        categoryId: catLaptop.id,
        isFeatured: true,
      },
      {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description:
          'Vỏ Titan, nút Action Button, chip A17 Pro chơi game đỉnh cao.',
        price: 28990000,
        originalPrice: 31000000,
        inventory: 20,
        // Ảnh iPhone (ID: 1696446701796-da61225697cc) - ĐÃ ĐỔI LINK MỚI
        images: [
          'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=1000',
        ],
        categoryId: catPhone.id,
        isFeatured: true,
      },
      {
        name: 'Samsung S24 Ultra',
        slug: 'samsung-s24-ultra',
        description: 'Camera 200MP, khung titan, Galaxy AI quyền năng.',
        price: 31000000,
        inventory: 15,
        // Ảnh Samsung (ID: 1610945415295-d9bbf067e59c)
        images: [
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000',
        ],
        categoryId: catPhone.id,
        isFeatured: false,
      },
      {
        name: 'iPad Pro',
        slug: 'ipad-pro',
        description: 'Sức mạnh M2, màn hình Mini-LED 120Hz mượt mà.',
        price: 23990000,
        inventory: 8,
        // Ảnh iPad (ID: 1544244015-0df4b3ffc6b0)
        images: [
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000',
        ],
        categoryId: catTablet.id,
        isFeatured: true,
      },
    ],
  });

  console.log('✅ Đã cập nhật ảnh mới thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
