<template>
  <div class="result-card" tabindex="0">
    <div
      v-for="(element, index) in result"
      :key="index"
      class="result-element"
      :style="gridItemPosition(index)"
      :data-category="dataCategories[index]"
      :lang="chooseLangAttribute(index)"
      :dir="index == 1 ? 'auto' : 'ltr'"
    >
      <span>&lrm;{{ result[index] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultCard",
  props: {
    result: Array,
    exampleCardOverride: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // ariaLabels: [
      //   "English",
      //   "Yiddish",
      //   "Transliteration",
      //   "Additional pronunciation information",
      //   "Part of speech",
      // ],
      dataCategories: ["english", "yiddish", "transliteration", "pronunciation", "partofspeech"],
    }
  },
  methods: {
    gridItemPosition(index) {
      switch (index) {
        case 0:
          return {
            gridRowStart: 1,
            gridRowEnd: 2,
            gridColumnStart: 1,
            gridColumnEnd: 4,
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          }
        case 1:
          return {
            gridRowStart: 1,
            gridRowEnd: 2,
            gridColumnStart: 4,
            gridColumnEnd: 7,
            borderBottom: "1px solid black",
          }
        case 2:
          return {
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: 1,
            gridColumnEnd: 3,
            borderRight: "1px solid black",
          }
        case 3:
          return {
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: 3,
            gridColumnEnd: 5,
          }
        case 4:
          return {
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: 5,
            gridColumnEnd: 7,
            borderLeft: "1px solid black",
          }
      }
    },
    chooseLangAttribute(index) {
      if (this.exampleCardOverride) {
        switch (index) {
          case 1:
            return "yi"
          default:
            return "en"
        }
      } else {
        switch (index) {
          case 1:
            //Yiddish
            return "yi"
          case 2:
            //Yiddish transliterated with Latin characters (https://www.w3.org/International/articles/language-tags/#script)
            return "yi-Latn"
          case 3:
            return "yi-Latn"
          default:
            return "en"
        }
      }
    },
  },
}
</script>

<style scoped>
.result-card {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(6, 1fr);

  /* width: 50%; */
  width: min(90%, 500px);
  min-height: 30vh;
  margin-top: 3vh;

  background-color: rgb(230, 230, 230);
  box-shadow: 4px 4px 4px var(--shadow-color);
}
.result-element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  overflow-wrap: anywhere;
}

@media (orientation: portrait) and (max-width: 800px) {
  .result-card {
    font-size: 0.8rem;
  }
}
@media (orientation: portrait) and (max-width: 350px) {
  .result-card {
    font-size: 0.6rem;
  }
}
</style>
