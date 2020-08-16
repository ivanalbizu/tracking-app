<template>
  <div class="signin">
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
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 200px;
    padding: 0 10px 10px;
  }
  &-form {
    width: 360px;
    max-width: 98%;
    margin: auto;
    background-color: #fff;
    padding: 30px 25px;
    box-shadow: 0 0 5px rgba(0,0,0,.1);
    border-radius: 3px;
  }
  .ham,
  .header,
  .aside {
    display: none;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .main {
      background-color: #fff;
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>