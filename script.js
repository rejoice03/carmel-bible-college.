// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active')
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            const targetID = this.getAttribute('href');
            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        testimonials[index].classList.add('active');
    }

    nextBtn.addEventListener('click', function () {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener('click', function () {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });

    // Auto-rotate testimonials every 5 seconds
    setInterval(function () {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);

    // // Gallery
    // // Elements
    // const filterButtons = document.querySelectorAll('.filter-btn');
    // const galleryItems = document.querySelectorAll('.gallery-item');
    // const lightbox = document.getElementById('ligthbox');
    // const lightboxImg = document.getElementById('lightcox-img');
    // const lightboxCaption = document.querySelector('.lightbox-caption');
    // const closeLightbox = document.querySelector('.close-lighrbox');
    // const prevbtn = document.querySelector('.lightbox-nav.prev');
    // const nextbtn = document.querySelector('.lightbox-nav.next');

    // // Current active index for lightbox navigation
    // let currentIndex = 0;
    // let filteredItems = [...galleryItems];

    // // Filter functionality
    // filterButtons.forEach(button => {
    //     button.addEventListener('click', function () {
    //         // Update active button
    //         filterButtons.forEach(btn => btn.classList.remove('active'));
    //         this.classList.add('active');

    //         // Get selected category
    //         const category = this.getAttribute('data-category');

    //         // Filter gallery items
    //         galleryItems.forEach(item => {

    //         })
    //     })
    // })
})