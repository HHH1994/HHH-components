<!-- Websocket demo -->
<template>
  <div>
    <p style="margin-bottom: 20px">Websocket示例</p>
    <section class="service">
        <HInput v-model="socketConf.path" placeholder="请输入websocket的服务连接地址" style="width: 500px;"></HInput>
        <div class="h-button" @click="connect">连接</div>
    </section>
    <section class="content">
      <div class="content-lf">
        <div class="form-item">
            <label>header</label>
            <HInput v-model="socketConf.header" placeholder="请输入websocket的头部信息"></HInput>
        </div>
        <div class="form-item">
            <label>message</label>
            <HInput v-model="socketConf.message" placeholder="请输入websocket的信息"></HInput>
            <div class="h-button" @click="send">发送</div>
        </div>
        <div class="form-item">
            <label>心跳间隔</label>
            <HInput v-model="socketConf.interval" placeholder="请输入心跳间隔"></HInput>
        </div>
      </div>
      <div class="content-log">
        <p v-for="(log, idx) of logs" :key="idx" class="log">
            {{idx}}:{{log}}
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import HInput from "../components/input/Input.vue";
export default {
  components: {
    HInput,
  },
  data() {
    return {
        socketConf: {
            path: '',
            header: '',
            message: '',
            interval: ''
        },
        logs: [1,2,3]
    };
  },
  methods: {
    connect() {},
    send() {}
  },
};
</script>
<style lang="scss" scoped>
    .service {
        margin-bottom: 20px;
    }
    .h-button {
        display: inline-block;
        min-width: 80px;
        height: 40px;
        line-height: 32px;
        padding: 4px 10px;        
        margin-left: 10px;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        vertical-align: middle;
        border: 1px solid #c1c1c1;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }

    .content {
        display: flex;

        &-lf {
            flex: 1;
        }

        &-rg {
            flex: 2;
        }
    }

    .form-item {
        margin-bottom: 10px;
        label {
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 10px;
            vertical-align: middle;
        }
    }
</style>