<!-- 多级联动 -->
<style lang='scss' scoped>
$borderColor: #dcdfe6;
$color: #f8c555;

.linkage-warp {
  display: inline-block;
  position: relative;
  user-select: none;
}

.h-linkage-text {
  box-sizing: border-box;
  cursor: pointer;
  width: 200px;
  height: 40px;
  line-height: 30px;
  display: inline-block;
  border: 1px solid $borderColor;
  padding: 5px 10px;
  border-radius: 3px;
}

.h-linkage-panel {
  position: absolute;
  left: 0;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  border: 1px solid $borderColor;
  background: #fff;
  overflow: hidden;
  z-index: 2;
  ul {
    list-style: none;
    margin-right: -17px;
    overflow-y: scroll;
    max-height: 200px;
    li {
      position: relative;
      cursor: pointer;
      padding: 5px 10px;
      &:hover {
        background: #f1f1f1;
      }
    }
    .more {
      position: absolute;
      right: 10px;
    }
  }
  .second-panel,
  .third-panel {
    position: absolute;
    top: 0;
    border: 1px solid $borderColor;
  }
  .active-panel-option {
    color: $color;
    background: rgba($color: #f1f1f1, $alpha: 0.6);
  }
}
</style>
<template>
  <div class="linkage-warp">
    <div ref="linkpageText" class="h-linkage-text" @click="switchPanelMode">{{ showText }}</div>
    <!--下拉面板-->
    <div ref="linkpagePanel" class="h-linkage-panel" :style="{ width: `${style.width}px`, top: `${style.top}px` }" v-show="isShowPanel">
      <ul v-if="originList.length">
        <li v-for="(item, index) of originList" :key="index"  :class="{'active-panel-option': item.val === linkageVal[0] }"
        @mousemove="showChildren(item && item.children, 1, item)" @click.stop="selectValue(item.val, 1)">
          {{ item.name }}
          <span class="more" v-if="item.children">></span>
        </li>
      </ul>
      <ul v-else>
        <li>暂无数据</li>
      </ul>
    </div>
    <div
      class="h-linkage-panel h-linkage-second"
      :style="{ width: `${style.width}px`, top: `${style.top}px`, left: `${style.width}px` }"
      v-show="isShowSecondPanel"
    >
      <ul>
        <li v-for="(item, index) of secondList.list" :key="index" :class="{'active-panel-option': secondList.parent.val === linkageVal[0] && item.val === linkageVal[1] }"
        @mousemove="showChildren(item && item.children, 2, item)" @click.stop="selectValue(item.val, 2)">
          {{ item.name }}
          <span class="more" v-if="item.children">></span>
        </li>
      </ul>
    </div>
    <div
      class="h-linkage-panel h-linkage-third"
      :style="{ width: `${style.width}px`, top: `${style.top}px`, left: `${2 * style.width}px` }"
      v-show="isShowThirdPanel"
    >
      <ul>
        <li v-for="(item, index) of thirdList.list" :key="index"  :class="{'active-panel-option':  secondList.parent.val === linkageVal[0]  && thirdList.parent.val === linkageVal[1]  && item.val === linkageVal[2] }"
        @click.stop="selectValue(item.val, 3)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    value: Array,
  },
  data() {
    return {
      isShowPanel: false,
      isShowSecondPanel: false,
      isShowThirdPanel: false,
      style: {
        width: 200,
        top: 0,
        left: 0,
      },
      originList: [],
      secondList: {
        parent: null,
        list: []
      },
      thirdList: {
        parent: null,
        list: []
      },
      linkageVal: [],
      curSelectObj: {},
      showText: '',
    };
  },
  watch: {
    value(newVal, oldVal) {
      this.linkageVal = newVal;
      this.parseValsToText(this.linkageVal)
    },
  },
  methods: {
    switchPanelMode() {
      this.getCurTextInputPos();
      
      // this.switchPanelStatus(!this.isShowPanel);
      //TODO: 有值，返显已选值的面板以及内容
      if ([this.isShowPanel, this.isShowSecondPanel, this.isShowThirdPanel].some(isShow => isShow)) {
        this.switchPanelStatus();
      } else {
        this.initPanel();
      }
    },
    switchPanelStatus(panelStatus = false, panelStatus2 = false, panelStatus3 = false) {
      this.isShowPanel = panelStatus;
      this.isShowSecondPanel = panelStatus2;
      this.isShowThirdPanel = panelStatus3;
    },
    getCurTextInputPos() {
      // 获取当前输入框坐标
      const linkPageText = this.$refs.linkpageText.getBoundingClientRect();
      this.style.top = linkPageText.height;
      this.style.left = linkPageText.left;
      this.style.width = linkPageText.width;
    },
    globalClickCb(e) {
      const target = e.target;
      if (e.target === this.$refs.linkpageText) return;
      const eClassList = target.className.split(' ').map((c) => c.trim());

      this.switchPanelStatus();
    },
    showChildren(children, level, curData) {
      this.opSelectObj(level, curData);
      if (!children || !children.length) {
        this.switchPanelStatus(true, level > 1, false);
        return;
      }
      this.loadPanelData(children, curData, level);
      this.switchPanelStatus(true, level > 0, level > 1);
    },
    loadPanelData(list, parent, panelType) {
      const listName = panelType === 1 ? 'secondList' : 'thirdList';
      this[listName].list = list;
      this[listName].parent = parent || null;
    },
    opSelectObj(level, obj) {
      if (level === 1) {
        this.curSelectObj = obj;
      } else if (level === 2) {
        this.curSelectObj.child = obj;
      }
    },
    selectValue(val, level) {
      let resArr = [];
      let curObj = this.curSelectObj;
      while (curObj) {
        resArr.push(curObj.val);
        curObj = curObj.child;
      }
      if (level > 2) {
        resArr.push(val);
      }
      if (level < 2) {
        resArr = resArr.slice(0, 1);
      }
      this.linkageVal = resArr;
      console.log(resArr);
      this.parseValsToText(this.linkageVal);
      this.$emit('change', this.linkageVal);
      this.switchPanelStatus();
    },
    init() {
      this.originList = this.data;
      this.linkageVal = this.value || [];
      this.parseValsToText(this.linkageVal);
      window.addEventListener('click', this.globalClickCb);
    },
    parseValsToText(vals = []) {
      this.showText = '';
      let enumsList = this.originList,
        resData, textArr = [];
      for (let i = 0, len = vals.length; i < len; i++) {
        resData = enumsList.filter((item) => item.val === vals[i]);
        if (resData.length) {
          textArr.push(resData[0].name);
          enumsList = resData[0].children || [];
        } else {
          break;
        }
      }
      this.showText = textArr.join(' > ');
    },
    initPanel() {
      let level = 1;
      let resArr = [true, false, false];
      let transverseList = this.originList;
      this.linkageVal.forEach(val => {
        for (let i = 0, len = transverseList.length; i < len ; i++) {
          if (transverseList[i].val === val) {
            if (level < 3 && transverseList[i].children && transverseList[i].children.length > 0) {
              this.loadPanelData(transverseList[i].children, transverseList[i], level);
              this.opSelectObj(level, transverseList[i]);
              resArr[level] = true;
            }
            level++;
            transverseList = transverseList[i].children || [];
            break;
          }
        }
      });
      this.switchPanelStatus(...resArr);
    }
  },
  beforeDestroy() {
    window.removeEventListener('click', this.globalClickCb);
  },
  created() {
    this.init();
  },
};
</script>
