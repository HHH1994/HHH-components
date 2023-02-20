<!-- 无限滚动列表 -->
<template>
  <div>
    <p>无限滚动列表</p>
    <div class="scroll-wrap">
        <ul 
            ref="scrollList" 
            class="list" 
            @mousemove="stopScroll"
            @mouseout="startScroll"
        >
            <li 
                v-for="(item, index) of scrollList"
                :key="index"
                class="list-item"
            >
                滚动项 {{item}}
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        originList: [1,2,3,4,5,6,7,8,9,10,11,12],
        scrollList: [1,2,3,4,5,6,7,8,9,10,11,12],
        scrollCount: 0,
    }
  },
  created() {
    this.canScroll = true;
  },
  mounted() {
    // this.initScroll();
  },
  methods: {
    initScroll() {
        if (this.scrollList < 10) return;

        const scrollDom = this.$refs.scrollList;
        const scrollV = 1;
        // 最好保持在60，与帧数同步
        const round = 60 / scrollV;

        const scroll = () => {
            requestAnimationFrame(() => {
                if (!this.canScroll) return ;

                this.scrollCount++;

                if (this.scrollCount === this.originList.length * round) {
                    this.scrollCount = 0;
                    scrollDom.style.transform = 'translateY(0)';
                    this.scrollList.splice(0, this.originList.length);
                    this.scrollList.push(this.originList[this.originList.length - 1]);
                } else {
                    scrollDom.style.transform = `translateY(-${this.scrollCount * scrollV}px)`
                    if ((this.scrollCount) % round === 0) {
                        this.scrollList.push(this.originList[(this.scrollCount / round) - 1]);
                    }
                }                
                
                scroll();
            })
        }

        scroll();
        
    },
    startScroll() {
        this.canScroll = true;
        this.initScroll();
    },
    stopScroll() {
        this.canScroll = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-wrap {
    width: 500px;
    height: 600px;
    overflow: hidden;

    .list {
        background: rgba($color: #333, $alpha: 0.1);
        list-style: none;

        .list-item {
            height: 60px;
            line-height: 50px;
            padding: 5px 10px;
            box-sizing: border-box;
        }
    }

}
</style>