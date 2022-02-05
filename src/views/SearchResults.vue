<template>
  <div id="search-results">
    <SearchForm />
    <ResultCard v-for="(result, index) in searchResults" :key="index" :result="result"></ResultCard>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"
import ResultCard from "@/components/ResultCard.vue"
export default {
  name: "SearchResults",
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

<style scoped>
#search-results {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  width: 90%;
  margin-left: 5%;
  /* background-color: #aaaaaaaa; */
}
</style>
