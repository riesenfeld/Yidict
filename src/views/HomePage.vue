<template>
  <div id="home">
    <SearchForm />
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <button @click="fetchWords('english')">English Button</button>
    <button @click="fetchWords('yiddish')">Yiddish Button</button> -->
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"

export default {
  name: "HomePage",
  components: {
    SearchForm,
  },
  methods: {
    // async fetchWords(lang) {
    //   let requestBody = JSON.stringify({
    //     language: lang,
    //   })
    //   // console.log(lang)
    //   let response = await fetch("/.netlify/functions/fetch-english", {
    //     method: "POST",
    //     body: requestBody,
    //   }).then((response) => response.json())
    //   // let response = await fetch("/.netlify/functions/fetch-words").then((response) =>
    //   //   response.json()
    //   // )
    //   console.log(response)
    // },
  },
}
</script>
<style scoped>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
