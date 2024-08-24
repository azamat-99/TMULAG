<template>
  <form
    @submit.prevent="thisIsEdit === '1' ? DriverUpdate() : DriverCreate()"
    class="load_perm_container container_box_shadow flex-column"
  >
    <h2 class="title">Дозвол. Добавления Водителя</h2>
    <div class="form_block flex-row">
      <!-- left_side -->
      <div class="left_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for="">Имя</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="driver.name"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Фамилия</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="driver.surname"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Отчество</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="driver.patronymic"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Номер водительского удостоверения</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="driver.driving_license_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Категория водительского удостоверения</label>
          <div :class="`input_wrapper `">
            <multiselect
              v-model="selected_drive_license"
              :options="driving_license_categories"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Выберите Категорию водительского удостоверения"
              label="name"
              track-by="id"
              :preselect-first="true"
            >
              <template #selection="{ values, isOpen }">
                <span
                  class="multiselect__single"
                  v-if="values.length"
                  v-show="!isOpen"
                  >{{ values.length }} выбрано
                </span>
              </template>
            </multiselect>
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Дата окончания водительского удостоверения</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="driver.driving_license_expired_date"
              type="date"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Транспорты</label>
          <div :class="`input_wrapper `">
            <multiselect
              v-model="selected_transports"
              :options="transports"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Транспорты"
              label="number"
              track-by="id"
              :preselect-first="true"
            >
              <template #selection="{ values, isOpen }">
                <span
                  class="multiselect__single"
                  v-if="values.length"
                  v-show="!isOpen"
                  >{{ values.number }} выбрано
                </span>
              </template>
            </multiselect>
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Прицепы</label>
          <div :class="`input_wrapper `">
            <multiselect
              v-model="selected_trailers"
              :options="trailers"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Прицепы"
              label="number"
              track-by="id"
              :preselect-first="true"
            >
              <template #selection="{ values, isOpen }">
                <span
                  class="multiselect__single"
                  v-if="values.length"
                  v-show="!isOpen"
                  >{{ values.number }} выбрано
                </span>
              </template>
            </multiselect>
          </div>
        </div>

        <!--  -->
      </div>
    </div>
    <div class="submit_button_box flex-row">
      <button class="submit_button" type="submit">
        {{ $t("load_permission_tab.save_button") }}
      </button>
    </div>
  </form>
  <PopupWindow
    v-if="this.$store.state.popupShow"
    :title="popupText.current.title"
    :message="popupText.current.message"
    :buttonText="popupText.current.buttonText"
    :redirectTabName="thisIsLegal == '1' ? 'legalData' : 'individualDataTab'"
  />
</template>

<script>
import PopupWindow from "@/components/online_application/PopupWindow.vue";
import Multiselect from "vue-multiselect";
import MultiselectCSS from "/public/vue-multiselect.css";

export default {
  components: { Multiselect, MultiselectCSS, PopupWindow },

  props: {
    currentTab: "",
    changeTab: "",
    tabs: {},
  },

  data() {
    return {
      thisIsLegal: this.$props.currentTab.includes("legal") ? "1" : "0",
      thisIsEdit: this.$props.currentTab.includes("Edit") ? "1" : "0",

      driver: {},
      driving_license_categories: [],
      transports: [],
      trailers: [],

      selected_drive_license: [],
      selected_transports: [],
      selected_trailers: [],

      popupText: {
        success: {
          title: "Нет данных",
          message: "Заполните данные",
          buttonText: "Перейти",
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
    this.$store.state.preLoader = true;

    window.axios
      .get(
        `${this.$store.state.backendRoutes.driverStaticData}/${this.thisIsLegal}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        }
      )
      .then((res) => {
        this.driving_license_categories = res.data.driving_license_categories;
        this.transports = res.data.transports;
        this.trailers = res.data.trailers;

        if (!res.data.client) {
          this.popupText.current = this.popupText.success;
          this.$store.state.popupShow = true;
        }
      })
      .catch(this.$store.state.axiosCatch)
      .finally(() => {
        this.$store.state.preLoader = false;
      });

    if (this.thisIsEdit === "1") {
      this.$store.state.preLoader = true;

      window.axios
        .get(
          `${this.$store.state.backendRoutes.singleDriver}/${this.$store.state.idEditDriver}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.driver = res.data.driver;
          this.selected_drive_license = res.data.driver.drivingCategoris;

          for (let i = 0; i < this.transports.length; i++) {
            if (this.transports[i].id === res.data.driver.transports[i]) {
              this.selected_transports.push(this.transports[i]);
            }
          }

          for (let i = 0; i < this.trailers.length; i++) {
            if (this.trailers[i].id === res.data.driver.trailers[i]) {
              this.selected_trailers.push(this.trailers[i]);
            }
          }
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    }
  },

  methods: {
    DriverCreate() {
      this.$store.state.preLoader = true;

      let transports = [];

      for (let i = 0; i < this.selected_transports.length; i++) {
        transports.push(this.selected_transports[i].id);
      }

      for (let i = 0; i < this.selected_trailers.length; i++) {
        transports.push(this.selected_trailers[i].id);
      }

      let selected_drive_license_id = [];

      for (let i = 0; i < this.selected_drive_license.length; i++) {
        selected_drive_license_id.push(this.selected_drive_license[i].id);
      }

      let data = {
        ...this.driver,
        is_legal: this.thisIsLegal,
        driving_licence_categories: selected_drive_license_id,
        transports: transports,
      };

      axios
        .post(this.$store.state.backendRoutes.driverCreate, data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          if (res.data.status) {
            if (this.thisIsLegal === "1") {
              this.$props.changeTab(this.$props.tabs.legalDrivers);
            } else {
              this.$props.changeTab(this.$props.tabs.individualDrivers);
            }
          }
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    DriverUpdate() {
      this.$store.state.preLoader = true;

      let transports = [];

      for (let i = 0; i < this.selected_transports.length; i++) {
        transports.push(this.selected_transports[i].id);
      }

      for (let i = 0; i < this.selected_trailers.length; i++) {
        transports.push(this.selected_trailers[i].id);
      }

      let selected_drive_license_id = [];

      for (let i = 0; i < this.selected_drive_license.length; i++) {
        selected_drive_license_id.push(this.selected_drive_license[i].id);
      }

      let data = {
        ...this.driver,
        is_legal: this.thisIsLegal,
        driving_licence_categories: selected_drive_license_id,
        transports: transports,
      };

      axios
        .put(
          `${this.$store.state.backendRoutes.driverEdit}/${this.$store.state.idEditDriver}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            if (this.thisIsLegal === "1") {
              this.$props.changeTab(this.$props.tabs.legalDrivers);
            } else {
              this.$props.changeTab(this.$props.tabs.individualDrivers);
            }
          }
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },
  },
};
</script>
