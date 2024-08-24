<template>
  <div class="history_container container_box_shadow">
    <div class="inner_wrapper">
      <h2 class="title">{{ $t("history_tab.title") }}</h2>
      <div class="table_block">
        <div class="header_row flex-row">
          <span>{{ $t("history_tab.permission_number") }}</span>
          <span>{{ $t("history_tab.date") }}</span>
          <span>CMR №</span>
          <span>{{ $t("history_tab.driver_name") }}</span>
          <span>{{ $t("history_tab.type") }}</span>
          <span>{{ $t("history_tab.status") }}</span>
          <span>{{ $t("history_tab.cancel") }}</span>
        </div>

        <div
          class="content_row flex-row"
          v-for="item in this.payload"
          :key="`${item.model_id}_${item.id}`"
        >
          <span>{{ item.razresheniye_no ?? item.permission_number }}</span>
          <span>{{ formatDate(item.created_at) }}</span>
          <span>{{ item.cmr_no ?? item.cmr_number }}</span>
          <span>{{ item.woditel_fio }}</span>
          <span>{{
            $t(`online_application_navbar.${models_list[item.model_id]}`)
          }}</span>
          <span :class="status_list[item.status_id ?? item.status]">{{
            $t(`history_tab.${status_list[item.status_id ?? item.status]}`)
          }}</span>

          <span
            :class="
              ((item.status_id ?? item.status) == 3
                ? status_list[item.status_id ?? item.status]
                : '') + ' cancel_button'
            "
            @click="cancelRequest(item.model_id, item.id)"
          >
            {{
              $t(
                `history_tab.${
                  (item.status_id ?? item.status) == 3
                    ? status_list[item.status_id ?? item.status]
                    : "cancel"
                }`
              )
            }}
          </span>
        </div>
      </div>
    </div>

    <div class="pagination_row flex-row">
      <span @click="updatePagination(this.prev_page)" class="pagination_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </span>

      <div class="pages_block flex-row">
        <span
          :class="`pagination_button ${
            currentPage == element ? 'router-link-active' : ''
          }`"
          v-for="element in this.paginationArray"
          @click="updatePagination(element)"
          :key="element"
        >
          <span>{{ element }}</span>
        </span>
      </div>

      <span @click="updatePagination(this.next_page)" class="pagination_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </span>
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
import moment from "moment";

export default {
  data() {
    return {
      status_list: ["pending", "accepted", "declined", "canceled"],
      models_list: [
        "",
        "online_application_tab",
        "load_permission_tab",
        "unload_permission_tab",
      ],
      payload: [],
      pagesCount: 1,
      currentPage: 1,
      paginationArray: [],
      backendRoutes: this.$store.state.backendRoutes,
      items_per_page: 16,
      prev_page: this.currentPage > 1 ? this.currentPage - 1 : this.currentPage,
      next_page:
        this.currentPage < this.pagesCount
          ? parseInt(this.currentPage) + 1
          : this.currentPage,

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
  async mounted() {
    this.$store.state.popupShow = false;
    this.$store.state.preLoader = true;

    await window.axios
      .get(
        `${this.$store.state.backendRoutes.historyTab}/${this.currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        }
      )
      .then((res) => {
        this.payload = res.data.payload;
        this.pagesCount = Math.ceil(
          parseInt(res.data.history_length) / this.items_per_page
        );
      })
      .catch(this.$store.state.axiosCatch)
      .finally(() => {
        this.$store.state.preLoader = false;
      });

    (this.prev_page =
      this.currentPage > 1 ? this.currentPage - 1 : this.currentPage),
      (this.next_page =
        this.currentPage < this.pagesCount
          ? parseInt(this.currentPage) + 1
          : this.currentPage);
    this.paginationArray = await this.$store.dispatch("paginate", {
      currentPage: this.currentPage,
      pagesTotal: this.pagesCount,
    });
  },
  methods: {
    async updatePagination(currentPage) {
      this.$store.state.preLoader = true;

      this.prev_page = currentPage > 1 ? currentPage - 1 : currentPage;
      this.next_page =
        currentPage < this.pagesCount ? parseInt(currentPage) + 1 : currentPage;

      window.axios
        .get(`${this.$store.state.backendRoutes.historyTab}/${currentPage}`)
        .then((res) => {
          this.payload = res.data.payload;
          this.pagesCount = Math.ceil(
            parseInt(res.data.history_length) / this.items_per_page
          );
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });

      this.paginationArray = await this.$store.dispatch("paginate", {
        currentPage: currentPage,
        pagesTotal: this.pagesCount,
      });
    },

    cancelRequest(model_id, item_id) {
      this.$store.state.preLoader = true;

      window.axios
        .post(`${this.$store.state.backendRoutes.historyTab}-cancel`, {
          model_id: model_id,
          item_id: item_id,
        })
        .then((res) => {
          if (res.data.status == "success") {
            this.popupText.current = this.popupText.success;
          } else if (res.data.status == "failure") {
            this.popupText.current = this.popupText.failure;
          }
          this.$store.state.popupShow = true;
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },
    formatDate(dateStr) {
      return moment(dateStr).format("DD.MM.YYYY");
    },
  },
  components: {
    PopupWindow,
  },
};
</script>
