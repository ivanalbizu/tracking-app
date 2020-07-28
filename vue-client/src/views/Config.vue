<template>
  <section class="config">
		<h2 class="title-section">Personalización</h2>
		<div class="cards">
			<article class="card">
				<header class="card__header">
					<h3 class="title-card">Jornada laboral</h3>
				</header>
				<main class="card__body">
					<div class="form-control">
						<div class="planning-time">
							<div class="dia"></div>
							<div class="comienzo">Hora inicio</div>
							<div class="fin">Hora fin</div>
						</div>
						<div v-for="journal in journals" :key="journal.day" class="planning-time">
							<div class="dia">{{journal.day}}</div>
							<div class="comienzo">
								<input class="js-time" type="time" v-model="journal.start" :name="`start${journal.start}`" :id="`start${journal.start}`" required>
							</div>
							<div class="fin">
								<input class="js-time" type="time" v-model="journal.end" :name="`end${journal.end}`" :id="`end${journal.end}`" required>
							</div>
						</div>
					</div>
					<button class="btn btn--see" type="button" @click="saveJournal()">Guardar</button>
				</main>
			</article>

			<article class="card">
				<header class="card__header">
					<h3 class="title-card">Usuario</h3>
				</header>
				<main class="card__body">
					<div class="form-control">
						<h4 class="subtitle-card">Cambiar contraseña</h4>
						<div class="form-control">
							<label class="label">
								Contraseña actual
								<input class="input" type="text" v-model="password.old_password">
							</label>
						</div>
						<div class="form-control">
							<label class="label">
								Nueva contraseña
								<input class="input" type="text" v-model="password.new_password">
							</label>
						</div>
						<div class="form-control">
							<label class="label">
								Confirmar contraseña
								<input class="input" type="text" v-model="password.new_password_confirm">
							</label>
						</div>
					</div>
					<button class="btn btn--see" type="button" @click="changePassword()">Cambiar contraseña</button>
				</main>
			</article>
		</div>
  </section>
</template>

<script>
import axios from 'axios'
import { mapActions} from 'vuex'

export default {
	data() {
		return {
			journals: [],
			password: {
				old_password: "",
				new_password: "",
				new_password_confirm: ""
			}
		}
	},

	created() {
		this.listarJournal()
	},

	methods: {
		...mapActions({
      signOutAction: 'auth/signOut'
		}),
		
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
		},
		async changePassword () {
			if (this.password.new_password !== this.password.new_password_confirm) {
				return alert('Contraseña nueva y su confirmación no coinciden')
			}
			try {
				const result = await axios.post('/config/reset-password', this.password);
				if (!result.data.success) {
					return alert('La contraseña introducida no es correcta')
				}
				this.signOutAction().then(() => {
					if (this.$route.name !== 'signin') this.$router.push("/signin");
				})
			} catch (error) {
				console.log('error al enviar POST para iniciar tiempo de trabajo: >> ', error);
			}
		}
	}
}
</script>

<style lang="scss">
	.config {
		.cards {
			.card {
				@media (min-width: 978px) {
					width: 48%;
				}
			}
		}
	}
</style>