/**
 * 포트폴리오 인트로 스티커 패럴랙스 효과
 * 작성하신 CSS의 위치(%값)를 기준으로 마우스 움직임에 반응합니다.
 */

const stickers = document.querySelectorAll('.deco-images img');

// 각 스티커마다 움직임의 강도(깊이감)를 다르게 설정
// [1번: 블러셔, 2번: 빵, 3번: 사탕, 4번: 사진] 순서
const moveSpeeds = [12, -22, 32, -8]; 

window.addEventListener('mousemove', (e) => {
  // 1. 마우스의 현재 위치 좌표 가져오기
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // 2. 화면 중앙을 기준(0, 0)으로 마우스가 얼마나 이동했는지 계산
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const moveX = (mouseX - centerX) / 50; 
  const moveY = (mouseY - centerY) / 50;

  // 3. 각 스티커 이미지에 움직임 적용
  stickers.forEach((sticker, index) => {
    const speed = moveSpeeds[index] || 20;
    
    // 최종 이동값 계산 (속도 곱하기)
    const finalX = moveX * speed;
    const finalY = moveY * speed;

    // 기존 CSS 위치를 유지하며 transform으로 미세하게 이동 + 아주 살짝 회전
    // rotate를 섞어주면 훨씬 '스티커'가 떠다니는 느낌이 납니다.
    sticker.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${finalX * 0.1}deg)`;
    sticker.style.transition = 'transform 0.1s ease-out'; // 부드러운 따라오기 효과
  });
});
