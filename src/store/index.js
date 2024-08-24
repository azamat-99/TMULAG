import { createStore } from "vuex";
import router from "../router";
import store from "./";

export default createStore({
  state: {
    backendRoot: "https://tugdk.gov.tm",
    authenticated: localStorage.getItem("auth") === "true",
    token: localStorage.getItem("token"),
    carBrands: [],
    countriesList: [],
    historyTabData: [],
    permValidityPeriod: "",
    preLoader: false,
    popupShow: false,
    hamburger_active: "",
    theme: localStorage.getItem("theme") == "dark" ? "dark" : "light",
    currentUserName: localStorage.getItem("username"),
    currentTitle: "",
    currentTab: "initialTab",
    langs_list: ["tm", "ru", "en"],
    current_lang: "tm",
    idEditDriver: "",
    idEditTransport: "",

    axiosCatch: (err) => {
      if (err.request?.status === 401) {
        store.state.authenticated = false;
        localStorage.setItem("auth", "false");
        localStorage.setItem("username", "");
        localStorage.setItem("token", "");
        router.push({ name: "login_page" });
      } else {
        console.error(err.message);
      }
    },

    logout() {
      store.state.preLoader = true;

      window.axios
        .get(store.state.backendRoutes.logout)
        .then((res) => {
          if (res.data.status == "success") {
            store.state.authenticated = false;
            store.state.token = "";
            localStorage.setItem("auth", "false");
            localStorage.setItem("token", "");
            router.push({ name: "main_page" });
          }
        })
        .catch(store.state.axiosCatch)
        .finally(() => {
          store.state.preLoader = false;
        });
    },

    backendRoutes: {
      home: "/api/main",
      newsAll: "/api/news-all",
      newsSingle: "/api/news",
      login: "/api/login-post",
      profile: "/api/profile",
      profileUpdate: "/api/profile-update",
      loadPermissionTab: "/api/load-permission",
      unloadPermissionTab: "/api/unload-permission",
      onlineApplicationTab: "/api/online-application",
      historyTab: "/api/history",
      changePasswdTab: "/api/passwd-update",
      logout: "/api/logout",
      register: "/api/registration-post",
      password_reset: "/api/passwd-reset",
      feedback_post: "/api/feedback-post",
      services_page: "/api/services",
      onlineApplicationPage: "/api/online-application-page",
      aboutUsPage: "/api/about-us",
      contactsPage: "/api/contacts-page",

      individualClient: "/api/get/client/0",
      individualClientCreate: "/api/individual/store",
      clientStaticData: "/api/get-client-datas",

      drivers: "/api/drivers",
      driverStaticData: "/api/get-driver-datas",
      driverCreate: "/api/driver",
      singleDriver: "/api/driver",
      driverEdit: "/api/driver",
      driverDelete: "/api/driver",

      transports: "/api/transports",
      transportStaticData: "/api/get-transport-datas",
      transportCreate: "/api/transport",
      singletransport: "/api/transport",
      transportEdit: "/api/transport",
      transportDelete: "/api/transport",

      legalClient: "/api/get/client/1",
      legalClientCreate: "/api/legal/store",

      ePermits: "/api/request-to-permission",
      ePermitStaticData: "/api/get-permit-datas",
      ePermitTransportData: "/api/get-transports",
      ePermitSend: "/api/request-to-permission",
    },
  },
  getters: {
    // Can contain functions that return a state object (Usually we don't need it but if you need to change the object somehow then it can be helpful)
  },
  mutations: {
    // Can contain functions that mutate the state (not async functions)
  },
  actions: {
    // Can contain functions that can be asynchronous but they cannot change the state (only read). If you wanna change the state you will need to trigger mutations manually

    paginate({ commit }, { currentPage, pagesTotal }) {
      const leftBlockLength = 1; // Length of the left block(before the "..." separator)
      const rightBlockLength = 1; // Length of the right block(after the "..." separator)
      const currentPageOffsets = 1; // The offsets on both sides of the current page
      const paginationRowLength =
        leftBlockLength + (currentPageOffsets * 2 + 1) + rightBlockLength + 2; // 2 is for two "..." elements and +1 is for the current_page itself
      const separator = "...";

      currentPage = parseInt(currentPage);
      pagesTotal = parseInt(pagesTotal);
      let result = [];

      const threeDotsThresholdLeft =
        leftBlockLength + 1 + currentPageOffsets + 1; // Threshold for adding the "..." before the current page (+1 is for "..." and the next one is for the currentPage element itself)
      const threeDotsThresholdRight =
        1 + currentPageOffsets + 1 + rightBlockLength; // Threshold for removing the "..." after the current page (+1 is for the currentPage element itself and the next one is for "...")

      const leftThresholdCrossed = currentPage > threeDotsThresholdLeft;
      const rightThresholdCrossed =
        pagesTotal - threeDotsThresholdRight < currentPage;

      if (pagesTotal <= paginationRowLength) {
        // If there is no need to add "..." at all
        result = [...Array(pagesTotal + 1).keys()]; // +1 is because it starts generating from 0
      } else {
        /* ----------------------------------- Left block -------------------------------- */
        if (!leftThresholdCrossed) {
          // The "..." should not be added
          result = [
            ...Array(threeDotsThresholdLeft + currentPageOffsets + 1).keys(),
          ]; // +1 is because it starts generating from 0
        } else {
          for (let i = 1; i <= leftBlockLength; i++) {
            // Generating the left side block
            result.push(i);
          }
          result.push(separator);
        }

        /* -------------------------------------Middle block ------------------------- */
        if (leftThresholdCrossed && !rightThresholdCrossed) {
          // If the middle block is surrounded by "..." on both sides
          for (
            let i = currentPage - currentPageOffsets;
            i <= currentPage + currentPageOffsets;
            i++
          ) {
            // Generating the middle block
            result.push(i);
          }
        }

        /* --------------------------------------The Right block ----------------------- */
        if (rightThresholdCrossed) {
          // Threshold has been crossed and "..." should not be added
          for (
            let i =
              pagesTotal + 1 - (threeDotsThresholdRight + currentPageOffsets);
            i <= pagesTotal;
            i++
          ) {
            result.push(i);
          }
        } else {
          // Threshold has not been crossed and "..." should be added
          result.push(separator);
          for (
            let i = pagesTotal - rightBlockLength + 1;
            i <= pagesTotal;
            i++
          ) {
            result.push(i);
          }
        }
      }

      /* ------------Removing 0 in the beginning of the generated array------------------ */
      const index = result.indexOf(0);
      if (index > -1) {
        result.splice(index, 1);
      }
      return result;
    },
  },
  modules: {
    // Can break up our store into multiple modules each having its own actions, mutations and so on.
  },
});
