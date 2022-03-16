<template>
  <form name="contact" method="POST" @submit.prevent="submitForm">
    <input type="hidden" name="form-name" id="form-name" value="contact" />
    <div class="form-item">
      <label for="subject">Subject:</label>
      <input type="text" name="subject" id="subject" v-model="subject" required />
    </div>
    <div class="form-item">
      <label for="message">Your message:</label>
      <textarea name="message" id="message" cols="50" rows="10" v-model="message" required> </textarea>
    </div>
    <div class="form-item">
      <label for="email">Your email address:</label>
      <input type="email" name="email" id="email" v-model="email" required />
    </div>
    <button class="form-item" @click="checkValidity">Submit</button>
  </form>
</template>

<script>
export default {
  name: "ContactForm",
  data() {
    return {
      honeypot: "notfilledout",
      subject: "",
      message: "",
      email: "",
    }
  },
  methods: {
    getEncoded() {
      let obj
      obj = {
        "form-name": "contact",
        subject: this.subject,
        message: this.message,
        email: this.email,
      }
      return Object.keys(obj)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
        .join("&")
    },
    checkValidity() {
      // This is a hack for Firefox for Android, which doesn't prod the user to correctly fill in forms
      if (!document.forms["contact"].reportValidity()) {
        if (this.subject.length < 1) {
          document.forms["contact"]["subject"].focus()
        } else if (this.message.length < 1) {
          document.forms["contact"]["message"].focus()
        } else if (this.email.length < 1) {
          document.forms["contact"]["email"].focus()
        } else {
          document.forms["contact"]["email"].focus()
        }
      }
    },
    submitForm() {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.getEncoded(),
      })
        .then(() => this.$router.push({ params: { submissionStatus: "success" } }))
        .catch(() => this.$router.push({ params: { submissionStatus: "failure" } }))
    },
  },
}
</script>

<style scoped>
form {
  width: max(40vw, 450px);
}
.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
  text-align: left;
}
label {
  margin-bottom: 0.25vh;
}
textarea,
input {
  /* Use UA styles for form elements */
  border: revert;
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

@media (max-width: 600px) {
  form {
    width: 90vw;
  }
}
</style>
