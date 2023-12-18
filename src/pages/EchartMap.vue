<!-- echarts地图下钻 -->
<template>
  <div class="e-map_wrapper">
    <div class="city-list">
      地区：
      <span
        v-for="city of cityList"
        :key="city"
        @click="() => setHighlight(city)"
      >{{ city }}</span>
    </div>
    <div class="mode">
      模式：
      <span :class="{active: mode === '1'}" class="btn" @click="changeMode('1')">下钻</span>
      <span :class="{active: mode === '2'}" class="btn" @click="changeMode('2')">定位</span>
    </div>
    <div id="map" />
    <div class="area-text" :style="areaTextStyle">
      <p class="zh">{{ areaText }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      areaText: '',
      areaTextStyle: {},
      cityList: [
        '丽水市',
        '台州市',
        '嘉兴市',
        '宁波市',
        '杭州市',
        '温州市',
        '湖州市',
        '绍兴市',
        '舟山市',
        '衢州市',
        '金华市'
      ],
      centerMap: {},
      mapChart: null,
      mode: '1', // 1 下钻 2 定位
      level: 1
    };
  },
  mounted() {
    // this.loadGeoData();
    this.initMap();
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
      this.initMap();
      this.level = 1;
    },
    loadGeoData() {
      this.cityList.forEach((key) => {
        this.$http(`/static/map/${key}.json`).then((geoData) => {
          echarts.registerMap(key, geoData);
        });
      });
    },
    initMap() {
      const container = document.querySelector('#map');
      this.$http.get('/static/map/浙江省.json').then((geoData) => {
        echarts.registerMap('浙江省', geoData);
        const data = [];
        geoData.features.forEach((feature) => {
          this.centerMap[feature.properties.name] = feature.properties.centroid;
          data.push({
            name: feature.properties.name,
            value: Math.round(Math.random() * 1000),
            cityCode: feature.properties.adcode
          });
        });
        this.mapChart = echarts.init(container);
        this.drawChart({
          city: '浙江省',
          data: data
        });

        this.setHighlight('杭州市');
      });
    },
    drawChart(options) {
      const option = {
        tooltip: {
          triggerOn: 'none'
        },
        // 地图配置
        geo: {
          map: options.city,
          roam: false,
          label: {
            // 通常状态下的样式
            normal: {
              show: false
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff',
                fontWeight: 600,
                fontSize: 16
              }
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 2,
              areaColor: 'rgba(20,231,255, 0.55)',
              borderColor: 'rgba(20,231,255, 1)'
            },
            emphasis: {
              borderWidth: 2,
              areaColor: 'rgba(20,231,255, 1)',
              borderColor: 'rgba(20,231,255, 1)'
            }
          },
          regions: [],
          zoom: 1.1,
          aspectScale: 1.9
        },
        series: [
          {
            type: 'map',
            select: {
              itemStyle: {
                borderWidth: 0.5,
                areaColor: 'rgba(20,231,255, 1)',
                borderColor: 'transparent'
              }
            },
            geoIndex: 0,
            data: options.data || [],
            markPoint: {
              symbol: `image://${window.location.origin}/static/images/marker.png`,
              symbolSize: 47,
              data: []
            },
            tooltip: {
              padding: 0,
              hideDelay: 100,
              enterable: true,
              formatter: (params) => {
                const data = params.data;
                return `
                <div class="panel">
                  <p class="title">${params.name}</p>
                  <p class="item">
                   <span class="value">${data.value}/</span>
                    <span class="value">${data.value}</span>
                  </p>
                </div>
                `;
              }
            }
          }
        ]
      };
      this.mapChart.setOption(option);
      this.mapChart.on('click', (params) => {
        if (this.mode === '2' ||  this.level >= 2) {
          this.setHighlight(params.name);
        } else {
          this.level++;
          this.$http(`/static/map/${params.name}.json`).then((geoData) => {
            echarts.registerMap(params.name, geoData);
            const data = [];
            let firstCityName = '';
            geoData.features.forEach((feature, index) => {
              if (index === 0) {
                firstCityName = feature.properties.name;
              }
              this.centerMap[feature.properties.name] = feature.properties.centroid;
              data.push({
                name: feature.properties.name,
                value: Math.round(Math.random() * 1000),
                cityCode: feature.properties.adcode
              });
            });
            this.drawChart({
              city: params.name,
              data: data
            });
            this.setHighlight(firstCityName);
          });
        }
      });
    },
    setHighlight(name) {
      const centerPoint = this.centerMap[name];
      const options = this.mapChart.getOption();
      this.setMarker(centerPoint, name, options);
      this.setLabelColor(options, name);
      this.mapChart.setOption(options);

      this.mapChart.dispatchAction({
        type: 'highlight',
        geoIndex: 0,
        name: name
      });

      this.mapChart.dispatchAction({
        type: 'hideTip'
      });

      this.mapChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        name: name,
        position: 'top'
      });
    },
    setLabelColor(options, name) {
      options.geo[0].regions = [
        {
          name: name,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        }
      ];
      return options;
    },
    setMarker(centerPoint, name, options) {
      const pos = this.mapChart.convertToPixel('geo', centerPoint);
      this.areaText = name;
      this.areaTextStyle = {
        left: `${pos[0]}px`,
        top: `${pos[1]}px`
      };

      options.series[0].markPoint.data = [
        {
          coord: centerPoint
        }
      ];
      return options;
    }
  }
};
</script>
<style lang="scss" scoped>
.e-map_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #000;
  color: #fff;
  border-radius: 6px;
  box-sizing: border-box;

  #map {
    width: 100%;
    height: 100%;
  }

  .area-text {
      position: absolute;
      transform: translate(40%, 47px);
      z-index: 999;

      .zh {
        font-size: 20px;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 28px;
        letter-spacing: 2px;
      }
    }
}

.city-list {
  span {
    margin-right: 8px;

    &:hover {
      text-decoration: underline;
      color: blue;
      cursor: pointer;
    }
  }
}

.mode {
  margin-top: 20px;
  .btn {
    display: inline-block;
    height: 26px;
    line-height: 18px;
    padding: 4px 16px;
    background: #fff;
    color: #333;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .active {
    background: #0081df;
    color: #fff;
  }
}

/deep/ .panel {
  min-width: 158px;
  padding: 14px 18px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  p {
    margin: 0;
    padding: 0;
  }

  .title {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 10px;
  }

  .item {
    text-align: left;
    color: #fff;

    .label {
      font-weight: 400;
      font-size: 12px;
    }

    .value {
      font-weight: 400;
      font-size: 12px;
    }
  }
}
</style>
