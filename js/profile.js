const profileSection = document.querySelector('#profile');
const profileText = document.querySelector('.profile-text');
const rightContent = document.querySelector('.right-content');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 섹션 진입 시 왼쪽/오른쪽 모두 활성화
      profileText.classList.add('active');
      rightContent.classList.add('active');
    } else {
      // 섹션 벗어날 시 다시 초기화 (사라짐)
      profileText.classList.remove('active');
      rightContent.classList.remove('active');
    }
  });
}, { threshold: 0.1 });

observer.observe(profileSection);
// 감시할 요소들 모두 선택 (왼쪽 섹션들 + 오른쪽 전체)
const detailsToWatch = document.querySelectorAll('.detail-section, .details-right');

const detailsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 화면에 보이면 클래스 추가
      entry.target.classList.add('active');
    } else {
      // 화면에서 나가면 클래스 제거 (무한 반복)
      entry.target.classList.remove('active');
    }
  });
}, { 
  threshold: 0.1, // 10%만 보여도 시작
  rootMargin: '0px 0px -50px 0px' // 화면 끝에 닿기 전 미리 준비
});

detailsToWatch.forEach(el => detailsObserver.observe(el));



/------------인덱스 효과---------/
