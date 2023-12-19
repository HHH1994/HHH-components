<!-- 三级联动机构导航 -->
<template>
  <div class="wrap">
    <div class="org-tree_wrap">
      <!-- 一级机构 -->
      <div class="org-tree_level1_wrap">
        <img
          v-if="selectedOrgIdx[0]"
          class="arrow-lf"
          src="@/assets/image/largeScreen/arrow.png"
          @click="() => preOrg(1)"
        >
        <ul ref="orgTreeLevel1Ref" class="org-tree_level1">
          <li
            v-for="(org, index) of orgTreeListLevel1"
            :ref="`org1Ref${index}`"
            :key="index"
            :class="{ active: selectedOrg[0] === org.orgId }"
            class="tree-item"
            @click="() => selectOrg(org, 1, index)"
          >
            {{ org.orgName }}
          </li>
        </ul>
        <img
          v-if="selectedOrgIdx[0] !== orgTreeListLevel1.length - 1"
          class="arrow"
          src="@/assets/image/largeScreen/arrow.png"
          @click="() => nextOrg(1)"
        >
      </div>
      <!-- 二级机构 -->
      <div v-if="orgTreeListLevel2.length" class="org-tree_level2_wrap">
        <ul ref="orgTreeLevel2Ref" class="org-tree_level2">
          <li
            v-for="(suborg, index) of orgTreeListLevel2"
            :ref="`org2Ref${index}`"
            :key="index"
            :class="{ active: selectedOrg[1] === suborg.orgId }"
            class="tree-item"
            @click="() => selectOrg(suborg, 2, index)"
          >
            {{ suborg.orgName }}
          </li>
        </ul>
        <img
          ref="expandArrowRef"
          class="expand-arrow"
          :class="{ expand: isExpand.sub }"
          src="@/assets/image/largeScreen/arrow-expand.png"
          @click="() => openExpandSub()"
        >
        <ul class="expand-list" :style="expandListStyle.sub">
          <li
            v-for="(suborg, index) of orgTreeListLevel2"
            :key="index"
            :title="suborg.orgName"
            :class="{ active: selectedOrg[1] === suborg.orgId }"
            class="list-item"
            @click="() => selectOrg(suborg, 2, index)"
          >
            {{ suborg.orgName }}
          </li>
        </ul>
      </div>
      <!-- 三级机构 -->
      <div v-if="orgTreeListLevel3.length" class="org-tree_level3_wrap">
        <ul ref="orgTreeLevel3Ref" class="org-tree_level3">
          <li
            v-for="(thirdorg, index) of orgTreeListLevel3"
            :ref="`org3Ref${index}`"
            :key="index"
            :class="{ active: selectedOrg[2] === thirdorg.orgId }"
            class="tree-item"
            @click="() => selectOrg(thirdorg, 3, index)"
          >
            {{ thirdorg.orgName }}
          </li>
        </ul>
        <img
          ref="expandArrow2Ref"
          class="expand-arrow"
          :class="{ expand: isExpand.third }"
          src="@/assets/image/largeScreen/arrow-expand.png"
          @click="() => openExpandThird()"
        >
        <ul class="expand-list" :style="expandListStyle.third">
          <li
            v-for="(thirdorg, index) of orgTreeListLevel3"
            :key="index"
            :title="thirdorg.orgName"
            :class="{ active: selectedOrg[2] === thirdorg.orgId }"
            class="list-item"
            @click="() => selectOrg(thirdorg, 3, index)"
          >
            {{ thirdorg.orgName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { orgList } from '../assets/js/orgs';

export default {
  name: 'OrgNav',
  data() {
    return {
      orgId: '',
      orgTreeListLevel1: [],
      orgTreeListLevel2: [],
      orgTreeListLevel3: [],
      selectedOrg: ['', '', ''],
      selectedOrgIdx: [0, '', ''],
      isExpand: {
        sub: false,
        third: false
      },
      expandListStyle: {
        sub: { height: 0 },
        third: { height: 0 }
      },
      scale: []
    };
  },
  created() {
    this.getOrgTree();
  },
  methods: {
    getOrgTree() {
      const rootOrg = JSON.parse(JSON.stringify(orgList[0]));
      const level1OrgList = rootOrg.child || [];
      level1OrgList.unshift({
        orgId: rootOrg.orgId,
        orgName: rootOrg.orgName
      });
      this.selectedOrg[0] = rootOrg.orgId;
      this.orgTreeListLevel1 = level1OrgList;
    },
    selectOrg(org, level, index) {
      this.selectedOrg.splice(level - 1, 1, org.orgId);
      for (let i = level; i < 3; i++) {
        // 子、孙机构已选清空
        this.selectedOrg.splice(i, 1, '');

        // 子机构列表更新，孙子机构清空
        if (i + 1 === level + 1) {
          this[`orgTreeListLevel${i + 1}`] = org.child || [];
        } else {
          if (this[`orgTreeListLevel${i + 1}`]) {
            this[`orgTreeListLevel${i + 1}`] = [];
          }
        }
      }

      this.openExpandSub(false);
      this.openExpandThird(false);

      this.scrollOrgList(level, index);
    },
    scrollOrgList(level, index) {
      this.selectedOrgIdx.splice(level - 1, 1, index);
      this.$refs[`org${level}Ref${index}`][0].scrollIntoView({
        inline: 'center',
        behavior: 'smooth'
      });
    },
    preOrg(level) {
      const idx = this.selectedOrgIdx[level - 1] - 1;
      const org = this[`orgTreeListLevel${level}`][idx];
      this.selectOrg(org, level, idx);
    },
    nextOrg(level) {
      const idx = this.selectedOrgIdx[level - 1] + 1;
      const org = this[`orgTreeListLevel${level}`][idx];
      this.selectOrg(org, level, idx);
    },
    openExpandSub(isExpand) {
      this.isExpand['sub'] =
        isExpand !== undefined ? isExpand : !this.isExpand['sub'];
      if (this.$refs.expandArrowRef) {
        const pos = this.$refs.expandArrowRef.getBoundingClientRect();
        this.expandListStyle['sub'] = {
          padding: this.isExpand['sub'] ? '8px 0' : '0',
          height: this.isExpand['sub'] ? '182px' : '0',
          left: `${pos.left}px`,
          top: `${pos.bottom + 8}px`
        };
      }

      if (this.isExpand.sub) {
        this.openExpandThird(false);
      }
    },
    openExpandThird(isExpand) {
      this.isExpand['third'] =
        isExpand !== undefined ? isExpand : !this.isExpand['third'];
      if (this.$refs.expandArrow2Ref) {
        const pos = this.$refs.expandArrow2Ref.getBoundingClientRect();
        this.expandListStyle['third'] = {
          padding: this.isExpand['third'] ? '8px 0' : '0',
          height: this.isExpand['third'] ? '182px' : '0',
          left: `${pos.left}px`,
          top: `${pos.bottom + 8}px`
        };
      }

      if (this.isExpand.third) {
        this.openExpandSub(false);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

ul {
  white-space: nowrap;
}

.wrap {
  position: relative;
  color: white;
  background: #000;
  width: 100%;
  height: 100%;
  z-index: 99;
  padding: 0 !important;
  overflow: hidden;

  .org-tree_wrap {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 78px;
    overflow: hidden;
    letter-spacing: 1px;
    z-index: 99;
    user-select: none;

    .arrow {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .arrow-lf {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%) rotate(180deg);
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .expand-arrow {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%) rotate(-90deg);
      width: 24px;
      height: 24px;
      cursor: pointer;
      transition: all 300ms linear;
    }

    .expand {
      transform: translateY(-50%) rotate(0);
    }

    .expand-list {
      position: fixed;
      width: 141px;
      height: 182px;
      background: #1b2b3c;
      border-radius: 4px;
      overflow: auto;
      transition: all 200ms linear;
      z-index: 11;

      .list-item {
        width: 100%;
        padding: 4px 12px;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1px;
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &:hover {
          color: #7df4f2;
        }
      }

      .active {
        background: rgba(125, 244, 242, 0.25);
      }
    }

    .org-tree_level1_wrap {
      position: relative;
      width: 100%;
      padding: 13px 45px 13px 49px;
      margin-bottom: 8px;
      border-bottom: 1px solid;
      border-image: linear-gradient(
          117deg,
          rgba(200, 200, 200, 0),
          rgba(196, 196, 196, 1),
          rgba(151, 151, 151, 0)
        )
        1 1;

      .org-tree_level1 {
        width: 100%;
        overflow-x: auto;
        padding: 5px 0 5px 7px;

        .tree-item {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          padding: 4px 10px;
          border-radius: 19px;
          border: 1px solid transparent;
          margin-right: 21px;
          cursor: pointer;
        }

        .active {
          color: #fff760;
          border: 1px solid #f7b500;
          outline: 5px solid rgba(224, 233, 0, 0.17);
          outline-offset: 0;
        }
      }
    }

    .org-tree_level2_wrap {
      position: relative;
      width: 100%;
      padding: 6px 45px 6px 86px;
      background: linear-gradient(
        90deg,
        rgba(0, 138, 190, 0) 0%,
        #004d74 49%,
        rgba(0, 86, 125, 0) 100%
      );

      .org-tree_level2 {
        width: 100%;
        overflow-x: auto;

        .tree-item {
          display: inline-block;
          font-size: 14px;
          font-weight: 400;
          color: #fff;
          padding: 2px 8px;
          border-radius: 19px;
          border: 1px solid transparent;
          margin-right: 24px;
          cursor: pointer;
        }

        .active {
          color: #7df4f2;
          border: 1px solid #7df4f2;
          font-weight: 600;
        }
      }
    }

    .org-tree_level3_wrap {
      position: relative;
      width: 100%;
      padding: 6px 45px 6px 86px;
      background: linear-gradient(
        90deg,
        rgba(0, 138, 190, 0) 0%,
        rgba(0, 77, 116, 0.2) 49%,
        rgba(0, 86, 125, 0) 100%
      );

      .org-tree_level3 {
        width: 100%;
        overflow-x: auto;

        .tree-item {
          display: inline-block;
          font-size: 14px;
          font-weight: 400;
          color: #fff;
          padding: 2px 8px;
          margin-right: 40px;
          cursor: pointer;
        }

        .active {
          color: #7df4f2;
          font-weight: 600;
        }
      }
    }
  }
  // 添加伪类元素::-webkit-scrollbar设置none隐藏整个滚动条
  .org-tree_wrap::-webkit-scrollbar,
  .org-tree_wrap ul::-webkit-scrollbar {
    display: none;
  }
}
</style>
