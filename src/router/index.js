import Vue from "vue"
import VueRouter from "vue-router"
import HomePage from "../views/HomePage.vue"
import SearchResultsPage from "../views/SearchResultsPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/search",
    name: "SearchResultsPage",
    component: SearchResultsPage,
  },
  {
    path: "/about",
    name: "AboutPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutPage.vue"),
  },
  {
    path: "/usage",
    name: "UsageGuidePage",
    component: () => import("@/views/UsageGuidePage.vue"),
  },
  {
    path: "/transliteration",
    name: "TransliterationTablePage",
    component: () => import("@/views/TransliterationTablePage"),
  },
  {
    path: "/grammar/:table?",
    name: "GrammarTablesPage",
    component: () => import("@/views/GrammarTablesPage"),
  },
  {
    path: "/contact/:submissionStatus?",
    name: "ContactPage",
    component: () => import("@/views/ContactPage"),
  },
  {
    path: "/*",
    name: "HomePage",
    component: HomePage,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
