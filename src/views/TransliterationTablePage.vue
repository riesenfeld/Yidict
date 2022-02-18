<template>
  <div id="transliteration-table-page">
    <section class="explanation">
      <h3>YIVO Transliteration</h3>
      <p>
        The <em>Yidisher Visnshaftlekher Institut</em> (<em lang="yi"
          >ייִדישער װיסנשאַפֿטלעכער אינסטיטוט</em
        >), called YIVO for short, is the closest thing that the Yiddish language has to a standards
        body. In that capacity, they have provided a guide for how one should write Yiddish words
        using a Latin alphabet. This guide is provided as a table below.
      </p>
      <p>
        Bear in mind that YIVO orthographical standards are not necessarily representative of how
        Yiddish is written in the real world. At the bottom of this page, you will find a table of
        common deviations from YIVO-recommended orthography.
      </p>
    </section>
    <section class="table-area">
      <h3 class="table-title">{{ transliterations.title }}</h3>
      <div class="split-table-container">
        <Table :tableData="splitTable[0]" />
        <Table :tableData="splitTable[1]" />
      </div>
    </section>
    <section class="table-area alternatives-table-area">
      <h3 class="table-title">{{ alternatives.title }}</h3>
      <Table :tableData="alternatives" />
    </section>
  </div>
</template>

<script>
const transliterationTableData = require("@/data/transliterationtables.json")

import Table from "@/components/Table.vue"

export default {
  name: "TransliterationTablePage",
  components: {
    Table,
  },
  data() {
    return {
      transliterations: transliterationTableData.transliterations,
      alternatives: transliterationTableData.alternatives,
    }
  },
  computed: {
    /* Splits transliterations table data in two  for two shorter tables */
    splitTable() {
      let longTable = this.transliterations
      let rowsPerTable = Math.ceil(longTable.rows.length / 2)

      let table1 = {
        title: longTable.title,
        columnNames: longTable.columnNames,
        rows: longTable.rows.slice(0, rowsPerTable),
      }
      let table2 = {
        title: longTable.title,
        columnNames: longTable.columnNames,
        rows: longTable.rows.slice(rowsPerTable),
      }

      return [table1, table2]
    },
  },
}
</script>

<style scoped>
#transliteration-table-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding-top: 5vh;
}
section {
  width: 90vw;
  margin-bottom: 4vh;
}
section.explanation {
  width: 80vw;
}
section p {
  text-align: left;
  margin-bottom: 2vh;
}
.table-area {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
h3 {
  margin-bottom: 2vh;
}
.split-table-container {
  display: flex;
  justify-content: space-evenly;
}
/* Using vue-loader deep selector to reach into child component */
.split-table-container >>> .table {
  width: 42vw;
  height: fit-content;
}
.table-area >>> .table-data-element {
  font-size: 1.2rem;
}
.split-table-container >>> .table-data-element[data-column="Name"],
.split-table-container >>> .table-data-element[data-column="Romanization"] {
  font-size: 1rem;
}

.alternatives-table-area {
  width: 70vw;
}
</style>
