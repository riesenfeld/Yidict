<template>
  <main id="about-page">
    <section>
      <h3>Attributions</h3>
      <p>
        Yidict is a reincarnation of the now-defunct <em>Yiddish Dictionary Online</em>, created by
        <b>Sholem Berger</b> and <b>Noam Starik</b>. The vast majority of the work of compiling this dictionary was
        carried out by them, although I have made several thousand revisions myself, mostly in normalizing entries
        according to their grammatical function, and to a lesser degree, correcting errors and filling in missing
        definitional information. You can find a partial, non-searchable archive of the Yiddish Dictionary Online
        <a href="https://web.archive.org/web/20211019150353/http://www.yiddishdictionaryonline.com/"> here</a>.
      </p>
      <p>
        Any discrepancies between Berger and Starik's original dictionary and this one are based on entries found
        in Aaron Bergman's <em>Student's Dictionary</em>, David and Eleanor Harduf's
        <em>Transliterated English-Yiddish Yiddish-English Dictionary</em>, Beinfeld and Bochner's
        <em>Comprehensive Yiddish-English Dictionary</em>, Alexander Harkavy's
        <em>Yiddish-English-Hebrew Dictionary</em>, and the Yiddish Wiktionary project. Additionally, where
        necessary, alterations to dictionary entries were cross-referenced against real-world attestations found in
        the Yiddish Book Center's <a href="https://ocr.yiddishbookcenter.org/">Digital Library</a>.
      </p>
      <p>
        The grammar tables provided <router-link to="/grammar">here</router-link> were also rebuilt from Berger and
        Starik's original grammar tables on Yiddish Dictionary Online. The transliteration guide
        <router-link to="/transliteration">here</router-link> presents the orthographical standard codified by
        <a href="https://yivo.org/Yiddish-Alphabet">YIVO</a>.
      </p>
    </section>
    <section>
      <h3>More information</h3>
      <p>
        Questions or comments? You can contact me via
        <router-link to="/contact">this form</router-link>.
      </p>
      <p>
        If you're looking for a more comprehensive Yiddish-English online dictionary, and are willing to pay for
        it, I highly recommend
        <a href="https://verterbukh.org/vb">verterbukh.org</a>.
      </p>
    </section>
  </main>
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
      let response = await fetch("/.netlify/functions/get-number-of-entries").then((response) => response.json())
      this.numberOfEntries = response.entries
    },
  },
  created() {
    this.fetchNumberOfEntries()
  },
  mounted() {
    /* Tell Netlify to consider the page fully rendered, so that metaInfo gets prerendered,
     * as per https://answers.netlify.com/t/support-guide-understanding-and-debugging-prerendering/150
     * and https://docs.prerender.io/docs/11-best-practices
     */
    window.prerenderReady = true
  },
  metaInfo: {
    title: "About | Yidict",
    meta: [
      {
        name: "description",
        content: "About Yidict, a free Yiddish-English dictionary on the web.",
      },
      { property: "og:title", content: "About | Yidict" },
      {
        property: "og:url",
        content: "https://yiddishdictionary.net/about",
      },
      {
        property: "og:description",
        content: "About Yidict, a free Yiddish-English dictionary on the web.",
      },
      {
        property: "twitter:url",
        content: "https://yiddishdictionary.net/about",
      },
      {
        property: "twitter:title",
        content: "About | Yidict",
      },
      {
        property: "twitter:description",
        content: "About Yidict, a free Yiddish-English dictionary on the web.",
      },
    ],
    link: [{ rel: "canonical", href: "https://yiddishdictionary.net/about" }],
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
  padding-top: 3vh;
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

@media (max-width: 600px) {
  section {
    width: 90vw;
  }
}
</style>
