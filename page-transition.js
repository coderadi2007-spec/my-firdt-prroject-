// ============================================
// PAGE TRANSITIONS JS
// ORINNOVATIVE - Smooth Page Transitions
// ============================================

(function() {
    'use strict';

    // Create transition overlay element
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    transitionOverlay.innerHTML = `
        <div class="transition-content">
            <div class="transition-logo">
                <img src="assets/logo/logo.png" alt="ORINNOVATIVE">
                <span>ORINNOVATIVE</span>
            </div>
            <div class="transition-loader">
                <div class="transition-loader-bar"></div>
            </div>
            <div class="transition-text">Innovating The Technology</div>
        </div>
    `;
    document.body.appendChild(transitionOverlay);

    // Add styles dynamically
    const transitionStyles = document.createElement('style');
    transitionStyles.textContent = `
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, #0a0f2a, #050816);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 0.6s, opacity 0.6s ease;
            pointer-events: none;
        }
        
        .page-transition-overlay.active {
            visibility: visible;
            opacity: 1;
            transition: visibility 0s 0s, opacity 0.4s ease;
            pointer-events: all;
        }
        
        .transition-content {
            text-align: center;
            transform: translateY(30px);
            opacity: 0;
            transition: transform 0.4s ease, opacity 0.4s ease;
        }
        
        .page-transition-overlay.active .transition-content {
            transform: translateY(0);
            opacity: 1;
        }
        
        .transition-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .transition-logo img {
            height: 60px;
            animation: pulseLogo 1s ease infinite;
        }
        
        .transition-logo span {
            font-size: 32px;
            font-weight: 700;
            background: linear-gradient(135deg, #00D4FF, #6EE7FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Space Grotesk', monospace;
        }
        
        @keyframes pulseLogo {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .transition-loader {
            width: 200px;
            height: 3px;
            background: rgba(0, 212, 255, 0.2);
            border-radius: 3px;
            margin: 20px auto;
            overflow: hidden;
        }
        
        .transition-loader-bar {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #00D4FF, #6EE7FF, #00D4FF);
            border-radius: 3px;
            animation: loaderProgress 0.8s ease forwards;
        }
        
        @keyframes loaderProgress {
            0% { width: 0%; }
            30% { width: 40%; }
            60% { width: 75%; }
            100% { width: 100%; }
        }
        
        .transition-text {
            font-size: 14px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #6EE7FF;
            font-family: 'Inter', sans-serif;
            margin-top: 20px;
            opacity: 0.7;
        }
        
        /* Page fade-in animation */
        .page-transition-enter {
            animation: pageFadeIn 0.8s ease forwards;
        }
        
        @keyframes pageFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Prevent scrolling during transition */
        body.transition-active {
            overflow: hidden;
        }
    `;
    document.head.appendChild(transitionStyles);

    let isTransitioning = false;
    let pendingUrl = null;

    // Function to perform page transition
    function navigateTo(url) {
        if (isTransitioning) return;
        isTransitioning = true;
        pendingUrl = url;

        // Add class to body to prevent scrolling
        document.body.classList.add('transition-active');

        // Show overlay
        transitionOverlay.classList.add('active');

        // Wait for animation then navigate
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    }

    // Function to handle page load (fade in)
    function handlePageLoad() {
        // Add fade-in animation to main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.add('page-transition-enter');
        }

        // Hide overlay after page loads
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
            document.body.classList.remove('transition-active');
            isTransitioning = false;
        }, 300);

        // Remove animation class after it's done
        setTimeout(() => {
            if (mainContent) {
                mainContent.classList.remove('page-transition-enter');
            }
        }, 1000);
    }

    // Intercept all internal link clicks
    document.addEventListener('click', function(e) {
        // Find closest anchor tag
        let target = e.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href');
        if (!href) return;

        // Skip external links, anchor links, javascript:, mailto:, tel:
        if (
            href.startsWith('http') && !href.includes(window.location.hostname) ||
            href.startsWith('#') ||
            href.startsWith('javascript:') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            target.hasAttribute('download') ||
            target.target === '_blank'
        ) {
            return;
        }

        e.preventDefault();
        
        // Add click ripple effect
        addRippleEffect(e, target);
        
        // Navigate with transition
        navigateTo(href);
    });

    // Ripple effect on clicks
    function addRippleEffect(event, element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 212, 255, 0.3)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        ripple.style.opacity = '1';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(1)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 500);
    }

    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page loaded from bfcache
            handlePageLoad();
        }
    });

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        handlePageLoad();
        
        // Preload next page on hover (optional)
        preloadOnHover();
    });

    // Preload pages on link hover for faster transitions
    function preloadOnHover() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto')) {
                link.addEventListener('mouseenter', () => {
                    // Prefetch the page
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'prefetch';
                    preloadLink.href = href;
                    document.head.appendChild(preloadLink);
                });
            }
        });
    }

    // Add progress bar for navigation
    let progressBar = null;
    
    function createProgressBar() {
        if (progressBar) return;
        
        progressBar = document.createElement('div');
        progressBar.className = 'navigation-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        document.body.appendChild(progressBar);
        
        const progressStyles = document.createElement('style');
        progressStyles.textContent = `
            .navigation-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: transparent;
                z-index: 10001;
                pointer-events: none;
            }
            .progress-fill {
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, #00D4FF, #6EE7FF);
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(progressStyles);
    }
    
    createProgressBar();

    // Show progress on link click
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') && !link.getAttribute('href').startsWith('http')) {
            const fill = document.querySelector('.progress-fill');
            if (fill) {
                let width = 0;
                const interval = setInterval(() => {
                    width += 15;
                    fill.style.width = width + '%';
                    if (width >= 90) clearInterval(interval);
                }, 50);
                
                setTimeout(() => {
                    clearInterval(interval);
                    fill.style.width = '100%';
                }, 600);
                
                setTimeout(() => {
                    fill.style.width = '0%';
                }, 1000);
            }
        }
    });

    // Export for use in other modules
    window.pageTransition = {
        navigate: navigateTo,
        showOverlay: () => transitionOverlay.classList.add('active'),
        hideOverlay: () => transitionOverlay.classList.remove('active')
    };

})();

// Additional: GSAP powered page transitions (if GSAP is loaded)
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate page elements on load
    window.addEventListener('load', () => {
        gsap.fromTo('main > section', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
        );
    });
}

// Handle slow connections - show fallback
let connectionSpeed = navigator.connection ? navigator.connection.effectiveType : '4g';
if (connectionSpeed === 'slow-2g' || connectionSpeed === '2g') {
    // Disable transitions for very slow connections
    const style = document.createElement('style');
    style.textContent = `
        .page-transition-overlay {
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}