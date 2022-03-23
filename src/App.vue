<template>
  <div id="app" v-on="menuIsOpen ? { click: toggleMenu } : {}">
    <Header @menuToggled="toggleMenu" :menuIsOpen="menuIsOpen" />
    <SideBar :menuIsOpen="menuIsOpen" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import SideBar from "@/components/SideBar.vue"

export default {
  name: "App",
  components: {
    Header,
    SideBar,
  },
  data() {
    return {
      menuIsOpen: false,
    }
  },
  methods: {
    /**
     * Toggles the SideBar menu component.
     * When the sidebar is open, clicking anywhere other than the sidebar
     *  will cause it to close.
     * We pass in a default dummy parameter here to handle the case where
     *  toggleMenu() is called by a custom event (namely, the menu button on the nav),
     *  which doesn't have an event object associated with it.
     */
    toggleMenu(event = { target: { id: "" } }) {
      if (event.target.id != "side-bar") {
        this.menuIsOpen = !this.menuIsOpen
      }
    },
  },
  metaInfo: {
    meta: [
      { property: "og:type", content: "website" },
      {
        property: "og:site_name",
        content: "Yidict",
      },
      {
        property: "og:image",
        content: "https://yiddishdictionary.net/preview_img_1200x630.png",
      },
      {
        property: "og:image:secure_url",
        content: "https://yiddishdictionary.net/preview_img_1200x630.png",
      },
      {
        property: "og:image:type",
        content: "image/png",
      },
      {
        property: "og:image:alt",
        // Leave this empty for accessibility
        content: "",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
    ],
  },
}
</script>

<style>
* {
  /* Simple reset */
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

:root {
  --main-color: rgba(0, 0, 82, 0.9);
  --shadow-color: rgba(90, 90, 90, 0.5);
}

#app {
  position: relative;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}
</style>
