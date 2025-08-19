document.addEventListener("DOMContentLoaded", () => {
  const learnMore = document.getElementById("learnMore");
  const overlay = document.querySelector(".overlay");
  const projects = document.getElementById("projects");
  const hero = document.querySelector(".hero");
  const backToTopBtn = document.getElementById("backToTop");

  // Появление Learn More
  setTimeout(() => learnMore.classList.add("show"), 4000);

  // Показ слайдера поверх видео
  learnMore.addEventListener("click", () => {
    overlay.classList.add("overlay--fade");   // прячем текст
    hero.classList.add("dim");                // усиливаем затемнение
    projects.classList.remove("hidden");      // на случай, если скрыто
    projects.classList.add("on-hero");        // фиксируем поверх видео
    document.body.classList.add("no-scroll"); // блокируем скролл страницы

    // форс-рефлоу, чтобы transition сработал
    void projects.offsetWidth;
    projects.classList.add("show");           // плавный выезд снизу

    learnMore.style.display = "none";
  });

  // Возврат в исходное состояние
  backToTopBtn.addEventListener("click", () => {
    projects.classList.remove("show");        // уводим слайдер вниз
    setTimeout(() => {
      projects.classList.add("hidden");
      projects.classList.remove("on-hero");
      hero.classList.remove("dim");
      overlay.classList.remove("overlay--fade");
      document.body.classList.remove("no-scroll");
      learnMore.style.display = "block";
    }, 600); // соответствует CSS-переходу
  });

  // ===== Слайдер =====
  const slides = Array.from(document.querySelectorAll(".project-slide"));
  let currentIndex = slides.findIndex(s => s.classList.contains("active"));
  if (currentIndex === -1 && slides.length) {
    currentIndex = 0;
    slides[0].classList.add("active");
  }
  // Гарантируем, что активный слайд видим
  if (slides[currentIndex]) slides[currentIndex].style.display = "block";

  let isAnimating = false;

  function showProject(newIndex, direction) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    const current = slides[currentIndex];
    const next = slides[newIndex];

    // Подготовка следующего слайда вне экрана
    next.style.display = "block";
    next.classList.add("active", direction === "next" ? "from-right" : "from-left");

    // Старт анимации на след. кадре
    requestAnimationFrame(() => {
      // текущий уезжает
      current.classList.add(direction === "next" ? "to-left" : "to-right");
      // следующий заезжает к центру
      next.classList.remove("from-right", "from-left");
    });

    // Завершаем после окончания transition (0.6s)
    setTimeout(() => {
      current.classList.remove("active", "to-left", "to-right");
      current.style.display = "none";

      next.classList.add("active");
      next.style.display = "block";

      currentIndex = newIndex;
      isAnimating = false;
    }, 600);
  }

  function pulseArrows(btn) {
    btn.classList.add("pulse");
    setTimeout(() => btn.classList.remove("pulse"), 300);
  }

  const prevBtn = document.getElementById("prevProject");
  const nextBtn = document.getElementById("nextProject");

  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showProject(newIndex, "prev");
    pulseArrows(prevBtn);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % slides.length;
    showProject(newIndex, "next");
    pulseArrows(nextBtn);
  });
});
