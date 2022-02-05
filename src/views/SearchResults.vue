<template>
  <div id="search-results">
    <p>Search term: {{ $route.query.term }}</p>
    <p>Search type: {{ $route.query.type }}</p>
    <ResultCard v-for="(result, index) in searchResults" :key="index" :result="result"></ResultCard>
  </div>
</template>

<script>
import ResultCard from "@/components/ResultCard.vue"
export default {
  name: "SearchResults",
  components: {
    ResultCard,
  },
  data() {
    return {
      searchResults: null,
    }
  },
  methods: {
    async fetchResults(term, type) {
      let requestBody = JSON.stringify({
        searchTerm: term,
        searchType: type,
      })
      let response = await fetch("/.netlify/functions/search", {
        method: "POST",
        body: requestBody,
      }).then((response) => response.json())

      this.searchResults = response
    },
  },
  mounted() {
    this.fetchResults(this.$route.query.term, this.$route.query.type)
  },
  watch: {
    $route(to) {
      this.fetchResults(to.query.term, to.query.type)
      // this.$emit("routeUpdated", {
      //   term: to.query.term,
      //   type: to.query.type,
      // })
    },
  },
}
</script>

<style>
#search-results {
  width: 100%;
  height: 90vh;
  background-color: #aaaaaaaa;
}
</style>
