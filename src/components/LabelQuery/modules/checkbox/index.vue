<template>
  <div class="check-wrap">
    <div v-if="showLabelTitle" class="label-name">
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
    <div class="inner-checkbox">
      <a-checkbox-group
        v-model="selectedData"
        :disabled="isDisabled"
        @change="changeLabel"
      >
        <a-checkbox
          v-if="componentConf.isHasAll"
          ref="checkAllRef"
          value="all"
          @change="changeAllLabel"
        >
          全部
        </a-checkbox>
        <a-checkbox
          v-for="label in componentConf.labelList"
          :key="label.value"
          :value="label"
        >
          <div class="inner-tip">
            <a-tooltip v-if="label.tip" placement="bottom">
              <template slot="title">
                <span>{{ label.tip }}</span>
              </template>
              <i class="iconfont iconCheck-Circle1" />
            </a-tooltip>
          </div>
          <a-popover
            v-if="label.isCustomer"
            :key="label.value"
            :visible-arrow="false"
            :getPopupContainer="getPopupContainer"
            placement="bottom"
            trigger="hover"
            overlay-class-name="checkbox-custom-popover"
            @visibleChange="popoverVisibleChange"
          >
            <custom-popover
              slot="content"
              :component-conf="componentConf"
              :label="label"
              :default-range-picker-date="rangePickerDate"
              @resetCustom="resetCustom"
              @confirmCustom="confirmCustom"
            />
            <span
              v-if="
                componentConf[label.templateParams[0]] &&
                componentConf[label.templateParams[1]]
              "
            >
              {{ componentConf[label.templateParams[0]] }} -
              {{ componentConf[label.templateParams[1]] }}
              {{ label.customerUnit }}
              <a-icon
                v-show="popoverVisible"
                type="close-circle"
                @click.stop="resetCustom(label)"
              />
              <a-icon v-show="!popoverVisible" type="caret-down" />
            </span>
            <span v-else>
              {{ label.title }}
              <a-icon type="caret-down" :class="{ rotate: popoverVisible }" />
            </span>
          </a-popover>
          <span v-else> {{ label.title }}</span>
        </a-checkbox>
      </a-checkbox-group>
    </div>
  </div>
</template>

<script>
import CustomPopover from "../../components/customPopover.vue";
import moment from "moment";
export default {
  name: "MarketCheckbox",
  components: { CustomPopover },
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
    showLabelTitle: {
      type: Boolean,
      default: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    getPopupContainer: {
      type: Function,
      default: ((triggerNode) => triggerNode.parentNode.parentNode.parentNode)
    }
  },
  data() {
    return {
      allCheckFlag: 0, // 0-默认状态 1-勾选 2-不勾选
      selectedData: [],
      rangePickerDate: [],
      popoverVisible: false,
      openFlag: false,
    };
  },
  computed: {
    componentConf() {
      return this.componentData.componentConf || {};
    },
    customLabel() {
      return this.componentConf.labelList.find((v) => v.isCustomer) || {};
    },
    id() {
      return this.componentData.packId || this.componentData.categoryId;
    },
  },

  watch: {
    invertLabels: {
      handler(val) {
        if (val && val.length) {
          this.renderInvertLabels();
        } else {
          this.selectedData = [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (this.componentConf.dataApi === 'getYears') {
      this.getOptions();
    }
  },
  methods: {
    initResizeObserver() {
      const targetElement = this.$refs.innerCheckbox;
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === targetElement) {
            // console.log("Offset width changed:", entry.target.offsetWidth);
            // 在这里执行相应的处理逻辑
            this.resizeCb();
          }
        }
      });
      this.resizeObserver.observe(targetElement);
    },
    paramsValue(index) {
      const label = this.customLabel;
      return label ? this.componentConf[label.templateParams[index]] : "";
    },
    renderIsCheckAll(currentLabel) {
      if (this.componentConf.isHasAll) {
        this.selectedData = [];
        const commonCheckboxCount = this.componentData.componentConf.labelList.filter(label => !label.isCustomer).length;
        const selectedCheckboxCount = currentLabel.labelId.filter(label => !label.params).length;
        console.log(commonCheckboxCount, selectedCheckboxCount);
        if (commonCheckboxCount === selectedCheckboxCount) {
          this.$nextTick(() => {
            this.selectedData.push('all')
          })
        }
      }
    },
    // 反显元素
    renderInvertLabels() {
      const index = this.invertLabels.findIndex((v) =>
        v.idList.includes(this.id)
      );

      if (index > -1) {
        let selectedData = [];
        const currentLabel = this.invertLabels[index];
        this.renderIsCheckAll(currentLabel);

        currentLabel.labelId.forEach((item) => {
          const itemLabel = this.componentConf.labelList.find(
            (v) => v.value === item.id
          );
          if (itemLabel.isCustomer && item.params) {
            itemLabel.templateParams.forEach((v) => {
              this.$set(this.componentConf, v, item.params[v]);
            });
            if (itemLabel.customerType === "dropDate") {
              this.rangePickerDate = [
                moment(item.params[itemLabel.templateParams[0]]),
                moment(item.params[itemLabel.templateParams[1]]),
              ];
            }
          }
          selectedData.push(itemLabel);
        });
        this.selectedData = selectedData;
        this.emitData();
      }
    },
    // 判断两个数组元素一致,但顺序可以不一致,只适用元素不重复的情况
    isArrEqual(arr1, arr2) {
      return (
        arr1.length === arr2.length && arr1.every((ele) => arr2.includes(ele))
      );
    },
    // 清空选择的元素
    clearSelected() {
      this.selectedData = [];
      const label = this.customLabel;
      if (label && label.templateParams && label.templateParams.length) {
        this.componentConf[label.templateParams[0]] = "";
        this.componentConf[label.templateParams[1]] = "";
        this.rangePickerDate = [];
      }
      const selectedData = [
        {
          idList: [this.id],
          tagName: "",
          labelId: [],
        },
      ];
      this.$emit("change", selectedData);
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
      const allList = this.componentConf.labelList.filter(
        (v) => !v.isCustomer && v.value
      );
      const allListIds = allList.map((v) => v.value);
      const checkedValuesIds = checkedValues.map((v) => v.value);
      // allFlag-子选项是否全部选中,选中后需要默认勾上全部
      const allFlag = this.isArrEqual(allListIds, checkedValuesIds);
      if (allFlag || this.allCheckFlag === 1) {
        this.selectedData = ["all", ...allList];
      } else {
        this.selectedData = this.selectedData.filter((item) => item !== "all");
      }
      this.allCheckFlag = 0;
    },
    // 拼接已选条件反显的tag
    handleTagName() {
      let tagName =
        (this.componentData.packName || this.componentData.title) + "：";
      let onlyUnlimitedFlag = true;
      this.selectedData.forEach((item, i) => {
        if (item.value && item.isCustomer) {
          // 自定义
          onlyUnlimitedFlag = false;
          let paramsTagName = [];
          item.templateParams.forEach((key, idx) => {
            paramsTagName[idx] = this.paramsValue(idx)
          })
          tagName +=  paramsTagName.join('-') + item.customerUnit;
        } else if (item.value) {
          onlyUnlimitedFlag = false;
          tagName +=
            i === this.selectedData.length - 1 ? item.title : item.title + ",";
        }
      });
      return onlyUnlimitedFlag ? "" : tagName;
    },
    // 处理条件入参
    handleLabelId() {
      const labelId = [];
      this.selectedData.forEach((item) => {
        if (item.value && item.isCustomer) {
          const params = {};
          item.templateParams.forEach((key, idx) => {
            params[key] = this.paramsValue(idx)
          })
          labelId.push({
            id: item.value,
            params: params
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
        if (!this.paramsValue(0) || !this.paramsValue(1)) {
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

      return true;
    },
    changeLabel(checkedValues) {
      if (checkedValues.length) {
        this.handleMutex(checkedValues);
        if (this.componentConf.isHasAll) {
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

    // 确认自定义
    confirmCustom(label, dateString) {
      dateString.forEach((val, idx) => {
        this.$set(this.componentConf, label.templateParams[idx], val);  
      })
      
      if (label.customerType === "dropInput" && !this.checkpPlausible(label)) {
        return;
      }

      this.selectedData = [label];
      this.emitData();
    },
    // 重置自定义
    resetCustom() {
      this.clearSelected();
      this.emitData("reset");
    },
    emitData(type) {
      let selectedData = [];
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
            idList: [this.id],
            tagName: "",
            labelId: [],
            hightLightFalg: false,
          },
        ];
      } else {
        selectedData = [
          {
            idList: [this.id],
            tagName: this.handleTagName(),
            labelId: this.handleLabelId(),
            hightLightFalg: true,
          },
        ];
      }
      console.log(selectedData, "selectedData");
      this.$emit("change", selectedData);
    },
    popoverVisibleChange(flag) {
      this.popoverVisible = flag;
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
      console.log(labelList);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../common.scss");
.check-wrap {
  display: flex;
  align-items: flex-start;

  // margin-bottom: 12px;
  .inner-checkbox {
    flex: 1;
    transition: all 0.25s;
    // height: fit-content;
    overflow: hidden;
    line-height: 1;
    /deep/.ant-checkbox-wrapper {
      position: relative;
      // width: 180px;
      margin: 0;
      height: 28px;
      padding-right: 24px;
      line-height: 28px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 400;
      font-size: 13px;
    }
    /deep/.ant-checkbox-group {
      // line-height: 28px;
      line-height: 1;
    }
    /deep/.ant-checkbox-wrapper-checked {
      color: #0080ff;
    }
  }
}
</style>
<style lang="less">
.checkbox-custom-popover {
  min-width: 88px;
  .ant-popover-content {
    .ant-popover-arrow {
      display: none;
    }
  }
  .ant-popover-inner-content {
    padding: 0 !important;
  }
}
.ant-checkbox-inner {
  width: 14px;
  height: 14px;
}
.query-box {
  .check-wrap .inner-checkbox .ant-checkbox-group {
    display: block;
    font-size: 0;
  }
}
.ant-checkbox-wrapper:hover .ant-checkbox + span > span{
  color: #0080ff;
}
</style>
