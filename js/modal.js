/**
 * 이미지 모달 기능
 */
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const images = document.querySelectorAll(".scroll-content img");

  // 1. 모든 대상 이미지에 클릭 이벤트 추가
  images.forEach((img) => {
    img.style.cursor = "pointer"; // 마우스 포인터 변경

    img.onclick = function () {
      if (modal && modalImg) {
        modal.style.display = "flex"; // 모달 보이기
        modalImg.src = this.src; // 클릭한 이미지 경로 복사
        document.body.style.overflow = "hidden"; // 배경 스크롤 방지(선택사항)
      }
    };
  });
  // 2. 모달 영역 클릭 시 닫기 (이미지가 아닌 배경 클릭 시에만)
  if (modal) {
    modal.onclick = function (event) {
      // 핵심: 클릭한 대상(event.target)이 '이미지(modalImg)'가 아닐 때만 닫기
      if (event.target !== modalImg) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    };
  }
});

// 에어팟맥스 클릭시 모달안뜨게
/* 에어팟 맥스 상세페이지 클릭 시 모달창 중복 실행 방지 */
document.addEventListener("DOMContentLoaded", function () {
  const linkWrappers = document.querySelectorAll(".link-wrapper");

  linkWrappers.forEach((link) => {
    link.addEventListener("click", function (e) {
      // 이벤트 버블링(상위 요소로 클릭 신호가 전달되는 것)을 완전히 차단
      e.stopPropagation();
    });
  });
});
