<template>
  <el-select
    v-model="value"
    :style="{ width: (componentConf.width || 200) + 'px' }"
    :placeholder="componentConf.placeHolder"
    :clearable="componentConf.clearable"
    @change="handleChange"
  >
    <el-option
      v-for="(option, index) in componentConf.labelList"
      :key="'option' + index"
      :disabled="option.disabled"
      :value="option.value"
      :label="option.label"
    />
  </el-select>
</template>

<script>
export default {
  name: "YsSelect",
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
    invertLabels: {
      type: Array,
      default: () => [],
    },
    packId: {
      type: String | Number,
      default: "",
    },
  },
  data() {
    return {
      value: undefined,
      componentConf: {},
    };
  },
  watch: {
    componentData: {
      async handler(newVal, oldVal) {
        if (newVal) {
          let config = JSON.parse(JSON.stringify(newVal.componentConf));
          this.componentConf = config || {};
          if (config.dataApi) {
            config.labelList = await this.getOptions(config.dataApi);
          }
        }
      },
      deep: true,
      immediate: true,
    },
    invertLabels: {
      handler(newVal, oldVal) {
        if (newVal) {
          let item = newVal[0];
          console.log(item, "99999999999999");

          let { conditionParams } = this.componentConf;
          if (item && item.labelId.length && item.labelId[0].params) {
            this.value = item.labelId[0].params[conditionParams.templateParams[0]] || undefined;
            console.log(this.value, "99999999999999");
          } else {
            this.value = undefined;
          }
          // 如果没有选中值，且有 defaultValue，则需要默认显示
          if (
            !this.value &&
            (this.componentConf.defaultValue ||
              this.componentConf.defaultValue === 0)
          ) {
            this.value = this.componentConf.defaultValue;
            this.handleChange(this.value, true);
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 获取 options
    getOptions() {
      let options = [
        {
          label: "包含1",
          value: 1,
        },
        {
          label: "不包含2",
          value: 2,
        },
      ];
      return options;
    },
    // select 值改变
    handleChange(e, need) {
      let findItem = this.componentConf.labelList.find(
        (item) => item.value === e
      );
      let obj = {};
      if (this.componentConf.conditionParams && e) {
        let { conditionParams } = this.componentConf;
        obj = {
          id: conditionParams.labelParams,
          params: {
            [conditionParams.templateParams && conditionParams.templateParams[0]]:e,
          }
        };
      }
      this.$emit(
        "change",
        {
          idList: [this.packId, this.componentData.menuId],
          tagName: (findItem && findItem.label) || "",
          labelId: obj.id ? [obj] : [],
          sort: this.componentData.sort,
          showSingle: this.componentConf.showSingle,
        },
        this.componentData,
        need
      );
    },
    // 清除选中值
    clearSelected() {
      this.value = undefined;
    },
  },
};
</script>

<style></style>
