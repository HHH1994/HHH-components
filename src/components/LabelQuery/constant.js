const labelsConfig = [
  // {
  //   packName: "关键词",
  //   packId: "gjz",
  //   componentType: "CompositeComponents",
  //   componentConf: {
  //     tip: "",
  //     needShowPackName: true, // 是否要展示packName
  //     id: "LABEL_KEYWORD",
  //     notHasOpenBtn: true,
  //     components: [
  //       {
  //         menuId: "gjz-fw",
  //         title: "",
  //         tip: "", // 提示
  //         componentType: "YsSelect",
  //         sort: 1,
  //         componentConf: {
  //           placeHolder: "不限范围",
  //           defaultValue: "",
  //           width: "100",
  //           clearable: true,
  //           showSingle: false,
  //           labelList: [
  //             {
  //               label: "企业名称",
  //               value: "entname",
  //             },
  //             {
  //               label: "统代",
  //               value: "credit_code",
  //             },
  //             {
  //               label: "法人",
  //               value: "frname",
  //             },
  //             {
  //               label: "股东列表",
  //               value: "inv_list",
  //             },
  //             {
  //               label: "经营范围",
  //               value: "opscope",
  //             },
  //           ],
  //           dataApi: "", // 接口地址
  //           conditionParams: {
  //             labelParams: "LABEL_KEYWORD", // condition标签名
  //             templateParams: ["field"], // 模板自定义入参变量名
  //           },
  //         },
  //       },
  //       {
  //         menuId: "gjz-text",
  //         title: "",
  //         tip: "", // 提示
  //         sort: 2,
  //         componentType: "InputSearch",
  //         componentConf: {
  //           placeholder: "请输入关键词搜索查询",
  //           showSingle: true,
  //           width: "400",
  //           conditionParams: {
  //             labelParams: "LABEL_KEYWORD", // condition标签名
  //             templateParams: ["keyword"], // 模板自定义入参变量名
  //           },
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    packName: "关键词",
    packId: "gjz",
    componentType: "Keyword",
    componentConf: {
      tip: "",
      needShowPackName: false, // 是否要展示packName
      id: "LABEL_KEYWORD", // 后端配置condition的唯一标识
      notHasOpenBtn: true,
      blurSearchConf: {
        hasBlurSearch: false, // 是否支持模糊搜索
        dataApi: '',
        templateParams: ["keyword"], // 模板自定义入参变量名
      },
      rangeConf: {
        hasRange: true,
        labelList: [
              {
                label: "企业名称",
                value: "entname",
              },
              {
                label: "统代",
                value: "credit_code",
              },
              {
                label: "法人",
                value: "frname",
              },
              {
                label: "股东列表",
                value: "inv_list",
              },
              {
                label: "经营范围",
                value: "opscope",
              },
        ],
        templateParams: ["field"]
      }
    },
  },
  {
    packName: "所属行业",
    packId: "sshy",
    componentType: "CompositeComponents",
    componentConf: {
      tip: "",
      notHasOpenBtn: true,
      needShowPackName: true, // 是否要展示packName
      width: "612px",
      components: [
        {
          menuId: "sshy-bh",
          title: "",
          tip: "", // 提示
          componentType: "YsSelect",
          sort: 1,
          componentConf: {
            placeHolder: "",
            defaultValue: "must",
            width: "100",
            clearable: false,
            showSingle: false,
            labelList: [
              {
                label: "包含",
                value: "must",
              },
              {
                label: "不包含",
                value: "must_not",
              },
            ],
            dataApi: "", // 接口地址
            conditionParams: {
              labelParams: "CONDITION_LEASE_INDUSTRY", // condition标签名
              templateParams: ["condition"], // 模板自定义入参变量名
            },
          },
        },
        {
          menuId: "sshy-hy",
          title: "",
          tip: "", // 提示
          sort: 2,
          relatedId: "sshy-hyzl",
          componentType: "YsSelect",
          componentConf: {
            placeholder: "",
            showSingle: false,
            width: "100",
            defaultValue: "industry",
            labelList: [
              {
                label: "国标行业",
                value: "industry",
              },
              {
                label: "申万行业",
                value: "1",
                disabled: true,
              },
            ],
            conditionParams: {
              labelParams: "CONDITION_LEASE_INDUSTRY", // condition标签名
              templateParams: ["filed"], // 模板自定义入参变量名
            },
          },
        },
        {
          menuId: "sshy-hyzl",
          title: "",
          tip: "", // 提示
          sort: 3,
          componentType: "cascader",
          associated: "sshy-hy", // 受其他组件控制
          componentConf: {
            dataApi: "allIndustry", // 接口地址
            titleList: [],
            labelList: [],
            props: {
              multiple: true, // 是否多选
              checkStrictly: false, // 是否严格的遵守父子节点不互相关联
              value: "industryname", // 指定选项的值为选项对象的某个属性值
              label: "industryname", // 指定选项标签为选项对象的某个属性值
              children: "children", // 指定选项的子选项为选项对象的某个属性值
            },
            placeholder: "所有行业",
            showSingle: true,
            conditionParams: {
              labelParams: "CONDITION_LEASE_INDUSTRY", // condition标签名
              templateParams: ["paramsList"], // 模板自定义入参变量名
            },
          },
        },
      ],
    },
  },
  {
    packName: "所属地区",
    packId: "ssdq",
    componentType: "CompositeComponents",
    componentConf: {
      tip: "",
      notHasOpenBtn: true,
      needShowPackName: true, // 是否要展示packName
      width: "512px",
      components: [
        {
          menuId: "ssdq-dqzl",
          title: "",
          tip: "", // 提示
          sort: 3,
          componentType: "cascader",
          associated: "", // 受其他组件控制
          componentConf: {
            titleList: [],
            labelList: [],
            props: {
              multiple: true, // 是否多选
              checkStrictly: false, // 是否严格的遵守父子节点不互相关联
              value: "name", // 指定选项的值为选项对象的某个属性值
              label: "name", // 指定选项标签为选项对象的某个属性值
              children: "areas", // 指定选项的子选项为选项对象的某个属性值
            },
            placeholder: "请输入搜索地区",
            showSingle: true,
            width: "500",
            dataApi: "getArea", // 接口地址
            conditionParams: {
              labelParams: "CONDITION_AREA", // condition标签名
              templateParams: ["paramsList"], // 模板自定义入参变量名
            },
          },
        },
      ],
    },
  },
  {
    packName: "绿色产业",
    packId: "lscy",
    componentType: "MarketCheckbox", // 组件类型
    componentConf: {
      isHasAll: true, // 是否有全部标签
      labelList: [
        {
          title: "节能降碳产业",
          value: "LABEL_TAG_LIST_jnjtcy",
        },
        {
          title: "环境保护产业",
          value: "LABEL_TAG_LIST_hjbhcy",
        },
        {
          title: "资源循环利用产业",
          value: "LABEL_TAG_LIST_zyxhlycy",
        },
        {
          title: "能源绿色低碳转型",
          value: "LABEL_TAG_LIST_nylsdtzx",
        },
        {
          title: "生态保护修复和利用",
          value: "LABEL_TAG_LIST_stbhxfhly",
        },
        {
          title: "基础设施绿色升级",
          value: "LABEL_TAG_LIST_jcsslssj",
        },
        {
          title: "绿色服务",
          value: "LABEL_TAG_LIST_lsfw",
        },
      ],
    },
  },
  {
    packName: "新兴产业",
    packId: "xxcy",
    componentType: "MarketCheckbox", // 组件类型
    componentConf: {
      isHasAll: true, // 是否有全部标签
      labelList: [
        {
          title: "新一代信息技术产业",
          value: "LABEL_TAG_LIST_xydxxjscy",
        },
        {
          title: "高端装备制造产业",
          value: "LABEL_TAG_LIST_gdzbzzcy",
        },
        {
          title: "新材料产业",
          value: "LABEL_TAG_LIST_xclcy",
        },
        {
          title: "生物产业",
          value: "LABEL_TAG_LIST_swcy",
        },
        {
          title: "新能源汽车产业",
          value: "LABEL_TAG_LIST_xnyqccy",
        },
        {
          title: "新能源产业",
          value: "LABEL_TAG_LIST_xnycy",
        },
        {
          title: "节能环保产业",
          value: "LABEL_TAG_LIST_jnhbcy",
        },
        {
          title: "数字创意产业",
          value: "LABEL_TAG_LIST_szcycy",
        },
        {
          title: "相关服务业",
          value: "LABEL_TAG_LIST_xgfwy",
        },
      ],
    },
  },
  {
    packName: "基础信息",
    packId: "jcxx",
    componentType: "MarketDropdown",
    componentConf: {
      dropmenuList: [
        {
          menuId: "jcxx-clnx",
          title: "成立年限",

          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "3个月内",
                value: "CONDITION_ES_DATE_LT_3_MONTH",
              },
              {
                title: "3-6个月",
                value: "CONDITION_ES_DATE_RANGE_3-6_MONTH",
              },
              {
                title: "6个月-1年",
                value: "CONDITION_ES_DATE_RANGE_6-12_MONTH",
              },
              {
                title: "1-3年",
                value: "CONDITION_ES_DATE_RANGE_1-3_YEAR",
              },
              {
                title: "3-5年",
                value: "CONDITION_ES_DATE_RANGE_3-5_YEAR",
              },
              {
                title: "5-10年",
                value: "CONDITION_ES_DATE_RANGE_5-10_YEAR",
              },
              {
                title: "10年以上",
                value: "CONDITION_ES_DATE_GT_10_YEAR",
              },
              {
                title: "自定义", // 中文名
                value: "CONDITION_ES_YEAR_CUSTOMIZED",
                isCustomer: true, // 是否为自定义 是true、否false
                customerType: "dropDate", // 自定义组件类型 dropDate，dropInput
                customerUnit: "",
                placeHolder: "请输入",
                templateParams: ["lowerBound", "upperBound"],
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-zcjb",
          title: "注册资本",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "100万以内",
                value: "CONDITION_REG_CAP_RANGE_0-100",
              },
              {
                title: "100-200万",
                value: "CONDITION_REG_CAP_RANGE_100-200",
              },
              {
                title: "200-500万",
                value: "CONDITION_REG_CAP_RANGE_200-500",
              },
              {
                title: "500万-1000万",
                value: "CONDITION_REG_CAP_RANGE_500-1000",
              },
              {
                title: "1000万-5000万",
                value: "CONDITION_REG_CAP_RANGE_1000-50000",
              },
              {
                title: "5000万以上",
                value: "CONDITION_REG_CAP_GTE_5000",
              },
              {
                title: "自定义", // 中文名
                value: "CONDITION_REG_CAP_CUSTOMIZED",
                isCustomer: true, // 是否为自定义 是true、否false
                customerType: "dropInput", // 自定义组件类型 dropDate，dropInput
                customerUnit: "万",
                placeHolder: "请输入",
                templateParams: ["lowerBound", "upperBound"],
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-jyzt",
          title: "经营状态",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "在营（开业）",
                value: "LABEL_ENT_STATUS_ZY",
              },
              {
                title: "注销",
                value: "LABEL_ENT_STATUS_ZX",
              },
              {
                title: "吊销",
                value: "LABEL_ENT_STATUS_DX",
              },
              {
                title: "撤销",
                value: "LABEL_ENT_STATUS_CX",
              },
              {
                title: "迁出",
                value: "LABEL_ENT_STATUS_QC",
              },
              {
                title: "停业",
                value: "LABEL_ENT_STATUS_TY",
              },
              {
                title: "其它",
                value: "LABEL_ENT_STATUS_QT",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-qygm",
          title: "企业规模",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "微型",
                value: "LABEL_ENT_SCALE_WX",
              },
              {
                title: "小型",
                value: "LABEL_ENT_SCALE_XX",
              },
              {
                title: "中型",
                value: "LABEL_ENT_SCALE_ZX",
              },
              {
                title: "大型",
                value: "LABEL_ENT_SCALE_DX",
              },
              {
                title: "其它",
                value: "LABEL_ENT_SCALE_QT",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-jglx",
          title: "机构类型",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "企业",
                value: "LABEL_ENTTYPE_QY",
              },
              {
                title: "个体工商户",
                value: "LABEL_ENTTYPE_GTGSH",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-qyxz",
          title: "企业性质",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "央企",
                value: "LABEL_ENT_NATURE_YQ",
              },
              {
                title: "国企",
                value: "LABEL_ENT_NATURE_GQ",
              },
              {
                title: "民营企业",
                value: "LABEL_ENT_NATURE_MYQY",
              },
              {
                title: "外资企业",
                value: "LABEL_ENT_NATURE_WZQY",
              },
              {
                title: "港澳台控股企业",
                value: "LABEL_ENT_NATURE_GATKGQY",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
      ],
    },
  },
  {
    packName: "工商信息",
    packId: "gsxx",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "jcxx-cbrs",
          title: "参保人数",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "1-50人",
                value: "CONDITION_EMPNUM_RANGE_1-50",
              },
              {
                title: "50-100人",
                value: "CONDITION_EMPNUM_RANGE_50-100",
              },
              {
                title: "100-500人",
                value: "CONDITION_EMPNUM_RANGE_100-500",
              },
              {
                title: "500-1000人",
                value: "CONDITION_EMPNUM_RANGE_500-1000",
              },
              {
                title: "1000-5000人",
                value: "CONDITION_EMPNUM_RANGE_1000-5000",
              },
              {
                title: "5000人以上",
                value: "CONDITION_EMPNUM_GET-5000",
              },
              {
                title: "未披露",
                value: "CONDITION_EMPNUM_IS_NULL",
              },
              {
                title: "自定义", // 中文名
                value: "CONDITION_EMPNUM_CUSTOMIZED",
                isCustomer: true, // 是否为自定义 是true、否false
                customerType: "dropInput", // 自定义组件类型 dropDate，dropInput
                customerUnit: "人",
                placeHolder: "请输入",
                templateParams: ["lowerBound", "upperBound"],
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-bgxx",
          title: "变更信息",
          tip: "", // 提示
          componentType: "MarketCustomRadioCheckbox",
          componentConf: {
            tip: "", // 提示
            dataApi: "", // 接口地址
            labelList: [
              {
                label: "有变更信息",
                value: "LABEL_TAG_LIST_BG",
                childComponentType: "checkbox",
                children: [
                  {
                    label: "企业名称变更",
                    value: "LABEL_TAG_LIST_QYMCBG",
                  },
                  {
                    label: "企业类型变更",
                    value: "LABEL_TAG_LIST_QYLXBG",
                  },
                  {
                    label: "股权变更",
                    value: "LABEL_TAG_LIST_GQBG",
                  },
                  {
                    label: "注册资本变更",
                    value: "LABEL_TAG_LIST_ZCZBBG",
                  },
                  {
                    label: "负责人变更",
                    value: "LABEL_TAG_LIST_FZRBG",
                  },
                  {
                    label: "住所变更",
                    value: "LABEL_TAG_LIST_ZSBG",
                  },
                  {
                    label: "经营范围变更",
                    value: "LABEL_TAG_LIST_JYFWBG",
                  },
                  {
                    label: "其它类型变更",
                    value: "LABEL_TAG_LIST_QTLXBG",
                  },
                ],
              },
              {
                label: "无变更信息",
                value: "LABEL_TAG_LIST_BG_NOT",
              },
            ],
          },
        },
        {
          menuId: "jcxx-fzjg",
          title: "分支机构",
          tip: "", // 提示
          componentType: "MarketCustomCategory",
          componentConf: {
            labelList: [
              {
                categoryId: "jcxx-fzjg-wyfzjg",
                title: "有无分支机构",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "有分支机构",
                      value: "LABEL_TAG_LIST_YFZJG",
                    },
                    {
                      title: "无分支机构",
                      value: "LABEL_TAG_LIST_YFZJG_NOT",
                    },
                  ],
                },
              },
              {
                categoryId: "jcxx-fzjg-sfwfzjg",
                title: "是否为分支机构",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "是分支机构",
                      value: "LABEL_TAG_LIST_YFZJG",
                    },
                    {
                      title: "非分支机构",
                      value: "LABEL_TAG_LIST_YFZJG_NOT",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          menuId: "jcxx-lxfs",
          title: "联系方式",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "有联系方式",
                value: "LABEL_TAG_LIST_TEL",
              },
              {
                title: "无联系方式",
                value: "LABEL_TAG_LIST_TEL_NOT",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-hmgl",
          title: "号码过滤",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "含400/800",
                value: "LABEL_TAG_LIST_TEL_CONTAIN",
              },
              {
                title: "疑似代账机构",
                value: "LABEL_TAG_LIST_ACCOUNTING_AGENCY",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "jcxx-lxyx",
          title: "联系邮箱",
          tip: "", // 提示
          componentType: "MarketCustomCategory",
          componentConf: {
            labelList: [
              {
                categoryId: "jcxx-lxyx-sfyqyyx",
                title: "是否有企业邮箱",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "有联系邮箱",
                      value: "LABEL_TAG_LIST_TEL_EMAIL",
                    },
                    {
                      title: "无联系邮箱",
                      value: "LABEL_TAG_LIST_TEL_EMAIL_NOT",
                    },
                  ],
                },
              },
              {
                categoryId: "jcxx-fzjg-sfwqyyx",
                title: "是否为企业邮箱",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "是企业邮箱",
                      value: "LABEL_TAG_LIST_ENT_EMAIL",
                    },
                    {
                      title: "非企业邮箱",
                      value: "LABEL_TAG_LIST_ENT_EMAIL_NOT",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          menuId: "jcxx-gdgx",
          title: "股东关系",
          tip: "持股比例为同一类型股东持股比例的汇总（不同类型股东为“或”关系）", // 提示
          componentType: "MarketDropdownCascader",
          componentConf: {
            showSearch: true,
            dataApi: "", // 接口地址
            labelList: [
              {
                label: "政府机构",
                value: "zfjg_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
              {
                label: "央企",
                value: "yq_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
              {
                label: "国企",
                value: "gq_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
              {
                label: "上市公司",
                value: "ssgs_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
              {
                label: "民营企业",
                value: "myqy_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
              {
                label: "世界500强",
                value: "sj500_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
              {
                label: "中国500强",
                value: "zg500_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
              {
                label: "政府引导性基金",
                value: "zfydxjj_ratio",
                key: "field",
                children: [
                  {
                    label: "0-10%",
                    value: [0, 0.1],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "10%-20%",
                    value: [0.1, 0.2],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "20%-30%",
                    value: [0.2, 0.3],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "30%-50%",
                    value: [0.3, 0.5],
                    key: ["lowerBound", "upperBound"],
                  },
                  {
                    label: "50%以上",
                    value: [0.5, 1],
                    key: ["lowerBound", "upperBound"],
                  },
                ],
              },
            ],
            props: {
              multiple: true, // 是否多选
              checkStrictly: false, // 是否严格的遵守父子节点不互相关联
              value: "value", // 指定选项的值为选项对象的某个属性值
              label: "label", // 指定选项标签为选项对象的某个属性值
              children: "children", // 指定选项的子选项为选项对象的某个属性值
            },
            placeholder: "所有行业",
            showSingle: true,
            titleList: ["股东性质", "持股比例"],
            conditionParams: {
              labelParams: "LABEL_SHAREHOLDER_NATURE", // condition标签名
              templateParams: ["paramsList"], // 模板自定义入参变量名
            },
          },
        },
        {
          menuId: "jcxx-jtgx",
          title: "集团关系",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "央企子公司",
                value: "LABEL_GROUP_RELATION_YQZGS",
              },
              {
                title: "国企子公司",
                value: "LABEL_GROUP_RELATION_GQZGS",
              },
              {
                title: "上市公司子公司",
                value: "LABEL_GROUP_RELATION_SSGSZGS",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
      ],
    },
  },
  // {
  //   packName: "企业评价",
  //   packId: "qypj",
  //   componentType: "MarketDropdown",
  //   componentConf: {
  //     tip: "",
  //     dropmenuList: [
  //       {
  //         menuId: "jcxx-cbrs",
  //         title: "科技分",
  //         tip: "<div><div class='title'>科技分</div><div class='text'>企业科技分从科技研发能力、科技资质能力、行业竞争能力、成果转化能力及人才创新能力5个维度对企业科技创新实力及发展潜力进行综合评估</div><div class='title'>科技分等级划分</div><div class='text'>T1：0-20分，该企业综合科创能力表现很弱 <br />T2：20-40分，该企业综合科创能力表现较弱 <br />T3：40-60分，该企业综合科创能力表现一般 <br />T4：60-80分， 该企业综合科创能力表现良好 <br />T5：80-100分，该企业综合科创能力表现优秀 <br /></div> </div>",
  //         componentType: "MarketDropdownCheckbox",
  //         componentConf: {
  //           labelList: [
  //             {
  //               title: "80-100分",
  //               value: "CONDITION_KJSCORE_80-100",
  //             },
  //             {
  //               title: "60-80分",
  //               value: "CONDITION_KJSCORE_60-80",
  //             },
  //             {
  //               title: "40-60分",
  //               value: "CONDITION_KJSCORE_40-60",
  //             },
  //             {
  //               title: "20-40分",
  //               value: "CONDITION_KJSCORE_20-40",
  //             },
  //             {
  //               title: "0-20分",
  //               value: "CONDITION_KJSCORE_0-20",
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    packName: "经营信息",
    packId: "jyxx",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "jcxx-nsrzg",
          title: "纳税人资格",
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "一般纳税人",
                value: "LABEL_TAG_LIST_ybnsr",
              },
              {
                title: "小规模纳税人",
                value: "LABEL_TAG_LIST_xgmnsr",
              },
            ],
          },
        },
        {
          menuId: "jcxx-nsxydj",
          title: "纳税信用等级",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "年A级纳税人",
                value: "LABEL_TAG_LIST_a_thisyear",
                code: "1",
              },
              {
                title: "年A级纳税人",
                value: "LABEL_TAG_LIST_a_lastyear",
                code: "0",
              },
              {
                title: "年A级纳税人",
                value: "LABEL_TAG_LIST_a_lastlastyear",
                code: "-1",
              },
              {
                title: "近三年A级纳税人",
                value: "LABEL_TAG_LIST_a_lxsn",
              },
              {
                title: "非A级纳税人",
                value: "LABEL_TAG_LIST_not_a",
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-xkrz",
          title: "许可认证",
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "道路运输经营许可",
                value: "LABEL_TAG_LIST_dlysjyxk",
              },
              {
                title: "电信业务经营许可",
                value: "LABEL_TAG_LIST_dxywjyxk",
              },
              {
                title: "海关进出口备案",
                value: "LABEL_TAG_LIST_hgjckba",
              },
              {
                title: "金融机构经营许可",
                value: "LABEL_TAG_LIST_jrjgjyxk",
              },
              {
                title: "烟草专卖许可",
                value: "LABEL_TAG_LIST_yczmxk",
              },
              {
                title: "医疗器械生产经营企业",
                value: "LABEL_TAG_LIST_ylqxscjyqy",
              },
              {
                title: "特种设备许可证",
                value: "LABEL_TAG_LIST_tzsbxkz",
              },
              {
                title: "种子生产经营许可",
                value: "LABEL_TAG_LIST_zzscjyxk",
              },
              {
                title: "排污许可证",
                value: "LABEL_TAG_LIST_pwxkz",
              },
              {
                title: "探矿采矿许可证",
                value: "LABEL_TAG_LIST_tkckxkz",
              },
            ],
            dataApi: "",
          },
        },
      ],
    },
  },
  {
    packName: "招投标",
    packId: "ztb",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "jcxx-cbrs",
          title: "项目中标",
          tip: "", // 提示
          componentType: "MarketCustomCategory",
          componentConf: {
            labelList: [
              {
                categoryId: "jcxx-cbrs-zbsj",
                title: "中标时间",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "近1个月有项目中标",
                      value: "LABEL_REG_ZBSJ_1M",
                    },
                    {
                      title: "近3个月有项目中标",
                      value: "LABEL_REG_ZBSJ_3M",
                    },
                    {
                      title: "近6个月有项目中标",
                      value: "LABEL_REG_ZBSJ_6M",
                    },
                    {
                      title: "近12个月有项目中标",
                      value: "LABEL_REG_ZBSJ_12M",
                    },
                  ],
                },
              },
              {
                categoryId: "jcxx-cbrs-zbje",
                title: "近12个月中标金额",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      title: "500万以下",
                      value: "CONDITION_BID_PRICE_0-500",
                    },
                    {
                      title: "500-1000万",
                      value: "CONDITION_BID_PRICE_500-1000",
                    },
                    {
                      title: "1000-2000万",
                      value: "CONDITION_BID_PRICE_1000-2000",
                    },
                    {
                      title: "2000-5000万",
                      value: "CONDITION_BID_PRICE_2000-5000",
                    },
                    {
                      title: "5000万以上",
                      value: "CONDITION_BID_PRICE_5000",
                    },
                    {
                      title: "未披露",
                      value: "CONDITION_BID_PRICE_IS_NULL",
                    },
                  ],
                },
              },
              {
                categoryId: "jcxx-cbrs-typm",
                title: "近12个月中标次数同业排名（按行业大类）",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      title: "前5%",
                      value: "CONDITION_BID_COUNT_0-5",
                    },
                    {
                      title: "5%-10%",
                      value: "CONDITION_BID_COUNT_5-10",
                    },
                    {
                      title: "10%-20%",
                      value: "CONDITION_BID_COUNT_10-20",
                    },
                    {
                      title: "20%-50%",
                      value: "CONDITION_BID_COUNT_20-50",
                    },
                    {
                      title: "50%以上",
                      value: "CONDITION_BID_COUNT_50",
                    },
                  ],
                },
              },
              {
                categoryId: "jcxx-cbrs-jzd",
                title: "近12个月中标业务集中度",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      title: "货物类项目集中供应",
                      value: "LABEL_BID_BUSINESS_CENTER_HWLXMJJGY",
                    },
                    {
                      title: "工程类项目集中供应",
                      value: "LABEL_BID_BUSINESS_CENTER_GCLXMJJGY",
                    },
                    {
                      title: "服务类项目集中供应",
                      value: "LABEL_BID_BUSINESS_CENTER_FWLXMJJGY",
                    },
                    {
                      title: "其它类项目集中供应",
                      value: "LABEL_BID_BUSINESS_CENTER_QTLXMJJGY",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          menuId: "ztb-zbflx",
          title: "招标方类型",
          tip: "",
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "政府机构",
                value: "LABEL_TAG_LIST_zbf_zfjg",
              },
              {
                title: "央企",
                value: "LABEL_TAG_LIST_zbf_yq",
              },
              {
                title: "国企",
                value: "LABEL_TAG_LIST_zbf_gq",
              },
              {
                title: "上市公司",
                value: "LABEL_TAG_LIST_zbf_ss",
              },
            ],
          },
        },
      ],
    },
  },

  {
    packName: "资金需求",
    packId: "zjxq",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "zjxq-zscqrz",
          title: "知识产权融资",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "有知识产权融资", // 中文名
                value: "LABEL_TAG_LIST_zscqrz",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zjxq-yszkrz",
          title: "应收账款融资",
          innerTip: "以下同一条件关系为“或”；不同条件关系为“且”；", // 提示
          componentType: "MarketCustomCategory",
          componentConf: {
            controlCondition: {
              title: "有应收账款融资", // 中文名
              value: "LABEL_TAG_LIST_yszkrz",
            },
            labelList: [
              {
                categoryId: "zjxq-yszkrz-yszkzyrz",
                title: "登记/到期时间",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "不限", // 中文名
                      value: "LABEL_TAG_LIST_yszkrz",
                    },
                    {
                      title: "近1个月有应收账款融资", // 中文名
                      value: "LABEL_YSZKRZ_TIME_GT_1_MONTH",
                    },
                    {
                      title: "近3个月有应收账款融资", // 中文名
                      value: "LABEL_YSZKRZ_TIME_GT_3_MONTH",
                    },
                    {
                      title: "近6个月有应收账款融资", // 中文名
                      value: "LABEL_YSZKRZ_TIME_GT_6_MONTH",
                    },
                    {
                      title: "未来3个月有应收账款融资到期", // 中文名
                      value: "LABEL_TAG_LIST_yszkrzwl3",
                    },
                    {
                      title: "未来1个月有应收账款融资到期", // 中文名
                      value: "LABEL_TAG_LIST_yszkrzwl1",
                    },
                  ],
                },
              },
              {
                categoryId: "zjxq-yszkrz-yszkrzje",
                title: "累计应收账款融资金额",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      tip: "", // 提示
                      title: "30万以下", // 中文名
                      value: "CONDITION_YSZKRZ_MONEY_0-30",
                    },
                    {
                      tip: "", // 提示
                      title: "30-50万", // 中文名
                      value: "CONDITION_YSZKRZ_MONEY_30-50",
                    },
                    {
                      tip: "", // 提示
                      title: "50-100万", // 中文名
                      value: "CONDITION_YSZKRZ_MONEY_50-100",
                    },
                    {
                      tip: "", // 提示
                      title: "100万-200万", // 中文名
                      value: "CONDITION_YSZKRZ_MONEY_100-200",
                    },
                    {
                      tip: "", // 提示
                      title: "200万-300万", // 中文名
                      value: "CONDITION_YSZKRZ_MONEY_200-300",
                    },
                    {
                      tip: "", // 提示
                      title: "300万以上", // 中文名
                      value: "CONDITION_YSZKRZ_MONEY_300",
                    },
                    {
                      tip: "", // 提示
                      title: "未披露", // 中文名
                      value: "CONDITION_YSZKRZ_MONEY_IS_NULL",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          menuId: "zjxq-dcdyrz",
          title: "动产抵押融资",
          innerTip: "以下同一条件关系为“或”；不同条件关系为“且”；", // 提示
          componentType: "MarketCustomCategory",
          componentConf: {
            controlCondition: {
              title: "有动产抵押融资", // 中文名
              value: "LABEL_TAG_LIST_dcdyrz",
            },
            labelList: [
              {
                categoryId: "zjxq-dcdyrz-dcdyrz",
                title: "登记/到期时间",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "不限", // 中文名
                      value: "LABEL_TAG_LIST_dcdyrz",
                    },
                    {
                      tip: "", // 提示
                      title: "近1个月有动产抵押融资", // 中文名
                      value: "LABEL_DCDYRZ_TIME_GT_1_MONTH",
                    },
                    {
                      tip: "", // 提示
                      title: "近3个月有动产抵押融资", // 中文名
                      value: "LABEL_DCDYRZ_TIME_GT_3_MONTH",
                    },
                    {
                      tip: "", // 提示
                      title: "近6个月有动产抵押融资", // 中文名
                      value: "LABEL_DCDYRZ_TIME_GT_6_MONTH",
                    },
                    {
                      tip: "", // 提示
                      title: "未来3个月有动产抵押融资到期", // 中文名
                      value: "LABEL_TAG_LIST_dcdyrzwl3",
                    },
                    {
                      tip: "", // 提示
                      title: "未来1个月有动产抵押融资到期", // 中文名
                      value: "LABEL_TAG_LIST_dcdyrzwl1",
                    },
                  ],
                },
              },
              {
                categoryId: "zjxq-dcdyrz-dcdyrzje",
                title: "累计动产抵押融资金额",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      tip: "", // 提示
                      title: "30万以下", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_0-30",
                    },
                    {
                      tip: "", // 提示
                      title: "30-50万", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_30-50",
                    },
                    {
                      tip: "", // 提示
                      title: "50-100万", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_50-100",
                    },
                    {
                      tip: "", // 提示
                      title: "100万-200万", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_100-200",
                    },
                    {
                      tip: "", // 提示
                      title: "200万-300万", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_200-300",
                    },
                    {
                      tip: "", // 提示
                      title: "300万以上", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_300",
                    },
                    {
                      tip: "", // 提示
                      title: "未披露", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_IS_NULL",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          menuId: "zjxq-rzzl",
          title: "融资租赁",
          innerTip: "以下同一条件关系为“或”；不同条件关系为“且”；", // 提示
          componentType: "MarketCustomCategory",
          componentConf: {
            controlCondition: {
              title: "有融资租赁", // 中文名
              value: "LABEL_TAG_LIST_dcdyrz",
            },
            labelList: [
              {
                categoryId: "zjxq-rzzl-rzzl",
                title: "登记时间",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "不限", // 中文名
                      value: "LABEL_TAG_LIST_rzzl",
                    },
                    {
                      tip: "", // 提示
                      title: "近1个月有融资租赁", // 中文名
                      value: "LABEL_DCDYRZ_TIME_GT_1_MONTH",
                    },
                    {
                      tip: "", // 提示
                      title: "近3个月有融资租赁", // 中文名
                      value: "LABEL_DCDYRZ_TIME_GT_3_MONTH",
                    },
                    {
                      tip: "", // 提示
                      title: "近6个月有融资租赁", // 中文名
                      value: "LABEL_DCDYRZ_TIME_GT_6_MONTH",
                    },
                  ],
                },
              },
              {
                categoryId: "zjxq-rzzl-rzje",
                title: "累计融资金额",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      tip: "", // 提示
                      title: "100万以下", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_0-30",
                    },
                    {
                      tip: "", // 提示
                      title: "100-300万", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_30-50",
                    },
                    {
                      tip: "", // 提示
                      title: "300-500万", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_50-100",
                    },
                    {
                      tip: "", // 提示
                      title: "500-1000万", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_100-200",
                    },
                    {
                      tip: "", // 提示
                      title: "1000万以上", // 中文名
                      value: "CONDITION_DCDYRZ_MONEY_200-300",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          menuId: "zjxq-xmpf",
          title: "项目批复",
          innerTip: "以下同一条件关系为“或”；不同条件关系为“且”；", // 提示
          componentType: "MarketCustomCategory",
          componentConf: {
            controlCondition: {
              title: "有项目批复", // 中文名
              value: "LABEL_TAG_LIST_yxmpf",
            },
            labelList: [
              {
                categoryId: "zjxq-xmpf-xmpf",
                title: "项目批复",
                componentType: "radio",
                componentConf: {
                  labelList: [
                    {
                      title: "不限", // 中文名
                      value: "LABEL_XMPF_TIME_Y",
                    },
                    {
                      tip: "", // 提示
                      title: "近1周有项目批复", // 中文名
                      value: "LABEL_XMPF_TIME_GT_1_WEEK",
                    },
                    {
                      tip: "", // 提示
                      title: "近1个月有项目批复", // 中文名
                      value: "LABEL_XMPF_TIME_GT_1_MONTH",
                    },
                    {
                      tip: "", // 提示
                      title: "近3个月有项目批复", // 中文名
                      value: "LABEL_XMPF_TIME_GT_3_MONTH",
                    },
                  ],
                },
              },
              {
                categoryId: "zjxq-xmpf-xmpflx",
                title: "项目批复类型",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      tip: "", // 提示
                      title: "备案类", // 中文名
                      value: "LABEL_TAG_LIST_xmpf_ba",
                    },
                    {
                      tip: "", // 提示
                      title: "核准类", // 中文名
                      value: "LABEL_TAG_LIST_xmpf_hz",
                    },
                    {
                      tip: "", // 提示
                      title: "审批类", // 中文名
                      value: "LABEL_TAG_LIST_xmpf_sp",
                    },
                    {
                      tip: "", // 提示
                      title: "其它", // 中文名
                      value: "LABEL_TAG_LIST_xmpf_qt",
                    },
                  ],
                },
              },
              {
                categoryId: "zjxq-xmpf-xmpfje",
                title: "累计项目批复金额",
                componentType: "checkbox",
                componentConf: {
                  labelList: [
                    {
                      tip: "", // 提示
                      title: "0-50万", // 中文名
                      value: "CONDITION_XMPF_MONEY_0-50",
                    },
                    {
                      tip: "", // 提示
                      title: "50-100万", // 中文名
                      value: "CONDITION_XMPF_MONEY_50-100",
                    },
                    {
                      tip: "", // 提示
                      title: "100-300万", // 中文名
                      value: "CONDITION_XMPF_MONEY_100-300",
                    },
                    {
                      tip: "", // 提示
                      title: "300-500万", // 中文名
                      value: "CONDITION_XMPF_MONEY_300-500",
                    },
                    {
                      tip: "", // 提示
                      title: "500万以上", // 中文名
                      value: "CONDITION_XMPF_MONEY_500",
                    },
                    {
                      tip: "", // 提示
                      title: "未披露", // 中文名
                      value: "CONDITION_XMPF_MONEY_IS_NULL",
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    packName: "融资上市",
    packId: "rzss",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "rzss-ctrz",
          title: "创投融资",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "有创投融资",
                value: "LABEL_TAG_LIST_ctrz",
              },
              {
                title: "无创投融资",
                value: "LABEL_TAG_LIST_rzxx",
              },
              {
                title: "知名创投融资",
                value: "LABEL_TAG_LIST_zmctrz",
              },
            ],
          },
        },
        {
          menuId: "rzss-rzlc",
          title: "融资轮次",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "种子轮/天使轮",
                value: "LABEL_RZLC_ZZL_TSL",
              },
              {
                title: "A轮",
                value: "LABEL_RZLC_AL",
              },
              {
                title: "B轮",
                value: "LABEL_RZLC_BL",
              },
              {
                title: "C轮",
                value: "LABEL_RZLC_CL",
              },
              {
                title: "D轮",
                value: "LABEL_RZLC_DL",
              },
              {
                title: "E轮",
                value: "LABEL_RZLC_EL",
              },
              {
                title: "F轮",
                value: "LABEL_RZLC_FL",
              },
              {
                title: "Pre-IPO",
                value: "LABEL_RZLC_Pre-IPO",
              },
              {
                title: "战略融资",
                value: "LABEL_RZLC_ZLRZ",
              },
              {
                title: "定向增发",
                value: "LABEL_RZLC_DXZF",
              },
              {
                title: "其它",
                value: "LABEL_RZLC_QT",
              },
            ],
          },
        },
        {
          menuId: "rzss-rzje",
          title: "融资金额",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "2000万以下",
                value: "CONDITION_RZJE_RECENT_0-2000",
              },
              {
                title: "2000-5000万",
                value: "CONDITION_RZJE_RECENT_2000-5000",
              },
              {
                title: "5000万-1亿",
                value: "CONDITION_RZJE_RECENT_5000-10000",
              },
              {
                title: "1亿-3亿",
                value: "CONDITION_RZJE_RECENT_10000-30000",
              },
              {
                title: "3亿-5亿",
                value: "CONDITION_RZJE_RECENT_30000-50000",
              },
              {
                title: "5亿-10亿",
                value: "CONDITION_RZJE_RECENT_50000-100000",
              },
              {
                title: "10亿以上",
                value: "CONDITION_RZJE_RECENT_100000",
              },
              {
                title: "未披露",
                value: "CONDITION_RZJE_RECENT_IS_NULL",
              },
            ],
          },
        },
        {
          menuId: "rzss-czzq",
          title: "成长周期",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "初创期",
                value: "LABEL_GROWTH_CYCLE_CCQ",
              },
              {
                title: "成长期",
                value: "LABEL_GROWTH_CYCLE_CZQ",
              },
              {
                title: "扩张期",
                value: "LABEL_GROWTH_CYCLE_KZQ",
              },
              {
                title: "成熟期",
                value: "LABEL_GROWTH_CYCLE_CSQ",
              },
            ],
          },
        },
        {
          menuId: "rzss-ssgs",
          title: "上市公司",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "沪深主板",
                value: "LABEL_TAG_LIST_hszb",
              },
              {
                title: "创业板",
                value: "LABEL_TAG_LIST_cyb",
              },
              {
                title: "科创板",
                value: "LABEL_TAG_LIST_kcb",
              },
              {
                title: "新三板创新层",
                value: "LABEL_TAG_LIST_xsbcxc",
              },
              {
                title: "新三板基础层",
                value: "LABEL_TAG_LIST_xsbjcc",
              },
              {
                title: "北交所",
                value: "LABEL_TAG_LIST_bjs",
              },
              {
                title: "港股",
                value: "LABEL_TAG_LIST_gg",
              },
              {
                title: "美股",
                value: "LABEL_TAG_LIST_mg",
              },
            ],
          },
        },
        {
          menuId: "rzss-fzqy",
          title: "发债企业",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "是发债企业",
                value: "LABEL_TAG_LIST_fz",
              },
              {
                title: "非发债企业",
                value: "LABEL_TAG_LIST_fz_not",
              },
            ],
          },
        },
        {
          menuId: "rzss-zqfxe",
          title: "债券发行额",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "5000万以下",
                value: "CONDITION_ZQFXE_0-5000",
              },
              {
                title: "5000万-1亿",
                value: "CONDITION_ZQFXE_5000-10000",
              },
              {
                title: "1亿-5亿",
                value: "CONDITION_ZQFXE_10000-50000",
              },
              {
                title: "5亿-10亿",
                value: "CONDITION_ZQFXE_50000-100000",
              },
              {
                title: "10亿以上",
                value: "CONDITION_ZQFXE_100000",
              },
              {
                title: "未披露",
                value: "CONDITION_ZQFXE_IS_NULL",
              },
            ],
          },
        },
        {
          menuId: "rzss-ctqy",
          title: "城投企业",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "是城投企业",
                value: "LABEL_TAG_LIST_ctqy",
              },
              {
                title: "非城投企业",
                value: "LABEL_TAG_LIST_ctqy_not",
              },
            ],
          },
        },
      ],
    },
  },
  {
    packName: "资质认定",
    packId: "zzrd",
    componentType: "MarketDropdown", // 组件类型
    componentConf: {
      isHasClose: true,
      dropmenuList: [
        {
          menuId: "jcxx-gxjsqy",
          title: "高新技术企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "高新技术企业",
                value: "LABEL_TAG_LIST_gxjsqy",
              },
              {
                title: "年高新技术企业",
                value: "LABEL_TAG_LIST_gxjsqy3",
                code: -2,
              },
              {
                title: "年高新技术企业",
                value: "LABEL_TAG_LIST_gxjsqy2",
                code: -1,
              },
              {
                title: "年高新技术企业",
                value: "LABEL_TAG_LIST_gxjsqy1",
                code: 0,
              },
            ],
            dataApi: "getYears", // 接口地址
          },
        },
        {
          menuId: "jcxx-kjxzxqy",
          title: "科技型中小企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "科技型中小企业",
                value: "LABEL_TAG_LIST_kjxzxqy",
              },
              {
                title: "年科技型中小企业",
                value: "LABEL_TAG_LIST_kjxzxqy3",
                code: -2,
              },
              {
                title: "年科技型中小企业",
                value: "LABEL_TAG_LIST_kjxzxqy2",
                code: -1,
              },
              {
                title: "年科技型中小企业",
                value: "LABEL_TAG_LIST_kjxzxqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-dxgjqy",
          title: "单项冠军企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "制造业单项冠军企业",
                value: "LABEL_TAG_LIST_zzydxgjqy",
              },
              {
                title: "年制造业单项冠军企业",
                value: "LABEL_TAG_LIST_zzydxgjqy3",
                code: -2,
              },
              {
                title: "年制造业单项冠军企业",
                value: "LABEL_TAG_LIST_zzydxgjqy2",
                code: -1,
              },
              {
                title: "年制造业单项冠军企业",
                value: "LABEL_TAG_LIST_zzydxgjqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-zjtxxjr",
          title: "专精特新小巨人企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "专精特新小巨人企业",
                value: "LABEL_TAG_LIST_zjtxxjrqy",
              },
              {
                title: "年专精特新小巨人企业",
                value: "LABEL_TAG_LIST_zjtxxjrqy3",
                code: -2,
              },
              {
                title: "年专精特新小巨人企业",
                value: "LABEL_TAG_LIST_zjtxxjrqy2",
                code: -1,
              },
              {
                title: "年专精特新小巨人企业",
                value: "LABEL_TAG_LIST_zjtxxjrqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-zjtxzxqy",
          title: "专精特新中小企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "专精特新企业",
                value: "LABEL_TAG_LIST_zjtxqy",
              },
              {
                title: "年专精特新企业",
                value: "LABEL_TAG_LIST_zjtxqy3",
                code: -2,
              },
              {
                title: "年专精特新企业",
                value: "LABEL_TAG_LIST_zjtxqy2",
                code: -1,
              },
              {
                title: "年专精特新企业",
                value: "LABEL_TAG_LIST_zjtxqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-cxqzxqy",
          title: "创新型中小企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "创新型中小企业",
                value: "LABEL_TAG_LIST_cxxzxqy",
              },
              {
                title: "年创新型中小企业",
                value: "LABEL_TAG_LIST_cxxzxqy3",
                code: -2,
              },
              {
                title: "年创新型中小企业",
                value: "LABEL_TAG_LIST_cxxzxqy2",
                code: -1,
              },
              {
                title: "年创新型中小企业",
                value: "LABEL_TAG_LIST_cxxzxqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-kjxxjr",
          title: "科技型小巨人",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "科技型小巨人",
                value: "LABEL_TAG_LIST_kjxxjrqy",
              },
              {
                title: "年科技型小巨人",
                value: "LABEL_TAG_LIST_kjxxjrqy3",
                code: -2,
              },
              {
                title: "年科技型小巨人",
                value: "LABEL_TAG_LIST_kjxxjrqy2",
                code: -1,
              },
              {
                title: "年科技型小巨人",
                value: "LABEL_TAG_LIST_kjxxjrqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-dlqy",
          title: "瞪羚企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "瞪羚企业",
                value: "LABEL_TAG_LIST_dlqy",
              },
              {
                title: "年瞪羚企业",
                value: "LABEL_TAG_LIST_dlqy3",
                code: -2,
              },
              {
                title: "年瞪羚企业",
                value: "LABEL_TAG_LIST_dlqy2",
                code: -1,
              },
              {
                title: "年瞪羚企业",
                value: "LABEL_TAG_LIST_dlqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-nlqy",
          title: "牛羚企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "牛羚企业",
                value: "LABEL_TAG_LIST_nlqy",
                code: -2,
              },
              {
                title: "年牛羚企业",
                value: "LABEL_TAG_LIST_nlqy2",
                code: -1,
              },
              {
                title: "年牛羚企业",
                value: "LABEL_TAG_LIST_nlqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-cyqy",
          title: "雏鹰企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "雏鹰企业",
                value: "LABEL_TAG_LIST_cyqy",
              },
              {
                title: "年雏鹰企业",
                value: "LABEL_TAG_LIST_cyqy3",
                code: -2,
              },
              {
                title: "年雏鹰企业",
                value: "LABEL_TAG_LIST_cyqy2",
                code: -1,
              },
              {
                title: "年雏鹰企业",
                value: "LABEL_TAG_LIST_cyqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-yxgjqy",
          title: "隐形冠军",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "隐形冠军",
                value: "LABEL_TAG_LIST_yxgjqy",
              },
              {
                title: "年隐形冠军",
                value: "LABEL_TAG_LIST_yxgjqy3",
                code: -2,
              },
              {
                title: "年隐形冠军",
                value: "LABEL_TAG_LIST_yxgjqy2",
                code: -1,
              },
              {
                title: "年隐形冠军",
                value: "LABEL_TAG_LIST_yxgjqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-jscxsfqy",
          title: "技术创新示范企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "技术创新示范企业",
                value: "LABEL_TAG_LIST_jscxsfqy",
              },
              {
                title: "年技术创新示范企业",
                value: "LABEL_TAG_LIST_jscxsfqy3",
                code: -2,
              },
              {
                title: "年技术创新示范企业",
                value: "LABEL_TAG_LIST_jscxsfqy2",
                code: -1,
              },
              {
                title: "年技术创新示范企业",
                value: "LABEL_TAG_LIST_jscxsfqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-jsxjxfwqy",
          title: "技术先进型服务企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "技术先进型服务企业",
                value: "LABEL_TAG_LIST_jsxjxfwqy",
              },
              {
                title: "年技术先进型服务企业",
                value: "LABEL_TAG_LIST_jsxjxfwqy3",
                code: -2,
              },
              {
                title: "年技术先进型服务企业",
                value: "LABEL_1TAG_LIST_jsxjxfwqy2",
                code: -1,
              },
              {
                title: "年技术先进型服务企业",
                value: "LABEL_TAG_LIST_jsxjxfwqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-mykjqy",
          title: "民营科技企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "民营科技企业",
                value: "LABEL_TAG_LIST_mykjqy",
              },
              {
                title: "年民营科技企业",
                value: "LABEL_TAG_LIST_mykjqy3",
                code: -2,
              },
              {
                title: "年民营科技企业",
                value: "LABEL_TAG_LIST_mykjqy2",
                code: -1,
              },
              {
                title: "年民营科技企业",
                value: "LABEL_TAG_LIST_mykjqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-djsqy",
          title: "独角兽企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "独角兽企业",
                value: "LABEL_TAG_LIST_djsqy",
              },
              {
                title: "年独角兽企业",
                value: "LABEL_TAG_LIST_djsqy3",
                code: -2,
              },
              {
                title: "年独角兽企业",
                value: "LABEL_TAG_LIST_djsqy2",
                code: -1,
              },
              {
                title: "年独角兽企业",
                value: "LABEL_TAG_LIST_djsqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-zzdjsqy",
          title: "种子独角兽企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "种子独角兽企业",
                value: "LABEL_TAG_LIST_zzdjsqy",
              },
              {
                title: "年种子独角兽企业",
                value: "LABEL_TAG_LIST_zzdjsqy2",
                code: -1,
              },
              {
                title: "年种子独角兽企业",
                value: "LABEL_TAG_LIST_zzdjsqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-qzdjsqy",
          title: "潜在独角兽企业",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "潜在独角兽企业",
                value: "LABEL_TAG_LIST_qzdjsqy",
              },
              {
                title: "年潜在独角兽企业",
                value: "LABEL_TAG_LIST_qzdjsqy2",
                code: -1,
              },
              {
                title: "年潜在独角兽企业",
                value: "LABEL_TAG_LIST_qzdjsqy1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-qyjszx",
          title: "企业技术中心",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "企业技术中心",
                value: "LABEL_TAG_LIST_qyjszx",
              },
              {
                title: "年企业技术中心",
                value: "LABEL_TAG_LIST_qyjszx3",
                code: -2,
              },
              {
                title: "年企业技术中心",
                value: "LABEL_TAG_LIST_qyjszx2",
                code: -1,
              },
              {
                title: "年企业技术中心",
                value: "LABEL_TAG_LIST_qyjszx1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-zdsys",
          title: "重点实验室",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "重点实验室",
                value: "LABEL_TAG_LIST_zdsys",
              },
              {
                title: "年重点实验室",
                value: "LABEL_TAG_LIST_zdsys3",
                code: -2,
              },
              {
                title: "年重点实验室",
                value: "LABEL_TAG_LIST_zdsys2",
                code: -1,
              },
              {
                title: "年重点实验室",
                value: "LABEL_TAG_LIST_zdsys1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-kjqyfhq",
          title: "科技企业孵化器",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "科技企业孵化器",
                value: "LABEL_TAG_LIST_kjqyfhq",
              },
              {
                title: "年科技企业孵化器",
                value: "LABEL_TAG_LIST_kjqyfhq3",
                code: -2,
              },
              {
                title: "年科技企业孵化器",
                value: "LABEL_TAG_LIST_kjqyfhq2",
                code: -1,
              },
              {
                title: "年科技企业孵化器",
                value: "LABEL_TAG_LIST_kjqyfhq1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-zckj",
          title: "备案众创空间",
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                title: "备案众创空间",
                value: "LABEL_TAG_LIST_bazckj",
              },
              {
                title: "年备案众创空间",
                value: "LABEL_TAG_LIST_bazckj3",
                code: -2,
              },
              {
                title: "年备案众创空间",
                value: "LABEL_TAG_LIST_bazckj2",
                code: -1,
              },
              {
                title: "年备案众创空间",
                value: "LABEL_TAG_LIST_bazckj1",
                code: 0,
              },
            ],
            dataApi: "getYears",
          },
        },
        {
          menuId: "jcxx-qtzz",
          title: "其它资质",
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                title: "博士后科研工作站",
                value: "LABEL_TAG_LIST_bshkygzz",
              },
              {
                title: "博士后科研流动站",
                value: "LABEL_TAG_LIST_bshkyldz",
              },
              {
                title: "院士专家工作站",
                value: "LABEL_TAG_LIST_yszjgzz",
              },
            ],
          },
        },
      ],
    },
  },
  {
    packName: "知识产权",
    packId: "zscq",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "zscq-zscq1",
          title: "Ⅰ类知识产权",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "有Ⅰ类知识产权", // 中文名
                value: "LABEL_TAG_LIST_ygjkjcg",
              },
              {
                tip: "", // 提示
                title: "无Ⅰ类知识产权", // 中文名
                value: "LABEL_TAG_LIST_wgjkljcg",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zscq-zscq2",
          title: "Ⅱ类知识产权",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "有Ⅱ类知识产权", // 中文名
                value: "LABEL_TAG_LIST_elzscq",
              },
              {
                tip: "", // 提示
                title: "无Ⅱ类知识产权", // 中文名
                value: "LABEL_TAG_LIST_elzscq_not",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zscq-zlq",
          title: "专利权",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "发明公布", // 中文名
                value: "LABEL_TAG_LIST_fmgb",
              },
              {
                tip: "", // 提示
                title: "发明授权", // 中文名
                value: "LABEL_TAG_LIST_fmsq",
              },
              {
                tip: "", // 提示
                title: "实用新型", // 中文名
                value: "LABEL_TAG_LIST_syxx",
              },
              {
                tip: "", // 提示
                title: "外观设计", // 中文名
                value: "LABEL_TAG_LIST_wgsj",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zscq-zjzd",
          title: "标准制定",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "参与标准制定", // 中文名
                value: "LABEL_TAG_LIST_cybzzd",
              },
              {
                tip: "", // 提示
                title: "参与国家标准", // 中文名
                value: "LABEL_TAG_LIST_cygjbz",
              },
              {
                tip: "", // 提示
                title: "参与行业标准", // 中文名
                value: "LABEL_TAG_LIST_cyhybz",
              },
              {
                tip: "", // 提示
                title: "参与地方标准", // 中文名
                value: "LABEL_TAG_LIST_cydfbz",
              },
              {
                tip: "", // 提示
                title: "参与团体标准", // 中文名
                value: "LABEL_TAG_LIST_cyttbz",
              },
              {
                tip: "", // 提示
                title: "参与企业标准", // 中文名
                value: "LABEL_TAG_LIST_cyqybz",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zscq-qtzscq",
          title: "其它知识产权",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "集成电路布图设计专有权", // 中文名
                value: "LABEL_TAG_LIST_jcdlbtsjzyq",
              },
              {
                tip: "", // 提示
                title: "植物新品种权", // 中文名
                value: "LABEL_TAG_LIST_zwxpzq",
              },
              {
                tip: "", // 提示
                title: "国家农作物品种权", // 中文名
                value: "LABEL_TAG_LIST_gjnzwpzq",
              },
              {
                tip: "", // 提示
                title: "国家新药权", // 中文名
                value: "LABEL_TAG_LIST_gjxyq",
              },
              {
                tip: "", // 提示
                title: "商标", // 中文名
                value: "LABEL_TAG_LIST_sb",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zscq-gjkjcg",
          title: "国家科技成果",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "有国家科技成果", // 中文名
                value: "LABEL_TAG_LIST_ygjkjcg",
              },
              {
                tip: "", // 提示
                title: "无国家科技成果", // 中文名
                value: "LABEL_TAG_LIST_wgjkljcg",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zscq-zlhj",
          title: "专利获奖",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "金奖", // 中文名
                value: "LABEL_TAG_LIST_zlhjjj",
              },
              {
                tip: "", // 提示
                title: "银奖", // 中文名
                value: "LABEL_TAG_LIST_zlhjyj",
              },
              {
                tip: "", // 提示
                title: "优秀奖", // 中文名
                value: "LABEL_TAG_LIST_zlhjyxj",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
      ],
    },
  },
  {
    // 待确认： 年份 是不是要动态获取
    packName: "政策支持",
    packId: "zczc",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "zczc-zcbt",
          title: "政策补贴",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "研发投入补贴", // 中文名
                value: "LABEL_TAG_LIST_yftrbt",
              },
              {
                tip: "", // 提示
                title: "固定资产投入补贴", // 中文名
                value: "LABEL_TAG_LIST_gdzctrbt",
              },
              {
                tip: "", // 提示
                title: "企业荣誉资质补贴", // 中文名
                value: "LABEL_TAG_LIST_qyryzzbt",
              },
              {
                tip: "", // 提示
                title: "企业管理提升补贴", // 中文名
                value: "LABEL_TAG_LIST_qygltsbt",
              },
              {
                tip: "", // 提示
                title: "融资贷款补贴", // 中文名
                value: "LABEL_TAG_LIST_rzdkbt",
              },
              {
                tip: "", // 提示
                title: "人才政策补贴", // 中文名
                value: "LABEL_TAG_LIST_rczcbt",
              },
              {
                tip: "", // 提示
                title: "税收减免补贴", // 中文名
                value: "LABEL_TAG_LIST_ssjmbt",
              },
              {
                tip: "", // 提示
                title: "产业政策补贴", // 中文名
                value: "LABEL_TAG_LIST_cyzcbt",
              },
              {
                tip: "", // 提示
                title: "知识产权补贴", // 中文名
                value: "LABEL_TAG_LIST_zscqbt",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zczc-btje",
          title: "累计补贴金额",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "5000元以下", // 中文名
                value: "CONDITION_BT_MONEY_0-0.5",
              },
              {
                tip: "", // 提示
                title: "5000-1万元", // 中文名
                value: "CONDITION_BT_MONEY_0.5-1",
              },
              {
                tip: "", // 提示
                title: "1万元-5万元", // 中文名
                value: "CONDITION_BT_MONEY_1-5",
              },
              {
                tip: "", // 提示
                title: "5万元-10万元", // 中文名
                value: "CONDITION_BT_MONEY_5-10",
              },
              {
                tip: "", // 提示
                title: "10万元以上", // 中文名
                value: "CONDITION_BT_MONEY_10",
              },
              {
                tip: "", // 提示
                title: "未披露", // 中文名
                value: "CONDITION_BT_MONEY_IS_NULL",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "zczc-btnf",
          title: "补贴年份",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "年", // 中文名
                value: "LABEL_TAG_LIST_bt1",
                code: "1",
              },
              {
                tip: "", // 提示
                title: "年", // 中文名
                value: "LABEL_TAG_LIST_bt2",
                code: "0",
              },
              {
                tip: "", // 提示
                title: "年", // 中文名
                value: "LABEL_TAG_LIST_bt3",
                code: "-1",
              },
              {
                tip: "", // 提示
                title: "曾发生补贴", // 中文名
                value: "LABEL_TAG_LIST_bt",
              },
            ],
            dataApi: "getYears", // 接口地址
          },
        },
      ],
    },
  },
  {
    packName: "同业分析",
    packId: "tyfx",
    componentType: "PeerAnalysis",
    componentConf: {
      tip: "",
      minHeight: 52 // 收起时的最小高度，未设置默认为28
    },
    children: [
      {
        packName: "报告日期：",
        packId: "tyfx-bgrq",
        componentType: "MarketRadio",
        componentConf: {
          isChief: true,
          clickCancel: true,
          labelList: [
            {
              tip: "", // 提示
              title: "年", // 中文名
              value: "LABEL_TAG_LIST_quNian",
              code: 0
            },
            {
              tip: "", // 提示
              title: "年", // 中文名
              value: "LABEL_TAG_LIST_qianNian",
              code: -1
            },
            {
              tip: "", // 提示
              title: "年", // 中文名
              value: "LABEL_TAG_LIST_daQianNian",
              code: -2
            },
          ],
          dataApi: 'getYears'
        }
      },
      {
        packName: "盈利能力：",
        packId: "tyfx-yynl",
        componentType: "MarketDropdown",
        componentConf: {
          tip: "",
          dropmenuList: [
            {
              menuId: "tyfx-jzcsyl",
              title: "净资产收益率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_JZCSYLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_JZCSYLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_JZCSYLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_JZCSYLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_JZCSYLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-zzcsyl",
              title: "总资产收益率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_ZZCSYLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_ZZCSYLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_ZZCSYLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_ZZCSYLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_ZZCSYLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-yylrl",
              title: "营业利润率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_YLLRLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_YLLRLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_YLLRLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_YLLRLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_YLLRLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-yylrzzl",
              title: "营业利润增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_YLRZZL_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_YLRZZL_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_YLRZZL_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_YLRZZL_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%以上", // 中文名
                    value: "CONDITION_TYFX_YLRZZL_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            }
          ],
        }
      },
      {
        packName: "偿债能力：",
        packId: "tyfx-cznl",
        componentType: "MarketDropdown",
        componentConf: {
          tip: "",
          dropmenuList: [
            {
              menuId: "tyfx-zcfzl",
              title: "资产负债率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_ZCFZLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_ZCFZLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_ZCFZLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_ZCFZLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_ZCFZLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            }
          ],
        }
      },
      {
        packName: "营运能力：",
        packId: "tyfx-yyunnl",
        componentType: "MarketDropdown",
        componentConf: {
          tip: "",
          dropmenuList: [
            {
              menuId: "tyfx-yynl-zzczzl",
              title: "总资产周转率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_ZZCZZLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_ZZCZZLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_ZZCZZLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_ZZCZZLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_ZZCZZLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            }
          ],
        }
      },
      {
        packName: "成长能力：",
        packId: "tyfx-czhangnl",
        componentType: "MarketDropdown",
        componentConf: {
          tip: "",
          dropmenuList: [
            {
              menuId: "tyfx-czhangnl-yysrzzl",
              title: "营业收入增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_YYSRZZLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_YYSRZZLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_YYSRZZLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_YYSRZZLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_YYSRZZLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-czhangnl-yysrfhzzl",
              title: "营业收入复合增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_YYSRFHZZLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_YYSRFHZZLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_YYSRFHZZLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_YYSRFHZZLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_YYSRFHZZLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-czhangnl-jlrzzl",
              title: "净利润增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_JLRZZLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_JLRZZLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_JLRZZLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_JLRZZLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_JLRZZLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-czhangnl-jzczzl",
              title: "净资产增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_JZCZZLPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_JZCZZLPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_JZCZZLPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_JZCZZLPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_JZCZZLPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            }
          ],
        }
      },
      {
        packName: "财务数据：",
        packId: "tyfx-cwsj",
        componentType: "MarketDropdown",
        componentConf: {
          tip: "",
          dropmenuList: [
            {
              menuId: "tyfx-cwsj-yysr",
              title: "营业收入",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_YYSRPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_YYSRPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_YYSRPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_YYSRPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_YYSRPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-cwsj-jlr",
              title: "净利润",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_JLRPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_JLRPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_JLRPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_JLRPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_JLRPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-cwsj-zcze",
              title: "资产总额",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_ZCZEPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_ZCZEPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_ZCZEPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_ZCZEPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_ZCZEPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-cwsj-fzze",
              title: "负债总额",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_FZZEPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_FZZEPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_FZZEPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_FZZEPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_FZZEPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "tyfx-cwsj-syzqy",
              title: "所有者权益",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "前5%", // 中文名
                    value: "CONDITION_TYFX_SYZQYPM_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "前5%-10%", // 中文名
                    value: "CONDITION_TYFX_SYZQYPM_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "前10%-20%", // 中文名
                    value: "CONDITION_TYFX_SYZQYPM_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "前20%-50%", // 中文名
                    value: "CONDITION_TYFX_SYZQYPM_20-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%之后", // 中文名
                    value: "CONDITION_TYFX_SYZQYPM_50",
                  },
                ],
                dataApi: "", // 接口地址
              },
            }
          ],
        }
      },
    ]
  },
  {
    packName: "财务分析",
    packId: "cwfx",
    componentType: "PeerAnalysis",
    componentConf: {
      tip: "",
      minHeight: 52 // 收起时的最小高度，未设置默认为28
    },
    children: [
      {
        packName: "报告日期：",
        packId: "cwfx-bgrq",
        componentType: "MarketRadio",
        componentConf: {
          isChief: true,
          clickCancel: true,
          labelList: [
            {
              tip: "", // 提示
              title: "年", // 中文名
              value: "LABEL_TAG_LIST_quNian",
              code: 0
            },
            {
              tip: "", // 提示
              title: "年", // 中文名
              value: "LABEL_TAG_LIST_qianNian",
              code: -1
            },
            {
              tip: "", // 提示
              title: "年", // 中文名
              value: "LABEL_TAG_LIST_daQianNian",
              code: -2
            },
          ],
          dataApi: 'getYears'
        }
      },
      {
        packName: "财务数据：",
        packId: "cwfx-cwsj",
        componentType: "MarketDropdown",
        componentConf: {
          tip: "",
          dropmenuList: [
            {
              menuId: "cwfx-cwsj-yysr",
              title: "营业收入",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_YYSR_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0-500万", // 中文名
                    value: "CONDITION_CWSJ_YYSR_0-500",
                  },
                  {
                    tip: "", // 提示
                    title: "500万-1000万", // 中文名
                    value: "CONDITION_CWSJ_YYSR_500-1000",
                  },
                  {
                    tip: "", // 提示
                    title: "1000万-2000万", // 中文名
                    value: "CONDITION_CWSJ_YYSR_1000-2000",
                  },
                  {
                    tip: "", // 提示
                    title: "2000万-5000万", // 中文名
                    value: "CONDITION_CWSJ_YYSR_2000-5000",
                  },
                  {
                    tip: "", // 提示
                    title: "5000万-1亿", // 中文名
                    value: "CONDITION_CWSJ_YYSR_5000-10000",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_YYSR_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "万", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwsj-jlr",
              title: "净利润",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_JLR_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "100万以下", // 中文名
                    value: "CONDITION_CWSJ_JLR_0-100",
                  },
                  {
                    tip: "", // 提示
                    title: "100万-500万", // 中文名
                    value: "CONDITION_CWSJ_JLR_100-500",
                  },
                  {
                    tip: "", // 提示
                    title: "500万-1000万", // 中文名
                    value: "CONDITION_CWSJ_JLR_500-1000",
                  },
                  {
                    tip: "", // 提示
                    title: "1000万-3000万", // 中文名
                    value: "CONDITION_CWSJ_JLR_1000-3000",
                  },
                  {
                    tip: "", // 提示
                    title: "3000万-5000万", // 中文名
                    value: "CONDITION_CWSJ_JLR_3000-5000",
                  },
                  {
                    tip: "", // 提示
                    title: "5000万以上", // 中文名
                    value: "CONDITION_CWSJ_JLR_5000",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_JLR_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "万", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwsj-zcze",
              title: "资产总额",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_ZCZE_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0-5000万", // 中文名
                    value: "CONDITION_CWSJ_ZCZE_0-5000",
                  },
                  {
                    tip: "", // 提示
                    title: "5000万-1亿", // 中文名
                    value: "CONDITION_CWSJ_ZCZE_5000-100000",
                  },
                  {
                    tip: "", // 提示
                    title: "1亿-5亿", // 中文名
                    value: "CONDITION_CWSJ_ZCZE_100000-500000",
                  },
                  {
                    tip: "", // 提示
                    title: "5亿-10亿", // 中文名
                    value: "CONDITION_CWSJ_ZCZE_500000-100000",
                  },
                  {
                    tip: "", // 提示
                    title: "10亿以上", // 中文名
                    value: "CONDITION_CWSJ_ZCZE_1000000",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_ZCZE_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "万", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwsj-fzze",
              title: "负债总额",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_ZCFZ_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0-5000万", // 中文名
                    value: "CONDITION_CWSJ_ZCFZ_0-5000",
                  },
                  {
                    tip: "", // 提示
                    title: "5000万-1亿", // 中文名
                    value: "CONDITION_CWSJ_ZCFZ_5000-100000",
                  },
                  {
                    tip: "", // 提示
                    title: "1亿以上", // 中文名
                    value: "CONDITION_CWSJ_ZCFZ_10000",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_ZCFZ_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "万", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwsj-syzqy",
              title: "所有者权益",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_SYZQY_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0-5000万", // 中文名
                    value: "CONDITION_CWSJ_SYZQY_0-5000",
                  },
                  {
                    tip: "", // 提示
                    title: "5000万-1亿", // 中文名
                    value: "CONDITION_CWSJ_SYZQY_5000-10000",
                  },
                  {
                    tip: "", // 提示
                    title: "1亿以上", // 中文名
                    value: "CONDITION_CWSJ_SYZQY_10000",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_SYZQY_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "万", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
          ]
        }
      },
      {
        packName: "财务指标：",
        packId: "cwfx-cwzb",
        componentType: "MarketDropdown",
        componentConf: {
          tip: "",
          dropmenuList: [
            {
              menuId: "cwfx-cwzb-jzcsyl",
              title: "净资产收益率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_JZCSYL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-3%", // 中文名
                    value: "CONDITION_CWSJ_JZCSYL_0-3",
                  },
                  {
                    tip: "", // 提示
                    title: "3%-5%", // 中文名
                    value: "CONDITION_CWSJ_JZCSYL_3-5",
                  },
                  {
                    tip: "", // 提示
                    title: "5%-10%", // 中文名
                    value: "CONDITION_CWSJ_JZCSYL_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-15%", // 中文名
                    value: "CONDITION_CWSJ_JZCSYL_10-15",
                  },
                  {
                    tip: "", // 提示
                    title: "15%以上", // 中文名
                    value: "CONDITION_CWSJ_JZCSYL_15",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_JZCSYL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-zzcsyl",
              title: "总资产收益率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_ZZCSYL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-5%", // 中文名
                    value: "CONDITION_CWSJ_ZZCSYL_0-5",
                  },
                  {
                    tip: "", // 提示
                    title: "5%-10%", // 中文名
                    value: "CONDITION_CWSJ_ZZCSYL_5-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-15%", // 中文名
                    value: "CONDITION_CWSJ_ZZCSYL_10-15",
                  },
                  {
                    tip: "", // 提示
                    title: "15%以上", // 中文名
                    value: "CONDITION_CWSJ_ZZCSYL_15",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_ZZCSYL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-yylrl",
              title: "营业利润率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_YYLRL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-10%", // 中文名
                    value: "CONDITION_CWSJ_YYLRL_0-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-20%", // 中文名
                    value: "CONDITION_CWSJ_YYLRL_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "20%以上", // 中文名
                    value: "CONDITION_CWSJ_YYLRL_20",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_YYLRL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-zcfzl",
              title: "资产负债率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "10%以下", // 中文名
                    value: "CONDITION_CWSJ_ZCFZL_0-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-20%", // 中文名
                    value: "CONDITION_CWSJ_ZCFZL_10-20",
                  },
                  {
                    tip: "", // 提示
                    title: "20%-30%", // 中文名
                    value: "CONDITION_CWSJ_ZCFZL_20-30",
                  },
                  {
                    tip: "", // 提示
                    title: "30%-40%", // 中文名
                    value: "CONDITION_CWSJ_ZCFZL_30-40",
                  },
                  {
                    tip: "", // 提示
                    title: "40%-50%", // 中文名
                    value: "CONDITION_CWSJ_ZCFZL_40-50",
                  },
                  {
                    tip: "", // 提示
                    title: "50%以上", // 中文名
                    value: "CONDITION_CWSJ_ZCFZL_50",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_ZCFZL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-zzczzl",
              title: "总资产周转率（次）",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZLC_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0-0.5次", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZLC_0-0.5",
                  },
                  {
                    tip: "", // 提示
                    title: "0.5-1次", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZLC_0.5-1",
                  },
                  {
                    tip: "", // 提示
                    title: "1-1.5次", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZLC_1-1.5",
                  },
                  {
                    tip: "", // 提示
                    title: "1.5次以上", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZLC_1.5",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_ZZCZZLC_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "次", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-yysrzzl",
              title: "营业收入增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_YYSRZZL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-10%", // 中文名
                    value: "CONDITION_CWSJ_YYSRZZL_0-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-15%", // 中文名
                    value: "CONDITION_CWSJ_YYSRZZL_10-15",
                  },
                  {
                    tip: "", // 提示
                    title: "15%-20%", // 中文名
                    value: "CONDITION_CWSJ_YYSRZZL_15-20",
                  },
                  {
                    tip: "", // 提示
                    title: "20%-30%", // 中文名
                    value: "CONDITION_CWSJ_YYSRZZL_20-30",
                  },
                  {
                    tip: "", // 提示
                    title: "30%以上", // 中文名
                    value: "CONDITION_CWSJ_YYSRZZL_30",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_YYSRZZL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-yylrzzl",
              title: "营业利润增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_YYLRZZL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-10%", // 中文名
                    value: "CONDITION_CWSJ_YYLRZZL_0-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-15%", // 中文名
                    value: "CONDITION_CWSJ_YYLRZZL_10-15",
                  },
                  {
                    tip: "", // 提示
                    title: "15%-20%", // 中文名
                    value: "CONDITION_CWSJ_YYLRZZL_15-20",
                  },
                  {
                    tip: "", // 提示
                    title: "20%-30%", // 中文名
                    value: "CONDITION_CWSJ_YYLRZZL_20-30",
                  },
                  {
                    tip: "", // 提示
                    title: "30%以上", // 中文名
                    value: "CONDITION_CWSJ_YYLRZZL_30",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_YYLRZZL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-jlrzzl",
              title: "净利润增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_JLRZZL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-10%", // 中文名
                    value: "CONDITION_CWSJ_JLRZZL_0-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-15%", // 中文名
                    value: "CONDITION_CWSJ_JLRZZL_10-15",
                  },
                  {
                    tip: "", // 提示
                    title: "15%-20%", // 中文名
                    value: "CONDITION_CWSJ_JLRZZL_15-20",
                  },
                  {
                    tip: "", // 提示
                    title: "20%-30%", // 中文名
                    value: "CONDITION_CWSJ_JLRZZL_20-30",
                  },
                  {
                    tip: "", // 提示
                    title: "30%以上", // 中文名
                    value: "CONDITION_CWSJ_JLRZZL_30",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_JLRZZL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-jzczzl",
              title: "净资产增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_JZCZZL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-10%", // 中文名
                    value: "CONDITION_CWSJ_JZCZZL_0-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-15%", // 中文名
                    value: "CONDITION_CWSJ_JZCZZL_10-15",
                  },
                  {
                    tip: "", // 提示
                    title: "15%-20%", // 中文名
                    value: "CONDITION_CWSJ_JZCZZL_15-20",
                  },
                  {
                    tip: "", // 提示
                    title: "20%-30%", // 中文名
                    value: "CONDITION_CWSJ_JZCZZL_20-30",
                  },
                  {
                    tip: "", // 提示
                    title: "30%以上", // 中文名
                    value: "CONDITION_CWSJ_JZCZZL_30",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_JZCZZL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
            {
              menuId: "cwfx-cwzb-zzczengzhangl",
              title: "总资产增长率",
              tip: "", // 提示
              componentType: "MarketDropdownRadio",
              componentConf: {
                labelList: [
                  {
                    tip: "", // 提示
                    title: "低于0", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZL_LT_0",
                  },
                  {
                    tip: "", // 提示
                    title: "0%-10%", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZL_0-10",
                  },
                  {
                    tip: "", // 提示
                    title: "10%-15%", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZL_10-15",
                  },
                  {
                    tip: "", // 提示
                    title: "15%-20%", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZL_15-20",
                  },
                  {
                    tip: "", // 提示
                    title: "20%-30%", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZL_20-30",
                  },
                  {
                    tip: "", // 提示
                    title: "30%以上", // 中文名
                    value: "CONDITION_CWSJ_ZZCZZL_30",
                  },
                  {
                    title: "自定义",
                    value: "CONDITION_CWSJ_ZZCZZL_CUSTOMIZED",
                    tip: '',
                    customerType: "dropInput", // 自定义类型，dropInput:下拉输入，dropDate:日期
                    customerUnit: "%", // 自定义单位
                    isCustomer: true, // 是否为自定义 是true、否false
                    templateParams: ["lowerBound","upperBound"] // 接口查询时，模板参数
                  }
                ],
                dataApi: "", // 接口地址
              },
            },
          ],
        }
      },
    ]
  },
  {
    packName: "风险过滤",
    packId: "fxgl",
    componentType: "MarketDropdown",
    componentConf: {
      tip: "",
      dropmenuList: [
        {
          menuId: "fxgl-gsbg",
          title: "工商变更",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "近6个月未发生法人变更", // 中文名
                value: "LABEL_TAG_LIST_frwbg6",
              },
              {
                tip: "", // 提示
                title: "近12个月未发生法人变更", // 中文名
                value: "LABEL_TAG_LIST_frwbg12",
              },
              {
                tip: "", // 提示
                title: "近6个月未发生注册资本减少", // 中文名
                value: "LABEL_TAG_LIST_zczbwjs6",
              },
              {
                tip: "", // 提示
                title: "近12个月未发生注册资本减少", // 中文名
                value: "LABEL_TAG_LIST_zczbwjs12",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-xzcf",
          title: "行政处罚",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "近12个月无行政处罚", // 中文名
                value: "LABEL_TAG_LIST_wxzcf12",
              },
              {
                tip: "", // 提示
                title: "无行政处罚", // 中文名
                value: "LABEL_TAG_LIST_wxzcf",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-jyyc",
          title: "经营异常",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "历史无经营异常", // 中文名
                value: "LABEL_TAG_LIST_wjyyc",
              },
              {
                tip: "", // 提示
                title: "已移出经营异常", // 中文名
                value: "LABEL_TAG_LIST_yycjyyc",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-qsxw",
          title: "欠税行为",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "近12个月无欠税行为", // 中文名
                value: "LABEL_TAG_LIST_wqsxw12",
              },
              {
                tip: "", // 提示
                title: "无欠税行为", // 中文名
                value: "LABEL_TAG_LIST_wqsxw",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-zdsswf",
          title: "重大税收违法",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "近12个月无重大税收违法", // 中文名
                value: "LABEL_TAG_LIST_wzdsswfjl12",
              },
              {
                tip: "", // 提示
                title: "无重大税收违法记录", // 中文名
                value: "LABEL_TAG_LIST_wzdsswfjl",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-bzxr",
          title: "被执行人",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "历史无被执行人", // 中文名
                value: "LABEL_TAG_LIST_qywbzxr",
              },
              {
                tip: "", // 提示
                title: "已移出被执行人", // 中文名
                value: "LABEL_TAG_LIST_qyyycbzxr",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-xzgxf",
          title: "限制高消费",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "历史无限制高消费", // 中文名
                value: "LABEL_TAG_LIST_wxzgxf",
              },
              {
                tip: "", // 提示
                title: "已移出限制高消费", // 中文名
                value: "LABEL_TAG_LIST_yycxzgxf",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-sxbzxr",
          title: "失信被执行人",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "历史无失信被执行", // 中文名
                value: "LABEL_TAG_LIST_qywsxbzxr",
              },
              {
                tip: "", // 提示
                title: "已移出失信被执行", // 中文名
                value: "LABEL_TAG_LIST_qyyycsxbzxr",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-yzwfsx",
          title: "严重违法失信",
          tip: "", // 提示
          componentType: "MarketDropdownRadio",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "无严重违法失信", // 中文名
                value: "LABEL_TAG_LIST_wyzwfsx",
              },
              {
                tip: "", // 提示
                title: "已移出严重违法失信", // 中文名
                value: "LABEL_TAG_LIST_yycyzwfsx",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
        {
          menuId: "fxgl-pacz",
          title: "破产重组",
          tip: "", // 提示
          componentType: "MarketDropdownCheckbox",
          componentConf: {
            labelList: [
              {
                tip: "", // 提示
                title: "无破产重整", // 中文名
                value: "LABEL_TAG_LIST_wpccz",
              },
              {
                tip: "", // 提示
                title: "无清算信息", // 中文名
                value: "LABEL_TAG_LIST_wqsxx",
              },
              {
                tip: "", // 提示
                title: "无股权冻结", // 中文名
                value: "LABEL_TAG_LIST_wgqdj",
              },
            ],
            dataApi: "", // 接口地址
          },
        },
      ],
    },
  },
];
export { labelsConfig };
