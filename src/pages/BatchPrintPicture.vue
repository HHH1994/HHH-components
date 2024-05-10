<template>
  <!-- 批量打印图片 -->
  <div class="batch-print-pic_wrapper">
    <!-- TODO -->
    <button @click="batchPrintBlob">打印</button>
    <canvas id="canvas" width="400" height="400" />
    <img :src="img1" alt="">
    <img :src="img2" alt="">
  </div>
</template>
<script>
import { decode, encode } from 'fast-png';
export default {
  name: 'BatchPrintPic',
  data() {
    return {
      picSources: [
        '/api/images/jpg2png/icon.png'
        // 'https://preview.qiantucdn.com/auto_machine/20240430/a17ee3dc-9d34-418c-9c61-2cfbdf937cc3.png!qt_w320'
      ],
      img1: '',
      img2: ''
    };
  },
  methods: {
    batchPrint() {
      // 方案1 通过将图片放到一个html上，配合page-break-after进行分页打印
      const printDom = `
            <style>
                img {
                    display:block;
                    page-break-after: always;
                }
            </style>
            <img src="${this.picSources[0]}">
            <img src="${this.picSources[1]}">
        `;
      const printWindow  = window.open();
      printWindow.document.body.innerHTML = printDom;
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    },
    batchPrintBlob() {
      const datas = [];
      this.picSources.forEach(picSource => {
        this.$http.get(picSource, {
          responseType: 'arraybuffer'
        }).then(res => {
          datas.push(res);
          if (datas.length === this.picSources.length) {
            this.generateBolb(datas);
          }
        });
      });
    },
    generateBolb(datas) {
      datas.forEach(data => {
        const pngData = decode(data);
        // pngData.width = pngData.width *  2;
        // pngData.height = pngData.height *  2;
        // console.log(pngData);
        // const blob1 = new Blob([encode(pngData)], { type: 'image/png' });
        // const blob2 = new  Blob([data], { type: 'image/png' });
        // this.img1 = URL.createObjectURL(blob1);
        // this.img2 = URL.createObjectURL(blob2);
        // URL.revokeObjectURL(this.img1);
        // URL.revokeObjectURL(this.img2);
      });
    },
    batchPrintCanvas() {
      // 缺陷： 图片超出一张纸，可能会截断，需要计算打印高度，比较麻烦
      const c = document.querySelector('#canvas');
      const ctx = c.getContext('2d');                   // canvas 2d context
      const img1 = new Image();                           // create two image
      const img2 = new Image();                           // elements
      let count = 2;                                  // Track for loader

      // load images
      img1.onload = img2.onload = function() {        // make sure images are
        if (!--count) append();                       // loaded first
      };
      img1.crossOrigin = img2.crossOrigin = '';       // need this for this demo
      img1.src = this.picSources[0];   // random images...
      img2.src = this.picSources[1];

      // process images
      function append() {
        // use width to sum the images
        c.width = Math.max(img1.width, img2.width);            // set total height
        c.height = img1.height + img2.height; // set max height

        ctx.drawImage(img1, 0, 0);                    // draw in image 1
        ctx.drawImage(img2, 0, img1.height);          // draw in image 2

        if (count === 0) {
          // 方案1 通过将图片放到一个html上，配合page-break-after进行分页打印
          const printDom = `
                    <style>
                        img {
                            display:block;
                            page-break-after: always;
                        }
                    </style>
                    <img src="${c.toDataURL()}">
                `;
          const printWindow  = window.open();
          printWindow.document.body.innerHTML = printDom;
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 1000);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
