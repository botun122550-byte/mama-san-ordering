export const metadata = {
  title: 'มาม่าซัง - ระบบสั่งอาหาร',
  description: 'ระบบสั่งอาหารร้านบุฟเฟต์',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body style={{ fontFamily: 'sans-serif', margin: 0 }}>{children}</body>
    </html>
  );
}
