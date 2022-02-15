<template>
  <div id="grammar-tables-page">
    <div v-if="$route.params.table == 'all'" class="tables-all-or-one">
      <nav class="grammar-tables-nav">
        <a
          v-for="(table, index) in grammarTables"
          :key="index"
          :href="'#' + table.name"
          v-html="table.table.title"
        ></a>
        <router-link :to="{ name: 'GrammarTablesPage', params: {} }">
          View tables individually
        </router-link>
      </nav>
      <div v-for="(table, index) in grammarTables" :key="index" class="table-area">
        <h3 :id="table.name" class="table-title">{{ table.table.title }}</h3>
        <Table :tableData="table.table" />
      </div>
    </div>
    <div v-else class="tables-all-or-one">
      <nav class="grammar-tables-nav">
        <router-link
          v-for="(table, index) in grammarTables"
          :key="index"
          :to="{ name: 'GrammarTablesPage', params: { table: table.name } }"
          v-html="table.table.title"
        ></router-link>
        <router-link :to="{ name: 'GrammarTablesPage', params: { table: 'all' } }">
          View all tables at once
        </router-link>
      </nav>
      <div class="table-area">
        <h3 v-if="$route.params.table != undefined" class="table-title">
          {{ getTableByName($route.params.table).title }}
        </h3>
        <Table
          v-if="$route.params.table != undefined"
          :tableData="getTableByName($route.params.table)"
        />
      </div>
    </div>

    <!-- <Table :tableData="adjectiveInflections" /> -->
    <!-- <Table :tableData="possessivePronouns" /> -->
    <!-- <Table :tableData="definiteArticles" /> -->
    <!-- <Table :tableData="personalPronouns" /> -->
    <!-- <Table :tableData="demonstrativeDeterminers" /> -->
    <!-- <Table :tableData="indefiniteAndRelativePronounsForPeople" /> -->
    <!-- <Table :tableData="indefiniteAndRelativePronounsForObjects" /> -->
    <!-- <h2 id="header" name="header">header</h2> -->
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
      grammarTables: [
        { name: "adjectiveInflections", table: grammarTableData.adjectiveInflections },
        { name: "possessivePronouns", table: grammarTableData.possessivePronouns },
        { name: "definiteArticles", table: grammarTableData.definiteArticles },
        { name: "personalPronouns", table: grammarTableData.personalPronouns },
        {
          name: "demonstrativeDeterminers",
          table: grammarTableData.demonstrativeDeterminers,
        },
        {
          name: "indefiniteAndRelativePronounsForPeople",
          table: grammarTableData.indefiniteAndRelativePronounsForPeople,
        },
        {
          name: "indefiniteAndRelativePronounsForObjects",
          table: grammarTableData.indefiniteAndRelativePronounsForObjects,
        },
      ],
    }
  },
  methods: {
    getTableByName(name) {
      return this.grammarTables.filter((table) => table.name == name)[0].table
    },
  },
}
</script>

<style scoped>
#grammar-tables-page .tables-all-or-one {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 10vh;
  padding-bottom: 10vh;
}
.grammar-tables-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  row-gap: 2vh;
}
.table-area {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.table-title {
  margin-bottom: 3vh;
}
.grammar-table {
  /* margin-top: 5vh;
  margin-bottom: 5vh; */
}
</style>
