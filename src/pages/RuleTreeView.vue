<!-- 规则树组件 -->
<template>
  <div class="rule-tree_wrap">
      <button @click="getData">获取数据</button>
      <RuleTree :treeData="treeData"/>
  </div>
</template>
<script>
import RuleTree from './RuleTree/index.vue'
export default {
   name: 'RuleTreeView',
   components: {
     RuleTree
   },
   data() {     
     return {   
        treeData: {
          condition: 'and',
          nodes: [
            {
              value: '12313',
              type: 'text'
            },
            {
              value: '31231',
              type: 'text'
            },
            {
              value: '331',
              type: 'text'
            },
            {
              value: '',
              type: '',
              condition: 'or',
              nodes: [
                  {
                    value: '665',
                    type: 'text'
                  },
                  {
                     value: '665',
                    type: 'text'
                  }
                ]
            }
          ]
        }
     }          
   },
   created() {
     this.parseNodes(this.treeData, true);
   },
   methods: {
     parseNodes(parentNode, isRoot) {
       if (isRoot) {
        parentNode.isRoot = true;
        parentNode.nodes.forEach(node => {
          node.originNode = parentNode;
          if (node.nodes) {
            this.parseNodes(node, false);
          }
        })   
       } else {
         parentNode.nodes.forEach(node => {
           node.originNode = parentNode;
           if (node.nodes) {
            this.parseNodes(node, false);
          } 
         })
       }
     },
     getData() {
       console.log(this.treeData)
     }
   }     
}
</script>
<style lang="scss" scoped>
</style>