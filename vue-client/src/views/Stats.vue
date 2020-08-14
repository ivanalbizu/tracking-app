<template>
  <section class="details">
    <div>
      Mes:
      <select v-model="monthSelected">
        <option value="" disabled>Mes</option>
        <option v-for="(month, index) in months" :key="index" v-bind:value="month">
          {{ month }}
        </option>
      </select>
    </div>
    <TheTrack :tracks="tracks" />
  </section>
</template>

<script>
import axios from 'axios'
import TheTrack from '@/components/TheTrack.vue'

export default {
  name: 'stats',

  components: {
    TheTrack
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
        const result = await axios.get(`/stats/stat/me/${this.monthSelected}`);
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
        const result = await axios.get('/stats/stat/me');
        this.months = result.data;
      } catch (error) {
        console.log('error al listar tracks: >> ', error);
      }
    }
  }

}
</script>