<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <button @click="fetchWords('english')">English Button</button>
    <button @click="fetchWords('yiddish')">Yiddish Button</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  methods: {
    async fetchWords(lang) {
      let requestBody = JSON.stringify({
        language: lang,
      })
      // console.log(lang)
      let response = await fetch("/.netlify/functions/fetch-english", {
        method: "POST",
        body: requestBody,
      }).then((response) => response.json())
      // let response = await fetch("/.netlify/functions/fetch-words").then((response) =>
      //   response.json()
      // )

      console.log(response)
    },
  },
}
</script>
