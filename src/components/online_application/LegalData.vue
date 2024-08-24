<template>
  <form
    @submit.prevent="legalDataUpdate"
    class="load_perm_container container_box_shadow flex-column"
    style="height: 850px"
  >
    <h2 class="title">Личный кабинет - Дозвол. Юридическое лицо</h2>
    <div class="form_block flex-row">
      <!-- left_side -->
      <div class="left_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for="">Название организации</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.company_name"
              type="text"
              required
            />
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

      <!-- right_side -->
      <div class="right_side">
        <!-- Input -->
        <div class="label_input_block">
          <label for=""
            >Номер ЕГРПО (TÝŞÝDSG (EГРПО) tamamlanýan möhleti)</label
          >
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.yegrpo_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for=""
            >Дата окончания ЕГРПО (TÝŞÝDSG (EГРПО) tamamlanýan möhleti)</label
          >
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.yegrpo_expire_date"
              type="date"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Номер Сертификата (Bellige alyş nomeri)</label>
          <div :class="`input_wrapper`">
            <input
              class="form_box_shadow"
              v-model="profile.certificate_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Юридический адрес </label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.address"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Банк (Bank maglumatlary)</label>
          <div :class="`input_wrapper`">
            <input
              class="form_box_shadow"
              v-model="profile.bank_details"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Номер расчетного счета (H/h)</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              v-model="profile.account_number"
              type="text"
              required
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">ЕГРПО (TÝŞÝDSG EГРПО)</label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              type="file"
              ref="egrpo_file"
              required
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('egrpo')"
              v-if="profile.length === 0"
            />

            <input
              class="form_box_shadow"
              type="file"
              ref="egrpo_file"
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('egrpo')"
              v-if="profile.length != 0"
            />
          </div>
        </div>

        <!-- Input -->
        <div class="label_input_block">
          <label for="">Сертификат </label>
          <div :class="`input_wrapper `">
            <input
              class="form_box_shadow"
              type="file"
              ref="certificate_file"
              required
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('certificate')"
              v-if="profile.length === 0"
            />

            <input
              class="form_box_shadow"
              type="file"
              ref="certificate_file"
              id="file_3"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload('certificate')"
              v-if="profile.length != 0"
            />
          </div>
        </div>
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
      .get(this.$store.state.backendRoutes.legalClient, {
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
    legalDataUpdate() {
      this.$store.state.preLoader = true;

      let formData = new FormData();
      formData.append("city_id", this.profile.city);
      formData.append("company_name", this.profile.company_name);
      formData.append("phone", this.profile.phone);
      formData.append("email", this.profile.email);
      formData.append("address", this.profile.address);
      formData.append("yegrpo_number", this.profile.yegrpo_number);
      formData.append("yegrpo_expire_date", this.profile.yegrpo_expire_date);
      formData.append("certificate_number", this.profile.certificate_number);
      formData.append("bank_details", this.profile.bank_details);
      formData.append("account_number", this.profile.account_number);
      formData.append("license_number", this.profile.license_number);
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
        .post(this.$store.state.backendRoutes.legalClientCreate, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
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
      if (type === "license") {
        this.files.push({
          type: "1",
          file: this.$refs.license_file.files[0],
        });
      } else if (type === "certificate") {
        this.files.push({
          type: "2",
          file: this.$refs.certificate_file.files[0],
        });
      } else if (type === "egrpo") {
        this.files.push({
          type: "3",
          file: this.$refs.egrpo_file.files[0],
        });
      }
    },
  },
};
</script>
