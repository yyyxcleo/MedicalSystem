<template>
    <div class="chat-container">
      <!-- <div class="lianxiren">
        <img class="/"/>
        <span class="s1"></span>
      </div> -->
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['chat-message', message.sender === 'user' ? 'user-message' : 'bot-message']"
        >
          <div v-if="message.sender === 'bot'" class="message-content">
            <img
              class="avatar"
              src='/src/assets/images/doctor.png'
              alt="Bot Avatar"
            />
            <span>{{ message.text }}</span>
          </div>
          <div v-if="message.sender === 'user'" class="message-content">
            <span class="sp">{{ message.text }}</span>
            <img
              class="avatar"
              src='/src/assets/images/zhuzhi.png'
              alt="Bot Avatar"
            />  
          </div>
          <!-- <img
            v-if="message.sender === 'user'"
            class="avatar"
            src="/src/assets/images/doctor.png" 
            alt="User Avatar"
          /> -->
        </div>
      </div>
      <div class="chat-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入信息开启对话" />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
        newMessage: "",
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() === "") return;
  
        // 添加用户消息到消息数组
        this.messages.push({ sender: "user", text: this.newMessage });
  
        // 模拟回复，你可以在这里添加实际的聊天逻辑
        setTimeout(() => {
          this.messages.push({ sender: "bot", text: "" });
        }, 1000);
  
        // 清空输入框
        this.newMessage = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .sp{
    height: 30px;
    font-size: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color:#E5E5E5;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 6px;
  }

  .sp::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px; /* 调整小尾巴的水平位置 */
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #333 transparent; /* 小尾巴的颜色 */
}
  .chat-container {
    display: flex;
    flex-direction: column;
    width: 530px;
    border: 1px solid #ccc;
    padding: 10px;
  }
  .avtr {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
  }
  
  .chat-message {
    margin-bottom: 10px;
    text-align: left;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  
  .user-message {
    flex-direction: row-reverse;
  }
  
  .message-content {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .chat-input {
    display: flex;
  }
  
  input {
    flex-grow: 1;
    padding: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 5px 10px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  </style>
  