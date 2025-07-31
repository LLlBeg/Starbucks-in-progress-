//створення гамбургеру

const hamburger = document.querySelector(".hamburger");
// задаємо перемінну гамбургеру
const navMenu = document.querySelector(".header__list");
// задаємо перемінну менюшці

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
// Закидуємо клас active на гамбургер та меню, попередньо прописавши його властивості в CSS

document.querySelectorAll(".header__list__link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
//
//
//
//
//
//
//ЛІЧИЛДЬНИК З ЧИСЛАМИ

window.addEventListener("load", WindowLoad); // Очікуємо повне завантаження сторінки

function WindowLoad() {
  //функція ініціалізації (запуск лічильника)
  function digitCountersInit() {
    // Отримуємо ВСІ об'єкти з атрибутом "data-digits-counter"
    let digitCounters = document.querySelectorAll("[data-digits-counter]");
    if (digitCounters.length) {
      digitCounters.forEach((digitCounter) => {
        digitsCountersAnimate(digitCounter);
      });
    }
  }

  // Функція анімації
  function digitsCountersAnimate(digitCounter) {
    let startTimer = null;
    // Отримуємо тривалість з data-duration або використовуємо 4000мс за замовчуванням
    const duration = parseInt(digitCounter.dataset.duration) || 4000;
    // Кінцеве значення беремо з innerHTML елемента
    const endValue = parseInt(digitCounter.innerHTML);
    const startPosition = 0; // Завжди починаємо з 0

    const step = (timestamp) => {
      if (!startTimer) startTimer = timestamp;
      const progress = Math.min((timestamp - startTimer) / duration, 1);
      // Обчислюємо поточне значення
      digitCounter.innerHTML = Math.floor(
        progress * (startPosition + endValue)
      );

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Запуск ініціалізації
  digitCountersInit();
}
//
//
//
//
//
//
//
// Курсор
document
  .getElementsByTagName("body")[0]
  .addEventListener("mousemove", function (n) {
    (t.style.left = n.clientX + "px"),
      (t.style.top = n.clientY + "px"),
      (e.style.left = n.clientX + "px"),
      (e.style.top = n.clientY + "px"),
      (i.style.left = n.clientX + "px"),
      (i.style.top = n.clientY + "px");
  });
let t = document.getElementById("cursor"),
  e = document.getElementById("cursor2"),
  i = document.getElementById("cursor3");
function n(t) {
  e.classList.add("hover"), i.classList.add("hover");
}
function s(t) {
  e.classList.remove("hover"), i.classList.remove("hover");
}
s();
for (
  let r = document.querySelectorAll(".hover-target"), a = r.length - 1;
  a >= 0;
  a--
) {
  o(r[a]);
}
function o(t) {
  t.addEventListener("mouseover", n), t.addEventListener("mouseout", s);
}
//
//
//
//
//
//
//
//

// Дивимось ширину екрана для спрацювання свайпера і кидаємо класс на тег

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Оголошення глобальних змінних та допоміжних функцій для класів та свайпу ---
  const productCardsContainer = document.querySelector(".products__info__box"); // Це твій контейнер (ul)
  const productCardsElements = document.querySelectorAll(
    ".products__info__card"
  ); // Це окремі картки (li)

  // Змінні для свайп-логіки
  let cards = [...document.querySelectorAll(".card")]; // Цей масив буде містити активні картки для свайпу
  let isSwiping = false;
  let startX = 0;
  let currentX = 0;
  let animationFrameId = null;

  // Медіа-запит для визначення мобільного вигляду (важливо, щоб breakpoint був коректний)
  const mobileMediaQuery = window.matchMedia("(max-width: 1000px)"); // Змінив на 1000px, як у твоєму коді

  // Helper function to get CSS variable durations
  const getDurationFromCSS = (
    variableName,
    element = document.documentElement
  ) => {
    const value = getComputedStyle(element)
      ?.getPropertyValue(variableName)
      ?.trim();
    if (!value) return 0;
    if (value.endsWith("ms")) return parseFloat(value);
    if (value.endsWith("s")) return parseFloat(value) * 1000;
    return parseFloat(value) || 0;
  };

  const getActiveCard = () => cards[0];

  const updatePositions = () => {
    cards.forEach((card, i) => {
      // Set --i CSS variable for stacking/animation
      card.style.setProperty("--i", i + 1); // Змінив на i + 1, як обговорювали
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
      card.style.opacity = "1"; // Повертаємо видимість, якщо картка повертається в стек
    });
  };

  const applySwipeStyles = (deltaX) => {
    const card = getActiveCard();
    if (!card) return;
    card.style.setProperty("--swipe-x", `${deltaX}px`);
    card.style.setProperty("--swipe-rotate", `${deltaX * 0.2}deg`);
    card.style.opacity = 1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75;
  };

  const handleStart = (clientX) => {
    if (isSwiping) return;
    isSwiping = true;
    startX = currentX = clientX;
    const card = getActiveCard();
    card && (card.style.transition = "none");
  };

  const handleMove = (clientX) => {
    if (!isSwiping) return;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
      currentX = clientX;
      const deltaX = currentX - startX;
      applySwipeStyles(deltaX);

      if (Math.abs(deltaX) > 50) handleEnd();
    });
  };

  const handleEnd = () => {
    if (!isSwiping) return;
    cancelAnimationFrame(animationFrameId);

    const deltaX = currentX - startX;
    const threshold = 50;
    const duration = getDurationFromCSS("--card-swap-duration");
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX);

        card.style.setProperty("--swipe-x", `${direction * 300}px`);
        card.style.setProperty("--swipe-rotate", `${direction * 20}deg`);

        setTimeout(() => {
          card.style.setProperty("--swipe-rotate", `${-direction * 20}deg`);
        }, duration * 0.5);

        setTimeout(() => {
          cards = [...cards.slice(1), card];
          updatePositions();
        }, duration);
      } else {
        applySwipeStyles(0);
      }
    }

    isSwiping = false;
    startX = currentX = 0;
  };

  // --- 2. Основна логіка перемикання класів та активації/деактивації свайпу ---
  function toggleMobileStackClasses(event) {
    const isMobileView = event.matches;

    if (isMobileView) {
      // Мобільний вигляд: активуємо стилі стеку
      if (productCardsContainer) {
        productCardsContainer.classList.add("mobile__stack");
        productCardsContainer.classList.remove("products__info__box"); // Якщо потрібно видалити цей клас на мобільних
      }

      productCardsElements.forEach((card) => {
        card.classList.add("card"); // Додаємо клас 'card' для 3D стилів
        card.classList.remove("products__info__card"); // Якщо потрібно видалити цей клас на мобільних
      });

      // Наповнюємо масив 'cards' для свайп-логіки
      cards = [...productCardsElements];
      updatePositions(); // Ініціалізуємо --i для всіх карток

      // Встановлюємо слухачі подій для свайпу
      if (productCardsContainer) {
        productCardsContainer.addEventListener("pointerdown", ({ clientX }) =>
          handleStart(clientX)
        );
        productCardsContainer.addEventListener("pointermove", ({ clientX }) =>
          handleMove(clientX)
        );
        document.addEventListener("pointerup", handleEnd); // Слухачі на document для кращого досвіду
        document.addEventListener("pointercancel", handleEnd);
      }
      console.log("Mobile view active: .card class added. Swipe enabled.");
    } else {
      // Десктопний вигляд: деактивуємо стилі стеку
      if (productCardsContainer) {
        productCardsContainer.classList.remove("mobile__stack");
        productCardsContainer.classList.add("products__info__box"); // Повертаємо цей клас на десктопі
      }

      productCardsElements.forEach((card) => {
        card.classList.remove("card"); // Видаляємо клас 'card'
        card.classList.add("products__info__card"); // Повертаємо цей клас на десктопі

        // Очищаємо інлайн-стилі, додані JS, щоб вони не заважали
        card.style.removeProperty("--i");
        card.style.removeProperty("--swipe-x");
        card.style.removeProperty("--swipe-rotate");
        card.style.removeProperty("opacity");
        card.style.removeProperty("transition");
      });

      cards = []; // Очищаємо масив 'cards'
      // Видаляємо слухачі подій свайпу
      if (productCardsContainer) {
        productCardsContainer.removeEventListener(
          "pointerdown",
          ({ clientX }) => handleStart(clientX)
        );
        productCardsContainer.removeEventListener(
          "pointermove",
          ({ clientX }) => handleMove(clientX)
        );
        document.removeEventListener("pointerup", handleEnd);
        document.removeEventListener("pointercancel", handleEnd);
      }
      console.log("Desktop view active: .card class removed. Swipe disabled.");
    }
  }

  // --- 3. Ініціалізація: встановлюємо початковий стан та слухачі ---
  // Додаємо слухач для зміни медіа-запиту
  mobileMediaQuery.addEventListener("change", toggleMobileStackClasses);

  // Викликаємо функцію один раз на завантаження сторінки, щоб встановити початковий стан
  toggleMobileStackClasses(mobileMediaQuery);

  //
  //
  //
  //
  //
  //
  //
});

// PopUp Менюха
const openPopupButtons = document.querySelectorAll(
  ".products__info__card__button"
);
const contactPopup = document.getElementById("contact__popup"); // ID remains for direct access
const contactForm = document.getElementById("contact__form"); // ID remains for direct access
const thankYouPopup = document.getElementById("thank__you__popup"); // ID remains for direct access

// Function to open the PopUp
function openPopup() {
  contactPopup.classList.add("popup--active"); // Use BEM modifier
}

// Function to close the PopUp
function closePopup() {
  contactPopup.classList.remove("popup--active"); // Use BEM modifier
  contactForm.reset(); // Reset form fields
}

// Function to close the Thank You PopUp
function closeThankYouPopup() {
  thankYouPopup.classList.remove("thank__you--active"); // Use BEM modifier
}

// Add event listener to each button with the class
openPopupButtons.forEach((button) => {
  button.addEventListener("click", openPopup);
});

// Close PopUp when clicking outside content
contactPopup.addEventListener("click", function (event) {
  if (event.target === contactPopup) {
    closePopup();
  }
});

// Form submission handler
contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  console.log("Форма відправлена!");
  console.log("Ім'я:", document.getElementById("first__name").value);
  console.log("Прізвище:", document.getElementById("last__name").value);
  console.log(
    "Номер телефону:",
    document.getElementById("phone__number").value
  );
  console.log(
    "Кількість замовлення:",
    document.getElementById("order__quantity").value
  );

  closePopup(); // Close the contact form popup
  thankYouPopup.classList.add("thank__you--active"); // Show thank you popup

  // Optionally, close thank you popup after a few seconds
  // setTimeout(closeThankYouPopup, 3000);
});

// Close Thank You PopUp when clicking outside content
thankYouPopup.addEventListener("click", function (event) {
  if (event.target === thankYouPopup) {
    closeThankYouPopup();
  }
});
//
//
//
//
//
//
//
//Безкінечний скролл фоток

const scrollers = document.querySelectorAll(".events__scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".events__scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
