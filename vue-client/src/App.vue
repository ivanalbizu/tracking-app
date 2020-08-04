<template>
  <div class="wrapper">
    <button class="ham btn btn--ham" type="button" @click="ham">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
    <TheHeader />
    <TheAside />
    <main class="main" id="app">
      <router-view/>
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheAside from '@/components/TheAside'

import store from '@/store'

export default {
  components: {
    TheHeader,
    TheAside
  },

  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Tracker App'
    }
  },

  created () {
    window.addEventListener('beforeunload', this.userLeave)
    this.userEnter()
  },

  methods: {
    userLeave () {
      if (store.getters['auth/user']?.email) {
        this.$socket.emit('user_leave', store.getters['auth/user']?.email)
      }
    },

    userEnter () {
      if (store.getters['auth/user']?.email) {
        this.$socket.emit('user_enter', store.getters['auth/user'].email)
      }
    },

    userPause () {
      if (store.getters['auth/user']?.email) {
        this.$socket.emit('user_pause', store.getters['auth/user'].email)
      }
    },

    ham () {
      event.target.closest('.wrapper').classList.toggle('ham--full')
    }

  }
}
</script>

<style lang="scss">
:root {
  --color-orange: #DD6E42;
  --color-cake: #E8DAB2;
  --color-blue-dark: #4F6D7A;
  --color-blue-light: #C0D6DF;
  --color-gray-dark: #EAEAEA;
  --color-gray-light: #f4f7f6;
}
.menu-txt {
  display: none;
}
@media (min-width: 767.02px) {
  .wrapper {
    &.ham--full {
      grid-template-columns: 180px 1fr;
      .nav__item {
        justify-content: flex-start;
        padding: 1em;
        .menu-txt {
          color: #000;
          display: flex;
          padding: 1em;
          text-transform: uppercase;
          transition: color .15s ease-in-out;;
        }
        &:hover,
        &:focus {
          .menu-txt {
            color: var(--color-orange);
            transition: color .15s ease-in-out;;
          }
        }
        &.router-link-exact-active {
          .menu-txt {
            color: var(--color-orange);
          }
        }
      }
    }
  }
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  margin-block-start: 0;
  margin-block-end: 0;
}
h1,h2,h3,h4,h5,h6 {
  font-weight: 400;
}
a,a:hover,a:focus,a:active {
  text-decoration: none;
  color: var(--color-orange);
}
li {
  list-style: none;
}
body {
  font-family: 'Nunito', Helvetica, sans-serif;
  background-color: var(--color-gray-light);
  color: #202121;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
}

.form-control {
  margin-bottom: 1em;
}
.label {
  display: inline-block;
  margin-bottom: .3em;
  font-weight: 300;
  width: 100%;
  > span {
    margin-bottom: inherit;
    display: block;
  }
}
button {
  cursor: pointer;
}
input[type="text"],
input[type="password"] {
  width: 100%;
}
input, button {
  background-color: #fff;
  -webkit-appearance: none;
  appearance: none;
  border: 0;
}
.input,
.btn {
  padding: 7px 10px;
  border-radius: 2px;
}
.input:focus,
.btn:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0,0,0,.1);
}
.input {
  font-size: 16px;
  border: 1px solid var(--color-orange);
}
.btn {
  font-size: 14px;
  border: 1px solid #8e8e8e;
  text-transform: uppercase;
  &--block {
    width: 100%;
  }
  &--track {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-right: 5px;
    padding: 4px;
    svg {
      pointer-events: none;
      stroke: var(--color-orange);
    }
  }
  &--signout {
    display: flex;
    border: 0;
    padding: 0;
    &:hover,
    &:focus {
      svg {
        stroke: var(--color-orange);
      }
    }
  }
  &--ham {
    border-color:#ddd;
    &:hover,
    &:focus {
      svg {
        stroke: var(--color-orange);
      }
    }
  }
  &--see {
    display: inline-flex;
    justify-content: center;
    width: 210px;
    max-width: 100%;
    border-radius: 0;
    border-top: 3px solid var(--color-orange);
    color: var(--color-orange);
    transition: border .15s ease-in-out, background-color .15s ease-in-out, color .15s ease-in-out;
    &:hover,
    &:focus {
      background-color: var(--color-orange);
      color: #fff;
      transition: border .15s ease-in-out, background-color .15s ease-in-out, color .15s ease-in-out;
    }
  }
  &--disable {
    pointer-events: none;
    position: relative;
    &::after {
      content: "";
      background-color: rgba(0,0,0,.1);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    svg {
      stroke: #242424;
    }
  }
}
.title-page {
  font-size: 2em;
  font-weight: 300;
  margin-right: auto;
}
.title-section {
  font-size: 1.6em;
  font-weight: 400;
  margin-bottom: 30px;
}
.title-card {
  font-size: 1.5em;
  font-weight: 400;
  margin-bottom: 10px;
}

.wrapper {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas: "ham header" "aside main";
  width: 100%;
  min-height: 100vh;
  
  .ham { grid-area: ham; }
  .header { grid-area: header; }
  .aside { grid-area: aside; }
  .main { grid-area: main; }
}
.ham {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}

.main {
  padding: 30px 40px;
}
.wrapper-btns {
  display: flex;
  margin-bottom: 30px;
}
.cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .card {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    background-color: #fff;
    margin-bottom: 30px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    border-top: 4px solid var(--color-orange);
    &__header {
      margin-bottom: 1em;
    }
    &__body {
      margin-bottom: 1em;
    }
    &__footer {
      margin-top: auto;
    }
    width: 100%;
    @media (min-width: 978px) {
      width: 31.33%;
      &__footer {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}

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

.select_container {
  display: inline-block;
  width: 100%;
  position: relative;
  color: #242424;
  margin-bottom: 1.5em;
  
  summary::after {
    content: "\00203A";
    font-size: 30px;
    font-weight: 300;
    position: absolute;
    right: 12px;
    top: calc(50%);
    transform: translateY(-50%) rotate(90deg);
    pointer-events: none;
  }
  
  &[open] summary::after {
    content: "\002039";
  }
}

summary {
  cursor: pointer;
  padding: 6px 12px;
  background: var(--color-gray-dark);
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
  
  &:hover {
    background: #ededed;
  }
}

.select {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  z-index: 1;

  &__option {
    cursor: pointer;
    padding: 6px 12px;
    input {
      display: none;
    }
  }
  &:hover .select__option.active {
    background: #fff;
    color: #454545;
  }
}

.select__option.active,
.select:hover .select__option.active:hover,
.select__option:hover {
  background: var(--color-orange);
  color: #fff;
}


.container-input {
  display: block;
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: .375rem;
  text-align: left;
  cursor: pointer;
  font-size: .75rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0 !important;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: .1rem;
    left: 0;
    height: .75rem;
    width: .75rem;
    background-color: #FFF;
    border: 1px solid var(--color-orange);
    transition: background-color .1s ease-in-out;
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }
  &:hover input ~ .checkmark {
    background-color: rgba(var(--color-orange), .9);
    transition: background-color .2s ease-in-out;
  }
  input:checked ~ .checkmark {
    background-color: var(--color-orange);
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
}


@keyframes pulse-color {
  0% {
    color: initial;
  }
  50% {
    color: var(--color-orange);
  }
  100% {
    color: initial;
  }
}

@media (max-width: 768px) {
  .wrapper {
    grid-template-columns: 50px 1fr;
    grid-template-rows: 50px 50px 1fr;
    grid-template-areas:
          "ham header"
          "aside aside"
          "main main";
  }
  .header {
    padding: 0 20px;
  }
  .aside {
    border: 0;
  }
  .main {
    padding: 30px 15px;
  }
  .nav {
    &__item {
      display: inline-flex;
      width: 25%;
      height: 50px;
      &.router-link-exact-active {
        svg {
          stroke: var(--color-orange);
        }
        border: 0;
        border-bottom: 3px solid var(--color-orange);
      }
    }
  }
  .title-page {
    font-size: 1.5em;
  }
  .title-section {
    font-size: 1.2em;
    font-weight: 400;
    margin-bottom: 30px;
  }
}


.pointer-events-none {
  pointer-events: none;
}
</style>