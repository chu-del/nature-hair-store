# Nature Hair Store

ตัวอย่างเว็บไซต์ร้านแชมพู Nature Hair สร้างด้วย React + Vite พร้อมรูปสินค้า SVG แยกไว้ใน `public/images/` จำนวน 12 ภาพ

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev
```

## Build สำหรับ Vercel

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

รูปภาพเรียกใช้ผ่าน URL เช่น `/images/sku001.svg` และจะเผยแพร่พร้อมเว็บไซต์บนโดเมน Vercel โดยอัตโนมัติ

> ชื่อสินค้า ราคา และรูปภาพทั้งหมดเป็นข้อมูลตัวอย่าง ควรเปลี่ยนเป็นข้อมูลจริงก่อนใช้งานเชิงพาณิชย์

## การเผยแพร่

Import repository นี้จาก GitHub ใน Vercel แล้วกด Deploy ได้เลย (ยังไม่มีการเชื่อมระบบชำระเงินหรือบันทึกคำสั่งซื้อในเวอร์ชันนี้)
