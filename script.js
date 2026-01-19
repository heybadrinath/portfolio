// ==========================================
// DOM Elements
// ==========================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// ==========================================
// Mobile Menu Toggle
// ==========================================
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking on a nav link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for mobile menu
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ==========================================
// Smooth Scrolling
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Only apply smooth scroll for anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// Navbar Background on Scroll
// ==========================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ==========================================
// Active Navigation Link on Scroll
// ==========================================
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const navbarHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ==========================================
// Scroll to Top Button
// ==========================================
function handleScrollTopButton() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', handleScrollTopButton);

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
}

// ==========================================
// Project Filtering
// ==========================================
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            // Add fade-in animation
            card.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Get filter category
        const filterCategory = this.getAttribute('data-filter');

        // Filter projects
        filterProjects(filterCategory);
    });
});

// ==========================================
// Contact Form Handling
// ==========================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Show success message (you can customize this)
        showNotification('Thank you! Your message has been sent successfully.', 'success');

        // Reset form
        contactForm.reset();

        // In a real application, you would send this data to a server
        // Example using fetch:
        /*
        fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showNotification('Oops! Something went wrong. Please try again.', 'error');
        });
        */
    });
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
    `;

    notification.querySelector('i').style.fontSize = '1.25rem';

    // Add to body
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==========================================
// Scroll Animations (Intersection Observer)
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.project-card, .about-card, .skill-category, .stat-item');

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ==========================================
// Typing Effect for Hero Section
// ==========================================
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');

    if (!typingText) return;

    const titles = [
        'Software Engineer',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(type, 1000);
}

// ==========================================
// Form Input Validation & Animations
// ==========================================
function initFormValidation() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        // Add focus/blur animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Real-time validation
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#48bb78';
            } else {
                this.style.borderColor = '';
            }
        });
    });
}

// ==========================================
// Add CSS for animations
// ==========================================
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// Keyboard Navigation
// ==========================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ==========================================
// External Links - Open in New Tab
// ==========================================
function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// ==========================================
// Lazy Loading Images
// ==========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Performance: Debounce Function
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedNavbarScroll = debounce(handleNavbarScroll, 10);
const debouncedActiveNavLink = debounce(setActiveNavLink, 10);
const debouncedScrollTopButton = debounce(handleScrollTopButton, 10);

window.addEventListener('scroll', debouncedNavbarScroll);
window.addEventListener('scroll', debouncedActiveNavLink);
window.addEventListener('scroll', debouncedScrollTopButton);

// ==========================================
// Initialize All Features on DOM Load
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully! 🚀');

    // Initialize all features
    addAnimationStyles();
    initScrollAnimations();
    initTypingEffect();
    initFormValidation();
    initKeyboardNavigation();
    initExternalLinks();
    initLazyLoading();

    // Set initial states
    handleNavbarScroll();
    setActiveNavLink();
    handleScrollTopButton();

    // Add loaded class for animations
    document.body.classList.add('loaded');
});

// ==========================================
// Handle Window Resize
// ==========================================
let windowWidth = window.innerWidth;

window.addEventListener('resize', debounce(function() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth > 768 && windowWidth <= 768) {
        closeMobileMenu();
    }
    windowWidth = window.innerWidth;
}, 250));

// ==========================================
// Service Worker Registration (Optional - for PWA)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
        */
    });
}

// ==========================================
// Console Message
// ==========================================
console.log('%c🎨 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cBuilt with ❤️ by Badrinath', 'font-size: 14px; color: #4a5568;');
console.log('%cInterested in the code? Check out the repository!', 'font-size: 12px; color: #718096;');
