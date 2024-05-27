<template>
  <div class="dropdown-checkbox-wrap">
    <a-checkbox-group v-model="selectedData" @change="changeLabel">
      <a-checkbox
          v-if="dropmenuItem.isHasAll"
          ref="checkAllRef"
          value="all"
          @change="changeAllLabel"
        >
          全部
      </a-checkbox>
      <a-checkbox
        v-for="label in labelList"
        :key="label.value"
        :value="label"
        @mouseenter="handleMouseEnter(label)"
        @mouseleave="handleMouseLeave(label)"
        @click="handleMouseEnter(label)"
      >
        <EllipsisText :text="label.title"></EllipsisText>
        <template v-if="label.isCustomer">
          <div
            v-show="showCustom"
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
              :default-value="computedValue(label)"
              @resetCustom="resetCustom"
              @confirmCustom="confirmCustom"
            />
          </div>
        </template>
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>

<script>
import moment from "moment";
import CustomPopover from "../../../components/customPopover.vue";
import EllipsisText from "../../../components/ellipsisText.vue";
export default {
  name: "MarketDropdownCheckbox",
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
      allCheckFlag: 0, // 0-默认状态 1-勾选 2-不勾选
      selectedData: [],
      showCustom: false,
    };
  },
  computed: {
    labelList() {
      return this.dropmenuItem.componentConf.labelList;
    },
    customLabel() {
      return this.labelList && this.labelList.length
        ? this.labelList.find((v) => v.isCustomer)
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
          this.clearSelected("clear");
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
          item.labelId.forEach((label) => {
            const correspondsLabel = this.labelList.find(
              (v) => v.value === label.id
            );
            if (correspondsLabel) {
              this.selectedData.push(correspondsLabel);
            }
            const customLabel = this.customLabel;
            if (
              customLabel &&
              customLabel.templateParams &&
              customLabel.templateParams.length && 
              label.params
            ) {
              customLabel.templateParams.forEach((v) => {
                this.$set(this.dropmenuItem, v, label.params[v]);
              });
              if (customLabel.customerType === "dropDate") {
                this.$set(this.dropmenuItem, "rangePickerDate", [
                  moment(label.params[customLabel.templateParams[0]]),
                  moment(label.params[customLabel.templateParams[1]]),
                ]);
              }
            }
          });
        }
      });
    },
    paramsValue(index) {
      return this.customLabel
        ? this.dropmenuItem[this.customLabel.templateParams[index]]
        : "";
    },
    // 清空选择的元素
    clearSelected(type) {
      this.selectedData = [];
      if (this.customLabel && Object.keys(this.customLabel).length) {
        this.dropmenuItem[this.customLabel.templateParams[0]] = "";
        this.dropmenuItem[this.customLabel.templateParams[1]] = "";
        this.dropmenuItem.rangePickerDate = [];
      }
      const selectedData = [
        {
          idList: [this.packId, this.dropmenuItem.menuId],
          tagName: "",
          labelId: [],
          hightLightFalg: false,
        },
      ];
      if (type === "clear") return;
      this.$emit("change", selectedData);
    },
    // 判断两个数组元素一致,但顺序可以不一致,只适用元素不重复的情况
    isArrEqual(arr1, arr2) {
      return (
        arr1.length === arr2.length && arr1.every((ele) => arr2.includes(ele))
      );
    },
    // 处理不限||自定义与其他选项互斥的情况
    handleMutex(checkedValues) {
      const lastvalue = checkedValues[checkedValues.length - 1];
      const startValue = checkedValues[0];
      if (lastvalue.value === "" || lastvalue.isCustomer) {
        this.selectedData = [this.selectedData[checkedValues.length - 1]];
        return;
      } else {
        if (startValue.value === "" || startValue.isCustomer) {
          this.selectedData = checkedValues.slice(1, checkedValues.length);
          return;
        }
      }
      this.selectedData = checkedValues;
    },
    changeAllLabel(e) {
      this.allCheckFlag = e.target.checked ? 1 : 2;
    },
    // 处理全部
    handlAllMutex(checkedValues) {
      if (this.allCheckFlag === 2) {
        // 手动取消全选
        this.selectedData = [];
        this.allCheckFlag = 0;
        return;
      }
      const allList = this.labelList.filter((v) => !v.isCustomer && v.value);
      const allListIds = allList.map((v) => v.value);
      const checkedValuesIds = checkedValues.map((v) => v.value);
      // allFlag-子选项是否全部选中,选中后需要默认勾上全部
      const allFlag = this.isArrEqual(allListIds, checkedValuesIds);
      if (allFlag || this.allCheckFlag === 1) {
        this.selectedData = [...allList, "all"];
      } else {
        this.selectedData = this.selectedData.filter((item) => item !== "all");
      }
      this.allCheckFlag = 0;
    },
    changeLabel(checkedValues) {
      if (checkedValues.length) {
        this.handleMutex(checkedValues);
        if (this.dropmenuItem.isHasAll) {
          this.handlAllMutex(checkedValues);
        }
      }

      if (this.selectedData.length === 0) {
        this.selectedData = [];
        this.emitData("reset");
        return;
      }
      this.emitData();
    },
    // 拼接已选条件反显的tag
    handleTagName() {
      let tagName = this.dropmenuItem.title + "：";
      let onlyUnlimitedFlag = true;
      this.selectedData.forEach((item, i) => {
        if (item.value && item.isCustomer) {
          // 自定义
          onlyUnlimitedFlag = false;
          tagName +=
            (this.paramsValue(0) || "") +
            (this.paramsValue(0) && this.paramsValue(1) ? "-" : "") +
            (this.paramsValue(1) || "") +
            (item.customerUnit || "");
        } else if (item.value) {
          onlyUnlimitedFlag = false;
          tagName +=
            i === this.selectedData.length - 1 ? item.title : item.title + "，";
        }
      });
      return onlyUnlimitedFlag ? "" : tagName;
    },
    // 处理条件入参
    handleLabelId() {
      const labelId = [];
      this.selectedData.forEach((item) => {
        if (item.value && item.isCustomer) {
          labelId.push({
            id: item.value,
            params: {
              [item.templateParams[0]]: this.paramsValue(0),
              [item.templateParams[1]]: this.paramsValue(1),
            }
          });
        } else if (item.value) {
          labelId.push({ id: item.value });
        }
      });
      return labelId;
    },
    // 校验自定义的值
    checkpPlausible(label) {
      if (label.customerType === "dropInput") {
        if (!this.paramsValue(0) && !this.paramsValue(1)) {
          // this.$message.error('请输入自定义值');
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
    // 确认自定义
    confirmCustom(label, dateString) {
      this.$set(this.dropmenuItem, label.templateParams[0], dateString[0]);
      this.$set(this.dropmenuItem, label.templateParams[1], dateString[1]);
      if (label.customerType === "dropInput" && !this.checkpPlausible(label)) {
        return;
      }
      if (label.customerType === "dropInput") {
        this.selectedData = [{ ...label }];
      } else {
        this.selectedData = [label];
      }
      this.emitData(label);
    },

    // 重置自定义
    resetCustom() {
      this.clearSelected();
      // this.emitData('reset');
    },
    emitData() {
      let selectedData;
      // type === "reset",重置的时候不校验自定义,清空选项
      // 其他时候选择自定义需要先校验自定义的值
      if (
        !this.selectedData.length ||
        (this.selectedData[0].isCustomer &&
          !this.checkpPlausible(this.selectedData[0]))
      ) {
        this.selectedData = [];
        selectedData = [
          {
            idList: [this.packId, this.dropmenuItem.menuId],
            tagName: "",
            labelId: [],
            selectedLen: 0,
            hightLightFalg: false,
          },
        ];
      } else {
        selectedData = [
          {
            idList: [this.packId, this.dropmenuItem.menuId],
            tagName: this.handleTagName(),
            labelId: this.handleLabelId(),
            selectedLen: this.handleTagName().split("，").length,
            hightLightFalg: true,
          },
        ];
      }
      console.log(selectedData, "selectedData-dropdownCheckbox");
      this.$emit("change", selectedData);
    },
    clearTimer() {
      if (this.handleMouseEnter.timer) {
        clearTimeout(this.handleMouseEnter.timer);
      }

      if (this.handleMouseLeave.timer) {
        clearTimeout(this.handleMouseLeave.timer);
      }
    },
    handleMouseEnter(label) {
      this.clearTimer();
      this.handleMouseEnter.timer = setTimeout(() => {
        if (!label.isCustomer) {
          this.showCustom = false;
          return;
        }
        this.showCustom = true;
        if (label.customerType === "dropDate") {
          this.$nextTick(() => {
            this.$refs[
              label.value
            ][0].$refs.rangePicker.$refs.picker.sOpen = true;
          });
        }
      }, 300)
    },
    handleMouseLeave(label) {
      this.clearTimer()
      this.handleMouseLeave.timer = setTimeout(() => {
        this.showCustom = false;
      }, 300)
    },
    // 全选 取消全选
    selectAll() {
      let checkValues = this.labelList.filter((item) => !item.isCustomer);
      // 如果 全部选中的话，再次点击就是取消全选
      if (this.selectedData.length === checkValues.length) {
        this.clearSelected();
      } else {
        if (this.customLabel && Object.keys(this.customLabel).length) {
          this.dropmenuItem[this.customLabel.templateParams[0]] = "";
          this.dropmenuItem[this.customLabel.templateParams[1]] = "";
          this.dropmenuItem.rangePickerDate = [];
        }
        this.changeLabel(checkValues);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-checkbox-wrap {
  position: relative;
  padding: 8px 0;
  /deep/.ant-checkbox-group {
    width: 100%;
  }
  /deep/.ant-checkbox-wrapper {
    width: 100% !important;
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    margin: 0;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.85);
    white-space: nowrap;
    font-weight: 400;
    font-size: 13px;
    &:hover {
      background: rgba(0, 128, 255, 0.08);
    }
    .ant-checkbox + span {
      flex: 1;
      min-width: 0;
      padding-right: 0;
    }
  }

  .custom-panel {
    position: absolute;
    right: -204px;
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
<style lang="scss">
.dropdown-popover {
  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
