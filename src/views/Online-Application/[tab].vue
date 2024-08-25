
<script>

import ChangePasswordTab from "@/components/online_application/ChangePasswordTab.vue";
import legalData from "@/components/online_application/LegalData.vue";

import DriversTab from "@/components/online_application/Drivers.vue";

import CreateDriverTab from "@/components/online_application/DriverCreate.vue";

import CreateTransportTab from "@/components/online_application/TransportCreate.vue";

import CarsTab from "@/components/online_application/Transports.vue";

import EPermitCreateTab from "@/components/online_application/EPermitCreate.vue";
import EPermitHistoryTab from "@/components/online_application/EPermitHistory.vue";
import HistoryTab from "@/components/online_application/HistoryTab.vue";
import individualDataTab from "@/components/online_application/IndividualData.vue";
import InitialTab from "@/components/online_application/InitialTab.vue";
import LoadPermissionTab from "@/components/online_application/LoadPermissionTab.vue";
import OnlineApplicationTab from "@/components/online_application/OnlineApplicationTab.vue";
import ProfileTab from "@/components/online_application/ProfileTab.vue";
import UnloadPermissionTab from "@/components/online_application/UnloadPermissionTab.vue";
export default {    
    components: 
    {
        ProfileTab,
    DriversTab,
    CreateDriverTab,
    CreateTransportTab,
    CarsTab,
    legalData,
    individualDataTab,
    EPermitHistoryTab,
    EPermitCreateTab,
    LoadPermissionTab,
    UnloadPermissionTab,
    OnlineApplicationTab,
    HistoryTab,
    ChangePasswordTab,
    InitialTab,
    },

  data() {
    return {
      tabs: {
        initialTab: "initialTab",
        profileTab: "profileTab",
        individualDataTab: "individualDataTab",
        individualDrivers: "individualDrivers",
        individualDriversCreate: "individualDriversCreate",
        individualDriversEdit: "individualDriversEdit",
        legalDrivers: "legalDrivers",
        legalDriverCreate: "legalDriverCreate",
        legalDriverEdit: "legalDriverEdit",
        individualCarCreate: "individualCarCreate",
        individualCarEdit: "individualCarEdit",
        individualTrailers: "individualTrailers",
        individualTrailerCreate: "individualTrailerCreate",
        individualTrailerEdit: "individualTrailerEdit",

        legalTrailers: "legalTrailers",
        legalTrailerCreate: "legalTrailerCreate",
        legalTrailerEdit: "legalTrailerEdit",

        individualCars: "individualCars",
        legalCars: "legalCars",
        legalCarCreate: "legalCarCreate",
        legalCarEdit: "legalCarEdit",
        legalData: "legalData",
        ePermitHistory: "ePermitHistory",
        ePermitCreate: "ePermitCreate",
        loadPermissionTab: "loadPermissionTab",
        unloadPermissionTab: "unloadPermissionTab",
        onlineApplicationTab: "onlineApplicationTab",
        historyTab: "historyTab",
        changePasswordTab: "changePasswordTab",
      },

      currentTab: "initialTab",
    };
  },
  computed: {
    activeTab() {
        return this.$route.params.tab
    }
  }

}
</script>

<template>
    <div class="application_page flex-column">
   <div class="inner_wrapper flex-row">
      <div
        class="nav_container flex-column container_box_shadow"
      >
        <h3 class="title">{{ $t("online_application_navbar.title") }}</h3>

        <!-- PROFILE -->
        <div
          :class="`row flex-row ${
            $route.params.tab === tabs.profileTab ? 'active' : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.profileTab;
            }
          "
        >
          <svg
            class="icon"
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0588 18.5488C17.0654 15.8918 14.5036 14 11.5 14C8.49638 14 5.9346 15.8918 4.94117 18.5488M18.0588 18.5488C20.1672 16.7154 21.5 14.0134 21.5 11C21.5 5.47715 17.0228 1 11.5 1C5.97715 1 1.5 5.47715 1.5 11C1.5 14.0134 2.83285 16.7154 4.94117 18.5488M18.0588 18.5488C16.3031 20.0756 14.0095 21 11.5 21C8.99052 21 6.69694 20.0756 4.94117 18.5488M14.5 8C14.5 9.65685 13.1569 11 11.5 11C9.84315 11 8.5 9.65685 8.5 8C8.5 6.34315 9.84315 5 11.5 5C13.1569 5 14.5 6.34315 14.5 8Z"
              stroke="#28303F"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
          <RouterLink class="value" :to="tabs.profileTab">{{ this.$store.state.currentUserName }}</RouterLink>
        </div>

        <!-- Данные Физ лица -->
        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.individualDataTab
              ? 'active'
              : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.individualDataTab;
            }
          "
        >
          <img src="@/assets/icons/individual.svg" alt="" />
          <RouterLink :to="tabs.individualDataTab" class="value">Данные учреждения (Физ. Лицо)</RouterLink>
        </div>

        <!-- Водители -->
        <div
          :class="`row flex-row submenu ${
            this.$store.state.currentTab === tabs.individualDrivers ||
            this.$store.state.currentTab === tabs.individualDriversCreate ||
            this.$store.state.currentTab === tabs.individualDriversEdit
              ? 'active'
              : ''
          }`"
          v-if="
            this.$store.state.currentTab === tabs.individualDataTab ||
            this.$store.state.currentTab === tabs.individualDrivers ||
            this.$store.state.currentTab === tabs.individualDriversCreate ||
            this.$store.state.currentTab === tabs.individualDriversEdit ||
            this.$store.state.currentTab === tabs.individualCars ||
            this.$store.state.currentTab === tabs.individualCarCreate ||
            this.$store.state.currentTab === tabs.individualCarEdit ||
            this.$store.state.currentTab === tabs.individualTrailerCreate ||
            this.$store.state.currentTab === tabs.individualTrailerEdit ||
            this.$store.state.currentTab === tabs.individualTrailers
          "
          @click="
            () => {
              this.$store.state.currentTab = tabs.individualDrivers;
            }
          "
        >
          <img src="@/assets/icons/driver.svg" alt="" />
          <span class="value">Водители</span>
        </div>

        <!-- Машины  -->
        <div
          :class="`row flex-row submenu ${
            this.$store.state.currentTab === tabs.individualCars ||
            this.$store.state.currentTab === tabs.individualCarCreate ||
            this.$store.state.currentTab === tabs.individualCarEdit
              ? 'active'
              : ''
          }`"
          v-if="
            this.$store.state.currentTab === tabs.individualDataTab ||
            this.$store.state.currentTab === tabs.individualDrivers ||
            this.$store.state.currentTab === tabs.individualDriversCreate ||
            this.$store.state.currentTab === tabs.individualDriversEdit ||
            this.$store.state.currentTab === tabs.individualCars ||
            this.$store.state.currentTab === tabs.individualCarCreate ||
            this.$store.state.currentTab === tabs.individualCarEdit ||
            this.$store.state.currentTab === tabs.individualTrailers ||
            this.$store.state.currentTab === tabs.individualTrailerCreate ||
            this.$store.state.currentTab === tabs.individualTrailerEdit
          "
          @click="
            () => {
              this.$store.state.currentTab = tabs.individualCars;
            }
          "
        >
          <img src="@/assets/icons/car.svg" alt="" />
          <span class="value">Машины</span>
        </div>

        <!-- Прицепы   -->
        <div
          :class="`row flex-row submenu ${
            this.$store.state.currentTab === tabs.individualTrailers ||
            this.$store.state.currentTab === tabs.individualTrailerCreate ||
            this.$store.state.currentTab === tabs.individualTrailerEdit
              ? 'active'
              : ''
          }`"
          v-if="
            this.$store.state.currentTab === tabs.individualDataTab ||
            this.$store.state.currentTab === tabs.individualDrivers ||
            this.$store.state.currentTab === tabs.individualDriversCreate ||
            this.$store.state.currentTab === tabs.individualDriversEdit ||
            this.$store.state.currentTab === tabs.individualCars ||
            this.$store.state.currentTab === tabs.individualCarCreate ||
            this.$store.state.currentTab === tabs.individualCarEdit ||
            this.$store.state.currentTab === tabs.individualTrailers ||
            this.$store.state.currentTab === tabs.individualTrailerCreate ||
            this.$store.state.currentTab === tabs.individualTrailerEdit
          "
          @click="
            () => {
              this.$store.state.currentTab = tabs.individualTrailers;
            }
          "
        >
          <img src="@/assets/icons/trailer.svg" alt="" />
          <span class="value">Прицепы</span>
        </div>

        <!-- Данные Юр лица -->
        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.legalData ? 'active' : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.legalData;
            }
          "
        >
          <img src="@/assets/icons/legal_entity.svg" alt="" />
          <span class="value">Данные учреждения (Юр. Лицо)</span>
        </div>

        <!-- Водители -->
        <div
          :class="`row flex-row submenu ${
            this.$store.state.currentTab === tabs.legalDrivers ||
            this.$store.state.currentTab === tabs.legalDriverCreate ||
            this.$store.state.currentTab === tabs.legalDriverEdit
              ? 'active'
              : ''
          }`"
          v-if="
            this.$store.state.currentTab === tabs.legalData ||
            this.$store.state.currentTab === tabs.legalDrivers ||
            this.$store.state.currentTab === tabs.legalDriverCreate ||
            this.$store.state.currentTab === tabs.legalDriverEdit ||
            this.$store.state.currentTab === tabs.legalCars ||
            this.$store.state.currentTab === tabs.legalCarCreate ||
            this.$store.state.currentTab === tabs.legalCarEdit ||
            this.$store.state.currentTab === tabs.legalTrailers ||
            this.$store.state.currentTab === tabs.legalTrailerCreate ||
            this.$store.state.currentTab === tabs.legalTrailerEdit
          "
          @click="
            () => {
              this.$store.state.currentTab = tabs.legalDrivers;
            }
          "
        >
          <img src="@/assets/icons/driver.svg" alt="" />
          <span class="value">Водители</span>
        </div>

        <!-- Машины  -->
        <div
          :class="`row flex-row submenu ${
            this.$store.state.currentTab === tabs.legalCars ||
            this.$store.state.currentTab === tabs.legalCarCreate ||
            this.$store.state.currentTab === tabs.legalCarEdit
              ? 'active'
              : ''
          }`"
          v-if="
            this.$store.state.currentTab === tabs.legalData ||
            this.$store.state.currentTab === tabs.legalDrivers ||
            this.$store.state.currentTab === tabs.legalDriverCreate ||
            this.$store.state.currentTab === tabs.legalDriverEdit ||
            this.$store.state.currentTab === tabs.legalCars ||
            this.$store.state.currentTab === tabs.legalCarCreate ||
            this.$store.state.currentTab === tabs.legalCarEdit ||
            this.$store.state.currentTab === tabs.legalTrailers ||
            this.$store.state.currentTab === tabs.legalTrailerCreate ||
            this.$store.state.currentTab === tabs.legalTrailerEdit
          "
          @click="
            () => {
              this.$store.state.currentTab = tabs.legalCars;
            }
          "
        >
          <img src="@/assets/icons/car.svg" alt="" />
          <span class="value">Машины</span>
        </div>

        <!-- Прицепы  -->
        <div
          :class="`row flex-row submenu ${
            this.$store.state.currentTab === tabs.legalTrailers ||
            this.$store.state.currentTab === tabs.legalTrailerCreate ||
            this.$store.state.currentTab === tabs.legalTrailerEdit
              ? 'active'
              : ''
          }`"
          v-if="
            this.$store.state.currentTab === tabs.legalData ||
            this.$store.state.currentTab === tabs.legalDrivers ||
            this.$store.state.currentTab === tabs.legalDriverCreate ||
            this.$store.state.currentTab === tabs.legalDriverEdit ||
            this.$store.state.currentTab === tabs.legalCars ||
            this.$store.state.currentTab === tabs.legalCarCreate ||
            this.$store.state.currentTab === tabs.legalCarEdit ||
            this.$store.state.currentTab === tabs.legalTrailers ||
            this.$store.state.currentTab === tabs.legalTrailerCreate ||
            this.$store.state.currentTab === tabs.legalTrailerEdit
          "
          @click="
            () => {
              this.$store.state.currentTab = tabs.legalTrailers;
            }
          "
        >
          <img src="@/assets/icons/trailer.svg" alt="" />
          <span class="value">Прицепы</span>
        </div>

        <!-- (E-permit) -->
        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.ePermitHistory ||
            this.$store.state.currentTab === tabs.ePermitCreate
              ? 'active'
              : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.ePermitHistory;
            }
          "
        >
          <svg
            class="icon"
            width="21"
            height="23"
            viewBox="0 0 21 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 9V6.5C19.5 4.29086 17.7091 2.5 15.5 2.5H5.5C3.29086 2.5 1.5 4.29086 1.5 6.5V17C1.5 19.2091 3.29086 21 5.5 21H7.5M6.5 1V4M14.5 1V4M10.5 21L13.5608 20.1274C13.7249 20.0806 13.8743 19.9928 13.995 19.8721L19.0098 14.8573C19.6634 14.2037 19.6634 13.1439 19.0098 12.4902C18.3561 11.8366 17.2963 11.8366 16.6427 12.4902L11.6279 17.505C11.5072 17.6257 11.4194 17.7751 11.3726 17.9392L10.5 21Z"
              stroke="#28303F"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span class="value">Заявка на Дозвол (E-permit)</span>
        </div>

        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.loadPermissionTab
              ? 'active'
              : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.loadPermissionTab;
            }
          "
        >
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 10V7.5C21.5 5.29086 19.7091 3.5 17.5 3.5H7.5C5.29086 3.5 3.5 5.29086 3.5 7.5V18C3.5 20.2091 5.29086 22 7.5 22H9.5M8.5 2V5M16.5 9H8.5M14.5 13H8.5M10.5 17H8.5M16.5 2V5M12.5 22L15.5608 21.1274C15.7249 21.0806 15.8743 20.9928 15.995 20.8721L21.0098 15.8573C21.6634 15.2037 21.6634 14.1439 21.0098 13.4902C20.3561 12.8366 19.2963 12.8366 18.6427 13.4902L13.6279 18.505C13.5072 18.6257 13.4194 18.7751 13.3726 18.9392L12.5 22Z"
              stroke="#28303F"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span class="value">{{
            $t("online_application_navbar.load_permission_tab")
          }}</span>
        </div>

        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.unloadPermissionTab
              ? 'active'
              : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.unloadPermissionTab;
            }
          "
        >
          <svg
            class="icon"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 10V7.5C21.5 5.29086 19.7091 3.5 17.5 3.5H7.5C5.29086 3.5 3.5 5.29086 3.5 7.5V18C3.5 20.2091 5.29086 22 7.5 22H9.5M8.5 2V5M16.5 2V5M9.5 11L11.2528 12.4023C11.6707 12.7366 12.2777 12.6826 12.6301 12.2799L15.5 9M12.5 22L15.5608 21.1274C15.7249 21.0806 15.8743 20.9928 15.995 20.8721L21.0098 15.8573C21.6634 15.2037 21.6634 14.1439 21.0098 13.4902C20.3561 12.8366 19.2963 12.8366 18.6427 13.4902L13.6279 18.505C13.5072 18.6257 13.4194 18.7751 13.3726 18.9392L12.5 22Z"
              stroke="#28303F"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="value">{{
            $t("online_application_navbar.unload_permission_tab")
          }}</span>
        </div>

        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.onlineApplicationTab
              ? 'active'
              : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.onlineApplicationTab;
            }
          "
        >
          <svg
            class="icon"
            width="21"
            height="23"
            viewBox="0 0 21 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 9V6.5C19.5 4.29086 17.7091 2.5 15.5 2.5H5.5C3.29086 2.5 1.5 4.29086 1.5 6.5V17C1.5 19.2091 3.29086 21 5.5 21H7.5M6.5 1V4M14.5 1V4M10.5 21L13.5608 20.1274C13.7249 20.0806 13.8743 19.9928 13.995 19.8721L19.0098 14.8573C19.6634 14.2037 19.6634 13.1439 19.0098 12.4902C18.3561 11.8366 17.2963 11.8366 16.6427 12.4902L11.6279 17.505C11.5072 17.6257 11.4194 17.7751 11.3726 17.9392L10.5 21Z"
              stroke="#28303F"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span class="value">{{
            $t("online_application_navbar.online_application_tab")
          }}</span>
        </div>

        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.historyTab ? 'active' : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.historyTab;
            }
          "
        >
          <svg
            class="icon"
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 1V4M6.5 1V4M13 14.5L14 15.5M5.5 21H15.5C17.7091 21 19.5 19.2091 19.5 17V6.5C19.5 4.29086 17.7091 2.5 15.5 2.5H5.5C3.29086 2.5 1.5 4.29086 1.5 6.5V17C1.5 19.2091 3.29086 21 5.5 21ZM13.5 12C13.5 13.6569 12.1569 15 10.5 15C8.84315 15 7.5 13.6569 7.5 12C7.5 10.3431 8.84315 9 10.5 9C12.1569 9 13.5 10.3431 13.5 12Z"
              stroke="#28303F"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span class="value">{{ $t("history_tab.title") }}</span>
        </div>

        <div
          :class="`row flex-row ${
            this.$store.state.currentTab === tabs.changePasswordTab
              ? 'active'
              : ''
          }`"
          @click="
            () => {
              this.$store.state.currentTab = tabs.changePasswordTab;
            }
          "
        >
          <svg
            class="icon"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2439 13.7206L18.6043 13.3289V13.3289L19.2439 13.7206ZM18.2894 15.2794L18.929 15.6711V15.6711L18.2894 15.2794ZM1.75609 6.27942L1.11648 5.88775H1.11648L1.75609 6.27942ZM2.71064 4.72057L3.35025 5.11223L2.71064 4.72057ZM5.31852 4.06172L5.6771 3.403L5.6771 3.403L5.31852 4.06172ZM2.45487 8.73826L2.09629 9.39699H2.09629L2.45487 8.73826ZM15.6815 15.9383L15.3229 16.597L15.3229 16.597L15.6815 15.9383ZM18.5451 11.2617L18.1866 11.9204V11.9205L18.5451 11.2617ZM2.71064 15.2794L2.07103 15.6711L2.07103 15.6711L2.71064 15.2794ZM1.75609 13.7206L2.3957 13.3289L2.3957 13.3289L1.75609 13.7206ZM18.2894 4.72058L18.929 4.32892V4.32892L18.2894 4.72058ZM19.2439 6.27943L18.6043 6.67109V6.67109L19.2439 6.27943ZM18.5451 8.73828L18.9037 9.397L18.5451 8.73828ZM15.6815 4.06174L16.0401 4.72046V4.72046L15.6815 4.06174ZM2.45487 11.2617L2.81345 11.9205H2.81345L2.45487 11.2617ZM5.31851 15.9383L4.95994 15.2795L4.95993 15.2795L5.31851 15.9383ZM15.58 4.11698L15.2214 3.45825L15.58 4.11698ZM5.42 4.11697L5.06142 4.77569L5.06142 4.77569L5.42 4.11697ZM15.58 15.883L15.9386 15.2243L15.9386 15.2243L15.58 15.883ZM5.42 15.883L5.77858 16.5418L5.77858 16.5418L5.42 15.883ZM9.54545 1.75H11.4545V0.25H9.54545V1.75ZM11.4545 18.25H9.54545V19.75H11.4545V18.25ZM9.54545 18.25C8.86311 18.25 8.38635 17.7389 8.38635 17.2H6.88635C6.88635 18.6493 8.11906 19.75 9.54545 19.75V18.25ZM12.6136 17.2C12.6136 17.7389 12.1369 18.25 11.4545 18.25V19.75C12.8809 19.75 14.1136 18.6493 14.1136 17.2H12.6136ZM11.4545 1.75C12.1369 1.75 12.6136 2.26107 12.6136 2.8H14.1136C14.1136 1.35071 12.8809 0.25 11.4545 0.25V1.75ZM9.54545 0.25C8.11906 0.25 6.88635 1.35071 6.88635 2.8H8.38635C8.38635 2.26107 8.86311 1.75 9.54545 1.75V0.25ZM18.6043 13.3289L17.6498 14.8878L18.929 15.6711L19.8835 14.1122L18.6043 13.3289ZM2.3957 6.67108L3.35025 5.11223L2.07103 4.32891L1.11648 5.88775L2.3957 6.67108ZM3.35025 5.11223C3.65889 4.6082 4.38055 4.40506 4.95993 4.72045L5.6771 3.403C4.43027 2.72428 2.81676 3.11109 2.07103 4.32891L3.35025 5.11223ZM2.81345 8.07954C2.25746 7.77688 2.1043 7.14696 2.3957 6.67108L1.11648 5.88775C0.353518 7.13373 0.826062 8.70553 2.09629 9.39699L2.81345 8.07954ZM17.6498 14.8878C17.3411 15.3918 16.6195 15.5949 16.0401 15.2795L15.3229 16.597C16.5697 17.2757 18.1832 16.8889 18.929 15.6711L17.6498 14.8878ZM19.8835 14.1122C20.6465 12.8663 20.1739 11.2945 18.9037 10.603L18.1866 11.9205C18.7425 12.2231 18.8957 12.853 18.6043 13.3289L19.8835 14.1122ZM3.35025 14.8878L2.3957 13.3289L1.11648 14.1122L2.07103 15.6711L3.35025 14.8878ZM17.6498 5.11225L18.6043 6.67109L19.8835 5.88777L18.929 4.32892L17.6498 5.11225ZM18.6043 6.67109C18.8957 7.14697 18.7425 7.77689 18.1866 8.07955L18.9037 9.397C20.1739 8.70554 20.6465 7.13374 19.8835 5.88777L18.6043 6.67109ZM16.0401 4.72046C16.6195 4.40507 17.3411 4.60822 17.6498 5.11225L18.929 4.32892C18.1832 3.1111 16.5697 2.72429 15.3229 3.40301L16.0401 4.72046ZM2.3957 13.3289C2.1043 12.853 2.25746 12.2231 2.81345 11.9205L2.09629 10.603C0.82606 11.2945 0.353517 12.8663 1.11648 14.1122L2.3957 13.3289ZM2.07103 15.6711C2.81675 16.8889 4.43027 17.2757 5.6771 16.597L4.95993 15.2795C4.38055 15.5949 3.65889 15.3918 3.35025 14.8878L2.07103 15.6711ZM15.9386 4.7757L16.0401 4.72046L15.3229 3.40301L15.2214 3.45825L15.9386 4.7757ZM4.95993 4.72045L5.06142 4.77569L5.77858 3.45824L5.6771 3.403L4.95993 4.72045ZM16.0401 15.2795L15.9386 15.2243L15.2214 16.5417L15.3229 16.597L16.0401 15.2795ZM5.06142 15.2243L4.95994 15.2795L5.67709 16.597L5.77858 16.5418L5.06142 15.2243ZM2.09629 9.39699C2.57404 9.65705 2.57404 10.3429 2.09629 10.603L2.81345 11.9205C4.33498 11.0922 4.33498 8.90779 2.81345 8.07954L2.09629 9.39699ZM5.77858 16.5418C6.27798 16.2699 6.88635 16.6314 6.88635 17.2H8.38635C8.38635 15.4934 6.56035 14.4084 5.06142 15.2243L5.77858 16.5418ZM14.1136 17.2C14.1136 16.6314 14.722 16.2699 15.2214 16.5417L15.9386 15.2243C14.4397 14.4083 12.6136 15.4934 12.6136 17.2H14.1136ZM18.9037 10.603C18.426 10.3429 18.426 9.65706 18.9037 9.397L18.1866 8.07955C16.665 8.9078 16.665 11.0922 18.1866 11.9204L18.9037 10.603ZM5.06142 4.77569C6.56035 5.59165 8.38635 4.50663 8.38635 2.8H6.88635C6.88635 3.3686 6.27798 3.7301 5.77858 3.45824L5.06142 4.77569ZM15.2214 3.45825C14.722 3.73011 14.1136 3.36861 14.1136 2.8H12.6136C12.6136 4.50663 14.4397 5.59166 15.9386 4.7757L15.2214 3.45825ZM12.75 10C12.75 11.2426 11.7426 12.25 10.5 12.25V13.75C12.5711 13.75 14.25 12.0711 14.25 10H12.75ZM10.5 12.25C9.25737 12.25 8.25001 11.2426 8.25001 10H6.75001C6.75001 12.0711 8.42894 13.75 10.5 13.75V12.25ZM8.25001 10C8.25001 8.75736 9.25737 7.75 10.5 7.75V6.25C8.42894 6.25 6.75001 7.92893 6.75001 10H8.25001ZM10.5 7.75C11.7426 7.75 12.75 8.75736 12.75 10H14.25C14.25 7.92893 12.5711 6.25 10.5 6.25V7.75Z"
              fill="#28303F"
            />
          </svg>
          <span class="value">{{
            $t("online_application_navbar.change_password_tab")
          }}</span>
        </div>

        <div class="row flex-row" @click="this.$store.state.logout">
          <svg
            class="icon"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5 9H12.5M5.5 17C3.29086 17 1.5 15.2091 1.5 13V5C1.5 2.79086 3.29086 1 5.5 1M5.5 17C7.70914 17 9.5 15.2091 9.5 13V5C9.5 2.79086 7.70914 1 5.5 1M5.5 17H13.5C15.7091 17 17.5 15.2091 17.5 13M5.5 1H13.5C15.7091 1 17.5 2.79086 17.5 5"
              stroke="#28303F"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span class="value">{{
            $t("online_application_navbar.logout")
          }}</span>
        </div>
      </div>
      <Component :is="activeTab"></Component>
    </div>
</div>
</template>