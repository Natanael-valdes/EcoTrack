<script setup>
import { ref } from "vue";
import img1 from "../assets/IMG/Team.jpg";
import img2 from "../assets/IMG/clener team.png";
import img3 from "../assets/IMG/naturaleza fts.png";

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

        <!-- Indicadores dentro del slide: en móvil quedan entre foto y texto -->
        <div class="carousel-indicators">
          <span
            v-for="(s, j) in slides"
            :key="j"
            :class="{ active: j === activeIndex }"
            @click="goToSlide(j)"
          ></span>
        </div>

        <div class="carousel-team">
          <span>{{ slide.label }}</span>
          <h1 v-html="slide.title"></h1>
          <p>{{ slide.text }}</p>
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
  </section>
</template>

<style scoped>
/* =========================================================
   CARRUSEL — Contenedor principal
   ========================================================= */
.carousel {
  position: relative;
  width: 100%;
  height: 78vh;
  min-height: 540px;
  margin: 0;
  overflow: hidden;
  background: #0d1f12;
  isolation: isolate;
}

/* =========================================================
   Pista de slides
   ========================================================= */
.slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
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

/* Ken Burns: la imagen activa se va acercando lentamente */
.slide.active img {
  transform: scale(1.14);
}

/* =========================================================
   Overlay cinematográfico
   ========================================================= */
.slide::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.78) 0%,
      rgba(0, 0, 0, 0.55) 30%,
      rgba(0, 0, 0, 0.22) 65%,
      rgba(0, 0, 0, 0.08) 100%
    ),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 0%,
      transparent 30%,
      transparent 65%,
      rgba(0, 0, 0, 0.55) 100%
    );
}

/* =========================================================
   Bloque de texto (carousel-team)
   ========================================================= */
.carousel-team {
  position: absolute;
  z-index: 5;
  left: clamp(1.5rem, 7%, 6rem);
  bottom: clamp(4rem, 14%, 9rem);
  max-width: min(560px, 55%);
  color: #fff;
  animation: fadeUp 0.9s ease both;
}

.carousel-team span {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: #a8e6b3;
  text-transform: uppercase;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 2.4rem;
}

.carousel-team span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 1.6rem;
  height: 2px;
  background: #a8e6b3;
  border-radius: 2px;
  transform: translateY(-50%);
}

.carousel-team h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: clamp(2rem, 4.4vw, 3.8rem);
  line-height: 1.05;
  margin: 0 0 1.1rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #ffffff;
  text-shadow:
    0 2px 12px rgba(0, 0, 0, 0.55),
    0 6px 30px rgba(0, 0, 0, 0.35);
}

.carousel-team p {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: clamp(0.95rem, 1.15vw, 1.1rem);
  line-height: 1.65;
  max-width: 520px;
  margin: 0 0 1.8rem;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
}

/* =========================================================
   Botón (hero-button)
   ========================================================= */
.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.9rem;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  cursor: pointer;
  box-shadow:
    0 8px 22px rgba(46, 125, 50, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.hero-button:hover {
  transform: translateY(-3px);
  background: linear-gradient(135deg, #66bb6a, #388e3c);
  box-shadow:
    0 12px 28px rgba(46, 125, 50, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.hero-button:active {
  transform: translateY(-1px);
}

/* =========================================================
   Flechas de navegación
   ========================================================= */
.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.25s ease,
    box-shadow 0.3s ease;
}

.btn:hover {
  background: rgba(76, 175, 80, 0.85);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
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
   Indicadores (posición absoluta en desktop)
   ========================================================= */
.carousel-indicators {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 20;
  padding: 0.55rem 1rem;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
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
   Animación del bloque de texto
   ========================================================= */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
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
  .carousel-team {
    max-width: 65%;
  }
}

/* =========================================================
   RESPONSIVE — Móvil
   Estructura: foto arriba → indicadores → texto sobre blanco
   ========================================================= */
@media (max-width: 768px) {
  .carousel {
    height: auto;
    min-height: 0;
    aspect-ratio: auto;
    background: #ffffff;
  }

  .slides {
    height: auto;
    align-items: flex-start;
  }

  .slide {
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 0;
    background: #ffffff;
  }

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

  /* Sin overlay en móvil: el texto ya no va encima de la foto */
  .slide::after {
    display: none;
  }

  /* Indicadores: fluyen entre la foto y el texto */
  .carousel-indicators {
    position: static;
    transform: none;
    margin: 1rem auto 0.5rem;
    width: fit-content;
    padding: 0.4rem 0.8rem;
    background: #f0f4f1;
    border: 1px solid #dfe9e0;
    border-radius: 999px;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .carousel-indicators span {
    background: rgba(0, 0, 0, 0.2);
  }

  .carousel-indicators span:hover {
    background: rgba(0, 0, 0, 0.35);
    transform: scale(1.15);
  }

  .carousel-indicators span.active {
    background: linear-gradient(90deg, #4caf50, #2e7d32);
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.45);
  }

  /* Texto: ahora sobre fondo blanco, tipografía oscura */
  .carousel-team {
    position: static;
    max-width: 100%;
    padding: 1rem 1.25rem 2rem;
    margin: 0;
    background: #ffffff;
    color: #1a1a1a;
    text-align: left;
    animation: none;
  }

  .carousel-team span {
    color: #2e7d32;
    font-size: 0.7rem;
    letter-spacing: 3px;
    margin-bottom: 0.7rem;
  }

  .carousel-team span::before {
    background: #2e7d32;
  }

  .carousel-team h1 {
    color: #1a1a1a;
    text-shadow: none;
    font-size: clamp(1.7rem, 7vw, 2.4rem);
    margin-bottom: 0.8rem;
  }

  .carousel-team p {
    color: #555;
    text-shadow: none;
    font-size: 0.92rem;
    line-height: 1.55;
    margin-bottom: 0;
  }

  .hero-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.88rem;
  }

  /* Sin flechas en móvil: se navega con swipe */
  .btn {
    display: none;
  }
}

/* =========================================================
   RESPONSIVE — Móvil pequeño
   ========================================================= */
@media (max-width: 420px) {
  .carousel-team h1 {
    font-size: 1.55rem;
  }

  .carousel-team p {
    font-size: 0.88rem;
    line-height: 1.5;
  }
}

/* =========================================================
   Accesibilidad — reduce movimiento
   ========================================================= */
@media (prefers-reduced-motion: reduce) {
  .slides,
  .slide img,
  .btn,
  .carousel-indicators span,
  .carousel-team {
    transition: none !important;
    animation: none !important;
  }
}
</style>
