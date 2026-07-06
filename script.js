// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact form submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.\n\nYour safety matters to us!`);
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.card, .prevention-item, .emergency-card, .wildfire-item, .resource-card, .contact-info').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed for future expansion)
const navToggle = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks?.classList.toggle('active');
};

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add styling for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        color: var(--secondary-color);
        border-bottom: 2px solid var(--secondary-color);
    }
`;
document.head.appendChild(navStyle);

// Emergency alert banner (optional enhancement)
function checkFireSeason() {
    const month = new Date().getMonth();
    // Typically fire season is June-October (months 5-9)
    if (month >= 5 && month <= 9) {
        const banner = document.createElement('div');
        banner.style.cssText = `
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 1rem;
            text-align: center;
            font-weight: bold;
            font-size: 1.1rem;
            z-index: 999;
            animation: slideDown 0.5s ease;
        `;
        banner.innerHTML = '⚠️ <strong>Fire Season Alert:</strong> Be extra cautious with fire safety during peak wildfire season!';
        document.body.insertBefore(banner, document.body.firstChild);
    }
}

// Uncomment to enable seasonal alert
// checkFireSeason();

// Add keyboard accessibility for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            btn.click();
        }
    });
});

// Log page analytics (for future integration)
console.log('🔥 FireSafe Website Loaded');
console.log('Emergency: Call 911');
console.log('Remember: Don\'t Start Fires - Respect Fire\'s Power');

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
