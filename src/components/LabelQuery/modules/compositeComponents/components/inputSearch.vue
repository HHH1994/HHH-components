<template>
  <el-input
    prefix-icon="el-icon-search"
    v-model="inputValue"
    clearable
    :placeholder="componentConf.placeholder"
    @blur="emitData"
    @clear="emitData"
  >
  </el-input>
</template>

<script>
export default {
  name: "InputSearch",
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
      inputValue: "",
      componentConf: {},
    };
  },
  watch: {
    componentData: {
      async handler(newVal, oldVal) {
        if (newVal) {
          let config = JSON.parse(JSON.stringify(newVal.componentConf));
          this.componentConf = config || {};
        }
      },
      deep: true,
      immediate: true,
    },
    invertLabels: {
      handler(newVal, oldVal) {
        if (newVal) {
          let item = newVal[0];
          let { conditionParams } = this.componentConf;
          if (item && item.labelId.length && item.labelId[0].params) {
            this.inputValue =
              item.labelId[0].params[conditionParams.templateParams[0]] || "";
          } else {
            this.inputValue = "";
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    emitData() {
      let obj = {};
      if (this.componentConf.conditionParams && this.inputValue) {
        let { conditionParams } = this.componentConf;
        obj = {
          id: conditionParams.labelParams,
          params: {
            [conditionParams.templateParams && conditionParams.templateParams[0]]: this.inputValue,
          }
        };
      }
      this.$emit(
        "change",
        {
          idList: [this.packId, this.componentData.menuId],
          tagName: this.inputValue || "",
          labelId: obj.id ? [obj] : [],
          sort: this.componentData.sort,
          showSingle: this.componentConf.showSingle,
        },
        this.componentData
      );
    },
    // 清除选中值
    clearSelected() {
      this.inputValue = "";
    },
  },
};
</script>

<style></style>
