<template>
    <form @submit.prevent="payloadSubmit" class="change_pass_container container_box_shadow flex-column">
        <h2 class="title">{{ $t('change_password_tab.title') }}</h2>
        <!-- <span class="confirmation_sent_text">На указанную вами почту было отправлено письмо с кодом подтверждения</span> -->

        <div class="input_block">
            <div class="label_input_block">
                <label for="">{{ $t('change_password_tab.old_password') }}</label>
                
                <div :class="`input_wrapper ${validation_obj.old_passwd.val_status}`">
                    <input class="form_box_shadow" v-model="payload_obj.old_passwd" type="password">
                    <span class="validation_msg">{{ validation_obj.old_passwd.val_msg }}</span>
                    <ExclamationCircle />
                </div>
            </div>
            
            <div class="label_input_block">
                <label for="">{{ $t('change_password_tab.new_password') }}</label>
                <div :class="`input_wrapper ${validation_obj.passwd.val_status}`">
                    <input class="form_box_shadow" type="password" v-model="payload_obj.passwd">
                    <span class="validation_msg">{{ validation_obj.passwd.val_msg }}</span>
                    <ExclamationCircle />
                </div>
                
            </div>
            <div class="label_input_block">
                <label for="">{{ $t('change_password_tab.password_confirmation') }}</label>
                 <div :class="`input_wrapper ${validation_obj.passwd_confirmation.val_status}`">
                    <input class="form_box_shadow" type="password" v-model="payload_obj.passwd_confirmation">
                    <span class="validation_msg">{{ validation_obj.passwd_confirmation.val_msg }}</span>
                    <ExclamationCircle />
                </div>
            </div>
        </div>

        <div class="submit_button_box flex-row">
            <button class="submit_button" type="submit">{{ $t('change_password_tab.submit_button') }}</button>
        </div>

    </form>
    <PopupWindow v-if="this.$store.state.popupShow" :title="popupText.current.title" :message="popupText.current.message" :buttonText="popupText.current.buttonText" />
</template>

<script>
import ExclamationCircle from '@/components/icons/ExclamationCircle.vue'
import PopupWindow from '@/components/online_application/PopupWindow.vue'

export default {
    components: {
    ExclamationCircle, PopupWindow
  },
  data(){
    return {
        payload_obj: {
            old_passwd: '',
            passwd: '',
            passwd_confirmation: ''
        },
        validation_obj: {
            old_passwd: {val_status: '', val_msg: ''},
            passwd: {val_status: '', val_msg: ''},
            passwd_confirmation: {val_status: '', val_msg: ''},
        },

        popupText: {
            success: {
                title: 'Пароль обновлен',
                message: 'Ваш пароль успешно обновлен',
                buttonText: 'OK'
            },
            failure: {
                title: 'Пароль не обновлен',
                message: 'Пожалуйста убедитесь что ваши данные верны',
                buttonText: 'OK'
            } ,
            current: {
                title: '',
                message: '',
                buttonText: ''
            }
        }
        
    }
  },
  mounted() {
    this.$store.state.popupShow = false
  },
  methods:{
    payloadSubmit(){
        this.$store.state.preLoader = true

        Object.keys(this.validation_obj).forEach((key)=> {
                        this.validation_obj[key].val_status = '';
                        this.validation_obj[key].val_msg = '';
                    }) 

        window.axios.post(this.$store.state.backendRoutes.changePasswdTab, this.payload_obj).then((res) => {
            if(res.data.status == 'success'){
                this.popupText.current = this.popupText.success
                this.payload_obj =  {old_passwd: '', passwd: '',passwd_confirmation: ''}
            } else if(res.data.status == 'invalid_credentials'){
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