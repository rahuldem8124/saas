import React, { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext();

export const useTenant = () => useContext(TenantContext);

const initialBusinesses = {
  "cakeflow": {
    id: "cakeflow",
    name: "CakeFlow Flagship",
    category: "Cake",
    theme: "Luxury",
    subscription: "Pro",
    isSubscribed: false,
    whatsappNumber: "+15550199",
    instagramUsername: "cakeflow_bakery",
    deliveryProvider: "Manual",
    fields: [
      { id: "flavor", name: "Select Flavor", type: "Dropdown", options: ["Chocolate Truffle", "Red Velvet", "Lemon Zest", "Vanilla Bean"], required: true },
      { id: "weight", name: "Select Weight", type: "Dropdown", options: ["0.5kg", "1kg", "2kg", "3kg"], required: true },
      { id: "message", name: "Message on Cake", type: "Text", required: false, placeholder: "e.g. Happy Birthday Rahul!" },
      { id: "deliveryDate", name: "Delivery Date", type: "Date picker", required: true },
      { id: "referenceImage", name: "Upload Custom Inspiration", type: "Upload", required: false }
    ],
    products: [
      { id: 1, name: "Velvet Rose Dream", price: "$45.00", rating: 4.9, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", category: "Birthday", desc: "A luxurious red velvet cake layered with cream cheese." },
      { id: 2, name: "Chocolate Truffle", price: "$38.00", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Best Seller", desc: "Decadent dark Belgian chocolate layers." },
      { id: 3, name: "Lemon Zest Bliss", price: "$42.00", rating: 4.7, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80", category: "Trending", desc: "Tangy sweet lemon cake with vanilla buttercream." },
      { id: 4, name: "Berry Vanilla Spark", price: "$50.00", rating: 5.0, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80", category: "Best Seller", desc: "Fresh organic seasonal berries and vanilla sponge." }
    ],
    orders: [
      { id: "CF-1001", customer: "Alice Green", date: "May 19, 2026", amount: "$38.00", status: "Baking", payment: "Paid", email: "alice@example.com", customFields: { flavor: "Chocolate Truffle", weight: "1kg", message: "Happy Birthday Rahul", deliveryDate: "2026-05-21" }, items: [{ name: "Chocolate Truffle", price: "$38.00", quantity: 1 }] }
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
    subscription: "Pro",
    isSubscribed: false,
    whatsappNumber: "+15559812",
    instagramUsername: "fastfoot_sneaks",
    deliveryProvider: "Shiprocket",
    fields: [
      { id: "size", name: "Select Size (US)", type: "Dropdown", options: ["7", "8", "9", "10", "11"], required: true },
      { id: "color", name: "Select Color", type: "Dropdown", options: ["Hyper Black", "Vanguard White", "Laser Red", "Cobalt Blue"], required: true },
      { id: "material", name: "Material Lining", type: "Dropdown", options: ["Premium Full Leather", "Breathable Mesh", "Urban Suede"], required: true }
    ],
    products: [
      { id: 201, name: "Nike Air HyperMax", price: "$120.00", rating: 4.9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", category: "Runners", desc: "Responsive cushioning for modern city explorers." },
      { id: 202, name: "Retro Urban Lows", price: "$95.00", rating: 4.7, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80", category: "Classics", desc: "Classic 90s silhouette wrapped in full-grain leather." },
      { id: 203, name: "Zen Breathable V3", price: "$110.00", rating: 4.8, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80", category: "Athletic", desc: "Engineered mesh design optimized for ultra-cool runs." }
    ],
    orders: [
      { id: "SH-2001", customer: "Marcus Vance", date: "May 19, 2026", amount: "$120.00", status: "Packed", payment: "Paid", email: "marcus@example.com", customFields: { size: "9", color: "Hyper Black", material: "Breathable Mesh" }, items: [{ name: "Nike Air HyperMax", price: "$120.00", quantity: 1 }] }
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
    subscription: "Basic",
    isSubscribed: false,
    whatsappNumber: "+15554321",
    instagramUsername: "rosegold_atelier",
    deliveryProvider: "Delhivery",
    fields: [
      { id: "metal", name: "Metal Polish", type: "Dropdown", options: ["18k Rose Gold", "24k Yellow Gold", "925 Sterling Silver"], required: true },
      { id: "engraving", name: "Custom Engraving Message", type: "Text", required: false, placeholder: "e.g. Forever & Always" },
      { id: "style", name: "Chain Link Style", type: "Dropdown", options: ["Classic Cable", "Dainty Box", "Sleek Figarol"], required: true }
    ],
    products: [
      { id: 301, name: "Minimalist Silver Link", price: "$65.00", rating: 4.8, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80", category: "Bracelets", desc: "A timeless hand-made linked bracelet for daily stacking." },
      { id: 302, name: "Celestial Hoop Set", price: "$35.00", rating: 4.6, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80", category: "Earrings", desc: "Delicate stellar constellation etched hoop design." }
    ],
    orders: [
      { id: "AC-3001", customer: "Diana Prince", date: "May 18, 2026", amount: "$65.00", status: "Shipped", payment: "Paid", email: "diana@example.com", customFields: { metal: "18k Rose Gold", engraving: "For D", style: "Classic Cable" }, items: [{ name: "Minimalist Silver Link", price: "$65.00", quantity: 1 }] }
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
    subscription: "Pro",
    isSubscribed: false,
    whatsappNumber: "+15556789",
    instagramUsername: "clay_and_co",
    deliveryProvider: "Porter",
    fields: [
      { id: "notes", name: "Customization Notes", type: "Text", required: true, placeholder: "e.g. Paint an anime character" },
      { id: "inspiration", name: "Reference Image", type: "Upload", required: false },
      { id: "wrap", name: "Include Gift Wrap?", type: "Dropdown", options: ["Standard Kraft Box", "Deluxe Ribbon Bow", "No Wrap"], required: true }
    ],
    products: [
      { id: 401, name: "Hand-Painted Clay Mug", price: "$25.00", rating: 4.9, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", category: "Ceramics", desc: "Double-glazed ceramic mug molded by hand." },
      { id: 402, name: "Woven Macrame Hanger", price: "$45.00", rating: 5.0, image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=400&q=80", category: "Decor", desc: "Boho plant hanger hand-knotted with recycled cotton." }
    ],
    orders: [
      { id: "HM-4001", customer: "Sarah Connor", date: "May 19, 2026", amount: "$25.00", status: "In Progress", payment: "Paid", email: "sarah@example.com", customFields: { notes: "Anime mug with Hunter X Hunter themes", wrap: "Deluxe Ribbon Bow" }, items: [{ name: "Hand-Painted Clay Mug", price: "$25.00", quantity: 1 }] }
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
    subscription: "Premium",
    isSubscribed: false,
    whatsappNumber: "+15551122",
    instagramUsername: "flex_customs",
    deliveryProvider: "Manual",
    fields: [
      { id: "customText", name: "Your Text", type: "Text", required: true, placeholder: "Add your personalized text" },
      { id: "colorPicker", name: "Accent Color", type: "Dropdown", options: ["Red", "Gold", "Pink", "Mint Green"], required: true }
    ],
    products: [
      { id: 501, name: "Custom Mystery Gift Set", price: "$75.00", rating: 4.8, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80", category: "Gifting", desc: "A custom compiled set based on your theme choice." }
    ],
    orders: [
      { id: "CS-5001", customer: "Bruce Wayne", date: "May 17, 2026", amount: "$75.00", status: "Preparing", payment: "Paid", email: "bruce@example.com", customFields: { customText: "W. Gothams", colorPicker: "Gold" }, items: [{ name: "Custom Mystery Gift Set", price: "$75.00", quantity: 1 }] }
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
    subscription: "Pro",
    isSubscribed: false,
    whatsappNumber: "+15555566",
    instagramUsername: "threads_co",
    deliveryProvider: "Delhivery",
    fields: [
      { id: "size", name: "Select Size", type: "Dropdown", options: ["XS", "S", "M", "L", "XL"], required: true },
      { id: "color", name: "Select Color", type: "Dropdown", options: ["Creamy Off-White", "Charcoal Black", "Soft Sage", "Vintage Indigo"], required: true },
      { id: "fit", name: "Fit Style", type: "Dropdown", options: ["Oversized", "Slim Fit", "Relaxed Fit"], required: true },
      { id: "monogram", name: "Custom Monogram (Initial)", type: "Text", required: false, placeholder: "e.g. R.D. (Max 5 letters)" }
    ],
    products: [
      { id: 601, name: "Vintage Denim Jacket", price: "$135.00", rating: 4.9, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80", category: "Jackets", desc: "Heavyweight selvedge denim jacket with a relaxed drop shoulder." },
      { id: 602, name: "Classic Organic Tee", price: "$35.00", rating: 4.8, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", category: "Essentials", desc: "Mid-weight organic cotton tee with a perfect premium drape." },
      { id: 603, name: "Premium Wash Hoodie", price: "$85.00", rating: 5.0, image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80", category: "Essentials", desc: "Ultra-soft French terry hoodie in a vintage washed finish." }
    ],
    orders: [
      { id: "CL-6001", customer: "Robert Downey", date: "May 19, 2026", amount: "$135.00", status: "Packed", payment: "Paid", email: "robert@example.com", customFields: { size: "M", color: "Vintage Indigo", fit: "Relaxed Fit", monogram: "RD" }, items: [{ name: "Vintage Denim Jacket", price: "$135.00", quantity: 1 }] }
    ],
    chats: [
      { id: 1, sender: "customer", text: "Is the hoodie oversized by design?", timestamp: "11:45 AM" },
      { id: 2, sender: "bot", text: "Yes! Our Premium Wash Hoodie has a drop shoulder, slightly cropped body, and oversized fit. We recommend ordering true-to-size.", timestamp: "11:46 AM" }
    ],
    templates: [
      { id: "t1", name: "Order Placed", body: "Hi {customer}, your order for {product} is confirmed! Fit: {fit}. Status: {status}." }
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

  const subscribeToBusiness = (businessId, tier = 'Pro') => {
    setBusinesses(prev => {
      if (!prev[businessId]) return prev;
      return {
        ...prev,
        [businessId]: {
          ...prev[businessId],
          isSubscribed: true,
          subscription: tier
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
        { id: Date.now() + 1, name: "Belgian Chocolate Dream", price: "$40.00", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Chocolate", desc: "Melted Belgian chocolate cream." }
      ];
      defaultOrders = [
        { id: `CF-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "$40.00", status: "Baking", payment: "Paid", email: "client@example.com", customFields: { flavor: "Chocolate", weight: "1kg", message: "Hello SaaS!" }, items: [{ name: "Belgian Chocolate Dream", price: "$40.00", quantity: 1 }] }
      ];
    } else if (businessData.category === "Shoes") {
      defaultFields = [
        { id: "size", name: "Select Size", type: "Dropdown", options: ["7", "8", "9", "10"], required: true },
        { id: "color", name: "Color", type: "Dropdown", options: ["Black", "White", "Gray"], required: true }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Vapor Runner Elite", price: "$110.00", rating: 4.9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", category: "Runners", desc: "Super responsive foam sole." }
      ];
      defaultOrders = [
        { id: `SH-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "$110.00", status: "Packed", payment: "Paid", email: "client@example.com", customFields: { size: "9", color: "White" }, items: [{ name: "Vapor Runner Elite", price: "$110.00", quantity: 1 }] }
      ];
    } else if (businessData.category === "Clothing") {
      defaultFields = [
        { id: "size", name: "Select Size", type: "Dropdown", options: ["XS", "S", "M", "L", "XL"], required: true },
        { id: "color", name: "Select Color", type: "Dropdown", options: ["Creamy Off-White", "Charcoal Black", "Soft Sage", "Vintage Indigo"], required: true },
        { id: "fit", name: "Fit Style", type: "Dropdown", options: ["Oversized", "Slim Fit", "Relaxed Fit"], required: true },
        { id: "monogram", name: "Custom Monogram", type: "Text", required: false, placeholder: "e.g. R.D." }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Classic Organic Tee", price: "$35.00", rating: 4.8, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", category: "Essentials", desc: "Mid-weight organic cotton tee with a perfect premium drape." }
      ];
      defaultOrders = [
        { id: `CL-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "$35.00", status: "Packed", payment: "Paid", email: "client@example.com", customFields: { size: "M", color: "Creamy Off-White", fit: "Relaxed Fit" }, items: [{ name: "Classic Organic Tee", price: "$35.00", quantity: 1 }] }
      ];
    } else if (businessData.category === "Accessories") {
      defaultFields = [
        { id: "metal", name: "Metal Finish", type: "Dropdown", options: ["Silver", "Yellow Gold"], required: true }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Infinite Band Ring", price: "$35.00", rating: 4.7, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80", category: "Rings", desc: "Crafted with 92.5 pure silver." }
      ];
      defaultOrders = [
        { id: `AC-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "$35.00", status: "Shipped", payment: "Paid", email: "client@example.com", customFields: { metal: "Silver" }, items: [{ name: "Infinite Band Ring", price: "$35.00", quantity: 1 }] }
      ];
    } else if (businessData.category === "Handmade") {
      defaultFields = [
        { id: "notes", name: "Customization Instructions", type: "Text", required: true, placeholder: "Add your unique touch notes" }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Eco Clay Plant Pot", price: "$20.00", rating: 5.0, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", category: "Clay", desc: "A breathable, handmade planter." }
      ];
      defaultOrders = [
        { id: `HM-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "$20.00", status: "In Progress", payment: "Paid", email: "client@example.com", customFields: { notes: "Please paint blue spirals." }, items: [{ name: "Eco Clay Plant Pot", price: "$20.00", quantity: 1 }] }
      ];
    } else {
      defaultFields = [
        { id: "customNotes", name: "Specification Details", type: "Text", required: false }
      ];
      defaultProducts = [
        { id: Date.now() + 1, name: "Signature Custom Mystery Box", price: "$50.00", rating: 4.8, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80", category: "Mystery", desc: "Surprises personalized just for you." }
      ];
      defaultOrders = [
        { id: `CS-${Date.now().toString().slice(-4)}`, customer: "Sample Client", date: "Today", amount: "$50.00", status: "Preparing", payment: "Paid", email: "client@example.com", customFields: { customNotes: "Gothic themed box" }, items: [{ name: "Signature Custom Mystery Box", price: "$50.00", quantity: 1 }] }
      ];
    }

    const newBusiness = {
      id: newId,
      name: businessData.name,
      category: businessData.category,
      theme: businessData.theme || "Modern",
      subscription: businessData.subscription || "Basic",
      isSubscribed: false, // Starts locked until subscribed
      whatsappNumber: businessData.whatsappNumber || "+15550000",
      instagramUsername: businessData.instagramUsername || newId,
      deliveryProvider: "Manual",
      fields: defaultFields,
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
      return {
        ...prev,
        [businessId]: {
          ...biz,
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
      sendAutomatedMessage
    }}>
      {children}
    </TenantContext.Provider>
  );
};
