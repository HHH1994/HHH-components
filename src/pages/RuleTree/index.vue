<!-- 规则树组件 -->
<template>
  <div v-if="innerData.nodes.length > 0" ref="ruleTreeRef" class="rule-tree_wrap">
      <span class="node_condition">{{operateMap[innerData.condition]}}</span>
      <div class="rule-tree_nodes">
        <RuleNode 
          v-for="(node, index) of innerData.nodes" 
          :key="index" 
          :data="node"
          @remove="() => removeNode(node, index)"
          @add="(condition) => addNode(node, index,condition)"
        />
      </div>
  </div>
</template>
<script>
const operateMap = {
  and: '且',
  or:  '或'
}

const shallowCopy = function(origin,filterKeys = []) {
  const newObject = {};
  Object.keys(origin).forEach(key => {
    if (filterKeys.includes(key)) return;
    newObject[key] = origin[key];
  })

  return newObject
}

export default {
   name: 'RuleTree',
   props: {
     treeData: {
       type: Object,
       default: () => ({})
     }
   },
   data() {     
     return {   
        innerData: {},
     }          
   },
   computed: {

   },
   created() {
     this.operateMap = operateMap;
     this.innerData = this.treeData;
   },
   mounted() {
     
   },
   methods: {
    addNode(node, index,condition) {
      if (condition === this.treeData.condition) {
        const newNode = {type: 'Input', value: ''};
        if (node.originNode) {
          newNode.originNode = node.originNode;
        }
        this.innerData.nodes.push(newNode)  
      } else {
        if (!node.children) {
          const nodeCopy = shallowCopy(node, ['originNode']);
          node.type = '';
          node.value = '';
          nodeCopy.originNode = node;
          this.$set(node, 'children', {
            condition: condition,
            nodes: [nodeCopy, {type: 'Input', value: '', originNode: node}]
          });
        }
      }
    },
    removeNode(node, index) {
      this.innerData.nodes.splice(index, 1)
      if (this.innerData.nodes.length === 1) {
        const lastNode = this.innerData.nodes[0];
        if (node.originNode.isRoot && lastNode.children) { 
          node.originNode.condition = lastNode.children.condition;
          node.originNode.nodes = lastNode.children.nodes;
          lastNode.children.nodes.forEach(subnode => {
            subnode.originNode = node.originNode;
          })
          return;
        }
        node.originNode.type = lastNode.type;
        node.originNode.value = lastNode.value;
        node.originNode.children = null;
      }
    }
   }
}
</script>
<style lang="scss" scoped>
.rule-tree_wrap {
  position: relative;

  .node_condition {
    position: absolute;
    left: 0;
    top: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;    
    border: 1px solid #d1d1d1;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    color: #333;
    margin-top: -15px;
    z-index: 2;
    cursor: pointer;
  }

  .rule-tree_nodes {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 80px;
  }
}
</style>