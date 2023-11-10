<!-- 规则树组件 -->
<template>
  <div class="rule-tree_wrap">
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
              children: {
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
          if (node.children) {
            this.parseNodes(node, false);
          }
        })   
       } else {
         parentNode.children.nodes.forEach(node => {
           node.originNode = parentNode;
           if (node.children) {
            this.parseNodes(node, false);
          } 
         })
       }
     }
   }     
}
</script>
<style lang="scss" scoped>
</style>