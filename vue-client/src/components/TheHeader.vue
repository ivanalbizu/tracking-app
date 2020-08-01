<template>
  <header class="header">
    <template v-if="authenticated">
      <h1 class="title-page">{{user.name}}</h1>
      <button class="btn btn--signout" type="button" @click.prevent="signOut">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/></svg>
      </button>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },

  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),
    signOut() {
      this.signOutAction().then(() => {
        if (this.$route.name !== 'signin') this.$router.push("/signin");
      })
    }
  }
}
</script>