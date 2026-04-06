const slides = document.querySelectorAll(".design-slide-item");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let currentIdx = 0;
const totalSlides = slides.length;

function updateSlide() {
 if (!totalSlides) return;
 const safeIdx = Math.min(currentIdx, totalSlides - 1);
 currentIdx = safeIdx;
 slides.forEach((slide) => slide.classList.remove("active"));
 slides[currentIdx].classList.add("active");
 if (dots.length) {
  dots.forEach((dot) => dot.classList.remove("active"));
  const dotIdx = Math.min(currentIdx, dots.length - 1);
  dots[dotIdx].classList.add("active");
 }
}

if (totalSlides && nextBtn && prevBtn) {
 nextBtn.addEventListener("click", () => {
  if (currentIdx < totalSlides - 1) {
   currentIdx++;
  } else {
   currentIdx = 0;
  }
  updateSlide();
 });

 prevBtn.addEventListener("click", () => {
  if (currentIdx > 0) {
   currentIdx--;
  } else {
   currentIdx = totalSlides - 1;
  }
  updateSlide();
 });

 updateSlide();
}

// 헤더 after js
window.addEventListener("load", () => {
 const header = document.querySelector("header");
 header.classList.add("active");
});

// 인트로: 페이지 맨 위에서만 채움 0%↔100% (위로 줄·아래로 늘음). 100% 미만이면 스크롤 잠금.
(function () {
 const intro = document.querySelector("#intro");
 const html = document.documentElement;
 if (!intro) return;

 const lineEls = intro.querySelectorAll("[data-intro-line]");
 const lineCount =
  lineEls.length > 0
   ? Math.max(
      ...Array.from(lineEls).map((el) => parseInt(el.dataset.introLine, 10))
     ) + 1
   : 1;

 function setLineFillsFromProgress(p) {
  const t = Math.max(0, Math.min(1, p));
  lineEls.forEach((el) => {
   const i = parseInt(el.dataset.introLine, 10);
   const v = Math.min(1, Math.max(0, t * lineCount - i));
   el.style.setProperty("--line-fill", `${(v * 100).toFixed(2)}%`);
  });
 }

 const hash = window.location.hash;
 if (hash && hash !== "#intro") {
  setLineFillsFromProgress(1);
  return;
 }

 if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setLineFillsFromProgress(1);
  return;
 }

 let fillLevel = 0;
 const WHEEL_SENS = 0.00055;
 const TOUCH_SENS = 0.0025;
 const KEY_STEP = 0.045;
 const TOP_EPS = 4;

 function applyFill(t) {
  fillLevel = Math.max(0, Math.min(1, t));
  setLineFillsFromProgress(fillLevel);
  if (fillLevel < 1) {
   html.classList.add("intro-fill-locked");
   document.body.classList.add("intro-fill-locked");
   const sy = window.scrollY || document.documentElement.scrollTop;
   if (sy > TOP_EPS) window.scrollTo(0, 0);
  } else {
   html.classList.remove("intro-fill-locked");
   document.body.classList.remove("intro-fill-locked");
  }
 }

 function atPageTop() {
  return (window.scrollY || document.documentElement.scrollTop) <= TOP_EPS;
 }

 function onScrollWhileLocked() {
  if (fillLevel < 1 && window.scrollY > TOP_EPS) {
   window.scrollTo(0, 0);
  }
 }

 function onWheel(e) {
  if (!atPageTop()) return;

  const dy = e.deltaY;

  if (dy > 0) {
   if (fillLevel < 1) {
    e.preventDefault();
    applyFill(fillLevel + dy * WHEEL_SENS);
   }
   return;
  }

  if (dy < 0 && fillLevel > 0) {
   e.preventDefault();
   applyFill(fillLevel + dy * WHEEL_SENS);
  }
 }

 function onKeyDown(e) {
  if (!atPageTop()) return;

  const decreaseKeys = ["PageUp", "ArrowUp", "Home"];
  const increaseKeys = [" ", "PageDown", "ArrowDown", "End"];

  if (decreaseKeys.includes(e.key)) {
   if (fillLevel > 0) {
    e.preventDefault();
    applyFill(fillLevel - KEY_STEP);
   }
   return;
  }

  if (increaseKeys.includes(e.key)) {
   if (fillLevel < 1) {
    e.preventDefault();
    applyFill(fillLevel + KEY_STEP);
   }
  }
 }

 let touchLastY = null;
 function onTouchStart(e) {
  touchLastY = e.touches[0].clientY;
 }

 function onTouchMove(e) {
  const sy = window.scrollY || document.documentElement.scrollTop;
  if (sy > 48) return;

  const y = e.touches[0].clientY;
  if (touchLastY === null) {
   touchLastY = y;
   return;
  }
  const dy = touchLastY - y;
  touchLastY = y;

  if (fillLevel >= 1 && dy > 0) return;

  if (fillLevel <= 0 && dy < 0) return;

  e.preventDefault();
  applyFill(fillLevel + dy * TOUCH_SENS);
 }

 applyFill(0);

 window.addEventListener("wheel", onWheel, { passive: false, capture: true });
 window.addEventListener("scroll", onScrollWhileLocked, {
  passive: true,
  capture: true,
 });
 window.addEventListener("keydown", onKeyDown, { capture: true });
 document.addEventListener("touchstart", onTouchStart, { passive: true });
 document.addEventListener("touchmove", onTouchMove, { passive: false });
})();
