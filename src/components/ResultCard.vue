<template>
  <div id="result-card">
    <div v-for="(element, index) in result" :key="index" class="result-element">
      {{ result[index] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultCard",
  props: {
    result: Array,
  },
}
</script>

<style>
#result-card {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.result-element {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
