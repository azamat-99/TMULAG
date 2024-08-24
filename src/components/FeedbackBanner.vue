<template>
  <div :class="`feedback_banner ${componentStatus}`" :id="this.$props.id">
    <div class="banner_image flex-row">
      <!-- <img src="@/assets/images/banner_main_bottom.jpg" alt="" /> -->
      <img src="@/assets/images/3contacts.jpg" alt="" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25188.761813544927!2d58.29896927573787!3d37.893147769895506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f70034e2e39e767%3A0x13836b01b38e5535!2z0JDQs9C10L3RgtGB0YLQstC-IMKr0KLRg9GA0LrQvNC10L3QsNCy0YLQvtGC0YDQsNC90YHQv9C-0YDRgsK7!5e0!3m2!1sru!2s!4v1686047338138!5m2!1sru!2s"
        width="100%"
        height="100%"
        style="border: 0"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="upper_layer flex-column">
      <div class="feedback_container flex-row">
        <svg
          class="back_button"
          @click="() => (componentStatus = '')"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.54 16.4893L6.05078 12M6.05078 12L10.54 7.51074M6.05078 12L18.0221 12"
            stroke="var(--hover_color)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="feedback_block">
          <h2 class="title">{{ $t("feedback_banner.contact_us") }}</h2>
          <form class="flex-column" action="" @submit.prevent="submitPayload">
            <div class="label_input_block">
              <label for="">{{ $t("feedback_banner.department") }}</label>
              <div
                :class="`input_wrapper ${validation_obj.department.val_status}`"
              >
                <select v-model="payload.department">
                  <option value="general_dep">
                    {{ $t("feedback_banner.general_dep") }}
                  </option>
                  <option value="technical_dep">
                    {{ $t("feedback_banner.technical_dep") }}
                  </option>
                </select>
                <span class="validation_msg">{{
                  validation_obj.department.val_msg
                }}</span>
              </div>
            </div>

            <div class="label_input_block">
              <label>{{ $t("feedback_banner.your_name") }}</label>
              <div :class="`input_wrapper ${validation_obj.name.val_status}`">
                <input
                  class="form_box_shadow"
                  type="text"
                  name=""
                  v-model="payload.name"
                />
                <span class="validation_msg">{{
                  validation_obj.name.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="label_input_block">
              <label>E-mail</label>
              <div :class="`input_wrapper ${validation_obj.email.val_status}`">
                <input
                  class="form_box_shadow"
                  type="email"
                  name=""
                  v-model="payload.email"
                />
                <span class="validation_msg">{{
                  validation_obj.email.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="label_input_block">
              <label>{{ $t("feedback_banner.your_phone") }}</label>
              <div :class="`input_wrapper ${validation_obj.phone.val_status}`">
                <input
                  class="form_box_shadow"
                  type="text"
                  name=""
                  id="phone_num"
                  v-model="payload.phone"
                />
                <span class="validation_msg">{{
                  validation_obj.phone.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="label_input_block">
              <label>{{ $t("feedback_banner.your_message") }}</label>
              <div
                :class="`input_wrapper ${validation_obj.message.val_status}`"
              >
                <textarea
                  class="form_box_shadow"
                  :style="{ width: '100%' }"
                  rows="3"
                  name=""
                  v-model="payload.message"
                ></textarea>
                <span class="validation_msg">{{
                  validation_obj.message.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="submit_button flex-row">
              <input type="submit" :value="$t('feedback_banner.send_button')" />
            </div>
          </form>
        </div>

        <div class="contacts_block flex-column">
          <h2 class="title">{{ $t("topbar.contacts_page") }}:</h2>
          <div class="content_block flex-column">
            <div class="general_dep_block flex-column">
              <span class="department_name">{{
                $t("feedback_banner.general_dep")
              }}</span>
              <div class="phone_row flex-row">
                <span class="key">{{ $t("feedback_banner.phone") }}:</span>
                <span class="value">+993(12) 39-02-51</span>
              </div>
              <div class="email_row flex-row">
                <span class="key">E-mail:</span>
                <span class="value">info@tugdk.gov.tm</span>
              </div>
            </div>

            <div class="technical_dep_block flex-column">
              <span class="department_name">{{
                $t("feedback_banner.technical_dep")
              }}</span>
              <div class="phone_row flex-row">
                <span class="key">{{ $t("feedback_banner.phone") }}:</span>
                <span class="value">+993(12) 39-02-70</span>
              </div>
              <div class="email_row flex-row">
                <span class="key">E-mail:</span>
                <span class="value">sanly@tugdk.gov.tm</span>
              </div>
            </div>

            <div class="address_hours_block flex-column">
              <div class="address_row flex-row">
                <span class="key">{{ $t("feedback_banner.address") }}:</span>
                <span class="value">{{
                  $t("feedback_banner.address_value")
                }}</span>
              </div>
              <div class="working_hours_row flex-row">
                <span class="key">{{ $t("feedback_banner.work_hours") }}:</span>
                <div class="values_block flex-column">
                  <span class="value">{{
                    $t("feedback_banner.work_hours_value_1")
                  }}</span>
                  <span class="value">{{
                    $t("feedback_banner.work_hours_value_2")
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="activate_button flex-row">
            <button
              class="hover-orange-darker"
              @click="() => (componentStatus = 'active')"
            >
              {{ $t("feedback_banner.contact_us") }}
            </button>
          </div>
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
import Inputmask from "inputmask";
import ExclamationCircle from "@/components/icons/ExclamationCircle.vue";
import PopupWindow from "@/components/online_application/PopupWindow.vue";

export default {
  data() {
    return {
      componentStatus: "",

      payload: {
        department: "general_dep",
        name: "",
        email: "",
        phone: "",
        message: "",
      },

      emptyPayload: {
        department: "general_dep",
        name: "",
        email: "",
        phone: "",
        message: "",
      },

      validation_obj: {
        department: { val_status: "", val_msg: "" },
        name: { val_status: "", val_msg: "" },
        email: { val_status: "", val_msg: "" },
        phone: { val_status: "", val_msg: "" },
        message: { val_status: "", val_msg: "" },
      },

      popupText: {
        success: {
          title: "feedback_banner.success.title",
          message: "feedback_banner.success.message",
          buttonText: "feedback_banner.success.buttonText",
        },
        failure: {
          title: "feedback_banner.failure.title",
          message: "feedback_banner.failure.message",
          buttonText: "feedback_banner.failure.buttonText",
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
    var selector = document.getElementById("phone_num");

    var im = new Inputmask("+\\9\\93 99999999");
    im.mask(selector);
  },
  components: {
    Inputmask,
    PopupWindow,
    ExclamationCircle,
  },
  methods: {
    submitPayload() {
      this.$store.state.preLoader = true;
      Object.keys(this.validation_obj).forEach((key) => {
        this.validation_obj[key].val_status = "";
        this.validation_obj[key].val_msg = "";
      });

      window.axios
        .post(this.$store.state.backendRoutes.feedback_post, this.payload)
        .then((res) => {
          if (res.data.status == "success") {
            this.popupText.current = this.popupText.success;
            this.payload = this.emptyPayload;
          } else if (res.data.status == "error_sending_email") {
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
  props: {
    id: String,
  },
};
</script>
