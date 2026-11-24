const ORDERS_SHEET = "Orders";
const ITEMS_SHEET = "OrderItems";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    if (!data.customer || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("Invalid order payload");
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const orders = getOrCreateSheet_(ss, ORDERS_SHEET, [
      "Created At","Order ID","Customer Name","Phone","Address","Subdistrict","District","Province","Postcode","Note","Subtotal","Shipping","Total","Status"
    ]);
    const items = getOrCreateSheet_(ss, ITEMS_SHEET, [
      "Created At","Order ID","SKU","Product Name","Unit Price","Quantity","Line Total"
    ]);
    const orderId = "NH-" + Utilities.formatDate(new Date(), "Asia/Bangkok", "yyyyMMdd-HHmmss") + "-" + Math.floor(100 + Math.random() * 900);
    const c = data.customer;
    const created = new Date();
    const subtotal = Number(data.subtotal) || 0;
    const shipping = Number(data.shipping) || 0;
    const total = Number(data.total) || subtotal + shipping;
    orders.appendRow([created,orderId,c.customerName || "",c.phone || "",c.address || "",c.subdistrict || "",c.district || "",c.province || "",c.postcode || "",c.note || "",subtotal,shipping,total,"รอดำเนินการ"]);
    data.items.forEach(p => items.appendRow([created,orderId,p.sku || "",p.name || "",Number(p.unitPrice) || 0,Number(p.quantity) || 0,Number(p.lineTotal) || 0]));
    return json_({success:true,orderId:orderId});
  } catch (err) {
    return json_({success:false,error:String(err)});
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({status:"ok",message:"Nature Hair order endpoint is ready"});
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,headers.length).setFontWeight("bold").setBackground("#e7ecdf");
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
