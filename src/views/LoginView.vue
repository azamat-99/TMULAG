<template>
  <div class="login_page flex-row">
    <form
      @submit.prevent="loginSubmit"
      class="form_container container_box_shadow"
    >
      <div class="title_block">
        <h2 class="title_text">{{ $t("login_page.title") }}</h2>
      </div>
      <div class="form_block flex-column">
        <div class="label_input_block">
          <label for="email">E-mail *</label>
          <div :class="`input_wrapper ${validation_obj.email.val_status}`">
            <input
              class="form_box_shadow"
              type="email"
              v-model="payload_obj.email"
              id="email"
              required
            />
            <span class="validation_msg">{{
              validation_obj.email.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>

        <div class="label_input_block">
          <label for="password">{{ $t("login_page.password") }}</label>
          <div :class="`input_wrapper ${validation_obj.password.val_status}`">
            <input
              class="form_box_shadow"
              type="password"
              v-model="payload_obj.password"
              required
            />
            <span class="validation_msg">{{
              validation_obj.password.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
        </div>

        <router-link
          :to="{ name: 'password_reset_page' }"
          class="forgot_password_row"
          >{{ $t("login_page.forgot_password") }}</router-link
        >
      </div>
      <div class="login_button_block flex-column">
        <button class="login_button hover-orange-darker" type="submit">
          {{ $t("login_page.submit_button") }}
        </button>
        <span class="signup_row"
          >{{ $t("login_page.no_account") }}
          <router-link :to="{ name: 'signup_page' }">{{
            $t("login_page.signup")
          }}</router-link></span
        >
      </div>
    </form>
  </div>
</template>

<script>
import ExclamationCircle from "@/components/icons/ExclamationCircle.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      validation_status: "",

      payload_obj: {
        email: "",
        password: "",
      },
      validation_obj: {
        email: { val_status: "", val_msg: "" },
        password: { val_status: "", val_msg: "" },
      },
    };
  },

  components: {
    ExclamationCircle,
  },

  mounted() {
    this.$store.state.currentTitle = this.$t("login_page.title");
    if (this.$store.state.authenticated)
      this.$router.push({ name: "main_page" });
  },
  methods: {
    loginSubmit() {
      this.$store.state.preLoader = true;

      Object.keys(this.validation_obj).forEach((key) => {
        this.validation_obj[key].val_status = "";
        this.validation_obj[key].val_msg = "";
      });

      window.axios
        .post(this.$store.state.backendRoutes.login, this.payload_obj)
        .then((res) => {
          if (res.data.status === "success") {
            this.validation_status = "is-valid";
            this.$store.state.authenticated = true;
            localStorage.setItem("auth", "true");
            localStorage.setItem("token", res.data.token);
            this.$store.state.token = res.data.token;
            localStorage.setItem("username", res.data.currentUserName);
            this.$store.state.currentUserName = res.data.currentUserName;
            this.$router.push({ name: "online_application_page" });
          } else if (res.data.status == "invalid_creds") {
            this.validation_obj.email.val_status = "is_invalid";
            this.validation_obj.email.val_msg = this.$t(
              "login_page.invalid_creds"
            );
            this.validation_obj.password.val_status = "is_invalid";
            this.validation_obj.password.val_msg = this.$t(
              "login_page.invalid_creds"
            );
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
