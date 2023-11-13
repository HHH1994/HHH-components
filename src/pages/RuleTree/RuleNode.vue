<!-- 节点 -->
<template>
  <RuleTree class="subTree" v-if="data.nodes" :treeData="data" />
  <div v-else class="rule_node">
    <HInput v-model="data.value" />
    <div class="operate-group">
      <Dropdown :commands="['and', 'or']" @command="addNode" style="margin-right: 10px">
          <span class="operate-btn">+</span>
      </Dropdown>
      <span class="operate-btn" @click="removeNode">-</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "RuleNode",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  methods: {
    addNode(command) {
      this.$emit("add", command);
    },
    removeNode() {
      this.$emit("remove");
    },
  },
};
</script>
<style lang="scss" scoped>
.rule_node {
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 5px;

}

.rule_node,
.subTree {
  position: relative;

  &:not(:last-child) {
    margin-bottom: 20px;
  }  

  &:before {
    content: "";
    position: absolute;
    left: -67px;
    top: 50%;
    width: 67px;
    height: 0;
    transform: translateY(-50%);
    border-bottom: 2px solid #333;
  }

  &:after {
    content: "";
    position: absolute;
    left: -67px;
    top: 0;
    width: 2px;
    height: calc(100% + 20px);
    background: #333;
  }

  &:first-child {
      &:after {
        top: 50%;
        height: calc(50% + 20px);
      }
  }

  &:last-child {
      &:after {
        top: 0;
        height: 50%;
      }
  }
}

.operate-group {
  display: inline-block;
  margin-left: 15px;
  .operate-btn {
    display: inline-block;
    width: 12px;
    height: 12px;
    padding: 5px;
    line-height: 12px;
    font-weight: 12px;
    font-weight: bold;
    text-align: center;
    border-radius: 50%;
    background: #2265c9;
    color: #fff;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>