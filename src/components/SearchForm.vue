<template>
  <form role="search" aria-label="dictionary">
    <div class="form-flex-item">
      <input type="text" id="text-field" placeholder="Search for a word" v-model="searchTerm" />
      <label for="text-field" class="screenreader-only">Enter a word</label>
    </div>
    <div class="form-flex-item">
      <input type="radio" id="english" value="english" v-model="searchType" />
      <label for="english"> Search for a word in English</label>
    </div>
    <div class="form-flex-item">
      <input type="radio" id="yiddish" value="yiddish" v-model="searchType" />
      <label for="yiddish"> Search for a word in Yiddish</label>
    </div>
    <div class="form-flex-item">
      <input type="radio" id="romanization" value="romanization" v-model="searchType" />
      <label for="romanization"> Search for a word using YIVO standard romanization </label>
    </div>
    <div class="form-flex-item">
      <input type="checkbox" id="mode-checkbox" v-model="exactMode" />
      <label for="mode-checkbox"> Return exact matches (see usage guide for details) </label>
    </div>
    <button
      type="submit"
      class="form-flex-item"
      :aria-disabled="searchBoxIsEmpty()"
      @click.stop.prevent="submit()"
    >
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
      exactMode: this.getExactMode(),
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
            query: this.buildQuery(),
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
    getExactMode() {
      if (this.$route.query.exact) {
        return this.$route.query.exact
      } else return false
    },
    searchBoxIsEmpty() {
      if (this.searchTerm == "") {
        return true
      } else return false
    },
    buildQuery() {
      /* If exactMode is false, don't pollute the query params with it */
      if (this.exactMode) {
        return { type: this.searchType, term: this.searchTerm, exact: this.exactMode }
      } else return { type: this.searchType, term: this.searchTerm }
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
/* An accessible way to hide form labels visually, but leave them in the
 * accessibility tree for screen readers.
 * Source: https://kittygiraudel.com/snippets/sr-only-class/ 
 */
.screenreader-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  margin: -1px !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}

.form-flex-item {
  margin-top: 1vh;
  text-align: left;
}
input {
  /* Use UA styles for form elements */
  border: revert;
}

input[type="text"] {
  font-size: 1.2rem;
}

button {
  background-color: var(--main-color);
  color: white;
  font-size: 1.2rem;
  padding: 5px 8px 5px 8px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px var(--shadow-color);
}

button:active {
  box-shadow: none;
  transform: translateY(1.5px);
}

@media (orientation: portrait) {
  form {
    width: 75vw;
  }
}
</style>
