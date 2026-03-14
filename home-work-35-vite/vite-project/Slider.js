export class CoolSlider {
  constructor() {
    this.index = 0;
    this.autoplay = true;
    this.intervalId = null;
    this.TimeOutSec = 4;
    this.startX = 0;

    this.getElementsFromPage();
    this.init();
  }

  getElementsFromPage() {
    this.track = document.querySelector(".flash-track");
    this.cards = document.querySelectorAll(".product-card");
    this.prevBtn = document.querySelector(".flash-prev");
    this.nextBtn = document.querySelector(".flash-next");
    this.toggleBtn = document.querySelector(".flash-toggle");
    this.dotsContainer = document.querySelector(".flash-dots");
  }

  init() {
    this.createDots();
    this.updateSlider();
    this.startAuto();
    this.addEvents();
  }

  cardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  updateSlider() {
    const cardWidth = this.cards[0].offsetWidth;
    this.track.style.transform = `translateX(-${this.index * cardWidth}px)`;
    this.updateDots();
  }

  next() {
    this.index++;
    if (this.index > this.cards.length - this.cardsPerView()) {
      this.index = 0;
    }
    this.updateSlider();
  }

  prev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.cards.length - this.cardsPerView();
    }
    this.updateSlider();
  }

  createDots() {
    this.dotsContainer.innerHTML = "";
    const count = this.cards.length - this.cardsPerView() + 1;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");

      if (i === this.index) dot.classList.add("active");

      dot.addEventListener("click", () => {
        this.index = i;
        this.updateSlider();
      });

      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll("button");

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === this.index);
    });
  }

  startAuto() {
    this.intervalId = setInterval(() => {
      this.next();
    }, this.TimeOutSec * 1000);
  }

  stopAuto() {
    clearInterval(this.intervalId);
  }

  toggleAutoplay() {
    this.autoplay = !this.autoplay;

    if (this.autoplay) {
      this.startAuto();
      this.toggleBtn.textContent = "⏸";
    } else {
      this.stopAuto();
      this.toggleBtn.textContent = "▶";
    }
  }

  addEvents() {
    this.nextBtn.addEventListener("click", () => this.next());
    this.prevBtn.addEventListener("click", () => this.prev());
    this.toggleBtn.addEventListener("click", () => this.toggleAutoplay());

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    });

    this.track.addEventListener("touchstart", (e) => {
      this.startX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", (e) => {
      const diff = this.startX - e.changedTouches[0].clientX;
      if (diff > 50) this.next();
      if (diff < -50) this.prev();
    });

    window.addEventListener("resize", () => {
      this.index = 0;
      this.createDots();
      this.updateSlider();
    });
  }
}
