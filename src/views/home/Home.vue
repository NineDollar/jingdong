<template>
  <div class="wrapper">
    <StaticPart/>
    <Nearby/>
  </div>
  <Docker :currentIndex="0"/>
</template>

<script>
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    components:{
        StaticPart,
        Nearby,
        Docker
    }
}
</script>


<style lang="scss" scoped>
.wrapper{
  //纵向滚动
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 .18rem .1rem .18rem;
}
</style>
