<template>
    <div class="not_found_page flex-row">
        <h1 class="title">{{ $t('not_found_page.title') }}</h1>
    </div>
</template>

<style scoped>
.title{
    width: 100%;
    font-family: 'GilroyBold', sans-serif;
    text-align: center;
    font-size: 25px;
    text-transform: uppercase;
    color: var(--text_black_default);
}

@media(max-width: 424px){
    .title{
        font-size: 20px;
    }
}
</style>

<script>
export default {
    mounted(){
        this.$store.state.currentTitle = this.$t('not_found_page.title')
    }
}
</script>