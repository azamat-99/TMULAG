<template>
  <FeedbackBanner id="contacts_page" />
</template>

<script>
import FeedbackBanner from '@/components/FeedbackBanner.vue'
export default {
  components:{
    FeedbackBanner
  },

  mounted(){
    this.$store.state.currentTitle = this.$t('topbar.contacts_page')
    window.axios.get(this.$store.state.backendRoutes.contactsPage).catch(()=>{});
  }
}
</script>
