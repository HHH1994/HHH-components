<template>
  <div class="custom-wrap" @click.prevent>
    <template v-if="label.customerType === 'input'">
      <div class="top-input">
        <a-input
          v-model="minValue"
          placeholder="请输入"
          :suffix="label.customerUnit"
          style="width: 180px"
        />
      </div>
      <div class="btn-wrap">
          <span class="reset" @click.stop="resetCustom(label)">
            <i class="el-icon-refresh-left" />
            重置
          </span>
          <span class="confirm" @click.stop="confirmCustom(label, [minValue])">确定</span>
      </div>
    </template>
    <template v-if="label.customerType === 'dropInput'">
      <div class="top-input">
        <a-input
          v-model="minValue"
          placeholder="请输入"
          :suffix="label.customerUnit"
          style="width: 180px"
        />
        <div class="zhi">~</div>
        <a-input
          v-model="maxValue"
          placeholder="请输入"
          :suffix="label.customerUnit"
          style="width: 180px"
        />
      </div>
      <div class="btn-wrap">
        <span class="reset" @click.stop="resetCustom(label)">
          <i class="el-icon-refresh-left" />
          重置
        </span>
        <span class="confirm" @click.stop="confirmCustom(label, [minValue, maxValue])">确定</span>
      </div>
    </template>
    <div v-if="label.customerType === 'dropDate'">
      <a-range-picker
        ref="rangePicker"
        v-model="rangePickerDate"
        format="YYYY-MM-DD"
        :get-calendar-container="getCalendarContainer"
        @change="
          (date, dateString) => {
            confirmCustom(label, dateString);
          }
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      default() {
        return {};
      },
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rangePickerDate: [],
      minValue: "",
      maxValue: "",
    };
  },
  watch: {
    defaultValue: {
      handler(val) {
        if (val) {
          this.minValue = val[0];
          this.maxValue = val[1];
          this.rangePickerDate = val;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    openPanel() {
      this.$refs[this.label.value].$refs.picker.sOpen = true;
      this.$forceUpdate();
    },
    resetCustom(label) {
      this.minValue = '';
      this.maxValue = '';
      this.$emit("resetCustom", label);
    },
    confirmCustom(label, dateString) {
      this.$emit("confirmCustom", label, dateString);
    },
    getCalendarContainer(triggerNode) {
      return triggerNode.parentNode;
    },
  },
};
</script>

<style lang="scss">
.custom-wrap {
  .top-input {
    padding: 8px 12px;
  }

  .zhi {
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
  .btn-wrap {
    // margin-top: 8px;
    padding: 8px 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    text-align: right;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.65);

    .reset {
      margin-right: 12px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .confirm {
      color: #0080ff;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #3197fd;
      }
    }
  }
}
</style>
