document.documentElement.classList.add('js');

// ========== GLOBAL ERROR HANDLER ==========
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // Could send this to a logging service in production
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showErrorNotification('Something went wrong. Please try again.');
    event.preventDefault();
});

// ========== ERROR NOTIFICATION FUNCTION ==========
function showErrorNotification(message) {
    try {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #d32f2f;
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            z-index: 10000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            max-width: 400px;
            animation: slideIn 0.3s ease-in-out;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            try {
                notification.remove();
            } catch (e) {
                console.error('Error removing notification:', e);
            }
        }, 4000);
    } catch (e) {
        console.error('Error showing notification:', e);
    }
}

// ========== ADD ANIMATION STYLES ==========
try {
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
        img {
            onerror: function() {
                this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%23999%22%3EImage not found%3C/text%3E%3C/svg%3E';
            }
        }
    `;
    document.head.appendChild(style);
} catch (e) {
    console.error('Error adding styles:', e);
}
// =========================
// MOBILE HAMBURGER MENU
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("nav-links");

    if (!hamburger || !nav) {
        console.error("Mobile menu button or navigation not found.");
        return;
    }

    hamburger.addEventListener("click", function () {

        nav.classList.toggle("active");
        hamburger.classList.toggle("active");

    });

});

// ========== EXPLORE BUTTON WITH ERROR HANDLING ==========
try {
    const exploreBtn = document.getElementById("explore-btn");
    const exploreOptions = document.getElementById("explore-options");
    
    if (!exploreBtn) {
        console.warn('explore-btn element not found');
    } else if (!exploreOptions) {
        console.warn('explore-options element not found');
    } else {
        exploreBtn.addEventListener("click", function () {
            try {
                exploreOptions.classList.toggle("show");
            } catch (e) {
                console.error('Error toggling explore options:', e);
                showErrorNotification('Error opening menu');
            }
        });
    }
} catch (e) {
    console.error('Error setting up explore button:', e);
}

// ========== HOME LINK SCROLL HANDLER WITH ERROR HANDLING ==========
try {
    const homeLink = document.querySelector(".home-link");
    
    if (!homeLink) {
        console.warn('home-link element not found');
    } else {
        window.addEventListener("scroll", () => {
            try {
                if (window.scrollY > 300) {
                    homeLink.classList.add("show-home");
                } else {
                    homeLink.classList.remove("show-home");
                }
            } catch (e) {
                console.error('Error handling scroll event:', e);
            }
        });
    }
} catch (e) {
    console.error('Error setting up scroll handler:', e);
}

// ========== IMAGE ERROR HANDLING ==========
document.addEventListener('DOMContentLoaded', () => {
    try {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            try {
                img.addEventListener('error', function(e) {
                    console.warn('Image failed to load:', this.src);
                    this.style.backgroundColor = '#f0f0f0';
                    this.alt = this.alt || 'Image not available';
                });
                
                img.addEventListener('load', function() {
                    // Image loaded successfully
                });
            } catch (e) {
                console.error('Error setting up image error handler:', e);
            }
        });
    } catch (e) {
        console.error('Error setting up image handlers:', e);
    }
});

// ========== SCROLL REVEAL ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    const revealSelectors = [
        'header',
        'footer',
        '.section-title',
        '.about-image',
        '.about-content',
        '.menu-card',
        '.gallery-track img',
        '.review-card',
        '.info-box',
        '.food-card',
        '.category-card'
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(','));
    const staggerElements = document.querySelectorAll(
        '.menu-card, .review-card, .info-box, .food-card, .category-card'
    );

    revealElements.forEach((element) => {
        if (element.tagName === 'IMG') {
            element.classList.add('scroll-animate-img');
        } else if (!element.classList.contains('menu-card') &&
                   !element.classList.contains('review-card') &&
                   !element.classList.contains('info-box') &&
                   !element.classList.contains('food-card') &&
                   !element.classList.contains('category-card')) {
            element.classList.add('scroll-animate');
        }
    });

    staggerElements.forEach((element, index) => {
        element.classList.add('scroll-stagger');
        element.style.transitionDelay = `${(index % 3) * 100}ms`;
    });

    const animatedElements = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-img, .scroll-stagger'
    );

    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach((element) => element.classList.add('show'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('show', entry.isIntersecting);
        });
    }, {
        threshold:0.12,
        rootMargin:'0px 0px -80px 0px'
    });

    animatedElements.forEach((element) => observer.observe(element));
});

// ========== FORM VALIDATION WITH ERROR HANDLING ==========
function validateForm(formElement) {
    try {
        if (!formElement) {
            console.warn('Form element not provided');
            return false;
        }
        
        const inputs = formElement.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            try {
                // Remove previous error styling
                input.classList.remove('input-error');
                
                // Validate required fields
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('input-error');
                    isValid = false;
                    console.warn('Required field empty:', input.name);
                }
                
                // Validate email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('input-error');
                        isValid = false;
                        console.warn('Invalid email:', input.value);
                    }
                }
                
                // Validate phone
                if (input.type === 'tel' && input.value.trim()) {
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                        input.classList.add('input-error');
                        isValid = false;
                        console.warn('Invalid phone:', input.value);
                    }
                }
            } catch (e) {
                console.error('Error validating input:', e, input);
            }
        });
        
        return isValid;
    } catch (e) {
        console.error('Error validating form:', e);
        showErrorNotification('Error validating form');
        return false;
    }
}

// ========== FETCH WITH ERROR HANDLING ==========
async function safeFetch(url, options = {}) {
    try {
        if (!url) {
            throw new Error('URL is required');
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Fetch error:', error);
        showErrorNotification(`Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// ========== LOCAL STORAGE WITH ERROR HANDLING ==========
function safeGetFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error reading from storage:', e);
        return defaultValue;
    }
}

function safeSetToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Error writing to storage:', e);
        if (e.name === 'QuotaExceededError') {
            showErrorNotification('Storage limit exceeded');
        }
        return false;
    }
}

// ========== DOCUMENT READY CHECK ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Document ready - all error handlers initialized');
    });
} else {
    console.log('Document already ready - all error handlers initialized');
}


function toggleVisit() {

    const visitBox = document.querySelector(".visit-box");

    visitBox.classList.toggle("active");

}

function showMoreDishes() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const extraDishes = document.querySelectorAll('.extra-dishes');

    if (!viewMoreBtn || !extraDishes.length) {
        return;
    }

    extraDishes.forEach((dish) => {
        dish.style.display = 'block';
    });

    viewMoreBtn.style.display = 'none';
}

