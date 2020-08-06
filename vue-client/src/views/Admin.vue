<template>
  <section class="details">
    <h2 class="title-section">Usuarios</h2>
    <div class="search-wrapper">
      <label>
        <input class="input" type="text" v-model="search" placeholder="Buscar por correo de usuario"/>
      </label>
    </div>
    <ul v-for="(user, index) in filteredUsers" :key="index">
      <li @click="getUser(user)">{{user}}</li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
import ModalUser from '@/components/ModalUser.vue'

export default {
  name: 'stats',
  data() {
    return {
      users: [],
      search: ''
    }
  },
  created() {
    this.getUsers()
  },

  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  methods: {
    async getUsers () {
      try {
        const result = await axios.get('/stats/users');
        this.users = result.data;
      } catch (error) {
        console.log('error al obtener todos los usuarios :>> ', error);
      }
    },

    async getUser (email) {
      try {
        const result = await axios.get(`/stats/user/${email}`);
        this.$modal.show(
          ModalUser,
          {
            user: email,
            tracks: result.data.tracking
          },
          {
            adaptative: true,
            width: '80%',
            height: 'auto'
          }
        )
      } catch (error) {
        console.log('error levantando modal de usuario:>> ', error);
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