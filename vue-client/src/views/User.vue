<template>
  <div v-if="tracks">
    <section>
      <h2 class="title-section">{{date}}</h2>
      <div class="wrapper-btns" id="wrapper-btns">
        <button class="btn btn--track" v-if="status.start" @click="startDay()" id="startDay()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
        <button class="btn btn--track" v-if="status.play" @click="play()" id="play">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
        <button class="btn btn--track" v-if="status.pause" @click="pause()" id="pause">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        <button class="btn btn--track" v-if="status.stop" @click="stop()" id="stop">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </button>
      </div>
    </section>
    <section class="details">
      <ul id="current-work-day" class="current-work-day" :data-date="date">
        <li v-for="(item, index) in tracks" :key="index" :data-type="item.type">
          <div class="state" v-if="item.type =='work'">Trabajo</div>
          <div class="state" v-if="item.type =='break'">Descanso</div>
          <span class="time-start">{{item.time_start}}</span>
          <span> - </span>
          <span class="time-end">{{item.time_end}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'

export default {
  data () {
    return {
      tracks: [],
      date: "",
      status: {},
      notifyID: null
    }
  },

  created () {
    this.listarTracks()
    this.today()
  },

  methods: {
    today () {
      this.date = this._getDate(new Date())
    },

    statusHandler (data) {
      if (data) {
        switch (data[data.length - 1].type) {
          case "work":
            this.status = { start: false, play: false, pause: true, stop: true }
            break;
          case "break":
            this.status = { start: false, play: true, pause: false, stop: true }
            break;
          case "stop":
            this.status = { start: false, play: true, pause: true, stop: false }
            break;
          default:
            break;
        }
      } else {
        this.status = { start: true, play: false, pause: false, stop: false }
      }
    },

    async listarTracks () {
      //const data = this._request();
      try {
        const result = await axios.get(`/user`);
        if (!result.status === 200) {
          this.$router.push('/login');
        }
        this.statusHandler(result.data);
        if (result.data) {
          this.tracks = result.data;
        }
      } catch (error) {
        console.log('error GET track del día: >> ', error);
      }
    },

    async startDay () {
      this.status = { start: false, play: false, pause: true, stop: true };
      const data = this._request();
      try {
        const result = await axios.post('/user/start', data);
        this.tracks = result.data;
      } catch (error) {
        console.log('error al enviar POST para comenzar la grabación del día: >> ', error);
      }
    },

    async play () {
      this.notifyDelete(this.notifyID)

      this.status = { start: false, play: false, pause: true, stop: true };
      const data = this._request();
      try {
        const result = await axios.post('/user/play', data);
        this.tracks = result.data;
      } catch (error) {
        console.log('error al enviar POST para iniciar tiempo de trabajo: >> ', error);
      }
    },

    async pause () {
      this.notifyID = this.notifyCreate(7000)

      this.status = { start: false, play: true, pause: false, stop: true };
      const data = this._request();
      try {
        const result = await axios.post('/user/pause', data);
        this.tracks = result.data;
      } catch (error) {
        console.log('error al enviar POST para iniciar tiempo de trabajo: >> ', error);
      }
    },

    async stop () {
      if (this.status.play) this.status = { start: false, play: true, pause: false, stop: true };
      else this.status = { start: false, play: false, pause: true, stop: true };

      const data = this._request();
      try {
        const result = await axios.post('/user/stop', data);
        this.tracks = result.data;
      } catch (error) {
        console.log('error al enviar POST para iniciar tiempo de trabajo: >> ', error);
      }
    },

    _request () {
      const date = new Date();
      return {
        date: this._getDate(date),
        time: this._getTime(date)
      }
    },

    _getDate (today) {
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()

      if (month < 10) return `${day}-0${month}-${year}`
      else return `${day}-${month}-${year}`
    },

    _getTime (today) {
      return today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    },

    notifyCreate (timeout) {
      if (!store.getters['auth/user']?.email) return

      let notifyID = null;

      if (!Notification) {
        console.log("Este navegador no soporta las notificaciones del sistema");
        return;
      }

      if (Notification.permission !== "granted") Notification.requestPermission();

      const title = 'Tarea en pausa';
      const options = {
        icon: 'https://via.placeholder.com/512x512',
        body: `La tarea está en pausa por XX tiempo`
      };
  
      notifyID = window.setTimeout(() => {
        const notification = new Notification(title, options);
        notification.onclick = function(event) {
          event.preventDefault();
          window.open('http://localhost:8080/user', '_blank');
        }
        this.notifyID = null;
      }, timeout);

      this.$socket.emit('user_pause', store.getters['auth/user'].email)
      console.log('Notify created :>> ', notifyID);

      return notifyID
    },

    notifyDelete (notify) {
      if (notify) {
        window.clearInterval(notify)
        console.log('Notify deleted :>> ', notify);
        this.notifyID = null
      }
    }

  }
}
</script>