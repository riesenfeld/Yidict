<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="fetchWords"></button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    async fetchWords() {
      const response = await fetch("/.netlify/functions/fetch-words").then((response) =>
        response.json()
      )
      console.log(response)
    },
  },
}
</script>
