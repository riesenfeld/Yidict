<template>
  <div id="side-bar" :class="{ menu: true, active: menuIsOpen }">
    <div :class="{ 'menu-links': true, active: menuIsOpen }">
      <router-link to="/" class="router-link">Usage guide</router-link>
      <router-link to="/" class="router-link">Transliteration table</router-link>
      <router-link to="/" class="router-link">Grammar tables</router-link>
      <router-link to="/" class="router-link">About</router-link>
      <router-link to="/" class="router-link">Contact</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    menuIsOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.menu {
  background-color: var(--main-color);
}
.menu.active {
  position: absolute;
  top: 10vh;
  right: 0;
  bottom: 0;
  width: min(100vw, fit-content);
  z-index: 2;
}
.menu-links {
  display: none;
}
.menu-links.active {
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  margin-top: 2vh;
}
.router-link {
  color: white;
  text-decoration: none;
  margin: 1vh 2vw;
}
</style>
