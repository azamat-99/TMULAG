import axiosApi from "axios";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import messages from "./locale/translation";
import router from "./router";
import store from "./store";

const axios = axiosApi.create({
  baseURL: store.state.backendRoot,
  // headers: {},
});

// Use the window object to make it available globally.
axios.defaults.withCredentials = true;
window.axios = axios;
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const i18n = createI18n({
  locale: "tm", // set locale
  fallbackLocale: "ru", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(i18n);
app.mount("#app");
