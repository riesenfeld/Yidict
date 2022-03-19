<template>
  <div id="search-results">
    <SearchForm />
    <ResultCard v-for="(result, index) in searchResults" :key="index" :result="result"></ResultCard>
    <p v-if="searchResults != null && searchResults.length == 0" class="no-matches-found-message">
      No matches found
    </p>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"
import ResultCard from "@/components/ResultCard.vue"
export default {
  name: "SearchResultsPage",
  components: {
    SearchForm,
    ResultCard,
  },
  data() {
    return {
      searchResults: null,
    }
  },
  methods: {
    async fetchResults(term, type, isExact) {
      let requestBody = JSON.stringify({
        searchTerm: term,
        searchType: type,
        exact: isExact,
      })
      let response = await fetch("/.netlify/functions/search", {
        method: "POST",
        body: requestBody,
      }).then((response) => response.json())

      this.searchResults = response
    },
    clearPage() {
      this.searchResults = null
    },
    isValidLookup(type, term) {
      if (type != "english" || type != "yiddish" || type != "romanization" || type == undefined) {
        return false
      }
      if (term == "" || term == undefined) {
        return false
      }
      return true
    },
  },
  mounted() {
    if (this.isValidLookup(this.$route.query.type, this.$route.query.term)) {
      if (this.$route.query.exact == undefined || this.$route.query.exact == false) {
        this.fetchResults(this.$route.query.term, this.$route.query.type, "false")
      } else this.fetchResults(this.$route.query.term, this.$route.query.type, "true")
    }
  },
  watch: {
    $route(to) {
      this.clearPage()
      if (this.isValidLookup(this.$route.query.type, this.$route.query.term)) {
        if (to.query.exact == undefined || to.query.exact == false) {
          this.fetchResults(to.query.term, to.query.type, "false")
        } else this.fetchResults(to.query.term, to.query.type, "true")
      }
    },
  },
  metaInfo: {
    title: "Search | Yidict",
    meta: [
      { name: "description", content: "Search Yidict, a free Yiddish-English dictionary on the web." },
      { property: "og:title", content: "Search | Yidict" },
      {
        property: "og:url",
        content: "https://yiddishdictionary.net/search",
      },
      {
        property: "og:description",
        content: "Search Yidict, a free Yiddish-English dictionary on the web.",
      },
    ],
    link: [{ rel: "canonical", href: "https://yiddishdictionary.net/search" }],
  },
}
</script>

<style scoped>
#search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  min-height: 90vh;
  margin-left: 5%;
  padding-bottom: 5vh;
}
.no-matches-found-message {
  color: red;
}
</style>
