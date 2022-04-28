<template>
  <div class="wrapper">
    <div class="search">
        <div class="search__back iconfont"
            @click="handleBackClick"
        >&#xe6db;</div>
    </div>
    <h4>购物车页面(未完成)</h4>
  </div>
</template>

<script>
import { useRouter} from 'vue-router'

//点击返回上一页
const useBackRouterEffect = () => {
    const router = useRouter()
    const handleBackClick = () => {
        router.back()
  }
  return handleBackClick
}

export default {
  name: 'CartList',
  setup(){      
   const handleBackClick = useBackRouterEffect()
      
       return{
            handleBackClick
        }
        
    }
}
</script>

<style lang="scss" scoped>
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
   
}
</style>