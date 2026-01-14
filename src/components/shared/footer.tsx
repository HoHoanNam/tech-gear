export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TechGear</h3>
            <p className="text-sm text-gray-500">
              Chuyên cung cấp các thiết bị công nghệ chính hãng, uy tín hàng
              đầu.
            </p>
          </div>
          {/* Các cột link demo */}
          <div>
            <h4 className="font-medium mb-4">Mua hàng</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Thiết bị di động</li>
              <li>Laptop & PC</li>
              <li>Phụ kiện</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Chính sách bảo hành</li>
              <li>Tra cứu đơn hàng</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Email: support@techgear.vn</li>
              <li>Hotline: 1900 1234</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TechGear. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
