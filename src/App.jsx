import React, { useMemo, useState } from "react";
import { Leaf, ShoppingBag, Plus, Minus, X, ArrowRight, Sparkles, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";

const products = [
  ["SKU001","แชมพูสมุนไพร ลดผมขาดหลุดร่วง","Herbal Anti-Hair Fall Shampoo",259,"ขายดี","ดูแลเส้นผมและหนังศีรษะอย่างอ่อนโยน"],
  ["SKU002","แชมพูอัญชัน บำรุงเส้นผม","Butterfly Pea Nourishing Shampoo",229,"สูตรธรรมชาติ","ทำความสะอาดและบำรุงเส้นผม ให้ผมนุ่มลื่น"],
  ["SKU003","แชมพูมะกรูด สูตรสดชื่น","Kaffir Lime Refresh Shampoo",239,"สดชื่น","กลิ่นหอมสดชื่น เหมาะกับการดูแลประจำวัน"],
  ["SKU004","แชมพูว่านหางจระเข้","Aloe Vera Gentle Shampoo",249,"อ่อนโยน","สูตรอ่อนโยนสำหรับการทำความสะอาดเส้นผม"],
  ["SKU005","แชมพูขิง บำรุงหนังศีรษะ","Ginger Scalp Care Shampoo",269,"ดูแลหนังศีรษะ","ทำความสะอาดเส้นผมพร้อมดูแลหนังศีรษะ"],
  ["SKU006","แชมพูมะพร้าว เพิ่มความนุ่ม","Coconut Softness Shampoo",229,"ผมนุ่ม","ช่วยให้เส้นผมสัมผัสนุ่มลื่น"],
  ["SKU007","แชมพูชาเขียว ดีท็อกซ์","Green Tea Detox Shampoo",259,"ยอดนิยม","ทำความสะอาดเส้นผมและมอบความรู้สึกสดชื่น"],
  ["SKU008","แชมพูดอกอัญชัน สูตรเข้มข้น","Butterfly Pea Rich Shampoo",279,"เข้มข้น","สูตรเข้มข้นสำหรับการดูแลเส้นผมเป็นพิเศษ"],
  ["SKU009","แชมพูลาเวนเดอร์ ผ่อนคลาย","Lavender Calm Shampoo",269,"ผ่อนคลาย","กลิ่นลาเวนเดอร์หอมละมุนในทุกครั้งที่สระ"],
  ["SKU010","แชมพูโรสแมรี่ บำรุงผม","Rosemary Hair Care Shampoo",289,"พรีเมียม","ดูแลเส้นผมด้วยกลิ่นสมุนไพรโรสแมรี่"],
  ["SKU011","แชมพูข้าวหอมมะลิ","Jasmine Rice Shampoo",239,"สูตรธรรมชาติ","ทำความสะอาดอย่างอ่อนโยน พร้อมกลิ่นหอมละมุน"],
  ["SKU012","แชมพูสูตรอ่อนโยน สำหรับทุกวัน","Daily Gentle Shampoo",219,"ใช้ได้ทุกวัน","สูตรเรียบง่ายสำหรับการดูแลเส้นผมในทุกวัน"]
].map(([sku,name,subtitle,price,tag,description])=>({sku,name,subtitle,price,tag,description,size:"300 ml",image:`/images/${sku.toLowerCase()}.svg`}));

const money = n => new Intl.NumberFormat("th-TH",{style:"currency",currency:"THB",maximumFractionDigits:0}).format(n);
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

export default function App(){
 const [cart,setCart]=useState({});
 const [open,setOpen]=useState(false);
 const [checkout,setCheckout]=useState(false);
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const [orderDone,setOrderDone]=useState("");
 const [form,setForm]=useState({customerName:"",phone:"",address:"",subdistrict:"",district:"",province:"",postcode:"",note:""});
 const items=useMemo(()=>products.filter(p=>cart[p.sku]).map(p=>({...p,qty:cart[p.sku]})),[cart]);
 const qty=items.reduce((s,p)=>s+p.qty,0), total=items.reduce((s,p)=>s+p.price*p.qty,0);
 const shipping=total>=599?0:40, grandTotal=total+shipping;
 const change=(sku,d)=>setCart(old=>{const n={...old,[sku]:Math.max(0,(old[sku]||0)+d)};if(!n[sku])delete n[sku];return n});
 const updateField=e=>setForm(old=>({...old,[e.target.name]:e.target.value}));
 async function submitOrder(e){
  e.preventDefault(); setNotice("");
  if(!SCRIPT_URL){setNotice("ยังไม่ได้ตั้งค่า Google Apps Script URL กรุณาตั้งค่า VITE_GOOGLE_SCRIPT_URL ใน Vercel ก่อนรับคำสั่งซื้อ");return;}
  setBusy(true);
  const payload={customer:form,items:items.map(p=>({sku:p.sku,name:p.name,unitPrice:p.price,quantity:p.qty,lineTotal:p.price*p.qty})),subtotal:total,shipping,total:grandTotal,source:"Nature Hair Store"};
  try{
   await fetch(SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});
   const orderNo="NH"+Date.now().toString().slice(-8);
   setOrderDone(orderNo);setCart({});setCheckout(false);setOpen(false);
   setForm({customerName:"",phone:"",address:"",subdistrict:"",district:"",province:"",postcode:"",note:""});
  }catch(err){setNotice("ส่งคำสั่งซื้อไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่");}
  finally{setBusy(false);}
 }
 return <div className="app"><div className="announcement">ส่งฟรีเมื่อสั่งซื้อครบ 599 บาท · ดูแลเส้นผมด้วยพลังจากธรรมชาติ</div>
 <header className="nav wrap"><a className="brand" href="#"><span className="brand-mark"><Leaf/></span><span>NATURE<span className="brand-light">HAIR</span><small>BOTANICAL HAIR CARE</small></span></a><nav><a href="#products">สินค้า</a><a href="#story">เรื่องราวของเรา</a><a href="#benefits">จุดเด่น</a></nav><button className="cart-button" onClick={()=>setOpen(true)}><ShoppingBag size={19}/> ตะกร้า <b>{qty}</b></button></header>
 <main><section className="hero wrap"><div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> NATURAL CARE, EVERY DAY</div><h1>คืนความมั่นใจ<br/>ให้เส้นผม <em>ด้วยธรรมชาติ</em></h1><p>เริ่มต้นการดูแลเส้นผมอย่างอ่อนโยน ด้วยแชมพูสมุนไพรที่ใส่ใจทุกขั้นตอน ให้ทุกวันเป็นวันผมสวยของคุณ</p><a className="primary-link" href="#products">เลือกชมสินค้า <ArrowRight size={17}/></a><div className="hero-proof"><span><Leaf size={16}/> ดูแลอย่างอ่อนโยน</span><span><ShieldCheck size={16}/> ใส่ใจทุกเส้นผม</span></div></div><div className="hero-art"><div className="hero-image"></div><div className="round-stamp">NATURAL<br/>HAIR CARE<br/><span>✳</span></div><div className="hero-note">ธรรมชาติ<br/><b>ในทุกหยด</b></div></div></section>
 <section className="benefits wrap" id="benefits"><div><Leaf/><b>ส่วนผสมจากธรรมชาติ</b><span>ใส่ใจการดูแลในทุกวัน</span></div><div><Sparkles/><b>ทำความสะอาดอย่างอ่อนโยน</b><span>เหมาะสำหรับการใช้เป็นประจำ</span></div><div><Truck/><b>จัดส่งถึงบ้าน</b><span>เลือกสินค้าและจัดรายการได้สะดวก</span></div></section>
 <section className="products-section" id="products"><div className="wrap"><div className="section-heading"><div><div className="eyebrow">OUR COLLECTION</div><h2>เลือกสูตรที่ใช่สำหรับคุณ</h2><p>12 สูตรดูแลเส้นผม เลือกได้ตามความต้องการ</p></div><span className="product-count">12 PRODUCTS</span></div><div className="product-grid">{products.map(p=><article className="product-card" key={p.sku}><div className="product-photo"><img src={p.image} alt={p.name}/><span className="product-tag">{p.tag}</span><span className="sku">{p.sku}</span></div><div className="product-info"><div className="product-subtitle">{p.subtitle}</div><h3>{p.name}</h3><p>{p.description}</p><div className="product-bottom"><div><strong>{money(p.price)}</strong><small>{p.size}</small></div><button className="add-button" onClick={()=>change(p.sku,1)}><Plus size={17}/> เพิ่มลงตะกร้า</button></div></div></article>)}</div></div></section>
 <section className="story wrap" id="story"><div className="story-image"></div><div><div className="eyebrow">A LITTLE CARE, A BIG DIFFERENCE</div><h2>เพราะเส้นผม<br/><em>คือความมั่นใจของคุณ</em></h2><p>Nature Hair เชื่อว่าการดูแลตัวเองเริ่มต้นจากสิ่งเล็ก ๆ เราจึงคัดสรรแนวคิดการดูแลเส้นผมด้วยส่วนผสมจากธรรมชาติ ให้คุณมีช่วงเวลาดี ๆ กับการดูแลตัวเองในทุกวัน</p><a href="#products" className="text-link">ค้นพบผลิตภัณฑ์ <ArrowRight size={16}/></a></div></section></main>
 <footer><div className="wrap footer-inner"><a className="brand" href="#"><span className="brand-mark"><Leaf/></span><span>NATURE<span className="brand-light">HAIR</span><small>BOTANICAL HAIR CARE</small></span></a><span>© 2026 NATURE HAIR · SAMPLE STORE PROJECT</span></div></footer>
 {open&&<div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}><aside className="drawer"><div className="drawer-head"><h2>{checkout?"ข้อมูลจัดส่งสินค้า":`ตะกร้าสินค้า (${qty})`}</h2><button className="icon-button" onClick={()=>{setOpen(false);setCheckout(false)}}><X/></button></div>
 {!checkout?(!items.length?<div className="empty-cart"><ShoppingBag size={35}/><b>ยังไม่มีสินค้าในตะกร้า</b><span>เลือกสินค้าที่คุณสนใจได้เลย</span><button className="primary-button" onClick={()=>setOpen(false)}>เลือกซื้อสินค้า</button></div>:<><div className="cart-list">{items.map(p=><div className="cart-item" key={p.sku}><img src={p.image} alt=""/><div className="cart-detail"><b>{p.name}</b><small>{p.sku} · {money(p.price)}</small><div className="quantity"><button onClick={()=>change(p.sku,-1)}><Minus size={14}/></button><span>{p.qty}</span><button onClick={()=>change(p.sku,1)}><Plus size={14}/></button></div></div><strong>{money(p.price*p.qty)}</strong></div>)}</div><div className="cart-total"><span>ค่าสินค้า</span><b>{money(total)}</b></div><div className="cart-total"><span>ค่าจัดส่ง</span><b>{shipping===0?"ฟรี":money(shipping)}</b></div><div className="cart-total"><span>ยอดชำระรวม</span><b>{money(grandTotal)}</b></div><p className="shipping-hint">{shipping===0?"คุณได้รับสิทธิ์จัดส่งฟรี":`ซื้ออีก ${money(599-total)} เพื่อรับสิทธิ์จัดส่งฟรี (ค่าจัดส่งปกติ 40 บาท)`}</p><button className="primary-button full" onClick={()=>setCheckout(true)}>กรอกข้อมูลจัดส่ง <ArrowRight size={17}/></button></>):(
 <form className="checkout-form" onSubmit={submitOrder}>
 <label>ชื่อ-นามสกุล *<input required name="customerName" value={form.customerName} onChange={updateField}/></label>
 <label>เบอร์โทรศัพท์ *<input required name="phone" inputMode="tel" pattern="[0-9+ -]{9,15}" value={form.phone} onChange={updateField}/></label>
 <label>ที่อยู่ เลขที่ / หมู่บ้าน / ถนน *<textarea required name="address" rows="2" value={form.address} onChange={updateField}/></label>
 <div className="form-grid"><label>แขวง/ตำบล *<input required name="subdistrict" value={form.subdistrict} onChange={updateField}/></label><label>เขต/อำเภอ *<input required name="district" value={form.district} onChange={updateField}/></label><label>จังหวัด *<input required name="province" value={form.province} onChange={updateField}/></label><label>รหัสไปรษณีย์ *<input required name="postcode" inputMode="numeric" pattern="[0-9]{5}" value={form.postcode} onChange={updateField}/></label></div>
 <label>หมายเหตุถึงร้าน (ถ้ามี)<textarea name="note" rows="2" value={form.note} onChange={updateField}/></label>
 <div className="checkout-summary"><span>สินค้า {qty} ชิ้น · รวมค่าจัดส่ง {shipping===0?"ฟรี":money(shipping)}</span><b>{money(grandTotal)}</b></div>
 {notice&&<p className="form-error">{notice}</p>}
 <button className="primary-button full" disabled={busy}>{busy?"กำลังส่งคำสั่งซื้อ…":"ยืนยันคำสั่งซื้อ"}</button>
 <button type="button" className="back-button" onClick={()=>setCheckout(false)}>ย้อนกลับไปแก้ไขตะกร้า</button>
 <small className="privacy-note">ข้อมูลจะถูกส่งไปบันทึกใน Google Sheets ของร้านค้า</small>
 </form>)}
 </aside></div>}
 {orderDone&&<div className="success-toast"><CheckCircle2/><span>รับคำสั่งซื้อแล้ว เลขที่อ้างอิง {orderDone}</span><button onClick={()=>setOrderDone("")}>ปิด</button></div>}
 <button className="mobile-cart" onClick={()=>setOpen(true)}><ShoppingBag size={18}/> ตะกร้า ({qty}) · {money(total)}</button></div>;
}
