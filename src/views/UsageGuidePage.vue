<template>
  <div id="usage-guide-page">
    <h3>How to read dictionary matches</h3>
    <p>Each result returned by a dictionary lookup is given in a card that looks like this:</p>
    <ResultCard :result="exampleResult" />
    <p>
      The top row contains an English word and its Yiddish translation. The bottom row contains the
      YIVO-standard transliteration of the Yiddish word, followed by any additional pronunciation
      information, such as dialectical differences or where accents fall in a Yiddish word, followed
      by the word's part-of-speech.
    </p>
    <p>
      For more information on the YIVO transliteration standard, see
      <router-link to="/transliteration">this page</router-link>.
    </p>
  </div>
</template>

<script>
import ResultCard from "@/components/ResultCard.vue"
export default {
  name: "UsageGuidePage",
  components: {
    ResultCard,
  },
  data() {
    return {
      exampleResult: [
        "English",
        "ייִדיש",
        "Transliteration",
        "Additional pronunciation information",
        "Part of speech",
      ],
    }
  },
}
</script>

<style scoped>
#usage-guide-page {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 90vh;
  padding-top: 10vh;
}
</style>
