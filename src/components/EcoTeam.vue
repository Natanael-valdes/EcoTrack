<script setup></script>

<template>
  <section class="EQUIPO">
    <h1 class="About-heroo">
      <span>Meet the team</span>
    </h1>

    <!-- NATHAN -->
    <div class="meetteam">
      <img src="../assets/IMG/nathan.jpg" alt="Nathan" class="fotoabout" />

      <div class="nombreDescripcion">
        <h2>Nathan (BackEnd Developer)</h2>

        <br />

        <p>
          Backend developer responsible for building and supporting the systems
          behind EcoTrack.
        </p>
      </div>
    </div>

    <!-- GISELLE -->
    <div class="meetteam">
      <img src="../assets/IMG/Wafles.jpg" alt="Giselle" class="fotoabout" />

      <div class="nombreDescripcion">
        <h2>Giselle (CEO)</h2>

        <br />

        <p>
          Leads the team and helps guide the vision and development of EcoTrack.
        </p>
      </div>
    </div>

    <!-- MARCELA -->
    <div class="meetteam">
      <img src="../assets/IMG/mache.jpg" alt="Marcela" class="fotoabout" />

      <div class="nombreDescripcion">
        <h2>Marcela (FrontEnd Developer)</h2>

        <br />

        <p>
          Frontend developer focused on creating an accessible and engaging user
          experience.
        </p>
      </div>
    </div>

    <!-- EMELY -->
    <div class="meetteam">
      <img src="../assets/IMG/emi.jpg" alt="Emely" class="fotoabout" />

      <div class="nombreDescripcion">
        <h2>Emely (Marketing)</h2>

        <br />

        <p>
          Works on communication and marketing strategies to connect EcoTrack
          with its community.
        </p>
      </div>
    </div>

    <!-- XAVIER -->
    <div class="meetteam">
      <img src="../assets/IMG/Xavi.jpg" alt="Xavier" class="fotoabout" />

      <div class="nombreDescripcion">
        <h2>Xavier (Graphic Designer)</h2>

        <br />

        <p>
          Creates the visual identity and graphic elements that represent
          EcoTrack.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*Tarjeta de presentacion*/
.EQUIPO {
  margin-bottom: 2%;
}

.meetteam {
  display: flex;
  margin-bottom: 2%;
}

.nombreDescripcion {
  display: flex;
  flex-direction: column;
}

.nombreDescripcion h2 {
  margin-bottom: 0px;
}

.nombreDescripcion p {
  margin: 0px;
}

.fotoabout {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #689071;
  margin-right: 1%;
}
</style>
