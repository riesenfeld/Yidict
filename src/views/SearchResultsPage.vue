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
  },
  mounted() {
    if (this.$route.query.exact == undefined || this.$route.query.exact == false) {
      this.fetchResults(this.$route.query.term, this.$route.query.type, "false")
    } else this.fetchResults(this.$route.query.term, this.$route.query.type, "true")
  },
  watch: {
    $route(to) {
      if (to.query.exact == undefined || to.query.exact == false) {
        this.fetchResults(to.query.term, to.query.type, "false")
      } else this.fetchResults(to.query.term, to.query.type, "true")
    },
  },
}
</script>

<style scoped>
#search-results {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  width: 90%;
  min-height: 90vh;
  margin-left: 5%;
  /* background-color: #aaaaaaaa; */
}
.no-matches-found-message {
  color: red;
}
</style>
