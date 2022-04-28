<template>
    <div class="wrapper">
        <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
        <div class="wrapper__input">
            <input class="wrapper__input__content" 
            type="text" 
            placeholder="请输入用户名"
            v-model="username"
            >
        </div>
        <div class="wrapper__input">
            <input class="wrapper__input__content" 
            type="password" 
            placeholder="请输入密码"
            v-model="password"
            >
        </div>
        <div class="wrapper__input">
            <input class="wrapper__input__content" 
            type="password" 
            placeholder="确认密码"
            v-model="ensuerment"
            >
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登陆</div>
        <Toast v-if="show" :message="toastMessage"/>
    </div>
</template>

<script>
import { reactive,toRefs} from 'vue';
import { useRouter } from 'vue-router';
import { post } from '../../utils/request'
import Toast,{useToastEffect} from '../../components/Toast'

//处理注册相关逻辑
const useRegisterEffect=(showToast)=>{
    const router = useRouter();
    const data = reactive({
            username:'',
            password:'',
            ensuerment:''
        });
    const handleRegister = async () => {
        try {
            const result = await post('/api/user/register', {
            username: data.username,
            password: data.password,
            
            })
            if (result?.errno === 0) {
                router.push({ name: 'Login' })
            } else {
                 showToast('注册失败')
                }
            } catch (e) {
                showToast('请求失败')
                }
        }

    const {username,password,ensuerment}=toRefs(data)
    return{username,password,ensuerment,handleRegister}

}

//处理登录跳转
 const useLoginEffect= () => {
    const router = useRouter();
   const handleLoginClick=()=>{
            router.push({name:'Login'})
        }
        return{
            handleLoginClick
        }
}



export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Register',
    components:{
        Toast
    },
    setup(){
        const {show, toastMessage,showToast}=useToastEffect();
        const {username,password,ensuerment,handleRegister}=useRegisterEffect(showToast)
        const{handleLoginClick}=useLoginEffect();
        return{
            show, toastMessage,
            handleLoginClick,
            username,password,ensuerment,
            handleRegister
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
    position: absolute;
    top:50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img{
        display: block;
        margin: 0 auto .4rem auto;
        width: 0.66rem;
        height: 0.66rem;
    }
    &__input{
        box-sizing: border-box;
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        padding: 0 .16rem;
        background: #f9f9f9;
        border: .01rem solid rgba(0,0,0,0.10);
        border-radius: .06rem;
        border-radius: .06rem;
        &__content{
            line-height: .45rem;
            border: none;
            outline: none;
            width: 100%;
            background: none;
            font-size: .16rem;
            color: $content-notice-fontcolor;
            &::placeholder{
                color: $content-notice-fontcolor;
            }
        }
    }
    &__register-button{
        line-height: .48rem;
        font-size: .16rem;
        text-align: center;
        margin: .20rem .4rem .16rem .4rem;
        background: #0091ff;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,.32);
        border-radius: .04rem;
        border-radius: .04rem;
        color: $bgColor;

    }
    &__register-link{
        text-align: center;
        margin-top: .16rem;
        color: $content-notice-fontcolor;
    }
}
</style>