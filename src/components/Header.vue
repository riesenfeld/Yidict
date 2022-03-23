<template>
  <header id="header" ref="header">
    <router-link to="/" class="router-link router-link-home">
      <div class="logo-area">
        <!-- logo source: https://icons8.com/icon/25546/peacock -->
        <img src="@/assets/logo.svg" id="logo-image" alt="" />
        <span class="site-name"><span>Yidict</span> | <span>ייִדיקט</span></span>
      </div>
    </router-link>
    <button class="menu-button" @click="toggleMenu">
      <img src="@/assets/menu.svg" class="menu-icon" alt="menu icon" />
    </button>
  </header>
</template>

<script>
export default {
  name: "Header",
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
#header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: max(10vh, 52px);
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
#logo-image {
  height: min(9.5vh, 50px);
  width: min(9.5vh, 50px);
}
.site-name {
  margin-left: 2vw;
}
.menu-button {
  align-self: center;
  height: 7.5vh;
  width: 7.5vh;
  margin: 1vh;
  border: none;
  background-color: #00005000;
}
.menu-icon {
  height: 7.5vh;
}

@media (max-width: 600px) {
  #header {
    height: 60px;
  }
  .logo-area {
    font-size: min(8vw, 1.8rem);
  }
  #logo-image {
    height: 55px;
    width: 55px;
  }
  .site-name {
    margin-left: 4vw;
  }
  .menu-button {
    height: 45px;
    width: 45px;
  }
  .menu-icon {
    height: 45px;
  }
}
</style>
