<template>
  <div class="lang_icons flex-column" >
    <img :src="require(`@/assets/icons/${this.$store.state.current_lang}.png`)" alt="">
    <ul class="flex-column" id="langs_container" @mouseleave="mouseLeft">
      <li><img :src="require(`@/assets/icons/${this.$store.state.current_lang}.png`)" alt=""></li>
      <li v-for="(lang, index) in this.$store.state.langs_list" :key="index" @click="changeLang(lang)">
        <img :src="require(`@/assets/icons/${lang}.png`)" alt="">
      </li>

      <!-- <li><img src="@/assets/icons/en.png" alt=""></li> -->
    </ul>
    <ul id="langs_container_hamburger">
      <li v-for="(lang, index) in langs_list_hamburger" :key="index" :class="`${lang == this.$store.state.current_lang ? 'active' : ''}`" @click="changeLangHamburger(lang)">
        <img :src="require(`@/assets/icons/${lang}.png`)" alt="">
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  data(){
    return {
      langs_list_hamburger: ['tm', 'ru', 'en'],
    }
  },
  mounted(){
    if(localStorage.getItem('lang') && this.$store.state.langs_list.includes(localStorage.getItem('lang'))){
      this.$store.state.current_lang = localStorage.getItem('lang')
    }
    this.$i18n.locale = this.$store.state.current_lang;
    if(this.$store.state.langs_list.includes(this.$store.state.current_lang)){
      this.$store.state.langs_list.splice(this.$store.state.langs_list.indexOf(this.$store.state.current_lang), 1)   //Removing the current lang from the list
    }
  },
  methods: {
    changeLang(lang){
      const langs_container = document.querySelector('#langs_container')

      langs_container.style.opacity = '0'
      langs_container.style.visibility = 'hidden'

      this.$store.state.current_lang = lang
      localStorage.setItem('lang', lang)
      this.$store.state.langs_list = ['tm', 'ru', 'en'].filter((element) => element != this.$store.state.current_lang)

      this.$i18n.locale = this.$store.state.current_lang;
    },

    changeLangHamburger(lang){

      this.$store.state.current_lang = lang
      localStorage.setItem('lang', lang)

      this.$i18n.locale = this.$store.state.current_lang;
    },

    mouseLeft(){
      const langs_container = document.querySelector('#langs_container')

      langs_container.style.opacity = ''
      langs_container.style.visibility = ''
    }
  }
}
</script>
