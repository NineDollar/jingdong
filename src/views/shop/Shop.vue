<template>
<div class="wrapper">
    <div class="search">
        <div class="search__back iconfont"
            @click="handleBackClick"
        >&#xe6db;</div>
        <div class="search__content">
            <span class="search__content__icon iconfont" >&#xe65c;</span>
            <input class="search__content__input" placeholder="请输入商品名称"/>
        </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
    <Content :shopName="item.name"/>
    <Cart />
</div>
    
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

//获取当前商铺信息
const useShopInfoEffect = () =>{
    const route = useRoute();
    const data = reactive({item:{}})
    const getItemData = async () => {
            // useRoute可以访问id
            const result = await get(`/api/shop/${route.params.id}`)
            if(result?.errno === 0 && result?.data){
                data.item = result.data
            }
        }
        const { item } = toRefs(data)
        return{item,getItemData}
}

//点击返回上一页
const useBackRouterEffect = () => {
    const router = useRouter()
    const handleBackClick = () => {
        router.back()
  }
  return handleBackClick
}



export default {
        // eslint-disable-next-line vue/multi-word-component-names
   name:'Shop',
    components:{ShopInfo,Content,Cart},
    setup(){
        
        const{item,getItemData} = useShopInfoEffect()
        const handleBackClick = useBackRouterEffect()
        getItemData()
        return{
            item,
            handleBackClick
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper{
    padding: 0 .18rem;
}
.search{
    margin: .16rem 0 .04rem 0;
    display: flex;
    line-height: 0.32rem;
    &__back{
        font-size: .24rem;
        width: 0.3rem;
        color: #b6b6b6;
    }
    &__content{
        display: flex;
        flex: 1;
        background: $search-bgColor;
        border-radius: .16rem;
        &__icon{
            width: 0.44rem;
            text-align: center;
            color: $search-fontColor;
        }
        &__input{
            width: 100%;
            padding-right:.2rem ;
            display: block;
            border: none;
            outline: none;
            background: none;
            height: 0.30rem;
            color: $content-fontcolor;
            &::placeholder{
                color: $content-fontcolor;
                font-size: .14rem;
            }
        }
    }
}
</style>
