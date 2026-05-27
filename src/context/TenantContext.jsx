import React, { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext();

export const useTenant = () => useContext(TenantContext);

const initialBusinesses = {
  "cakeflow": {
    id: "cakeflow",
    name: "CakeFlow Flagship",
    category: "Cake",
    theme: "Luxury",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 350,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 43210",
    instagramUsername: "cakeflow_bakery",
    deliveryProvider: "Manual",
    automationChannel: "WhatsApp",
    perMessageCost: 0.60,
    whatsappMessagesCount: 500,
    additionalFeatures: ["Advanced Custom Fields Builder", "AI Chatbot Automation", "Advanced Styling Themes"],
    fields: [
      { id: "flavor", name: "Select Flavor", type: "Dropdown", options: ["Chocolate Truffle", "Red Velvet", "Lemon Zest", "Vanilla Bean"], required: true },
      { id: "weight", name: "Select Weight", type: "Dropdown", options: ["0.5kg", "1kg", "2kg", "3kg"], required: true },
      { id: "message", name: "Message on Cake", type: "Text", required: false, placeholder: "e.g. Happy Birthday Rahul!" },
      { id: "deliveryDate", name: "Delivery Date", type: "Date picker", required: true },
      { id: "referenceImage", name: "Upload Custom Inspiration", type: "Upload", required: false }
    ],
    products: [
      { id: 1, name: "Chocolate Truffle", price: "₹999", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Best Seller", desc: "Decadent dark Belgian chocolate layers." },
      { id: 2, name: "Velvet Rose Dream", price: "₹1200", rating: 4.9, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", category: "Birthday", desc: "A luxurious red velvet cake layered with cream cheese." },
      { id: 3, name: "Lemon Zest Bliss", price: "₹1100", rating: 4.7, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80", category: "Trending", desc: "Tangy sweet lemon cake with vanilla buttercream." },
      { id: 4, name: "Berry Vanilla Spark", price: "₹1300", rating: 5.0, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80", category: "Best Seller", desc: "Fresh organic seasonal berries and vanilla sponge." }
    ],
    orders: [
      { id: "CF-1001", customer: "Alice Green", date: "May 19, 2026", amount: "₹999", status: "Baking", payment: "Paid", email: "alice@example.com", customFields: { flavor: "Chocolate Truffle", weight: "1kg", message: "Happy Birthday Rahul", deliveryDate: "2026-05-21" }, items: [{ name: "Chocolate Truffle", price: "₹999", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Hi, is it possible to add gold flakes to the Velvet Rose Dream?", timestamp: "10:30 AM" },
      { id: 2, sender: "bot", text: "Yes! Gold flakes are available for all Luxury tier cakes. I have added this note to your session.", timestamp: "10:31 AM" }
    ],
    templates: [
      { id: "t1", name: "Order Placed", body: "Hi {customer}, your order for {product} is confirmed! 🎂 Status: {status}." },
      { id: "t2", name: "Delivery Alert", body: "Good news {customer}! Your sweet treat is out for delivery. 🚀" }
    ]
  },
  "fastfoot": {
    id: "fastfoot",
    name: "FastFoot Sneaker Lab",
    category: "Shoes",
    theme: "Dark",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 320,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 98120",
    instagramUsername: "fastfoot_sneaks",
    deliveryProvider: "Shiprocket",
    automationChannel: "Instagram",
    perMessageCost: 0.40,
    whatsappMessagesCount: 400,
    additionalFeatures: ["AI Chatbot Automation", "Shipping Integration", "Advanced Styling Themes"],
    fields: [
      { id: "size", name: "Select Size (US)", type: "Dropdown", options: ["7", "8", "9", "10", "11"], required: true },
      { id: "color", name: "Select Color", type: "Dropdown", options: ["Hyper Black", "Vanguard White", "Laser Red", "Cobalt Blue"], required: true },
      { id: "material", name: "Material Lining", type: "Dropdown", options: ["Premium Full Leather", "Breathable Mesh", "Urban Suede"], required: true }
    ],
    products: [
      { id: 201, name: "Nike Air", price: "₹5499", rating: 4.9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", category: "Runners", desc: "Responsive cushioning for modern city explorers." },
      { id: 202, name: "Retro Urban Lows", price: "₹3999", rating: 4.7, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80", category: "Classics", desc: "Classic 90s silhouette wrapped in full-grain leather." },
      { id: 203, name: "Zen Breathable V3", price: "₹4499", rating: 4.8, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80", category: "Athletic", desc: "Engineered mesh design optimized for ultra-cool runs." }
    ],
    orders: [
      { id: "SH-2001", customer: "Marcus Vance", date: "May 19, 2026", amount: "₹5499", status: "Packed", payment: "Paid", email: "marcus@example.com", customFields: { size: "9", color: "Hyper Black", material: "Breathable Mesh" }, items: [{ name: "Nike Air", price: "₹5499", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Hello! Are sizes standard or smaller fit?", timestamp: "09:12 AM" },
      { id: 2, sender: "bot", text: "Hi! FastFoot sneakers fit true to US size. If you have wide feet, we recommend buying 0.5 size up.", timestamp: "09:13 AM" }
    ],
    templates: [
      { id: "t1", name: "Shoes Confirmed", body: "Hi {customer}, your sneaker order {product} has been secured! Size: {size}. Status: {status}." }
    ]
  },
  "rose-gold": {
    id: "rose-gold",
    name: "RoseGold Atelier",
    category: "Accessories",
    theme: "Minimal",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 85,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 43211",
    instagramUsername: "rosegold_atelier",
    deliveryProvider: "Delhivery",
    automationChannel: "WhatsApp + Instagram",
    perMessageCost: 0.90,
    whatsappMessagesCount: 200,
    additionalFeatures: ["Advanced Styling Themes"],
    fields: [
      { id: "metal", name: "Metal Finish", type: "Dropdown", options: ["Rose Gold", "Yellow Gold", "Sterling Silver"], required: true },
      { id: "engraving", name: "Custom Engraving Message", type: "Text", required: false, placeholder: "e.g. Forever & Always" },
      { id: "style", name: "Chain Link Style", type: "Dropdown", options: ["Classic Cable", "Dainty Box", "Sleek Figarol"], required: true }
    ],
    products: [
      { id: 301, name: "Silver Bracelet", price: "₹1499", rating: 4.8, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80", category: "Bracelets", desc: "A timeless hand-made linked bracelet for daily stacking." },
      { id: 302, name: "Celestial Hoop Set", price: "₹899", rating: 4.6, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80", category: "Earrings", desc: "Delicate stellar constellation etched hoop design." }
    ],
    orders: [
      { id: "AC-3001", customer: "Diana Prince", date: "May 18, 2026", amount: "₹1499", status: "Shipped", payment: "Paid", email: "diana@example.com", customFields: { metal: "Rose Gold", engraving: "For D", style: "Classic Cable" }, items: [{ name: "Silver Bracelet", price: "₹1499", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Does the rose gold tarnish in water?", timestamp: "Yesterday" },
      { id: 2, sender: "bot", text: "We use 18k thick PVD gold plating. It is waterproof, but we advise avoiding aggressive perfumes.", timestamp: "Yesterday" }
    ],
    templates: [
      { id: "t1", name: "Sparkle confirmed", body: "Your elegant {product} in {metal} has shipped! Tracking id: RG-1892." }
    ]
  },
  "crafty": {
    id: "crafty",
    name: "Clay & Co. Handmade",
    category: "Handmade",
    theme: "Modern",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 190,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 67890",
    instagramUsername: "clay_and_co",
    deliveryProvider: "Porter",
    automationChannel: "WhatsApp",
    perMessageCost: 0.60,
    whatsappMessagesCount: 300,
    additionalFeatures: ["Advanced Custom Fields Builder", "AI Chatbot Automation", "Commission-Free Sales"],
    fields: [
      { id: "notes", name: "Customization Notes", type: "Text", required: true, placeholder: "e.g. Paint an anime character" },
      { id: "inspiration", name: "Reference Image", type: "Upload", required: false },
      { id: "wrap", name: "Include Gift Wrap?", type: "Dropdown", options: ["Standard Kraft Box", "Deluxe Ribbon Bow", "No Wrap"], required: true }
    ],
    products: [
      { id: 401, name: "Anime Mug", price: "₹899", rating: 4.9, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", category: "Ceramics", desc: "Double-glazed ceramic mug molded by hand." },
      { id: 402, name: "Woven Macrame Hanger", price: "₹1200", rating: 5.0, image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=400&q=80", category: "Decor", desc: "Boho plant hanger hand-knotted with recycled cotton." }
    ],
    orders: [
      { id: "HM-4001", customer: "Sarah Connor", date: "May 19, 2026", amount: "₹899", status: "In Progress", payment: "Paid", email: "sarah@example.com", customFields: { notes: "Anime mug with Hunter X Hunter themes", wrap: "Deluxe Ribbon Bow" }, items: [{ name: "Anime Mug", price: "₹899", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Can you deliver before this Saturday?", timestamp: "2 hours ago" },
      { id: 2, sender: "bot", text: "Since your item is custom hand-painted, it takes 3 days. I can expedite and dispatch tomorrow evening!", timestamp: "2 hours ago" }
    ],
    templates: [
      { id: "t1", name: "Crafting Status", body: "Hello {customer}! We've started building your {product}! Queue: #3. Status: {status}." }
    ]
  },
  "builder-box": {
    id: "builder-box",
    name: "Flex Custom Atelier",
    category: "Custom",
    theme: "Modern",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 410,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 11220",
    instagramUsername: "flex_customs",
    deliveryProvider: "Manual",
    automationChannel: "WhatsApp + Instagram",
    perMessageCost: 0.90,
    whatsappMessagesCount: 500,
    additionalFeatures: ["Advanced Custom Fields Builder", "AI Chatbot Automation", "Advanced Styling Themes", "Shipping Integration", "Commission-Free Sales"],
    fields: [
      { id: "customText", name: "Your Text", type: "Text", required: true, placeholder: "Add your personalized text" },
      { id: "colorPicker", name: "Accent Color", type: "Dropdown", options: ["Red", "Gold", "Pink", "Mint Green"], required: true }
    ],
    products: [
      { id: 501, name: "Custom Mystery Gift Set", price: "₹2499", rating: 4.8, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80", category: "Gifting", desc: "A custom compiled set based on your theme choice." }
    ],
    orders: [
      { id: "CS-5001", customer: "Bruce Wayne", date: "May 17, 2026", amount: "₹2499", status: "Preparing", payment: "Paid", email: "bruce@example.com", customFields: { customText: "W. Gothams", colorPicker: "Gold" }, items: [{ name: "Custom Mystery Gift Set", price: "₹2499", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Can you include a dark theme wrapping paper?", timestamp: "3 days ago" },
      { id: 2, sender: "bot", text: "Certainly. We will use absolute luxury black matte craft wrapping with gold ribbons.", timestamp: "3 days ago" }
    ],
    templates: [
      { id: "t1", name: "Custom Confirmation", body: "Got it! Your custom build {product} is verified. Accent: {colorPicker}." }
    ]
  },
  "threads-co": {
    id: "threads-co",
    name: "Threads & Co. Apparel",
    category: "Clothing",
    theme: "Minimal",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 390,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 55660",
    instagramUsername: "threads_co",
    deliveryProvider: "Delhivery",
    automationChannel: "Instagram",
    perMessageCost: 0.40,
    whatsappMessagesCount: 450,
    additionalFeatures: ["Advanced Styling Themes", "Shipping Integration"],
    fields: [
      { id: "size", name: "Select Size", type: "Dropdown", options: ["XS", "S", "M", "L", "XL"], required: true },
      { id: "color", name: "Select Color", type: "Dropdown", options: ["Creamy Off-White", "Charcoal Black", "Soft Sage", "Vintage Indigo"], required: true },
      { id: "fit", name: "Fit Style", type: "Dropdown", options: ["Oversized", "Slim Fit", "Relaxed Fit"], required: true },
      { id: "monogram", name: "Custom Monogram (Initial)", type: "Text", required: false, placeholder: "e.g. R.D. (Max 5 letters)" }
    ],
    products: [
      { id: 601, name: "Vintage Denim Jacket", price: "₹4500", rating: 4.9, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80", category: "Jackets", desc: "Heavyweight selvedge denim jacket with a relaxed drop shoulder." },
      { id: 602, name: "Classic Organic Tee", price: "₹1499", rating: 4.8, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", category: "Essentials", desc: "Mid-weight organic cotton tee with a perfect premium drape." },
      { id: 603, name: "Premium Wash Hoodie", price: "₹2999", rating: 5.0, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80", category: "Essentials", desc: "Ultra-soft French terry hoodie in a vintage washed finish." }
    ],
    orders: [
      { id: "CL-6001", customer: "Robert Downey", date: "May 19, 2026", amount: "₹4500", status: "Packed", payment: "Paid", email: "robert@example.com", customFields: { size: "M", color: "Vintage Indigo", fit: "Relaxed Fit", monogram: "RD" }, items: [{ name: "Vintage Denim Jacket", price: "₹4500", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Is the hoodie oversized by design?", timestamp: "11:45 AM" },
      { id: 2, sender: "bot", text: "Yes! Our Premium Wash Hoodie has a drop shoulder, slightly cropped body, and oversized fit. We recommend ordering true-to-size.", timestamp: "11:46 AM" }
    ],
    templates: [
      { id: "t1", name: "Order Placed", body: "Hi {customer}, your order for {product} is confirmed! Fit: {fit}. Status: {status}." }
    ]
  },
  "sweet-treats": {
    id: "sweet-treats",
    name: "Sweet Treats Bakery",
    category: "Cake",
    theme: "Modern",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 45,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 12340",
    instagramUsername: "sweet_treats_bakery",
    deliveryProvider: "Manual",
    automationChannel: "Instagram",
    perMessageCost: 0.40,
    whatsappMessagesCount: 250,
    additionalFeatures: ["Advanced Styling Themes"],
    fields: [
      { id: "flavor", name: "Select Flavor", type: "Dropdown", options: ["Chocolate", "Vanilla Buttercream", "Strawberry Swirl"], required: true },
      { id: "weight", name: "Select Weight", type: "Dropdown", options: ["0.5kg", "1kg", "2kg"], required: true },
      { id: "message", name: "Message on Cake", type: "Text", required: false, placeholder: "e.g. Happy Bday!" },
      { id: "deliveryDate", name: "Delivery Date", type: "Date picker", required: true }
    ],
    products: [
      { id: 1001, name: "Vanilla Buttercream Classic", price: "₹899", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Classics", desc: "Traditional vanilla sponge with smooth buttercream." },
      { id: 1002, name: "Rainbow Sprinkles Joy", price: "₹999", rating: 4.7, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80", category: "Kids", desc: "Colorful sprinkles layered with vanilla custard." }
    ],
    orders: [
      { id: "ST-1001", customer: "Jack Miller", date: "May 18, 2026", amount: "₹899", status: "Baking", payment: "Paid", email: "jack@example.com", customFields: { flavor: "Vanilla Buttercream", weight: "1kg", message: "Sweet 16!" }, items: [{ name: "Vanilla Buttercream Classic", price: "₹899", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Can you make it less sweet?", timestamp: "Yesterday" },
      { id: 2, sender: "bot", text: "Sure! We can customize the sugar levels. I've noted this for your order.", timestamp: "Yesterday" }
    ],
    templates: [
      { id: "t1", name: "Order Placed", body: "Hi {customer}, your sweet treats order {product} is verified! Status: {status}." }
    ]
  },
  "cupcake-heaven": {
    id: "cupcake-heaven",
    name: "Cupcake Heaven",
    category: "Cake",
    theme: "Modern",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 185,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 23450",
    instagramUsername: "cupcake_heaven",
    deliveryProvider: "Manual",
    automationChannel: "WhatsApp + Instagram",
    perMessageCost: 0.90,
    whatsappMessagesCount: 350,
    additionalFeatures: ["Advanced Custom Fields Builder", "AI Chatbot Automation", "Advanced Styling Themes"],
    fields: [
      { id: "flavor", name: "Select Flavor", type: "Dropdown", options: ["Chocolate Fudge", "Salted Caramel", "Vanilla Dream"], required: true },
      { id: "boxSize", name: "Box Size", type: "Dropdown", options: ["Box of 6", "Box of 12"], required: true },
      { id: "deliveryDate", name: "Delivery Date", type: "Date picker", required: true }
    ],
    products: [
      { id: 2001, name: "Fudge Chocolate Cupcakes", price: "₹599", rating: 4.9, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", category: "Cupcakes", desc: "Rich double chocolate fudge toppings." },
      { id: 2002, name: "Caramel Swirl Cupcakes", price: "₹699", rating: 5.0, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80", category: "Cupcakes", desc: "Salted caramel drizzle with cream core." }
    ],
    orders: [
      { id: "CH-2001", customer: "Emma Watson", date: "May 20, 2026", amount: "₹599", status: "Baking", payment: "Paid", email: "emma@example.com", customFields: { flavor: "Chocolate Fudge", boxSize: "Box of 6" }, items: [{ name: "Fudge Chocolate Cupcakes", price: "₹599", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Do you deliver on Sundays?", timestamp: "9:00 AM" },
      { id: 2, sender: "bot", text: "Yes! Cupcake Heaven delivers seven days a week between 8 AM and 8 PM.", timestamp: "9:02 AM" }
    ],
    templates: [
      { id: "t1", name: "Order Placed", body: "Hi {customer}! Your box of {product} has been prepared. Status: {status}." }
    ]
  },
  "frosting-fantasies": {
    id: "frosting-fantasies",
    name: "Frosting Fantasies",
    category: "Cake",
    theme: "Luxury",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 75,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 34560",
    instagramUsername: "frosting_fantasies",
    deliveryProvider: "Manual",
    automationChannel: "Instagram",
    perMessageCost: 0.40,
    whatsappMessagesCount: 200,
    additionalFeatures: ["Advanced Styling Themes"],
    fields: [
      { id: "flavor", name: "Select Flavor", type: "Dropdown", options: ["Red Velvet", "Lemon Cream", "Rich Truffle"], required: true },
      { id: "weight", name: "Select Weight", type: "Dropdown", options: ["1kg", "2kg", "3kg"], required: true },
      { id: "message", name: "Message on Cake", type: "Text", required: false, placeholder: "e.g. HBD!" },
      { id: "deliveryDate", name: "Delivery Date", type: "Date picker", required: true }
    ],
    products: [
      { id: 3001, name: "Unicorn Fantasy Dream", price: "₹1800", rating: 5.0, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80", category: "Custom", desc: "Magical multi-tier cake with hand-crafted horn decoration." },
      { id: 3002, name: "Red Velvet Romance", price: "₹1200", rating: 4.8, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", category: "Romantic", desc: "Rich crimson layers with satin cream finish." }
    ],
    orders: [
      { id: "FF-3001", customer: "Lily Rose", date: "May 19, 2026", amount: "₹1800", status: "Baking", payment: "Paid", email: "lily@example.com", customFields: { flavor: "Red Velvet", weight: "2kg", message: "HBD Lily!" }, items: [{ name: "Unicorn Fantasy Dream", price: "₹1800", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Can you add a custom topper?", timestamp: "11:00 AM" },
      { id: 2, sender: "bot", text: "Yes! Unicorn toppers are available. Standard customized topper is $5 extra.", timestamp: "11:02 AM" }
    ],
    templates: [
      { id: "t1", name: "Order Placed", body: "Dear {customer}, your luxury cake {product} is being sculpted. Status: {status}." }
    ]
  },
  "sugar-rush": {
    id: "sugar-rush",
    name: "Sugar Rush Cakes",
    category: "Cake",
    theme: "Modern",
    subscription: "Custom Plan",
    isSubscribed: false,
    messagesUsed: 120,
    topUpMessages: 0,
    whatsappNumber: "+91 98765 45670",
    instagramUsername: "sugar_rush_cakes",
    deliveryProvider: "Manual",
    automationChannel: "WhatsApp",
    perMessageCost: 0.60,
    whatsappMessagesCount: 300,
    additionalFeatures: ["Advanced Custom Fields Builder", "AI Chatbot Automation"],
    fields: [
      { id: "flavor", name: "Select Flavor", type: "Dropdown", options: ["Salted Caramel", "Carrot Walnut", "Double Chocolate"], required: true },
      { id: "weight", name: "Select Weight", type: "Dropdown", options: ["0.5kg", "1kg", "2kg"], required: true },
      { id: "deliveryDate", name: "Delivery Date", type: "Date picker", required: true }
    ],
    products: [
      { id: 4001, name: "Salted Caramel Volcano", price: "₹999", rating: 4.9, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80", category: "Trending", desc: "Lava cake filled with piping hot caramel cream." },
      { id: 4002, name: "Classic Carrot Walnut Cake", price: "₹899", rating: 4.7, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Classics", desc: "Spiced sponge loaded with roasted walnuts and carrots." }
    ],
    orders: [
      { id: "SR-4001", customer: "David Brown", date: "May 20, 2026", amount: "₹999", status: "Baking", payment: "Paid", email: "david@example.com", customFields: { flavor: "Salted Caramel", weight: "1kg" }, items: [{ name: "Salted Caramel Volcano", price: "₹999", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Is it eggless?", timestamp: "Yesterday" },
      { id: 2, sender: "bot", text: "Our Salted Caramel Volcano can be customized eggless! Select options at checkout.", timestamp: "Yesterday" }
    ],
    templates: [
      { id: "t1", name: "Order Placed", body: "Hi {customer}, your delicious {product} is in the oven! Status: {status}." }
    ]
  }
};

export const TenantProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState(() => {
    try {
      const saved = localStorage.getItem('saas_businesses');
      return saved ? JSON.parse(saved) : initialBusinesses;
    } catch (e) {
      return initialBusinesses;
    }
  });

  const [activeBusinessId, setActiveBusinessId] = useState(() => {
    return localStorage.getItem('active_business_id') || 'cakeflow';
  });

  useEffect(() => {
    localStorage.setItem('saas_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('active_business_id', activeBusinessId);
  }, [activeBusinessId]);

  const activeBusiness = businesses[activeBusinessId] || businesses['cakeflow'];

  const selectBusiness = (id) => {
    if (businesses[id]) {
      setActiveBusinessId(id);
    }
  };

  const subscribeToBusiness = (businessId, features = [], msgLimit = 200) => {
    setBusinesses(prev => {
      if (!prev[businessId]) return prev;
      return {
        ...prev,
        [businessId]: {
          ...prev[businessId],
          isSubscribed: true,
          subscription: 'Custom Plan',
          whatsappMessagesCount: msgLimit,
          additionalFeatures: features
        }
      };
    });
    alert(`🎉 Successfully subscribed to ${businesses[businessId]?.name || businessId} operator plan! Gated Admin Panel is now unlocked.`);
  };

  const createBusiness = (businessData) => {
    const newId = businessData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Seed default custom fields based on category
    let defaultFields = [];
    let defaultProducts = [];
    let defaultOrders = [];

    if (businessData.category === "Cake") {
      defaultFields = [
        { id: "flavor", name: "Select Flavor", type: "Dropdown", options: ["Chocolate", "Red Velvet", "Vanilla", "Pineapple"], required: true },
        { id: "weight", name: "Select Weight", type: "Dropdown", options: ["0.5kg", "1kg", "2kg"], required: true },
        { id: "message", name: "Message on Cake", type: "Text", required: false, placeholder: "e.g. Happy Bday!" }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Belgian Chocolate Dream", price: "₹999", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Chocolate", desc: "Melted Belgian chocolate cream." }
      ];
      defaultOrders = [
        { id: `CF-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "₹999", status: "Baking", payment: "Paid", email: "client@example.com", customFields: { flavor: "Chocolate", weight: "1kg", message: "Hello SaaS!" }, items: [{ name: "Belgian Chocolate Dream", price: "₹999", quantity: 1 }] }
      ];
    } else if (businessData.category === "Shoes") {
      defaultFields = [
        { id: "size", name: "Select Size", type: "Dropdown", options: ["7", "8", "9", "10"], required: true },
        { id: "color", name: "Color", type: "Dropdown", options: ["Black", "White", "Gray"], required: true }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Vapor Runner Elite", price: "₹5499", rating: 4.9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", category: "Runners", desc: "Super responsive foam sole." }
      ];
      defaultOrders = [
        { id: `SH-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "₹5499", status: "Packed", payment: "Paid", email: "client@example.com", customFields: { size: "9", color: "White" }, items: [{ name: "Vapor Runner Elite", price: "₹5499", quantity: 1 }] }
      ];
    } else if (businessData.category === "Clothing" || businessData.category === "Fashion") {
      defaultFields = [
        { id: "size", name: "Select Size", type: "Dropdown", options: ["XS", "S", "M", "L", "XL"], required: true },
        { id: "color", name: "Select Color", type: "Dropdown", options: ["Creamy Off-White", "Charcoal Black", "Soft Sage", "Vintage Indigo"], required: true },
        { id: "fit", name: "Fit Style", type: "Dropdown", options: ["Oversized", "Slim Fit", "Relaxed Fit"], required: true },
        { id: "monogram", name: "Custom Monogram", type: "Text", required: false, placeholder: "e.g. R.D." }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Classic Organic Tee", price: "₹1499", rating: 4.8, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", category: "Essentials", desc: "Mid-weight organic cotton tee with a perfect premium drape." }
      ];
      defaultOrders = [
        { id: `CL-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "₹1499", status: "Packed", payment: "Paid", email: "client@example.com", customFields: { size: "M", color: "Creamy Off-White", fit: "Relaxed Fit" }, items: [{ name: "Classic Organic Tee", price: "₹1499", quantity: 1 }] }
      ];
    } else if (businessData.category === "Accessories") {
      defaultFields = [
        { id: "metal", name: "Metal Finish", type: "Dropdown", options: ["Silver", "Yellow Gold"], required: true }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Infinite Band Ring", price: "₹1200", rating: 4.7, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80", category: "Rings", desc: "Crafted with 92.5 pure silver." }
      ];
      defaultOrders = [
        { id: `AC-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "₹1200", status: "Shipped", payment: "Paid", email: "client@example.com", customFields: { metal: "Silver" }, items: [{ name: "Infinite Band Ring", price: "₹1200", quantity: 1 }] }
      ];
    } else if (businessData.category === "Handmade") {
      defaultFields = [
        { id: "notes", name: "Customization Instructions", type: "Text", required: true, placeholder: "Add your unique touch notes" }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Eco Clay Plant Pot", price: "₹899", rating: 5.0, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", category: "Clay", desc: "A breathable, handmade planter." }
      ];
      defaultOrders = [
        { id: `HM-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "₹899", status: "In Progress", payment: "Paid", email: "client@example.com", customFields: { notes: "Please paint blue spirals." }, items: [{ name: "Eco Clay Plant Pot", price: "₹899", quantity: 1 }] }
      ];
    } else {
      defaultFields = [
        { id: "customNotes", name: "Specification Details", type: "Text", required: false }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Signature Custom Mystery Box", price: "₹2499", rating: 4.8, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80", category: "Gifting", desc: "A custom compiled set based on your theme choice." }
      ];
      defaultOrders = [
        { id: `CS-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "₹2499", status: "Preparing", payment: "Paid", email: "client@example.com", customFields: { customNotes: "Gothic themed box" }, items: [{ name: "Signature Custom Mystery Box", price: "₹2499", quantity: 1 }] }
      ];
    }

    const newBusiness = {
      id: newId,
      name: businessData.name,
      category: businessData.category,
      theme: businessData.theme || "Modern",
      subscription: "Custom Plan",
      isSubscribed: businessData.isSubscribed !== undefined ? businessData.isSubscribed : true, // default to true since they pay in onboarding
      messagesUsed: 0,
      topUpMessages: businessData.topUpMessages || 0,
      whatsappNumber: businessData.whatsappNumber || "+91 98765 00000",
      instagramUsername: businessData.instagramUsername || newId,
      deliveryProvider: "Manual",
      automationChannel: businessData.automationChannel || "WhatsApp",
      perMessageCost: businessData.automationChannel === "Instagram" ? 0.40 : businessData.automationChannel === "WhatsApp + Instagram" ? 0.90 : 0.60,
      brandColor: businessData.brandColor || "#4F46E5",
      tagline: businessData.tagline || "",
      preferredStyle: businessData.preferredStyle || "",
      targetAudience: businessData.targetAudience || "",
      preferredLayout: businessData.preferredLayout || "",
      additionalFeatures: businessData.additionalFeatures || [],
      customRequirements: businessData.customRequirements || "",
      whatsappMessagesCount: businessData.whatsappMessagesCount || 200,
      fields: businessData.fields || defaultFields,
      products: defaultProducts,
      orders: defaultOrders,
      chats: [
        { id: 1, sender: "bot", text: `Welcome to ${businessData.name}! Feel free to browse our products and place custom orders.`, timestamp: "12:00 PM" }
      ],
      templates: [
        { id: "t1", name: "Order Placed", body: "Hello {customer}! We received your order for {product}. Thank you!" }
      ]
    };

    setBusinesses(prev => ({
      ...prev,
      [newId]: newBusiness
    }));

    setActiveBusinessId(newId);
    return newId;
  };

  const updateBusiness = (id, updatedFields) => {
    setBusinesses(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          ...updatedFields
        }
      };
    });
  };

  const addProduct = (businessId, product) => {
    setBusinesses(prev => {
      const biz = prev[businessId];
      if (!biz) return prev;
      const newProduct = {
        id: Date.now(),
        ...product
      };
      return {
        ...prev,
        [businessId]: {
          ...biz,
          products: [...biz.products, newProduct]
        }
      };
    });
  };

  const deleteProduct = (businessId, productId) => {
    setBusinesses(prev => {
      const biz = prev[businessId];
      if (!biz) return prev;
      return {
        ...prev,
        [businessId]: {
          ...biz,
          products: biz.products.filter(p => p.id !== productId)
        }
      };
    });
  };

  const editProduct = (businessId, updatedProduct) => {
    setBusinesses(prev => {
      const biz = prev[businessId];
      if (!biz) return prev;
      return {
        ...prev,
        [businessId]: {
          ...biz,
          products: biz.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        }
      };
    });
  };

  const addOrder = (businessId, order) => {
    const biz = businesses[businessId];
    const prefix = businessId === 'cakeflow' ? 'CF' : 
                   businessId === 'fastfoot' ? 'SH' : 
                   businessId === 'rose-gold' ? 'AC' : 
                   businessId === 'crafty' ? 'HM' : 
                   businessId === 'threads-co' ? 'CL' : 
                   (biz?.category === 'Clothing' ? 'CL' : 'CS');
    const orderId = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Placed",
      payment: "Paid",
      ...order
    };

    setBusinesses(prev => {
      const biz = prev[businessId];
      if (!biz) return prev;
      return {
        ...prev,
        [businessId]: {
          ...biz,
          orders: [newOrder, ...biz.orders]
        }
      };
    });

    // Simulate WhatsApp Message
    sendAutomatedMessage(businessId, newOrder);

    return orderId;
  };

  const updateOrderStatus = (businessId, orderId, newStatus) => {
    setBusinesses(prev => {
      const biz = prev[businessId];
      if (!biz) return prev;
      return {
        ...prev,
        [businessId]: {
          ...biz,
          orders: biz.orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
        }
      };
    });
  };

  const addChatMessage = (businessId, message) => {
    setBusinesses(prev => {
      const biz = prev[businessId];
      if (!biz) return prev;
      const newMsg = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        ...message
      };
      const isBot = message.sender === 'bot';
      return {
        ...prev,
        [businessId]: {
          ...biz,
          messagesUsed: (biz.messagesUsed || 0) + (isBot ? 1 : 0),
          chats: [...biz.chats, newMsg]
        }
      };
    });

    // Trigger AI chatbot reply simulation
    if (message.sender === 'customer') {
      setTimeout(() => {
        simulateBotReply(businessId, message.text);
      }, 1500);
    }
  };

  const simulateBotReply = (businessId, customerText) => {
    let reply = "Thanks for your message! Our team will get back to you shortly.";
    const txt = customerText.toLowerCase();

    if (txt.includes('price') || txt.includes('cost')) {
      reply = "Our prices are fully displayed on our catalog! Let me know if you want custom details.";
    } else if (txt.includes('shipping') || txt.includes('delivery')) {
      reply = "We offer premium express delivery. Standard packing usually takes 1-2 days.";
    } else if (txt.includes('sizes') || txt.includes('size')) {
      reply = "Sizes fit true to standard size charts. You can customize dimensions during checkout.";
    } else if (txt.includes('custom') || txt.includes('customize')) {
      reply = "Absolutely! You can choose custom fields for every product when adding to the cart.";
    }

    addChatMessage(businessId, { sender: 'bot', text: reply });
  };

  const sendAutomatedMessage = (businessId, order) => {
    const biz = businesses[businessId];
    if (!biz) return;
    const customer = order.customer;
    const product = order.items && order.items.length > 0 ? order.items[0].name : "Custom Item";
    const template = biz.templates && biz.templates[0] ? biz.templates[0].body : `Hello {customer}! We received your order for {product}. Thank you!`;

    const formattedMsg = template
      .replace('{customer}', customer)
      .replace('{product}', product)
      .replace('{status}', order.status)
      .replace('{size}', order.customFields?.size || "standard")
      .replace('{metal}', order.customFields?.metal || "standard");

    addChatMessage(businessId, { sender: 'bot', text: `[AUTOMATED WHATSAPP SEND TO ${order.email || 'Customer'}]: "${formattedMsg}"` });
  };

  const topUpMessageQuota = (businessId, amount) => {
    setBusinesses(prev => {
      const biz = prev[businessId];
      if (!biz) return prev;
      return {
        ...prev,
        [businessId]: {
          ...biz,
          topUpMessages: (biz.topUpMessages || 0) + amount
        }
      };
    });
  };

  return (
    <TenantContext.Provider value={{
      businesses,
      activeBusinessId,
      activeBusiness,
      selectBusiness,
      createBusiness,
      updateBusiness,
      subscribeToBusiness,
      addProduct,
      deleteProduct,
      editProduct,
      addOrder,
      updateOrderStatus,
      addChatMessage,
      sendAutomatedMessage,
      topUpMessageQuota,
      PLAN_LIMITS
    }}>
      {children}
    </TenantContext.Provider>
  );
};

export const PLAN_LIMITS = {
  "Free": { orders: 15, messages: 100 },
  "Basic": { orders: 100, messages: 1000 },
  "Pro": { orders: 500, messages: 5000 },
  "Premium": { orders: 2500, messages: 25000 },
  "Enterprise": { orders: Infinity, messages: Infinity }
};
