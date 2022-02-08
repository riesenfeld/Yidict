<template>
  <div id="result-card">
    <div
      v-for="(element, index) in result"
      :key="index"
      class="result-element"
      :style="gridItemPosition(index)"
    >
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
  methods: {
    gridItemPosition(index) {
      switch (index) {
        case 0:
          return {
            gridRowStart: 1,
            gridRowEnd: 2,
            gridColumnStart: 1,
            gridColumnEnd: 4,
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          }
        case 1:
          return {
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: 1,
            gridColumnEnd: 3,
            borderRight: "1px solid black",
          }
        case 2:
          return {
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: 3,
            gridColumnEnd: 5,
            borderRight: "1px solid black",
          }
        case 3:
          return {
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: 5,
            gridColumnEnd: 7,
          }
        case 4:
          return {
            gridRowStart: 1,
            gridRowEnd: 2,
            gridColumnStart: 4,
            gridColumnEnd: 7,
            borderBottom: "1px solid black",
          }
      }
    },
  },
}
</script>

<style scoped>
#result-card {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(6, 1fr);

  width: 50%;
  min-height: 30vh;
  margin-top: 3vh;

  background-color: rgb(230, 230, 230);
  box-shadow: 4px 4px 4px var(--shadow-color);
}
.result-element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
}
</style>
