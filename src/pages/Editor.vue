<!-- 组件: Editor -->
<style lang='scss' scoped>
</style>
<template>
  <div>
    <h2 style="margin-bottom: 10px;">{{title}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    };
  },

  methods: {},
  created() {
    this.title = `${this.$route.name} ${this.$route.meta && this.$route.meta.desc}`
  }
}
</script>
