<template>
    <div class="about_us_section flex-column">
    <div class="inner_wrapper">
      <span class="background_text" v-html="$t('main_page.about_us_sec.background_text')"></span>
      <h2 class="section_header">{{ $t('topbar.about_us_page') }}</h2>

      <div class="section_content flex-row">
        <div class="text_block flex-column">
          <p v-html="$t('main_page.about_us_sec.text_1')"></p>
          <p v-html="$t('main_page.about_us_sec.text_1')"></p>
          <router-link :to="{name:'about_us_page'}" class="default-link-button hover-orange-darker" v-if="this.$route.path === '/'">{{ $t('main_page.details_button') }}</router-link>
        </div>

        <div class="images_block flex-row">
          <div class="image_wrapper img_gray_effect">
            <img src="@/assets/images/about_us_img_1.jpg" alt="">
          </div>
          <div class="image_wrapper img_gray_effect">
            <img src="@/assets/images/about_us_img_2.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
