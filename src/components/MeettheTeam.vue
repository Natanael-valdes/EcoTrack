<script setup>
const team = [
  {
    name: "Giselle",
    role: "CEO",
    desc: "Leads the team and helps guide the vision and development of EcoTrack.",
    img: new URL("../assets/IMG/Wafles.jpg", import.meta.url).href,
  },
  {
    name: "Nathan",
    role: "BackEnd Developer",
    desc: "Backend developer responsible for building and supporting the systems behind EcoTrack.",
    img: new URL("../assets/IMG/nathan.jpg", import.meta.url).href,
  },

  {
    name: "Marcela",
    role: "FrontEnd Developer",
    desc: "Frontend developer focused on creating an accessible and engaging user experience.",
    img: new URL("../assets/IMG/mache.jpg", import.meta.url).href,
  },
  {
    name: "Emely",
    role: "Marketing",
    desc: "Works on communication and marketing strategies to connect EcoTrack with its community.",
    img: new URL("../assets/IMG/emi.jpg", import.meta.url).href,
  },
  {
    name: "Xavier",
    role: "Graphic Designer",
    desc: "Creates the visual identity and graphic elements that represent EcoTrack.",
    img: new URL("../assets/IMG/Xavi.jpg", import.meta.url).href,
  },
];
</script>

<template>
  <section class="team-section">
    <div class="team-inner">
      <!-- ============ EQUIPO ============ -->
      <section class="EQUIPO">
        <h1 class="team-title">
          <span>Meet the team</span>
        </h1>

        <div v-for="member in team" :key="member.name" class="meetteam">
          <img :src="member.img" :alt="member.name" class="fotoabout" />

          <div class="nombreDescripcion">
            <h2>
              {{ member.name }}
              <span class="role">{{ member.role }}</span>
            </h2>
            <p>{{ member.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ============ MISIÓN ============ -->
      <section class="about-carta">
        <h2>Our Mission</h2>

        <p>
          Our mission is to empower communities and individuals with the tools,
          knowledge, and resources needed to reduce their environmental
          footprint and live more sustainable lives.
        </p>

        <h2>What We Do</h2>

        <ul class="about-list">
          <li>Provide up-to-date environmental news and insights.</li>

          <li>
            Offer creative guides and help for handicrafts made from recycled
            materials.
          </li>

          <li>
            Map out eco-friendly locations, recycling centers, and green spaces.
          </li>
        </ul>
      </section>

      <!-- ============ CONTACTO ============ -->
      <section class="about-cartacontacto">
        <h2>Get in Touch</h2>

        <p>
          If you want to collaborate or learn more about our initiative, feel
          free to reach out to us!
        </p>
      </section>
    </div>
  </section>
</template>

<style scoped>
/* =========================================================
   WRAPPER + VARIABLES
   ========================================================= */
.team-section {
  --green-900: #1e3d1a;
  --green-700: #2d5a27;
  --green-500: #4caf50;
  --green-300: #a8e6b3;
  --green-100: #eef7ed;
  --ink-700: #3a3a3a;
  --ink-500: #6b7280;
  --line: #e8eee9;
  --radius-lg: 18px;
  --radius-md: 14px;
  --shadow-sm:
    0 1px 2px rgba(20, 40, 25, 0.04), 0 2px 8px rgba(20, 40, 25, 0.05);
  --shadow-md:
    0 4px 12px rgba(20, 40, 25, 0.07), 0 12px 32px rgba(20, 40, 25, 0.08);

  width: 100%;
  padding: 0 1.5rem 5rem;
  font-family:
    "Inter",
    "Segoe UI",
    system-ui,
    -apple-system,
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;
  color: var(--green-900);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.team-inner {
  max-width: 980px;
  margin: 0 auto;
}

/* =========================================================
   EQUIPO — Título
   ========================================================= */
.EQUIPO {
  margin-bottom: 5rem;
}

.team-title {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--green-900);
  margin: 0 0 3rem;
  text-align: center;
  position: relative;
}

.team-title span {
  display: inline-block;
  position: relative;
  padding-bottom: 1rem;
}

.team-title span::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 56px;
  height: 4px;
  background: linear-gradient(90deg, var(--green-500), var(--green-700));
  border-radius: 4px;
}

/* =========================================================
   EQUIPO — Tarjetas
   ========================================================= */
.meetteam {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1.75rem;
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  margin-bottom: 1rem;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.35s ease;
  position: relative;
  overflow: hidden;
}

.meetteam::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--green-500), var(--green-700));
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.meetteam:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #d6e8d8;
}

.meetteam:hover::before {
  transform: scaleY(1);
}

.fotoabout {
  flex-shrink: 0;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffffff;
  outline: 2px solid var(--green-100);
  outline-offset: 3px;
  box-shadow: 0 4px 14px rgba(45, 90, 39, 0.12);
  transition:
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    outline-color 0.3s ease,
    box-shadow 0.4s ease;
}

.meetteam:hover .fotoabout {
  transform: scale(1.04);
  outline-color: var(--green-300);
  box-shadow: 0 8px 22px rgba(45, 90, 39, 0.2);
}

.nombreDescripcion {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.nombreDescripcion h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--green-900);
  letter-spacing: -0.01em;
  line-height: 1.35;
  transition: color 0.25s ease;
}

.nombreDescripcion h2 .role {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.15rem 0.7rem;
  background: var(--green-100);
  color: var(--green-700);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 999px;
  vertical-align: middle;
  transition:
    background 0.25s ease,
    color 0.25s ease;
}

.meetteam:hover .nombreDescripcion h2 .role {
  background: var(--green-300);
  color: var(--green-900);
}

.nombreDescripcion p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--ink-500);
  max-width: 620px;
}

/* =========================================================
   MISIÓN / WHAT WE DO
   ========================================================= */
.about-carta {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 2.5rem 2.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.about-carta::before {
  content: "";
  position: absolute;
  left: 0;
  top: 2.5rem;
  bottom: 2.5rem;
  width: 4px;
  background: linear-gradient(180deg, var(--green-500), var(--green-700));
  border-radius: 0 4px 4px 0;
}

.about-carta h2 {
  color: var(--green-900);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 1rem;
  line-height: 1.3;
}

.about-carta h2:not(:first-child) {
  margin-top: 2rem;
}

.about-carta p {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--ink-700);
  margin: 0 0 1rem;
}

.about-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.about-list li {
  position: relative;
  padding-left: 2rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--ink-700);
}

.about-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--green-100);
  border: 1.5px solid var(--green-500);
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232d5a27' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg>");
  background-size: 0.75rem;
  background-position: center;
  background-repeat: no-repeat;
}

/* =========================================================
   CONTACTO
   ========================================================= */
.about-cartacontacto {
  background: linear-gradient(135deg, var(--green-100) 0%, #f7fbf7 100%);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #d6e8d8;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.about-cartacontacto::before {
  content: "";
  position: absolute;
  top: -60px;
  right: -60px;
  width: 180px;
  height: 180px;
  background: radial-gradient(
    circle,
    rgba(76, 175, 80, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
}

.about-cartacontacto h2 {
  color: var(--green-900);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 0.75rem;
  position: relative;
}

.about-cartacontacto p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink-700);
  margin: 0 auto;
  max-width: 540px;
  position: relative;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .team-section {
    padding: 0 1.25rem 4rem;
  }

  .EQUIPO {
    margin-bottom: 3.5rem;
  }

  .meetteam {
    padding: 1.5rem 1.5rem;
    gap: 1.25rem;
  }

  .fotoabout {
    width: 88px;
    height: 88px;
  }

  .about-carta,
  .about-cartacontacto {
    padding: 2rem 1.75rem;
  }

  .about-carta::before {
    top: 2rem;
    bottom: 2rem;
  }
}

@media (max-width: 560px) {
  .meetteam {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem 1.25rem 1.5rem;
    gap: 1rem;
    justify-items: center;
  }

  .meetteam::before {
    width: 100%;
    height: 4px;
    top: 0;
    bottom: auto;
    transform: scaleX(0);
    transform-origin: left;
    background: linear-gradient(90deg, var(--green-500), var(--green-700));
  }

  .meetteam:hover::before {
    transform: scaleX(1);
  }

  .fotoabout {
    width: 110px;
    height: 110px;
  }

  .nombreDescripcion {
    align-items: center;
  }

  .nombreDescripcion h2 {
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .nombreDescripcion h2 .role {
    display: block;
    margin: 0.35rem auto 0;
    width: fit-content;
  }

  .nombreDescripcion p {
    font-size: 0.92rem;
  }

  .about-carta,
  .about-cartacontacto {
    padding: 1.75rem 1.35rem;
    border-radius: var(--radius-md);
  }

  .about-carta::before {
    top: 1.75rem;
    bottom: 1.75rem;
  }

  .about-carta h2 {
    font-size: 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .meetteam,
  .meetteam::before,
  .fotoabout,
  .nombreDescripcion h2,
  .nombreDescripcion h2 .role {
    transition: none !important;
  }
}
</style>
