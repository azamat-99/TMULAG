<template>
  <TopBar v-if="this.$route.path !== '/'" />
  <router-view />
  <FooterComponent />
</template>
<script>
import FooterComponent from "./components/FooterComponent.vue";
import TopBar from "./components/TopBar.vue";
export default {
  name: "App",
  components: {
    TopBar,
    FooterComponent,
  },
};
</script>
