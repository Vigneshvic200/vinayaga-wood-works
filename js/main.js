// Products data
const products = [
    {
        id: 1,
        name: "Royal Velvet Sofa Set",
        category: "living",
        price: "Rs 45,000",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
        description: "Luxurious 3+2+1 seater sofa set with premium velvet upholstery"
    },
    {
        id: 2,
        name: "Solid Wood Dining Table",
        category: "dining",
        price: "Rs 35,000",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
        description: "6-seater sheesham wood dining table with cushioned chairs"
    },
    {
        id: 3,
        name: "King Size Bed with Storage",
        category: "bedroom",
        price: "Rs 55,000",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
        description: "Elegant king size bed with hydraulic storage and headboard"
    },
    {
        id: 4,
        name: "Modular Wardrobe",
        category: "bedroom",
        price: "Rs 75,000",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
        description: "Custom modular wardrobe with sliding doors and organizer"
    },
    {
        id: 5,
        name: "Executive Office Desk",
        category: "office",
        price: "Rs 25,000",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
        description: "Premium executive desk with drawer unit and cable management"
    },
    {
        id: 6,
        name: "L-Shape Sofa Cum Bed",
        category: "living",
        price: "Rs 38,000",
        image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&q=80",
        description: "Versatile L-shape sofa that converts to a comfortable bed"
    }
];

// DOM Elements initialization
let cursor = null;
let menuBtn = null;
let closeMenuBtn = null;
let mobileMenu = null;
let menuOverlay = null;
let filterBtns = null;
let productsGrid = null;
let contactForm = null;

// Initialize all DOM elements after page loads
document.addEventListener('DOMContentLoaded', function() {
    cursor = document.getElementById('cursor');
    menuBtn = document.getElementById('menuBtn');
    closeMenuBtn = document.getElementById('closeMenu');
    mobileMenu = document.getElementById('mobileMenu');
    menuOverlay = document.getElementById('menuOverlay');
    filterBtns = document.querySelectorAll('.filter-btn');
    productsGrid = document.getElementById('productsGrid');
    contactForm = document.getElementById('contactForm');

    // Initialize all features
    initCursor();
    initMobileMenu();
    initProducts();
    initScrollAnimations();
    initFilterButtons();
    initContactForm();
});

// Cursor follower
function initCursor() {
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .gallery-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// Mobile menu
function initMobileMenu() {
    if (!menuBtn || !closeMenuBtn || !mobileMenu || !menuOverlay) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Render products
function renderProducts(filter = 'all') {
    if (!productsGrid) return;

    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    productsGrid.innerHTML = filteredProducts.map((product, index) => `
        <div class="product-card animate-on-scroll delay-${index % 4}" data-category="${product.category}">
            <div class="overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            </div>
            <div class="p-6">
                <span class="text-xs font-semibold text-accent uppercase tracking-wider">${product.category}</span>
                <h3 class="font-display text-xl font-bold mt-2 mb-2">${product.name}</h3>
                <p class="text-muted text-sm mb-4">${product.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-wood-dark">${product.price}</span>
                    <a href="https://wa.me/918754631305?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.price)}).%20Please%20share%20more%20details." 
                       target="_blank"
                       class="flex items-center gap-2 text-accent font-semibold hover:text-accent-light transition-colors">
                        <span>Get Quote</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Re-init scroll animations for new elements
    initScrollAnimations();
}

// Initialize products
function initProducts() {
    renderProducts();
}

// Filter buttons
function initFilterButtons() {
    if (!filterBtns) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-accent', 'text-white', 'border-accent');
                b.classList.add('bg-transparent', 'text-fg', 'border-border');
            });
            btn.classList.add('active', 'bg-accent', 'text-white', 'border-accent');
            btn.classList.remove('bg-transparent', 'text-fg', 'border-border');

            // Filter products
            const filter = btn.dataset.filter;
            renderProducts(filter);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Contact form
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const interest = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;

        const whatsappMessage = `Hi! My name is ${name}.%0A%0APhone: ${phone}%0A%0AInterest: ${interest}%0A%0AMessage: ${message}`;
        
        window.open(`https://wa.me/918754631305?text=${whatsappMessage}`, '_blank');
        
        contactForm.reset();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});