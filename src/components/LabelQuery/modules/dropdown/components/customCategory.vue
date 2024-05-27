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
import Radio from "../../radio/index.vue";
import Checkbox from "../../checkbox/index.vue";
export default {
  name: "MarketCustomCategory",
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
          this.invertLabels = val;
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
        const categoryId = item.idList[2];
        const outLabelItem = this.outLabelList.find(
          (v) => v.categoryId === categoryId
        );
        if (outLabelItem) {
          this.controlChecked = true;
        }
      });
    },
    clearSelected() {
      this.outLabelList.forEach((item) => {
        this.$refs[item.categoryId][0].clearSelected();
      });
      this.controlChecked = false;
    },
    changeControl(checked) {
      // 顶部按钮控制所有的勾选✔
      let selectedData;
      if (checked) {
        let bxItem = this.outLabelList[0].componentConf.labelList[0];
        this.outLabelList.forEach((item) => {
          this.$refs[item.categoryId][0].selectedData =
            item.componentType === "radio" ? bxItem : [];
        });
        selectedData = [
          {
            idList: [
              this.packId,
              this.dropmenuItem.menuId,
              this.outLabelList[0].categoryId,
            ],
            tagName:
              this.outLabelList[0].title +
              "(" +
              this.dropmenuItem.title +
              ")" +
              "：" +
              bxItem.title,
            labelId: [{ id: bxItem.value }],
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
              this.outLabelList[0].categoryId,
            ],
            tagName: "",
            labelId: [],
            hightLightFalg: false,
          },
        ];
      }
      this.$emit("change", selectedData);
    },
    changeLabel(selectedData, type) {
      // 当子筛选项都时为false
      let hasValue = false;
      this.outLabelList.forEach((item) => {
        if (item.componentType === "radio") {
          hasValue = hasValue
            ? hasValue
            : !!this.$refs[item.categoryId][0].selectedData;
        } else {
          hasValue = hasValue
            ? hasValue
            : !!this.$refs[item.categoryId][0].selectedData.length;
        }
      });
      this.controlChecked = hasValue;
      selectedData.forEach((item) => {
        item.idList.unshift(this.dropmenuItem.menuId);
        item.idList.unshift(this.packId);
        console.log(item, "item-customCategory");
        // 处理tagName
        const originTagList = item.tagName.split("：");
        const tagName =
          originTagList[0] +
          "(" +
          this.dropmenuItem.title +
          ")" +
          "：" +
          originTagList[1];
        this.$set(item, "hightLightFalg", hasValue);
        this.$set(item, "tagName", tagName);
      });

      console.log(
        selectedData,
        this.dropmenuItem,
        "selectedData-customCategory"
      );
      this.$emit("change", selectedData);
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
