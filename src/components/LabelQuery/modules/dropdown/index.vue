<template>
  <div class="dropdown-wrap">
    <div class="label-name">
      <div v-if="componentConf.tip" class="pack-tip">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>{{ componentConf.tip }}</span>
          </template>
          <i class="iconfont iconCheck-Circle1" />
        </a-tooltip>
      </div>
      {{ componentData.packName }}
    </div>
    <div class="inner-dropdown">
      <div
        v-for="(list, idx) in componentConf.dropmenuList"
        :key="list.menuId"
        class="dropdown-item"
      >
        <a-popover
          ref="popverRef"
          placement="bottomLeft"
          trigger="hover"
          :mouseEnterDelay="0.2"
          :overlayClassName="
            ['MarketCustomCategory', 'MarketCustomZZRD'].includes(list.componentType)
              ? 'custom-category-popover'
              : list.componentType === 'MarketCustomRadioCheckbox'
              ? 'custom-radio-checkbox-popover'
              : ['MarketDropdownCascader', 'MarketDropdownAreaCascader'].includes(list.componentType)
              ? 'custom-cascader-popover'
              : 'dropdown-popover'
          "
          @visibleChange="visibleChange(list)"
        >
          <template slot="content">
            <div class="dropdown-panel">
              <div class="main-content">
                <component
                  :is="list.componentType"
                  :ref="list.menuId"
                  :pack-id="componentData.packId"
                  :dropmenu-item="list"
                  :invert-labels-item="invertLabelsItem"
                  @change="changeLabel"
                />
              </div>
            </div>
          </template>
          <div
            class="menu-title"
            :style="{ color: list.hightLightFalg ? '#0080ff' : '' }"
            @click="clickLabel(list)"
          >
            <!-- 单选框标题展示， 要展示具体选择 -->
            <template v-if="list.componentType === 'MarketDropdownRadio'">
              <EllipsisText
                :text="
                  list.hightLightFalg ? list.tagName.split('：')[1] : list.title
                "
                @mouseenter.stop.native="openPopver(idx)"
              ></EllipsisText>
            </template>
            <!-- 多选 和 级联 标题展示，要加 数量 -->
            <template
              v-else-if="
                ['MarketDropdownCheckbox', 'MarketDropdownCascader', 'MarketDropdownAreaCascader'].includes(
                  list.componentType
                )
              "
            >
              <EllipsisText :text="list.title" @mouseenter.stop.native="openPopver(idx)"></EllipsisText>
              <span v-if="list.hightLightFalg">{{ list.selectLength }}</span>
            </template>
            <!-- 其他模式 -->
            <EllipsisText v-else :text="list.title"></EllipsisText>
            <!-- tip展示 -->
            <div
              v-if="list.tip && list.componentType !== 'MarketCustomCategory'"
              class="pack-tip"
              @mouseenter.stop="closePopver(idx)"
            >
              <a-tooltip
                placement="bottom"
                width="400"
                overlayClassName="tooltip-content"
              >
                <template slot="title">
                  <div v-html="list.tip"></div>
                </template>
                <i
                  class="iconfont iconCheck-Circle1"
                  style="margin-left: 4px"
                />
              </a-tooltip>
            </div>
            <!-- 关闭按钮 -->
            <a-icon
              v-if="list.hightLightFalg"
              type="close-circle"
              @click.stop="resetCustom(list)"
            />
            <!-- 展开缩起按钮 -->
            <i
              class="iconfont iconcaret-bottom"
              :class="{ rotate: list.showPanel }"
              @mouseenter.stop="openPopver(idx)"
            ></i>
          </div>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script>
import dropModuleList from './index';
import EllipsisText from "../../components/ellipsisText.vue";
export default {
  name: "MarketDropdown",
  components: Object.assign(dropModuleList, {
    EllipsisText,
  }),
  props: {
    componentData: {
      type: Object,
      default() {
        return {};
      },
    },
    invertLabels: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      invertLabelsItem: [],
      openFlag: false,
    };
  },
  computed: {
    componentConf() {
      return this.componentData.componentConf || {};
    },
  },
  watch: {
    invertLabels: {
      handler(val) {
        if (val && val.length) {
          this.renderInvertLabels();
        } else {
          this.clearSelected();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // hover tip 关闭popver面板
    closePopver(idx) {
      this.$refs.popverRef[idx].$el.dispatchEvent(new Event('mouseleave'))
    },
    openPopver(idx) {
      this.$refs.popverRef[idx].$el.dispatchEvent(new Event('mouseenter'))
    },
    clearSelected() {
      this.componentConf.dropmenuList.forEach((item) => {
        item.hightLightFalg = false;
        item.tagName = false;
        this.invertLabelsItem = [];
      });
    },
    // 反显元素
    renderInvertLabels() {
      const invertLabelsItem = this.invertLabels.filter((v) =>
        v.idList.includes(this.componentData.packId)
      );
      if (invertLabelsItem && invertLabelsItem.length) {
        this.invertLabelsItem = invertLabelsItem;
        invertLabelsItem.forEach((item) => {
          const tagNameItem =
            this.componentData.componentConf.dropmenuList.find(
              (v) => v.menuId === item.idList[1]
            );
          if (tagNameItem.componentType === "MarketCustomCategory") {
            this.$set(tagNameItem, "hightLightFalg", item.hightLightFalg);
          } else {
            this.$set(tagNameItem, "tagName", item.tagName);
            this.$set(tagNameItem, "hightLightFalg", item.hightLightFalg);
            this.$set(tagNameItem, "selectLength", item.selectedLen || "");
          }
        });
        this.$emit("change", invertLabelsItem);
      }
    },
    getPanelBottom(list) {
      if (!list.showPanel) return;
      this.$nextTick(() => {
        const clientHeight = this.$refs[list.menuId][0].clientHeight;
        return clientHeight + "px";
      });
    },
    checkHightLight(item) {
      const filterArr = Object.values(item).filter((v) => v);
      return !!filterArr.length;
    },
    changeLabel(selectedData) {
      selectedData.forEach((item) => {
        const selectedMenu = this.componentConf.dropmenuList.find(
          (v) => v.menuId === item.idList[1]
        );
        if (
          selectedMenu &&
          selectedMenu.componentType === "MarketCustomCategory"
        ) {
          this.$set(selectedMenu, "hightLightFalg", item.hightLightFalg);
        } else {
          this.$set(selectedMenu, "tagName", item.tagName);
          this.$set(selectedMenu, "hightLightFalg", item.hightLightFalg);
          this.$set(selectedMenu, "selectLength", item.selectedLen || "");
        }
        this.$forceUpdate();
      });
      this.$emit("change", selectedData);
    },
    visibleChange(list) {
      this.$set(list, "showPanel", !list.showPanel);
    },
    resetCustom(list) {
      this.$refs[list.menuId][0].clearSelected();
      list.hightLightFalg = false;
    },
    // 点击label, 如果是 复选，则要全选取消全选功能
    clickLabel(node) {
      if (node.componentType !== "MarketDropdownCheckbox") {
        return;
      }
      let dom = this.$refs[node.menuId];
      if (dom) {
        dom[0].selectAll();
      } else {
        setTimeout(() => {
          dom[0].selectAll();
        }, 600);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../common.scss");
.dropdown-wrap {
  display: flex;
  align-items: flex-start;
  .inner-dropdown {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex: 1;
    transition: all 0.25s;
    overflow: hidden;
  }
  .dropdown-item {
    display: flex;
    align-items: center;
    position: relative;
    // width: 180px;
    height: 28px;
    padding-right: 24px;
    // margin-bottom: 6px;
    line-height: 28px;
  }
  .menu-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.85);
    &:hover {
      .anticon-close-circle {
        display: block;
      }
      .anticon-close-circle + .iconcaret-bottom {
        display: none;
      }
      .iconcaret-bottom {
        color: #0080ff;
      }
    }

    .iconcaret-bottom {
      margin-left: 4px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.25);
      transition: all 0.3s;
    }
    .anticon-close-circle {
      display: none;
      width: 14px;
      margin-left: 4px;
    }
    .menu-text {
      max-width: 140px;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
    }
  }
  .dropdown-panel {
    width: fit-content;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    min-width: 204px;
    height: fit-content;
    z-index: 999;

    .main-content {
      box-shadow: 0px 2px 8px 0px #00000026;
      background-color: #fff;
      border-radius: 4px;
      margin-top: 8px;
    }
  }
}
</style>
<style lang="scss">
.tooltip-content {
  max-width: 400px;

  .ant-tooltip-inner {
    background-color: #fff;
    max-height: 234px;
    overflow: auto;
  }
  .title {
    margin: 4px 0;
    font-weight: 600;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .text {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
  .ant-tooltip-arrow {
    &:before {
      background-color: #fff;
    }
  }
}
.dropdown-popover {
  padding: 0;
  min-width: 140px !important;
  max-width: 280px !important;
  .ant-popover-arrow {
    display: none;
  }
  .ant-popover-inner-content {
    padding: 0 !important;
    // max-height: 360px;
    // overflow: auto;
  }
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    .ant-checkbox-wrapper {
      max-width: 204px;
    }
  }
}
.custom-cascader-popover {
  padding: 0;
  .ant-popover-inner-content {
    padding: 0 !important;
    max-height: 360px;
    overflow: auto;
  }
}
.custom-category-popover {
  padding: 0;
  max-width: 600px !important;
  .ant-popover-inner-content {
    padding: 0 !important;
    max-height: 360px;
    overflow: auto;
  }
  .ant-popover-arrow {
    display: none;
  }
  .ant-checkbox-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .ant-checkbox-wrapper {
      max-width: 204px;
    }
  }
}
.custom-radio-checkbox-popover {
  padding: 0;
  .ant-popover-inner {
    border-radius: 0 !important;
    // box-shadow: none;
    max-height: 360px;
    overflow: auto;
  }
  .ant-popover-inner-content {
    padding: 0 !important;
  }
  .ant-popover-arrow {
    display: none;
  }
}
</style>
