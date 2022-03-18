<template>
  <div id="usage-guide-page">
    <section>
      <h3>Searching the dictionary</h3>
      <p>A dictionary lookup may be performed against three different types of search terms:
        <ol class="list">
          <li>A word or phrase in English</li>
          <li>A word or phrase in Yiddish, using Yiddish characters</li>
          <li>A word or phrase in Yiddish, using English characters according to YIVO standard romanization</li>
        </ol>
      </p>
      <p>
        For more information on the YIVO transliteration standard, see
        <router-link to="/transliteration">this page</router-link>.
      </p>
    </section>
    <section>
      <h3>Returning exact matches</h3>
      <p>
        When <strong>selected</strong>, only entries that contain the exact search term will be
        returned by a dictionary lookup. A search for the word <em>laugh</em>, for instance, will
        return the entries for <em>laugh</em> and <em>laugh until you cry</em>, but not the entries
        for <em>laughter</em> or <em>slaughter</em>
      </p>
      <p>
        When <strong>unselected</strong>, a dictionary lookup will return all possible matches
        against your search term, including matches that are internal to words. A search for the word <em>car</em>, for instance, will also return
        the dictionary entries for <em>carrot</em> and <em>scarf</em>, among many others.
      </p>
    </section>
    <section>
      <h3>How to read dictionary entries</h3>
      <p>Each result returned by a dictionary lookup is given in a card that looks like this:</p>
      <div class="centered-item">
        <ResultCard :result="exampleResult" :exampleCardOverride="true" />
      </div>
      <p>
        The <strong>top row</strong> contains an English word and its Yiddish translation. 
        The <strong>bottom row</strong> contains the YIVO-standard transliteration of the Yiddish word, 
        followed by any additional pronunciation information, such as dialectical differences 
        or where accents fall in a Yiddish word, followed by the word's part-of-speech.
      </p>
    </section>
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
  created() {
    document.title = "Usage Guide | Yidict"
  },
}
</script>

<style scoped>
#usage-guide-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding-top: 10vh;
}
#usage-guide-page section {
  width: 60vw;
  margin-bottom: 4vh;
}
#usage-guide-page section h3 {
  margin-bottom: 2vh;
}
#usage-guide-page section p {
  text-align: left;
  margin-bottom: 2vh;
}
#usage-guide-page section p .list {
  width: 90%;
  margin-left: 5%;
  margin-top: 1vh;
}
#usage-guide-page section .centered-item {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 4vh;
}

@media (max-width: 600px) { 
  #usage-guide-page section {
    width: 90vw;
  }
}
</style>
