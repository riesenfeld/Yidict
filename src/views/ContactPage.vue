<template>
  <div id="contact-page">
    <section>
      <h3>Contact</h3>
      <p>You may use the form below to get in touch with me regarding any matter.</p>
      <p>
        If you would like to suggest an entry to be added to the dictionary, please provide it in English and in
        Yiddish, as well as a dictionary in which the word is attested, so that it may be cross-referenced for
        accuracy.
      </p>
      <p>Additionally, if you spot a bug or an incorrect translation, please let me know.</p>
      <p>
        If your entry or correction is approved, I will gladly add your name or chosen moniker to the attributions
        section of the <router-link to="/about">about page</router-link>.
      </p>
    </section>
    <ContactForm v-if="submissionResult() == 'none'" />
    <div v-else-if="submissionResult() == 'success'" class="message-area">
      <h3 class="message-success">Submission successful</h3>
      <p>Should your message warrant a reply, I will respond to you at the email address you have provided.</p>
      <p>Thank you for using Yidict!</p>
      <div class="return-links">
        <router-link to="/contact">Return to contact page</router-link>
        <router-link to="/">Return to home page</router-link>
      </div>
    </div>
    <div v-else-if="submissionResult() == 'failure'" class="message-area">
      <h3 class="message-failure">Submission failed</h3>
      <p>Something has prevented your message from being sent.</p>
      <p>Please double-check your internet connection or try again later.</p>
      <div class="return-links">
        <router-link to="/contact">Return to contact page</router-link>
        <router-link to="/">Return to home page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue"

export default {
  name: "ContactPage",
  components: {
    ContactForm,
  },
  methods: {
    submissionResult() {
      if (this.$route.params.submissionStatus == "success") {
        return "success"
      } else if (this.$route.params.submissionStatus == "failure") {
        return "failure"
      } else return "none"
    },
  },
  metaInfo: {
    title: "Contact | Yidict",
    meta: [{ name: "description", content: "Have a question or comment about Yidict? Get in touch!" }],
    link: [{ rel: "canonical", href: "https://yiddishdictionary.net/contact" }],
  },
}
</script>

<style scoped>
#contact-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding-top: 5vh;
  padding-bottom: 10vh;
}
section {
  width: min(65vw, 700px);
  margin-bottom: 5vh;
}
section h3 {
  margin-bottom: 2vh;
}
section p {
  text-align: left;
  margin-bottom: 2vh;
}
.message-area {
  width: 60vw;
}
.message-success {
  margin-bottom: 5vh;
  color: green;
}
.message-failure {
  margin-bottom: 5vh;
  color: red;
}
.message-area p {
  margin-bottom: 3vh;
  font-size: 0.9rem;
}
.return-links {
  display: flex;
  justify-content: space-evenly;
}

@media (max-width: 600px) {
  section {
    width: 90vw;
  }
}
</style>
