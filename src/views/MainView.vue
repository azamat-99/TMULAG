<template>
  <TopBar id="outer_topbar" />

  <div class="banner_main flex-column">
    <TopBar id="inner_topbar" />
    <div class="inner_wrapper flex-row">
      <h2 class="banner_text">{{ $t("main_page.banner_text") }}</h2>

      <div class="second_column flex-column">
        <router-link
          :to="{ name: 'online_application_page' }"
          class="link_button flex-row"
        >
          <span>{{ $t("main_page.online_application") }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-arrow-up-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
            />
          </svg>
        </router-link>
      </div>
    </div>

    <Carousel
      :autoplay="4000"
      :transition="500"
      :wrap-around="true"
      :mouseDrag="false"
      :infinite="true"
    >
      <Slide v-for="slide in [1, 2, 3]" :key="slide">
        <img :src="require(`@/assets/images/${slide}slyde.jpg`)" />
      </Slide>
    </Carousel>
  </div>

  <div class="magtymguly_sec_main">
    <div class="logo">
      <img src="@/assets/images/2024.png" alt="" />
      <h2 v-html="$t('main_page.year_motto')"></h2>
    </div>
  </div>

  <AboutUsSection />

  <div class="services_sec_main flex-row">
    <div class="inner_wrapper flex-row">
      <span class="background_text">{{ $t("topbar.services_page") }}</span>
      <div class="left_block">
        <div class="logo_row flex-row">
          <img src="@/assets/images/2024.png" alt="" />
          <h2 v-html="$t('main_page.year_motto')"></h2>
        </div>
      </div>

      <div class="right_block flex-column">
        <h2>{{ $t("topbar.services_page") }}</h2>
        <p v-html="$t('main_page.services_text')"></p>
        <router-link
          :to="{ name: 'services_page' }"
          class="default-link-button hover-orange-darker"
          >{{ $t("main_page.details_button") }}</router-link
        >
      </div>
    </div>
  </div>

  <NavSectionMain />

  <div class="map-wrapper">
    <h2 class="banner_text">HALKARA ULAG GEÇELGESI</h2>

    <div class="tap-container">
      <p
        :class="[activeMap === 1 ? 'tap_active' : 'tap_text']"
        @click="activeMap = 1"
      >
        "LAPIS LAZULI"
      </p>
      <p
        :class="[activeMap === 2 ? 'tap_active' : 'tap_text']"
        @click="activeMap = 2"
      >
        “AŞGABAT YLALAŞYGY”
      </p>
      <!-- <p :class="[activeMap === 3 ? 'tap_active' : 'tap_text']">“ТРАСЕКА”</p> -->
    </div>

    <div class="flex-row">
      <img
        class="map-img"
        v-if="activeMap == 1"
        src="../assets/svg/map.svg"
        alt="map svg"
      />
      <img
        class="map-img"
        v-if="activeMap == 2"
        src="../assets/svg/map2.svg"
        alt="map svg"
      />
    </div>
    <div class="flex-row"></div>
    <div class="flex-row"></div>
  </div>

  <div class="news_sec_main flex-row">
    <div class="inner_wrapper">
      <span class="background_text">{{ $t("topbar.news_page") }}</span>
      <router-link
        :to="{ name: 'news_page', params: { pageId: 1 } }"
        class="title_row flex-row"
      >
        <h2 class="title">{{ $t("topbar.news_page") }}</h2>
        <svg
          class="chevron_right"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7 13.2L9.7 19.2C9.5 19.4 9.3 19.5 9 19.5C8.7 19.5 8.5 19.4 8.3 19.2C7.9 18.8 7.9 18.2 8.3 17.8L13.6 12.5L8.3 7.2C7.9 6.8 7.9 6.2 8.3 5.8C8.7 5.4 9.3 5.4 9.7 5.8L15.7 11.8C16.1 12.2 16.1 12.8 15.7 13.2Z"
            fill="var(--hover_color)"
          />
        </svg>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="15"
            cy="15"
            r="12.5"
            stroke="var(--hover_color)"
            stroke-width="1.5"
          />
          <path
            d="M17.9575 17.623L19.3301 12.5005M19.3301 12.5005L14.2075 11.1279M19.3301 12.5005L10.6698 17.5005"
            stroke="var(--hover_color)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>

      <div class="news_block flex-row">
        <NewsContainer v-for="news in news_4" :key="news.id" :news_obj="news" />
      </div>
    </div>
  </div>

  <FeedbackBanner />

  <MapSectionMain />
</template>

<script>
import AboutUsSection from "@/components/AboutUsSection.vue";
import FeedbackBanner from "@/components/FeedbackBanner.vue";
import MapSectionMain from "@/components/MapSectionMain.vue";
import NavSectionMain from "@/components/NavSectionMain.vue";
import NewsContainer from "@/components/NewsContainer.vue";
import TopBar from "@/components/TopBar.vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    FeedbackBanner,
    TopBar,
    AboutUsSection,
    NavSectionMain,
    NewsContainer,
    MapSectionMain,
    Carousel,
    Slide,
  },

  data() {
    return {
      news_4: null,
      backendRoutes: this.$store.state.backendRoutes,
      scrollY: window.scrollY,
      activeTab: "tab1",
      activeMap: 1,
    };
  },

  mounted() {
    this.$store.state.preLoader = true;
    this.$store.state.currentTitle = this.$t("topbar.main_page");

    if (
      window.scrollY <
      document.querySelector(".banner_main").clientHeight - 240
    ) {
      document.querySelector("#outer_topbar").style.display = "none";
    }

    document.addEventListener("scroll", this.scrolled, true);
    document.querySelector(".tooltip_container").style.display = "none" ?? "";
    window.axios
      .get(this.backendRoutes.home, {
        responseType: "json",
      })
      .then((res) => {
        this.news_4 = res.data;
      })
      .catch(this.$store.state.axiosCatch)
      .finally(() => {
        this.$store.state.preLoader = false;
      });
  },

  methods: {
    scrolled() {
      try {
        if (parseInt(window.scrollY) > 0) {
          document
            .querySelector("#inner_topbar")
            .style.setProperty(
              "background-color",
              "var(--footer_background)",
              "important"
            );
        } else {
          document
            .querySelector("#inner_topbar")
            .style.setProperty("background-color", "unset");
        }

        if (
          window.scrollY >
          document.querySelector(".banner_main").clientHeight - 240
        ) {
          document.querySelector("#outer_topbar").style.display = "flex";
          document.querySelector("#inner_topbar").style.opacity = "0";
          document.querySelector("#inner_topbar").style.visibility = "hidden";
        } else {
          document.querySelector("#outer_topbar").style.display = "none";
          document.querySelector("#inner_topbar").style.opacity = "1";
          document.querySelector("#inner_topbar").style.visibility = "visible";
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  unmounted() {
    document.removeEventListener("scroll", this.scrolled, true);
  },
};
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  max-width: var(--default_width);

  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.map-container {
  display: flex;
  justify-content: center;
}

.map-img {
  width: 100%;
  height: auto;
  max-width: 100%;
}

.map-wrapper .banner_text {
  text-transform: uppercase;
  font-family: "UnboundedBold", sans-serif;
  font-size: 35px;
  letter-spacing: 0.6px;
  line-height: 57px;
}

.tap-container {
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 20px;
}

.tap_text {
  font-family: "GilroyBold", sans-serif;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 3px solid transparent;
  cursor: pointer;
}

.tap_active {
  font-family: "GilroyBold", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #079e33;
  cursor: pointer;
  border-bottom: 3px solid #079e33;
}

@media (max-width: 1360px) {
  .map-wrapper .banner_text {
    font-size: 26px;
  }

  .tap_text,
  .tab_active {
    font-size: 15px;
  }
}

@media (max-width: 424px) {
  .map-wrapper .banner_text {
    font-size: 16px;
  }

  .tap-text,
  .tab-active {
    font-size: 13.5px;
  }
}
</style>
