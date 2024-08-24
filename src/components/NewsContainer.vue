<template>
  <router-link :to="{name: 'single_news_page', params:{id:news_obj.id},}" class="news_container flex-column">
      <div class="news_content flex-column">
          <div class="image_container">
              <img :src="`${this.$store.state.backendRoot}/online/${news_obj.poster}`" alt="">
          </div>
          <span class="news_date">{{ formatDate(news_obj.created_at) }}</span>
          <h3 class="news_title">{{ news_obj[`title_${this.$i18n.locale}`]}}</h3>
          <p class="news_desc" v-html="news_obj[`description_${this.$i18n.locale}`]"></p>
      </div>
        

      <router-link :to="{name: 'single_news_page', params:{id:news_obj.id},}" class="link_button flex-row">
          <span class="hover-underline-orange">{{ $t('main_page.details_button') }}</span>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4019 14.9141L15.5 10.816M15.5 10.816L11.4019 9.71791M15.5 10.816L8.5718 14.816" stroke="var(--hover_color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12.0361" cy="12" r="10" stroke="var(--hover_color)" stroke-width="1.5"/>
              <path d="M14.4019 14.0981L15.5 10.0001M15.5 10.0001L11.4019 8.90199M15.5 10.0001L8.5718 14.0001" stroke="var(--hover_color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </router-link>
  </router-link>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    news_obj: Object
  },
  methods: {
    formatDate (dateStr) {
      return moment(dateStr).format('DD.MM.YYYY')
    }
  }
}
</script>