// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Hopping Frog Back to Top Button
const frogButton = document.getElementById('frog-top');
const frogSound = document.getElementById('frogSound');
let isHopping = false;

// Make frog hop to top
frogButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (isHopping) return;
    isHopping = true;
    
    // Play frog sound
    frogSound.currentTime = 0;
    frogSound.play();
    
    // Add hop animation
    const frogImg = frogButton.querySelector('img');
    frogImg.style.animation = 'none';
    void frogImg.offsetWidth; // Trigger reflow
    frogImg.style.animation = 'frogHop 0.8s ease, frogHopSpin 0.8s ease';
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Reset after animation
    setTimeout(() => {
        frogImg.style.animation = '';
        isHopping = false;
    }, 800);
});
// Show/hide frog based on scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        frogButton.classList.add('visible');
    } else {
        frogButton.classList.remove('visible');
    }
});

// Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Set active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});