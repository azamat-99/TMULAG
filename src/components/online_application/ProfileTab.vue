<template>
  <form
    @submit.prevent="profileUpdate"
    class="profile_container container_box_shadow flex-column"
  >
    <h3 class="title">{{ $t("profile_tab.profile_data") }}</h3>
    <div class="form_block">
      <div class="label_input_block flex-column">
        <label for="family_name">{{ $t("profile_tab.family_name") }}</label>
        <div class="input_container">
          <div :class="`input_wrapper ${validation_obj.name.val_status}`">
            <input
              class="form_box_shadow"
              type="text"
              id="family_name"
              v-model="profile.name"
            />
            <span class="validation_msg">{{
              validation_obj.name.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 21H21.5M14.2844 5.31171C14.2844 5.31171 14.2844 6.94634 15.919 8.58096C17.5537 10.2156 19.1883 10.2156 19.1883 10.2156M7.81963 17.9881L11.2523 17.4977C11.7475 17.4269 12.2064 17.1975 12.56 16.8438L20.8229 8.58096C21.7257 7.67818 21.7257 6.21449 20.8229 5.31171L19.1883 3.67708C18.2855 2.77431 16.8218 2.77431 15.919 3.67708L7.65616 11.94C7.30248 12.2936 7.07305 12.7525 7.00231 13.2477L6.51193 16.6804C6.40295 17.4432 7.0568 18.097 7.81963 17.9881Z"
              stroke="#D1D1D1"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div class="label_input_block flex-column">
        <label for="email">E-mail *</label>
        <div class="input_container">
          <div :class="`input_wrapper ${validation_obj.email.val_status}`">
            <input
              class="form_box_shadow"
              type="text"
              id="email"
              v-model="profile.email"
            />
            <span class="validation_msg">{{
              validation_obj.email.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 21H21.5M14.2844 5.31171C14.2844 5.31171 14.2844 6.94634 15.919 8.58096C17.5537 10.2156 19.1883 10.2156 19.1883 10.2156M7.81963 17.9881L11.2523 17.4977C11.7475 17.4269 12.2064 17.1975 12.56 16.8438L20.8229 8.58096C21.7257 7.67818 21.7257 6.21449 20.8229 5.31171L19.1883 3.67708C18.2855 2.77431 16.8218 2.77431 15.919 3.67708L7.65616 11.94C7.30248 12.2936 7.07305 12.7525 7.00231 13.2477L6.51193 16.6804C6.40295 17.4432 7.0568 18.097 7.81963 17.9881Z"
              stroke="#D1D1D1"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div class="label_input_block flex-column">
        <label for="phone_num">{{ $t("profile_tab.phone") }}</label>
        <div class="input_container">
          <div :class="`input_wrapper ${validation_obj.phone.val_status}`">
            <input
              class="form_box_shadow"
              type="text"
              id="phone_num"
              v-model="profile.phone"
            />
            <span class="validation_msg">{{
              validation_obj.phone.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 21H21.5M14.2844 5.31171C14.2844 5.31171 14.2844 6.94634 15.919 8.58096C17.5537 10.2156 19.1883 10.2156 19.1883 10.2156M7.81963 17.9881L11.2523 17.4977C11.7475 17.4269 12.2064 17.1975 12.56 16.8438L20.8229 8.58096C21.7257 7.67818 21.7257 6.21449 20.8229 5.31171L19.1883 3.67708C18.2855 2.77431 16.8218 2.77431 15.919 3.67708L7.65616 11.94C7.30248 12.2936 7.07305 12.7525 7.00231 13.2477L6.51193 16.6804C6.40295 17.4432 7.0568 18.097 7.81963 17.9881Z"
              stroke="#D1D1D1"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <h3 class="title">{{ $t("profile_tab.institution_data") }}</h3>

      <div class="label_input_block flex-column">
        <label for="inst_name">{{ $t("profile_tab.institution_name") }}</label>
        <div class="input_container">
          <div :class="`input_wrapper ${validation_obj.corpname.val_status}`">
            <input
              class="form_box_shadow"
              type="text"
              id="inst_name"
              v-model="profile.corpname"
            />
            <span class="validation_msg">{{
              validation_obj.corpname.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 21H21.5M14.2844 5.31171C14.2844 5.31171 14.2844 6.94634 15.919 8.58096C17.5537 10.2156 19.1883 10.2156 19.1883 10.2156M7.81963 17.9881L11.2523 17.4977C11.7475 17.4269 12.2064 17.1975 12.56 16.8438L20.8229 8.58096C21.7257 7.67818 21.7257 6.21449 20.8229 5.31171L19.1883 3.67708C18.2855 2.77431 16.8218 2.77431 15.919 3.67708L7.65616 11.94C7.30248 12.2936 7.07305 12.7525 7.00231 13.2477L6.51193 16.6804C6.40295 17.4432 7.0568 18.097 7.81963 17.9881Z"
              stroke="#D1D1D1"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div class="label_input_block flex-column">
        <label for="identity_num">{{ $t("profile_tab.cert_id") }}</label>
        <div class="input_container">
          <div
            :class="`input_wrapper ${validation_obj.ygtyyarnama_no.val_status}`"
          >
            <input
              class="form_box_shadow"
              type="text"
              id="identity_num"
              v-model="profile.ygtyyarnama_no"
            />
            <span class="validation_msg">{{
              validation_obj.ygtyyarnama_no.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 21H21.5M14.2844 5.31171C14.2844 5.31171 14.2844 6.94634 15.919 8.58096C17.5537 10.2156 19.1883 10.2156 19.1883 10.2156M7.81963 17.9881L11.2523 17.4977C11.7475 17.4269 12.2064 17.1975 12.56 16.8438L20.8229 8.58096C21.7257 7.67818 21.7257 6.21449 20.8229 5.31171L19.1883 3.67708C18.2855 2.77431 16.8218 2.77431 15.919 3.67708L7.65616 11.94C7.30248 12.2936 7.07305 12.7525 7.00231 13.2477L6.51193 16.6804C6.40295 17.4432 7.0568 18.097 7.81963 17.9881Z"
              stroke="#D1D1D1"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div class="label_input_block flex-column">
        <label for="unique_list">{{ $t("profile_tab.yegrpo") }}</label>
        <div class="input_container">
          <div :class="`input_wrapper ${validation_obj.yegrpo.val_status}`">
            <input
              class="form_box_shadow"
              type="text"
              id="unique_list"
              v-model="profile.yegrpo"
            />
            <span class="validation_msg">{{
              validation_obj.yegrpo.val_msg
            }}</span>
            <ExclamationCircle />
          </div>
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 21H21.5M14.2844 5.31171C14.2844 5.31171 14.2844 6.94634 15.919 8.58096C17.5537 10.2156 19.1883 10.2156 19.1883 10.2156M7.81963 17.9881L11.2523 17.4977C11.7475 17.4269 12.2064 17.1975 12.56 16.8438L20.8229 8.58096C21.7257 7.67818 21.7257 6.21449 20.8229 5.31171L19.1883 3.67708C18.2855 2.77431 16.8218 2.77431 15.919 3.67708L7.65616 11.94C7.30248 12.2936 7.07305 12.7525 7.00231 13.2477L6.51193 16.6804C6.40295 17.4432 7.0568 18.097 7.81963 17.9881Z"
              stroke="#D1D1D1"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="submit_button_box flex-row">
      <button class="submit_button" type="submit">
        {{ $t("profile_tab.save_button") }}
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
  data() {
    return {
      profile: {},

      validation_obj: {
        name: { val_status: "", val_msg: "" },
        email: { val_status: "", val_msg: "" },
        phone: { val_status: "", val_msg: "" },
        corpname: { val_status: "", val_msg: "" },
        ygtyyarnama_no: { val_status: "", val_msg: "" },
        yegrpo: { val_status: "", val_msg: "" },
      },
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

    window.axios
      .get(this.$store.state.backendRoutes.profile, {
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
      });
  },
  methods: {
    profileUpdate() {
      this.$store.state.preLoader = true;

      axios
        .post(this.$store.state.backendRoutes.profileUpdate, this.profile, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          if (res.data.status == "success") {
            this.popupText.current = this.popupText.success;
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
  components: {
    ExclamationCircle,
    PopupWindow,
  },
};
</script>
