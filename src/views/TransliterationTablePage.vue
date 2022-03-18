<template>
  <div id="transliteration-table-page">
    <section class="explanation">
      <h3>YIVO Transliteration</h3>
      <p>
        The <em>Yidisher Visnshaftlekher Institut</em> (<em lang="yi" dir="rtl"
          >ייִדישער װיסנשאַפֿטלעכער אינסטיטוט</em
        >), called YIVO for short, is the one of the primary pedagogical institutions of the Yiddish language, and
        a widely-accepted standards body in the domain of Yiddish-as-a-second-language education. In that capacity,
        they have provided a guide for how one may write Yiddish words using a Latin alphabet.
        <strong> This guide is provided as a table below.</strong>
      </p>
      <p>
        Bear in mind that YIVO orthographical standards are not necessarily representative of how Yiddish is
        written (or spoken) in the real world. At the bottom of this page, you will find a table of common
        deviations from YIVO-recommended orthography. Additionally, Yiddish words derived from Hebrew and Aramaic
        frequently do not conform to the rules of YIVO transliteration, as they tend to preserve their original
        spellings from those languages.
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
  metaInfo: {
    title: "Transliteration | Yidict",
    meta: [
      {
        name: "description",
        content: "Transliteration guide for Yidict, a free Yiddish-English dictionary on the web.",
        link: [{ rel: "canonical", href: "https://yiddishdictionary.net/transliteration" }],
      },
    ],
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
  width: 70vw;
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
  font-size: 1rem;
}

.table-area >>> .table-data-element[data-column="Yiddish"],
.table-area >>> .table-data-element[data-column="Non-YIVO Character"],
.table-area >>> .table-data-element[data-column="YIVO Preferred Spelling"] {
  font-size: 1.5rem;
}

.alternatives-table-area {
  width: 70vw;
}

@media (max-width: 500px) {
  section.explanation {
    width: 80vw;
  }
  .table-area >>> .table-data-element {
    font-size: 0.6rem;
  }
  .table-area >>> .table-data-element[data-column="Yiddish"],
  .table-area >>> .table-data-element[data-column="Non-YIVO Character"],
  .table-area >>> .table-data-element[data-column="YIVO Preferred Spelling"] {
    font-size: 0.8rem;
  }
  .table-area >>> .table-header {
    font-size: 0.5rem;
  }
}
</style>
