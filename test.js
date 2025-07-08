   // INTERSECTION OBSERVER SETUP
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Remove will-change after animation
                    setTimeout(() => {
                        entry.target.classList.add('animation-complete');
                    }, 1000);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animateOnScroll = document.querySelectorAll(
            '.fade-in, .slide-left, .slide-right, .scale-in, .stagger-item, .text-reveal'
        );
        
        animateOnScroll.forEach(el => {
            el.classList.add('will-animate');
            observer.observe(el);
        });

        // PARALLAX SCROLLING
        function handleParallax() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.parallax-bg');
            if (parallax) {
                const rate = scrolled * -0.5;
                parallax.style.transform = `translateY(${rate}px)`;
            }
        }

        // FLOATING ELEMENTS
        function createFloatingElements() {
            const container = document.getElementById('floatingElements');
            if (!container) return;

            for (let i = 0; i < 20; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(element);
            }
        }

        function animateFloatingElements() {
            const scrolled = window.pageYOffset;
            const floatingElements = document.querySelectorAll('.floating-element');
            
            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index % 3) * 0.2;
                const yPos = scrolled * speed;
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        }

        // COUNTER ANIMATIONS
        function animateCounter(element) {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current);
                
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        }

        // PROGRESS BAR ANIMATIONS
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        }

        // Enhanced observer for special animations
        const specialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Counter animations
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        if (!counter.classList.contains('animated')) {
                            counter.classList.add('animated');
                            animateCounter(counter);
                        }
                    });

                    // Progress bar animations
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        if (!bar.classList.contains('animate')) {
                            setTimeout(() => {
                                bar.classList.add('animate');
                                bar.style.width = bar.dataset.width + '%';
                            }, 300);
                        }
                    });
                }
            });
        }, observerOptions);

        // Observe sections with special animations
        document.querySelectorAll('#counter, #progress').forEach(section => {
            specialObserver.observe(section);
        });

        // OPTIMIZED SCROLL HANDLER
        let ticking = false;

        function updateAnimations() {
            handleParallax();
            animateFloatingElements();
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        // INITIALIZE
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('load', () => {
            createFloatingElements();
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Performance monitoring
        console.log('Scroll animations initialized');
        console.log('Using Intersection Observer for efficient triggering');
        console.log('RequestAnimationFrame for smooth parallax');