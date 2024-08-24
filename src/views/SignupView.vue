<template>
  <div class="signup_page flex-row">
    <form
      @submit.prevent="payloadSubmit"
      class="signup_container container_box_shadow flex-column"
      v-if="payload_obj.phase == 1"
    >
      <div class="flex-column">
        <h2 class="title">{{ $t("signup_page.title") }}</h2>
        <div class="form_block flex-column">
          <h3>{{ $t("signup_page.responsible_empl") }}</h3>
          <div class="flex-column label_input_block">
            <label for="">{{ $t("signup_page.name") }}</label>
            <div :class="`input_wrapper ${validation_obj.name.val_status}`">
              <input
                class="form_box_shadow"
                v-model="payload_obj.name"
                type="text"
              />
              <span class="validation_msg">{{
                validation_obj.name.val_msg
              }}</span>
              <ExclamationCircle />
            </div>
          </div>
          <div class="flex-column label_input_block">
            <label for="">E-mail *</label>
            <div :class="`input_wrapper ${validation_obj.email.val_status}`">
              <input
                class="form_box_shadow"
                v-model="payload_obj.email"
                type="email"
              />
              <span class="validation_msg">{{
                validation_obj.email.val_msg
              }}</span>
              <ExclamationCircle />
            </div>
          </div>
          <div class="flex-column label_input_block">
            <label for="">{{ $t("signup_page.phone") }} </label>
            <div :class="`input_wrapper ${validation_obj.phone.val_status}`">
              <input
                class="form_box_shadow"
                v-model="payload_obj.phone"
                type="text"
                id="phone_number"
                :style="{ marginBottom: 0 }"
              />
              <span class="validation_msg">{{
                validation_obj.phone.val_msg
              }}</span>
              <ExclamationCircle />
            </div>
          </div>
        </div>
      </div>

      <div class="submit_button_block flex-row">
        <button class="submit_button hover-orange-darker" type="submit">
          Registrasiýa
        </button>
      </div>
    </form>

    <form
      @submit.prevent="payloadSubmit"
      class="confirmation_num_container container_box_shadow flex-column"
      v-if="payload_obj.phase == 2"
    >
      <div class="inner_wrapper flex-column">
        <h2>{{ $t("signup_page.confirmation_tab.message_sent") }}</h2>
        <div class="flex-column label_input_block">
          <label for="confirmation_num">{{
            $t("signup_page.confirmation_tab.conf_number")
          }}</label>
          <div :class="`input_wrapper ${validation_obj.otp.val_status}`">
            <input type="text" v-model="payload_obj.otp" />
            <ExclamationCircle />
          </div>
        </div>
      </div>
      <div class="submit_button_block flex-row">
        <button class="submit_button hover-orange-darker" type="submit">
          {{ $t("signup_page.confirmation_tab.submit_button") }}
        </button>
      </div>
    </form>

    <form
      @submit.prevent="payloadSubmit"
      class="password_container flex-column container_box_shadow"
      v-if="payload_obj.phase == 3"
    >
      <div class="inner_wrapper flex-column">
        <h2 class="title">{{ $t("signup_page.password_tab.title") }}</h2>
        <div class="flex-column label_input_block">
          <label for="">{{ $t("signup_page.password_tab.password") }}</label>
          <div :class="`input_wrapper ${validation_obj.passwd.val_status}`">
            <input v-model="payload_obj.passwd" type="password" />
            <span class="validation_msg">{{
              validation_obj.passwd.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
        <div class="flex-column label_input_block">
          <label for="password_confirm">{{
            $t("signup_page.password_tab.password_conf")
          }}</label>
          <div
            :class="`input_wrapper ${validation_obj.passwd_confirmation.val_status}`"
          >
            <input
              type="password"
              v-model="payload_obj.passwd_confirmation"
              id="password_confirm"
            />
            <span class="validation_msg">{{
              validation_obj.passwd_confirmation.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>
      </div>
      <div class="submit_button_block flex-row">
        <button class="submit_button hover-orange-darker" type="submit">
          {{ $t("signup_page.password_tab.submit_button") }}
        </button>
      </div>
    </form>
  </div>
  <PopupWindow
    v-if="this.$store.state.popupShow"
    :title="popupText.current.title"
    :message="popupText.current.message"
    :buttonText="popupText.current.buttonText"
    :redirectUrlName="this.redirectUrlName"
  />
</template>

<script>
import ExclamationCircle from "@/components/icons/ExclamationCircle.vue";
import PopupWindow from "@/components/online_application/PopupWindow.vue";
import Inputmask from "inputmask";

export default {
  components: {
    ExclamationCircle,
    PopupWindow,
  },
  data() {
    return {
      redirectUrlName: "",
      payload_obj: {
        name: "",
        email: "",
        phone: "",
        passwd: "",
        passwd_confirmation: "",
        otp: "",
        phase: 1,
        otp_hashed: "",
      },
      validation_obj: {
        name: { val_status: "", val_msg: "" },
        email: { val_status: "", val_msg: "" },
        phone: { val_status: "", val_msg: "" },
        passwd: { val_status: "", val_msg: "" },
        passwd_confirmation: { val_status: "", val_msg: "" },
        otp: { val_status: "", val_msg: "" },
      },
      popupText: {
        success: {
          title: "signup_page.success.title",
          message: "signup_page.success.message",
          buttonText: "signup_page.success.buttonText",
        },
        failure: {
          title: "signup_page.failure.title",
          message: "signup_page.failure.message",
          buttonText: "signup_page.failure.buttonText",
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
    this.$store.state.currentTitle = this.$t("signup_page.title");
    if (this.$store.state.authenticated)
      this.$router.push({ name: "main_page" });
    this.$store.state.popupShow = false;

    var selector = document.getElementById("phone_number");

    var im = new Inputmask("+\\9\\93 99999999");
    im.mask(selector);
  },
  methods: {
    payloadSubmit() {
      this.$store.state.preLoader = true;

      Object.keys(this.validation_obj).forEach((key) => {
        this.validation_obj[key].val_status = "";
        this.validation_obj[key].val_msg = "";
      });
      window.axios
        .post(this.$store.state.backendRoutes.register, this.payload_obj)
        .then((res) => {
          if (res.data.status == "success") {
            if (this.payload_obj.phase < 3) {
              this.payload_obj.phase += 1;
              if (this.payload_obj.phase == 2) {
                this.payload_obj.otp_hashed = res.data.otp_hashed;
              }
            } else if (this.payload_obj.phase == 3) {
              this.popupText.current = this.popupText.success;
              this.$store.state.authenticated = true;
              localStorage.setItem("auth", "true");
              localStorage.setItem("token", res.data.token);
              this.$store.state.token = res.data.token;
              localStorage.setItem("username", res.data.currentUserName);
              this.$store.state.currentUserName = res.data.currentUserName;
              this.redirectUrlName = "main_page";
              this.$store.state.popupShow = true;
            }
          } else if (res.data.status == "invalid_otp") {
            this.validation_obj.otp.val_status = "is_invalid";
          } else if (res.data.status == "error_sending_email") {
            this.popupText.current = this.popupText.failure;
            this.$store.state.popupShow = true;
          }
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
