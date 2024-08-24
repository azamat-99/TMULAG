<template>
  <div class="services_page flex-column">
    <div class="title_section">
      <div class="inner_wrapper flex-column">
        <span class="background_text">{{ $t('topbar.services_page') }}</span>
        <h2 class="title_text">{{ $t('topbar.services_page') }}</h2>
        <span class="desc_text">{{ $t('services_page.description') }}</span>
      </div>
    </div>

    <NavSectionMain />

    <FeedbackBanner />
  </div>
</template>

<script>
// @ is an alias to /src
import FeedbackBanner from '@/components/FeedbackBanner.vue'
import NavSectionMain from '@/components/NavSectionMain.vue'

export default {
  
  data () {
    return {
      backText1: 'Осуществляет выдачу разрешения для деятельности на территории Туркменистана',
      backText2: 'Предоставляет широкий спектр услуг для физических и юридических лиц',
      backText3: 'Ведет учет автотранспортных средств и соблюдения правил перевозки',

      frontTitle1: 'Разрешения',
      frontTitle2: 'Услуги',
      frontTitle3: 'Учет и контроль'
    }
  },
  components: {
    FeedbackBanner, NavSectionMain
  },
  mounted(){
    this.$store.state.currentTitle = this.$t('topbar.services_page')
    window.axios.get(this.$store.state.backendRoutes.services_page).catch(()=>{});
  }
}
</script>
