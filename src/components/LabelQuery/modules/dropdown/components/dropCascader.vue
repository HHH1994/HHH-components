<template>
  <div class="drop-cascader">
    <!-- 是否支持搜索功能 -->
    <div v-if="componentConf.showSearch" class="input-box">
      <el-input placeholder="请输入内容" v-model="searchText">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!-- 级联面板 -->
    <el-cascader-panel
      ref="dropTree"
      v-model="cascarValue"
      clearable
      collapse-tags
      :options="options"
      :props="{
        expandTrigger: 'hover',
        ...componentConf.props,
      }"
      :placeholder="componentConf.placeholder"
      :class="'ys-cascader' + packId + '-' + dropmenuItem.menuId"
      @change="change"
      @expand-change="visibleChange"
      @visible-change="expandChange"
      ><template slot-scope="{ node, data }">
        <span v-html="computedName(data)"></span>
        <span
          v-if="
            componentConf.props.multiple &&
            !componentConf.props.checkStrictly &&
            !node.isLeaf
          "
          >({{ computedLength(node, data) }})</span
        >
      </template></el-cascader-panel
    >
  </div>
</template>

<script>
import _debounce from "lodash/debounce";
export default {
  name: 'MarketDropdownCascader',
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
    },
    packName: {
      type: String,
      default: "股东关系",
    },
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
    computedName() {
      return function (node) {
        let key = this.componentConf.props.label || "label";
        if (this.componentConf.showSearch && this.searchText) {
          let value = this.searchText;
          let index = node[key].indexOf(value);
          if (index > -1) {
            return (
              node[key].slice(0, index) +
              `<span style="color: #FF8A00;">${value}</span>` +
              node[key].slice(index + value.length, node[key].length)
            );
          }
        }
        return node[key];
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
          if (config.dataApi) {
            await this.getOptions("", false);
            this.setTitle();
          } else {
            this.options = config.labelList;
          }
        }
      },
      deep: true,
      immediate: true,
    },
    searchText(val) {
      if (val) {
        this.searchName();
      }
    },
  },
  data() {
    return {
      searchText: "",
      cascarValue: "",
      showNames: [],
      values: [], // 给后端返回的值
      componentConf: {},
      options: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setTitle();
    }, 200);
  },
  methods: {
    searchName: _debounce(function (val) {
      let xxx = this.componentConf.labelList
        .map((item) => {
          let isHas = item.label.indexOf(this.searchText) > -1;
          let hasChild = item.children.find(
            (element) => element.label.indexOf(this.searchText) > -1
          );
          if (isHas || hasChild) {
            return item;
          }
        })
        .filter((ele) => ele);
      this.options = xxx;
    }, 1000),
    // 改变事件
    change(e) {
      let { multiple, checkStrictly } = this.componentConf.props;
      console.log(
        JSON.stringify(this.cascarValue),
        "xiangling ---- cascarValue"
      );
      let tree = this.$refs.dropTree;
      setTimeout(() => {
        let checkedNodes = tree.getCheckedNodes();
        console.log(checkedNodes, "xiangling ---- checkedNodes");
        if (multiple) {
          if (checkStrictly) {
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
            // 1.处理 展示的名称
            let names = checkNode.map((node) => {
              return node.pathLabels;
            });
            const mergedArray = this.mergeDuplicates(names);
            this.showNames = mergedArray.map((item) => {
              let xxx = "";
              item.forEach((ele, eleIdx) => {
                if (eleIdx) {
                  xxx += `(${ele})`;
                }
              });
              xxx = item[0] + xxx;
              return xxx;
            });
            this.showNames = (this.dropmenuItem.title || this.packName) + "：" + this.showNames.join(",");
            // 2.处理 给后端 传的 value
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
            console.log(this.values, "this.valuessssss");
          }
        } else {
        }
        this.emitData();
      }, 100);
    },
    // 名字处理
    mergeDuplicates(array) {
      return array.reduce((accumulator, current) => {
        const existingItem = accumulator.find((item) => item[0] === current[0]);
        if (existingItem) {
          // 如果已存在相同的第一个值，则合并第二个值
          existingItem[1] += `,${current[1]}`;
        } else {
          // 如果不存在，直接添加到结果数组中
          accumulator.push(current);
        }
        return accumulator;
      }, []);
    },
    // 处理 给 后端 传的值，向上 递归
    mapValueFunction(node, obj, arrs, type) {
      if (node.data.key) {
        if (Array.isArray(node.data.key)) {
          node.data.key.forEach((item, idx) => {
            obj[item] = node.value[idx];
          });
        } else {
          obj[node.data.key] = node.value;
        }
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
      this.showNames = "";
      this.emitData();
    },
    // 赋值
    setValues(item) {
      this.cascarValue = item.realValues || [];
      let { conditionParams } = this.componentConf;
      if (item.labelId.length && conditionParams) {
        this.values = item.labelId[0]['params'] ? item.labelId[0]['params'][conditionParams.templateParams[0]] : [];
      } else {
        this.values = [];
      }
      this.showNames = item.tagName || "";
    },
    // 设置标题
    expandChange() {
      this.setTitle();
    },
    visibleChange(bool) {
      if (bool) {
        this.setTitle();
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
      if (dataApi === "getArea") {
        this.componentConf.labelList = city;
        this.options = city;
        return;
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
        tagName: this.showNames,
        labelId: obj.id ? [obj] : [],
        realValues: this.cascarValue,
        selectedLen: this.values.length, // 选中条件的个数
        hightLightFalg: !!this.values.length,
      };
      this.$emit("change", [data], this.dropmenuItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  /deep/ .el-input__inner {
    border-radius: 0;
    border-bottom: 0;
  }
}


/deep/ .el-cascader-node.in-active-path,
/deep/ .el-cascader-node.is-active,
/deep/ .el-cascader-node.is-selectable.in-checked-path {
  font-weight: 400;
}
</style>
<style lang="scss">
.title-li {
  padding: 0 30px;
  color: rgba(0, 0, 0, 0.45);
}
.drop-cascader {
  .el-cascader-node__label {
    position: relative;
    z-index: 10;
  }
  .el-cascader-panel .el-checkbox__input,
  .el-cascader-panel .el-checkbox {
    position: unset;
  }
  .el-cascader-panel .el-checkbox__original {
    width: 100%;
    height: 100%;
    z-index: 11;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
