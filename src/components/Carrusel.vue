<script setup>
import { ref } from "vue";
import img1 from "../assets/IMG/limpieza-rio-Andarax-1280x640.jpg";
import img2 from "../assets/IMG/grupo-voluntarios-recogiendo-basura_23-2147807241.avif";
import img3 from "../assets/IMG/beneficios-voluntariado-768x575-1.jpg";

const slides = [
  {
    img: img1,
    alt: "Volunteers cleaning a river",
    label: "ECOTRACK",
    title: "Clean Today.<br>Protect Tomorrow.",
    text: "Join our community and help create cleaner rivers, greener cities and a healthier planet.",
    btnText: "Go to tracky",
    btnTo: "/tracky",
  },
  {
    img: img2,
    alt: "Volunteers collecting garbage",
    label: "COMMUNITY",
    title: "Every Action<br>Counts.",
    text: "Work together with other volunteers and make a real difference in your community.",
    btnText: "Get Involved",
    btnTo: "#Apartados",
  },
  {
    img: img3,
    alt: "Environmental volunteering",
    label: "VOLUNTEERING",
    title: "Be Part<br>of the Change.",
    text: "Small actions can inspire big changes. Together, we can build a greener future.",
    btnText: "Explore Activities",
    btnTo: "#voluntariado",
  },
];

const activeIndex = ref(0);
const touchStartX = ref(0);

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % slides.length;
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
}

function goToSlide(i) {
  activeIndex.value = i;
}

function scrollTo(hash) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function onTouchStart(e) {
  touchStartX.value = e.touches[0].clientX;
}

function onTouchEnd(e) {
  const diff = touchStartX.value - e.changedTouches[0].clientX;
  if (diff > 50) nextSlide();
  if (diff < -50) prevSlide();
}
</script>

<template>
  <section class="carousel" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <div
      class="slides"
      :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
    >
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="slide"
        :class="{ active: i === activeIndex }"
      >
        <img :src="slide.img" :alt="slide.alt" />

        <div class="carousel-content">
          <span class="carousel-label">{{ slide.label }}</span>
          <h1 v-html="slide.title"></h1>
          <p>{{ slide.text }}</p>

          <router-link
            v-if="slide.btnTo.startsWith('/')"
            :to="slide.btnTo"
            class="hero-button"
          >
            {{ slide.btnText }}
          </router-link>

          <a
            v-else
            href="#"
            class="hero-button"
            @click.prevent="scrollTo(slide.btnTo)"
          >
            {{ slide.btnText }}
          </a>
        </div>
      </div>
    </div>

    <!-- Flechas: visibles en PC, ocultas en móvil vía CSS -->
    <button class="btn prev" aria-label="Previous image" @click="prevSlide">
      &#10094;
    </button>
    <button class="btn next" aria-label="Next image" @click="nextSlide">
      &#10095;
    </button>

    <div class="carousel-indicators">
      <span
        v-for="(slide, i) in slides"
        :key="i"
        :class="{ active: i === activeIndex }"
        @click="goToSlide(i)"
      ></span>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  width: 100%;
  height: 78vh;
  min-height: 520px;
  position: relative;
  overflow: hidden;
  margin: 0;
  background: #173d20;
}

.slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.75s cubic-bezier(0.65, 0, 0.35, 1);
}

.slide {
  min-width: 100%;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1.02);
  transition: transform 1.2s ease;
}

.slide.active img {
  transform: scale(1.08);
}

.slide::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.68) 0%,
    rgba(0, 0, 0, 0.42) 35%,
    rgba(0, 0, 0, 0.12) 75%,
    rgba(0, 0, 0, 0.05) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.carousel-content {
  position: absolute;
  z-index: 5;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  max-width: 620px;
  color: white;
}

.carousel-label {
  display: inline-block;
  color: #b8e6c1;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 18px;
}

.carousel-content h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 1.02;
  margin-bottom: 22px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 3px 15px rgba(0, 0, 0, 0.4);
}

.carousel-content p {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.65;
  max-width: 520px;
  color: rgba(255, 255, 255, 0.94);
  margin-bottom: 28px;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  background: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.2);
  transition:
    background 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.hero-button:hover {
  background: #388e3c;
  transform: translateY(-3px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
}

/* Botones flechas */
.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  font-size: 27px;
  font-weight: 300;
  cursor: pointer;
  border-radius: 50%;
  transition:
    background 0.3s ease,
    transform 0.3s ease,
    border-color 0.3s ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.75);
  transform: translateY(-50%) scale(1.08);
}

.btn:active {
  transform: translateY(-50%) scale(0.94);
}

.prev {
  left: 25px;
}
.next {
  right: 25px;
}

/* Indicadores */
.carousel-indicators {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 20;
}

.carousel-indicators span {
  display: block;
  width: 9px;
  height: 9px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  cursor: pointer;
  transition:
    width 0.3s ease,
    background 0.3s ease,
    transform 0.3s ease;
}

.carousel-indicators span:hover {
  background: rgba(255, 255, 255, 0.8);
}

.carousel-indicators span.active {
  width: 30px;
  border-radius: 10px;
  background: white;
}

/* Móvil: oculta flechas, swipe táctil activo */
@media (max-width: 768px) {
  .carousel {
    height: 55vh;
    min-height: 350px;
  }

  .btn {
    display: none;
  }

  .carousel-content h1 {
    font-size: 2.2rem;
  }

  .carousel-content p {
    font-size: 0.95rem;
  }
}
</style>
