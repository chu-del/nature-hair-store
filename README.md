# Nature Hair Store

เว็บไซต์ตัวอย่างร้านแชมพู Nature Hair สร้างด้วย React + Vite มีสินค้า 12 SKUs และรูปสินค้า SVG แยกไว้ใน `public/images/`.

## เริ่มต้นใช้งาน
```bash
npm install
npm run dev
```

## เชื่อม Google Sheets สำหรับคำสั่งซื้อ

1. สร้าง Google Sheet ใหม่
2. ไปที่ **Extensions → Apps Script**
3. คัดลอกโค้ดจากไฟล์ `google-apps-script/Code.gs` ไปวางใน Apps Script แล้วบันทึก
4. เลือก **Deploy → New deployment → Web app**
5. ตั้งค่า **Execute as: Me** และ **Who has access: Anyone** แล้ว Deploy
6. อนุญาตสิทธิ์ให้ Apps Script เข้าถึง Google Sheets และคัดลอก Web app URL ที่ลงท้ายด้วย `/exec`
7. ใน Vercel ไปที่ Project → Settings → Environment Variables เพิ่ม:
   - Name: `VITE_GOOGLE_SCRIPT_URL`
   - Value: URL จาก Apps Script
   - เลือก Production (และ Preview หากต้องการ)
8. กด Redeploy เพื่อให้ค่า Environment Variable มีผล

ระบบจะสร้างชีต `Orders` และ `OrderItems` อัตโนมัติเมื่อมีคำสั่งซื้อแรก:
- Orders: ข้อมูลผู้รับ ที่อยู่ เบอร์โทร ยอดสินค้า ค่าจัดส่ง ยอดรวม และสถานะ
- OrderItems: รายการสินค้า SKU ราคา จำนวน และยอดต่อรายการ โดยเชื่อมด้วย Order ID

**หมายเหตุ:** เวอร์ชันนี้เป็นตัวอย่างสำหรับงาน/การทดลอง ยังไม่มีระบบชำระเงินออนไลน์ และการส่งคำสั่งซื้อจากหน้าเว็บใช้โหมด no-cors จึงไม่สามารถอ่านผลตอบกลับจาก Apps Script ในเบราว์เซอร์ได้ ควรตรวจสอบแถวข้อมูลใน Google Sheets หลังทดสอบคำสั่งซื้อก่อนเปิดรับออเดอร์จริง การตั้งค่า Anyone หมายถึงผู้ที่มี URL สามารถเรียก endpoint ได้ จึงควรเพิ่มมาตรการป้องกันสแปมก่อนใช้งานเชิงพาณิชย์

## Deploy Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `./`

นำ Repository นี้เข้า Vercel ผ่าน **Add New → Project → Import Git Repository** แล้ว Deploy.
