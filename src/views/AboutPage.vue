<template>
  <div id="about-page">
    <section>
      <h3>Attributions</h3>
      <p>
        Yidict is a reincarnation of the now-defunct <em>Yiddish Dictionary Online</em>, created by
        <b>Sholem Berger</b> and <b>Noam Starik</b>. The vast majority of the work of compiling this
        dictionary was carried out by them, although I have made several thousand revisions myself,
        mostly in normalizing entries according to their grammatical function, and to a lesser
        degree, correcting errors and filling in missing definitional information. You can find a
        partial, non-searchable archive of the Yiddish Dictionary Online
        <a
          href="https://web.archive.org/web/20211019150353/http://www.yiddishdictionaryonline.com/"
        >
          here</a
        >.
      </p>
      <p>
        Any discrepancies between Berger and Starik's original dictionary and this one are based on
        entries found in Aaron Bergman's <em>Student's Dictionary</em>, David and Eleanor Harduf's
        <em>Transliterated English-Yiddish Yiddish-English Dictionary</em>, Beinfeld and Bochner's
        <em>Comprehensive Yiddish-English Dictionary</em>, Alexander Harkavy's
        <em>Yiddish-English-Hebrew Dictionary</em>, and the Yiddish Wiktionary project.
        Additionally, where necessary, alterations to dictionary entries were cross-referenced
        against real-world attestations found in the Yiddish Book Center's
        <a href="https://ocr.yiddishbookcenter.org/">Digital Library</a>.
      </p>
      <p>
        The grammar tables provided <router-link to="/grammar">here</router-link> were also rebuilt
        from Berger and Starik's original grammar tables on Yiddish Dictionary Online. The
        transliteration guide <router-link to="/transliteration">here</router-link> presents the
        orthographical standard codified by <a href="https://yivo.org/Yiddish-Alphabet">YIVO</a>.
      </p>
    </section>
    <section>
      <h3>More information</h3>
      <p>
        Questions or comments? You can contact me via
        <router-link to="/contact">this form</router-link>.
      </p>
      <p>
        If you're looking for a more comprehensive Yiddish-English online dictionary, and are
        willing to pay for it, I highly recommend
        <a href="https://verterbukh.org/vb">verterbukh.org</a>.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      /**
       * This is the default value, a placeholder (which is most likely correct)
       * which gets replaced by the canonically accurate value retrieved
       * by the serverless function fetchNumberOfEntries()
       **/
      numberOfEntries: 5734,
    }
  },
  methods: {
    async fetchNumberOfEntries() {
      let response = await fetch("/.netlify/functions/get-number-of-entries").then((response) =>
        response.json()
      )
      // return response.entries
      this.numberOfEntries = response.entries
      // this.searchResults = response
    },
  },
  // computed: {
  //   numberOfEntries() {
  //     let entries = this.fetchNumberOfEntries()
  //     return entries
  //   },
  // },
  created() {
    this.fetchNumberOfEntries()
  },
}
</script>

<style scoped>
#about-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
section {
  width: 70vw;
}
section h3 {
  margin-bottom: 2vh;
}
section p {
  margin-bottom: 2.5vh;
  text-align: left;
}
</style>
