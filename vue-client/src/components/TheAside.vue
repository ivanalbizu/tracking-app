<template>
  <aside class="aside">
    <nav class="nav">
      <router-link class="nav__item" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span class="menu-txt">Home</span>
      </router-link>
      <router-link class="nav__item" to="/track">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span class="menu-txt">Tracking</span>
      </router-link>
      <router-link class="nav__item" to="/stats">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
        <span class="menu-txt">Stats</span>
      </router-link>
      <router-link class="nav__item" to="/config">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
        <span class="menu-txt">Config</span>
      </router-link>
      <template v-if="this.$store.getters['auth/user'] && this.$store.getters['auth/user'].role=='ADMIN'">
        <router-link class="nav__item" to="/admin">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>          <span class="menu-txt">Admin</span>
        </router-link>
      </template>
    </nav>
  </aside>
</template>

<style lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-right: 1px solid #ccc;
  box-shadow: 0px 3px 3px rgba(0,0,0,.2);
  position: sticky;
  top: -1px;
  z-index: 1;
  .nav {
    position: sticky;
    top: -1px;
  }
}
.nav {
  width: 100%;
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #ddd;
    border-left: 3px solid transparent;
    &.router-link-exact-active {
      svg {
        stroke: var(--color-orange);
      }
      border-left: 3px solid var(--color-orange);
    }
    &:focus {
      outline: none;
    }
    &:hover,
    &:focus {
      svg {
        transition: stroke .3s ease;
        stroke: var(--color-orange);
      }
    }
    svg {
      transition: stroke .2s ease;
    }
  }
}
</style>