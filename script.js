// Typing effect phrases
const phrases = [
    "that are fun",
    "solve random problems", 
    "late at night 🌙",
    "that scale 📈",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeWriter, typingSpeed);
}

// Scroll reveal animations
function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const elements = section.querySelectorAll(
            '.section-title, .section-subtitle, .about-content, .project-card, .fun-card, .contact-card, .skill-pill'
        );
        elements.forEach(el => el.classList.add('reveal'));
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Smooth scroll for nav links
function initSmoothScroll() {
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
}

// Navbar scroll effect
function initNavScroll() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

// Fun card hover sounds (optional - commented out for accessibility)
function initCardInteractions() {
    const funCards = document.querySelectorAll('.fun-card');
    
    funCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle haptic-like effect
            card.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });
}

// Skill pills random color on hover
function initSkillPills() {
    const colors = ['#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e', '#74b9ff'];
    const pills = document.querySelectorAll('.skill-pill');
    
    pills.forEach(pill => {
        pill.addEventListener('mouseenter', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            pill.style.background = randomColor;
            pill.style.borderColor = randomColor;
        });
        
        pill.addEventListener('mouseleave', () => {
            pill.style.background = '';
            pill.style.borderColor = '';
        });
    });
}

// Active nav link highlighting
function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Easter egg - Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

function initKonamiCode() {
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.filter = 'hue-rotate(180deg)';
    
    setTimeout(() => {
        document.body.style.filter = '';
    }, 3000);
    
    console.log('🎮 You found the easter egg! Nice one.');
}

// Console message
function logConsoleMessage() {
    console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold;');
    console.log('%cThanks for checking out my site!', 'font-size: 14px; color: #6c5ce7;');
    console.log('%cFeel free to reach out if you want to chat 💬', 'font-size: 14px; color: #666;');
    console.log('%c🎮 Psst... try the Konami code', 'font-size: 12px; color: #999; font-style: italic;');
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
    
    initScrollReveal();
    initSmoothScroll();
    initNavScroll();
    initCardInteractions();
    initSkillPills();
    initActiveNav();
    initKonamiCode();
    logConsoleMessage();
});
