<template>
  <div class="nav_sec_main flex-row">
    <div class="inner_wrapper flex-column">
      <div
        :class="`row ${this.nav_section.permissions_active} flex-row`"
        @click="navActivate('permissions_active')"
      >
        <div class="title flex-row">
          <span>{{ $t("permissions_nav.title") }}</span>

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
        </div>

        <div class="content flex-row">
          <img src="@/assets/images/permissions_main.jpg" alt="" />
          <div class="text_block flex-column">
            <p>
              {{ $t("permissions_nav.text_1") }}
            </p>
            <hr />
            <p>
              {{ $t("permissions_nav.text_2") }}
            </p>
          </div>
        </div>
      </div>
      <hr />

      <div
        :class="`row ${this.nav_section.services_active} flex-row`"
        @click="navActivate('services_active')"
      >
        <div class="title flex-row">
          <span>{{ $t("services_nav.title") }}</span>

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
        </div>

        <div class="content flex-row">
          <img src="@/assets/images/services_main.jpg" alt="" />
          <div class="text_block flex-column">
            <p>
              {{ $t("services_nav.text_1") }}
            </p>
            <hr />
            <p>
              {{ $t("services_nav.text_2") }}
            </p>
            <hr />
            <p>
              {{ $t("services_nav.text_3") }}
            </p>
            <hr />
            <p>
              {{ $t("services_nav.text_4") }}
            </p>
            <hr />
            <p>
              {{ $t("services_nav.text_5") }}
            </p>
            <hr />
            <p>
              {{ $t("services_nav.text_6") }}
            </p>
          </div>
        </div>
      </div>
      <hr />

      <div
        :class="`row ${this.nav_section.accounting_active} flex-row`"
        @click="navActivate('accounting_active')"
      >
        <div class="title flex-row">
          <span v-html="$t('calculation_supervision_nav.title')"></span>

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
        </div>

        <div class="content flex-row">
          <img src="@/assets/images/accounting_main.jpg" alt="" />
          <div class="text_block flex-column">
            <p>
              {{ $t("calculation_supervision_nav.text_1") }}
            </p>
            <hr />
            <p>
              {{ $t("calculation_supervision_nav.text_2") }}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav_section: {
        permissions_active: "",
        services_active: "",
        accounting_active: "",
      },
    };
  },
  methods: {
    navActivate(element) {
      if (this.nav_section[element] !== "active") {
        Object.keys(this.nav_section).forEach((element) => {
          this.nav_section[element] = "";
        });
        this.nav_section[element] = "active";
      } else this.nav_section[element] = "";
    },
  },
};
</script>
