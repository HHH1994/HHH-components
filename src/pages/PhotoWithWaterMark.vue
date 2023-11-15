<!-- 拍照添加水印后上传 -->
<template>
  <div class="photo-watermark_wrap">
    <!-- 上传区域 -->
    <div class="photo-upload_area" @click="choosePic">
      <span class="btn-text">上传图片</span>
      <input
        ref="fileInput"
        type="file"
        class="file-input"
        accept="image/jpg, image/png, image/jpeg"
        @change="fileChange"
      />
    </div>
    <!-- 图片预览区 -->
    <div class="preview_area">
      <p class="title">图片预览</p>
      <img class="preview-pic" :src="previewUrl" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "PhotoWithWaterMark",
  data() {
    return {
      file: "",
      previewUrl: "",
    };
  },
  methods: {
    choosePic() {
      this.$refs.fileInput.click();
    },
    fileChange(e) {
      const files = e.target.files;
      this.fileToBase64(files[0]);
      this.$refs.fileInput.value = "";
    },
    fileToBase64(file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const baseData = fileReader.result;
        this.addWaterMark(baseData).then((base64) => {
          const waterMarkerFile = this.base64ToFile(base64);
          this.uploadFile(waterMarkerFile);
        });
      };

      fileReader.readAsDataURL(file);
    },
    addWaterMark(baseData) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const waterImg = new Image();
      const MAX_WH = 800; //图片的最大宽高比，因为在以上方法中获取的照片size太大，上传时耗时太多所以需要做处理
      waterImg.crossOrigin = "Anonymous";
      return new Promise((rs) => {
        waterImg.onload =  () => {
          //这里是一个异步，所以获取到的base64文件需要用回调
          if (waterImg.height > MAX_WH) {
            waterImg.width *= MAX_WH / waterImg.height;
            waterImg.height = MAX_WH;
          }
          if (waterImg.width > MAX_WH) {
            waterImg.height *= MAX_WH / waterImg.width;
            waterImg.width = MAX_WH;
          }
          canvas.height = waterImg.height;
          canvas.width = waterImg.width;
          ctx.drawImage(waterImg, 0, 0, waterImg.width, waterImg.height);
          ctx.font = `30px Arial`;
          ctx.fillStyle = "tomato";
          let time = this.getCurTime(); //获取当前的时间
          ctx.textAlign = "end";
          let str = `${time}`;
          let lineheight = 30;
          let lines = str.split("\n");

          for (let j = 0; j < lines.length; j++) {
            ctx.fillText(
              lines[j],
              waterImg.width - 20,
              waterImg.height - (j + 1) * lineheight
            );
          }
          ctx.textBaseline = "middle";
          let dataURL = canvas.toDataURL("image/png/jpg");
          this.previewUrl = dataURL;
          rs(dataURL);
        };

        waterImg.src = baseData;
      });
    },
    base64ToFile(base64) {
      const arr = base64.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]); // 解码base-64编码的数据
      let n = bstr.length;
      const u8arr = new Uint8Array(n); // 无符号整型数组
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      //转换成file对象
      const filename = new Date().getTime();
      const newFile = new File([u8arr], filename, { type: mime });
      return newFile;
    },
    uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', new Date().getTime());
        this.$http.post('http://10.1.7.43:8866', formData)
        .then(res => {
            console.log(res);
        })
    },
    getCurTime() {
        const DateObj = new Date();
        const year = DateObj.getFullYear();
        const month = DateObj.getMonth() + 1;
        const date = DateObj.getDate();
        const hour = DateObj.getHours();
        const minute = DateObj.getMinutes();
        const second = DateObj.getSeconds();

        const padZero = function(num) {
            return num < 10 ? `0${num}` : num;
        }

        return `${year}-${padZero(month)}-${padZero(date)} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
    }
  },
};
</script>
<style lang="scss" scoped>
.photo-upload_area {
  position: relative;
  display: inline-block;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  .btn-text {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    z-index: 2;
  }

  .file-input {
    position: relative;
    width: 80px;
    height: 30px;
    opacity: 0;
  }
}

.preview_area {
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin: 20px 0;
  }

  .preview-pic {
  }
}
</style>