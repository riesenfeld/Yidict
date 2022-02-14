<template>
  <div id="grammar-tables-page">
    <Table :tableData="indefiniteAndRelativePronounsForPeople" />
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
      indefiniteAndRelativePronounsForPeople:
        grammarTableData.indefiniteAndRelativePronounsForPeople,
    }
  },
}
</script>

<style scoped>
#grammar-tables-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
