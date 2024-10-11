// Made by StefanoGSA :)
const banner = document.getElementById("banner");
const closeBanner = document.querySelector(".banner_close");
closeBanner.addEventListener("click", () => {
  let header = document.getElementById("header");
  banner.style.display = "none";
  header.style.marginTop = "0";
});

function checkViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  return rect.top >= 0 && rect.bottom <= windowHeight+20;
}

function increasingNumbers(el, target, interval = 2000, steps = 50) {
  const element = el;
  const targetValue = parseInt(target.replace(/[^0-9]/g, ""), 10);
  const ratio = interval / steps;
  let currentValue = 0;
  const remaining = targetValue - currentValue;
  const increment = remaining / ratio;
  const symbol = element.textContent.replace(/[0-9,]/g, "");
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    roundingMode: "trunc",
    roundingPriority: "auto",
  });

  const animate = setInterval(() => {
    currentValue += increment;
    let formattedNumber = formatter.format(currentValue);
    element.textContent =symbol == "%" || symbol == ""? Math.round(formattedNumber) + symbol : symbol + formattedNumber;
    if (currentValue >= targetValue) {
      clearInterval(animate);
    }
  }, 10);
}

const carousel = document.getElementById("testimonials");
function startCarousel(carousel, interval) {
  const carouselItems = carousel.querySelectorAll(".carousel-item");

  carouselItems.forEach((item) => {
    if (!item.classList.contains("active")) {
      item.style.display = "none";
    }
  });

  assignData(carousel);
  createDots(carousel);
  startAutoplay(carousel, interval);
  autoplayController(carousel, interval);
  dotsNavigation(carousel, interval);
}

let autoplayInterval = null;

function startAutoplay(carousel, interval) {
  let autoplayInitialized = false;
  if (!autoplayInterval || !autoplayInitialized) {
    autoplayInterval = setInterval(() => nextSlide(carousel), interval);
    autoplayInitialized = true;
  }
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function autoplayController(carousel, interval) {
  carousel.addEventListener("mouseover", () => {
    stopAutoplay();
  });

  carousel.addEventListener("mouseout", () => {
    if (!carousel.classList.contains("paused")) {
      startAutoplay(carousel, interval);
    }
  });
}

function createDots(carousel) {
  const dotsContainer = document.querySelector(".dots");

  if (!dotsContainer) {
    console.warn(
      "Dots container element not found. Navigation dots will not be created."
    );
    return;
  }
  const items = carousel.querySelectorAll(".carousel-item").length;

  for (let i = 0; i < items; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }

  carousel.querySelector(".dot").classList.add("active");
  carousel.querySelector(".dot").setAttribute("disabled", true);
}

function assignData(carousel) {
  let i = 0;
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carouselElement) => {
    carouselElement.dataset.carouselid = i++;
  });
  i = 0;
  carousel.querySelectorAll(".carousel-item").forEach((item) => {
    item.dataset.slideid = i++;
  });
}

function dotsNavigation(carousel, interval) {
  const dots = carousel.querySelectorAll("div.dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      if (!dot.hasAttribute("disabled")) {
        stopAutoplay();

        const currentDot = carousel.querySelector(".dot.active");
        const index = dot.dataset.index;
        const currentSlide = carousel.querySelector(".carousel-item.active");
        const nextSlide = carousel.querySelector(
          `.carousel-item[data-slideid="${index}"]`
        );

        currentSlide.classList.remove("active");
        currentSlide.style.opacity = 0;

        nextSlide.classList.add("active");
        nextSlide.style.opacity = 1;

        currentDot.classList.remove("active");
        currentDot.removeAttribute("disabled");
        dot.classList.add("active");
        dot.setAttribute("disabled", true);
      }
    });
  });
}

function nextSlide(carousel) {
  const currentSlide = carousel.querySelector(".carousel-item.active");
  const nextSlide = currentSlide.nextElementSibling
    ? currentSlide.nextElementSibling
    : carousel.querySelector(".carousel-item");

  currentSlide.classList.remove("active");
  currentSlide.style.opacity = 0;

  nextSlide.classList.add("active");
  nextSlide.style.opacity = 1;
  updateDots(carousel);
}

function updateDots(carousel) {
  const dots = carousel.querySelectorAll(".dot");

  dots.forEach((dot) => {
    dot.classList.remove("active");
    dot.removeAttribute("disabled");
  });

  const activeSlide = carousel.querySelector(".carousel-item.active");
  const activeDotIndex = activeSlide.dataset.slideid;
  const activeDot = dots[activeDotIndex];

  activeDot.classList.add("active");
  activeDot.setAttribute("disabled", true);
}

let numbers = document.querySelectorAll(".fund_misc span");
numbers.forEach((el) => {
  if (checkViewport(el)) {
    if (!el.classList.contains("increasing")) {
      increasingNumbers(el, el.textContent, 5000, 25);
      el.classList.add("increasing");
    }
  }
  window.addEventListener("scroll", () => {
    if (checkViewport(el)) {
      if (!el.classList.contains("increasing")) {
        increasingNumbers(el, el.textContent, 5000, 25);
        el.classList.add("increasing");
      }
    }
  });
});

let testimonials = document.getElementById("testimonials");
startCarousel(testimonials, 3000);

const animated = document.querySelectorAll(".FadeInUp, .FadeInDown, .FadeInLeft, .FadeInRight");
animated.forEach((element) => {
  if (checkViewport(element)) {
    element.classList.add("animated");
  }
  window.addEventListener("scroll", () => {
    if (checkViewport(element)) {
      element.classList.add("animated");
    }
  });
});
