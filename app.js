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
  const href = link.getAttribute('href');

  // Only apply smooth scroll if href is an internal anchor link
  if (href && href.startsWith('#')) {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Stop default jump
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
                }
            });
        }
    });

    // Modal

    const images = document.querySelectorAll('.img-container');
const modal = document.querySelector('.modal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showModal(index) {
  currentIndex = index;
  modalImage.src = images[currentIndex].src;
  modal.classList.remove('hidden');
}

images.forEach((img, index) => {
  img.addEventListener('click', () => showModal(index));
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImage.src = images[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  modalImage.src = images[currentIndex].src;
});

// Optional: close on background click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Slideshow functionality
const slides = document.querySelectorAll('.slide');
  let current = 0;
  const total = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % total;
    showSlide(current);
  }
// Initial display
showSlide(current);

// Change image every 2 seconds
  setInterval(nextSlide, 2000);

const slider = document.querySelector(".image-comparison .slider");
const beforeImage = document.querySelector(".image-comparison .before-image");
const sliderLine = document.querySelector(".image-comparison .slider-line");
const sliderIcon = document.querySelector(".image-comparison .slider-icon");

slider.addEventListener("input", (e) => {
  let sliderValue = e.target.value + "%";

  beforeImage.style.width = sliderValue;
  sliderLine.style.left = sliderValue;
  sliderIcon.style.left = sliderValue;
});



        // Performance monitoring
        console.log('Scroll animations initialized');
        console.log('Using Intersection Observer for efficient triggering');
        console.log('RequestAnimationFrame for smooth parallax');