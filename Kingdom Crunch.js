/*
  Kingdom Crunch prototype — all data persists in this browser's localStorage.
  Shared stock means hot and cold variants draw from the same quantity.
  This is a front-end demo, not a secure multi-user or production ordering backend.
*/
const initialProducts = [

    // Coffee
    {
        id: 1,
        name: "Americano",
        category: "Coffee",
        price: 100,
        stock: 12,
        shade: "drink-shade-1"
    },

    {
        id: 2,
        name: "Cafe Latte",
        category: "Coffee",
        price: 119,
        stock: 9,
        shade: "drink-shade-2"
    },

    {
        id: 3,
        name: "Cappuccino",
        category: "Coffee",
        price: 119,
        stock: 7,
        shade: "drink-shade-2"
    },

    {
        id: 4,
        name: "Caramel Latte",
        category: "Coffee",
        price: 139,
        stock: 5,
        shade: "drink-shade-3"
    },

    {
        id: 5,
        name: "Cafe Mocha",
        category: "Coffee",
        price: 139,
        stock: 4,
        shade: "drink-shade-1"
    },

    {
        id: 6,
        name: "Spanish Latte",
        category: "Coffee",
        price: 139,
        stock: 6,
        shade: "drink-shade-3"
    },

    {
        id: 7,
        name: "Biscoff Latte",
        category: "Coffee",
        price: 159,
        stock: 3,
        shade: "drink-shade-3"
    },

    {
        id: 8,
        name: "Nutella Latte",
        category: "Coffee",
        price: 139,
        stock: 8,
        shade: "drink-shade-1"
    },

    {
        id: 9,
        name: "French Vanilla",
        category: "Coffee",
        price: 139,
        stock: 2,
        shade: "drink-shade-2"
    },

    {
        id: 10,
        name: "White Chocolate",
        category: "Coffee",
        price: 139,
        stock: 0,
        shade: "drink-shade-2"
    },

    // Matcha
    {
        id: 11,
        name: "Dirty Matcha",
        category: "Matcha",
        price: 139,
        stock: 5,
        shade: "drink-shade-5"
    },

    {
        id: 12,
        name: "Strawberry Matcha",
        category: "Matcha",
        price: 129,
        stock: 4,
        shade: "drink-shade-6"
    },

    {
        id: 13,
        name: "Matcha",
        category: "Matcha",
        price: 149,
        stock: 10,
        shade: "drink-shade-5"
    },

    {
        id: 14,
        name: "Coco Matcha",
        category: "Matcha",
        price: 120,
        stock: 6,
        shade: "drink-shade-5"
    },

    // Specialty
    {
        id: 15,
        name: "Strawberry Macchiato",
        category: "Specialty",
        price: 139,
        stock: 5,
        shade: "drink-shade-6"
    },

    {
        id: 16,
        name: "Seasalt Ube",
        category: "Specialty",
        price: 119,
        stock: 7,
        shade: "drink-shade-4"
    },

    {
        id: 17,
        name: "Seasalt Latte",
        category: "Specialty",
        price: 149,
        stock: 6,
        shade: "drink-shade-2"
    },

    {
        id: 18,
        name: "Seasalt Caramel Latte",
        category: "Specialty",
        price: 159,
        stock: 4,
        shade: "drink-shade-3"
    },

    {
        id: 19,
        name: "Coffee Jelly",
        category: "Specialty",
        price: 159,
        stock: 3,
        shade: "drink-shade-1"
    },

    {
        id: 20,
        name: "Biscoff",
        category: "Specialty",
        price: 179,
        stock: 3,
        shade: "drink-shade-3"
    },

    // Milk / Fruit
    {
        id: 21,
        name: "Ube",
        category: "Milk & Fruit",
        price: 149,
        stock: 6,
        shade: "drink-shade-4"
    },

    {
        id: 22,
        name: "Milo",
        category: "Milk & Fruit",
        price: 149,
        stock: 8,
        shade: "drink-shade-1"
    },

    {
        id: 23,
        name: "Strawberries 'n Cream",
        category: "Milk & Fruit",
        price: 159,
        stock: 5,
        shade: "drink-shade-6"
    },

    {
        id: 24,
        name: "Very Mango",
        category: "Milk & Fruit",
        price: 159,
        stock: 4,
        shade: "drink-shade-7"
    },

    {
        id: 25,
        name: "Blueberry Banana",
        category: "Milk & Fruit",
        price: 149,
        stock: 5,
        shade: "drink-shade-8"
    },

    {
        id: 26,
        name: "Coco Ube",
        category: "Milk & Fruit",
        price: 120,
        stock: 6,
        shade: "drink-shade-4"
    },

    {
        id: 27,
        name: "Coco Strawberry",
        category: "Milk & Fruit",
        price: 120,
        stock: 7,
        shade: "drink-shade-6"
    },

    {
        id: 28,
        name: "Coco Blueberry",
        category: "Milk & Fruit",
        price: 120,
        stock: 4,
        shade: "drink-shade-8"
    },

    // Classic drinks
    {
        id: 29,
        name: "Wintermelon",
        category: "Classic",
        price: 88,
        stock: 10,
        shade: "drink-shade-7"
    },

    {
        id: 30,
        name: "Okinawa",
        category: "Classic",
        price: 88,
        stock: 9,
        shade: "drink-shade-3"
    },

    {
        id: 31,
        name: "Hokkaido",
        category: "Classic",
        price: 88,
        stock: 5,
        shade: "drink-shade-2"
    },

    {
        id: 32,
        name: "Tsokolate",
        category: "Classic",
        price: 120,
        stock: 1,
        shade: "drink-shade-1"
    }

];

const PRODUCT_STORAGE_KEY = "kingdomCrunchProductsV2";
const FEATURE_STORAGE_KEY = "kingdomCrunchFeaturedV2";
let products = [];
let cart = [];
let currentCategory = "All";
let featuredIds = [];
let featuredIndex = 0;
let carouselTimer = null;
let pendingImageData = "";
// ORDER MANAGEMENT: customer orders are stored in this browser for the demo.
const ORDER_STORAGE_KEY = "kingdomCrunchOrders";
let customerOrders = [];
function loadCustomerOrders() {
  // Always reload saved orders on startup so an order remains visible after the
  // checkout success screen reloads the page. Older demo orders marked
  // "picked-up" are migrated to the clearer "completed" status.
  try {
    const saved = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "[]");
    customerOrders = Array.isArray(saved) ? saved.map(order => ({
      ...order,
      status: order.status === "picked-up" ? "completed" : (["pending", "confirmed", "completed"].includes(order.status) ? order.status : "pending"),
      items: Array.isArray(order.items) ? order.items : [],
      total: Number(order.total) || 0
    })) : [];
  } catch (error) {
    console.warn("Saved customer orders could not be read.", error);
    customerOrders = [];
  }
  // Persist any one-time status migration so later loads remain consistent.
  try { localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(customerOrders)); }
  catch (error) { console.warn("Saved customer orders could not be updated.", error); }
}
function saveCustomerOrders() {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(customerOrders));
  } catch (error) {
    alert("Could not save customer orders. Browser storage may be full.");
    console.error(error);
  }
}

const shadeClasses = ["drink-shade-1","drink-shade-2","drink-shade-3","drink-shade-4","drink-shade-5","drink-shade-6","drink-shade-7","drink-shade-8"];

// DATA MIGRATION: preserve old stock edits from the earlier prototype and add hot/cold prices.
function loadProducts() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY) || "null"); } catch (error) { console.warn("Saved product data could not be read.", error); }
  if (Array.isArray(saved) && saved.length) {
    products = saved.map((p, i) => normalizeProduct(p, i));
    return;
  }
  let oldStocks = {};
  try { oldStocks = JSON.parse(localStorage.getItem("kingdomCrunchStocks") || "{}"); } catch (_) {}
  products = initialProducts.map((p, i) => normalizeProduct({
    ...p,
    stock: oldStocks[p.id] !== undefined ? Number(oldStocks[p.id]) : p.stock,
    hotPrice: Number(p.price || 0),
    coldPrice: Number(p.price || 0) + 10,
    description: "A freshly prepared " + p.name + ".",
    image: "",
    available: true
  }, i));
  saveProducts();
}
function normalizeProduct(p, i) {
  const legacyPrice = Number(p.price ?? p.hotPrice ?? 0);
  return {
    id: Number(p.id) || Date.now() + i,
    name: String(p.name || "New Drink"),
    category: String(p.category || "Specialty"),
    hotPrice: Number(p.hotPrice ?? legacyPrice),
    coldPrice: Number(p.coldPrice ?? (legacyPrice + 10)),
    stock: Math.max(0, Math.floor(Number(p.stock) || 0)),
    shade: p.shade || shadeClasses[i % shadeClasses.length],
    description: String(p.description || ""),
    image: String(p.image || ""),
    available: p.available !== false
  };
}
function saveProducts() {
  try { localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products)); }
  catch (error) { alert("Could not save the catalog. The browser's storage may be full; try using a smaller image."); console.error(error); }
  // Legacy stock key is maintained so earlier prototype behavior stays compatible.
  const stockMap = {}; products.forEach(p => stockMap[p.id] = p.stock);
  localStorage.setItem("kingdomCrunchStocks", JSON.stringify(stockMap));
}
function saveFeatured() { localStorage.setItem(FEATURE_STORAGE_KEY, JSON.stringify(featuredIds)); }
function loadFeatured() {
  try { featuredIds = JSON.parse(localStorage.getItem(FEATURE_STORAGE_KEY) || "[]"); } catch (_) { featuredIds = []; }
  featuredIds = featuredIds.filter(id => products.some(p => p.id === id));
  if (!featuredIds.length) featuredIds = products.slice(0, 3).map(p => p.id);
  saveFeatured();
}
function money(amount) { return "₱" + Number(amount || 0).toLocaleString("en-PH", {maximumFractionDigits:2}); }
function escapeHTML(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function getStatus(stock, available = true) {
  if (!available || stock <= 0) return { label: "Unavailable", className: "out" };
  if (stock <= 3) return { label: "Low Stock", className: "low" };
  return { label: "Available", className: "available" };
}
function productImageMarkup(product, extraClass = "") {
  if (product.image) return `<img class="${extraClass}" src="${product.image}" alt="${escapeHTML(product.name)}" loading="lazy">`;
  return `<div class="product-visual ${product.shade} ${extraClass}"><span class="drink-label">${escapeHTML(product.name)}</span></div>`;
}

// CATEGORY FILTERS
function renderCategories() {
  const categories = ["All", ...new Set(products.map(p => p.category))];
  document.getElementById("categoryRow").innerHTML = categories.map(category =>
    `<button class="category ${currentCategory === category ? "active" : ""}" onclick="setCategory('${escapeHTML(category).replace(/'/g,"&#39;")}')">${escapeHTML(category)}</button>`
  ).join("");
}
function setCategory(category) { currentCategory = category; renderCategories(); renderProducts(); }

// CUSTOMER MENU: each drink has a hot/cold selector; both variants use shared stock.
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const search = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const filtered = products.filter(p => (currentCategory === "All" || p.category === currentCategory) && (p.name + " " + p.category + " " + p.description).toLowerCase().includes(search));
  if (!filtered.length) { grid.innerHTML = `<div style="grid-column:1/-1;padding:50px;background:white;border-radius:20px;text-align:center;color:#7f706d;">No drinks found.</div>`; return; }
  grid.innerHTML = filtered.map(p => {
    const status = getStatus(p.stock, p.available);
    const price = Math.min(p.hotPrice, p.coldPrice);
    const image = p.image ? `<img class="product-photo" src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy">` : `<div class="product-visual ${p.shade}"><span class="drink-label">${escapeHTML(p.name)}</span></div>`;
    return `<article class="product-card">
      <div class="product-image-container">${image}<span class="status ${status.className}">${status.label}</span></div>
      <div class="product-body"><div class="product-name">${escapeHTML(p.name)}</div><div class="product-category">${escapeHTML(p.category)}</div>
      ${p.description ? `<p class="description-text">${escapeHTML(p.description)}</p>` : ""}
      <div class="variant-prices"><span>Hot ${money(p.hotPrice)}</span><span>Cold ${money(p.coldPrice)}</span></div>
      <label class="variant-label" for="variant-${p.id}">Choose temperature</label><select class="variant-select" id="variant-${p.id}" aria-label="Choose hot or cold for ${escapeHTML(p.name)}"><option value="hot">Hot — ${money(p.hotPrice)}</option><option value="cold">Cold — ${money(p.coldPrice)}</option></select>
      <div class="product-bottom"><div><div class="price">From ${money(price)}</div><div class="stock-text">${p.stock > 0 && p.available ? `${p.stock} shared stock remaining` : "Currently unavailable"}</div></div>
      <button class="add-btn" onclick="addToCart(${p.id})" ${p.stock <= 0 || !p.available ? "disabled" : ""}>${p.stock > 0 && p.available ? "Add" : "Sold Out"}</button></div></div></article>`;
  }).join("");
}

// CART: cart line identity includes the temperature variant and its selected price.
function addToCart(id) {
  const p = products.find(item => item.id === id); if (!p || p.stock <= 0 || !p.available) return;
  const variant = document.getElementById(`variant-${id}`)?.value || "cold";
  const price = variant === "hot" ? p.hotPrice : p.coldPrice;
  const key = `${id}-${variant}`;
  const item = cart.find(row => row.key === key);
  const totalForProduct = cart.filter(row => row.id === id).reduce((sum,row) => sum + row.quantity,0);
  if (totalForProduct >= p.stock) { alert("You cannot add more than the shared stock available for this drink."); return; }
  if (item) item.quantity++;
  else cart.push({ key, id, variant, price, quantity: 1 });
  updateCartCount();
}
function increaseCart(key) {
  const item = cart.find(row => row.key === key); if (!item) return;
  const p = products.find(product => product.id === item.id);
  const totalForProduct = cart.filter(row => row.id === item.id).reduce((sum,row) => sum + row.quantity,0);
  if (!p || totalForProduct >= p.stock || !p.available) { alert("Maximum shared stock reached."); return; }
  item.quantity++; renderCart(); updateCartCount();
}
function decreaseCart(key) { const item = cart.find(row => row.key === key); if (!item) return; item.quantity--; if (item.quantity <= 0) cart = cart.filter(row => row.key !== key); renderCart(); updateCartCount(); }
function updateCartCount() { document.getElementById("cartCount").textContent = cart.reduce((sum,item) => sum + item.quantity, 0); }
function getCartTotal() { return cart.reduce((sum,item) => sum + item.price * item.quantity, 0); }
function renderCart() {
  const items = document.getElementById("cartItems"), footer = document.getElementById("cartFooter");
  if (!cart.length) { items.innerHTML = `<div class="empty-cart">Your cart is empty.</div>`; footer.innerHTML = ""; return; }
  items.innerHTML = cart.map(item => { const p = products.find(product => product.id === item.id); if (!p) return ""; return `<div class="cart-item"><div><div class="cart-item-name">${escapeHTML(p.name)} <span class="cart-variant">(${item.variant === "hot" ? "Hot" : "Cold"})</span></div><div class="cart-item-price">${money(item.price)} each</div></div><div class="qty-controls"><button onclick="decreaseCart('${item.key}')">−</button><strong>${item.quantity}</strong><button onclick="increaseCart('${item.key}')">+</button></div></div>`; }).join("");
  footer.innerHTML = `<div class="cart-summary"><div class="summary-line"><span>Items</span><strong>${cart.reduce((s,i)=>s+i.quantity,0)}</strong></div><div class="summary-line total"><span>Total</span><strong>${money(getCartTotal())}</strong></div><button class="checkout-btn" onclick="openCheckout()">Proceed to Checkout</button></div>`;
}
function openCart() { renderCart(); document.getElementById("cartOverlay").style.display = "flex"; }
function closeCart() { document.getElementById("cartOverlay").style.display = "none"; }
function openCheckout() { if (!cart.length) { alert("Your cart is empty."); return; } closeCart(); document.getElementById("checkoutOverlay").style.display = "flex"; }
function closeCheckout() { document.getElementById("checkoutOverlay").style.display = "none"; }
function placeOrder(event) {
  event.preventDefault(); const customerName = document.getElementById("customerName").value.trim(); const pickupTime = document.getElementById("pickupTime").value; if (!customerName || !pickupTime) return;
  // Recheck stock at checkout before deducting shared quantities.
  for (const item of cart) { const p = products.find(product => product.id === item.id); const qty = cart.filter(row => row.id === item.id).reduce((s,row)=>s+row.quantity,0); if (!p || !p.available || p.stock < qty) { alert(`Not enough shared stock for ${p?.name || "a drink"}. Please review your cart.`); closeCheckout(); renderProducts(); return; } }
  cart.forEach(item => { const p = products.find(product => product.id === item.id); p.stock -= item.quantity; });
  saveProducts();

// Generate a short, sequential order number (KC-0001, KC-0002, etc.)
const nextNumber = Number(
    localStorage.getItem("kcNextOrderNumber") || "1"
);

const orderNumber = "KC-" + String(nextNumber).padStart(4, "0");

localStorage.setItem(
    "kcNextOrderNumber",
    String(nextNumber + 1)
);
  // Save an item snapshot so order details remain readable even if staff later edits a product.
  customerOrders.unshift({
    id: orderNumber,
    customerName,
    pickupTime,
    placedAt: new Date().toISOString(),
    status: "pending",
    items: cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return { name: product?.name || "Drink", variant: item.variant, quantity: item.quantity, price: item.price };
    }),
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  });
  saveCustomerOrders();
  const safeName = escapeHTML(customerName);
  document.getElementById("checkoutModal").innerHTML = `<div class="success-box"><div class="success-icon">✓</div><div class="order-number">${orderNumber}</div><h3>Order Confirmed!</h3><p style="margin-top:10px;">Thank you, ${safeName}. Your order will be prepared for <strong>${escapeHTML(pickupTime)}</strong>.</p><p style="margin-top:12px;">Show this order number when picking up your drinks at Kingdom Crunch.</p><button class="checkout-btn" onclick="finishOrder()">Done</button></div>`;
  cart = []; updateCartCount(); renderProducts(); renderInventory();
}
function finishOrder() { closeCheckout(); location.reload(); }

// STAFF PRODUCT CRUD: add, edit, delete, change availability and shared stock without coding.
function resetProductForm() {
  document.getElementById("productForm").reset(); document.getElementById("editProductId").value = ""; document.getElementById("productStock").value = "0";
  document.getElementById("productFormTitle").textContent = "Add a Drink"; document.getElementById("saveProductButton").textContent = "Save Drink"; document.getElementById("imagePreview").innerHTML = ""; pendingImageData = "";
}
function editProduct(id) {
  const p = products.find(item => item.id === id); if (!p) return;
  document.getElementById("editProductId").value = p.id; document.getElementById("productName").value = p.name; document.getElementById("productCategory").value = p.category;
  document.getElementById("hotPrice").value = p.hotPrice; document.getElementById("coldPrice").value = p.coldPrice; document.getElementById("productStock").value = p.stock;
  document.getElementById("productAvailability").value = String(p.available); document.getElementById("productDescription").value = p.description; document.getElementById("productFeatured").checked = featuredIds.includes(p.id);
  document.getElementById("productFormTitle").textContent = "Edit Drink: " + p.name; document.getElementById("saveProductButton").textContent = "Update Drink"; pendingImageData = "";
  document.getElementById("imagePreview").innerHTML = p.image ? `<img src="${p.image}" alt="Current ${escapeHTML(p.name)} image">` : "";
  document.getElementById("productEditorPanel").scrollIntoView({behavior:"smooth",block:"start"});
}
function readImageAsDataURL(file) {
  return new Promise((resolve,reject) => { const reader = new FileReader(); reader.onerror = reject; reader.onload = () => { const img = new Image(); img.onload = () => { const max=800, scale=Math.min(1,max/Math.max(img.width,img.height)); const canvas=document.createElement("canvas"); canvas.width=Math.max(1,Math.round(img.width*scale)); canvas.height=Math.max(1,Math.round(img.height*scale)); canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height); resolve(canvas.toDataURL("image/jpeg",0.78)); }; img.onerror=reject; img.src=reader.result; }; reader.readAsDataURL(file); });
}
document.getElementById("productImage").addEventListener("change", async event => {
  const file = event.target.files?.[0]; if (!file) { pendingImageData = ""; return; }
  if (!file.type.startsWith("image/")) { alert("Please choose an image file."); event.target.value=""; return; }
  try { pendingImageData = await readImageAsDataURL(file); document.getElementById("imagePreview").innerHTML = `<img src="${pendingImageData}" alt="Selected drink preview">`; }
  catch (error) { alert("Could not load that image. Please try another file."); console.error(error); }
});
function saveProductForm(event) {
  event.preventDefault(); const editId = Number(document.getElementById("editProductId").value);
  const name = document.getElementById("productName").value.trim(), category = document.getElementById("productCategory").value.trim();
  const hotPrice = Number(document.getElementById("hotPrice").value), coldPrice = Number(document.getElementById("coldPrice").value), stock = Number(document.getElementById("productStock").value);
  if (!name || !category || !Number.isFinite(hotPrice) || !Number.isFinite(coldPrice) || hotPrice < 0 || coldPrice < 0 || !Number.isInteger(stock) || stock < 0) { alert("Please enter valid drink details, prices, and a whole-number stock quantity."); return; }
  let p = products.find(item => item.id === editId);
  if (!p) { p = { id: Date.now(), shade: shadeClasses[products.length % shadeClasses.length], image: "" }; products.push(p); }
  Object.assign(p, { name, category, hotPrice, coldPrice, stock, description: document.getElementById("productDescription").value.trim(), available: document.getElementById("productAvailability").value === "true" });
  if (pendingImageData) p.image = pendingImageData;
  const wantFeatured = document.getElementById("productFeatured").checked;
  if (wantFeatured && !featuredIds.includes(p.id)) featuredIds.push(p.id);
  if (!wantFeatured) featuredIds = featuredIds.filter(id => id !== p.id);
  saveProducts(); saveFeatured(); resetProductForm(); renderAll(); alert("Drink saved successfully.");
}
function deleteProduct(id) {
  const p = products.find(item => item.id === id); if (!p) return;
  if (!confirm(`Remove ${p.name} from the menu? This also removes it from featured drinks and the current cart.`)) return;
  products = products.filter(item => item.id !== id); featuredIds = featuredIds.filter(featureId => featureId !== id); cart = cart.filter(item => item.id !== id);
  saveProducts(); saveFeatured(); updateCartCount(); renderAll();
}
function changeStock(id, amount) { const p = products.find(item => item.id === id); if (!p) return; p.stock = Math.max(0, p.stock + amount); saveProducts(); renderAll(); }
function setStock(id, value) { const p = products.find(item => item.id === id); if (!p) return; p.stock = Math.max(0, Math.floor(Number(value)||0)); saveProducts(); renderAll(); }
function toggleAvailability(id) { const p = products.find(item => item.id === id); if (!p) return; p.available = !p.available; saveProducts(); renderAll(); }
function renderInventory() {
  const body = document.getElementById("inventoryBody");
  body.innerHTML = products.map(p => { const status=getStatus(p.stock,p.available); return `<tr><td><div class="inventory-product">${p.image ? `<img class="product-thumb" src="${p.image}" alt="">` : `<span class="product-thumb product-thumb-placeholder"></span>`}<strong>${escapeHTML(p.name)}</strong><div class="description-text">${escapeHTML(p.description)}</div></div></td><td>${escapeHTML(p.category)}</td><td><strong>Hot ${money(p.hotPrice)}</strong><br><strong>Cold ${money(p.coldPrice)}</strong></td><td><div class="stock-edit"><button onclick="changeStock(${p.id},-1)" aria-label="Decrease stock">−</button><span class="stock-number">${p.stock}</span><button onclick="changeStock(${p.id},1)" aria-label="Increase stock">+</button></div><input class="stock-direct-input" aria-label="Set stock for ${escapeHTML(p.name)}" type="number" min="0" step="1" value="${p.stock}" onchange="setStock(${p.id},this.value)"></td><td><span class="status ${status.className}">${status.label}</span></td><td><button class="toggle-btn ${p.available ? "on":"off"}" onclick="toggleAvailability(${p.id})">${p.available ? "Available":"Unavailable"}</button></td><td><div class="product-actions"><button onclick="editProduct(${p.id})">Edit</button><button class="delete-product" onclick="deleteProduct(${p.id})">Remove</button></div></td></tr>`; }).join("");
  updateStats();
}
function updateStats() {
  document.getElementById("totalProducts").textContent = products.length;
  document.getElementById("availableProducts").textContent = products.filter(p => p.available && p.stock > 3).length;
  document.getElementById("lowStockProducts").textContent = products.filter(p => p.available && p.stock > 0 && p.stock <= 3).length;
  document.getElementById("outStockProducts").textContent = products.filter(p => !p.available || p.stock <= 0).length;
}

// FEATURED CAROUSEL: staff chooses products/order; customer view auto-advances every 5 seconds.
function renderFeaturedCarousel() {
  featuredIds = featuredIds.filter(id => products.some(p => p.id === id));
  if (!featuredIds.length) { document.getElementById("featuredContent").innerHTML = `<div class="hero-badge">KINGDOM CRUNCH • ORDER ONLINE</div><h2>Your favorite drinks,<br><span>ready when you are.</span></h2><p>Ask staff to choose featured drinks from the Staff tab.</p><div class="hero-actions"><button class="primary-btn" onclick="scrollToMenu()">Browse Menu</button><button class="secondary-btn" onclick="openCart()">View My Order</button></div>`; document.getElementById("featuredImageWrap").innerHTML=""; document.getElementById("featuredDots").innerHTML=""; return; }
  if (featuredIndex >= featuredIds.length) featuredIndex = 0;
  const p = products.find(item => item.id === featuredIds[featuredIndex]); if (!p) return;
  document.getElementById("featuredContent").innerHTML = `<div class="hero-badge">KINGDOM CRUNCH • FEATURED DRINK</div><h2>${escapeHTML(p.name)}<br><span>made for your cravings.</span></h2><p>${escapeHTML(p.description || "A Kingdom Crunch favorite, freshly prepared.")}</p><div class="hero-actions"><button class="primary-btn" onclick="scrollToMenu()">Browse Menu</button><button class="secondary-btn" onclick="openCart()">View My Order</button></div><button class="featured-order-btn" onclick="orderFeatured(${p.id})">Order ${escapeHTML(p.name)} · from ${money(Math.min(p.hotPrice,p.coldPrice))}</button>`;
  document.getElementById("featuredImageWrap").innerHTML = p.image ? `<img src="${p.image}" alt="${escapeHTML(p.name)}">` : `<div class="featured-placeholder">${escapeHTML(p.name)}</div>`;
  document.getElementById("featuredDots").innerHTML = featuredIds.map((id,i) => `<button class="carousel-dot ${i===featuredIndex?"active":""}" aria-label="Show featured slide ${i+1}" onclick="showFeatured(${i})"></button>`).join("");
}
function showFeatured(index) { if (!featuredIds.length) return; featuredIndex = (index + featuredIds.length) % featuredIds.length; renderFeaturedCarousel(); }
function moveFeatured(direction) { showFeatured(featuredIndex + direction); restartCarouselTimer(); }
function orderFeatured(id) { scrollToMenu(); const p = products.find(item => item.id === id); if (!p) return; currentCategory = "All"; renderCategories(); renderProducts(); setTimeout(() => { const selector=document.getElementById(`variant-${id}`); if(selector) { selector.value="cold"; } addToCart(id); openCart(); }, 250); }
function restartCarouselTimer() { if (carouselTimer) clearInterval(carouselTimer); if (featuredIds.length > 1) carouselTimer = setInterval(() => showFeatured(featuredIndex + 1), 5000); }
function renderFeaturedManager() {
  const el = document.getElementById("featuredManager");
  if (!featuredIds.length) { el.innerHTML = `<p class="muted-note">No featured drinks selected. Edit a drink and check the featured option to add one.</p>`; return; }
  el.innerHTML = featuredIds.map((id,index) => { const p=products.find(item=>item.id===id); if(!p) return ""; return `<div class="featured-manager-row">${p.image?`<img src="${p.image}" alt="">`:`<span class="feature-mini-placeholder"></span>`}<div class="feature-name"><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.category)} · Hot ${money(p.hotPrice)} / Cold ${money(p.coldPrice)}</small></div><div class="feature-controls"><button onclick="moveFeaturedItem(${index},-1)" aria-label="Move ${escapeHTML(p.name)} up" ${index===0?"disabled":""}>↑</button><button onclick="moveFeaturedItem(${index},1)" aria-label="Move ${escapeHTML(p.name)} down" ${index===featuredIds.length-1?"disabled":""}>↓</button><button class="remove-feature" onclick="removeFeatured(${p.id})">Remove</button></div></div>`; }).join("");
}
function moveFeaturedItem(index, direction) { const next=index+direction; if(next<0||next>=featuredIds.length) return; [featuredIds[index],featuredIds[next]]=[featuredIds[next],featuredIds[index]]; featuredIndex=0; saveFeatured(); renderAll(); }
function removeFeatured(id) { featuredIds=featuredIds.filter(featureId=>featureId!==id); featuredIndex=0; saveFeatured(); renderAll(); }

// VIEW / NFC / INITIALIZATION

function switchStaffTab(tab) {
  const inventory = tab === "inventory";
  document.querySelectorAll(".staff-inventory-section").forEach(el => el.style.display = inventory ? "" : "none");
  document.getElementById("staffOrdersPanel").style.display = inventory ? "none" : "block";
  document.getElementById("inventoryTabBtn").classList.toggle("active", inventory);
  document.getElementById("ordersTabBtn").classList.toggle("active", !inventory);
  if (!inventory) renderStaffOrders();
}
function renderStaffOrders() {
  const list = document.getElementById("staffOrdersList");
  if (!list) return;
  // Re-read storage when staff opens/refreshes this tab, so the dashboard shows
  // newly saved checkout orders even after the checkout page has reloaded.
  loadCustomerOrders();
  const filter = document.getElementById("orderStatusFilter")?.value || "active";
  const visibleOrders = customerOrders.filter(order => {
    if (filter === "completed") return order.status === "completed";
    if (filter === "all") return true;
    return order.status !== "completed";
  });
  const activeCount = customerOrders.filter(order => order.status !== "completed").length;
  const count = document.getElementById("pendingOrderCount");
  if (count) count.textContent = String(activeCount);
  if (!visibleOrders.length) {
    const message = filter === "completed" ? "No completed orders yet." : "Customer orders placed through checkout will appear here.";
    list.innerHTML = `<div class="empty-orders"><strong>${message}</strong><p>New orders appear here after the customer submits checkout in this same browser.</p></div>`;
    return;
  }
  list.innerHTML = visibleOrders.map(order => {
    const itemsHtml = order.items.map(item => `<li>${escapeHTML(item.name)} (${escapeHTML(item.variant)}) × ${Number(item.quantity) || 0} — ₱${((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}</li>`).join("");
    const statusLabel = order.status === "confirmed" ? "Confirmed" : order.status === "completed" ? "Completed" : "Pending confirmation";
    const statusClass = order.status === "completed" ? "completed" : order.status;
    let actionButtons = "";
    if (order.status === "pending") {
      actionButtons = `<button type="button" class="checkout-btn order-action-btn" onclick="confirmCustomerOrder('${escapeHTML(order.id)}')">Confirm order</button>`;
    } else if (order.status === "confirmed") {
      actionButtons = `<button type="button" class="checkout-btn order-action-btn" onclick="markOrderCompleted('${escapeHTML(order.id)}')">Mark completed</button>`;
    } else {
      actionButtons = `<button type="button" class="secondary-staff-btn order-action-btn" onclick="removeOrderRecord('${escapeHTML(order.id)}')">Delete record</button>`;
    }
    return `<article class="order-card">
      <div class="order-card-top"><div><span class="order-number">${escapeHTML(order.id)}</span><h4>${escapeHTML(order.customerName)}</h4></div><span class="order-status ${statusClass}">${statusLabel}</span></div>
      <p class="order-pickup"><strong>Pickup time:</strong> ${escapeHTML(order.pickupTime)}</p>
      <p class="order-pickup"><strong>Placed:</strong> ${escapeHTML(order.placedAt ? new Date(order.placedAt).toLocaleString() : "—")}</p>
      <ul class="order-items">${itemsHtml}</ul>
      <div class="order-card-bottom"><strong>Total: ₱${Number(order.total).toFixed(2)}</strong><div class="order-actions">${actionButtons}</div></div>
    </article>`;
  }).join("");
}
function confirmCustomerOrder(orderId) {
  const order = customerOrders.find(item => item.id === orderId);
  if (!order || order.status !== "pending") return;
  order.status = "confirmed";
  order.confirmedAt = new Date().toISOString();
  saveCustomerOrders();
  renderStaffOrders();
}
function markOrderCompleted(orderId) {
  const order = customerOrders.find(item => item.id === orderId);
  if (!order || order.status === "completed") return;
  if (!confirm(`Mark ${order.id} as completed? Only do this after the customer has picked up the order.`)) return;
  // Completed orders are moved to the Completed Orders filter and kept in history.
  order.status = "completed";
  order.completedAt = new Date().toISOString();
  saveCustomerOrders();
  renderStaffOrders();
}
function removeOrderRecord(orderId) {
  const order = customerOrders.find(item => item.id === orderId);
  if (!order || order.status !== "completed") return;
  if (!confirm(`Permanently delete the completed order record ${order.id}?`)) return;
  customerOrders = customerOrders.filter(item => item.id !== orderId);
  saveCustomerOrders();
  renderStaffOrders();
}

function switchView(view) {
  const customerView=document.getElementById("customerView"), staffView=document.getElementById("staffView");
  const customerBtn=document.getElementById("customerBtn"), staffBtn=document.getElementById("staffBtn");
  if(view==="customer") { customerView.style.display="block"; staffView.style.display="none"; customerBtn.classList.add("active"); staffBtn.classList.remove("active"); }
  else { customerView.style.display="none"; staffView.style.display="block"; customerBtn.classList.remove("active"); staffBtn.classList.add("active"); renderInventory(); renderFeaturedManager(); }
  window.scrollTo({top:0,behavior:"smooth"});
}
function simulateNFC() { alert("NFC access simulated. In a live deployment, an NFC tag at the store would open this ordering website automatically."); scrollToMenu(); }
function scrollToMenu() { document.getElementById("menu").scrollIntoView({behavior:"smooth"}); }
function renderAll() { renderCategories(); renderProducts(); renderInventory(); renderFeaturedManager(); renderFeaturedCarousel(); restartCarouselTimer(); }
loadProducts(); loadFeatured(); loadCustomerOrders();
renderAll(); updateCartCount();
// If the same site is open in another tab, refresh the staff order badge/list
// when that tab writes a new order. (Cross-device syncing still needs a backend.)
window.addEventListener("storage", event => {
  if (event.key === ORDER_STORAGE_KEY) {
    loadCustomerOrders();
    if (document.getElementById("staffOrdersPanel")?.style.display !== "none") renderStaffOrders();
    else {
      const count = document.getElementById("pendingOrderCount");
      if (count) count.textContent = String(customerOrders.filter(order => order.status !== "completed").length);
    }
  }
});
