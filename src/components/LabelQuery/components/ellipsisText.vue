<!-- 超出文字 -->
<template>
  <div class="ellipsis-text-wrap">
    <a-tooltip placement="bottom">
      <template v-if="isShowTooltip" slot="title">
        <span>{{ text }}</span>
      </template>
      <div ref="textRef" class="ellipsis-text">
        <slot name="content">{{ text }} </slot>
      </div>
    </a-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShowTooltip: false,
    };
  },
  watch: {
    text(newVal) {
      if (newVal) {
        this.calcWidth();
      }
    },
  },
  mounted() {
    this.calcWidth();
  },
  methods: {
    calcWidth() {
      this.$nextTick(() => {
        let dom = this.$refs.textRef;
        if (!dom) {
          return;
        }
        let { scrollWidth, clientWidth } = dom;
        if (scrollWidth > clientWidth) {
          this.isShowTooltip = true;
        } else {
          this.isShowTooltip = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ellipsis-text-wrap {
  width: 100%;
  height: 28px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  line-height: 28px;
  .ellipsis-text {
    max-width: 100%;
  }
  .ellipsis-text:hover {
    color: #0080ff;
  }
}
</style>
