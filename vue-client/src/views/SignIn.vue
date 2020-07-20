<template>
  <div class="login">
		<img class="logo" src="@/assets/logo.svg" alt="Logo" />
    <form @submit.prevent="submit">
      <div class="form-control">
        <label class="label" for="email">Email</label>
        <input class="input" type="text" name="email" id="email" v-model="form.email">
      </div>
      <div class="form-control">
        <label class="label" for="password">Password</label>
        <input class="input" type="password" name="password" id="password" v-model="form.password">
      </div>
      <div class="form-control">
        <button class="btn btn--block" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'signin',
  components: {
    //
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    document.body.classList.add('signin')
  },
  destroyed () {
    document.body.classList.remove('signin')
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),

    async submit() {
      this.signIn(this.form)
        .then(async () => {
          await this.$router.push('/', () => {})
        }).catch(error => {
          console.log('error en submit:>> ', error);
        })
    }
  }
}
</script>

<style lang="scss">
  .signin {
    .ham,
    .header,
    .aside {
      display: none;
    }
    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>