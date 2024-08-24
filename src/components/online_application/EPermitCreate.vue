<template>
  <form
    class="load_perm_container container_box_shadow flex-column"
    style="display: flex; justify-content: flex-start; height: 1100px"
    @submit.prevent="ePermiteSend()"
  >
    <h2 class="title" style="margin: 0px 0px 50px 0px">
      Заявка на Дозвол (E-permit)
    </h2>

    <div class="ePermitClientType" v-if="!isLoadStaticData">
      <span @click="getStaticData(false)">Физическое лицо</span>
      <span @click="getStaticData(true)">Юридическое лицо</span>
    </div>

    <div class="form_block flex-row" v-if="isLoadStaticData">
      <!-- left_side -->
      <div class="left_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for="">Выберите страну назначения </label>
          <div :class="`input_wrapper `">
            <select v-model="main.country" required>
              <option value="" disabled selected>Выберите опцию</option>
              <option v-for="el in countries" :value="el" :key="el">
                {{ el }}
              </option>
            </select>
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Тип груза</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="main.type_of_cargo"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Количество контейнеров</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="main.container_number"
              type="number"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Дата отъезда</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="main.departure_date"
              type="date"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Дата возвращения</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="main.return_date"
              type="date"
              required
            />
          </div>
        </div>

        <!-- ================== -->
      </div>

      <!-- right_side -->
      <div class="right_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for="">Выберите водителя </label>
          <div :class="`input_wrapper `">
            <select @change="handleDriverChange" required>
              <option value="" disabled selected>Выберите опцию</option>
              <option v-for="el in drivers" :value="el.id" :key="el.id">
                {{ el.name }} {{ el.surname }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="Object.keys(driverData).length != 0">
          <!-- Input -->
          <div class="label_input_block">
            <label for="">Имя</label>
            <div :class="`input_wrapper `">
              <input
                class="form_box_shadow"
                v-model="driverData.name"
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
                v-model="driverData.surname"
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
                v-model="driverData.patronymic"
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
                v-model="driverData.driving_license_number"
                type="text"
                required
              />
            </div>
          </div>

          <!-- Input -->
          <div class="label_input_block">
            <label for="">Дата окончания водительского удостоверения</label>
            <div :class="`input_wrapper `">
              <input
                class="form_box_shadow"
                v-model="driverData.driving_license_expired_date"
                type="date"
                required
              />
            </div>
          </div>

          <!-- Input -->
          <div class="label_input_block">
            <label for="">Категория водительского удостоверения</label>
            <div :class="`input_wrapper `">
              <multiselect
                v-model="driverData.driving_licence_categories"
                :options="driving_licence_categories"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Выберите Категорию водительского удостоверения"
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
        </div>
        <!-- ================== -->
      </div>
    </div>

    <div class="form_block flex-row" v-if="Object.keys(driverData).length != 0">
      <!-- left_side -->
      <div class="left_side">
        <h2
          class="title"
          style="margin: 30px 0px 0px 0px"
          v-if="Object.keys(driverData).length != 0"
        >
          Машина
        </h2>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Выберите машину</label>
          <div :class="`input_wrapper `">
            <select v-model="selectedCar" required>
              <option value="" disabled selected>Выберите опцию</option>
              <option v-for="el in transports" :value="el" :key="el.id">
                {{ el.plate_number }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="Object.keys(selectedCar).length != 0">
          <!-- Input -->
          <div class="label_input_block">
            <label for="">Марка машины </label>
            <div :class="`input_wrapper `">
              <select v-model="selectedCar.brand" required>
                <option value="" disabled selected>Выберите опцию</option>
                <option v-for="el in brands" :value="el" :key="el">
                  {{ el }}
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
                v-model="selectedCar.plate_number"
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
                v-model="selectedCar.card_number"
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
                v-model="selectedCar.card_start_date"
                type="date"
                required
              />
            </div>
          </div>
        </div>
        <!-- ================== -->
      </div>

      <!-- right_side -->
      <div class="right_side">
        <h2
          class="title"
          style="margin: 30px 0px 0px 0px"
          v-if="Object.keys(driverData).length != 0"
        >
          Прицеп
        </h2>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Выберите прицеп</label>
          <div :class="`input_wrapper `">
            <select v-model="selectedTrailer">
              <option value="" disabled selected>Выберите опцию</option>
              <option v-for="el in trailers" :value="el" :key="el.id">
                {{ el.plate_number }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="Object.keys(selectedTrailer).length != 0">
          <!-- Input -->
          <div class="label_input_block">
            <label for="">Марка прицепа</label>
            <div :class="`input_wrapper `">
              <select v-model="selectedTrailer.brand" required>
                <option value="" disabled selected>Выберите опцию</option>
                <option v-for="el in brands" :value="el" :key="el">
                  {{ el }}
                </option>
              </select>
            </div>
          </div>

          <!-- Input -->
          <div class="label_input_block">
            <label for="">Номер прицепа </label>
            <div :class="`input_wrapper`">
              <input
                class="form_box_shadow"
                v-model="selectedTrailer.plate_number"
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
                v-model="selectedTrailer.card_number"
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
                v-model="selectedTrailer.card_start_date"
                type="date"
                required
              />
            </div>
          </div>
        </div>
        <!-- ================== -->
      </div>
    </div>

    <div
      class="submit_button_box flex-row"
      v-if="isLoadStaticData"
      style="margin: 30px 0px 0px 0px !important"
    >
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
    :redirectTabName="isLegal == '1' ? 'legalData' : 'individualDataTab'"
  />
</template>

<script>
import PopupWindow from "@/components/online_application/PopupWindow.vue";
import Multiselect from "vue-multiselect";
import MultiselectCSS from "/public/vue-multiselect.css";

export default {
  components: { Multiselect, MultiselectCSS, PopupWindow },

  props: {
    changeTab: "",
    tabs: {},
  },

  data() {
    return {
      isLegal: "",
      isLoadStaticData: false,

      main: {},
      client: {},
      drivers: [],
      countries: [],
      driving_licence_categories: [],
      brands: [],

      driverData: {},
      transports: [],
      trailers: [],

      selectedCar: {},
      selectedTrailer: {},

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

  methods: {
    getStaticData(isLegal) {
      this.isLegal = isLegal ? "1" : "0";
      this.$store.state.preLoader = true;

      window.axios
        .get(
          `${this.$store.state.backendRoutes.ePermitStaticData}/${this.isLegal}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          this.client = res.data.client;
          this.drivers = res.data.drivers;
          this.countries = res.data.countries;
          this.driving_licence_categories = res.data.driving_licence_categories;
          this.brands = res.data.brands;

          if (res.data.client.length === 0) {
            this.popupText.current = this.popupText.success;
            this.$store.state.popupShow = true;
          }
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
          this.isLoadStaticData = true;
        });
    },

    handleDriverChange(e) {
      if (e.target.options.selectedIndex > -1) {
        let i = e.target.options.selectedIndex - 1;

        this.getDriverData(this.drivers[i].id);
      }
    },

    getDriverData(id) {
      this.$store.state.preLoader = true;

      window.axios
        .get(`${this.$store.state.backendRoutes.ePermitTransportData}/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.driverData = res.data.driver;
          this.transports = res.data.transports;
          this.trailers = res.data.trailers;
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    ePermiteSend() {
      this.$store.state.preLoader = true;

      let transportsList = [];

      let selectedCar = {
        ...this.selectedCar,
        is_transport: "1",
      };

      let selectedTrailer = {
        ...this.selectedTrailer,
        is_transport: "0",
      };

      transportsList.push(selectedCar);

      if (Object.keys(this.selectedTrailer).length != 0) {
        transportsList.push(selectedTrailer);
      }

      let data = {
        ...this.main,
        is_legal: this.isLegal,
        client: this.client,
        driver: this.driverData,
        transports: transportsList,
      };

      axios
        .post(this.$store.state.backendRoutes.ePermitSend, data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          if (res.data.status) {
            this.$props.changeTab(this.$props.tabs.ePermitHistory);
          }
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });

      console.log(data);
    },
  },
};
</script>
