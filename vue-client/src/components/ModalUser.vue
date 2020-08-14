<template>
  <section>
    <h1 class="title-section">{{user}}</h1>
    <TheTrack :user="user" />
  </section>
</template>

<script>
import TheTrack from '@/components/TheTrack.vue'

export default {
  components: {
    TheTrack
  },

  props: {
    user: String
  }

}
</script>

<style lang="scss">
  .vm--modal {
    margin-bottom: auto;
    max-height: 90vh;
    overflow-y: auto;
    > section {
      padding: 1em 2em;
    }
  }
</style>