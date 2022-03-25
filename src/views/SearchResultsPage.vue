<template>
  <div id="search-results">
    <SearchForm />
    <div class="message-area">
      <p v-if="searchResults != null && searchResults.length == 0" class="no-matches-found-message">
        No matches found
      </p>
      <p v-else-if="searchResults != null && searchResults.length > 0">
        {{ numberOfResultsMessage }}
      </p>
      <p v-else-if="!searchIsValid" class="invalid-search-message">{{ invalidSearchReason }}</p>
      <p v-else-if="isLoading">Loading...</p>
    </div>
    <ResultCard v-for="(result, index) in searchResults" :key="index" :result="result"></ResultCard>
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
      isLoading: false,
      searchIsValid: true,
      invalidSearchReason: "",
      searchTerm: "",
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

      this.toggleLoadingMessage()

      this.searchResults = response
    },
    clearPage() {
      this.searchResults = null
    },
    isValidLookup(type, term) {
      if ((type != "english" && type != "yiddish" && type != "romanization") || type == undefined) {
        this.searchIsValid = false
        this.invalidSearchReason = "You must choose from one of the three search type options above"
        return false
      }
      if (term == "" || term == undefined || !/\S/.test(term)) {
        this.searchIsValid = false
        this.invalidSearchReason = `"${term}" is not a valid search term`
        return false
      }
      this.searchIsValid = true
      this.invalidSearchReason = ""
      this.searchTerm = term.trim()
      return true
    },
    toggleLoadingMessage() {
      this.isLoading = !this.isLoading
    },
  },
  computed: {
    numberOfResultsMessage() {
      if (this.searchResults.length == 1) {
        return `1 result found for "${this.searchTerm}"`
      } else if (this.searchResults.length > 1) {
        return `${this.searchResults.length} results found for "${this.searchTerm}"`
      } else return ""
    },
  },
  mounted() {
    if (this.isValidLookup(this.$route.query.type, this.$route.query.term)) {
      this.toggleLoadingMessage()
      if (this.$route.query.exact == undefined || this.$route.query.exact == false) {
        this.fetchResults(this.$route.query.term, this.$route.query.type, "false")
      } else this.fetchResults(this.$route.query.term, this.$route.query.type, "true")
    }
    /* Tell Netlify to consider the page fully rendered, so that metaInfo gets prerendered,
     * as per https://answers.netlify.com/t/support-guide-understanding-and-debugging-prerendering/150
     * and https://docs.prerender.io/docs/11-best-practices
     */
    window.prerenderReady = true
  },
  watch: {
    $route(to) {
      this.clearPage()
      if (this.isValidLookup(this.$route.query.type, this.$route.query.term)) {
        this.toggleLoadingMessage()
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
.message-area {
  padding-top: 2vh;
}
.no-matches-found-message {
  color: red;
}
.invalid-search-message {
  color: red;
}
</style>
