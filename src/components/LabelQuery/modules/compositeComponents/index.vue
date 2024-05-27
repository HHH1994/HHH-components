<template>
  <div class="label-pack">
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
    <div class="label-boxs">
      <component
        v-for="(item, index) in componentConf.components"
        :key="index"
        :is="item.componentType"
        :ref="item.menuId"
        :component-data="item"
        :invert-labels="computedValues(item)"
        :packId="componentData.packId"
        @change="changeLabelValue"
      />
    </div>
  </div>
</template>

<script>
import YsSelect from "./components/YsSelect.vue";
import cascader from "./components/cascader.vue";
import InputSearch from "./components/inputSearch.vue";
export default {
  name: 'CompositeComponents',
  components: {
    cascader,
    YsSelect,
    InputSearch,
  },
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
      saveData: {
        componentType: "compose",
        tagName: "",
        idList: [this.componentData.packId],
        labelIds: [],
        id: "",
      },
    };
  },
  computed: {
    componentConf() {
      return this.componentData.componentConf || {};
    },
    computedValues() {
      return function (node) {
        let filterArr = this.saveData.labelIds.filter((item) =>
          item.idList.includes(node.menuId)
        );
        if (filterArr && filterArr.length) {
          let findItem = filterArr[0];
          return JSON.parse(JSON.stringify(filterArr));
        }
        return [];
      };
    },
  },
  watch: {
    invertLabels: {
      handler(newVal) {
        newVal && this.getData(newVal);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getData(newVal) {
      let itemValues = newVal.filter((item) =>
        item.idList.includes(this.componentData.packId)
      );
      if (itemValues && itemValues.length) {
        this.saveData = JSON.parse(JSON.stringify(itemValues[0]));
        this.$emit("change", JSON.parse(JSON.stringify([this.saveData])));
      }
    },
    // 值发生改变的时候
    changeLabelValue(value, data, isDefault) {
      // 如果 配置中 有 relatedId，说明 它的改变 会引起 其他组件的改变
      if (data && data.relatedId) {
        let { relatedId } = data;
        this.$nextTick(() => {
          this.$refs[relatedId][0].getOptions(
            value.labelId,
            isDefault ? false : true
          );
        });
      }
      this.emitData(value, data);
    },
    emitData(value, data) {
      // 处理 组合标签 向外抛 的数据
      /**
       * tagName: 处理好的数据
       * idList: [packId]
       * componentType: 'compose' --- 代表组合 标签
       * labelIds: {
       *   401: {
       *     idList: [menuId],
       *     realValues: [],
       *     labelId: [],
       *     tagName: '',
       *     componentType: ''
       *   }
       * } --- 是个对象，内部 是 各个 小组件 需要的东西
       */
      let { labelIds } = this.saveData;
      let findIndex = labelIds.findIndex((item) => {
        return item.idList && item.idList.includes(data.menuId);
      });
      findIndex > -1 && labelIds.splice(findIndex, 1);
      labelIds.push(value);
      // 处理 一个 组合上的 tagName
      let tagName = this.componentConf.needShowPackName
        ? this.componentData.packName + "："
        : "";
      labelIds.sort((a, b) => a.sort - b.sort);
      labelIds.forEach((node) => {
        if (node.sort === 1) {
          tagName +=
            node.tagName + (!this.componentConf.needShowPackName ? "：" : "");
        } else {
          tagName += node.tagName || "";
        }
      });
      // 组合标签，当一些 重要的没有选择的时候，不需要 在 已选标签中展示
      let hasValue = labelIds.find(
        (ele) => ele.showSingle && ele.labelId.length
      );
      this.saveData.tagName = hasValue ? tagName : "";
      this.saveData.labelIds = labelIds;
      this.saveData.id = this.componentConf.id;
      this.$emit("change", JSON.parse(JSON.stringify([this.saveData])));
    },
    getData1(value, relatedId) {
      this.$refs[relatedId][0].getOptions(value, false);
    },
    // 清除选中值
    clearSelected() {
      this.saveData.tagName = "";
      this.saveData.labelIds = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.label-pack {
  display: flex;
}
.label-boxs {
  flex: 1;
  display: flex;
  align-items: center;
  & > div:first-child {
    /deep/ .el-input__inner {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
  & > div:last-child {
    /deep/ .el-input__inner {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  & > div:not(:last-child) {
    /deep/ .el-input__inner {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  & > div:not(:first-child) {
    /deep/ .el-input__inner {
      // border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .el-select{
    flex-shrink: 0;
  }
}
</style>
