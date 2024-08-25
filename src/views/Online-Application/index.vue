<template>
    <div class="application_page flex-column">
        <div class="inner_wrapper flex-row">
    <div class="initial_tab_container">
      <div class="title_block">
        <h2 class="title">{{ $t("initial_tab.title") }}</h2>
      </div>
  
      <div class="buttons_block flex-row">
        <div
          class="button_container container_box_shadow flex-row"
          @click="changeTab(tabs.profileTab)"
        >
          <p class="button_text">{{ $t("initial_tab.dashboard") }}</p>
          <svg
            class="button_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="115"
            viewBox="0 0 115 115"
            fill="none"
          >
            <path
              d="M88.9274 93.6721C84.1672 80.9404 71.892 71.8756 57.4997 71.8756C43.1073 71.8756 30.8321 80.9404 26.0719 93.6721M88.9274 93.6721C99.0298 84.8871 105.416 71.9397 105.416 57.5006C105.416 31.037 83.9633 9.58398 57.4997 9.58398C31.036 9.58398 9.58301 31.037 9.58301 57.5006C9.58301 71.9397 15.9696 84.8871 26.0719 93.6721M88.9274 93.6721C80.5143 100.988 69.5243 105.417 57.4997 105.417C45.4751 105.417 34.485 100.988 26.0719 93.6721"
              stroke="#D1D1D1"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M71.875 43.126C71.875 51.0651 65.4391 57.501 57.5 57.501C49.5609 57.501 43.125 51.0651 43.125 43.126C43.125 35.1869 49.5609 28.751 57.5 28.751C65.4391 28.751 71.875 35.1869 71.875 43.126Z"
              stroke="var(--hover_color)"
              stroke-width="4"
              stroke-linejoin="round"
            />
          </svg>
        </div>
  
        <div
          class="button_container container_box_shadow flex-row"
          @click="changeTab(tabs.loadPermissionTab)"
        >
          <p class="button_text" v-html="$t('initial_tab.load_permission')"></p>
          <svg
            class="button_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="115"
            viewBox="0 0 115 115"
            fill="none"
          >
            <path
              d="M53.2212 80.0254H39.0996"
              stroke="var(--hover_color)"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M39.0996 43.125H73.7337"
              stroke="var(--hover_color)"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M39.0996 61.5752H67.3418"
              stroke="var(--hover_color)"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M98.8996 47.9163V35.9372C98.8996 25.3517 90.6616 16.7705 80.4996 16.7705H34.4996C24.3376 16.7705 16.0996 25.3517 16.0996 35.9372V86.2497C16.0996 96.8351 24.3376 105.416 34.4996 105.416H43.6996M39.0996 9.58301V23.958M75.8996 9.58301V23.958M57.4996 105.416L71.5791 101.235C72.3339 101.011 73.0214 100.59 73.5764 100.012L96.6445 75.9826C99.6513 72.8505 99.6513 67.7725 96.6445 64.6404C93.6377 61.5083 88.7628 61.5083 85.756 64.6404L62.6879 88.6697C62.1329 89.2478 61.7286 89.9639 61.5134 90.7502L57.4996 105.416Z"
              stroke="#D1D1D1"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
  
        <div
          class="button_container container_box_shadow flex-row"
          @click="changeTab(tabs.unloadPermissionTab)"
        >
          <p class="button_text" v-html="$t('initial_tab.unload_permission')"></p>
          <svg
            class="button_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="115"
            viewBox="0 0 115 115"
            fill="none"
          >
            <path
              d="M100.625 47.4508V34.9344C100.625 23.8743 92.0438 14.9082 81.4583 14.9082H33.5417C22.9562 14.9082 14.375 23.8743 14.375 34.9344V87.5031C14.375 98.5632 22.9562 107.529 33.5417 107.529H43.125M38.3333 7.39844V22.4181M76.6667 7.39844V22.4181M57.5 107.529L72.1661 103.161C72.9524 102.926 73.6685 102.487 74.2467 101.882L98.2759 76.7756C101.408 73.5031 101.408 68.1973 98.2759 64.9248C95.1439 61.6522 90.0658 61.6522 86.9337 64.9248L62.9044 90.0316C62.3263 90.6357 61.9052 91.3839 61.6811 92.2054L57.5 107.529Z"
              stroke="#D1D1D1"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M43.125 57.8891L51.5239 64.9095C53.5263 66.5832 56.4348 66.3132 58.1234 64.2969L71.875 47.876"
              stroke="var(--hover_color)"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
  
        <div
          class="button_container container_box_shadow flex-row"
          @click="changeTab(tabs.onlineApplicationTab)"
        >
          <p
            class="button_text"
            v-html="$t('initial_tab.online_application')"
          ></p>
          <svg
            class="button_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="115"
            viewBox="0 0 115 115"
            fill="none"
          >
            <path
              d="M100.625 47.9173V35.9382C100.625 25.3527 92.0438 16.7715 81.4583 16.7715H33.5417C22.9562 16.7715 14.375 25.3527 14.375 35.9382V86.2506C14.375 96.8361 22.9562 105.417 33.5417 105.417H43.125M38.3333 9.58398V23.959M76.6667 9.58398V23.959"
              stroke="#D1D1D1"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M86.9337 64.641C90.0658 61.509 95.1439 61.509 98.2759 64.641C101.408 67.7731 101.408 72.8512 98.2759 75.9833L86.2613 87.9979L74.2467 100.013C73.6685 100.591 72.9524 101.012 72.1661 101.236L57.5 105.417L61.6811 90.7508C61.9052 89.9646 62.3263 89.2485 62.9044 88.6703L86.9337 64.641Z"
              stroke="var(--hover_color)"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
  
      <span class="background_text">{{
        $t("topbar.online_application_page")
      }}</span>
    </div>
    </div>
    <FeedbackBanner  />
</div>
  </template>
  
  <script>
  import FeedbackBanner from "@/components/FeedbackBanner.vue";
  export default {
    components: {FeedbackBanner},
    data() {
        return {
      tabs: {
        initialTab: "initialTab",
        profileTab: "profileTab",
        individualDataTab: "individualDataTab",
        individualDrivers: "individualDrivers",
        individualDriversCreate: "individualDriversCreate",
        individualDriversEdit: "individualDriversEdit",
        legalDrivers: "legalDrivers",
        legalDriverCreate: "legalDriverCreate",
        legalDriverEdit: "legalDriverEdit",
        individualCarCreate: "individualCarCreate",
        individualCarEdit: "individualCarEdit",
        individualTrailers: "individualTrailers",
        individualTrailerCreate: "individualTrailerCreate",
        individualTrailerEdit: "individualTrailerEdit",

        legalTrailers: "legalTrailers",
        legalTrailerCreate: "legalTrailerCreate",
        legalTrailerEdit: "legalTrailerEdit",

        individualCars: "individualCars",
        legalCars: "legalCars",
        legalCarCreate: "legalCarCreate",
        legalCarEdit: "legalCarEdit",
        legalData: "legalData",
        ePermitHistory: "ePermitHistory",
        ePermitCreate: "ePermitCreate",
        loadPermissionTab: "loadPermissionTab",
        unloadPermissionTab: "unloadPermissionTab",
        onlineApplicationTab: "onlineApplicationTab",
        historyTab: "historyTab",
        changePasswordTab: "changePasswordTab",
      }
    }
    },
    methods: {
    changeTab(tab) {
      if (!this.$store.state.authenticated && tab != this.tabs.initialTab) {
        this.$router.push({ name: "login_page" });
      } else {        
        this.$router.push({name: 'profileTab',params: {tab: tab}})
        // this.$store.state.currentTab = tab;
      }
    },
  },
  };
  </script>
  