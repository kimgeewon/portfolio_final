/**
 * 이미지 모달 기능
 */
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const images = document.querySelectorAll(".scroll-content img");

    // 1. 모든 대상 이미지에 클릭 이벤트 추가
    images.forEach(img => {
        img.style.cursor = "pointer"; // 마우스 포인터 변경
        
        img.onclick = function() {
            if (modal && modalImg) {
                modal.style.display = "flex"; // 모달 보이기
                modalImg.src = this.src;      // 클릭한 이미지 경로 복사
                document.body.style.overflow = "hidden"; // 배경 스크롤 방지(선택사항)
            }
        };
    });

    // 2. 모달 영역 클릭 시 닫기
    if (modal) {
        modal.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // 배경 스크롤 다시 허용
        };
    }
});
