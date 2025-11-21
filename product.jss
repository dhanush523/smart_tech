const products = [
  // {id:1, name:"HP Laptop 15s", price:45000, category:"laptop", img:"laptops/HP Laptop 15s.jpg", desc:"HP 15-inch Laptop with Intel i3 11th Gen, 8GB RAM, 512GB SSD"},
  // {id:2, name:"Dell Inspiron", price:52000, category:"laptop", img:"laptops/Dell Inspiron.jpg", desc:"Dell Inspiron 15 Laptop with Intel i5 12th Gen, 8GB RAM, 512GB SSD "},
  // {id:3, name:"Lenovo V15", price:48000, category:"laptop", img:"laptops/Lenovo V15.JPG", desc:"Lenovo V15 Laptop with Intel i3 12th Gen, 8GB RAM, 512GB SSD"},
  // {id:4, name:"Acer Aspire 7", price:60000, category:"laptop", img:"laptops/Acer Aspire 7.jpg", desc:"Acer Aspire 7 with Ryzen 5 CPU, GTX 1650 GPU, 8GB RAM, 512GB SSD"},
  {id:5, 
    name:"Keyboard & Mouse Combo", 
    price:800, 
    category:"accessory", 
    img:"accessories/keyboard and mouse.jpg", 
    desc:"Wireless keyboard and mouse combo – Comfortable typing and smooth navigation."},
  
  {id:6, 
    name:"Web Camera", 
    price:2500, 
    category:"accessory", 
    img:"accessories/web camera.jpg", 
    desc:"Full HD webcam – Clear video quality for meetings, streaming, and online classes."},
  
  {id:7, 
    name:"Speaker", 
    price:2500, 
    category:"accessory", 
    img:"accessories/speaker.jpg", 
    desc:"Portable speaker with deep bass – Ideal for music, movies, and presentations."},
  
  {id:8,
     name:"Laptop Stand", 
     price:2500, 
     category:"accessory", 
     img:"accessories/laptop stand.jpg", 
     desc:"Ergonomic aluminum laptop stand – Improve posture and cooling while working."},
  
  {id:9, 
    name:"RAM Memory",
     price:3500, 
     category:"component", 
     img:"components/ram memory.jpg", 
     desc:"8GB DDR4 RAM – Enhance your PC’s multitasking and performance."},
  
  {id:10, 
    name:"Motherboard", 
    price:6500, 
    category:"component", 
    img:"components/motherboard.jpg",
    desc:"Intel/AMD compatible motherboard – Stable and reliable base for your PC build."},
  
  {id:11, 
    name:"Hard Disk", 
    price:2500, category:"component", 
    img:"components/hard disk.jpg", 
    desc:"1TB HDD – High-capacity storage for your files, documents, and media."},
  
  {id:12,
   name:"Cooling Fan", 
   price:450, 
   category:"component", 
   img:"components/system fan.jpg", 
   desc:"120mm cooling fan – Keep your system cool and prevent overheating."},
  {id:13, 
   name:"Wi-Fi Router", 
   price:1800, category:"network", 
   img:"networking/wifi router.jpg", 
   desc:"1200Mbps Dual Band Wi-Fi router – Fast and stable internet connectivity."},
  
  {id:14, 
    name:"LAN Cable 10m", 
    price:300, category:"network",
     img:"networking/lan cable 10m.jpg", 
     desc:"Cat6 LAN cable, 10 meters – Reliable wired network connection for home or office."},
  
  {id:15, 
    name:"USB WiFi Adapter",
    price:550, category:"network", 
    img:"networking/usb wifi adapter.jpg",
    desc:"300Mbps USB Wi-Fi adapter – Connect any PC to wireless networks easily."},

{id:16, 
  name:"Network Switch",
   price:1300, 
   category:"network", 
   img:"networking/network switch.jpg", 
   desc:"8-port network switch – Expand your wired network for multiple devices."},

{id:17, 
 name:"Toner Cartridge", 
 price:450, 
 category:"printer", 
 img:"printer/Toner Cartridge.jpg", 
 desc:"High-quality 12A/88A/78A compatible toner cartridge – Clear and sharp printing for office and home use."
},

{id:18, 
 name:"Printer Ink Bottles", 
 price:350, 
 category:"printer", 
 img:"printer/Printer Ink Bottles.jpg", 
 desc:"Original CMYK ink bottles – Compatible with HP, Epson and Canon ink tank printers for vibrant prints."
},

{id:19, 
 name:"Laminating Machine", 
 price:1800, 
 category:"printer", 
 img:"printer/Laminating Machine.jpg", 
 desc:"A4 hot lamination machine – Perfect for photos, ID cards, certificates and office documents."
},

{id:20, 
 name:"Lamination Pouches", 
 price:250, 
 category:"printer", 
 img:"printer/Lamination Pouches.jpg", 
 desc:"High-quality lamination sheets – A4 & ID card pouches for smooth, clear lamination."
},


];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredCategory = 'all';

function displayProducts(){
  const list = document.getElementById('productList');
  list.innerHTML = '';
  const filtered = filteredCategory === 'all' ? products : products.filter(p => p.category === filteredCategory);

  filtered.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.img}" alt="">
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function filterCategory(cat, event){
  filteredCategory = cat;
  document.querySelectorAll('.categories button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  displayProducts();
}

function addToCart(id){
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if(existing) existing.qty++;
  else cart.push({...product, qty:1});
  updateCart();
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) removeItem(id);
  else updateCart();
}

function removeItem(id){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  const ok = confirm(`Remove "${item.name}" from cart?`);
  if(ok){
    cart = cart.filter(i => i.id !== id);
    updateCart();
  }
}

function updateCart(){
  localStorage.setItem('cart', JSON.stringify(cart));

  document.getElementById('cartCountBadge').innerText =
    cart.reduce((s, i) => s + i.qty, 0);

  const list = document.getElementById('cartList');
  list.innerHTML = '';

  if(cart.length === 0){
    list.innerHTML = '<p style="text-align:center;color:#666;">Cart is empty</p>';
    document.getElementById('cartTotal').innerText = 'Total: ₹0';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}">
      <div class="info">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
    `;
    list.appendChild(div);
  });

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  document.getElementById('cartTotal').innerText = 'Total: ₹' + total;
}

function toggleCartPanel(){ document.getElementById('cartPanel').classList.toggle('open'); }
function closeCartPanel(){ document.getElementById('cartPanel').classList.remove('open'); }

function openCheckout(){
  if(cart.length === 0){ alert('Cart is empty'); return; }
  document.getElementById('checkoutPopup').style.display = 'flex';
}

function closeCheckout(){
  document.getElementById('checkoutPopup').style.display = 'none';
}

/* ---------------------------
   FINAL WHATSAPP ORDER SYSTEM
-----------------------------*/
function submitOrder(){
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if(name === '' || phone.length !== 10 || address === ''){
    alert("Enter valid Name, Phone and Address");
    return;
  }

  let msg = `Customer Name: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nOrder Items:\n`;

  cart.forEach((i, idx) => {
    const shortName = i.name.substring(0, 25);
    msg += `${idx+1}. ${shortName} x${i.qty} = ₹${i.price * i.qty}\n`;
  });

  const total = cart.reduce((s,i) => s + i.qty*i.price, 0);

  msg += `\n------------------\nTotal Amount: ₹${total}\n------------------\n`;
  msg += `\nOnline Payment Only – No Cash on Delivery\nDelivery in 3–4 Days\n`;

  const url = "https://api.whatsapp.com/send?phone=919360362776&text=";
  const encoded = encodeURIComponent(msg);

  window.open(url + encoded, "_blank");

  cart = [];
  localStorage.removeItem('cart');
  updateCart();
  closeCheckout();
  closeCartPanel();
}

displayProducts();
updateCart();