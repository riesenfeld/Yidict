<template>
  <form>
    <div class="form-flex-item">
      <input type="text" id="text-field" placeholder="Search for a word" v-model="searchTerm" />
      <label for="text-field">Enter a word</label>
    </div>
    <div class="form-flex-item">
      <input type="radio" id="english" value="english" v-model="searchType" />
      <label for="english"> Search for a word in English</label>
    </div>
    <div class="form-flex-item">
      <input type="radio" id="yiddish" value="yiddish" v-model="searchType" />
      <label for="english"> Search for a word in Yiddish</label>
    </div>
    <div class="form-flex-item">
      <input type="radio" id="romanization" value="romanization" v-model="searchType" />
      <label for="english"> Search for a word using YIVO standard romanization </label>
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

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.form-flex-item {
  margin-top: 1vh;
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

label[for="text-field"] {
  display: none;
}
</style>
