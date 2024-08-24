<template>
  <div class="history_container container_box_shadow">
    <div class="inner_wrapper">
      <div class="epermite_head">
        <h2 class="title">История Дозвола (E-permit)</h2>
        <span
          class="createEPermit"
          @click="this.$props.changeTab(this.$props.tabs.ePermitCreate)"
        >
          Создание Заявки
        </span>
      </div>
      <div class="table_block">
        <div class="header_row flex-row">
          <span class="w20">Страна назначения</span>
          <span class="w20">Дата отъезда</span>
          <span class="w20">Дата возврата</span>
          <span class="w20">Статус</span>
        </div>

        <div
          class="content_row flex-row"
          v-for="el in this.permits"
          :key="el.id"
        >
          <span class="w20">{{ el.country }}</span>
          <span class="w20">{{ el.departureDate }}</span>
          <span class="w20">{{ el.returnDate }}</span>
          <span class="w20">{{ el.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    changeTab: "",
    tabs: {},
  },

  data() {
    return {
      permits: [],
    };
  },

  mounted() {
    this.$store.state.preLoader = true;

    window.axios
      .get(`${this.$store.state.backendRoutes.ePermits}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        this.permits = res.data.data.permits;
      })
      .catch(this.$store.state.axiosCatch)
      .finally(() => {
        this.$store.state.preLoader = false;
      });
  },
};
</script>
