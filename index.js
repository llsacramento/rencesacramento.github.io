// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    var themeToggle = document.querySelector('.theme-toggle');
    var savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function updateThemeIcon(theme) {
        var icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }

    themeToggle.addEventListener('click', function() {
        var currentTheme = document.documentElement.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Scroll Animations
    var animatedElements = document.querySelectorAll('[data-animate]');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(function(el) {
        observer.observe(el);
    });

    // Mobile Navigation Toggle
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            var isOpen = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu';
        });
    }

    // Close mobile menu when a link is clicked
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.querySelector('i').className = 'bx bx-menu';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.querySelector('i').className = 'bx bx-menu';
        }
    });

    // Add active class to nav links on scroll
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        var scrollY = window.scrollY;
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop - 100;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            var navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // Photography Carousel
    var track = document.querySelector('.carousel-track');
    var slides = document.querySelectorAll('.carousel-slide');
    var btnLeft = document.querySelector('.carousel-btn-left');
    var btnRight = document.querySelector('.carousel-btn-right');
    var dotsContainer = document.querySelector('.carousel-dots');
    var currentIndex = 0;

    if (track && slides.length > 0) {
        // Create dots
        slides.forEach(function(_, index) {
            var dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        var dots = document.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        btnRight.addEventListener('click', function() {
            var nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
            goToSlide(nextIndex);
        });

        btnLeft.addEventListener('click', function() {
            var prevIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
            goToSlide(prevIndex);
        });

        // Touch/swipe support for mobile
        var startX = 0;
        var endX = 0;

        track.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            var diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    btnRight.click();
                } else {
                    btnLeft.click();
                }
            }
        }, { passive: true });
    }

    // Lightbox
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.querySelector('.lightbox-close');
    var lightboxPrev = document.querySelector('.lightbox-prev');
    var lightboxNext = document.querySelector('.lightbox-next');
    var carouselImages = document.querySelectorAll('.carousel-slide img');
    var lightboxIndex = 0;

    function openLightbox(index) {
        lightboxIndex = index;
        lightboxImg.src = carouselImages[lightboxIndex].src;
        lightboxImg.alt = carouselImages[lightboxIndex].alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function lightboxGoTo(index) {
        lightboxIndex = index;
        if (lightboxIndex < 0) lightboxIndex = carouselImages.length - 1;
        if (lightboxIndex >= carouselImages.length) lightboxIndex = 0;
        lightboxImg.src = carouselImages[lightboxIndex].src;
        lightboxImg.alt = carouselImages[lightboxIndex].alt;
    }

    carouselImages.forEach(function(img, index) {
        img.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function() { lightboxGoTo(lightboxIndex - 1); });
    lightboxNext.addEventListener('click', function() { lightboxGoTo(lightboxIndex + 1); });

    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === document.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxGoTo(lightboxIndex - 1);
        if (e.key === 'ArrowRight') lightboxGoTo(lightboxIndex + 1);
    });

    // Contact Form - AJAX submission
    var contactForm = document.querySelector('.contact-form');
    var toast = document.getElementById('toast');
    var toastMessage = document.getElementById('toast-message');

    function showToast(message, isError) {
        toastMessage.textContent = message;
        toast.querySelector('i').className = isError ? 'bx bx-error-circle' : 'bx bx-check-circle';
        toast.classList.remove('error');
        if (isError) toast.classList.add('error');
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(contactForm);
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(function(response) {
                if (response.ok) {
                    showToast('Message sent successfully! I\'ll get back to you soon.', false);
                    contactForm.reset();
                } else {
                    showToast('Something went wrong. Please try again.', true);
                }
            }).catch(function() {
                showToast('Network error. Please check your connection.', true);
            }).finally(function() {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        });
    }
});
