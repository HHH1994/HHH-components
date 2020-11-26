<!-- 文档页 -->
<style lang='scss' scoped>
</style>
<template>
  <div>
    <h2 style="margin-bottom: 10px;">Input 输入框</h2>
    <Input v-model="val" />
    <div style="padding: 10px"></div>
    <Input v-model="val" type="textarea" />
    <button @click="test">12</button>
  </div>
</template>

<script>
import Input from '@/components/input/Input'
export default {
  components: {
    Input
  },
  data() {
    return {
      val: ''
    };
  },

  methods: {
    test() {
      console.log(this.val);
      this.val = "123";
    }
  }
}
</script>
