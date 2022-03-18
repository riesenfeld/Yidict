<template>
  <div id="home">
    <SearchForm />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue"

export default {
  name: "HomePage",
  components: {
    SearchForm,
  },
  created() {
    document.title = "Yidict"
  },
}
</script>
<style scoped>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
</style>
