<template>
  <nav id="side-bar" :class="{ menu: true, active: menuIsOpen }">
    <div :class="{ 'menu-links': true, active: menuIsOpen }">
      <router-link
        to="/"
        :class="{
          'router-link': true,
          'current-page': matchesCurrentRoute('/') || matchesCurrentRoute('/search'),
        }"
        ><span>Search dictionary</span>
      </router-link>
      <router-link to="/usage" :class="{ 'router-link': true, 'current-page': matchesCurrentRoute('/usage') }"
        ><span>Usage guide</span>
      </router-link>
      <router-link
        to="/transliteration"
        :class="{ 'router-link': true, 'current-page': matchesCurrentRoute('/transliteration') }"
        ><span>Transliteration table</span>
      </router-link>
      <router-link to="/grammar" :class="{ 'router-link': true, 'current-page': matchesCurrentRoute('/grammar') }"
        ><span>Grammar tables</span>
      </router-link>
      <router-link to="/about" :class="{ 'router-link': true, 'current-page': matchesCurrentRoute('/about') }"
        ><span>About</span>
      </router-link>
      <router-link to="/contact" :class="{ 'router-link': true, 'current-page': matchesCurrentRoute('/contact') }"
        ><span>Contact</span>
      </router-link>
    </div>
  </nav>
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
  methods: {
    matchesCurrentRoute(route) {
      if (route == this.$route.path) {
        return true
      } else return false
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
  position: sticky;
  top: 12vh; /* top of sidebar + 2vh margin-top */
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

.current-page span {
  border-bottom: 2px solid white;
}

@media (max-width: 600px) {
  .menu.active {
    top: 60px;
  }
}
</style>
