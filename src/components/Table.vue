<template>
  <div id="table" :style="gridFromData">
    <div
      v-for="(element, index) in flattenedData"
      :key="index"
      class="table-element"
      :style="tableElementStyles(index)"
    >
      {{ element }}
    </div>
  </div>
</template>

<script>
export default {
  name: "IndefiniteAndRelativePronounsForPeopleTable",
  props: {
    tableData: Object,
  },
  methods: {
    tableElementStyles(index) {
      let columnPosition = index % this.tableData.columnNames.length
      let rowPosition = Math.floor(index / this.tableData.rows.length)
      let borderStyle = "1px solid black"
      let styleObject = {
        borderTop: "none",
        borderBottom: "none",
        borderLeft: "none",
        borderRight: "none",
      }

      /* If in not in the bottom row, put a border at the bottom */
      if (rowPosition < this.tableData.rows.length - 1) {
        styleObject.borderBottom = borderStyle
      }
      /* If not in the rightmost column, put a border on the left */
      if (columnPosition < this.tableData.columnNames.length - 1) {
        styleObject.borderRight = borderStyle
      }
      return styleObject
    },
  },
  computed: {
    flattenedData() {
      let arr = []
      for (let i = 0; i < this.tableData.rows.length; i++) {
        arr = arr.concat(this.tableData.rows[i])
      }
      return arr
    },
    gridFromData() {
      let numRows = this.tableData.rows.length
      let numColumns = this.tableData.columnNames.length
      return {
        display: "grid",
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
      }
    },
  },
}
</script>

<style scoped>
#table {
  width: 90vw;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.table-element {
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
