<template>
  <div ref="scrollWrap" class="wrap">
      <div class="backtop-btn" @click="backToTop">回到顶部</div>
      <section class="mock-content">
        <p v-for="(p, i) of mockList" :key="i">
            段落{{p}}
        </p>
      </section>
  </div>
</template>
<script>
export default {
   data() {     
    return {   
       mockList: [] 
    }
   },
   created() {
       this.mockList = [...new Array(1000).keys()]
   },
   methods: {
    backToTop() {
      const scrollWrap = document.querySelector('.main'); // 滚动容器元素
      const scrollTop = scrollWrap.scrollTop; // 总共滚动高度
      const perScrollH = 100; // 速度
      const totalCount = Math.round(scrollTop / perScrollH);

      function scrollToTop(totalScrollH, perScrollH, count, totalCount) {
          requestAnimationFrame(() => {
              if (count > totalCount) return;

              scrollWrap.scrollTop = totalScrollH - perScrollH * count;
              scrollToTop(totalScrollH, perScrollH, count + 1, totalCount);
          })
      }

      scrollToTop(scrollTop, perScrollH, 1, totalCount);
    }      
   }                   
}
</script>
<style lang="scss" scoped>
    .wrap {
        position: relative;

        .backtop-btn {
            position: fixed;
            bottom: 50px;
            right: 50px;
            width: 110px;
            height: 40px;
            padding: 10px 20px;
            color: #333;
            text-align: center;
            border: 1px solid #f1f1f1;
            border-radius: 5px;
            box-sizing: border-box;
            cursor: pointer;
        }
    }
</style>