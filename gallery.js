document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    let preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        preloader.style.display = 'none';
    });
    
    // Gallery
    // Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevbtn = document.querySelector('.lightbox-nav.prev');
    const nextbtn = document.querySelector('.lightbox-nav.next');

    // Current active index for lightbox navigation
    let currentIndex = 0;
    let filteredItems = [...galleryItems];

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get selected category
            const category = this.getAttribute('data-category');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // Update filtered items array for lightbox navigation
            filteredItems = [...galleryItems].filter(item => 
                category === 'all' || item.classList.contains(category)
            );
        });
    });

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Check if the item is currently visible (not filtered out)
            if (!item.classList.contains('hidden')) {
                openLightbox(item, index);
            }
        });
    });
    
    // Open lightbox
    function openLightbox(item, index) {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption h3').textContent;
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;
        lightbox.style.display = 'block';
        
        // Find index in filtered items
        currentIndex = filteredItems.indexOf(item);
        
        // Disable scrolling on body
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Click outside to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
        }
    });
    
    // Previous image
    prevbtn.addEventListener('click', function() {
        navigateLightbox('prev');
    });
    
    // Next image
    nextbtn.addEventListener('click', function() {
        navigateLightbox('next');
    });
    
    // Navigate through images in lightbox
    function navigateLightbox(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        } else {
            currentIndex = (currentIndex + 1) % filteredItems.length;
        }
        
        const item = filteredItems[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption h3').textContent;
        
        // Fade effect
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightboxImg.style.opacity = '1';
        }, 300);
    }
    
    // Mobile Navigation Toggle (ensure it works on gallery page too)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    const navbar = document.querySelector('.navbar1');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
            navbar.classList.add('header-scrolled');
        } else {
            navbar.classList.remove('header-scrolled');
        }
    });

    // AI Chat Widget Toggle
    (function () {
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args) => {
                if (!window.chatbase.q) {
                    window.chatbase.q = []
                }
                window.chatbase.q.push(args)
            };
            window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                    if (prop === "q") {
                        return target.q
                    }
                    return (...args) => target(prop, ...args)
                }
            })
        }
        const onLoad = function () {
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "FgclzYVeciSB_YrAHVR4d";
            script.domain = "www.chatbase.co";
            document.body.appendChild(script)
        };
        if (document.readyState === "complete") {
            onLoad()
        } else {
            window.addEventListener("load", onLoad)
        }
    })();
});