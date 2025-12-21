// Smooth scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const children = section.querySelectorAll('.section-title, .section-subtitle, .project-card, .experience-item, .skill-category, .resume-card, .contact-card');
        children.forEach(child => child.classList.add('reveal'));
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Stagger animation for grid items
    const staggerElements = document.querySelectorAll('.project-card, .skill-category, .contact-card');
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 11, 0.8)';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
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

    // Add hover effect to project cards - tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Typing effect for code block (optional enhancement)
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        const originalHTML = codeContent.innerHTML;
        const text = codeContent.textContent;
        
        // Only run typing effect on first load
        if (!sessionStorage.getItem('codeTyped')) {
            codeContent.innerHTML = '';
            let i = 0;
            
            function typeWriter() {
                if (i < originalHTML.length) {
                    // Handle HTML tags
                    if (originalHTML[i] === '<') {
                        const closingIndex = originalHTML.indexOf('>', i);
                        codeContent.innerHTML += originalHTML.substring(i, closingIndex + 1);
                        i = closingIndex + 1;
                    } else {
                        codeContent.innerHTML += originalHTML[i];
                        i++;
                    }
                    setTimeout(typeWriter, 15);
                } else {
                    sessionStorage.setItem('codeTyped', 'true');
                }
            }
            
            setTimeout(typeWriter, 800);
        }
    }

    // Active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionElements = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--text-primary)';
            }
        });
    });

    // Console Easter egg
    console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold;');
    console.log('%cThanks for checking out my portfolio. Feel free to reach out!', 'font-size: 14px;');
});
