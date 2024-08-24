<template>
  <form
    @submit.prevent="payloadSubmit"
    class="load_perm_container container_box_shadow flex-column"
  >
    <h2 class="title" v-html="$t('load_permission_tab.title')"></h2>
    <div class="form_block flex-row">
      <div class="left_side">
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.permission_id") }}</label>
          <div
            :class="`input_wrapper ${validation_obj.razresheniye_no.val_status}`"
          >
            <input
              class="form_box_shadow"
              v-model="payload_obj.razresheniye_no"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.razresheniye_no.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>

        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.car_brand") }}</label>
          <div :class="`input_wrapper ${validation_obj.marka.val_status}`">
            <select v-model="payload_obj.marka">
              <option
                v-for="brand in this.$store.state.carBrands"
                :value="brand.title"
                :key="brand.id"
              >
                {{ brand.title }}
              </option>
            </select>
            <span class="validation_msg">{{
              validation_obj.marka.val_msg
            }}</span>
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.transporter_name") }}</label>
          <div
            :class="`input_wrapper ${validation_obj.woditel_fio.val_status}`"
          >
            <input
              class="form_box_shadow"
              v-model="payload_obj.woditel_fio"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.woditel_fio.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.unloading_point") }}</label>
          <div :class="`input_wrapper ${validation_obj.punkt_wyg.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.punkt_wyg"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.punkt_wyg.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.cargo_type") }}</label>
          <div :class="`input_wrapper ${validation_obj.gruz.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.gruz"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.gruz.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.applicant_name") }}</label>
          <div :class="`input_wrapper ${validation_obj.zayawitel.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.zayawitel"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.zayawitel.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{
            $t("load_permission_tab.permission_issued")
          }}</label>
          <div
            :class="`input_wrapper ${validation_obj.mesto_wydachi.val_status}`"
          >
            <input
              class="form_box_shadow"
              v-model="payload_obj.mesto_wydachi"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.mesto_wydachi.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
      </div>

      <div class="right_side">
        <div class="label_input_block">
          <label for="">{{
            $t("load_permission_tab.car_state_affiliation")
          }}</label>
          <div :class="`input_wrapper ${validation_obj.gos_prinad.val_status}`">
            <select v-model="payload_obj.gos_prinad">
              <option
                v-for="country in this.$store.state.countriesList"
                :value="country.title"
                :key="country.id"
              >
                {{ country.title }}
              </option>
            </select>
            <span class="validation_msg">{{
              validation_obj.gos_prinad.val_msg
            }}</span>
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.car_state_id") }}</label>
          <div :class="`input_wrapper ${validation_obj.gos_nomer.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.gos_nomer"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.gos_nomer.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.loading_point") }}</label>
          <div :class="`input_wrapper ${validation_obj.punkt_pog.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.punkt_pog"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.punkt_pog.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.cargo_route") }}</label>
          <div :class="`input_wrapper ${validation_obj.marshrut.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.marshrut"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.marshrut.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.cargo_ownership") }}</label>
          <div :class="`input_wrapper ${validation_obj.prinad.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.prinad"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.prinad.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.expiration_date") }}</label>
          <div class="input_wrapper">
            <input
              class="form_box_shadow"
              :value="this.$store.state.permValidityPeriod"
              type="text"
            />
          </div>
        </div>
        <div class="label_input_block">
          <label for="">{{ $t("load_permission_tab.cmr_id") }}</label>
          <div :class="`input_wrapper ${validation_obj.cmr_no.val_status}`">
            <input
              class="form_box_shadow"
              v-model="payload_obj.cmr_no"
              type="text"
            />
            <span class="validation_msg">{{
              validation_obj.cmr_no.val_msg
            }}</span>
            <ExclamationCircle />
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
import ExclamationCircle from "@/components/icons/ExclamationCircle.vue";
import PopupWindow from "@/components/online_application/PopupWindow.vue";

export default {
  components: {
    ExclamationCircle,
    PopupWindow,
  },
  data() {
    return {
      payload_obj: {
        razresheniye_no: "",
        gos_prinad: "",
        marka: "",
        gos_nomer: "",
        woditel_fio: "",
        punkt_pog: "",
        punkt_wyg: "",
        marshrut: "",
        gruz: "",
        prinad: "",
        zayawitel: "",
        mesto_wydachi: "",
        cmr_no: "",
      },
      emptyPayload: {
        razresheniye_no: "",
        gos_prinad: "",
        marka: "",
        gos_nomer: "",
        woditel_fio: "",
        punkt_pog: "",
        punkt_wyg: "",
        marshrut: "",
        gruz: "",
        prinad: "",
        zayawitel: "",
        mesto_wydachi: "",
        cmr_no: "",
      },
      validation_obj: {
        razresheniye_no: { val_status: "", val_msg: "" },
        gos_prinad: { val_status: "", val_msg: "" },
        marka: { val_status: "", val_msg: "" },
        gos_nomer: { val_status: "", val_msg: "" },
        woditel_fio: { val_status: "", val_msg: "" },
        punkt_pog: { val_status: "", val_msg: "" },
        punkt_wyg: { val_status: "", val_msg: "" },
        marshrut: { val_status: "", val_msg: "" },
        gruz: { val_status: "", val_msg: "" },
        prinad: { val_status: "", val_msg: "" },
        zayawitel: { val_status: "", val_msg: "" },
        mesto_wydachi: { val_status: "", val_msg: "" },
        cmr_no: { val_status: "", val_msg: "" },
      },
      popupText: {
        success: {
          title: "load_permission_tab.success.title",
          message: "load_permission_tab.success.message",
          buttonText: "load_permission_tab.success.buttonText",
        },
        failure: {
          title: "load_permission_tab.failure.title",
          message: "load_permission_tab.failure.message",
          buttonText: "load_permission_tab.failure.buttonText",
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

    if (
      this.$store.state.carBrands.length < 1 ||
      this.$store.state.countriesList.length < 1
    ) {
      window.axios
        .get(this.$store.state.backendRoutes.loadPermissionTab, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.$store.state.carBrands = JSON.parse(res.data.brands);
          this.$store.state.countriesList = JSON.parse(res.data.countries);
          this.$store.state.permValidityPeriod = res.data.validity_period;
        })
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    } else {
      setTimeout(() => {
        this.$store.state.preLoader = false;
      }, 500);
    }
  },
  methods: {
    payloadSubmit() {
      this.$store.state.preLoader = true;

      Object.keys(this.validation_obj).forEach((key) => {
        this.validation_obj[key].val_status = "";
        this.validation_obj[key].val_msg = "";
      });

      window.axios
        .post(
          this.$store.state.backendRoutes.loadPermissionTab,
          this.payload_obj,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            this.popupText.current = this.popupText.success;
            this.payload_obj = this.emptyPayload;
          } else if (res.data.status == "failure") {
            this.popupText.current = this.popupText.failure;
          }
          this.$store.state.popupShow = true;
        })
        .catch((res) => {
          if (
            res.response.status == 422 &&
            res.response.statusText == "Unprocessable Content"
          ) {
            Object.keys(res.response.data.errors).forEach((key) => {
              this.validation_obj[key].val_status = "is_invalid";
              this.validation_obj[key].val_msg =
                res.response.data.errors[key][0];
            });
          } else {
            console.error(res);
          }
        })
        .then()
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },
  },
};
</script>
