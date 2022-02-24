<template>
  <div id="contact-page">
    <ContactForm v-if="submissionResult() == 'none'" />
    <div v-else-if="submissionResult() == 'success'" class="message-area">
      <h3 class="message-success">Submission successful</h3>
      <p>
        Should your message warrant a reply, I will respond to you at the email address you have
        provided.
      </p>
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
}
</script>

<style scoped>
#contact-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
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
</style>
