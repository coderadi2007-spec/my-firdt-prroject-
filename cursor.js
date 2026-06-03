// ============================================
// CUSTOM CURSOR JS - COMPLETE WORKING
// ORINNOVATIVE
// ============================================

(function() {
    'use strict';

    // Check if device is touch or desktop
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    };

    // Don't run custom cursor on touch devices
    if (isTouchDevice()) {
        console.log('Touch device detected - using default cursor');
        return;
    }

    // Create cursor elements if they don't exist
    let cursorGlow = document.querySelector('.cursor-glow');
    let cursorDot = document.querySelector('.cursor-dot');

    if (!cursorGlow) {
        cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
    }

    if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
    }

    // Cursor positions
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
    });

    // Smooth follow for glow cursor
    function animateCursor() {
        // Smooth easing for glow cursor
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        
        if (cursorGlow) {
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursorGlow) cursorGlow.style.opacity = '0';
        if (cursorDot) cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        if (cursorGlow) cursorGlow.style.opacity = '1';
        if (cursorDot) cursorDot.style.opacity = '1';
    });

    // Hover effect for all interactive elements
    const interactiveElements = [
        'a', 'button', '.btn-magnetic', '.btn-primary', '.btn-outline',
        '.service-card', '.portfolio-item', '.filter-btn', '.accordion-header',
        '.nav-link', '.social-icons a', '.whatsapp-float', '.submit-btn',
        'input', 'textarea', 'select', '.info-item', '.value-card'
    ];

    const hoverElements = document.querySelectorAll(interactiveElements.join(','));

    // Add hover effects
    const addHoverEffect = (element) => {
        element.addEventListener('mouseenter', () => {
            if (cursorGlow) cursorGlow.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            if (cursorGlow) cursorGlow.classList.remove('hover');
        });
    };

    // Apply to existing elements
    hoverElements.forEach(addHoverEffect);

    // Also watch for dynamically added elements
    const observer = new MutationObserver(() => {
        const newElements = document.querySelectorAll(interactiveElements.join(','));
        newElements.forEach(el => {
            if (!el.hasAttribute('data-cursor-attached')) {
                addHoverEffect(el);
                el.setAttribute('data-cursor-attached', 'true');
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    // Click effect
    document.addEventListener('mousedown', () => {
        if (cursorGlow) {
            cursorGlow.classList.add('click');
            setTimeout(() => {
                if (cursorGlow) cursorGlow.classList.remove('click');
            }, 200);
        }
    });

    // Input focus effect
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (cursorGlow) cursorGlow.classList.add('hide');
        });
        input.addEventListener('blur', () => {
            if (cursorGlow) cursorGlow.classList.remove('hide');
        });
    });

    // Magnetic effect for buttons (additional)
    const magneticBtns = document.querySelectorAll('.magnetic, .btn-magnetic, .btn-primary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            
            // Also move cursor glow slightly
            if (cursorGlow) {
                cursorGlow.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) scale(1.2)`;
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            if (cursorGlow) {
                cursorGlow.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    });

    // Parallax cursor trail effect
    let trailPositions = [];
    const trailLength = 8;
    
    function createTrail() {
        trailPositions.unshift({ x: mouseX, y: mouseY });
        if (trailPositions.length > trailLength) trailPositions.pop();
        
        // Optional: Add trail dots (can be enabled if needed)
        // For performance, trail is disabled by default
    }
    
    // Update trail on mouse move
    document.addEventListener('mousemove', () => {
        createTrail();
    });

    console.log('Custom cursor initialized successfully!');
})();