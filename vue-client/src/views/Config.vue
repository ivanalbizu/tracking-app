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
					<h3 class="title-card">Notificaciones</h3>
				</header>
				<main class="card__body">
					<div class="form-control">
						<label class="label">
							<span>Notificar por tiempo en pausa (minutos)</span>
							<input class="input" type="number" min="1" max="480" v-model="notifyTimeOut">
						</label>
					</div>
					<button class="btn btn--see" type="button" @click="saveNotifyTime()">Guardar</button>
				</main>
			</article>

			<article class="card">
				<header class="card__header">
					<h3 class="title-card">Cambiar contraseña</h3>
				</header>
				<main class="card__body">
					<div class="form-control">
						<div class="form-control">
							<label class="label">
								<span>Contraseña actual</span>
								<input class="input" type="text" v-model="password.old_password">
							</label>
						</div>
						<div class="form-control">
							<label class="label">
								<span>Nueva contraseña</span>
								<input class="input" type="text" v-model="password.new_password">
							</label>
						</div>
						<div class="form-control">
							<label class="label">
								<span>Confirmar contraseña</span>
								<input class="input" type="text" v-model="password.new_password_confirm">
							</label>
						</div>
					</div>
					<button class="btn btn--see" type="button" @click="changePassword()">Cambiar contraseña</button>
				</main>
			</article>

			<template v-if="user">
				<article class="card" v-if="user.role=='ADMIN'">
					<header class="card__header">
						<h3 class="title-card">Crear usuario</h3>
					</header>
					<main class="card__body">
						<div class="form-control">
							<div class="form-control">
								<label class="label">
									<span>Nombre</span>
									<input class="input" type="text" v-model="userCreate.name">
								</label>
							</div>
							<div class="form-control">
								<label class="label">
									<span>Email</span>
									<input class="input" type="text" v-model="userCreate.email">
								</label>
							</div>
							<div class="form-control">
								<label class="label">
									<span>Contraseña</span>
									<input class="input" type="text" v-model="userCreate.password">
								</label>
							</div>
							<div class="form-control">
								<label class="label">
									Role
									<select v-model="userCreate.role">
										<option value="USER">User</option>
										<option value="ADMIN">Admin</option>
									</select>
								</label>
							</div>
						</div>
						<button class="btn btn--see" type="button" @click="createUser()">Crear usuario</button>
					</main>
				</article>
			</template>
		</div>
  </section>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters} from 'vuex'

export default {
	data() {
		return {
			journals: [],
			notifyTimeOut: 0,
			password: {
				old_password: "",
				new_password: "",
				new_password_confirm: ""
			},
			userCreate: {
				email: "",
				password: "",
				name: "",
				role: "USER"
			}
		}
	},

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
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
				this.journals = result.data.config.journal;
				this.notifyTimeOut = Math.floor(result.data.config.notifyTimeOut / 60000);
      } catch (error) {
				console.log('error GET track del día: >> ', error);
      }
		},

		async saveNotifyTime () {
			try {
				const timeOut = this.notifyTimeOut*60000;
				const result = await axios.post('/config/notify-time', {"notifyTimeOut":timeOut});
				this.$store.commit('SET_NOTIFICATION', timeOut)
				this.$toasted.show(result.data.message, {
					type : 'success'
				})
      } catch (error) {
        console.log('error al enviar POST para actualizar jornada laboral: >> ', error);
			}
		},

		async saveJournal () {
			try {
				const result = await axios.post('/config', this.journals);
				this.$toasted.show(result.data.message, {
					type : 'success'
				})
      } catch (error) {
        console.log('error al enviar POST para actualizar jornada laboral: >> ', error);
			}
		},

		async changePassword () {
			if (this.password.new_password !== this.password.new_password_confirm) {
				//Confirmación de contraseña incorrecta
				return this.$toasted.show('Confirmación de contraseña incorrecta', {
					type : 'error'
				})
			}
			try {
				const result = await axios.post('/config/reset-password', this.password);
				if (!result.data.success) {
					//La contraseña actual no es correcta
					return this.$toasted.show(result.data.message, {
						type : 'error'
					})
				}
				this.signOutAction().then(() => {
					this.$toasted.show('Contraseña cambiada correctamente', {
						type : 'success'
					})
					if (this.$route.name !== 'signin') this.$router.push("/signin");
				})
			} catch (error) {
				console.log('error al enviar POST para iniciar tiempo de trabajo: >> ', error);
			}
		},

		async createUser () {
			try {
				const result = await axios.post('/config/create-user', this.userCreate);
				if (!result.data.success) {
					return this.$toasted.show(result.data.message, {
						type : 'error'
					})
				}
				this.userCreate = {
					email: "",
					password: "",
					name: "",
					role: "USER"
				}
				this.$toasted.show(result.data.message, {
					type : 'success'
				})
			} catch (error) {
				console.log('error al enviar POST para iniciar tiempo de trabajo: >> ', error);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.planning {
  &-time {
    display: flex;
    justify-content: space-between;
    .dia {
      width: 100px;
    }
  }
}
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