// ----- Image Slider -----
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slider-dot");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const sliderContainer = document.querySelector(".slider-container");
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

sliderContainer.addEventListener("mouseenter", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

showSlide(currentSlide);
startAutoSlide();

// ----- Stats Counter Animation -----
const counters = document.querySelectorAll(".stat-number");

const animateCount = (el, target, isPercent = false) => {
  let current = 0;
  const speed = 20;
  const increment = Math.ceil(target / 100);

  const updateCounter = () => {
    current += increment;
    if (current >= target) {
      el.textContent = isPercent ? `${target}%` : target;
    } else {
      el.textContent = isPercent ? `${current}%` : current;
      setTimeout(updateCounter, speed);
    }
  };

  updateCounter();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"));
        const isPercent = counter.textContent.includes("%");
        animateCount(counter, target, isPercent);
      });
      observer.disconnect(); // Run only once
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector("#story");
if (statsSection) observer.observe(statsSection);

