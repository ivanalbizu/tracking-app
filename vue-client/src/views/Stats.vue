<template>
  <section class="details">
    <div> 
      <select v-model="monthSelected">
        <option value="" disabled>Mes</option>
        <option v-for="(month, index) in months" :key="index" v-bind:value="month">
          {{ month }}
        </option>
      </select>
    </div>
    <ul
      v-for="(track, index) in tracks" :key="index"
      class="date"
      :data-date="index"
      :data-total="totalDayTime(track[0].time_start, track[track.length-1].time_end)"
      :data-start="track[0].time_start"
      :data-end="track[track.length-1].time_end">
      <li
        class="date-bar">
        <span class="date-bar-title">{{index}}</span>
        <ul class="date-track">
          <li
            v-for="(day, index) in track" :key="index"
            :data-type="day.type"
            :data-start="day.time_start"
            :data-end="day.time_end"
            :style="widthBar(totalDayTime(track[0].time_start, track[track.length-1].time_end), day.time_start, day.time_end)">
            <span class="time-start">{{day.time_start}}</span>
            <span class="time-end">{{day.time_end}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'stats',
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
        const result = await axios.get(`/stats/stat/${this.monthSelected}`);
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
        const result = await axios.get('/stats/month');
        this.months = result.data;
      } catch (error) {
        console.log('error al listar tracks: >> ', error);
      }
    },
    totalDayTime(start, end) {
      return this._timeToMinutes(end) - this._timeToMinutes(start);
    },
    _timeToMinutes(time) {
      let a = time.split(':');
      if (isNaN(a[0])) {
        const date = new Date();
        a[0] = date.getHours();
        a[1] = date.getMinutes();
      }
      return (+a[0]) * 60 + (+a[1]);
    },
    widthBar(total, start, end) {
      return `width: ${((this._timeToMinutes(end) - this._timeToMinutes(start)) / total) * 100}%`
    }
  }
}
</script>