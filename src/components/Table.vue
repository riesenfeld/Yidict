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
}
</script>

<style scoped>
.table {
  max-width: 90vw;
  border-collapse: collapse;
  border: 0.5px solid black;
}

table th,
table td {
  border: 0.5px solid black;
  padding: 2px;
}

tr:nth-child(even) {
  background-color: #f5f9f9;
}
</style>
