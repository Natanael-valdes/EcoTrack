<script setup>
import { useRouter } from "vue-router";

// 1) Traemos el router para poder navegar
const router = useRouter();

// 2) Reemplaza tu BotonMover()
function botonMover() {
  router.push("/create-account");
}

// 3) Reemplaza tu BtonPassword() — la usamos en el <a>
function btonPassword() {
  router.push("/restore-password");
}

// 4) Reemplaza tu btonChange() — se usa cuando el login es exitoso
function handleLogin() {
  router.push("/home");
}
</script>

<template>
  <div>
    <div class="contenedor-Login">
      <!-- Logo, collage, slogan -->
      <section class="izquierda-Login">
        <img src="../assets/IMG/logooo.png" alt="Eco Logo" class="logo" />

        <h2>
          Let´s <br />help<br />
          the planet<br />
          together,<br />one <span>Track</span> <br />at a time
        </h2>

        <img
          src="../assets/IMG/_TRACK__4_-removebg-preview (1).png"
          alt="Collage"
          class="collage"
        />
      </section>

      <!-- Formulario -->
      <section class="derecha">
        <div class="login">
          <h2>Log in to <span>EcoTrack</span></h2>

          <form @submit.prevent="handleLogin" class="formulario-log">
            <input
              type="text"
              placeholder="Email or Phone number"
              class="caja-texto"
            />
            <input type="password" placeholder="password" class="caja-texto" />
            <input type="submit" value="Log in" class="botoncito" />
          </form>

          <a href="#" @click.prevent="btonPassword">Forgotten password?</a>

          <button class="crear" @click="botonMover">Create new account</button>

          <p class="Eco">®EcoTrack</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.contenedor-Login {
  display: flex;
  min-height: 100vh;
}

/*Parte Izquierda Login*/
.izquierda-Login {
  width: 50%;
  padding: 50px;
  position: relative;
}

/*Logo EcoTrack*/
.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 150px;
}

/*Eslogan*/
.izquierda-Login h2 {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.05;
  color: #111;
}

/*Collage*/
.collage {
  position: absolute;
  width: 350px;
  right: 70px;
  top: 90px;
}

/*contenedor de forulario*/
.derecha {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
}

.login {
  width: 75%;
}

/*Texto Login*/
.login h2 {
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 500;
}

/*Formulario*/
.formulario-log {
  display: flex;
  flex-direction: column;
}

/*Inputs texts*/
.caja-texto {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 18px;
  margin-bottom: 18px;
  padding: 2%;
  font-size: 15px;
}

input:focus {
  outline: none;
  border: 2px solid #037027;
}

/*boton Login*/
.botoncito {
  height: 45px;
  background-color: #2d935e;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.3s;
  padding: 2%;
}

.botoncito:hover {
  background-color: #267a4d;
}

/*texto "Forgotten password?"*/
.login a {
  justify-content: center;
  text-align: center;
  display: block;
  color: #111;
  text-decoration: none;
  margin-bottom: 40px;
}

.login a:hover {
  text-decoration: underline;
}

/*Crea u a cuenta nueva boton*/
.crear {
  width: 100%;
  height: 35px;
  background-color: white;
  color: black;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.3s;
  border: gray;
}

.crear:hover {
  background-color: #e0e0e0;
}

/*CopyRight*/
.Eco {
  text-align: center;
  margin-top: 25px;
  color: #666;
  font-size: 18px;
}

@media (max-width: 900px) {
  .contenedor-Login {
    flex-direction: column;
    min-height: auto;
  }

  .izquierda-Login {
    width: 100%;
    padding: 30px;
  }

  .logo {
    margin-bottom: 20px; /* ← agrega esta línea */
  }

  .izquierda-Login h2 {
    font-size: 28px;
  }

  .collage {
    position: static;
    width: 100%;
    max-width: 300px;
    margin-top: 20px;
    right: auto;
    top: auto;
  }

  .derecha {
    width: 100%;
    border-left: none;
    border-top: 1px solid #ddd;
    padding: 30px 0;
  }

  .login {
    width: 90%;
  }
}
</style>
