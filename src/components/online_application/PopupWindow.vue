<template>
  <div class="popup_container flex-column">
    <form @submit.prevent="hideWindow" class="inner_wrapper flex-column" id="">
      <h2 class="title">{{ $t(title) }}</h2>
      <span class="message">{{ $t(message) }}</span>

      <div class="submit_button_box flex-row">
        <input
          type="text"
          name=""
          id="popup_input"
          :style="{ fontSize: '0', opacity: '0' }"
        />
        <button class="submit_button" type="submit">
          {{ $t(buttonText) }}
        </button>
      </div>
      <svg
        @click="hideWindow"
        class="icon"
        width="30"
        height="30"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4019 14.9141L15.5 10.816M15.5 10.816L11.4019 9.71791M15.5 10.816L8.5718 14.816"
          stroke="#E0852A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    buttonText: String,
    redirectUrlName: String,
    redirectTabName: String,
  },
  methods: {
    hideWindow() {
      this.$store.state.popupShow = false;
      if (this.redirectUrlName) {
        this.$router.push({ name: this.redirectUrlName });
      }

      if (this.redirectTabName) {
        this.$store.state.currentTab = this.redirectTabName;
      }
    },
  },
  mounted() {
    document.getElementById("popup_input").focus();
  },
};
</script>
