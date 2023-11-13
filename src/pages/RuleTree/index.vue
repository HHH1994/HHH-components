<!-- 规则树组件 -->
<template>
  <div v-if="innerData.nodes.length > 0" ref="ruleTreeRef" class="rule-tree_wrap">
      <span class="node_condition" @click="changeCondition">{{operateMap[innerData.condition]}}</span>
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
    changeCondition() {
      this.innerData.condition = this.innerData.condition === 'or' ? 'and' : 'or';
    },
    addNode(node, index,condition) {
      if (condition === this.treeData.condition) {
        const newNode = {type: 'Input', value: ''};
        if (node.originNode) {
          newNode.originNode = node.originNode;
        }
        this.innerData.nodes.push(newNode)  
      } else {
        if (!node.nodes) {
          const nodeCopy = shallowCopy(node, ['originNode']);
          node.type = '';
          node.value = '';
          nodeCopy.originNode = node;
          this.$set(node, 'condition', condition);
          this.$set(node, 'nodes', [nodeCopy, {type: 'Input', value: '', originNode: node}]);
        }
      }
    },
    removeNode(node, index) {
      this.innerData.nodes.splice(index, 1)
      if (this.innerData.nodes.length === 1) {
        const lastNode = this.innerData.nodes[0];
        const parentNode = node.originNode;
        if (parentNode.isRoot && lastNode.nodes) { 
          parentNode.condition = lastNode.condition;
          parentNode.nodes = lastNode.nodes;
          lastNode.nodes.forEach(subnode => {
            subnode.originNode = parentNode;
          })
          return;
        }

        parentNode.condition = null;
        parentNode.type = lastNode.type;
        parentNode.value = lastNode.value;
        parentNode.nodes = null;

        if (lastNode.nodes) {
          const ancientNode = parentNode.originNode;
          if (lastNode.condition !== ancientNode.condition) {
            parentNode.condition = lastNode.condition;
            parentNode.nodes = lastNode.nodes;
            lastNode.nodes.forEach(cnode => {
              cnode.originNode = parentNode;
            })
          } else {
            // delete parent node
            const parentNodeIdx = ancientNode.nodes.findIndex(cnode => cnode === parentNode);
            ancientNode.nodes.splice(parentNodeIdx, 1,)

            lastNode.nodes.forEach((cnode, idx) => {
              const newNode = shallowCopy(cnode, ['originNode']);
              newNode.originNode = ancientNode;
              ancientNode.nodes.splice(parentNodeIdx + idx, 0, newNode);
            })

          }
        } 
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