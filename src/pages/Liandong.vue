<!-- 组件: 多级联动 -->
<style lang='scss' scoped>
</style>
<template>
  <div>
    <Linkage :data="list" v-model="selectVal"></Linkage>
    <div style="margin-top: 10px;">
      <Linkage :data="[]" v-model="selectVal"></Linkage>
    </div>
    <button @click="test">获取值</button>
  </div>
</template>

<script>
import Linkage from '@/components/linkage/Linkage';
export default {
  components: {
    Linkage,
  },
  data() {
    return {
      selectVal: [],
      list: [
        {
          val: 1,
          name: '上海',
        },
        {
          val: 2,
          name: '浙江',
          children: [
            {
              val: 1,
              name: '衢州',
            },
            {
              val: 2,
              name: '杭州',
              children: [
                {
                  val: 1,
                  name: '上城区',
                },
                {
                  val: 2,
                  name: '下城区',
                },
                {
                  val: 3,
                  name: '江干区',
                },
              ],
            },
          ],
        },
        {
          val: 3,
          name: '安徽',
          children: [
            {
              val: 1,
              name: '合肥',
            },
            {
              val: 2,
              name: '黄山',
              children: [
                {
                  val: 1,
                  name: '山上',
                },
                {
                  val: 2,
                  name: '山下',
                }
              ],
            }
          ]
        }
      ],
    };
  },

  methods: {
    test() {
      console.log(this.selectVal);
    }
  },
  created() {
    this.selectVal = [2, 2]
  }
};
</script>
