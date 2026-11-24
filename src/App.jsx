import React, { useMemo, useState } from "react";
import { Leaf, ShoppingBag, Plus, Minus, X, ArrowRight, Sparkles, Truck, ShieldCheck } from "lucide-react";
const products = [
  {
    "sku": "SKU001",
    "name": "แชมพูสมุนไพร ลดผมขาดหลุดร่วง",
    "subtitle": "Herbal Anti-Hair Fall Shampoo",
    "price": 259,
    "size": "300 ml",
    "tag": "ขายดี",
    "description": "ดูแลเส้นผมและหนังศีรษะอย่างอ่อนโยน",
    "image": "/images/sku001.svg"
  },
  {
    "sku": "SKU002",
    "name": "แชมพูอัญชัน บำรุงเส้นผม",
    "subtitle": "Butterfly Pea Nourishing Shampoo",
    "price": 229,
    "size": "300 ml",
    "tag": "สูตรธรรมชาติ",
    "description": "ทำความสะอาดและบำรุงเส้นผม ให้ผมนุ่มลื่น",
    "image": "/images/sku002.svg"
  },
  {
    "sku": "SKU003",
    "name": "แชมพูมะกรูด สูตรสดชื่น",
    "subtitle": "Kaffir Lime Refresh Shampoo",
    "price": 239,
    "size": "300 ml",
    "tag": "สดชื่น",
    "description": "กลิ่นหอมสดชื่น เหมาะกับการดูแลประจำวัน",
    "image": "/images/sku003.svg"
  },
  {
    "sku": "SKU004",
    "name": "แชมพูว่านหางจระเข้",
    "subtitle": "Aloe Vera Gentle Shampoo",
    "price": 249,
    "size": "300 ml",
    "tag": "อ่อนโยน",
    "description": "สูตรอ่อนโยนสำหรับการทำความสะอาดเส้นผม",
    "image": "/images/sku004.svg"
  },
  {
    "sku": "SKU005",
    "name": "แชมพูขิง บำรุงหนังศีรษะ",
    "subtitle": "Ginger Scalp Care Shampoo",
    "price": 269,
    "size": "300 ml",
    "tag": "ดูแลหนังศีรษะ",
    "description": "ทำความสะอาดเส้นผมพร้อมดูแลหนังศีรษะ",
    "image": "/images/sku005.svg"
  },
  {
    "sku": "SKU006",
    "name": "แชมพูมะพร้าว เพิ่มความนุ่ม",
    "subtitle": "Coconut Softness Shampoo",
    "price": 229,
    "size": "300 ml",
    "tag": "ผมนุ่ม",
    "description": "ช่วยให้เส้นผมสัมผัสนุ่มลื่น",
    "image": "/images/sku006.svg"
  },
  {
    "sku": "SKU007",
    "name": "แชมพูชาเขียว ดีท็อกซ์",
    "subtitle": "Green Tea Detox Shampoo",
    "price": 259,
    "size": "300 ml",
    "tag": "ยอดนิยม",
    "description": "ทำความสะอาดเส้นผมและมอบความรู้สึกสดชื่น",
    "image": "/images/sku007.svg"
  },
  {
    "sku": "SKU008",
    "name": "แชมพูดอกอัญชัน สูตรเข้มข้น",
    "subtitle": "Butterfly Pea Rich Shampoo",
    "price": 279,
    "size": "300 ml",
    "tag": "เข้มข้น",
    "description": "สูตรเข้มข้นสำหรับการดูแลเส้นผมเป็นพิเศษ",
    "image": "/images/sku008.svg"
  },
  {
    "sku": "SKU009",
    "name": "แชมพูลาเวนเดอร์ ผ่อนคลาย",
    "subtitle": "Lavender Calm Shampoo",
    "price": 269,
    "size": "300 ml",
    "tag": "ผ่อนคลาย",
    "description": "กลิ่นลาเวนเดอร์หอมละมุนในทุกครั้งที่สระ",
    "image": "/images/sku009.svg"
  },
  {
    "sku": "SKU010",
    "name": "แชมพูโรสแมรี่ บำรุงผม",
    "subtitle": "Rosemary Hair Care Shampoo",
    "price": 289,
    "size": "300 ml",
    "tag": "พรีเมียม",
    "description": "ดูแลเส้นผมด้วยกลิ่นสมุนไพรโรสแมรี่",
    "image": "/images/sku010.svg"
  },
  {
    "sku": "SKU011",
    "name": "แชมพูข้าวหอมมะลิ",
    "subtitle": "Jasmine Rice Shampoo",
    "price": 239,
    "size": "300 ml",
    "tag": "สูตรธรรมชาติ",
    "description": "ทำความสะอาดอย่างอ่อนโยน พร้อมกลิ่นหอมละมุน",
    "image": "/images/sku011.svg"
  },
  {
    "sku": "SKU012",
    "name": "แชมพูสูตรอ่อนโยน สำหรับทุกวัน",
    "subtitle": "Daily Gentle Shampoo",
    "price": 219,
    "size": "300 ml",
    "tag": "ใช้ได้ทุกวัน",
    "description": "สูตรเรียบง่ายสำหรับการดูแลเส้นผมในทุกวัน",
    "image": "/images/sku012.svg"
  }
];
const money = n => new Intl.NumberFormat("th-TH",{style:"currency",currency:"THB",maximumFractionDigits:0}).format(n);
export default function App(){
 const [cart,setCart]=useState({}); const [open,setOpen]=useState(false);
 const items=useMemo(()=>products.filter(p=>cart[p.sku]).map(p=>({...p,qty:cart[p.sku]})),[cart]);
 const qty=items.reduce((s,p)=>s+p.qty,0), total=items.reduce((s,p)=>s+p.price*p.qty,0);
 const change=(sku,d)=>setCart(old=>{const n={...old,[sku]:Math.max(0,(old[sku]||0)+d)};if(!n[sku])delete n[sku];return n});
 return <div className="app"><div className="announcement">ส่งฟรีเมื่อสั่งซื้อครบ 599 บาท · ดูแลเส้นผมด้วยพลังจากธรรมชาติ</div>
 <header className="nav wrap"><a className="brand" href="#"><span className="brand-mark"><Leaf/></span><span>NATURE<span className="brand-light">HAIR</span><small>BOTANICAL HAIR CARE</small></span></a><nav><a href="#products">สินค้า</a><a href="#story">เรื่องราวของเรา</a><a href="#benefits">จุดเด่น</a></nav><button className="cart-button" onClick={()=>setOpen(true)}><ShoppingBag size={19}/> ตะกร้า <b>{qty}</b></button></header>
 <main><section className="hero wrap"><div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> NATURAL CARE, EVERY DAY</div><h1>คืนความมั่นใจ<br/>ให้เส้นผม <em>ด้วยธรรมชาติ</em></h1><p>เริ่มต้นการดูแลเส้นผมอย่างอ่อนโยน ด้วยแชมพูสมุนไพรที่ใส่ใจทุกขั้นตอน ให้ทุกวันเป็นวันผมสวยของคุณ</p><a className="primary-link" href="#products">เลือกชมสินค้า <ArrowRight size={17}/></a><div className="hero-proof"><span><Leaf size={16}/> ดูแลอย่างอ่อนโยน</span><span><ShieldCheck size={16}/> ใส่ใจทุกเส้นผม</span></div></div><div className="hero-art"><div className="hero-image"></div><div className="round-stamp">NATURAL<br/>HAIR CARE<br/><span>✳</span></div><div className="hero-note">ธรรมชาติ<br/><b>ในทุกหยด</b></div></div></section>
 <section className="benefits wrap" id="benefits"><div><Leaf/><b>ส่วนผสมจากธรรมชาติ</b><span>ใส่ใจการดูแลในทุกวัน</span></div><div><Sparkles/><b>ทำความสะอาดอย่างอ่อนโยน</b><span>เหมาะสำหรับการใช้เป็นประจำ</span></div><div><Truck/><b>จัดส่งถึงบ้าน</b><span>เลือกสินค้าและจัดรายการได้สะดวก</span></div></section>
 <section className="products-section" id="products"><div className="wrap"><div className="section-heading"><div><div className="eyebrow">OUR COLLECTION</div><h2>เลือกสูตรที่ใช่สำหรับคุณ</h2><p>12 สูตรดูแลเส้นผม เลือกได้ตามความต้องการ</p></div><span className="product-count">12 PRODUCTS</span></div><div className="product-grid">{products.map(p=><article className="product-card" key={p.sku}><div className="product-photo"><img src={p.image} alt={p.name}/><span className="product-tag">{p.tag}</span><span className="sku">{p.sku}</span></div><div className="product-info"><div className="product-subtitle">{p.subtitle}</div><h3>{p.name}</h3><p>{p.description}</p><div className="product-bottom"><div><strong>{money(p.price)}</strong><small>{p.size}</small></div><button className="add-button" onClick={()=>change(p.sku,1)}><Plus size={17}/> เพิ่มลงตะกร้า</button></div></div></article>)}</div></div></section>
 <section className="story wrap" id="story"><div className="story-image"></div><div><div className="eyebrow">A LITTLE CARE, A BIG DIFFERENCE</div><h2>เพราะเส้นผม<br/><em>คือความมั่นใจของคุณ</em></h2><p>Nature Hair เชื่อว่าการดูแลตัวเองเริ่มต้นจากสิ่งเล็ก ๆ เราจึงคัดสรรแนวคิดการดูแลเส้นผมด้วยส่วนผสมจากธรรมชาติ ให้คุณมีช่วงเวลาดี ๆ กับการดูแลตัวเองในทุกวัน</p><a href="#products" className="text-link">ค้นพบผลิตภัณฑ์ <ArrowRight size={16}/></a></div></section></main>
 <footer><div className="wrap footer-inner"><a className="brand" href="#"><span className="brand-mark"><Leaf/></span><span>NATURE<span className="brand-light">HAIR</span><small>BOTANICAL HAIR CARE</small></span></a><span>© 2026 NATURE HAIR · SAMPLE STORE PROJECT</span></div></footer>
 {open&&<div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}><aside className="drawer"><div className="drawer-head"><h2>ตะกร้าสินค้า ({qty})</h2><button className="icon-button" onClick={()=>setOpen(false)}><X/></button></div>{!items.length?<div className="empty-cart"><ShoppingBag size={35}/><b>ยังไม่มีสินค้าในตะกร้า</b><span>เลือกสินค้าที่คุณสนใจได้เลย</span><button className="primary-button" onClick={()=>setOpen(false)}>เลือกซื้อสินค้า</button></div>:<><div className="cart-list">{items.map(p=><div className="cart-item" key={p.sku}><img src={p.image} alt=""/><div className="cart-detail"><b>{p.name}</b><small>{p.sku} · {money(p.price)}</small><div className="quantity"><button onClick={()=>change(p.sku,-1)}><Minus size={14}/></button><span>{p.qty}</span><button onClick={()=>change(p.sku,1)}><Plus size={14}/></button></div></div><strong>{money(p.price*p.qty)}</strong></div>)}</div><div className="cart-total"><span>ยอดรวม</span><b>{money(total)}</b></div><p className="shipping-hint">{total>=599?"คุณได้รับสิทธิ์จัดส่งฟรี":`ซื้ออีก ${money(599-total)} เพื่อรับสิทธิ์จัดส่งฟรี`}</p><button className="primary-button full" onClick={()=>alert("นี่คือหน้าร้านตัวอย่าง ยังไม่ได้เชื่อมระบบชำระเงินหรือบันทึกคำสั่งซื้อ")}>ดำเนินการสั่งซื้อ <ArrowRight size={17}/></button></>}</aside></div>}
 <button className="mobile-cart" onClick={()=>setOpen(true)}><ShoppingBag size={18}/> ตะกร้า ({qty}) · {money(total)}</button></div>;
}