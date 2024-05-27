<template>
  <!-- 关键字 -->
  <div class="label-pack">
    <div v-show="componentConf.needShowPackName" class="label-name">
      <div v-if="componentConf.tip" class="pack-tip">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>{{ componentConf.tip }}</span>
          </template>
          <i class="iconfont iconCheck-Circle1" />
        </a-tooltip>
      </div>
      {{ componentData.packName }}
    </div>
    <div class="label-boxs">
      <template v-if="componentConf.rangeConf.hasRange">
        <a-select
          v-model="selectedData.range"
          class="keyword-range-select"
          allow-clear
          placeholder="不限范围"
          @change="changeRange"
        >
          <a-select-option
            v-for="rangLabel in componentConf.rangeConf.labelList"
            :key="rangLabel.value"
            :value="rangLabel.value"
            :disabled="rangLabel.disabled"
          >
            {{ rangLabel.label }}
          </a-select-option>
        </a-select>
      </template>
      <div class="keyword-split-line"></div>
      <a-auto-complete
        v-model="selectedData.keyword"
        class="keyword-input"
        allow-clear
        placeholder="请搜索关键字,回车查询"
        option-label-prop="value"
        @search="loadBlurOptions"
        @keypress.enter.stop.native="emitData"
        @change="changeKeyword"
      >
        <template v-if="componentConf.blurSearchConf.hasBlurSearch" slot="dataSource">
          <a-select-option
            v-for="(data,idx) in dataSource"
            :key="data + idx"
            :value="data"
            :title="data"
          >
            {{data}}
          </a-select-option>
        </template>
        <div
          v-if="componentConf.blurSearchConf.hasBlurSearch && isselectedData.keyword"
          slot="notFoundContent"
          class="not-found-content"
        >
          <a-icon
            v-if="isLoadingKeyword"
            slot="indicator"
            type="loading"
            style="font-size: 16px; color: #2894ff"
            size="small"
            spin
          />
          <div v-else class="empty-content">
            <img src="../../../assets/images/labelQuery/search-empty.png" />
            暂无匹配数据
          </div>
        </div>
      </a-auto-complete>
      <a-button class="keyword-query-btn" type="primary" @click="emitData">搜索</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Keyword",
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
    },
  },
  data() {
    return {
      selectedData: {
        range: undefined,
        keyword: "",
      },
      dataSource: [],
      isLoadingKeyword: false
    };
  },
  computed: {
    componentConf() {
      return this.componentData.componentConf || {};
    },
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
      deep: true
    },
  },
  methods: {
    renderInvertLabels() {
        const templateData = this.invertLabels.find(invertLabel => invertLabel.idList[0] === this.componentData.packId);
        if (templateData) {
          templateData.labelId.forEach(labelId => {
            const params = labelId.params || {};
            const rangeConf  = this.componentConf.rangeConf;
            const blurSearchConf  = this.componentConf.blurSearchConf;
            if (rangeConf.hasRange) {
                const rangeKey = rangeConf.templateParams[0];
                this.selectedData.range = params[rangeKey];
            }

            const keywordKey = blurSearchConf.templateParams[0];
            this.selectedData.keyword = params[keywordKey];
          })
        }
    },
    clearSelected() {
      this.selectedData.range = undefined;
      this.selectedData.keyword = "";
      this.emitData();
    },
    setRequestData() {
      const rangeKey = this.componentConf.rangeConf.templateParams[0];
      const blurSearchKey = this.componentConf.blurSearchConf.templateParams[0];
      const condition = this.componentConf.id;
      const requestData = {
        idList: [this.componentData.packId],
      };

      const getTageName = () => {
          const packName = this.componentData.packName;
          const keyword = this.selectedData.keyword;
          const range = this.selectedData.range;
          let rangeOption = this.componentConf.rangeConf.labelList.find(
            (item) => item.value === range
          );
          let tagName = packName + '：';
          if (this.componentConf.rangeConf.hasRange) {
              tagName += rangeOption ? rangeOption.label || '' : '';
          }

          tagName += keyword;

          return tagName;
      }

      // keyword为空则等于没有值
      if (!this.selectedData.keyword || !this.selectedData.keyword.trim()) {
        requestData.labelId = [];
        requestData.tagName = "";
      } else {
        const params = {};
        params[blurSearchKey] = this.selectedData.keyword;
        if (this.componentConf.rangeConf.hasRange) {
          params[rangeKey] = this.selectedData.range || '';
        }
        requestData.tagName = getTageName();
        requestData.labelId = [
          {
            id: condition,
            params: params,
          },
        ];
      }
      return requestData;
    },
    changeRange() {
      if (this.selectedData.keyword && this.selectedData.keyword.trim()) {
        this.emitData();
      }
    },
    changeKeyword() {
      if (!this.selectedData.keyword) {
        this.emitData();
      }
    },
    loadBlurOptions() {
      if (this.componentConf.blurSearchConf.hasBlurSearch) {
        if (this.loadBlurOptions.timer) {
            clearTimeout(this.loadBlurOptions.timer);
        }

        this.dataSource = [];
        this.isLoadingKeyword = true;
        this.loadBlurOptions.timer = setTimeout(() => {
            console.log(123);
            // 防抖频率内，仍然发生并发请求，只使用最后一次请求获取的数据
            const curTimer = this.loadBlurOptions.timer;
            console.log(curTimer, this.loadBlurOptions.timer);
            if (this.loadBlurOptions.timer === curTimer) {
                this.isLoadingKeyword = false;
                this.dataSource = ["啊阿斯顿", "啊阿斯顿打", "啊阿斯顿稍等", "偶爱叫发"];
            }
        }, 3000);
      }
    },
    emitData() {
      this.$emit("change", [this.setRequestData()]);
    },
  },
};
</script>
<style lang="scss" scoped>
.label-pack {
  display: flex;
}
.label-boxs {
  display: flex;
  align-items: center;
  border: 1px solid #0080ff;
  border-radius: 4px;

  .keyword-range-select {
    min-width: 100px;
    max-width: 150px;
    font-size: 13px;

    /deep/ .ant-select-selection__rendered {
      line-height: 32px;
    }
  }

  .keyword-split-line {
    width: 1px;
    height: 20px;
    background: #d9d9d9;
  }

  .keyword-input {
    width: 230px;
    height: 32px;
    font-size: 13px;
  }

  .keyword-query-btn {
    border-top: 1px solid #0080ff;
    border-bottom: 1px solid #0080ff;
    border-radius: 0 2px 2px 0;
  }

  /deep/ .ant-select > div {
    border: 0;
    box-shadow: none;

    .ant-input {
      border: 0;
    }
  }
}

.not-found-content {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    color: rgba(0, 0, 0, 0.45);
    font-size: 13px;
    img {
      width: 50px;
      height: 50px;
    }
  }
}

</style>