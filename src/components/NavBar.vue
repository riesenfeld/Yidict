<template>
  <nav id="nav-bar">
    <router-link to="/">Yidict</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
}
</script>

<style scoped>
#nav-bar {
  display: flex;
  justify-content: space-between;
  height: 10vh;
  background-color: var(--main-color);
  color: white;
}
</style>
