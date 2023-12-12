<!-- 组件: 多级联动 -->
<template>
  <div>
    <h3>省市区三级联动</h3>
    <Linkage :data="list" v-model="selectVal" class="linkage"></Linkage>
    <div style="margin-top: 10px;">
      <h3>无数据</h3>
      <Linkage :data="[]" v-model="selectVal"  class="linkage"></Linkage>
    </div>
    <button @click="test">初始化值</button>
  </div>
</template>

<script>
import Linkage from '@/components/linkage/Linkage';
import cityJSON from '../assets/js/cities';
import city from '../assets/js/cities';

export default {
  components: {
    Linkage,
  },
  data() {
    return {
      selectVal: ['', ''],
      list:[]
    };
  },
  created() {
    this.getCityList();
  },
  methods: {
    getCityList() {
      const list = [];

      cityJSON.forEach(province => {
        province.children = province.areas.map(city => {
          if (city.areas) {
            city.children = city.areas.map(county => {
              return {
                name: county.name,
                val: county.id
              }
            })
          }

          city.val = city.id;

          return city;
        });
        province.val = province.id;
        list.push(province);
      });
      this.list = list;
    },
    test() {
      this.selectVal= ['', ''];
    }
  }
};
</script>
<style lang='scss' scoped>
h3 {
  margin-bottom: 10px;
}

.linkage {
  margin-bottom: 30px;
}
</style>
