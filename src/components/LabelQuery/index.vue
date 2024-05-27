<template>
  <div class="marketing-label-wrap">
    <div class="scroll-box" :style="{maxHeight: scrollBoxHeight}">
      <div class="scroll-box-inner">
        <div
          v-for="(item, index) in labelsConfig"
          :key="index"
          class="label-item"
          :id="item.packId"
          :class="{ 'half-label-item': item.componentConf.width === '50%' }"
          :style="{ width: item.componentConf.width || '100%' }"
        >
          <div :id="'inner' + item.packId" class="component-item">
            <component
              :is="item.componentType"
              :ref="item.packId"
              :component-data="item"
              :invert-labels="invertLabels"
              @change="changeLabelValue"
            />
          </div>
          <div
            v-if="item.componentConf.hasOpen"
            class="open-btn"
            @click="openDom(item)"
          >
            {{ item.componentConf.openFlag ? "收起" : "展开" }}
            <i
              class="el-icon-arrow-down"
              style="margin-left: 4px; transition: all 0.25s"
              :class="{ rotate: item.componentConf.openFlag }"
            ></i>
          </div>
        </div>
      </div>
      <div class="bottom-mask" :class="{'bottom-mask-show': hasFoldBtn && !isExpandQueryContainer}"></div>
    </div>
    <div v-if="hasFoldBtn" class="expand-container"  @click="unfoldHandler">
        <span class="text">{{isExpandQueryContainer ? '收起筛选' : '展开筛选'}}</span>
        <i class="iconfont iconjiantougaoliang" :class="{'fold': !isExpandQueryContainer}"></i>
      </div>
    <div class="line"></div>
    <div
      v-if="hasConditionBar && selectedLabelList && selectedLabelList.length"
      class="selected-label"
    >
      <span class="selected-text">已选条件：</span>
      <div class="selected-content">
        <div
          v-for="(selected, index) in selectedLabelList"
          :key="index"
          class="selected-item"
        >
          <a-tooltip
            v-if="selected.tagName.length > 27"
            placement="topLeft"
            :title="selected.tagName"
            arrow-point-at-center
            overlayClassName="tooltip-center"
          >
            <span>{{ selected.tagName }}</span>
          </a-tooltip>
          <span v-else>{{ selected.tagName }}</span>
          <i class="el-icon-close" @click="removeSelectedLabel(selected)"></i>
        </div>
      </div>

      <div class="clear-btn" @click="clearSelectedLabel">
        <i class="el-icon-delete"></i>
        清空
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from "lodash/debounce";
import { labelsConfig } from "./constant";
import moduleList from "./index.js";

export default {
  components: moduleList,
  props: {
    hasConditionBar: {
      type: Boolean,
      default: true,
    },
    hasFoldBtn: {
      type: Boolean,
      default: true
    },
    labelsConfig: {
      type: Array,
      default: () => JSON.parse(JSON.stringify(labelsConfig))
    }
  },
  data() {
    return {
      selectedLabelList: [],
      invertLabels: [],
      isExpandQueryContainer: true,
      scrollBoxHeight: '2000px'
    };
  },
  mounted() {
    this.invertLabel();
    setTimeout(() => {
      this.hendleOpenBtn();
    }, 400);
    window.addEventListener("resize", _debounce(this.hendleOpenBtn, 500));
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.hendleOpenBtn);
    this.labelsConfig.forEach((item) => {
      item.componentConf.openFlag = false;
    });
  },
  methods: {
    hendleOpenBtn() {
      this.labelsConfig.forEach((item) => {
        if (!item.componentConf.notHasOpenBtn) {
          const dom = document.getElementById(item.packId);
          const innerDom = document.getElementById("inner" + item.packId);
          // 需要展开收起按钮-此时需要判断是不是超过一行
          if (innerDom.clientHeight > 28) {
            this.$set(item.componentConf, "hasOpen", true);
            dom.style.height = item.componentConf.minHeight
              ? `${item.componentConf.minHeight}px`
              : "28px";
          } else {
            this.$set(item.componentConf, "hasOpen", false);
          }
        } else {
          this.$set(item.componentConf, "hasOpen", false);
        }
      });
    },

    // 展开收起按钮
    openDom(item) {
      this.$emit('openDom', !item.componentConf.openFlag)
      this.$set(item.componentConf, "openFlag", !item.componentConf.openFlag);
      const dom = document.getElementById(item.packId);
      const innerDom = document.getElementById("inner" + item.packId);
      if (item.componentConf.openFlag) {
        dom.style.height = innerDom.clientHeight + "px";
      } else {
        dom.style.height = item.componentConf.minHeight
          ? `${item.componentConf.minHeight}px`
          : "28px";
      }
    },
    // 根据saveTemplateIds反显标签
    invertLabel() {
      this.selectedLabelList = JSON.parse(JSON.stringify(this.invertLabels));
    },
    // // 获取查询结果
    // queryResult() {
    //   this.saveTemplateIds = [];
    //   console.log(this.selectedLabelList, 116);
    // },
    // 删除原有选中的标签
    commonRemoveOriginal(id, labelIndx) {
      const index = this.selectedLabelList.findIndex(
        (v) => v.idList[labelIndx] === id
      );
      if (index > -1) {
        this.selectedLabelList.splice(index, 1);
      }
    },
    // 获取最后层级的idList下标签
    queryLevel(item) {
      return item.idList.length - 1;
    },
    changeLabelValue(list) {
      console.log("list====", JSON.stringify(list), this.selectedLabelList);
      list.forEach((item) => {
        this.commonRemoveOriginal(
          item.idList[this.queryLevel(item)],
          this.queryLevel(item)
        );
        // 如果是组合标签，特殊处理下

        if (
          (item.componentType === "compose" && item.tagName) ||
          (item.componentType !== "compose" &&
            item.labelId.length &&
            item.tagName)
        ) {
          this.selectedLabelList.push(item);
        }
      });
      this.$emit("change", this.selectedLabelList);
    },
    // 清除选中标签
    removeSelectedLabel(item) {
      this.commonRemoveOriginal(
        item.idList[this.queryLevel(item)],
        this.queryLevel(item)
      );
      if (item.componentType === "compose") {
        // 如果是组合标签
        let composeDom = this.$refs[item.idList[0]][0];
        composeDom && composeDom.clearSelected();
        item.labelIds.forEach((element) => {
          this.mapFunction(element);
        });
      } else {
        this.mapFunction(item);
      }
    },
    // 清空所有标签
    clearSelectedLabel() {
      const selectedLabelList = JSON.parse(
        JSON.stringify(this.selectedLabelList)
      );
      this.selectedLabelList = [];
      this.invertLabels = [];
      selectedLabelList.forEach((item) => {
        let composeDom = this.$refs[item.idList[0]][0];
        composeDom && composeDom.clearSelected();
        // this.removeSelectedLabel(item);
        if (item.componentType === "compose") {
          item.labelIds.forEach((element) => {
            this.mapFunction(element);
          });
        }
      });
    },
    mapFunction(element) {
      let refDom;
      element.idList.forEach((id, i) => {
        if (i === 0) {
          refDom = this.$refs[id][0];
        } else {
          refDom =
            refDom.$refs[id] && refDom.$refs[id].length
              ? refDom.$refs[id][0]
              : refDom.$refs[id];
        }
      });
      refDom && refDom.clearSelected();
    },
    // 查询使用
    getCondition() {
      const peerAnalysisDatas = [];
      const faltConditions = [];
      let xxx = this.selectedLabelList
        .map((item) => {
          // 这个componentType在compositeComponents内部定义
          if (item.componentType === "compose") {
            let obj = { params: {} };
            item.labelIds.forEach((element) => {
              // 针对componseComponents params合并逻辑
              const elementCopy = JSON.parse(JSON.stringify(element));
              const labelId = elementCopy.labelId[0] || {};
              const params = labelId.params || {};
              delete labelId.params;
              Object.assign(obj, labelId);
              if (params) {
                Object.assign(obj.params, params);
              }
            });
            return [obj];
          } else if (item.componentType === "peerAnalysis") {
            item.labelId.forEach(label => {
              peerAnalysisDatas.push([label]);
            })
            return false;
          } else if (item.isLabelIdFlat) {
            item.labelId.forEach(label => {
              faltConditions.push(label);
            })
            return false;
          }
          return item.labelId;
        })
        .filter((ele) => ele);
      return xxx.concat(peerAnalysisDatas, faltConditions);
    },
    getJson() {
      return this.selectedLabelList;
    },
    unfoldHandler() {
      this.isExpandQueryContainer = !this.isExpandQueryContainer;
      this.scrollBoxHeight = this.isExpandQueryContainer ? '2000px' : '380px';
      setTimeout(() => {
        this.$parent.pageScrollHandler();
      }, 300)
    }
  },
};
</script>
<style lang="scss" scoped>
.marketing-label-wrap {
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 0;
  background-color: #fff;
  
  .scroll-box {
    // min-height: 0;
    position: relative;
    padding: 0 24px 9px;
    overflow: hidden;
    transition: all 800ms;

    &-inner {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      height: fit-content;
    }
    .label-item {
      flex-shrink: 0;
      // max-height: 28px;
      display: flex;
      align-items: flex-start;
      overflow: hidden;
      margin: 0 0 10px;
      transition: all 300ms;
      transform-origin: 0 0;
      &.half-label-item {
        // padding-right: 20px;
      }

      &:last-child {
        margin: 0;
      }
    }
    .component-item {
      flex: 1;
    }
    .open-btn {
      width: 50px;
      flex-shrink: 0;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 28px;
      text-align: right;
      cursor: pointer;
      &:hover {
        color: #0080ff;
      }
    }

    .bottom-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 28px;
      text-align: center;
      background: linear-gradient(hsla(0,0%,100%,.5),#fff);
      opacity: 0;
      transition: opacity 500ms;
    }

    .bottom-mask-show {
      opacity: 1;
    }
  }
  
  .line {
    width: calc(100%- 48px);
    flex-shrink: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
  }
  .selected-label {
    position: sticky;
    bottom: 0;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    max-height: 110px;
    padding: 10px 24px;
    overflow-y: auto;
    background: #fff;
    .selected-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      max-width: 400px;
      flex-shrink: 0;
      width: fit-content;
      margin-right: 10px;
      margin-bottom: 8px;
      padding: 6px 8px;
      border: 1px solid #0080ff;
      border-radius: 4px;
      line-height: 14px;
      cursor: pointer;
      color: #0080ff;
      &:hover {
        background: rgba(0, 128, 255, 0.08);
      }
      span {
        // width: calc(100% - 16px);
        max-width: 370px;
        padding-right: 8px;
        flex-shrink: 0;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
      }
    }
    .selected-content {
      flex: 1;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .selected-text {
      width: 80px;
      flex-shrink: 0;
      line-height: 26px;
    }
    .clear-btn {
      width: 50px;
      flex-shrink: 0;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  .expand-container {
    position: relative;
    text-align: center;
    padding: 5px 0;
    z-index: 2;

    .text {
      display: inline-block;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.45);
      margin-right: 4px;
      vertical-align: middle;
      cursor: pointer;
    }

    .iconfont {
      display: inline-block;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      vertical-align: middle;
      transition: all 0.3s;
      cursor: pointer;
    }

    .fold {
      transform: rotate(180deg);
    }

    &:hover {
      .text,
      .iconfont {
        color: #0080ff;
      }
    }
  }

  .expand-container-transparent {
    opacity: 0;
  }
}


#innergjz {
  width: 50%;
  flex: 0.5;
}
#ssdq {
  padding-left: 20px;
}
</style>
<style lang="scss">
.tooltip-center {
  max-width: 480px;
  .ant-tooltip-inner {
    background-color: #fff;
    max-height: 234px;
    overflow: auto;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.65);
  }
  .ant-tooltip-arrow {
    &:before {
      background-color: #fff;
    }
  }
}

// 选择框
.ant-select-open .ant-select-selection {
  box-shadow: none !important;
  border-color: #0080ff;
}
// 复选框与 文字之间的距离
.ant-checkbox + span {
  padding-right: 4px;
  padding-left: 4px;
}
.iconCheck-Circle1 {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.ant-checkbox-checked .ant-checkbox-inner:after {
  left: 20%;
}
</style>
