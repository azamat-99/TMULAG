<template>
  <form
    @submit.prevent="individualDataUpdate"
    class="load_perm_container container_box_shadow flex-column"
  >
    <h2 class="title">Личный кабинет - Дозвол. Физическое лицо</h2>
    <div class="form_block flex-row">
      <!-- left_side -->
      <div class="left_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for="">Фамилия</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.surname"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Имя</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.name"
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
              v-model="profile.patronymic"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Телефон</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.phone"
              type="text"
              id="phone"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">е-мейл</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.email"
              type="email"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Патент</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              type="file"
              ref="patent_file"
              required
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('patent')"
              v-if="profile.length === 0"
            />

            <input
              class="form_box_shadow"
              type="file"
              ref="patent_file"
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('patent')"
              v-if="profile.length != 0"
            />
          </div>
        </div>

        <!--  -->
      </div>

      <!-- right_side -->
      <div class="right_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for="">Номер лицензии</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.license_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Коды лицензии </label>
          <div :class="`input_wrapper`">
            <multiselect
              v-model="profile.license_types"
              :options="license_types"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Выберите Коды лицензии"
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
          <label for="">Выберите велаят: </label>
          <div :class="`input_wrapper `">
            <select
              v-model="profile.region"
              @change="handleRegionChange"
              required
            >
              <option value="" disabled selected>Выберите опцию</option>
              <option
                v-for="region in regions"
                :value="region.id"
                :key="region.id"
              >
                {{ region.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Выберите город: </label>
          <div :class="`input_wrapper `">
            <select v-model="profile.city" required>
              <option value="" disabled selected>Выберите опцию</option>
              <option v-for="city in cities" :value="city.id" :key="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Дата окончания лицензии </label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.license_expire_date"
              type="date"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Номер патента</label>
          <div :class="`input_wrapper`">
            <input
              class="form_box_shadow"
              v-model="profile.patent_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Дата окончания патента</label>
          <div :class="`input_wrapper`">
            <input
              class="form_box_shadow"
              v-model="profile.patent_expire_date"
              type="date"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Лицензия</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              type="file"
              ref="license_file"
              required
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('license')"
              v-if="profile.length === 0"
            />

            <input
              class="form_box_shadow"
              type="file"
              ref="license_file"
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('license')"
              v-if="profile.length != 0"
            />
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
  />
</template>

<script>
import PopupWindow from "@/components/online_application/PopupWindow.vue";
import Inputmask from "inputmask";
import Multiselect from "vue-multiselect";
import MultiselectCSS from "/public/vue-multiselect.css";

export default {
  components: { Multiselect, MultiselectCSS, PopupWindow },

  data() {
    return {
      profile: [],
      license_types: [],
      regions: [],
      cities: [],
      files: [],

      popupText: {
        success: {
          title: "profile_tab.success.title",
          message: "profile_tab.success.message",
          buttonText: "profile_tab.success.buttonText",
        },
        failure: {
          title: "profile_tab.failure.title",
          message: "profile_tab.failure.message",
          buttonText: "profile_tab.failure.buttonText",
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
    this.$store.state.popupShow = false;

    var selector = document.getElementById("phone");

    var im = new Inputmask("+\\9\\93 99999999");
    im.mask(selector);

    window.axios
      .get(this.$store.state.backendRoutes.clientStaticData, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.license_types = res.data.licenses;
        this.regions = res.data.regions;
      })
      .catch(this.$store.state.axiosCatch)
      .finally(() => {
        this.$store.state.preLoader = false;
      });

    window.axios
      .get(this.$store.state.backendRoutes.individualClient, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.profile = res.data;
      })
      .catch(this.$store.state.axiosCatch)
      .finally(() => {
        this.$store.state.preLoader = false;

        if (this.profile.length != 0) {
          let i = this.regions.findIndex((el) => el.id == this.profile.region);
          let selectedRegions = this.regions[i];
          this.cities = selectedRegions.cities;
        }
      });
  },

  methods: {
    individualDataUpdate() {
      this.$store.state.preLoader = true;

      let formData = new FormData();
      formData.append("city_id", this.profile.city);
      formData.append("name", this.profile.name);
      formData.append("surname", this.profile.surname);
      formData.append("patronymic", this.profile.patronymic);
      formData.append("phone", this.profile.phone);
      formData.append("email", this.profile.email);
      formData.append("license_number", this.profile.license_number);
      formData.append("patent_number", this.profile.patent_number);
      formData.append("patent_expire_date", this.profile.patent_expire_date);
      formData.append("license_expire_date", this.profile.license_expire_date);

      for (let i = 0; i < this.profile.license_types.length; i++) {
        formData.append(
          `license_types[${i}]`,
          this.profile.license_types[i].id
        );
      }

      for (let i = 0; i < this.files.length; i++) {
        formData.append(`types[${i}]`, this.files[i].type);
      }

      for (let i = 0; i < this.files.length; i++) {
        formData.append(`file[${i}]`, this.files[i].file);
      }

      axios
        .post(
          this.$store.state.backendRoutes.individualClientCreate,
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            this.popupText.current = this.popupText.success;
          }

          this.$store.state.popupShow = true;
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },

    handleRegionChange(e) {
      if (e.target.options.selectedIndex > -1) {
        let i = e.target.options.selectedIndex - 1;
        let selectedRegions = this.regions[i];

        this.cities = selectedRegions.cities;
      }
    },

    handleFileUpload(type) {
      if (type === "patent") {
        this.files.push({
          type: "0",
          file: this.$refs.patent_file.files[0],
        });
      } else if (type === "license") {
        this.files.push({
          type: "1",
          file: this.$refs.license_file.files[0],
        });
      }
    },
  },
};
</script>
