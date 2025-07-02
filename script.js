// ========== Image Slider ==========
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slider-dot");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const sliderContainer = document.querySelector(".slider-container");
let slideInterval;

const showSlide = (index) => {
  if (!slides.length || !dots.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i]?.classList.toggle("active", i === index);
  });
  currentSlide = index;
};

const nextSlide = () => {
  showSlide((currentSlide + 1) % slides.length);
};

const prevSlide = () => {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
};

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

const startAutoSlide = () => {
  slideInterval = setInterval(nextSlide, 5000);
};

const stopAutoSlide = () => {
  clearInterval(slideInterval);
};

if (sliderContainer) {
  sliderContainer.addEventListener("mouseenter", stopAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);
}

showSlide(currentSlide);
startAutoSlide();


// ========== Stats Counter ==========
const counters = document.querySelectorAll(".stat-number");
let statsAnimated = false;

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

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute("data-target"), 10);
          const isPercent = counter.dataset.type === "percent";
          animateCount(counter, target, isPercent);
        });
        statsAnimated = true;
        observer.disconnect(); // Only once
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector("#story");
if (statsSection && counters.length > 0) {
  observer.observe(statsSection);
}
