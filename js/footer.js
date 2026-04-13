window.addEventListener("load", () => {
  const contactRow = document.querySelector(".contact-row");

  // 기존에 써놓은 내용(전화번호, 이메일)을 가져옴.
  const originalContent = contactRow.innerHTML;

  // 내용이 끊기지 않도록 3번 정도 반복해서 붙여줌.
  contactRow.innerHTML = originalContent + originalContent + originalContent;

  // 마우스를 올렸을 때 멈추게 하고 싶다
  contactRow.addEventListener("mouseenter", () => {
    contactRow.style.animationPlayState = "paused";
  });
  contactRow.addEventListener("mouseleave", () => {
    contactRow.style.animationPlayState = "running";
  });
});
