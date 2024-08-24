<template>
    <div :class="`profile_button_container flex-column ${profileShow}`" @click="()=>{profileShow != 'active' ? profileShow = 'active': profileShow = ''}">
        <div class="inner_wrapper flex-row">
          <div class="name_icon_wrapper flex-row">
            <img class="user_icon" src="@/assets/icons/no-avatar.svg" alt="user" width="40">
            <span class="user_name">{{ $store.state.currentUserName }}</span> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron_down feather feather-chevron-down svg-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
        </div>
        <div class="dropdown_list_container flex-column">
          <router-link :to="{name:'online_application_page',}" @click="()=>{ this.$store.state.currentTab = 'profileTab'}" class="list_row flex-row" >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="17.5" rx="7" ry="3.5" stroke="#28303F" stroke-width="1.5" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="#28303F" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            <div class="text_wrapper">
              <span>{{ $t('initial_tab.dashboard') }}</span>
            </div>
          </router-link>
          <div class="list_row flex-row" @click="this.$store.state.logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-power svg-icon mr-2 ml-1">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
            <div class="text_wrapper">
              <span>{{ $t('online_application_navbar.logout') }}</span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            profileShow: ''
        }
    },
    
}
</script>