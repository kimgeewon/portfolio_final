const cursor = document.querySelector('.custom-cursor');

let mouseX = 0; // 실제 마우스 위치 X
let mouseY = 0; // 실제 마우스 위치 Y
let cursorX = 0; // 커서의 현재 위치 X
let cursorY = 0; // 커서의 현재 위치 Y

// 1. 마우스 움직임 감지
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 2. 부드러운 애니메이션 함수 루프
function animate() {
    // 이동 공식: (목표 지점 - 현재 지점) * 속도 비율
    // 0.1은 10%씩 따라오는 느낌 (숫자가 작을수록 더 느리고 부드러워짐)
    const easing = 0.08; 

    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;

    // 위치 업데이트 (translate3d가 성능이 가장 좋음)
    cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;

    // 다음 프레임 실행
    requestAnimationFrame(animate);
}

// 애니메이션 시작
animate();