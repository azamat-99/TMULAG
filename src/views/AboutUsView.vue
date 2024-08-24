<template>
    <div class="about_us_page flex-column">
      <AboutUsSection />
        <div class="inner_wrapper flex-column">
          <div class="lower_column flex-column">
              <p v-html="$t('about_us_page.p_1')"></p>
              <p v-html="$t('about_us_page.p_2')"></p>
              <ul>
                  <li>{{ $t('about_us_page.li_1') }}</li>
                  <li>
                     {{ $t('about_us_page.li_2') }}
                  </li>
                  <li>{{ $t('about_us_page.li_3') }}</li>
                  <li>
                      {{ $t('about_us_page.li_4') }}
                  </li>
                  <li>{{ $t('about_us_page.li_5') }}</li>
                  <li>
                      {{ $t('about_us_page.li_6') }}
                  </li>
                  <li>
                      {{ $t('about_us_page.li_7') }}
                  </li>
                  <li>
                      {{ $t('about_us_page.li_8') }}
                  </li>
                  <li>
                      {{ $t('about_us_page.li_9') }}
                  </li>
                  <li>
                      {{ $t('about_us_page.li_10') }}
                  </li>
                  <li>
                      {{ $t('about_us_page.li_11') }}
                  </li>
                  <li>{{ $t('about_us_page.li_12') }}</li>
                  <li>{{ $t('about_us_page.li_13') }}</li>
                  <li>{{ $t('about_us_page.li_14') }}</li>
              </ul>
          </div>

        </div>
        <FeedbackBanner />
    </div>
</template>

<script>
import FeedbackBanner from '@/components/FeedbackBanner.vue'
import AboutUsSection from '@/components/AboutUsSection.vue'

export default {
  
  components: {
    FeedbackBanner,AboutUsSection
  },
  mounted(){
    this.$store.state.currentTitle = this.$t('topbar.about_us_page')
    window.axios.get(this.$store.state.backendRoutes.aboutUsPage).catch(()=>{});
  }
}
</script>
