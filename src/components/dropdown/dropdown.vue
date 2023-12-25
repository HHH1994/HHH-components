<template>
  <div ref="wrapper" class="dropdown">
    <div class="dropdown-trigger" @click="triggerHandle">
      <slot>下拉菜单</slot>
    </div>
    <ul ref="dropdownMenuWrapRef" class="dropdown-menu_wrap">
      <li
        v-for="(command,index) of commands"
        :key="index"
        class="dropdown-menu"
        @click="() => commandHandler(command)"
      >{{ command }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    commands: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShowPanel: false
    };
  },
  mounted() {
    this.globalClickHandler = (e) => {
      if (this.$refs.wrapper && this.$refs.wrapper.contains(e.target)) return;
      this.isShowPanel = false;
      this.$refs.dropdownMenuWrapRef.style.maxHeight = '0';
    };
    window.addEventListener('click', this.globalClickHandler);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.globalClickHandler);
  },
  methods: {
    triggerHandle() {
      if (this.isShowPanel) {
        this.isShowPanel = false;
        this.$refs.dropdownMenuWrapRef.style.maxHeight = '0';
      } else {
        this.isShowPanel = true;
        this.$refs.dropdownMenuWrapRef.style.maxHeight = '100px';
      }
    },
    commandHandler(val) {
      this.$emit('command', val);
      this.triggerHandle();
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-trigger {
    height: 20px;
    cursor: pointer;
}

.dropdown-menu_wrap {
    position: absolute;
    top: 25px;
    width: 100%;
    min-width: 80px;
    max-height: 0;
    list-style: none;
    margin: 0;
    background: #fff;
    overflow-y: auto;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 99;
    transition: all 300ms;

    .dropdown-menu {
        padding: 5px 10px;
        color: #333;
        cursor: pointer;

        &:hover {
            background: rgba(0,0,0, .15);
        }
    }
}
</style>
