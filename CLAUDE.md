# โปรเจกต์: ระบบสั่งอาหารร้านบุฟเฟต์ "มาม่าซัง"

## Stack
- Next.js (App Router) — **JavaScript เท่านั้น ห้ามใช้ TypeScript**
- Supabase (`@supabase/supabase-js`) ผ่าน `lib/supabaseClient.js`
- Deploy บน Vercel

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

ใช้ `.env.local` ตอน dev (ห้าม commit) และตั้งค่าเดียวกันใน Vercel > Project Settings > Environment Variables

## ⚠️ กฎสำคัญ: Dynamic Route params เป็น Promise
โปรเจกต์นี้ใช้ Next.js เวอร์ชันล่าสุด ซึ่ง `params` ของ Dynamic Route (เช่น `app/order/[sessionId]/page.js`) **เป็น Promise** ต้อง unwrap เสมอ ห้ามอ่านค่าตรง ๆ

**Client Component** (`'use client'`) — unwrap ด้วย `use()` จาก React:

```js
'use client';
import { use } from 'react';

export default function OrderPage({ params }) {
  const { sessionId } = use(params);
  // ...
}
```

**Server Component** — `use()` ใช้ไม่ได้กับ async component ให้ใช้ `await`:

```js
export default async function Page({ params }) {
  const { sessionId } = await params;
}
```

`searchParams` ก็เป็น Promise เช่นกัน ใช้วิธีเดียวกัน

## โครงสร้างฐานข้อมูล (มีอยู่แล้วใน Supabase — ไม่ต้องสร้างใหม่)
ใช้ชื่อตารางและคอลัมน์ตามนี้เท่านั้น ห้ามเดาชื่อเพิ่ม

| ตาราง | คอลัมน์ |
|---|---|
| `sessions` | `id`, `table_number`, `adult_count`, `child_count`, `status`, `created_at` |
| `menu_categories` | `id`, `name`, `sort_order` |
| `menu_items` | `id`, `category_id`, `name` |
| `orders` | `id`, `session_id`, `table_number`, `items` (jsonb), `status`, `created_at` |

ความสัมพันธ์ที่เห็นจากชื่อคอลัมน์:
- `menu_items.category_id` → `menu_categories.id`
- `orders.session_id` → `sessions.id`

## หน้าที่มีตอนนี้
- `/` หน้าแรก (ทดสอบ deploy)
- `/generate-qr` (placeholder)
- `/kitchen` (placeholder)
