import { prisma } from '@/lib/prisma';

export const getLatestProducts = async () => {
  const products = await prisma.product.findMany({
    take: 8, // Lấy 8 sản phẩm mới nhất
    orderBy: { createdAt: 'desc' },
    include: { category: true }, // Lấy kèm thông tin danh mục
  });

  return products;
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  return product;
};
