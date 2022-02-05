<template>
  <form>
    <input type="text" placeholder="Search for a word" v-model="searchTerm" />
    <input type="radio" id="english" value="english" v-model="searchType" />
    <label for="english"> Search for a word in English</label>
    <input type="radio" id="yiddish" value="yiddish" v-model="searchType" />
    <label for="english"> Search for a word in Yiddish</label>
    <input type="radio" id="romanization" value="romanization" v-model="searchType" />
    <label for="english"> Search for a word using <a href="">YIVO standard romanization</a> </label>
    <button type="submit" :aria-disabled="searchBoxIsEmpty()" @click.stop.prevent="submit()">
      Submit
    </button>
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
      if (this.searchBoxIsEmpty()) {
        alert("You must provide a search term")
      } else {
        this.$router
          .push({
            path: "/search",
            query: { type: this.searchType, term: this.searchTerm },
          })
          .catch(() => {})
        /* empty catch to handle redundant navigation error */
      }
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
    searchBoxIsEmpty() {
      if (this.searchTerm == "") {
        return true
      } else return false
    },
  },
}
</script>

<style>
input,
button {
  /* Use UA styles for form elements */
  all: revert;
}
</style>
