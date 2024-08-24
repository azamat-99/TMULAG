<template>
  <div id="news_anchor"></div>
  <div class="news_sec_main flex-row" id="news_sec_news_page">
    <div class="inner_wrapper">
      <span class="background_text">{{ $t('topbar.news_page') }}</span>

      <router-link :to="{name: 'news_page'}" class="title_row flex-row">
        <h2 class="title">{{ $t('topbar.news_page') }}</h2>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.7 13.2L9.7 19.2C9.5 19.4 9.3 19.5 9 19.5C8.7 19.5 8.5 19.4 8.3 19.2C7.9 18.8 7.9 18.2 8.3 17.8L13.6 12.5L8.3 7.2C7.9 6.8 7.9 6.2 8.3 5.8C8.7 5.4 9.3 5.4 9.7 5.8L15.7 11.8C16.1 12.2 16.1 12.8 15.7 13.2Z" fill="var(--hover_color)"/>
        </svg>
        
      </router-link>

      <div class="news_block flex-row">
        <NewsContainer v-for="news in newsAll" :key="news.id" :news_obj="news" />
      </div>

      <div class="pagination_row flex-row">
        <router-link :to="{name: 'news_page', params:{pageId: this.prev_page},}" @click="updatePagination(this.prev_page)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </router-link>

        <div class="pages_block flex-row">
          <router-link v-for="element in this.paginationArray" :to="{name: 'news_page', params:{pageId: element},}" 
          @click="updatePagination(element)" :key="element" class="pagination_button">
            <span>{{ element }}</span>
          </router-link>
        </div>

        <router-link :to="{name: 'news_page', params:{pageId: this.next_page},}" 
          @click="updatePagination(this.next_page)" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import NewsContainer from '@/components/NewsContainer.vue'

export default {
  name: 'NewsView',
  components: {
    NewsContainer
  },
  data () {
    return {
      newsAll: null,
      pagesCount: 1,
      paginationArray: [],
      backendRoutes: this.$store.state.backendRoutes,
      news_per_page: 12,
      prev_page: this.$route.params.pageId > 1 ? this.$route.params.pageId-1 : this.$route.params.pageId,
      next_page: this.$route.params.pageId < this.pagesCount ? parseInt(this.$route.params.pageId)+1 : this.$route.params.pageId
    }
  },
  mounted () {
    this.$store.state.preLoader = true
    this.$store.state.currentTitle = this.$t('topbar.news_page')

    window.axios.get(`${this.backendRoutes.newsAll}/${this.$route.params.pageId}`, {
      responseType: 'json'
    }).then(async (res) => {
      this.newsAll = res.data.news
      this.pagesCount = Math.ceil(parseInt(res.data.news_count) / this.news_per_page)
      this.paginationArray = await this.$store.dispatch('paginate', { currentPage: this.$route.params.pageId, pagesTotal: this.pagesCount })
    }).catch(this.$store.state.axiosCatch)
    .finally(() => {
      this.$store.state.preLoader = false
    })
  },

  methods: {
    async updatePagination (currentPage) {
      this.$store.state.preLoader = true

      this.prev_page = currentPage > 1 ? currentPage - 1 : currentPage
      this.next_page = currentPage < this.pagesCount ? parseInt(currentPage)+1 : currentPage
      
      window.axios.get(`${this.backendRoutes.newsAll}/${currentPage}`, {
        responseType: 'json'
      }).then((res) => {
        this.newsAll = res.data.news
        this.pagesCount = Math.ceil(parseInt(res.data.news_count) / this.news_per_page)
      }).catch(this.$store.state.axiosCatch).finally(() => {
        this.$store.state.preLoader = false
      })
      this.paginationArray = await this.$store.dispatch('paginate', { currentPage: currentPage, pagesTotal: this.pagesCount })
    }
  }
}
</script>
