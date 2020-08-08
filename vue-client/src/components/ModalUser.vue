<template>
  <section>
    <h1 class="title-section">{{user}}</h1>
    <template v-if="Object.keys(tracks).length !== 0">
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
    </template>
    <template v-else>
      <div>
        Sin registro para este usuario durante este mes
      </div>
    </template>
  </section>
</template>

<script>
export default {
  props: {
    user: String,
    tracks: Object
  },

  methods: {
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