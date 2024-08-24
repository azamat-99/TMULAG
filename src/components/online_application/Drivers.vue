<template>
  <div class="history_container container_box_shadow">
    <div class="inner_wrapper">
      <div class="epermite_head">
        <h2 class="title">Дозвол. Водители</h2>
        <span
          class="createEPermit"
          @click="this.$props.changeTab(this.$props.tabs.legalDriverCreate)"
          v-if="thisIsLegal === '1'"
        >
          Добавить Водителя
        </span>

        <span
          class="createEPermit"
          @click="
            this.$props.changeTab(this.$props.tabs.individualDriversCreate)
          "
          v-else
        >
          Добавить Водителя
        </span>
      </div>
      <div class="table_block">
        <div class="header_row flex-row">
          <span class="w15">Имя</span>
          <span class="w15">Фамилия</span>
          <span class="w15">Отчество</span>
          <span class="w25">Номер водительского удостоверения</span>
          <span class="w1"></span>
        </div>

        <div
          class="content_row flex-row"
          v-for="driver in this.drivers"
          :key="driver.id"
        >
          <span class="w15">{{ driver.name }}</span>
          <span class="w15">{{ driver.surname }}</span>
          <span class="w15">{{ driver.patronymic }}</span>
          <span class="w25">{{ driver.driving_license_number }}</span>
          <span class="w10 butt">
            <img
              src="@/assets/icons/edit-2.svg"
              @click="routeToEditPage(driver.id)"
            />
          </span>
          <span class="w10 butt">
            <img
              src="@/assets/icons/delete.svg"
              @click="deleteDriver(driver.id)"
            />
          </span>
          <span class="w1"></span>
        </div>
      </div>
    </div>
  </div>
  <PopupWindow
    v-if="this.$store.state.popupShow"
    :title="popupText.current.title"
    :message="popupText.current.message"
    :buttonText="popupText.current.buttonText"
  />
</template>

<script>
import PopupWindow from "@/components/online_application/PopupWindow.vue";

export default {
  components: {
    PopupWindow,
  },

  props: {
    currentTab: "",
    changeTab: "",
    tabs: {},
  },

  data() {
    return {
      thisIsLegal: this.$props.currentTab.includes("legal") ? "1" : "0",

      drivers: [],

      popupText: {
        success: {
          title: "history_tab.success.title",
          message: "history_tab.success.message",
          buttonText: "history_tab.success.buttonText",
        },
        failure: {
          title: "history_tab.failure.title",
          message: "history_tab.failure.message",
          buttonText: "history_tab.failure.buttonText",
        },
        current: {
          title: "",
          message: "",
          buttonText: "",
        },
      },
    };
  },

  mounted() {
    this.getDrivers();
  },

  methods: {
    getDrivers() {
      this.$store.state.popupShow = false;
      this.$store.state.preLoader = true;

      window.axios
        .get(`${this.$store.state.backendRoutes.drivers}/${this.thisIsLegal}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.drivers = res.data.data.drivers;
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    deleteDriver(id) {
      this.$store.state.preLoader = true;

      window.axios
        .delete(`${this.$store.state.backendRoutes.driverDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          if (res.data.status) {
            this.popupText.current = this.popupText.success;
          }
          this.$store.state.popupShow = true;
          this.getDrivers();
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    routeToEditPage(id) {
      if (this.thisIsLegal === "1") {
        this.$props.changeTab(this.$props.tabs.legalDriverEdit);
      } else {
        this.$props.changeTab(this.$props.tabs.individualDriversEdit);
      }

      this.$store.state.idEditDriver = `${id}`;
    },
  },
};
</script>
