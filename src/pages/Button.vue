<!-- 按钮 -->
<template>
  <div class="h-btn-wrapper">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'medium'
    }
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>