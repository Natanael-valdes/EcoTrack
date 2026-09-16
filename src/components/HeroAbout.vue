<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import img1 from "../assets/IMG/Team.jpg";
import img2 from "../assets/IMG/clener team.png";
import img3 from "../assets/IMG/naturaleza fts.png";

const slides = [
  { img: img1, alt: "Volunteers cleaning a river" },
  { img: img2, alt: "Volunteers collecting garbage" },
  { img: img3, alt: "Environmental volunteering" },
];

const activeIndex = ref(0);
const touchStartX = ref(0);
const touchStartY = ref(0);
let autoplayId = null;

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % slides.length;
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
}

function goToSlide(i) {
  activeIndex.value = i;
}

/* Swipe: solo se dispara si el gesto fue claramente horizontal.
   Si el usuario desliza más vertical que horizontal, se ignora
   para no interferir con el scroll de la página. */
function onTouchStart(e) {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
}

function onTouchEnd(e) {
  const diffX = touchStartX.value - e.changedTouches[0].clientX;
  const diffY = touchStartY.value - e.changedTouches[0].clientY;

  if (Math.abs(diffY) > Math.abs(diffX)) return;

  if (diffX > 50) nextSlide();
  if (diffX < -50) prevSlide();
}

/* Autoplay cada 6s */
onMounted(() => {
  autoplayId = setInterval(nextSlide, 6000);
});

onBeforeUnmount(() => {
  if (autoplayId) clearInterval(autoplayId);
});
</script>

<template>
  <section
    class="hero-carousel"
    @touchstart.passive="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- ============ FONDO: CARRUSEL DE IMÁGENES ============ -->
    <div class="carousel-bg">
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
        </div>
      </div>

      <div class="overlay"></div>
    </div>

    <!-- ============ HERO SOBRE EL CARRUSEL ============ -->
    <div class="hero-content">
      <h1>About EcoTeam</h1>

      <p class="about-subtitulo">
        Welcome to EcoTrack! We are a dedicated group of individuals passionate
        about environmental sustainability, community action, and ecological
        awareness.
      </p>
    </div>

    <!-- ============ FLECHAS ============ -->
    <button class="btn prev" aria-label="Previous" @click="prevSlide">
      &#10094;
    </button>
    <button class="btn next" aria-label="Next" @click="nextSlide">
      &#10095;
    </button>

    <!-- ============ INDICADORES ============ -->
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
/* =========================================================
   CONTENEDOR PRINCIPAL (Desktop)
   ========================================================= */
.hero-carousel {
  position: relative;
  width: 100%;
  min-height: 620px;
  height: 78vh;
  max-height: 780px;
  overflow: hidden;
  isolation: isolate;
  background: #0d1f12;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y;
}

/* =========================================================
   FONDO — CARRUSEL
   ========================================================= */
.carousel-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1);
}

.slide {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  min-width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1.06);
  transition: transform 6s ease-out;
  will-change: transform;
}

.slide.active img {
  transform: scale(1.14);
}

/* Overlay */
.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.55) 60%,
      rgba(0, 0, 0, 0.7) 100%
    ),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 40%,
      rgba(0, 0, 0, 0.55) 100%
    );
}

/* =========================================================
   HERO
   ========================================================= */
.hero-content {
  position: relative;
  z-index: 5;
  text-align: center;
  max-width: 780px;
  padding: 2rem 1.5rem;
  animation: fadeUp 1s ease both;
}

.hero-content h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin: 0 0 1.25rem;
  line-height: 1.1;
  text-shadow:
    0 2px 14px rgba(0, 0, 0, 0.55),
    0 8px 32px rgba(0, 0, 0, 0.4);
}

.about-subtitulo {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.94);
  max-width: 620px;
  margin: 0 auto;
  font-weight: 400;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.45);
}

/* =========================================================
   FLECHAS (solo desktop)
   ========================================================= */
.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.25s ease;
}

.btn:hover {
  background: rgba(76, 175, 80, 0.85);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%) scale(1.08);
}

.btn:active {
  transform: translateY(-50%) scale(0.94);
}

.btn:focus-visible {
  outline: 2px solid #a8e6b3;
  outline-offset: 3px;
}

.prev {
  left: clamp(1rem, 2.5vw, 2rem);
}

.next {
  right: clamp(1rem, 2.5vw, 2rem);
}

/* =========================================================
   INDICADORES
   ========================================================= */
.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 20;
  padding: 0.55rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.carousel-indicators span {
  display: block;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  cursor: pointer;
  transition:
    width 0.35s cubic-bezier(0.65, 0, 0.35, 1),
    background 0.3s ease,
    transform 0.2s ease;
}

.carousel-indicators span:hover {
  background: rgba(255, 255, 255, 0.85);
  transform: scale(1.2);
}

.carousel-indicators span.active {
  width: 30px;
  border-radius: 999px;
  background: linear-gradient(90deg, #a8e6b3, #4caf50);
  box-shadow: 0 0 12px rgba(168, 230, 179, 0.6);
}

/* =========================================================
   ANIMACIÓN
   ========================================================= */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================================================
   RESPONSIVE — Tablet
   ========================================================= */
@media (max-width: 1024px) {
  .hero-content {
    max-width: 620px;
  }
}

/* =========================================================
   RESPONSIVE — Móvil
   Imagen respeta proporciones, flechas ocultas,
   indicadores flotando sobre la parte baja de la imagen.
   ========================================================= */
@media (max-width: 768px) {
  .hero-carousel {
    height: auto;
    min-height: 0;
    max-height: none;
    display: block;
  }

  .carousel-bg {
    position: relative;
    height: auto;
  }

  .slides {
    height: auto;
    align-items: flex-start;
  }

  .slide {
    height: auto;
    display: flex;
    flex-direction: column;
  }

  /* Imagen completa respetando proporciones */
  .slide img {
    width: 100%;
    height: auto;
    object-fit: unset;
    object-position: unset;
    transform: none !important;
    display: block;
  }

  .slide.active img {
    transform: none !important;
  }

  /* Overlay cubre solo la imagen */
  .overlay {
    position: absolute;
    inset: 0;
  }

  /* Hero centrado sobre la imagen */
  .hero-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 1.25rem;
    height: 100%;
    margin: 0;
  }

  .hero-content h1 {
    font-size: clamp(1.7rem, 7vw, 2.4rem);
    margin-bottom: 0.9rem;
  }

  .about-subtitulo {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  /* Sin flechas en móvil: navegación por swipe */
  .btn {
    display: none;
  }

  /* ===== INDICADORES SOBRE LA IMAGEN (Variante A) ===== */
  .carousel-indicators {
    position: absolute;
    bottom: 1.1rem;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0.5rem 0.9rem;
    gap: 8px;
    background: rgba(0, 0, 0, 0.38);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
  }

  .carousel-indicators span {
    background: rgba(255, 255, 255, 0.5);
    width: 7px;
    height: 7px;
  }

  .carousel-indicators span:hover {
    background: rgba(255, 255, 255, 0.85);
    transform: scale(1.15);
  }

  .carousel-indicators span.active {
    width: 26px;
    background: linear-gradient(90deg, #a8e6b3, #4caf50);
    box-shadow: 0 0 12px rgba(168, 230, 179, 0.7);
  }
}

/* =========================================================
   RESPONSIVE — Móvil pequeño
   ========================================================= */
@media (max-width: 420px) {
  .hero-content h1 {
    font-size: 1.55rem;
  }

  .about-subtitulo {
    font-size: 0.88rem;
  }

  .carousel-indicators {
    bottom: 0.85rem;
    padding: 0.45rem 0.8rem;
  }

  .carousel-indicators span {
    width: 6px;
    height: 6px;
  }

  .carousel-indicators span.active {
    width: 22px;
  }
}

/* =========================================================
   Accesibilidad
   ========================================================= */
@media (prefers-reduced-motion: reduce) {
  .slides,
  .slide img,
  .btn,
  .carousel-indicators span,
  .hero-content {
    transition: none !important;
    animation: none !important;
  }
}
</style>
