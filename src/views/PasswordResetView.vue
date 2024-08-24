<template>
    <div class="reset_page flex-row">

        <form @submit.prevent="confirmEmail" class="reset_form_container_1 container_box_shadow" v-if="!link_active">
            <h2 class="title">{{ $t('reset_page.tab_1.title') }}</h2>

            <div class="label_input_block ">
                <label>E-mail *</label>
                <div :class="`input_wrapper ${validation_obj.email.val_status}`">
                  <input class="form_box_shadow"  type="email" v-model="payload.email" required >
                  <span class="validation_msg">{{ validation_obj.email.val_msg }}</span>
                  <ExclamationCircle />
                </div>
            </div>

            <div class="login_button_block flex-column">
                <button class="login_button hover-orange-darker" type="submit">{{ $t('reset_page.tab_1.confirm') }}</button>
            </div>
            <p class="info_text" v-if="email_sent">{{ $t('reset_page.tab_1.info_text') }}</p>
        </form>

        <form @submit.prevent="submitNewPassword" class="reset_form_container_2 flex-column container_box_shadow" v-if="link_active">
            <div class="form_block">
                <h2 class="title">{{ $t('reset_page.tab_2.title') }}</h2>

                <div class="label_input_block ">
                    <label>{{ $t('reset_page.tab_2.new_password') }} *</label>
                    <div :class="`input_wrapper ${validation_obj.new_password.val_status}`">
                      <input class="form_box_shadow" v-model="payload.new_password" type="password" required >
                      <span class="validation_msg">{{ validation_obj.new_password.val_msg }}</span>
                      <ExclamationCircle />
                    </div>
                </div>

                <div class="label_input_block ">
                    <label>{{ $t('reset_page.tab_2.password_conf') }} *</label>
                    <div :class="`input_wrapper ${validation_obj.new_password_confirmation.val_status}`">
                      <input class="form_box_shadow" v-model="payload.new_password_confirmation" type="password" required >
                      <span class="validation_msg">{{ validation_obj.new_password_confirmation.val_msg }}</span>
                      <ExclamationCircle />
                    </div>
                </div>
            </div>

            <div class="login_button_block flex-column">
                <button class="login_button hover-orange-darker" type="submit">{{ $t('reset_page.tab_2.confirm') }}</button>
            </div>
        </form>
    </div>
    <PopupWindow v-if="this.$store.state.popupShow" :title="popupText.current.title" :message="popupText.current.message" :buttonText="popupText.current.buttonText" />
</template>

<script>
import ExclamationCircle from '@/components/icons/ExclamationCircle.vue'
import PopupWindow from '@/components/online_application/PopupWindow.vue'

export default {
    components: {
        ExclamationCircle, PopupWindow
    },

    mounted(){
        this.$store.state.preLoader = false
        this.$store.state.currentTitle = this.$t('reset_page.title')
    
        if(this.$route.params.link_code){
            this.link_active = true
            this.payload.phase = 2
            this.payload.user_id = this.$route.query.user_id
            this.payload.link_value = this.$route.params.link_code

            this.$store.state.preLoader = true
            window.axios.post(this.$store.state.backendRoutes.password_reset, this.payload).then((res) => {
                if(res.data.status == 'success'){
                    this.$store.state.preLoader = false
                } else if(res.data.status == 'failure'){
                    this.popupText.failure.message = 'reset_page.failure.invalid_link'
                    this.popupText.current = this.popupText.failure
                    this.$store.state.popupShow = true
                }
            }).catch(this.$store.state.axiosCatch).finally(() => {
                this.$store.state.preLoader = false
            })
        }

    },
    data(){
        return {
            link_active: false,
            email_sent: false,
            
            payload:{
                email: '',
                phase: 1,
                user_id: '',
                link_value: '',
                new_password: '',
                new_password_confirmation: ''
            },

            validation_obj: {
                email: {val_status: '', val_msg: ''},
                new_password: {val_status: '', val_msg: ''},
                new_password_confirmation: {val_status: '', val_msg: ''},
            },

            popupText: {
                
                failure: {
                    title: 'reset_page.failure.title',
                    message: 'reset_page.failure.message',
                    buttonText: 'reset_page.failure.buttonText',
                } ,
                success: {
                    title: 'reset_page.success.title',
                    message: 'reset_page.success.message',
                    buttonText: 'reset_page.success.buttonText'
                },
                current: {
                    title: '',
                    message: '',
                    buttonText: ''
                }
            }
            
        }
    },
    methods:{
        confirmEmail(){
            this.$store.state.preLoader = true

            Object.keys(this.validation_obj).forEach((key)=> {
                        this.validation_obj[key].val_status = '';
                        this.validation_obj[key].val_msg = '';
                    }) 

            window.axios.post(this.$store.state.backendRoutes.password_reset, this.payload).then((res) => {
                if(res.data.status == 'success'){
                    this.email_sent = true
                } else if(res.data.status == 'failure'){
                    this.popupText.failure.message = 'reset_page.failure.message',
                    this.popupText.current = this.popupText.failure
                    this.$store.state.popupShow = true
                }
            }).catch((res)=>{
                if(res.response.status == 422 && res.response.statusText == "Unprocessable Content"){
                    Object.keys(res.response.data.errors).forEach((key)=> {
                        this.validation_obj[key].val_status = 'is_invalid';
                        this.validation_obj[key].val_msg = res.response.data.errors[key][0];
                    }) 
                } else {
                    console.error(res)        
                }
                
            }).then().catch(this.$store.state.axiosCatch).finally(() => {
                      this.$store.state.preLoader = false
            })
        },

        submitNewPassword(){
            this.payload.phase = 3
            this.$store.state.preLoader = true

            window.axios.post(this.$store.state.backendRoutes.password_reset, this.payload).then((res) => {
                if(res.data.status == 'success'){
                    this.popupText.current = this.popupText.success
                    this.$store.state.authenticated = true
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', res.data.currentUserName)
                    this.$store.state.currentUserName = res.data.currentUserName
                } else if(res.data.status == 'failure'){
                    this.popupText.failure.message = 'reset_page.failure.message',
                    this.popupText.current = this.popupText.failure
                }
                this.$store.state.popupShow = true

            }).catch((res)=>{
                if(res.response.status == 422 && res.response.statusText == "Unprocessable Content"){
                    Object.keys(res.response.data.errors).forEach((key)=> {
                        this.validation_obj[key].val_status = 'is_invalid';
                        this.validation_obj[key].val_msg = res.response.data.errors[key][0];
                    }) 
                } else {
                    console.error(res)        
                }
                
            }).then().catch(this.$store.state.axiosCatch).finally(() => {
                      this.$store.state.preLoader = false
            })
        }
    }
}
</script>