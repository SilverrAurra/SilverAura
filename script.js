// ============================================
// SILVER AURA - JAVASCRIPT FUNCTIONALITY
// ============================================

// Product Data
const products = [
    {
        id: 1,
        name: "Elegant Silver Ring",
        category: "rings",
        price: 1250,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        description: "Beautiful sterling silver ring with intricate details"
    },
    {
        id: 2,
        name: "Gold Plated Bracelet",
        category: "bracelets",
        price: 1890,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
        description: "Stunning gold plated bracelet with charm accents"
    },
    {
        id: 3,
        name: "Pearl Pendant Necklace",
        category: "necklaces",
        price: 2450,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
        description: "Elegant pearl pendant on fine silver chain"
    },
    {
        id: 4,
        name: "Diamond Accent Ring",
        category: "rings",
        price: 3200,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
        description: "Gorgeous ring with diamond accents"
    },
    {
        id: 5,
        name: "Charm Bracelet Set",
        category: "bracelets",
        price: 2100,
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        description: "Complete charm bracelet with multiple charms"
    },
    {
        id: 6,
        name: "Crystal Drop Earrings",
        category: "necklaces",
        price: 1650,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
        description: "Beautiful crystal drop design"
    },
    {
        id: 7,
        name: "Rose Gold Ring",
        category: "rings",
        price: 1800,
        image: "https://images.unsplash.com/photo-1602751584552-8ba43d5f38ff?w=400&h=400&fit=crop",
        description: "Modern rose gold plated ring"
    },
    {
        id: 8,
        name: "Tennis Bracelet",
        category: "bracelets",
        price: 4500,
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop",
        description: "Classic tennis bracelet with brilliant stones"
    }
];

// Cart Data
let cart = [];

// ============================================
// INITIALIZATION
// ============================================

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCartUI();
});

// ============================================
// PRODUCT FUNCTIONS
// ============================================

function renderProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    
    // Filter products by category
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    // Generate product HTML
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-shopping-bag"></i> Add to Bag
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-price">EGP ${product.price.toLocaleString()}</span>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Render filtered products
    renderProducts(category);
}

// ============================================
// CART FUNCTIONS
// ============================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to bag!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-shopping-bag"></i>
                <p>Your bag is empty</p>
            </div>
        `;
        cartTotal.textContent = 'EGP 0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">EGP ${item.price.toLocaleString()}</span>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `EGP ${total.toLocaleString()}`;
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const body = document.body;
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    body.classList.toggle('cart-open');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your bag is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Create WhatsApp message
    let message = `Hello Silver Aura! 👋\n\nI'd like to order:\n\n`;
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} = EGP ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\nTotal: EGP ${total.toLocaleString()}\n\nPlease confirm my order. Thank you!`;
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '201234567890'; // Replace with actual number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    showNotification('Redirecting to WhatsApp to complete your order!');
}

// ============================================
// CONTACT FORM
// ============================================

function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const interest = form.querySelector('select').value;
    const message = formData.get('message');
    
    // Create WhatsApp message for inquiry
    let whatsappMessage = `Hello Silver Aura! 👋\n\nNew inquiry from:\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Email: ${email}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    whatsappMessage += `Interested in: ${interest}\n\n`;
    whatsappMessage += `Message: ${message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '201234567890'; // Replace with actual number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    showNotification('Redirecting to WhatsApp to send your message!');
    form.reset();
}

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    mobileBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fa-solid fa-times"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.product-card, .feature-card, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initial styles for scroll animation
document.querySelectorAll('.product-card, .feature-card, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

// Add more products CSS dynamically
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* ============================================
       FEATURES SECTION
       ============================================ */
    
    .features {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        padding: 80px 40px;
        background: var(--off-white);
        max-width: 1400px;
        margin: 0 auto;
    }
    
    .feature-card {
        background: var(--white);
        padding: 40px 30px;
        text-align: center;
        border-radius: 10px;
        box-shadow: var(--shadow);
        transition: var(--transition);
    }
    
    .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-hover);
    }
    
    .feature-card i {
        font-size: 40px;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .feature-card h3 {
        font-size: 18px;
        margin-bottom: 10px;
        color: var(--secondary-color);
    }
    
    .feature-card p {
        font-size: 14px;
        color: var(--text-light);
    }
    
    /* ============================================
       PRODUCTS SECTION
       ============================================ */
    
    .products {
        padding: 100px 40px;
        max-width: 1400px;
        margin: 0 auto;
    }
    
    .section-header {
        text-align: center;
        margin-bottom: 60px;
    }
    
    .section-subtitle {
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 3px;
        color: var(--primary-color);
        margin-bottom: 15px;
    }
    
    .section-title {
        font-size: 42px;
        color: var(--secondary-color);
        margin-bottom: 15px;
    }
    
    .section-description {
        font-size: 16px;
        color: var(--text-light);
        max-width: 600px;
        margin: 0 auto;
    }
    
    .category-filter {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 50px;
    }
    
    .filter-btn {
        padding: 12px 30px;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 2px solid var(--border-color);
        background: var(--white);
        color: var(--text-color);
        border-radius: 30px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--white);
    }
    
    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 30px;
    }
    
    .product-card {
        background: var(--white);
        border-radius: 15px;
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
    }
    
    .product-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-hover);
    }
    
    .product-image {
        position: relative;
        overflow: hidden;
        height: 300px;
    }
    
    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
    }
    
    .product-card:hover .product-image img {
        transform: scale(1.1);
    }
    
    .add-to-cart-btn {
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: var(--white);
        border: none;
        padding: 15px 30px;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        transition: var(--transition);
        width: 100%;
    }
    
    .product-card:hover .add-to-cart-btn {
        bottom: 0;
    }
    
    .add-to-cart-btn:hover {
        background: var(--primary-dark);
    }
    
    .product-info {
        padding: 25px;
    }
    
    .product-category {
        font-size