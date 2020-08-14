<template>
  <section>
    <h1 class="title-section">{{user}}</h1>
    <div>
      Mes: 
      <select v-model="monthSelected">
        <option value="" disabled>Mes</option>
        <option v-for="(month, index) in months" :key="index" v-bind:value="month">
          {{ month }}
        </option>
      </select>
    </div>
    <TheTrack :user="user" :tracks="tracks" />
  </section>
</template>

<script>
import axios from 'axios'
import TheTrack from '@/components/TheTrack.vue'

export default {
  components: {
    TheTrack
  },

  props: {
    user: String
  },

  data() {
    return {
      tracks: {},
      months: [],
      monthSelected: ''
    }
  },

  watch: {
    async monthSelected () {
      try {
        const result = await axios.get(`/stats/stat/${this.user}/${this.monthSelected}`);
        this.tracks = result.data.tracking;
      } catch (error) {
        console.log('error al listar tracks: >> ', error);
      }
    }
  },

  created() {
    this.listMonths()
  },

  methods: {
    async listMonths () {
      try {
        const result = await axios.get(`/stats/stat/${this.user}`);
        this.months = result.data;
      } catch (error) {
        console.log('error al listar tracks: >> ', error);
      }
    }
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