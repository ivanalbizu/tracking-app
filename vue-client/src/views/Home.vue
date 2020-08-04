<template>
  <section class="home">
    <div class="cards">
      <article class="card">
        <header class="card__header">
          <h3>Estadísticas</h3>
        </header>
        <main class="card__body">
          <p>Visualiza como fue tu tracking durante los días anteriores, eligiendo el mes que quieras visualizar</p>
        </main>
        <footer class="card__footer">
          <router-link class="btn btn--see" to="/stats">Ir a estadísticas</router-link>
        </footer>
      </article>
      <article class="card">
        <header class="card__header">
          <h3>Tracking</h3>
        </header>
        <main class="card__body">
          <p>Inicia el seguimiento de tus tiempos trabajados y las pausas que vas tomando durante tu jornada laboral</p>
        </main>
        <footer class="card__footer">
          <router-link class="btn btn--see" to="/track">Ir a tracker</router-link>
        </footer>
      </article>
      <article class="card">
        <header class="card__header">
          <h3>Configuración</h3>
        </header>
        <main class="card__body">
          <p>Accede a tu panel de control para configurar alertas, tu jornada laboral por días, horarios de entrada y salidas</p>
        </main>
        <footer class="card__footer">
          <router-link class="btn btn--see" to="/config">Ir a configuración</router-link>
        </footer>
      </article>
    </div>
  </section>
</template>