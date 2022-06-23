<template>
  <div id="grammar-tables-page">
    <div v-if="$route.params.table == 'all'" class="tables-all-or-one">
      <div class="grammar-tables-nav-header">
        <h3>Click a link below to scroll down to a table</h3>
        <span class="tables-all-or-one-link">
          <span>(</span>
          <router-link
            :to="{ name: 'GrammarTablesPage', params: {} }"
            v-html="'Or click here to select a table individually'"
          >
          </router-link>
          <span>)</span>
        </span>
      </div>
      <nav class="grammar-tables-nav" role="navigation" aria-label="Grammar table selection">
        <a
          v-for="(table, index) in grammarTables"
          :key="index"
          :href="'#' + table.name"
          v-html="table.table.title"
        ></a>
      </nav>
      <div v-for="(table, index) in grammarTables" :key="index" class="table-area">
        <h3 :id="table.name" class="table-title">{{ table.table.title }}</h3>
        <Table :tableData="table.table" />
      </div>
    </div>
    <div v-else class="tables-all-or-one">
      <div class="grammar-tables-nav-header">
        <h3>Click a link below to view an individual table</h3>
        <span class="tables-all-or-one-link">
          <span>(</span>
          <router-link
            :to="{ name: 'GrammarTablesPage', params: { table: 'all' } }"
            v-html="'Or click here to view all tables at once'"
          >
          </router-link>
          <span>)</span>
        </span>
      </div>
      <nav class="grammar-tables-nav">
        <router-link
          v-for="(table, index) in grammarTables"
          :key="index"
          :to="{ name: 'GrammarTablesPage', params: { table: table.name } }"
          v-html="table.table.title"
        ></router-link>
      </nav>
      <div class="table-area">
        <h3 v-if="$route.params.table != undefined" class="table-title">
          {{ getTableByName($route.params.table).title }}
        </h3>
        <Table v-if="$route.params.table != undefined" :tableData="getTableByName($route.params.table)" />
      </div>
    </div>
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
  mounted() {
    /* Tell Netlify to consider the page fully rendered, so that metaInfo gets prerendered,
     * as per https://answers.netlify.com/t/support-guide-understanding-and-debugging-prerendering/150
     * and https://docs.prerender.io/docs/11-best-practices
     */
    window.prerenderReady = true
  },
  metaInfo: {
    title: "Grammar Tables | Yidict",
    meta: [
      {
        name: "description",
        content: "Grammar tables from Yidict, a free Yiddish-English dictionary on the web.",
      },
      { property: "og:title", content: "Grammar Tables | Yidict" },
      {
        property: "og:url",
        content: "https://yiddishdictionary.net/grammar",
      },
      {
        property: "og:description",
        content: "Grammar tables from Yidict, a free Yiddish-English dictionary on the web.",
      },
      {
        property: "twitter:url",
        content: "https://yiddishdictionary.net/grammar",
      },
      {
        property: "twitter:title",
        content: "Grammar Tables | Yidict",
      },
      {
        property: "twitter:description",
        content: "Grammar tables from Yidict, a free Yiddish-English dictionary on the web.",
      },
    ],
    link: [{ rel: "canonical", href: "https://yiddishdictionary.net/grammar" }],
  },
}
</script>

<style scoped>
#grammar-tables-page {
  min-height: 90vh;
}
#grammar-tables-page .tables-all-or-one {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 10vh;
  padding-bottom: 10vh;
}
.grammar-tables-nav-header {
  margin-bottom: 3vh;
}
.grammar-tables-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  row-gap: 2vh;
  width: min(80vw, 1200px);
}
.tables-all-or-one-link {
  font-size: 0.8rem;
}
.table-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.table-title {
  margin-bottom: 3vh;
}
@media (max-width: 500px) {
  .table-area {
    font-size: 0.6rem;
  }
}
</style>
