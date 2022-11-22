<!-- 主页 -->
<template>
  <div class="root">
    <!-- 左边菜单 -->
    <ul class="h-menu">
      <li 
        v-for="(menu, index) of menuList" 
        :key="index" 
        :class="{active: activeIdx === index}"
        @click="changePage(menu.name, index)"
      >
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
      activeIdx: 0,
      menuList: []
    };
  },

  methods: {
    changePage(name, idx) {
      this.$router.push({name});
      this.activeIdx = idx;
    }
  },
  created() {
    this.menuList = this.$router.options.routes[0].children;
    console.log(this.$router);
  }
}
</script>
<style lang='scss' scoped>
  .h-menu {
    float: left;
    box-sizing: border-box;
    width: 200px;
    height: 100vh;
    overflow-y: auto;
    padding: 20px 10px;
    list-style: none;
    box-shadow: 2px 0 5px rgba($color: #000000, $alpha: 0.3);

    li {
      cursor: pointer;
      height: 40px;
      user-select: none;
    }

    .active {
      color: #1e80ff;
    }
  }

  .main {
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;;
    padding: 20px;
  }
</style>