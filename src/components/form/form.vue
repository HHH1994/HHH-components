<!-- 自定义表单组件 -->
<style lang='scss' scoped>
</style>
<template>
  <div>
    <!-- 表单标题 -->
    <header v-if="title">{{title}}</header>
    <!-- 表单内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: {
      type: Object
    },
    title: {
      type: String
    },
    rule: {
      type: Array
    }
  },
  data() {
    return {
    };
  },

  methods: {
    // 校验表单
    validate() {
      return true;
    },
    reset() {
      this.$children.forEach(child => {
        child.reset();
      });
    }
  },
  mounted() {
    
  },
  updated() {
    console.log('update');
  }
}
</script>
