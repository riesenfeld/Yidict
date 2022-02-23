<template>
  <div id="contact-page">
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue"

export default {
  name: "ContactPage",
  components: {
    ContactForm,
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
</style>
