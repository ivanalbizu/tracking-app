<template>
  <section class="config">
		<h2 class="title-section">Personalización</h2>
		<div class="cards">
			<article class="card">
				<header class="card__header">
					<h3>Alertas</h3>
				</header>
				<main class="card__body">
					<div class="form-control">
						<div>TO-DO Notificaciones por tiempos de inactividad durante las pausas</div>
					</div>
				</main>
				<main class="card__body">
					<div class="form-control">
						<div class="planing-time">
							<div class="dia"></div>
							<div class="comienzo">Hora inicio</div>
							<div class="fin">Hora fin</div>
						</div>
						<div v-for="journal in journals" :key="journal.day" class="planing-time">
							<div class="dia">{{journal.day}}</div>
							<div class="comienzo">
								<input class="js-time" type="time" v-model="journal.start" :name="`start${journal.start}`" :id="`start${journal.start}`" required>
							</div>
							<div class="fin">
								<input class="js-time" type="time" v-model="journal.end" :name="`end${journal.end}`" :id="`end${journal.end}`" required>
							</div>
						</div>
					</div>
					<button class="btn btn--see" id="save-journal" type="button" @click="saveJournal()">Guardar</button>
				</main>
			</article>
		</div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			journals: []
		}
	},

	created() {
		this.listarJournal()
	},

	methods: {
		async listarJournal () {
      try {
				const result = await axios.get('/config');
				this.journals = result.data;
      } catch (error) {
        console.log('error GET track del día: >> ', error);
      }
		},
		async saveJournal () {
      try {
				await axios.post('/config', this.journals);
      } catch (error) {
        console.log('error al enviar POST para iniciar tiempo de trabajo: >> ', error);
      }
		}
	}
}
</script>