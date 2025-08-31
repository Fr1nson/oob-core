document.addEventListener("DOMContentLoaded", () => {
        const learnMore = document.getElementById("learnMore");
        const overlay = document.querySelector(".overlay");
        const projects = document.getElementById("projects");
        const backToTopBtn = document.getElementById("backToTop");
        const footer = document.getElementById("footer");

        // Появление Learn More
        setTimeout(() => learnMore.classList.add("show"), 4000);

        let sliderOpen = false;

        function openSlider() {
          if (sliderOpen) return;
          overlay.classList.add("overlay--fade");
          projects.classList.remove("hidden");
          projects.classList.add("on-hero");
          document.body.classList.add("no-scroll");
          projects.scrollTop = 0;

          // форс-рефлоу
          void projects.offsetWidth;
          projects.classList.add("show");

          learnMore.style.display = "none";
          sliderOpen = true;

          // Скрываем футер при открытии слайдера
          footer.classList.remove("show");

          detachOpenOnScroll();
          attachSliderScrollHandlers();
          
          // Запускаем автопрокрутку при открытии слайдера
          startAutoplay();
        }

        function closeSlider(destination = 'hero') {
          if (!sliderOpen) return;
          
          // Останавливаем автопрокрутку при закрытии
          stopAutoplay();
          
          projects.classList.remove("show");
          
          // Сразу убираем футер при начале закрытия если идем к hero
          if (destination === 'hero') {
            footer.classList.remove("show");
          }
          
          setTimeout(() => {
            projects.classList.add("hidden");
            projects.classList.remove("on-hero");
            overlay.classList.remove("overlay--fade");
            document.body.classList.remove("no-scroll");
            learnMore.style.display = "block";
            sliderOpen = false;
            detachSliderScrollHandlers();

            // ПОКАЗЫВАЕМ ФУТЕР только если закрываемся к футеру
            if (destination === 'footer') {
              setTimeout(() => {
                footer.classList.add("show");
              }, 100);
            }

            // после закрытия — возвращаем обработчики открытия
            setTimeout(attachOpenOnScroll, 200);
          }, 600);
        }

        // Клик по Learn More
        learnMore.addEventListener("click", openSlider);
        // Кнопка Back to Top — закрываем на хиро и прячем футер
        backToTopBtn.addEventListener("click", () => {
          footer.classList.remove("show");
          closeSlider('hero');
        });

        // ===== Слайдер (внутренние слайды) + АВТОПРОКРУТКА =====
        const slides = Array.from(document.querySelectorAll(".project-slide"));
        let currentIndex = slides.findIndex((s) => s.classList.contains("active"));
        if (currentIndex === -1 && slides.length) {
          currentIndex = 0;
          slides[0].classList.add("active");
        }
        if (slides[currentIndex]) slides[currentIndex].style.display = "block";

        let isAnimating = false;
        let autoplayTimer = null;
        const AUTOPLAY_DELAY = 5000; // 5 секунд бездействия

        function showProject(newIndex, direction) {
          if (isAnimating || newIndex === currentIndex) return;
          isAnimating = true;

          const current = slides[currentIndex];
          const next = slides[newIndex];

          next.style.display = "block";
          next.classList.add("active", direction === "next" ? "from-right" : "from-left");

          requestAnimationFrame(() => {
            current.classList.add(direction === "next" ? "to-left" : "to-right");
            next.classList.remove("from-right", "from-left");
          });

          setTimeout(() => {
            current.classList.remove("active", "to-left", "to-right");
            current.style.display = "none";
            next.classList.add("active");
            next.style.display = "block";
            currentIndex = newIndex;
            isAnimating = false;
            
            // Перезапускаем автопрокрутку после смены слайда
            resetAutoplay();
          }, 600);
        }

        function nextSlide() {
          const newIndex = (currentIndex + 1) % slides.length;
          showProject(newIndex, "next");
        }

        function startAutoplay() {
          if (!sliderOpen || slides.length <= 1) return;
          stopAutoplay();
          autoplayTimer = setTimeout(() => {
            nextSlide();
          }, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
          if (autoplayTimer) {
            clearTimeout(autoplayTimer);
            autoplayTimer = null;
          }
        }

        function resetAutoplay() {
          stopAutoplay();
          startAutoplay();
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
          resetAutoplay(); // Сбрасываем автопрокрутку при ручном действии
        });

        nextBtn.addEventListener("click", () => {
          const newIndex = (currentIndex + 1) % slides.length;
          showProject(newIndex, "next");
          pulseArrows(nextBtn);
          resetAutoplay(); // Сбрасываем автопрокрутку при ручном действии
        });

        // Останавливаем автопрокрутку при взаимодействии с контентом
        projects.addEventListener('wheel', () => resetAutoplay());
        projects.addEventListener('touchstart', () => resetAutoplay());
        projects.addEventListener('mouseenter', () => resetAutoplay());
        projects.addEventListener('click', () => resetAutoplay());

        // ===== Открытие слайдера при прокрутке вниз с верхней части страницы =====
        let touchStartY = null;
        let scrollHandlersAttached = false;

        function atTopZone() {
          return true; // всегда считаем что мы в топ-зоне, так как прокрутки нет
        }

        function onWheelOpen(e) {
          if (sliderOpen) return;
          if (!atTopZone()) return;
          if (e.deltaY > 0) openSlider();
        }

        function onTouchStartOpen(e) {
          touchStartY = e.touches && e.touches.length ? e.touches[0].clientY : null;
        }

        function onTouchMoveOpen(e) {
          if (sliderOpen || !atTopZone() || touchStartY === null) return;
          const currentY = e.touches && e.touches.length ? e.touches[0].clientY : null;
          if (currentY === null) return;
          const dy = touchStartY - currentY; // скролл вниз => dy > 0
          if (dy > 10) {
            openSlider();
            touchStartY = null;
          }
        }

        function attachOpenOnScroll() {
          if (scrollHandlersAttached) return;
          window.addEventListener('wheel', onWheelOpen, { passive: true });
          window.addEventListener('touchstart', onTouchStartOpen, { passive: true });
          window.addEventListener('touchmove', onTouchMoveOpen, { passive: true });
          scrollHandlersAttached = true;
        }
        function detachOpenOnScroll() {
          if (!scrollHandlersAttached) return;
          window.removeEventListener('wheel', onWheelOpen);
          window.removeEventListener('touchstart', onTouchStartOpen);
          window.removeEventListener('touchmove', onTouchMoveOpen);
          scrollHandlersAttached = false;
        }

        attachOpenOnScroll();

        // ===== Закрытие слайдера: вверх -> на hero, вниз (внизу) -> к футеру =====
        let sliderTouchStartY = null;

        function atTopOfProjects() {
          return projects.scrollTop <= 0;
        }
        function atBottomOfProjects() {
          // -1 для страховки из-за округления
          return projects.scrollTop + projects.clientHeight >= projects.scrollHeight - 1;
        }

        function onSliderWheel(e) {
          if (!sliderOpen) return;
          // ВВЕРХ на верхней границе — закрываем на hero
          if (atTopOfProjects() && e.deltaY < 0) {
            e.preventDefault();
            closeSlider('hero');
            return;
          }
          // ВНИЗ на нижней границе — закрываем и идём к футеру
          if (atBottomOfProjects() && e.deltaY > 0) {
            e.preventDefault();
            closeSlider('footer');
          }
        }

        function onSliderTouchStart(e) {
          sliderTouchStartY = e.touches && e.touches.length ? e.touches[0].clientY : null;
        }
        function onSliderTouchMove(e) {
          if (!sliderOpen || sliderTouchStartY === null) return;
          const currentY = e.touches && e.touches.length ? e.touches[0].clientY : null;
          if (currentY === null) return;
          const dy = sliderTouchStartY - currentY; // вверх по экрану => dy > 0; вниз => dy < 0

          // Потянули вниз на верхней границе — на hero
          if (atTopOfProjects() && dy < -10) {
            e.preventDefault();
            closeSlider('hero');
            sliderTouchStartY = null;
            return;
          }
          // Потянули вверх на нижней границе — к футеру
          if (atBottomOfProjects() && dy > 10) {
            e.preventDefault();
            closeSlider('footer');
            sliderTouchStartY = null;
          }
        }

        function attachSliderScrollHandlers() {
          projects.addEventListener('wheel', onSliderWheel, { passive: false });
          projects.addEventListener('touchstart', onSliderTouchStart, { passive: true });
          projects.addEventListener('touchmove', onSliderTouchMove, { passive: false });
        }
        function detachSliderScrollHandlers() {
          projects.removeEventListener('wheel', onSliderWheel);
          projects.removeEventListener('touchstart', onSliderTouchStart);
          projects.removeEventListener('touchmove', onSliderTouchMove);
        }
      });