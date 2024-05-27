<template>
  <div class="dropdown-radio-wrap">
    <div
      v-for="label in componentConf.labelList"
      :key="label.value"
      class="radio-item"
      :class="{ active: label.value === selectedData }"
      @mouseenter="handleMouseEnter(label)"
      @mouseleave="handleMouseLeave(label)"
    >
      <div class="radio-item-span" @click="emitData(label)">
        <EllipsisText :text="label.title"></EllipsisText>
      </div>
      <div
        v-show="dropmenuItem.componentConf.showCustom"
        :class="[
          'custom-panel',
          label.customerType === 'dropDate'
            ? 'absolute-top'
            : 'absolute-bottom',
        ]"
      >
        <custom-popover
          :ref="label.value"
          :label="label"
          :component-conf="dropmenuItem"
          :default-value="computedValue(label)"
          :default-range-picker-date="dropmenuItem.rangePickerDate"
          @resetCustom="resetCustom"
          @confirmCustom="confirmCustom"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CustomPopover from "../../../components/customPopover.vue";
import EllipsisText from "../../../components/ellipsisText.vue";
export default {
  name: "MarketDropdownRadio",
  components: { CustomPopover, EllipsisText },
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
      componentConf: {},
      selectedData: "",
    };
  },
  computed: {
    customLabel() {
      return this.componentConf.labelList && this.componentConf.labelList.length
        ? this.componentConf.labelList.find((v) => v.isCustomer)
        : {};
    },
    computedValue() {
      return function (label) {
        let { templateParams } = label;
        if (templateParams && templateParams.length) {
          let xxx = this.dropmenuItem[templateParams[0]] || "";
          let yyy = this.dropmenuItem[templateParams[1]] || "";
          return [xxx, yyy];
        }
        return ["", ""];
      };
    },
  },
  watch: {
    invertLabelsItem: {
      handler(val) {
        if (val && val.length) {
          this.renderInvertLabels();
        } else {
          this.selectedData = "";
        }
      },
      deep: true,
      immediate: true,
    },
    dropmenuItem: {
      async handler(newVal, oldVal) {
        if (newVal) {
          let config = JSON.parse(JSON.stringify(newVal.componentConf));
          this.componentConf = config;
          // 如果没有被关联，可以直接自己请求数据
          if (config.dataApi) {
            await this.getOptions("", false);
          }
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
        const index = item.idList.findIndex(
          (v) => v === this.dropmenuItem.menuId
        );
        if (index > -1) {
          const labelId = item.labelId[0];
          this.selectedData = labelId.id;
          const customLabel = this.customLabel || {};
          // 自定义反显
          if (customLabel.templateParams && customLabel.templateParams.length && labelId.params) {
            customLabel.templateParams.forEach((v) => {
              this.$set(this.dropmenuItem, v, labelId.params[v]);
            });
            if (customLabel.customerType === "dropDate") {
              this.$set(this.dropmenuItem, "rangePickerDate", [
                moment(labelId.params[customLabel.templateParams[0]]),
                moment(labelId.params[customLabel.templateParams[1]]),
              ]);
            }
          }
        }
      });
    },
    paramsValue(index) {
      const label = this.customLabel;
      return this.customLabel
        ? this.dropmenuItem[label.templateParams[index]]
        : "";
    },
    // 清空选择的元素
    clearSelected() {
      this.selectedData = "";
      const label = this.customLabel;
      if (this.customLabel && Object.keys(this.customLabel).length) {
        this.dropmenuItem[label.templateParams[0]] = "";
        this.dropmenuItem[label.templateParams[1]] = "";
        this.dropmenuItem.rangePickerDate = [];
      }
      const selectedData = [
        {
          idList: this.handleIdList(),
          tagName: "",
          labelId: [],
          hightLightFalg: false,
        },
      ];
      this.selectedData = "";
      this.$emit("change", selectedData);
    },
    // 拼接已选条件反显的tag
    handleTagName(value) {
      let tagName;
      if (value.isCustomer) {
        tagName = `${this.dropmenuItem.title}：${this.paramsValue(0)}
        -
        ${this.paramsValue(1)}${value.customerUnit || ""}`;
      } else {
        tagName = `${this.dropmenuItem.title}：${value.title}`;
      }
      return tagName;
    },
    // 处理条件入参
    handleLabelId(value) {
      let labelId;
      if (value && value.isCustomer) {
        // 选择自定义
        labelId = [
          {
            id: value.value,
            params: {
              [value.templateParams[0]]: this.paramsValue(0),
              [value.templateParams[1]]: this.paramsValue(1),
            }
          },
        ];
      } else if (value) {
        labelId = [{ id: value.value }];
      } else {
        // 选择不限
        labelId = [];
      }
      return labelId;
    },
    handleIdList() {
      let idList = [this.packId, this.dropmenuItem.menuId];
      if (this.dropmenuItem.childComponentType === "radio") {
        idList.push(this.dropmenuItem.value);
      }
      return idList;
    },
    // 判断自定义选值是否合理
    checkpPlausible(label) {
      if (label.customerType === "dropInput") {
        if (!this.paramsValue(0) || !this.paramsValue(1)) {
          return false;
        } else if (Number(this.paramsValue(0)) > Number(this.paramsValue(1))) {
          this.$message.error("自定义最大值应大于最小值");
          return false;
        }
        return true;
      } else if (label.customerType === "dropDate") {
        if (!this.paramsValue(0) || !this.paramsValue(1)) {
          // this.$message.error('请选择自定义值');
          return false;
        }
        return true;
      }
    },
    emitData(value, type) {
      let selectedData;
      if (value.isCustomer && !this.checkpPlausible(value)) {
        selectedData = [
          {
            idList: this.handleIdList(value),
            tagName: "",
            labelId: [],
            componentType:
              this.dropmenuItem.childComponentType === "radio"
                ? "MarketCustomRadioCheckbox"
                : "",
            hightLightFalg: false,
          },
        ];
        this.selectedData = "";
      } else {
        selectedData = [
          {
            idList: this.handleIdList(value),
            tagName: this.handleTagName(value),
            labelId: this.handleLabelId(value),
            componentType:
              this.dropmenuItem.childComponentType === "radio"
                ? "MarketCustomRadioCheckbox"
                : "",
            hightLightFalg: true,
          },
        ];
        this.selectedData = value.value;
      }
      console.log(selectedData, "selectedData-dropdownRadio");
      this.$emit("change", selectedData);
    },
    // 输入有效性校验
    checkInputValidate(label, valList) {
      if (label.customerType === "dropInput") {
        if (Number(valList[0]) > Number(valList[1])) {
          this.$message.error("自定义最大值应大于最小值");
          return false;
        }
        return true;
      }
    },
    // 确认自定义
    confirmCustom(label, dateString) {
      if (label.customerType === "dropInput" && !this.checkInputValidate(label, dateString)) {
        return;
      }

      this.$set(this.dropmenuItem, label.templateParams[0], dateString[0]);
      this.$set(this.dropmenuItem, label.templateParams[1], dateString[1]);


      this.selectedData = label.value;
      this.emitData(label);
    },
    // 重置自定义
    resetCustom(label) {
      this.clearSelected();
    },
    clearTimer() {
      if (this.handleMouseEnter.timer) {
        clearTimeout(this.handleMouseEnter.timer)
      }
      if (this.handleMouseLeave.timer) {
        clearTimeout(this.handleMouseLeave.timer)
      }
    },
    handleMouseEnter(label) {
      this.clearTimer();
      this.handleMouseEnter.timer = setTimeout(() => {
        this.$set(
        this.dropmenuItem.componentConf,
          "showCustom",
          !!label.isCustomer
        );
        if (label.isCustomer && label.customerType === "dropDate") {
          this.$nextTick(() => {
            this.$refs[
              label.value
            ][0].$refs.rangePicker.$refs.picker.sOpen = true;
          });
        }
      }, 300);
    },
    handleMouseLeave(label) {
      this.clearTimer();
      this.handleMouseLeave.timer = setTimeout(() => {
        this.$set(this.dropmenuItem.componentConf, "showCustom", false);
      }, 300)
    },
    getOptions() {
      let nowYear = moment().subtract(1, "years").format("YYYY");
      let years = [];
      for (let i = -50; i < 50; i++) {
        years.push(1 * nowYear + i);
      }
      let { labelList } = this.componentConf;
      labelList.forEach((item) => {
        let title = item.title;
        if (item.code || item.code === 0) {
          item.title = years[1 * item.code + 50] + title;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-radio-wrap {
  position: relative;
  padding: 8px 0;
  .radio-item {
    box-sizing: border-box;
    height: 28px;
    padding: 0 12px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 13px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: rgba(0, 128, 255, 0.08);
    }
    &-span {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .active {
    background: rgba(0, 128, 255, 0.08);
  }
  .custom-panel {
    position: absolute;
    right: -204px;
    // bottom: 0;
    // top: 0;
    width: 204px;
    background-color: #fff;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }
  .absolute-top {
    top: 0;
  }
  .absolute-bottom {
    bottom: 0;
  }
}
</style>
