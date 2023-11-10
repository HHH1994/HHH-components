<!-- 按钮 -->
<template>
  <Dropdown :commands="[1,2,3]"></Dropdown>
</template>
<script>
import Dropdown from '@/components/dropdown/dropdown.vue'
export default {
  name: 'DropdownView',
  components: {
      Dropdown
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