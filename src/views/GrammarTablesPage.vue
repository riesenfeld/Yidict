<template>
  <div id="grammar-tables-page">
    <Table :tableData="adjectiveInflections" />
    <!-- <Table :tableData="indefiniteAndRelativePronounsForPeople" />
    <Table :tableData="indefiniteAndRelativePronounsForObjects" /> -->
  </div>
</template>

<script>
const grammarTableData = require("@/data/grammartables.json")

import Table from "@/components/Table.vue"
export default {
  name: "GrammarTablesPage",
  components: {
    Table,
  },
  data() {
    return {
      adjectiveInflections: grammarTableData.adjectiveInflections,
      indefiniteAndRelativePronounsForPeople:
        grammarTableData.indefiniteAndRelativePronounsForPeople,
      indefiniteAndRelativePronounsForObjects:
        grammarTableData.indefiniteAndRelativePronounsForObjects,
    }
  },
}
</script>

<style scoped>
#grammar-tables-page {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 10vh;
  padding-bottom: 10vh;
  /* height: 90vh; */
}
#grammar-tables-page div {
  /* margin-top: 10vh; */
}
</style>
