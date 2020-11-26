<!-- 主页 -->
<style lang='scss' scoped>
  .h-menu {
    float: left;
    box-sizing: border-box;
    width: 200px;
    height: 100vh;
    overflow-y: auto;
    padding: 20px 10px;
    list-style: none;
    li {
      cursor: pointer;
      height: 40px;
    }
  }

  .main {
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;;
    padding: 20px;
  }
</style>
<template>
  <div class="root">
    <!-- 左边菜单 -->
    <ul class="h-menu">
      <li v-for="(menu, index) of menuList" :key="index" @click="changePage(menu.name)">
        {{menu.name}} {{menu.meta && menu.meta.desc}}
      </li>
    </ul>
    <!-- 内容显示 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Form from '@/components/form/form'
import FormItem from '@/components/form/form-item'

export default {
  components: {
    Form,
    FormItem
  },
  data() {
    return {
      menuList: []
    };
  },

  methods: {
    changePage(name) {
      this.$router.push({name});
    }
  },
  created() {
    this.menuList = this.$router.options.routes[0].children;
    console.log(this.$router);
  }
}
</script>
