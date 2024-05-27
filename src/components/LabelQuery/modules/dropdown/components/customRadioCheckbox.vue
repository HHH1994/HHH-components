<!-- 前单选+后单选/多选级联 -->
<template>
  <div class="custom-radio-checkbox">
    <div class="left-radio">
      <div
        v-for="(item, i) in labelList"
        :key="i"
        class="left-radio-item"
        :class="{ active: selectedList.value === item.value }"
        @click="handleClick(item)"
      >
        <div class="item-label">
          {{ item.label }}
          <i v-if="item.childComponentType" class="el-icon-arrow-right" />
        </div>
      </div>
    </div>
    <div v-show="selectedList.componentConf" class="right-custom">
      <Radio
        v-if="selectedList.childComponentType === 'radio'"
        :ref="selectedList.value"
        :dropmenu-item="selectedList"
        :pack-id="packId"
        :invert-labels-item="childInvertLabelsItem"
        @change="handleChange"
      />
      <Checkbox
        v-else
        :ref="selectedList.value"
        :dropmenu-item="selectedList"
        :pack-id="packId"
        :invert-labels-item="childInvertLabelsItem"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import Radio from "./radio.vue";
import Checkbox from "./checkbox.vue";
export default {
  name: "MarketCustomRadioCheckbox",
  components: { Checkbox, Radio },
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
      selectedList: { childComponentType: "", componentConf: "" },
      selectedData: [],
      checkboxInvertLabels: [],
      childInvertLabelsItem: [],
    };
  },
  computed: {
    labelList() {
      return this.dropmenuItem.componentConf.labelList;
    },
  },
  watch: {
    invertLabelsItem: {
      handler(val) {
        if (val && val.length) {
          this.renderInvertLabels();
          this.childInvertLabelsItem = val;
        } else {
          this.selectedList = { childComponentType: "", componentConf: "" };
          this.selectedData = [];
          this.childInvertLabelsItem = [];
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
        const correspondsLabel = this.labelList.find((v) =>
          item.idList.includes(v.value)
        );
        if (correspondsLabel) {
          this.selectedList = {
            title: correspondsLabel.label,
            value: correspondsLabel.value,
            menuId: this.dropmenuItem.menuId,
            componentType: correspondsLabel.childComponentType,
            componentConf: {
              labelList: correspondsLabel.children.map((v) => {
                return {
                  title: v.label,
                  value: v.value,
                };
              }),
            },
          };
        }
      });
    },
    // 清空选择的元素
    clearSelected(value) {
      this.clearOptionAll();

      this.selectedData = [];
      this.selectedList = { childComponentType: "", componentConf: "" };
      const selectedData = [
        {
          idList: value
            ? [this.packId, this.dropmenuItem.menuId, value]
            : [this.packId, this.dropmenuItem.menuId],
          tagName: "",
          labelId: [],
          hightLightFalg: false,
        },
      ];
      this.$emit("change", selectedData);
    },
    clearOptionAll() {
      if (this.selectedList.value && this.$refs[this.selectedList.value]) {
         this.$refs[this.selectedList.value].clearSelected();
      }
    },
    handleClick(item) {
      if (item.children && item.children.length) {
        if (this.selectedList.value && this.selectedList.value === item.value) return;
        this.selectedList = {
          title: this.dropmenuItem.title,
          value: item.value,
          tip: "", // 提示
          menuId: this.dropmenuItem.menuId,
          childComponentType: item.childComponentType,
          componentConf: {
            labelList: item.children.map((v) => {
              return {
                title: v.label,
                value: v.value,
              };
            }),
          },
        };
      } else {
        this.clearOptionAll();
        
        this.selectedList = { value: item.value, componentConf: "" };
        const selectedData = [
          {
            idList: [this.packId, this.dropmenuItem.menuId],
            tagName: this.dropmenuItem.title + "：" + item.label,
            labelId: [{ id: item.value }],
            hightLightFalg: true,
          },
        ];
        this.$emit("change", selectedData);
      }
    },
    handleChange(selectedData) {
      console.log(selectedData, "selectedData-customRadioCheckbox");
      this.$set(selectedData[0], "hightLightFalg", true);
      if (selectedData[0].labelId.length === 0) {
        this.selectedList = { childComponentType: "", componentConf: "" };
      }
      this.$emit("change", selectedData);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-radio-checkbox {
  width: fit-content;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .left-radio {
    width: 204px;
    flex-shrink: 0;
    padding: 8px 0;
    &-item {
      height: 32px;
      padding: 0 12px;
      line-height: 32px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;
      &:hover {
        background: rgba(0, 128, 255, 0.08);
      }
    }
    .active {
      background: rgba(0, 128, 255, 0.08);
    }
    .item-label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        color: #0080ff;
      }
    }
  }
  .right-custom {
    width: 204px;
    flex-shrink: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    background-color: #fff;
  }
}
</style>
