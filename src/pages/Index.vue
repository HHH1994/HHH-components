<!-- 主页 -->
<template>
  <div class="root">
    <!-- 左边菜单 -->
    <div class="menu-wrap">
      <ul ref="hMenu" class="h-menu">
        <section ref="liWrap" class="li-wrap">
          <li
            v-for="(menu, index) of menuList"
            :key="index"
            :class="{active: activeIdx === index}"
            @click="changePage(menu.name, index)"
          >{{ menu.name }} {{ menu.meta && menu.meta.desc }}</li>
        </section>
      </ul>
    </div>
    <!-- 内容显示 -->
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIdx: 0,
      menuList: []
    };
  },
  created() {
    this.menuList = this.$router.options.routes[0].children;
    this.activeIdx = this.menuList.findIndex(
      item => item.name === this.$route.name
    );
  },
  methods: {
    changePage(name, idx) {
      this.$router.push({ name });
      this.activeIdx = idx;
    }
  }
};
</script>
<style lang='scss' scoped>
.menu-wrap {
  float: left;
  width: 280px;
  height: 100vh;
  overflow: hidden;
  box-shadow: 2px 0 5px rgba($color: #000000, $alpha: 0.3);

  .h-menu {
    width: calc(280px + 18px);
    height: 100vh;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 20px 10px;
    list-style: none;

    li {
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      padding: 5px;
      font-size: 15px;
      user-select: none;
    }

    .active {
      color: #1e80ff;
    }
  }
}

.main {
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
}
</style>
