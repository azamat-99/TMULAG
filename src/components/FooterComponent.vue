<template>
  <footer class="flex-row">
    <div class="inner_wrapper flex-column">
      <div class="upper_row flex-row">
        <router-link
          :to="{ name: 'main_page' }"
          class="logo_inner_wrapper flex-row"
        >
          <img src="@/assets/icons/logo.png" alt="" />
          <h1 v-html="$t('topbar.logo')"></h1>
        </router-link>
      </div>
      <div class="middle_row flex-column">
        <div class="nav_buttons_row flex-row">
          <router-link
            :to="{ name: 'main_page' }"
            class="footer_button hover_underline_white"
            >{{ $t("topbar.main_page") }}</router-link
          >
          <router-link
            :to="{ name: 'services_page' }"
            class="footer_button hover_underline_white"
            >{{ $t("topbar.services_page") }}</router-link
          >
          <router-link
            :to="{ name: 'online_application_page' }"
            class="footer_button hover_underline_white"
            >{{ $t("topbar.online_application_page") }}</router-link
          >
          <router-link
            :to="{ name: 'news_page', params: { pageId: 1 } }"
            class="footer_button hover_underline_white"
            >{{ $t("topbar.news_page") }}</router-link
          >
          <router-link
            :to="{ name: 'about_us_page' }"
            class="footer_button hover_underline_white"
            >{{ $t("topbar.about_us_page") }}</router-link
          >
          <router-link
            :to="{ name: 'contacts_page' }"
            class="footer_button hover_underline_white"
            >{{ $t("topbar.contacts_page") }}</router-link
          >
        </div>

        <div class="contacts_row flex-row">
          <span>{{ $t("topbar.address_value") }}</span>
          <a href="tel:+99312390251"><span>+99312 39-02-51</span></a>
          <a href="mailto:info@tugdk.gov.tm"><span>info@tugdk.gov.tm</span></a>
          <a
            class="flex-row rss"
            :href="`${this.$store.state.backendRoot}/rss`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              class="bi bi-rss"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3-8.5a1 1 0 0 1 1-1c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1 6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1-1-1z"
              />
            </svg>
            <span>RSS</span>
          </a>
        </div>
      </div>
      <div class="bottom_row flex-row">
        <span><span id="year"></span> {{ $t("topbar.copyright") }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",

  mounted() {
    document.getElementById("year").innerHTML = new Date().getFullYear();
  },
};
</script>
