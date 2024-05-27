<template>
  <div class="custom-category-wrap">
    <div class="tip-top">
      <div class="control-left">
        <a-checkbox
          v-if="controlCondition"
          v-model="controlChecked"
          style="margin-bottom: 14px"
          @change="
            (e) => {
              changeControl(e.target.checked);
            }
          "
        >
          <span style="color: rgba(0, 0, 0, 0.85)">
            {{ controlCondition.title }}</span
          >
        </a-checkbox>
      </div>

      <div v-if="dropmenuItem.innerTip" class="category-tip">
        {{ dropmenuItem.innerTip }}
      </div>
    </div>

    <div
      v-for="(item, index) in outLabelList"
      :key="index"
      class="category-item"
    >
      <div class="category-title">{{ item.title }}</div>
      <div class="category-select">
        <component
          :is="item.componentType"
          :ref="item.categoryId"
          :component-data="item"
          :is-disabled="controlCondition ? !controlChecked : false"
          :invert-labels="invertLabels"
          :show-label-title="false"
          type="customCategory"
          @change="changeLabel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Radio from "../../../radio/index.vue";
import Checkbox from "../../../checkbox/index.vue";
export default {
  name: "MarketCustomZZRD",
  components: {
    Radio,
    Checkbox,
  },
  props: {
    dropmenuItem: {
      type: Object,
      default() {
        return {};
      },
    },
    packId: {
      type: [String, Number],
    },
    invertLabelsItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      controlChecked: false,
      selectedData: [],
      invertLabels: [],
    };
  },
  computed: {
    controlCondition() {
      return this.dropmenuItem.componentConf.controlCondition;
    },
    outLabelList() {
      return this.dropmenuItem.componentConf.labelList || [];
    },
  },
  watch: {
    invertLabelsItem: {
      handler(val) {
        if (val && val.length) {
          this.renderInvertLabels();
        } else {
          this.invertLabels = [];
          this.selectedData = [];
          this.controlChecked = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 反显元素
    renderInvertLabels() {
      this.invertLabelsItem.forEach((item) => {
        const menuId = item.idList[1];
        if (menuId === this.dropmenuItem.menuId && item.labelList.length) {
          this.controlChecked = true;
          this.invertLabels = item.children || [];
        }
      });
    },
    clearSelected() {
      this.selectedData[0].children = [];
      this.selectedData[0].hightLightFalg = false;
      this.controlChecked = false;
      this.outLabelList.forEach((item) => {
        this.$refs[item.categoryId][0].clearSelected();
      });
    },
    changeControl(checked) {
      // 顶部按钮控制所有的勾选✔
      let selectedData;
      if (checked) {
        const controlConditionVal = this.controlCondition.value;
        selectedData = [
          {
            idList: [
              this.packId,
              this.dropmenuItem.menuId
            ],
            children: [],
            isLabelIdFlat: true,
            tagName: this.dropmenuItem.title,
            labelId: [[{ id: controlConditionVal }]],
            hightLightFalg: true,
          },
        ];
      } else {
        this.outLabelList.forEach((item) => {
          this.$refs[item.categoryId][0].clearSelected();
        });
        selectedData = [
          {
            idList: [
              this.packId,
              this.dropmenuItem.menuId,
            ],
            children: [],
            isLabelIdFlat: true,
            tagName: "",
            labelId: [],
            hightLightFalg: false,
          },
        ];
      }
      this.selectedData = selectedData;
      this.$emit("change", selectedData);
    },
    processChildren(selectedDataId) {
      this.selectedData[0].children = this.selectedData[0].children.filter(children => children.idList[0] !== selectedDataId);
    },
    changeLabel(selectedData) {
      // 先从children中删除/添加
      const selectedDataComponent = selectedData[0];
      const selectedDataId = selectedDataComponent.idList[0];
      this.processChildren(selectedDataId);
      if (selectedDataComponent.labelId.length) {
        this.selectedData[0].children.push(selectedDataComponent);
      }

      // 再从children中得出labelId
      const controlConditionsLabelId = this.selectedData[0].labelId.shift();
      this.selectedData[0].labelId = [];
      if (this.controlChecked) {
        this.selectedData[0].labelId.push(controlConditionsLabelId);
      }
      this.selectedData[0].labelId.push( ...this.selectedData[0].children.map(c => c.labelId));

      this.selectedData[0].tagName = `${this.dropmenuItem.title}`;
      this.selectedData[0].children.forEach((childComponent,idx) => {
        if (idx === 0) {
          this.selectedData[0].tagName += ': (';
        } 

        this.selectedData[0].tagName += childComponent.tagName;

        if (idx === this.selectedData[0].children.length - 1) {
          this.selectedData[0].tagName += ')'
        } else {
          this.selectedData[0].tagName += ',';
        }
      })

      this.selectedData[0].hightLightFalg = this.controlChecked;

      this.$emit("change", this.selectedData);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-category-wrap {
  box-sizing: border-box;
  // width: 610px;
  padding: 16px;
  .tip-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .control-left {
      width: 30%;
    }
  }

  .category-item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .category-tip {
    margin-bottom: 14px;
    font-weight: 400;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
  }
  .category-title {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }

  /deep/.ant-radio-wrapper {
    color: rgba(0, 0, 0, 0.85);
  }
  /deep/ .check-wrap {
    margin-bottom: 12px;
    span {
      font-size: 13px;
    }
  }

  /deep/ .radio-label-wrap  {
    .ant-radio-group {
      display: flex;
      flex-wrap: wrap;
    }

    .inner-radio .ant-radio-wrapper {
      display: flex;
      align-items: center;
      width: auto;

      &:not(:last-child) {
        margin-right: 16px;
      }

      .ellipsis-text {
        font-size: 13px;
      }
    }
  }
}
</style>
