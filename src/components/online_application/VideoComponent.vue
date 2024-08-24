<template>
    <div class="video_container flex-row">
        <span class="watch_text">{{ $t('online_application_tab.video.title') }}</span>
        <button class="watch_button button-orange" @click="videoShowToggle">{{ $t('online_application_tab.video.watch_button') }}</button>
        <div :class="`video_wrapper flex-row ${videoWatch}`">
            <!-- <video src="@/assets/videos/ulaggozegchilik.mp4" id="tutorial_video" controls /> -->
            <svg @click="videoShowToggle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_icon bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            videoWatch: '',
        }
    },
    methods:{
        videoShowToggle(event){
            if(this.videoWatch === 'active'){
                this.videoWatch = ''
                document.getElementById('tutorial_video').pause()
            } else {
                this.videoWatch = 'active';
            } 
        }
    }
}
</script>