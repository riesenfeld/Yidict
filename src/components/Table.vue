<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="(cname, index) in tableData.columnNames"
          :key="index"
          class="table-header"
          v-html="cname"
          scope="col"
        ></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in tableData.rows" :key="rowIndex">
        <td
          v-for="(cell, cellIndex) in tableData.rows[rowIndex]"
          :key="cellIndex"
          class="table-data-element"
          :data-column="tableData.columnNames[cellIndex]"
          v-html="cell"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableData: Object,
  },
  methods: {},
  computed: {
    flattenedData() {
      let arr = this.headerize(this.tableData.columnNames)
      for (let i = 0; i < this.tableData.rows.length; i++) {
        arr = arr.concat(this.tableData.rows[i])
      }
      return arr
    },
    gridFromData() {
      let numColumns = this.tableData.columnNames.length
      return {
        display: "grid",
        gridAutoRows: "min-content",
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
      }
    },
  },
}
</script>

<style scoped>
.table {
  max-width: 90vw;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

table {
  border-collapse: collapse;
  border: 1px solid black;
}

table th,
table td {
  border: 1px solid black;
  padding: 2px;
}

tr:nth-child(even) {
  background-color: #f5f9f9;
}
</style>
