<!-- Websocket demo -->
<template>
  <div class="wrapper">
    <p style="margin-bottom: 20px">Websocket示例</p>
    <section class="service">
        <HInput v-model="socketConf.path" placeholder="请输入websocket的服务连接地址" style="width: 500px;margin-right:10px;"></HInput>
        <span class="h-btn" @click="connectHandle">连接</span>
        <span class="h-btn" @click="disconnect">断开</span>
    </section>
    <div style="margin-bottom: 10px;">
      <p v-if="socket.instance && retryTime && retryTime < maxReconnectTime + 1">正在重新连接中，第{{retryTime}}次尝试</p>
      <p v-if="socket.instance && retryTime && retryTime >= maxReconnectTime + 1">重新连接失败，请手动连接</p>
    </div>
    <section class="content">
      <div class="content-lf">
        <div class="form-item">
            <label>header</label>
            <HInput v-model="socketConf.header" placeholder="请输入websocket的头部信息"></HInput>
        </div>
        <div class="form-item">
            <label>message</label>
            <HInput v-model="socketConf.message" placeholder="请输入websocket的信息"></HInput>
            <span class="h-btn" @click="send" style="margin-left: 10px;vertical-align:middle;">发送</span>
            <input type="checkbox" v-model="isClear"  style="vertical-align:middle;margin-right: 5px;"/><span>发送后是否清空</span>
        </div>
        <div class="form-item">
            <label>最大重连次数</label>
            <HInput v-model="socketConf.maxTime" placeholder="请输入最大重连次数" @change="retryTime=0;"></HInput>
        </div>
      </div>
      <div class="content-rg">
        <p v-for="(log, idx) of logs" :key="idx" class="log">
            {{idx + 1}}:{{log}}
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import HInput from "../components/input/Input.vue";
const getTimestamped = function() {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
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
            maxTime: ''
        },
        logs: [],
        socket: {
          isConnected: false,
          instance: null
        },
        retryTime: 0,
        isClear: false
    };
  },
  computed: {
    maxReconnectTime() {
      return (+this.socketConf.maxTime || 5);
    }
  },
  methods: {
    connectHandle() {
      this.retryTime = 0;
      this.connect();
    },
    connect() {
      // 防止创建重复的socket会话
      if (this.socket.isConnected || (this.socket.instance && this.socket.instance.readyState < 2)) {
        return;
      }

      this.logs = [];

      if (!this.socketConf.path) {
        alert('请先填写服务连接');
        return;
      }
      
      try {
        const socket = this.socket.instance = new WebSocket(this.socketConf.path, [this.socketConf.header || undefined]);

        console.log('this.socket.instance', this.socket.instance);

        socket.onopen = () => {
          this.logs.push(`服务连接成功  ${getTimestamped()}`, );
          this.socket.isConnected = true;
          this.retryTime = 0;
        }

        socket.onerror = (err) => {
          console.log(err);
          this.logs.push(`发生异常  ${getTimestamped()}`, );
          
        }

        socket.onmessage = (msg) => {
          const data = msg.data;
          this.logs.push(`接收: ${data}  ${getTimestamped()}`, );
        }

        socket.onclose = () => {
          this.socket.isConnected = false;

          this.logs.push(`服务已断开连接  ${getTimestamped()}`, );
          if (this.socket.instance && this.retryTime < this.maxReconnectTime) {
            this.reconnect();
          } else {
            this.retryTime++;
          }
        }
      } catch(err) {
        console.log('err occur')
      }  

    },
    reconnect() {
      this.retryTime++;
      this.connect();
    },
    disconnect() {
      if (this.socket.isConnected) {
        this.socket.instance.close();
        this.socket.instance = null;
      }
    },
    send() {
      if (!this.socket.isConnected) {
        alert('请先连接服务');
        return;
      }

      this.logs.push(`发送: ${this.socketConf.message}  ${getTimestamped()}`, );

      if (this.isClear) {
        this.socketConf.message = '';
      }

      this.socket.instance.send(this.socketConf.message);
    }
  },
};
</script>
<style lang="scss" scoped>
    .wrapper {
      height: 100%;
    }

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
        justify-content: space-between;
        height: calc(100% - 110px);

        &-lf {
            flex-basis: 50%;
        }

        &-rg {
            flex-basis: 42%;
            height: 100%;
            overflow-y: auto;

            .log {
              margin-bottom: 10px;
            }
        }
    }

    .form-item {
        margin-bottom: 10px;
        label {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 10px;
            vertical-align: middle;
        }
    }
</style>