<!-- 分片下载 -->
<template>
  <div>
    <input
      v-model="fileUrl"
      class="url-input h-input"
      type="text"
      placeholder="请输入下载地址"
    />
    <input
      v-model="chunkSize"
      class="url-input h-input"
      type="text"
      placeholder="请输入分片大小（字节）"
    />
    <button class="h-btn" @click="download">下载</button>
    <div class="input-tip">{{ inputTip }}</div>
    <section class="file-info" v-if="fileSize">
      <p class="title">文件大小: {{ fileSize }} byte</p>
    </section>
  </div>
</template>
<script>
import axios from "axios";

function saveAs({ name, buffers, mime = "application/octet-stream" }) {
  const blob = new Blob([buffers], { type: mime });
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = name || Math.random();
  a.href = blobUrl;
  a.click();
  URL.revokeObjectURL(blob);
}

export default {
  data() {
    return {
      inputTip: "",
      chunkSize: "",
      fileUrl: "",
      fileSize: 0,
    };
  },
  methods: {
    getFileSize() {
      if (!this.fileUrl) {
        this.inputTip = "请先输入文件地址";
        return;
      }

      this.inputTip = "";
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", this.fileUrl);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const contentLength = xhr.getResponseHeader("content-length");
            const AcceptRange = xhr.getResponseHeader("accept-ranges");
            this.fileSize = contentLength;
            this.inputTip =
              !AcceptRange || AcceptRange === "none"
                ? "该文件不支持分片下载"
                : "";
          }
          resolve(!this.inputTip);
        };
        xhr.send();
      });
    },
    async asyncPool(poolLimit, array, iteratorFn) {
      const ret = []; // 存储所有的异步任务
      const executing = []; // 存储正在执行的异步任务
      for (const item of array) {
        // 调用iteratorFn函数创建异步任务
        const p = Promise.resolve().then(() => iteratorFn(item, array));
        ret.push(p); // 保存新的异步任务

        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if (poolLimit <= array.length) {
          // 当任务完成后，从正在执行的任务数组中移除已完成的任务
          const e = p.then(() => executing.splice(executing.indexOf(e), 1));
          executing.push(e); // 保存正在执行的异步任务
          if (executing.length >= poolLimit) {
            await Promise.race(executing); // 等待较快的任务执行完成
          }
        }
      }
      return Promise.all(ret);
    },
    getFileFragment(range, index, resultList) {
      return axios
        .get(this.fileUrl, {
          responseType: "arraybuffer",
          headers: {
            range: `bytes=${range}`,
          },
        })
        .then((res) => {
          resultList.push({
            index: index,
            data: res.data,
          });
        });
    },
    async download() {
      const canDownload = await this.getFileSize();
      if (!canDownload) return;

      const chunks = Math.ceil(this.fileSize / +(this.chunkSize || 1024));

      const data = new Uint8Array(this.fileSize);
      let length = 0;
      res.then((r) => {
        r.forEach((d) => {
          const buffer = new Uint8Array(d.data);
          data.set(buffer, length);
          length += buffer.length;
        });

        saveAs({ name: "a.js", buffers: data });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.url-input {
  margin-right: 10px;
}

.input-tip {
  color: red;
}

.file-info {
  margin-top: 20px;
}
</style>