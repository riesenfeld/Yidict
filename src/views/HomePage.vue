<template>
  <main id="home">
    <SearchForm />
  </main>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"

export default {
  name: "HomePage",
  components: {
    SearchForm,
  },
  mounted() {
    /* Tell Netlify to consider the page fully rendered, so that metaInfo gets prerendered,
     * as per https://answers.netlify.com/t/support-guide-understanding-and-debugging-prerendering/150
     * and https://docs.prerender.io/docs/11-best-practices
     */
    window.prerenderReady = true
  },
  metaInfo: {
    title: "Yidict",
    meta: [
      { name: "description", content: "A free Yiddish-English dictionary on the web." },
      { property: "og:title", content: "Yidict" },
      {
        property: "og:url",
        content: "https://yiddishdictionary.net",
      },
      {
        property: "og:description",
        content: "A free Yiddish-English dictionary on the web.",
      },
      {
        property: "twitter:url",
        content: "https://yiddishdictionary.net",
      },
      {
        property: "twitter:title",
        content: "Yidict",
      },
      {
        property: "twitter:description",
        content: "A free Yiddish-English dictionary on the web.",
      },
    ],
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
