const SitemapPlugin = require("sitemap-webpack-plugin").default

const base = "https://yiddishdictionary.net"
const paths = [
  {
    path: "/",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.6,
    changefreq: "hourly",
  },
  {
    path: "/about",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.6,
    changefreq: "hourly",
  },
  {
    path: "/contact",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.5,
    changefreq: "hourly",
  },
  {
    path: "/grammar",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.5,
    changefreq: "hourly",
  },
  {
    path: "/search",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.5,
    changefreq: "hourly",
  },
  {
    path: "/transliteration",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.5,
    changefreq: "hourly",
  },
  {
    path: "/usage",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: 0.5,
    changefreq: "hourly",
  },
]

const options = {
  filename: "sitemap.xml",
  lastmod: true,
  changefreq: "hourly",
  priority: 0.6,
}

module.exports = {
  configureWebpack: {
    plugins: [new SitemapPlugin({ base, paths, options })],
  },
}
