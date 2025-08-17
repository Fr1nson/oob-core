// Learn More button
const learnMore = document.getElementById("learnMore");
setTimeout(() => {
  learnMore.classList.add("show");
}, 4000);

learnMore.addEventListener("click", () => {
  document.getElementById("projects").classList.remove("hidden");
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  learnMore.style.display = "none";
});

// Project slider
const slides = document.querySelectorAll(".project-slide");
let currentIndex = 0;
let isAnimating = false;

function showProject(newIndex, direction) {
  if (isAnimating || newIndex === currentIndex) return;
  isAnimating = true;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[newIndex];

  // Убираем активный слайд с направлением
  currentSlide.classList.remove("active");
  currentSlide.classList.add(direction === "next" ? "to-left" : "to-right");

  // Подготавливаем новый слайд
  nextSlide.style.display = "block";
  nextSlide.classList.add("active");
  nextSlide.classList.add(direction === "next" ? "from-right" : "from-left");

  // Сброс позиции через 1 кадр
  requestAnimationFrame(() => {
    nextSlide.classList.remove("from-right", "from-left");
  });

  // После анимации
  setTimeout(() => {
    currentSlide.style.display = "none";
    currentSlide.classList.remove("to-left", "to-right");
    isAnimating = false;
  }, 600);

  currentIndex = newIndex;
}

function pulseArrows(button) {
  button.classList.add("pulse");
  setTimeout(() => {
    button.classList.remove("pulse");
  }, 300); // совпадает с CSS-анимацией
}

// Обновляем обработчики стрелок
document.getElementById("prevProject").addEventListener("click", () => {
  let newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showProject(newIndex, "prev");
  pulseArrows(document.getElementById("prevProject")); // анимация стрелок
});

document.getElementById("nextProject").addEventListener("click", () => {
  let newIndex = (currentIndex + 1) % slides.length;
  showProject(newIndex, "next");
  pulseArrows(document.getElementById("nextProject")); // анимация стрелок
});


const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', () => {
  // Перезагружаем страницу полностью
  window.location.reload();
});
