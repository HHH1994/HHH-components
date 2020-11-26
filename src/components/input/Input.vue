<!-- 组件: Input -->
<style lang='scss' scoped>
  $color: #f8c555;
  $borderColor: #dcdfe6;
  
  input {
    outline: none;
    border: 1px solid $borderColor;
    display: 40px;
    height: 40px;
    padding: 0 15px;
    border-radius: 3px;;
  }

  .h-textarea {
    width: 300px;
    border: 1px solid $borderColor;
    padding: 5px 15px;
    resize: vertical;
    outline: none;
    border-radius: 3px;;
  }

  .h-textarea:focus,input:focus {
    border-color: $color;
  }
</style>
<template>
  <div>
    <input type="text" :value="value" @input="change" v-if="type !== 'textarea'" :placeholder="placeholder">
    <textarea class="h-textarea" :value="value" @input="change"  v-if="type === 'textarea'" :placeholder="placeholder"></textarea>
  </div>
</template>

<script>
export default {
  name: 'Input',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {
    };
  },

  methods: {
    change(e) {
      this.$emit('change', e.target.value);
    },
    parseType(type) {

    }
  },
  created() {
    
  }
}
</script>
