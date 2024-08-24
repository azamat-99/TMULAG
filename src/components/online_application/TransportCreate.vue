<template>
  <form
    class="load_perm_container container_box_shadow flex-column"
    @submit.prevent="thisIsEdit === '1' ? transportUpdate() : transportCreate()"
  >
    <h2 class="title">Дозвол. Добавления Машины</h2>
    <div class="form_block flex-row">
      <!-- left_side -->
      <div class="left_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for="">Марка машины </label>
          <div :class="`input_wrapper `">
            <select v-model="transport.brand_id" required>
              <option value="" disabled selected>Выберите опцию</option>
              <option v-for="el in brands" :value="el.id" :key="el.id">
                {{ el.title }}
              </option>
            </select>
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Номер машины </label>
          <div :class="`input_wrapper`">
            <input
              class="form_box_shadow"
              v-model="transport.plate_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Номер карточки </label>
          <div :class="`input_wrapper`">
            <input
              class="form_box_shadow"
              v-model="transport.card_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Дата выдачи карточки </label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="transport.card_start_date"
              type="date"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Выберите водителя </label>
          <div :class="`input_wrapper `">
            <select v-model="transport.driver_id">
              <option value="" disabled selected>Выберите опцию</option>
              <option v-for="el in drivers" :value="el.id" :key="el.id">
                {{ el.name }} {{ el.surname }}
              </option>
            </select>
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
      thisIsCar: this.$props.currentTab.includes("Car") ? "1" : "0",
      thisIsEdit: this.$props.currentTab.includes("Edit") ? "1" : "0",

      transport: {},
      drivers: [],
      brands: [],

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
    this.$store.state.popupShow = false;
    this.$store.state.preLoader = true;

    window.axios
      .get(
        `${this.$store.state.backendRoutes.transportStaticData}/${this.thisIsLegal}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        }
      )
      .then((res) => {
        this.drivers = res.data.drivers;
        this.brands = res.data.brands;

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
      window.axios
        .get(
          `${this.$store.state.backendRoutes.singletransport}/${this.$store.state.idEditTransport}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.transport = res.data;
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    }
  },

  methods: {
    transportCreate() {
      this.$store.state.preLoader = true;

      let data = {
        ...this.transport,
        is_transport: this.thisIsCar,
        is_legal: this.thisIsLegal,
      };

      axios
        .post(this.$store.state.backendRoutes.transportCreate, data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          if (res.data.status) {
            if (this.thisIsLegal === "1") {
              if (this.thisIsCar === "1") {
                this.$props.changeTab(this.$props.tabs.legalCars);
              } else {
                this.$props.changeTab(this.$props.tabs.legalTrailers);
              }
            } else {
              if (this.thisIsCar === "1") {
                this.$props.changeTab(this.$props.tabs.individualCars);
              } else {
                this.$props.changeTab(this.$props.tabs.individualTrailers);
              }
            }
          }
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    transportUpdate() {
      this.$store.state.preLoader = true;

      axios
        .put(
          `${this.$store.state.backendRoutes.transportEdit}/${this.$store.state.idEditTransport}`,
          this.transport,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            if (this.thisIsLegal === "1") {
              if (this.thisIsCar === "1") {
                this.$props.changeTab(this.$props.tabs.legalCars);
              } else {
                this.$props.changeTab(this.$props.tabs.legalTrailers);
              }
            } else {
              if (this.thisIsCar === "1") {
                this.$props.changeTab(this.$props.tabs.individualCars);
              } else {
                this.$props.changeTab(this.$props.tabs.individualTrailers);
              }
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
