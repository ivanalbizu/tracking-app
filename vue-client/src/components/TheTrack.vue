<template>
  <div>
    <template v-if="tracks">
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
  </div>
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

<style lang="scss" scoped>
.date {
  padding: 20px 30px 5px;
  background-color: #fff;
  margin-bottom: 30px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
}
.date-bar {
  height: 80px;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 30px;
}
.date-bar-title {
  font-size: 14px;
  background: var(--color-gray-dark);
  text-align: center;
  padding: 2px;
}
li > ul {
  display: flex;
  justify-content: flex-start;
  box-shadow: 1px 1px 6px rgba(0,0,0,.2);
  margin-top: auto;
  li {
    height: 8px;
    span {
      font-size: 12px;
      font-style: italic;
      transform: translate(-50%, -30px);
      display: inline-block;
    }
    &.is-now + li {
      span {
        transform: translate(-50%, 15px);
        animation: pulse-color 1s ease infinite;
      }
    }
  }
  [data-type='work'] {
    background-color: var(--color-orange);
  }
  [data-type='break'] {
    background-color: var(--color-blue-dark);
  }
}
li[data-end] .time-end {
  display: none;
}
</style>