<template>
  <div id="usage-guide-page">
    <ResultCard :result="exampleResult" />
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
        "Transliteration",
        "Additional pronunciation information",
        "Part of speech",
        "Yiddish",
      ],
    }
  },
}
</script>

<style scoped>
#usage-guide-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
