<template>
  <form>
    <input type="text" v-model="searchTerm" />
    <input type="radio" id="english" value="english" v-model="searchType" />
    <label for="english"> Search for a word in English</label>
    <input type="radio" id="yiddish" value="yiddish" v-model="searchType" />
    <label for="english"> Search for a word in Yiddish</label>
    <input type="radio" id="romanization" value="romanization" v-model="searchType" />
    <label for="english"> Search for a word using <a href="">YIVO standard romanization</a> </label>
    <button type="submit" @click.stop.prevent="submit()">Submit</button>
  </form>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      searchTerm: this.getSearchTerm(),
      searchType: this.getSearchType(),
    }
  },
  methods: {
    submit() {
      this.$router
        .push({
          path: "/search",
          query: { type: this.searchType, term: this.searchTerm },
        })
        .catch(() => {})
      /* empty catch to handle redundant navigation error */
    },
    getSearchTerm() {
      if (this.$route.query.term) {
        return this.$route.query.term
      } else return ""
    },
    getSearchType() {
      if (this.$route.query.type) {
        return this.$route.query.type
      } else return "english"
    },
  },
  //   mounted() {
  //     this.searchType = this.getSearchType()
  //     console.log(`search type: ${this.searchType}`)
  //     console.log(`query type: ${this.$route.query.type}`)
  //   },
  //   watch: {
  //     $route(to) {
  //       // this.searchType = this.getSearchType()
  //       this.searchType = to.query.type
  //       // console.log(`search type: ${to.query.type}`)
  //     },
  //   },
}
</script>

<style></style>
