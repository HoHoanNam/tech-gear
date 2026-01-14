import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@prisma/client';
import { toast } from 'sonner';

// Định nghĩa kiểu dữ liệu cho 1 món hàng trong giỏ
export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        // Nếu sản phẩm đã có trong giỏ -> Thông báo
        if (existingItem) {
          return toast.info('Sản phẩm này đã có trong giỏ hàng.');
        }

        // Nếu chưa có -> Thêm mới với quantity = 1
        set({ items: [...get().items, { ...data, quantity: 1 }] });
        toast.success('Đã thêm sản phẩm vào giỏ!');
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.error('Đã xóa sản phẩm khỏi giỏ.');
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // Tên key lưu trong LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
