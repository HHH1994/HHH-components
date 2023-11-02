<template>
  <div>
    <section class="text">
      <p class="title">解析文本</p>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        @paste="pasteHandlerText"
      ></textarea>
      <ul v-if="textValues.length" class="parse-list">
        <p>解析得到如下:</p>
        <li v-for="(textValue, index) of textValues" :key="index">
          {{ index + 1 }}: {{ textValue }}
        </li>
      </ul>
    </section>
    <section class="file">
      <p class="title">解析文件</p>
      <div class="file-wrap" @paste="parseHandlerFile">将文件在此处复制</div>
      <ul v-if="files.length" class="parse-list">
        <p>解析得到如下:</p>
        <li v-for="(file, index) of files" :key="index">
          <span class="file-item" @click="() => downloadFile(file)">{{file.name}}</span>
        </li>
      </ul>
    </section>
    <section class="forbidden">
      <p class="title">禁止粘贴</p>
      <textarea name="" id="" cols="30" rows="10" @paste.prevent></textarea>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textValues: [],
      files: []
    };
  },
  methods: {
    pasteHandlerText(e) {
      const clipboardData = e.clipboardData || window.clipboardData;
      const parseData = clipboardData.getData("Text") || "";
      this.textValues = parseData
        .split("\n")
        .map((word) => word.replace("\r", ""))
        .filter((word) => word);
    },
    parseHandlerFile(e) {
        const clipboardData = e.clipboardData || window.clipboardData;
        const files = clipboardData.files;
        this.files = files;
        console.log(clipboardData.files, clipboardData.files[0], '132')
    },
    downloadFile(file) {
        const url = URL.createObjectURL(file)
        const a = document.createElement('a');
        a.download = file.name;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  font-weight: bold;
}

.parse-list {
  margin-top: 20px;
  list-style: none;

  li {
    margin-bottom: 10px;
  }
}

.forbidden,
.file {
    margin-top: 50px;
}

.file {
    .file-wrap {
        display: inline-block;
        width: 150px;
        height: 150px;
        padding: 10px;
        line-height: 150px;
        border: 1px solid #c1c1c1;
        border-radius: 4px;
    }

    .file-item {
        cursor: pointer;
    }
}
</style>