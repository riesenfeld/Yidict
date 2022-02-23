<template>
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    action="/about"
  >
    <input type="hidden" name="form-name" id="honeypot" value="contact" />
    <div class="form-item">
      <label for="subject">Subject:</label>
      <input type="text" name="subject" id="subject" required />
    </div>
    <div class="form-item">
      <label for="message">Your message:</label>
      <textarea name="message" id="message" cols="50" rows="10" required> </textarea>
    </div>
    <div class="form-item">
      <label for="email">Your email address:</label>
      <input type="email" name="email" id="email" required />
    </div>
    <button class="form-item">Submit</button>
  </form>
</template>

<script>
export default {}
</script>

<style scoped>
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
</style>
