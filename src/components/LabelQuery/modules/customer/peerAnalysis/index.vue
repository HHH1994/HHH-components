<!-- 同业分析 -->
<template>
  <div class="peer-analysis_wrapper">
    <div class="label-name">
      <div v-if="componentData.tip" class="pack-tip">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>{{ componentData.tip }}</span>
          </template>
          <a-icon type="info-circle" />
        </a-tooltip>
      </div>
      {{ componentData.packName }}
    </div>
    <!-- 第二层 -->
    <div class="label-sub-panel">
      <!-- 报告日期 -->
      <component
        :is="subComponent.componentType"
        v-for="(subComponent, idx) of componentData.children"
        :ref="subComponent.packId"
        :key="idx"
        :component-data="subComponent"
        :invert-labels="invertLabelList"
        :class="{'chief-row': subComponent.componentConf.isChief}"
        @change="changeLabel"
      />
    </div>
  </div>
</template>
<script>
import dependencyModules from './index';

export default {
  name: 'PeerAnalysis',
  components: dependencyModules,
  props: {
    componentData: {
      type: Object,
      default() {
        return {};
      },
    },
    invertLabels: {
      type: Array,
      default() {
        return [];
      },
    }
  },
  data() {
    return {
      invertLabelList: [],
      selectedLabel: {}
    };
  },
  watch: {
    invertLabels: {
      handler(val) {
        if (val && val.length) {
          this.renderInvertLabels();
        } else {
          this.clearSelected();
        }
      },
      deep: true,
    },
  },
  created() {
    this.initData();
    this.renderInvertLabels();
  },
  methods: {
    initData() {
      const componentData = this.componentData;
      this.selectedLabel = {
          componentType: 'peerAnalysis',
          tagName: '',
          labelId: [],
          idList: [componentData.packId],
          children: []
      };
    },
    renderInvertLabels() {
      const invertLabel = this.invertLabels.find(label => label.idList[0] === this.componentData.packId);
      if (invertLabel) {
        this.invertLabelList = JSON.parse(JSON.stringify(invertLabel)).children || [];
        this.selectedLabel = JSON.parse(JSON.stringify(invertLabel));
        this.$emit("change", [this.selectedLabel]);
      }
    },
    emitData() {
      this.$emit('change', [this.selectedLabel]);
    },
    clearSelected() {
      this.selectedLabel.tagName = '';
      this.selectedLabel.labelId = [];
      if (this.selectedLabel.children.length) {
        this.clearSingleSelected([this.selectedLabel.children[0]]);
      }
    },
    // 报告日期取消引发的清空
    cancelBGRQ() {
      this.selectedLabel.tagName = '';
      this.selectedLabel.labelId = [];
      this.clearOtherComponent();
      this.emitData();
    },
    clearOtherComponent() {
      const childrenCopy = JSON.parse(JSON.stringify(this.selectedLabel.children));
      childrenCopy.shift();
      this.selectedLabel.children = [];
      childrenCopy.forEach((item) => {
        let sublabelDom = this.$refs[item.idList[0]][0];
        sublabelDom && sublabelDom.clearSelected();
      });
    },
    clearSingleSelected(invertLabelList) {
      invertLabelList.forEach(invertLabel => {
        const packId = invertLabel.idList[0];
        let sublabelDom = this.$refs[packId][0];
        sublabelDom && sublabelDom.clearSelected();
      })
    },
    removeSelectedLabel(packId) {
      const peerAnalysisIns = this.selectedLabel;
      const selectedLabelIdx = peerAnalysisIns.children.findIndex(selectedLabel => selectedLabel.idList[selectedLabel.idList.length - 1] === packId);
      if (selectedLabelIdx > -1) {
        peerAnalysisIns.children.splice(selectedLabelIdx, 1);
      }
    },
    getReportYear() {
      const peerAnalysisIns = this.selectedLabel;
      const reportDateLabel = this.componentData.children[0];
      return peerAnalysisIns.children.find(label => reportDateLabel.packId === label.idList[0]);

    },
    openDom() {
      if (!this.componentData.componentConf.openFlag) {
        this.$parent.openDom(this.componentData);
      }
    },
    changeLabel(invertLabelList) {
      // 报告日期取消选择，所有选项清空
      if (invertLabelList[0].idList[0] === this.componentData.children[0].packId && invertLabelList[0].labelId.length === 0) {
        this.cancelBGRQ();
        return;
      }

      // 选择后，自动打开面板
      if (invertLabelList[0].labelId.length) {
        this.openDom();
      }

      const reportYear = this.getReportYear();
      if (!reportYear && invertLabelList[0].idList[0] !== this.componentData.children[0].packId) {
        this.clearSingleSelected(invertLabelList);
        this.$message.warning('请先选择报告日期');
        return;
      }

      const peerAnalysisIns = this.selectedLabel;
      invertLabelList.forEach(invertLabel => {
        // 删除原来已存在的
        this.removeSelectedLabel(invertLabel.idList[invertLabel.idList.length - 1]);
        // 将现在的加入
        if (invertLabel.labelId.length && invertLabel.tagName) {
          peerAnalysisIns.children.push(invertLabel);
        }
      })
      peerAnalysisIns.tagName = `${this.componentData.packName}: ${peerAnalysisIns.children.map(label => label.tagName).join(',')}`
      // 将年份加入到其他的labelId中
      peerAnalysisIns.labelId =peerAnalysisIns.children.map(label => [...label.labelId]).flat();
      if (reportYear) {
        peerAnalysisIns.labelId.forEach(labelId => {
          if (!labelId.params) {
            labelId.params = {};
          }
          labelId.params.field = reportYear.labelId[0].id;
        })
      }
      this.emitData();
    }
  },
};
</script>
<style lang="scss" scoped>
.peer-analysis_wrapper {
  display: flex;
  margin-right: 16px;

  .chief-row {
    padding-bottom: 12px;
    margin-bottom: 5px;
    border-bottom: 1px solid #E4E7ED;
  }

  .label-name {
    align-items: flex-start;
  }

  .label-sub-panel {
    flex: 1;
    background: #F4F6F8;
    border-radius: 4px;
    padding: 12px;
  }

  // 
}
</style>
