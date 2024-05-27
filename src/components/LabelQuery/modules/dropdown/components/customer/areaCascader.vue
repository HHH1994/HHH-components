<template>
  <div class="flex">
    <div v-if="dropmenuItem.tip" class="pack-tip">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ dropmenuItem.tip }}</span>
        </template>
        <a-icon type="info-circle" />
      </a-tooltip>
    </div>
    <el-cascader-panel
      ref="tree"
      v-model="cascarValue"
      clearable
      collapse-tags
      :popper-class="'ys-cascader' + packId + '-' + dropmenuItem.menuId"
      :options="componentConf.labelList"
      :props="{
        expandTrigger: 'hover',
        ...componentConf.props,
      }"
      :placeholder="componentConf.placeholder"
      @change="change"
      @expand-change="visibleChange"
      @visible-change="expandChange"
    >
      <template slot-scope="{ node, data }">
        <span>{{ data[componentConf.props.label || "label"] }}</span>
        <span
          v-if="
            componentConf.props.multiple &&
            !componentConf.props.checkStrictly &&
            !node.isLeaf
          "
          >({{ computedLength(node, data) }})</span
        >
      </template>
    </el-cascader-panel>
  </div>
</template>

<script>
import {city} from '../../../../jsonData/city';
export default {
  name: "MarketDropdownAreaCascader",
  props: {
    dropmenuItem: {
      type: Object,
      default: () => {},
    },
    invertLabelsItem: {
      type: Array,
      default: () => [],
    },
    packId: {
      type: String | Number,
      default: "",
    }
  },
  data() {
    return {
      cascarValue: "",
      componentConf: {},

      showNames: [],
      values: [], // 给后端返回的值
    };
  },
  computed: {
    computedLength() {
      return function (node, data) {
        if (node.children && node.children.length) {
          let length = node.children.filter((item) => item.checked).length;
          return length;
        }
        return 0;
      };
    },
  },
  watch: {
    invertLabelsItem: {
      handler(newVal, oldVal) {
        if (newVal) {
          let item = newVal[0];
          item && this.setValues(item);
        }
      },
      deep: true,
      immediate: true,
    },
    dropmenuItem: {
      async handler(newVal, oldVal) {
        if (newVal) {
          let config = JSON.parse(JSON.stringify(newVal.componentConf));
          this.componentConf = config || {};
          // 如果没有被关联，可以直接自己请求数据
          if (config.dataApi && !newVal.associated) {
            await this.getOptions("", false);
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // Cascader 级联选择器: 点击文本就让它自动点击前面的input就可以触发选择。
    cascaderLabelClick() {
      this.$nextTick(() => {
        document
          .querySelectorAll(
            `.ys-cascader${
              this.packId + "-" + this.dropmenuItem.menuId
            } .el-cascader-node__label`
          )
          .forEach((el) => {
            el.onclick = function () {
              if (this.previousElementSibling)
                this.previousElementSibling.click();
            };
          });
      });
    },
    change(e) {
      let { multiple, checkStrictly } = this.componentConf.props;
      let { templateParams } = this.componentConf;
      console.log(
        JSON.stringify(this.cascarValue),
        "xiangling ---- cascarValue"
      );
      let tree = this.$refs.tree;
      setTimeout(() => {
        let checkedNodes = tree.getCheckedNodes();
        console.log(checkedNodes, "xiangling ---- checkedNodes");
        if (multiple) {
          if (checkStrictly) {
            this.showNames = checkedNodes.map((node) => node.label);
            this.values = checkedNodes.map((node) => {
              if (node.data.key) {
                let obj = {};
                this.mapValueFunction(node, obj, [], "value");
                return obj;
              } else {
                let arrs = [];
                this.mapValueFunction(node, {}, arrs, "value");
                return arrs;
              }
            });
          } else {
            let checkNode = checkedNodes
              .map((node) => {
                if (
                  node.checked &&
                  ((node.parent && !node.parent.checked) || !node.parent)
                ) {
                  return node;
                }
              })
              .filter((node) => node);
            // 处理 展示的名称
            this.showNames = checkNode.map((node) => node.label);
            // 处理 给后端 传的 value
            this.values = checkNode.map((node) => {
              if (node.data.key) {
                let obj = {};
                this.mapValueFunction(node, obj, [], "value");
                return obj;
              } else {
                let arrs = [];
                this.mapValueFunction(node, {}, arrs, "value");
                return arrs;
              }
            });
          }
        } else {
          if (!checkStrictly) {
            // 1. 单选，必须选择到最后
            // 1) 值 --- 就是 组件返回的值
            // 2）名字 --- 需要处理
            this.showNames = checkedNodes.map((node) => {
              return node.pathLabels.join("/");
            });
            this.values = checkedNodes.map((node) => {
              if (node.data.key) {
                let obj = {};
                this.mapValueFunction(node, obj, [], "value");
                return obj;
              }
              return node.path;
            });
          } else {
            // 2. 单选，父级 和 子级 不关联
            // 1) 值 --- 就是 组件返回的值
            this.values = checkedNodes.map((node) => {
              if (node.data.key) {
                let obj = {};
                this.mapValueFunction(node, obj, [], "value");
                return obj;
              }
              return node.path;
            });
            // 2）名字 --- 需要处理
            this.showNames = checkedNodes.map((node) => {
              return [node.label];
            });
          }
        }
        this.emitData();
      }, 100);
    },
    // 向上递归 node
    mapNameFunction(node, arrs) {
      arrs.unshift({
        name: node.label,
      });
      if (node.parent) {
        this.mapNameFunction(node.parent, arrs);
      }
    },
    // 处理 给 后端 传的值，向上 递归
    mapValueFunction(node, obj, arrs, type) {
      if (node.data.key) {
        obj[node.data.key] = node.value;
      } else {
        arrs.push(node.value);
      }
      if (node.parent) {
        this.mapValueFunction(node.parent, obj, arrs, type);
      }
    },
    // 清空组件
    clearSelected() {
      this.cascarValue = [];
      this.values = [];
      this.showNames = [];
      this.emitData();
    },
    // 赋值
    setValues(item) {
      this.cascarValue = item.realValues || [];
      let { conditionParams } = this.componentConf;
      if (item.labelId.length && conditionParams && item.labelId[0].params) {
        this.values = item.labelId[0].params[conditionParams.templateParams[0]] || [];
      } else {
        this.values = [];
      }
      this.showNames = (item.tagName && item.tagName.split("，")) || [];
    },
    // 设置标题
    expandChange() {
      this.setTitle();
      this.cascaderLabelClick();
    },
    visibleChange(bool) {
      if (bool) {
        this.setTitle();
        this.cascaderLabelClick();
      }
    },
    setTitle() {
      let { titleList } = this.componentConf;
      if (!titleList || !titleList.length) {
        return;
      }
      this.$nextTick(() => {
        let box = document.querySelectorAll(
          `.ys-cascader${this.packId + "-" + this.dropmenuItem.menuId} ul`
        );
        box.forEach((i, index) => {
          var li = document.createElement("li");
          li.textContent = titleList[index];
          li.classList.add("title-li");
          let list = i.querySelectorAll(".title-li");
          if (!list || list.length == 0) {
            if (i.firstChild) {
              i.insertBefore(li, i.firstChild);
            } else {
              i.appendChild(li);
            }
          }
        });
      });
    },
    // 获取 cascader 数据， 必须要有 dataAPi 才能请求数据
    async getOptions(value, needClear) {
      if (needClear) {
        this.clearSelected();
        this.emitData();
      }
      let { dataApi } = this.componentConf;
      console.log(this.componentConf, "哈哈哈哈哈哈哈哈哈");
      if (dataApi === "getArea") {
        this.componentConf.labelList = city;
        return;
      }
      if (dataApi) {
        let res = await this.$api[dataApi]({
          params: {},
        });
        this.componentConf.labelList = res.data || [];
      }
    },
    // 导出数据
    emitData() {
      let obj = {};
      if (this.componentConf.conditionParams && this.values.length) {
        let { conditionParams } = this.componentConf;
        obj = {
          id: conditionParams.labelParams,
          params: {
            [conditionParams.templateParams && conditionParams.templateParams[0]]: this.values,
          }
        };
      }
      let data = {
        idList: [this.packId, this.dropmenuItem.menuId],
        tagName: this.showNames.length ? this.dropmenuItem.title + "：" + this.showNames.join(",") : "",
        labelId: obj.id ? [obj] : [],
        realValues: this.cascarValue,
        sort: this.dropmenuItem.sort,
        showSingle: this.componentConf.showSingle,
        selectedLen: this.values.length, // 选中条件的个数
        hightLightFalg: !!this.values.length,
      };
      this.$emit("change",  [data], this.dropmenuItem);
    },
  },
};
</script>

<style lang="scss">
.flex {
  flex-grow: 1;
  display: flex;
  align-items: center;
  .pack-tip {
    flex-shrink: 0;
    width: 18px;
  }
  .el-cascader{
    flex: 1;
    min-width: 0;
    max-width: 500px;
  }
}
</style>
<style lang="scss">
.title-li {
  padding: 0 30px;
  color: rgba(0, 0, 0, 0.45);
}
.el-cascader__tags .el-tag {
  max-width: 70%;
}
// 弹出层样式
.ant-tooltip-inner {
  background-color: #fff;
  max-height: 234px;
  overflow: auto;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}
.ant-tooltip-arrow:before {
  background-color: #fff;
}
// 级联选中 - 不加粗
.marketing-label-wrap {
  .el-cascader-node.in-active-path,
  .el-cascader-node.is-active,
  .el-cascader-node.is-selectable.in-checked-path {
    font-weight: 400;
  }
  .el-input--small .el-input__inner {
    height: 28px !important;
    line-height: 28px;
  }
  .el-input--small .el-input__icon {
    height: 28px;
    line-height: 28px;
  }
  .el-cascader .el-input.is-focus .el-input__inner {
    border-color: #0080ff;
  }
  .el-cascader--small {
    line-height: 28px;
  }
}

.el-cascader-node.in-active-path, 
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  font-weight: 400;
}
</style>
