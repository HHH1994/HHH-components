<template>
  <div class="radio-label-wrap">
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
    <div class="inner-radio">
      <a-radio-group
        v-model="selectedData"
        name="radioGroup"
        :disabled="isDisabled"
        :default-value="componentData.defaultValue"
        @change="changeLabel"
      >
        <a-radio
          v-for="label in componentConf.labelList"
          :key="label.value"
          :value="label"
          @click="clickRadio(label.value)" 
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
            placement="bottom"
            width="204"
            trigger="click"
            overlay-class-name="radio-custom-popover"
            :get-popup-container="getPopupContainer"
            @visibleChange="(flag) => popoverVisibleChange(flag, label)"
          >
            <custom-popover
              slot="content"
              :component-conf="componentConf"
              :label="label"
              :default-range-picker-date="rangePickerDate"
              @resetCustom="resetCustom"
              @confirmCustom="confirmCustom"
            />
            <template
              v-if="
                componentConf[label.templateParams[0]] &&
                componentConf[label.templateParams[1]]
              "
            >
              <a-tooltip
                v-if="
                  (
                    componentConf[label.templateParams[0]] +
                    '-' +
                    componentConf[label.templateParams[1]] +
                    label.customerUnit
                  ).length > 10
                "
                placement="topLeft"
              >
                <template slot="title">
                  <span>
                    {{ componentConf[label.templateParams[0]] }} -
                    {{ componentConf[label.templateParams[1]] }}
                    {{ label.customerUnit }}</span
                  >
                </template>
                <span class="ellipsis-text">
                  {{ componentConf[label.templateParams[0]] }} -
                  {{ componentConf[label.templateParams[1]] }}
                  {{ label.customerUnit }}
                </span>
              </a-tooltip>

              <a-icon
                v-show="popoverVisible"
                type="close-circle"
                @click.stop="resetCustom(label)" />
              <a-icon v-show="!popoverVisible" type="caret-down"
            /></template>

            <span v-else>
              {{ label.title }}
              <a-icon type="caret-down" :class="{ rotate: popoverVisible }" />
            </span>
          </a-popover>
          <template v-else>
            <a-tooltip v-if="label.title.length > 11" placement="topLeft">
              <template slot="title">
                <span>{{ label.title }}</span>
              </template>
              <span class="ellipsis-text"> {{ label.title }}</span>
            </a-tooltip>
            <span v-else class="ellipsis-text"> {{ label.title }}</span>
          </template>
        </a-radio>
      </a-radio-group>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CustomPopover from "../../components/customPopover.vue";
export default {
  name: "MarketRadio",
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
  },
  data() {
    return {
      selectedData: "",
      rangePickerDate: [],
      popoverVisible: false,
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
          this.selectedData = "";
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
    paramsValue(index) {
      const label = this.customLabel;
      return label ? this.componentConf[label.templateParams[index]] : "";
    },
    getCalendarContainer(triggerNode) {
      return triggerNode.parentNode;
    },
    // 反显元素
    renderInvertLabels() {
      const index = this.invertLabels.findIndex((v) =>
        v.idList.includes(this.id)
      );
      if (index > -1) {
        const currentLabel = this.invertLabels[index];
        const selectedItem = currentLabel.labelId[0];
        this.selectedData = this.componentConf.labelList.find(
          (v) => v.value === selectedItem.id
        );
        const customLabel = this.componentConf.labelList.find(
          (v) => v.isCustomer
        );
        // 自定义反显
        if (
          customLabel &&
          customLabel.templateParams &&
          customLabel.templateParams.length &&
          selectedItem.params
        ) {
          customLabel.templateParams.forEach((v) => {
            this.$set(this.componentConf, v, selectedItem.params[v]);
          });
          if (customLabel.customerType === "dropDate") {
            console.log("selectedItem.params", selectedItem.params);
            this.rangePickerDate = [
              moment(selectedItem.params[customLabel.templateParams[0]]),
              moment(selectedItem.params[customLabel.templateParams[1]]),
            ];
          }
        }
        this.$emit("change", [JSON.parse(JSON.stringify(currentLabel))]);
        console.log(this.rangePickerDate, "rangePickerDate");
      }
    },
    // 清空选择的元素
    clearSelected() {
      this.selectedData = "";
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
          hightLightFalg: false,
        },
      ];
      this.$emit("change", selectedData, "reset");
    },
    // 拼接已选条件反显的tag
    handleTagName(value) {
      let tagName;
      const configTagName = this.componentData.packName || this.componentData.title;
      if (value.isCustomer) {
        // 自定义的情况
        let paramsTagName = [];
        item.templateParams.forEach((key, idx) => {
          paramsTagName[idx] = this.paramsValue(idx)
        })
        tagName = `${configTagName}${configTagName.indexOf(':') > -1 || configTagName.indexOf('：') > -1 ? '' : '：' }
        ${paramsTagName.join('-')}${value.customerUnit}`;
      } else {
        tagName = `${configTagName}
        ${configTagName.indexOf(':') > -1 || configTagName.indexOf('：') > -1 ? '' : '：' }${value.title}`;
      }
      return tagName;
    },
    // 处理条件入参
    handleLabelId(value) {
      let labelId;
      if (value && value.isCustomer) {
        // 选择自定义
        const params = {};
        item.templateParams.forEach((key, idx) => {
          params[key] = this.paramsValue(idx)
        })        
        labelId = [
          {
            id: value.value,
            params: params
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

    // 判断自定义选值是否合理
    checkpPlausible(label) {
      if (label.customerType === "dropInput") {
        if (!this.paramsValue(0) || !this.paramsValue(1)) {
          // this.$message.error('请选择自定义值');
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

      return true
    },
    // 确认自定义
    confirmCustom(label, dateString) {
      dateString.forEach((val, idx) => {
        this.$set(this.componentConf, label.templateParams[idx], val);  
      })
      // this.$set(this.componentConf, label.templateParams[0], dateString[0]);
      // this.$set(this.componentConf, label.templateParams[1], dateString[1]);
      if (label.customerType === "dropInput" && !this.checkpPlausible(label)) {
        return;
      }

      this.selectedData = label;
      this.emitData(label);
    },
    // 重置自定义
    resetCustom(label) {
      this.clearSelected();
      // this.emitData(label, 'reset');
    },
    changeLabel(e) {
      const value = e.target.value;
      this.emitData(value);
    },
    emitData(value, type) {
      let selectedData;
      // type === "reset",重置的时候不校验自定义,清空选项
      // 其他时候选择自定义需要先校验自定义的值
      if (value.isCustomer && !this.checkpPlausible(value)) {
        this.selectedData = "";
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
            tagName: this.handleTagName(value),
            labelId: this.handleLabelId(value),
            hightLightFalg: true,
          },
        ];
      }
      console.log(selectedData, "selectedData");
      this.$emit("change", selectedData);
    },
    popoverVisibleChange(flag, label) {
      this.popoverVisible = flag;
      // this.$nextTick(() => {
      //   this.$refs[label.value][0].$refs.picker.sOpen = true;
      // });
    },
    getPopupContainer(triggerNode) {
      return triggerNode.parentNode.parentNode.parentNode;
    },
    clickRadio(val) {
      if (this.componentConf.clickCancel) {        
        if (this.selectedData.value === val) {
          this.clearSelected();
        }
      }
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
.radio-label-wrap {
  display: flex;
  align-items: flex-start;

  .inner-radio {
    flex: 1;
    /deep/.ant-radio-wrapper {
      position: relative;
      width: 180px;
      height: 28px;
      line-height: 28px;
      margin: 0;
      // margin-bottom: 12px;

      font-weight: 400;
      color: rgba(0, 0, 0, 85);
      font-size: 13px;
    }
    .ellipsis-text {
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
      vertical-align: middle;
    }
    /deep/.ant-radio-wrapper-checked {
      color: #0080ff;
    }
    .anticon {
      height: 14px;
      line-height: 20px;
      margin-left: 4px;
    }
  }
}

/deep/ .ant-radio-wrapper:hover .ant-radio + span > span{
  color: #0080ff;
}
</style>
<style lang="scss">
.radio-custom-popover {
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
</style>
