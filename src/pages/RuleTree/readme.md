### 需求设计
  ## 1. 条件 或 / 且
  ## 2. 支持下拉、输入、日期条件类型

#### 数据结构
{
    condition: '', // 条件
    nodes: [       // 节点列表
      {
        type: '',  // 类型
        value: '', // 值
        children: { // 子节点
          conditions: '',
          nodes: []
        }
      }
    ]
}