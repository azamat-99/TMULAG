<template>
    <div class="single_news_page flex-row">
        <div class="inner_wrapper flex-row">

            <div class="news_content_column flex-column">
                <div class="breadcrumbs_row flex-row">
                    <span>
                        <router-link class="hover-orange" :to="{name: 'main_page'}">{{ $t('topbar.main_page') }} </router-link> >
                        <router-link class="hover-orange" :to="{name: 'news_page', params: {pageId:1},}">{{ $t('topbar.news_page') }}</router-link> >
                        {{ this.selectedNews[`title_${this.$i18n.locale}`] }}
                        </span>
                </div>

                <div class="image_wrapper flex-row">
                  <img :src="this.selectedNews.poster" alt="">
                </div>
                <div class="date_row flex-row">
                  <span class="date">{{ formatDate(this.selectedNews.created_at) }}</span>
                  <div class="views_wrapper flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                    <span class="views">{{ this.selectedNews.views }}</span>
                  </div>
                </div>
                <h3 class="title">{{ this.selectedNews[`title_${this.$i18n.locale}`] }}</h3>
                <div class="content_wrapper" v-html="this.selectedNews[`description_${this.$i18n.locale}`]"></div>

            </div>

            <div class="nav_column flex-column">
                <h3 class="title">{{ $t('single_news_page.similar_news') }}</h3>

                <router-link v-for="news in selectedNews.related_news" :key="news.id" :to="{name: 'single_news_page', params: {id : news.id},}"
                 @click="relatedNewsSelected(news.id)" class="news_link flex-column" >
                    <span class="date">{{ formatDate(news.created_at) }}</span>
                    <span class="title">{{ news[`title_${this.$i18n.locale}`] }}</span>
                </router-link>

            </div>

        </div>

    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SingleNewsView',
  data () {
    return {
      selectedNews: {},
      backendRoutes: this.$store.state.backendRoutes
    }
  },
  mounted() {
    this.$store.state.preLoader = true
    this.$store.state.currentTitle = this.$t('topbar.news_page')

    window.axios.get(`${this.backendRoutes.newsSingle}/${this.$route.params.id}`, {
      responseType: 'json'
    }).then((res) => {
      this.selectedNews = res.data
      this.selectedNews.poster = `${this.$store.state.backendRoot}/online/${res.data.poster}`
    }).catch((err) => {
      console.error(err.message)
    }).finally(() => {
      this.$store.state.preLoader = false
    })
  },

  methods: {
    formatDate (dateStr) {
      return moment(dateStr).format('DD.MM.YYYY')
    },
    relatedNewsSelected (newsId) {
      const selectedNews = this.selectedNews.related_news.find((news) => { // Find method iterates through array until it finds the right value, i.e until the expression returns true
        return news.id === parseInt(newsId) // if the value is not found it'll return undefined
      })
      this.selectedNews.poster = `${this.$store.state.backendRoot}/online/${selectedNews.poster}`
      this.selectedNews.title_tm = selectedNews.title_tm
      this.selectedNews.description_tm = selectedNews.description_tm
    }
  }
}
</script>
