const listItems = document.querySelectorAll('.work-list li');
const previewContainer = document.getElementById('image-preview-container');
const previewImg = document.getElementById('preview-img');

// 1. 마우스 움직임에 따라 프리뷰 박스 위치 이동
window.addEventListener('mousemove', (e) => {
  // 프리뷰 박스가 마우스 커서를 따라오도록 설정
  previewContainer.style.left = e.clientX + 'px';
  previewContainer.style.top = e.clientY + 'px';
});

// 2. 리스트 아이템 호버 이벤트
listItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const imgSrc = item.getAttribute('data-img');
    if (imgSrc) {
      previewImg.src = imgSrc;
      previewContainer.classList.add('active');
    }
  });

  item.addEventListener('mouseleave', () => {
    previewContainer.classList.remove('active');
    previewImg.src = ''; // 이미지 초기화
  });
});
