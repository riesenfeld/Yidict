<template>
  <div id="home">
    <SearchForm />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"

export default {
  name: "HomePage",
  components: {
    SearchForm,
  },
  metaInfo: {
    title: "Yidict",
    meta: [{ name: "description", content: "A free Yiddish-English dictionary for the web." }],
    link: [{ rel: "canonical", href: "https://yiddishdictionary.net" }],
  },
}
</script>
<style scoped>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
</style>
