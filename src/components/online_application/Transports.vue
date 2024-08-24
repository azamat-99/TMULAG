<template>
  <div class="history_container container_box_shadow">
    <div class="inner_wrapper">
      <div class="epermite_head">
        <h2 class="title" v-if="thisIsCar === '1'">Дозвол. Машины</h2>
        <h2 class="title" v-else>Дозвол. Прицепы</h2>
        <span
          class="createEPermit"
          @click="
            this.$props.changeTab(
              thisIsLegal === '1'
                ? this.$props.tabs.legalCarCreate
                : this.$props.tabs.individualCarCreate
            )
          "
          v-if="thisIsCar === '1'"
        >
          Добавить Машину
        </span>

        <span
          class="createEPermit"
          @click="
            this.$props.changeTab(
              thisIsLegal === '1'
                ? this.$props.tabs.legalTrailerCreate
                : this.$props.tabs.individualTrailerCreate
            )
          "
          v-else
        >
          Добавить Прицеп
        </span>
      </div>
      <div class="table_block">
        <div class="header_row flex-row">
          <span class="w30" v-if="thisIsCar === '1'">Марка машины </span>
          <span class="w30" v-else>Марка прицепа </span>
          <span class="w30" v-if="thisIsCar === '1'">Номер машины </span>
          <span class="w30" v-else>Номер прицепа </span>
        </div>

        <div
          class="content_row flex-row"
          v-for="transport in this.transports"
          :key="transport.id"
        >
          <span class="w30">{{ transport.brand }} </span>
          <span class="w30">{{ transport.plateNumber }} </span>
          <span class="w10"></span>
          <span class="w10 butt">
            <img
              src="@/assets/icons/edit-2.svg"
              @click="routeToEditPage(transport.id)"
            />
          </span>
          <span class="w10 butt">
            <img
              src="@/assets/icons/delete.svg"
              @click="deleteTransport(transport.id)"
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
      transports: [],

      thisIsLegal: this.$props.currentTab.includes("legal") ? "1" : "0",
      thisIsCar: this.$props.currentTab.includes("Cars") ? "1" : "0",

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
    this.getTransport();
  },

  methods: {
    getTransport() {
      this.$store.state.popupShow = false;
      this.$store.state.preLoader = true;

      window.axios
        .get(
          `${this.$store.state.backendRoutes.transports}/${this.thisIsLegal}/${this.thisIsCar}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.transports = res.data.data.transports;
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    deleteTransport(id) {
      this.$store.state.preLoader = true;

      window.axios
        .delete(`${this.$store.state.backendRoutes.transportDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          if (res.data.status) {
            this.popupText.current = this.popupText.success;
          }
          this.$store.state.popupShow = true;
          this.getTransport();
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    routeToEditPage(id) {
      if (this.thisIsLegal === "1") {
        if (this.thisIsCar === "1") {
          this.$props.changeTab(this.$props.tabs.legalCarEdit);
        } else {
          this.$props.changeTab(this.$props.tabs.legalTrailerEdit);
        }
      } else {
        if (this.thisIsCar === "1") {
          this.$props.changeTab(this.$props.tabs.individualCarEdit);
        } else {
          this.$props.changeTab(this.$props.tabs.individualTrailerEdit);
        }
      }

      this.$store.state.idEditTransport = `${id}`;
    },
  },
};
</script>
