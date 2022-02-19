<template>
  <div id="contact-page">
    <form name="contact" method="POST" data-netlify="true">
      <div class="form-item">
        <label for="message" class="screenreader-only">Your message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Your message goes here."
          required
        >
        </textarea>
      </div>
      <div class="form-item">
        <label for="email">Your email address</label>
        <input type="email" name="email" id="email" required />
      </div>
      <button class="form-item">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
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

/* An accessible way to hide form labels visually, but leave them in the
 * accessibility tree for screen readers.
 * Source: https://kittygiraudel.com/snippets/sr-only-class/ 
 */
.screenreader-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  margin: -1px !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}

.form-item {
  display: flex;
  flex-direction: column;
  text-align: left;
}

textarea,
input {
  /* Use UA styles for form elements */
  border: revert;
}
</style>
