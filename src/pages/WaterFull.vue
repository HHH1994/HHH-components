<!-- 瀑布流布局= -->
<template>
  <div class="waterfull-container">
     <div class="colmun">
      <span class="item" :key="i.id" v-for="i in data1">{{i.value}}</span>
    </div>
    <div class="colmun">
      <span class="item" :key="i.id" v-for="i in data2">{{i.value}}</span>
    </div>
    <div class="colmun">
      <span class="item" :key="i.id" v-for="i in data3">{{i.value}}</span>
    </div>
  </div>
</template>
<script>
import data from '../common/model/waterfullData'
export default {
  data() {
    let data1 = [], //第一列
      data2 = [], //第二列
      data3 = [], //第三列
      i = 0;

    while (i < data.length) {
      data1.push(data[i++]);
      if (i < data.length) {
        data2.push(data[i++]);
      }
      if (i < data.length) {
        data3.push(data[i++]);
      }
    }
    return {
      //第一列
      data1,
      //第二列
      data2,
      //第三列
      data3
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.waterfull-container {
  display: flex;
  flex-direction: row;
  width: 500px;

  .colmun {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 2px;
    .item {
      margin-bottom: 5px;
      width: 100%;
      padding: 10px 15px;
      border: 1px solid #f1f1f1;
      box-sizing: border-box;
    }
  }
}
</style>