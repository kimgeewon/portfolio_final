const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

// 햄버거 버튼 클릭 시 메뉴 열고 닫기
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  // 메뉴 열렸을 때 스크롤 막기
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

// 메뉴 링크 클릭 시 메뉴 닫기
const mobileLinks = document.querySelectorAll(".mobile-menu a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});
