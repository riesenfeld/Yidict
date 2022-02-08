<template>
  <nav id="nav-bar">
    <router-link to="/" class="router-link router-link-home">
      <div class="logo-area">
        <!-- logo source: https://icons8.com/icon/25546/peacock -->
        <img src="@/assets/logo.svg" id="logo" alt="golden peacock logo" />
        <span class="site-name">Yidict</span>
      </div>
    </router-link>
    <button class="menu-button" @click="toggleMenu">
      <img src="@/assets/menu.svg" class="menu-icon" alt="menu icon" />
    </button>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    menuIsOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    toggleMenu() {
      this.$emit("menuToggled")
    },
  },
}
</script>

<style scoped>
#nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 10vh;
  background-color: var(--main-color);
  color: white;
}
.router-link {
  color: white;
  text-decoration: none;
}

.logo-area {
  display: flex;
  align-items: flex-end;
  margin-left: 1vw;
  font-size: 5vh;
}
.site-name {
  margin-left: 1vw;
}
.menu-button {
  align-self: flex-start;
  height: 5.5vh;
  width: 5.5vh;
  margin: 1vh;
  border: none;
  background-color: #00005000;
}
.menu-icon {
  height: 5.5vh;
}
</style>
