<template>
  <section class="details">
    <h2 class="title-section">Usuarios</h2>
    <div class="search-wrapper">
      <label>
        <input class="input" type="text" v-model="search" placeholder="Buscar por correo de usuario"/>
      </label>
    </div>
    <ul class="users">
      <li
        v-for="(user, index) in filteredUsers"
        :key="index"
        class="user"
        >
          <button @click="getUser(user)" class="btn-user" type="button">{{user}}</button>
        </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
import ModalUser from '@/components/ModalUser.vue'

export default {
  name: 'admin',

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
        this.$modal.show(
          ModalUser,
          {
            user: email
          },
          {
            adaptative: true,
            width: '90%',
            height: 'auto'
          }
        )
      } catch (error) {
        console.log('error levantando modal de usuario:>> ', error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 2em;
}
.users {
  display: flex;
  flex-wrap: wrap;
  .user {
    display: inline-flex;
  }
  .btn-user {
    padding: 5px 20px;
    margin: 0 10px 10px 0;
    color: #fff;
    background-color: var(--color-blue-dark);
    cursor: pointer;
  }
}
</style>