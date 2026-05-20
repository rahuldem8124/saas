/* ==========================================================================
   CakeFlow Standalone Storefront - JavaScript Core Engine
   ========================================================================== */

// 1. Initial State Databases
const PRODUCTS_DB = [
  { id: 1, name: "Velvet Rose Dream", price: 45, rating: 4.9, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", tags: ["trending"], weight: "1kg", desc: "Decadent velvet crumb cake with fresh garden rose decorations." },
  { id: 2, name: "Chocolate Truffle", price: 38, rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", tags: ["best"], weight: "1.2kg", desc: "Rich triple cocoa cake layered with luxury Parisian ganache." },
  { id: 3, name: "Lemon Zest Bliss", price: 42, rating: 4.7, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80", tags: ["trending"], weight: "1kg", desc: "Zesty organic lemon cake frosted with airy sweet cream meringue." },
  { id: 4, name: "Berry Vanilla Spark", price: 50, rating: 5.0, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80", tags: ["best"], weight: "1.5kg", desc: "Madagascan vanilla base infused with a fresh forest berry compote." },
  { id: 5, name: "Rainbow Cream Swirl", price: 40, rating: 4.9, image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=400&q=80", tags: ["best"], weight: "1kg", desc: "Fun colorful tiers frosted with a light sweet white chocolate frosting." },
  { id: 6, name: "Elegant Floral Lace", price: 55, rating: 4.9, image: "https://images.unsplash.com/photo-1562233237-10d74499d8c1?auto=format&fit=crop&w=400&q=80", tags: ["trending"], weight: "1.2kg", desc: "Elegant celebration cake styled with hand-piped white butter lace." },
  { id: 7, name: "Eternal White Lace", price: 450, rating: 5.0, image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=500&q=80", tags: ["luxury"], weight: "5kg", desc: "Grand 3-tiered wedding masterpiece with gold edible flakes." },
  { id: 8, name: "Rose gold Macaron", price: 160, rating: 4.8, image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80", tags: ["luxury"], weight: "2.5kg", desc: "Gilded pink frosting surrounded by artisanal French macarons." }
];

let cart = [];
let favorites = [];

// Custom Cake Builder State
const CUSTOM_BUILDER_STATE = {
  tiers: 1,
  basePrice: 45,
  flavor: "Velvet",
  frostingName: "Sweet Cream",
  frostingHex: "#FFF8F2",
  toppings: [],
  pipingMessage: "SWEET DAY",
  totalPrice: 45
};

// 2. DOM Selectors
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Load state from LocalStorage
  loadStateFromLocalStorage();

  // Initial render
  renderCatalog(PRODUCTS_DB);
  updateCartUI();
  updateFavoritesUI();

  // Header Scroll Physics
  const retailHeader = document.getElementById("retail-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      if (retailHeader) retailHeader.classList.add("scrolled");
    } else {
      if (retailHeader) retailHeader.classList.remove("scrolled");
    }
    
    // Parallax floating pastry elements
    handleParallaxPastry();
  });

  // Drawer Toggles
  setupDrawers();

  // Catalog Filters
  setupFilters();

  // Search Engine
  setupSearch();

  // Custom Studio Builder Interface
  setupCustomStudio();
  
  // Directly add special seasonal items
  setupDirectActions();
});

// 3. Render Catalog Products
function renderCatalog(products) {
  const container = document.getElementById("products-container");
  if (!container) return;
  
  container.innerHTML = "";
  
  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 4rem 0; text-align: center; color: var(--color-brown); font-weight: 600;">
        <i data-lucide="shopping-bag" style="width: 48px; height: 48px; opacity: 0.5; margin: 0 auto 1rem; display: block;"></i>
        No sweet creations match your search criteria.
      </div>
    `;
    lucide.createIcons();
    return;
  }

  products.forEach(product => {
    const isFav = favorites.includes(product.id);
    const cardHtml = `
      <div class="product-card">
        <div class="prod-image-wrapper">
          <img src="${product.image}" alt="${product.name}">
          ${product.price > 100 ? `<span class="prod-badge">GRAND COLLECTION</span>` : `<span class="prod-badge">FRESHLY BAKED</span>`}
          <button class="prod-favorite-btn ${isFav ? 'saved' : ''}" onclick="toggleFavorite(${product.id}, event)">
            <i data-lucide="heart" style="${isFav ? 'fill: var(--color-pink)' : ''}"></i>
          </button>
        </div>
        <div class="prod-details">
          <h3>${product.name}</h3>
          <div class="prod-rating-row">
            <i data-lucide="star" style="fill: #FFD700;"></i>
            <span>${product.rating}</span>
            <span style="opacity: 0.4; font-weight: 500;">(${product.weight})</span>
          </div>
          <div class="prod-meta-footer">
            <span class="prod-price">$${product.price.toFixed(2)}</span>
            <button class="prod-btn" onclick="addStandardProductToCart(${product.id})">Order Now</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHtml);
  });
  
  lucide.createIcons();
}

// 4. Client Side Dynamic Filters
function setupFilters() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const tabVal = tab.getAttribute("data-tab");
      let filtered = PRODUCTS_DB;
      
      if (tabVal === "best") {
        filtered = PRODUCTS_DB.filter(p => p.tags.includes("best"));
      } else if (tabVal === "trending") {
        filtered = PRODUCTS_DB.filter(p => p.tags.includes("trending"));
      } else if (tabVal === "luxury") {
        filtered = PRODUCTS_DB.filter(p => p.tags.includes("luxury"));
      }
      
      renderCatalog(filtered);
    });
  });

  // Direct category clicks inside collections section
  const exploreBtns = document.querySelectorAll(".filter-products-btn");
  exploreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-filter");
      let filtered = PRODUCTS_DB;
      if (cat === "Birthday") {
        filtered = PRODUCTS_DB.filter(p => p.tags.includes("trending") || p.id === 5);
      } else if (cat === "Wedding") {
        filtered = PRODUCTS_DB.filter(p => p.tags.includes("luxury"));
      }
      
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
      renderCatalog(filtered);
    });
  });
}

// 5. Search Engine
function setupSearch() {
  const searchInput = document.getElementById("cake-search");
  if (!searchInput) return;
  
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query === "") {
      renderCatalog(PRODUCTS_DB);
      return;
    }
    
    const results = PRODUCTS_DB.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query)
    );
    renderCatalog(results);
  });
}

// 6. Sliding Panels & Drawer Configurations
function setupDrawers() {
  const cartTrigger = document.getElementById("cart-btn");
  const cartCloseTrigger = document.getElementById("cart-close-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");

  const favTrigger = document.getElementById("fav-btn");
  const favCloseTrigger = document.getElementById("fav-close-btn");
  const favDrawer = document.getElementById("favorites-drawer");
  const favOverlay = document.getElementById("fav-overlay");

  const menuTrigger = document.getElementById("mobile-menu-btn");
  const menuCloseTrigger = document.getElementById("drawer-close");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileOverlay = document.getElementById("drawer-overlay");

  // Cart
  cartTrigger.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
  });
  
  const closeCart = () => {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
  };
  cartCloseTrigger.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Favorites
  favTrigger.addEventListener("click", () => {
    favDrawer.classList.add("open");
    favOverlay.classList.add("open");
  });
  
  const closeFav = () => {
    favDrawer.classList.remove("open");
    favOverlay.classList.remove("open");
  };
  favCloseTrigger.addEventListener("click", closeFav);
  favOverlay.addEventListener("click", closeFav);

  // Mobile navigation links drawer
  menuTrigger.addEventListener("click", () => {
    mobileDrawer.classList.add("open");
    mobileOverlay.classList.add("open");
  });

  const closeMenu = () => {
    mobileDrawer.classList.remove("open");
    mobileOverlay.classList.remove("open");
  };
  menuCloseTrigger.addEventListener("click", closeMenu);
  mobileOverlay.addEventListener("click", closeMenu);

  // Auto-close mobile drawer when navigation links are clicked
  document.querySelectorAll(".drawer-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

// 7. Interactive Custom Cake Studio Constructor UI
function setupCustomStudio() {
  // Option Selectors
  const tierBtns = document.querySelectorAll("#tier-selector .option-btn");
  const flavorPills = document.querySelectorAll("#base-selector .flavor-pill");
  const frostingDots = document.querySelectorAll("#frosting-selector .color-dot");
  const toppingCheckboxes = document.querySelectorAll("#toppings-selector .checkbox-option input");
  const messageInput = document.getElementById("custom-message-input");
  
  const visualTier1 = document.getElementById("preview-tier-1");
  const visualTier2 = document.getElementById("preview-tier-2");
  const visualTier3 = document.getElementById("preview-tier-3");
  const previewTextLabel = document.getElementById("custom-preview-text");

  // A. Choose Tier
  tierBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tierBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const tiers = parseInt(btn.getAttribute("data-value"));
      const price = parseFloat(btn.getAttribute("data-price"));
      const infoText = btn.getAttribute("data-desc");
      
      CUSTOM_BUILDER_STATE.tiers = tiers;
      CUSTOM_BUILDER_STATE.basePrice = price;
      document.getElementById("tier-info").innerText = infoText;
      
      // Update visual layers
      if (tiers === 1) {
        visualTier2.style.display = "none";
        visualTier3.style.display = "none";
      } else if (tiers === 2) {
        visualTier2.style.display = "flex";
        visualTier3.style.display = "none";
      } else if (tiers === 3) {
        visualTier2.style.display = "flex";
        visualTier3.style.display = "flex";
      }
      
      updateCustomBuilderSummary();
    });
  });

  // B. Choose Base Cake Flavor
  flavorPills.forEach(pill => {
    pill.addEventListener("click", () => {
      flavorPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      CUSTOM_BUILDER_STATE.flavor = pill.getAttribute("data-value");
      updateCustomBuilderSummary();
    });
  });

  // C. Choose Frosting / Icing color dot
  frostingDots.forEach(dot => {
    dot.addEventListener("click", () => {
      frostingDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      
      const name = dot.getAttribute("data-value");
      const hex = dot.getAttribute("data-hex");
      
      CUSTOM_BUILDER_STATE.frostingName = name;
      CUSTOM_BUILDER_STATE.frostingHex = hex;
      document.getElementById("frosting-name").innerText = name;
      
      // Update visual preview colors of cake frosting
      document.querySelectorAll(".tier-frosting").forEach(el => {
        el.style.backgroundColor = hex;
      });
      
      updateCustomBuilderSummary();
    });
  });

  // D. Choose Extra Toppings
  toppingCheckboxes.forEach(box => {
    box.addEventListener("change", () => {
      const parentOption = box.closest(".checkbox-option");
      const val = parentOption.getAttribute("data-value");
      
      if (box.checked) {
        if (!CUSTOM_BUILDER_STATE.toppings.includes(val)) {
          CUSTOM_BUILDER_STATE.toppings.push(val);
        }
      } else {
        CUSTOM_BUILDER_STATE.toppings = CUSTOM_BUILDER_STATE.toppings.filter(t => t !== val);
      }
      
      // Update visual topping representations (dots/fruits)
      renderVisualToppings();
      updateCustomBuilderSummary();
    });
  });

  // E. Piping Message
  messageInput.addEventListener("input", (e) => {
    let msg = e.target.value.toUpperCase();
    CUSTOM_BUILDER_STATE.pipingMessage = msg;
    previewTextLabel.innerText = msg === "" ? "SWEET DAY" : msg;
  });

  // F. Add custom cake to Cart Action
  document.getElementById("add-custom-to-cart").addEventListener("click", () => {
    const customItem = {
      id: "custom-" + Date.now(),
      name: "🎨 Custom Celebration Cake",
      price: CUSTOM_BUILDER_STATE.totalPrice,
      isCustom: true,
      image: "assets/cake_white_bg.png",
      quantity: 1,
      specs: {
        tiers: CUSTOM_BUILDER_STATE.tiers,
        flavor: CUSTOM_BUILDER_STATE.flavor,
        frosting: CUSTOM_BUILDER_STATE.frostingName,
        toppings: [...CUSTOM_BUILDER_STATE.toppings],
        message: CUSTOM_BUILDER_STATE.pipingMessage || "None"
      }
    };
    
    cart.push(customItem);
    saveStateToLocalStorage();
    updateCartUI();
    
    // Auto-open Cart drawer and trigger simple success indication
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-overlay").classList.add("open");
  });
}

// Helper to update pricing and summary labels
function updateCustomBuilderSummary() {
  // Calculate total toppings price
  let toppingsPrice = 0;
  const toppingCheckboxes = document.querySelectorAll("#toppings-selector .checkbox-option input");
  toppingCheckboxes.forEach(box => {
    if (box.checked) {
      toppingsPrice += parseFloat(box.closest(".checkbox-option").getAttribute("data-price"));
    }
  });
  
  const finalPrice = CUSTOM_BUILDER_STATE.basePrice + toppingsPrice;
  CUSTOM_BUILDER_STATE.totalPrice = finalPrice;
  
  // Render Price UI
  document.getElementById("custom-total-price").innerText = `$${finalPrice.toFixed(2)}`;
  
  // Render Summary labels
  const topsLabel = CUSTOM_BUILDER_STATE.toppings.length > 0 ? `, with ${CUSTOM_BUILDER_STATE.toppings.join(" & ")}` : "";
  document.getElementById("custom-detail-summary").innerText = 
    `${CUSTOM_BUILDER_STATE.tiers} Tier${CUSTOM_BUILDER_STATE.tiers > 1 ? 's' : ''}, ${CUSTOM_BUILDER_STATE.flavor} Base, ${CUSTOM_BUILDER_STATE.frostingName} Icing${topsLabel}`;
}

// Dynamic tiny visual indicators for toppings inside tiers
function renderVisualToppings() {
  const renderContainer = (tierId, count) => {
    const el = document.getElementById(tierId);
    if (!el) return;
    
    let toppingEl = el.querySelector(".tier-topping");
    toppingEl.innerHTML = "";
    
    if (CUSTOM_BUILDER_STATE.toppings.length === 0) return;
    
    // Distribute sprinkles or berries markers
    for(let i=0; i<count; i++) {
      let toppingDot = document.createElement("span");
      toppingDot.style.width = "8px";
      toppingDot.style.height = "8px";
      toppingDot.style.borderRadius = "50%";
      toppingDot.style.display = "inline-block";
      
      if (CUSTOM_BUILDER_STATE.toppings.includes("Fresh Berries")) {
        toppingDot.style.backgroundColor = "#B22222"; // red
      } else if (CUSTOM_BUILDER_STATE.toppings.includes("Gold Foil Flakes")) {
        toppingDot.style.backgroundColor = "#FFD700"; // gold
        toppingDot.style.borderRadius = "2px";
      } else if (CUSTOM_BUILDER_STATE.toppings.includes("Rainbow Sprinkles")) {
        const colors = ["#FFC0CB", "#87CEEB", "#FFD700", "#98FB98"];
        toppingDot.style.backgroundColor = colors[i % colors.length];
        toppingDot.style.width = "4px";
        toppingDot.style.height = "10px";
      } else if (CUSTOM_BUILDER_STATE.toppings.includes("Edible Flowers")) {
        toppingDot.style.backgroundColor = "#EE82EE"; // purple violet
        toppingDot.style.width = "10px";
        toppingDot.style.height = "10px";
      }
      
      toppingEl.appendChild(toppingDot);
    }
  };
  
  renderContainer("preview-tier-1", 8);
  renderContainer("preview-tier-2", 6);
  renderContainer("preview-tier-3", 4);
}

// 8. E-commerce Cart Operations
function addStandardProductToCart(productId) {
  const prod = PRODUCTS_DB.find(p => p.id === productId);
  if (!prod) return;
  
  // Check if item already exists in cart
  const existing = cart.find(item => !item.isCustom && item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      isCustom: false,
      quantity: 1
    });
  }
  
  saveStateToLocalStorage();
  updateCartUI();
  
  // Show Cart Panel instantly
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
}

function updateQty(indexOrId, offset) {
  const item = cart.find(i => i.id === indexOrId);
  if (!item) return;
  
  item.quantity += offset;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== indexOrId);
  }
  
  saveStateToLocalStorage();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveStateToLocalStorage();
  updateCartUI();
}

function updateCartUI() {
  const itemsContainer = document.getElementById("cart-items-container");
  const badgeCount = document.getElementById("cart-count");
  const subtotalText = document.getElementById("cart-subtotal");
  const emptyMsg = document.getElementById("cart-empty-msg");
  const cartFooter = document.getElementById("cart-footer");
  
  if (!itemsContainer) return;
  
  // Subtotal counts
  let subtotal = 0;
  let totalQty = 0;
  
  itemsContainer.innerHTML = "";
  
  if (cart.length === 0) {
    itemsContainer.appendChild(emptyMsg);
    emptyMsg.style.display = "flex";
    cartFooter.style.display = "none";
    badgeCount.innerText = "0";
    badgeCount.style.display = "none";
    return;
  }
  
  emptyMsg.style.display = "none";
  cartFooter.style.display = "block";
  
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    totalQty += item.quantity;
    
    let summarySpecs = "";
    if (item.isCustom && item.specs) {
      summarySpecs = `
        <div class="cart-item-summary">
          Tiers: ${item.specs.tiers} | Flavor: ${item.specs.flavor}<br>
          Frosting: ${item.specs.frosting}<br>
          Toppings: ${item.specs.toppings.length > 0 ? item.specs.toppings.join(", ") : "None"}<br>
          Message: "${item.specs.message}"
        </div>
      `;
    } else {
      summarySpecs = `<div class="cart-item-summary">Artisanal Bakery Standard</div>`;
    }
    
    const itemHtml = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          ${summarySpecs}
          <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;
    itemsContainer.insertAdjacentHTML("beforeend", itemHtml);
  });
  
  badgeCount.innerText = totalQty;
  badgeCount.style.display = "flex";
  subtotalText.innerText = `$${subtotal.toFixed(2)}`;
  
  lucide.createIcons();
}

// 9. Interactive Saved Favorites UI
function toggleFavorite(id, event) {
  event.stopPropagation();
  const idx = favorites.indexOf(id);
  if (idx > -1) {
    favorites.splice(idx, 1);
  } else {
    favorites.push(id);
  }
  
  saveStateToLocalStorage();
  updateFavoritesUI();
  
  // Re-render catalog to reflect heart fills
  const currentTab = document.querySelector(".filter-tab.active");
  const tabVal = currentTab ? currentTab.getAttribute("data-tab") : "all";
  let filtered = PRODUCTS_DB;
  if (tabVal === "best") filtered = PRODUCTS_DB.filter(p => p.tags.includes("best"));
  else if (tabVal === "trending") filtered = PRODUCTS_DB.filter(p => p.tags.includes("trending"));
  else if (tabVal === "luxury") filtered = PRODUCTS_DB.filter(p => p.tags.includes("luxury"));
  renderCatalog(filtered);
}

function updateFavoritesUI() {
  const container = document.getElementById("fav-items-container");
  const badgeCount = document.getElementById("fav-count");
  const emptyMsg = document.getElementById("fav-empty-msg");
  
  if (!container) return;
  
  container.innerHTML = "";
  
  if (favorites.length === 0) {
    container.appendChild(emptyMsg);
    emptyMsg.style.display = "block";
    badgeCount.innerText = "0";
    badgeCount.style.display = "none";
    return;
  }
  
  emptyMsg.style.display = "none";
  badgeCount.innerText = favorites.length;
  badgeCount.style.display = "flex";
  
  favorites.forEach(id => {
    const prod = PRODUCTS_DB.find(p => p.id === id);
    if (!prod) return;
    
    const itemHtml = `
      <div style="display: flex; gap: 1rem; background: var(--color-cream); padding: 1rem; border-radius: 16px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <img src="${prod.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
          <div style="text-align: left;">
            <h4 style="margin: 0; font-size: 1.05rem; font-weight: 800;">${prod.name}</h4>
            <span style="color: var(--color-pink); font-weight: 900; font-size: 0.95rem;">$${prod.price.toFixed(2)}</span>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button onclick="addStandardProductToCart(${prod.id})" style="background: var(--color-pink); color: white; padding: 0.4rem 0.8rem; border-radius: 12px; font-weight: 800; font-size: 0.75rem;">
            Order
          </button>
          <button onclick="toggleFavorite(${prod.id}, event)" style="color: var(--color-brown); opacity: 0.6; padding: 0.4rem;">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", itemHtml);
  });
  
  lucide.createIcons();
}

// 10. Automated WhatsApp Order Compilation Layout
function setupDirectActions() {
  // A. Checkout via WhatsApp Drawer button
  const checkoutBtn = document.getElementById("wa-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      compileWhatsAppOrderAndSend();
    });
  }

  // B. Special direct add from seasonal marketing container
  const directOrderBtns = document.querySelectorAll(".direct-order-btn");
  directOrderBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      const img = "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80";
      
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: id,
          name: name,
          price: price,
          image: img,
          isCustom: false,
          quantity: 1
        });
      }
      
      saveStateToLocalStorage();
      updateCartUI();
      
      document.getElementById("cart-drawer").classList.add("open");
      document.getElementById("cart-overlay").classList.add("open");
    });
  });
}

function compileWhatsAppOrderAndSend() {
  if (cart.length === 0) return;
  
  let msg = `*🛍️ NEW CAKEFLOW STOREFRONT ORDER!*\n`;
  msg += `=============================\n\n`;
  msg += `*Customer Delivery Mode:* Express Delivery Direct\n\n`;
  msg += `*Items in your box:*\n`;
  
  let grandTotal = 0;
  
  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;
    
    msg += `${idx + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
    if (item.isCustom && item.specs) {
      msg += `   - Tiers: ${item.specs.tiers} Tier(s)\n`;
      msg += `   - Base Flavor: ${item.specs.flavor}\n`;
      msg += `   - Frosting Color: ${item.specs.frosting}\n`;
      msg += `   - Toppings: ${item.specs.toppings.length > 0 ? item.specs.toppings.join(", ") : "None"}\n`;
      msg += `   - Custom Message: "${item.specs.message}"\n`;
    } else {
      msg += `   - Classic Artisanal Recipe\n`;
    }
    msg += `   - _Price: $${item.price.toFixed(2)} ea | Total: $${itemTotal.toFixed(2)}_\n\n`;
  });
  
  msg += `=============================\n`;
  msg += `*Order Subtotal:* $${grandTotal.toFixed(2)}\n`;
  msg += `*Delivery Fee:* FREE (Express Promotional)\n`;
  msg += `*TOTAL ESTIMATE:* $${grandTotal.toFixed(2)}\n\n`;
  msg += `=============================\n`;
  msg += `_Tap send to verify specifications with our master baker!_ 🧁`;
  
  const waNumber = "5550199"; // Configured store contact
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  
  window.open(waUrl, "_blank");
}

// 11. Parallax Physics & Drips Actions
function handleParallaxPastry() {
  const pastry = document.getElementById("pastry-parallax");
  if (!pastry) return;
  
  const scrollY = window.scrollY;
  
  // Fade in only after scrolling past hero
  if (scrollY > 300) {
    pastry.style.opacity = "1";
    pastry.style.pointerEvents = "auto";
  } else {
    pastry.style.opacity = "0";
    pastry.style.pointerEvents = "none";
  }
  
  // Curve movement physics based on scroll height
  const xOffset = Math.sin(scrollY / 300) * 40;
  const yOffset = -scrollY * 0.15; // Slow lag trailing behind scroll
  
  // Apply visual shifts to the floating pastry box
  pastry.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  
  // Synergetic dripping cream SVGs physics
  const drip1 = document.querySelector(".drip-1");
  const drip2 = document.querySelector(".drip-2");
  const drip3 = document.querySelector(".drip-3");
  
  if (drip1 && drip2 && drip3) {
    // Drops drift slightly down in relation to scrolling
    const dripY1 = (scrollY % 400) * 0.12;
    const dripY2 = (scrollY % 600) * 0.16;
    const dripY3 = (scrollY % 500) * 0.14;
    
    drip1.style.transform = `translateY(${dripY1}px)`;
    drip2.style.transform = `translateY(${dripY2}px)`;
    drip3.style.transform = `translateY(${dripY3}px)`;
  }
}

// 12. LocalStorage Cache helper
function saveStateToLocalStorage() {
  localStorage.setItem("cakeflow_cart", JSON.stringify(cart));
  localStorage.setItem("cakeflow_favs", JSON.stringify(favorites));
}

function loadStateFromLocalStorage() {
  try {
    const cachedCart = localStorage.getItem("cakeflow_cart");
    if (cachedCart) cart = JSON.parse(cachedCart);
    
    const cachedFavs = localStorage.getItem("cakeflow_favs");
    if (cachedFavs) favorites = JSON.parse(cachedFavs);
  } catch (e) {
    console.error("Local storage restoration failed", e);
  }
}


