<template>
  <nav :class="`topbar flex-row ${this.$store.state.theme}`">
    <div class="page_loader" v-if="this.$store.state.preLoader">
      <img src="@/assets/icons/page_loader.gif" alt="" />
    </div>

    <div class="inner_wrapper flex-column">
      <div class="first_row flex-row">
        <router-link :to="{ name: 'main_page' }" class="logo_wrapper flex-row">
          <img src="@/assets/icons/logo.png" alt="" />
          <h1 v-html="$t('topbar.logo')"></h1>
        </router-link>
        <div class="right_block flex-column">
          <div class="upper_level flex-row">
            <a href="tel:+99312390251"> <span>+993(12) 39 02 51</span></a>
            <a href="mailto:info@tugdk.gov.tm"
              ><span>info@tugdk.gov.tm</span></a
            >
            <LangIcons />
            <DarkThemeToggle />
          </div>
          <div
            class="lower_level flex-row"
            v-if="!this.$store.state.authenticated"
          >
            <router-link :to="{ name: 'login_page' }"
              ><span>{{ $t("topbar.login") }}</span></router-link
            >
            <span>&ensp;|&ensp;</span>
            <router-link :to="{ name: 'signup_page' }"
              ><span>{{ $t("topbar.signup") }}</span></router-link
            >
          </div>

          <ProfileButton v-if="this.$store.state.authenticated" />
        </div>
        <div
          :class="`hamburger_button flex-column ${this.$store.state.hamburger_active}`"
          @click="hamburgerActivate"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="second_row flex-row">
        <router-link :to="{ name: 'main_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.main_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'services_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.services_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'online_application_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.online_application_page")
          }}</span></router-link
        >

        <router-link :to="{ name: 'online' }">
          <span class="hover_underline_white"> Online</span></router-link
        >
        <router-link :to="{ name: 'news_page', params: { pageId: 1 } }">
          <span class="hover_underline_white">{{
            $t("topbar.news_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'about_us_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.about_us_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'contacts_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.contacts_page")
          }}</span></router-link
        >
      </div>
    </div>

    <div
      :class="`hamburger_menu flex-column ${this.$store.state.hamburger_active}`"
    >
      <div class="nav_block flex-column">
        <router-link :to="{ name: 'main_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.main_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'services_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.services_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'online_application_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.online_application_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'news_page', params: { pageId: 1 } }">
          <span class="hover_underline_white">{{
            $t("topbar.news_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'about_us_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.about_us_page")
          }}</span></router-link
        >
        <router-link :to="{ name: 'contacts_page' }">
          <span class="hover_underline_white">{{
            $t("topbar.contacts_page")
          }}</span></router-link
        >

        <hr />

        <div class="auth_row flex-row" v-if="!this.$store.state.authenticated">
          <router-link :to="{ name: 'login_page' }"
            ><span>{{ $t("topbar.login") }}</span></router-link
          >
          <span>&ensp;|&ensp;</span>
          <router-link :to="{ name: 'signup_page' }"
            ><span>{{ $t("topbar.signup") }}</span></router-link
          >
        </div>
        <ProfileButton v-if="this.$store.state.authenticated" />
      </div>

      <div class="buttom_block flex-column">
        <LangIcons />
        <div class="contacts_row flex-row">
          <a href="tel:+99312390251"> <span>+993(12) 39 02 51</span></a>
          <a href="mailto:info@tugdk.gov.tm"><span>info@tugdk.gov.tm</span></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import DarkThemeToggle from "@/components/DarkThemeToggle.vue";
import LangIcons from "@/components/LangIcons.vue";
import ProfileButton from "@/components/ProfileButton.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    DarkThemeToggle,
    LangIcons,
    ProfileButton,
  },
  data() {
    return {
      Route: useRoute(),
    };
  },
  mounted() {
    window.axios
      .get("/sanctum/csrf-cookie")
      .catch(this.$store.state.axiosCatch);
  },
  methods: {
    hamburgerActivate() {
      if (this.$store.state.hamburger_active == "") {
        this.$store.state.hamburger_active = "active";
        document.body.style.overflowY = "hidden";
      } else {
        this.$store.state.hamburger_active = "";
        document.body.style.overflowY = "initial";
      }
    },
  },
};
</script>
