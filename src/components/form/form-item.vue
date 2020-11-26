<!-- form-item组件 -->
<style lang="scss"  scoped>
.form-item {
  margin: 10px 0;
}

label {
  display: inline-block;
  vertical-align: middle;
}
</style>
<template>
  <div class="form-item">
    <label v-if="label" :style="{ width: `${labelWidth}px` }">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    labelWidth: {
      type: Number,
      default: 50,
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {};
  },

  methods: {
    reset() {
      console.log(this.$slots.default)
    },
    clearVal() {

    },
    clearStyle() {}
  },
};
</script>
