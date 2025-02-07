 <template>
    <div class="login">
        <div class="LogInBox">
            <el-input v-model="UserAccount" 
            type="text" 
            placeholder="账号"
            size="large"
            auto-complete="off"
            icon="el-icon-s-custom">
            </el-input>
            
            <el-button>111</el-button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const UserAccount = ref('');


</script>

<style scoped>

</style> 
<template>
  <div class="whole">
    <div class="login">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">皮肤癌诊断系统</h3>
        <el-form-item prop="username">
          <el-select v-model="selectedOption" @change="navigateToPage" style="width: 100%; height: 40px; margin-bottom: 10px;">
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
            <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
          </el-select>
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="账号"
          >
            <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
            //这个不知道能不能用
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
          >
            <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <div class="box">
            <el-button
            :loading="loading"
            size="large"
            type="primary"
            class="logbtn"
            @click="route"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          </div>
          
          <div style="float: right;" >
            <router-link class="link-type" :to="'/register'">立即注册</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from "vue-router";
  const loginForm = ref({
    username: "",
    password: "",
    rememberMe: false,
    code: "",
    uuid: ""
  });
  const options = [
    {label: '主治医生', value: 1},
    {label: '病理医师', value: 2}
  ];
  const selectedOption = ref(1);
  const loginRules = {
    username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
    password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  };
  
  const codeUrl = ref("");
  const loading = ref(false);

  // 注册开关
  const register = ref(false);
  const redirect = ref(undefined);
  const router = useRouter();

  function route()
  {
    if(selectedOption.value === 1)
    {
      router.push('/doctor');
      // alert(1);
    }
    else
    {
      router.push('/ptl');
      // alert(2);
    }
  }
  
  </script>
  
  <style scoped>
  .box{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  .logbtn{
    width: 40%;
    margin-left: 30%;
    background: linear-gradient(to right, #13CFD6,#10E0CA);
    border: none; 
  }
  .whole{
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/login.jpg");   
    background-size: 100%; 
    background-repeat: no-repeat;
    background-position: center center;
    }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
    margin-left: 75%;
    
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #0DD5D7;
    font-weight: bolder;
    font-size: 25px;
  }
  
  .login-form {
    box-shadow: 5px 5px 10px #81F3DC;
    border-radius: 10px;
    border-radius: 6px;
    background: linear-gradient(to right, #ffffff,#EBF1FF);
    margin-left: 25px;
    width: 360px;
    padding: 25px 25px 5px 25px;
   
  } 
  .el-input {
      height: 40px;
      
    }
    .el-input input {
        height: 40px;
      }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 0px;
    }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 40px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
  .login-code-img {
    height: 40px;
    padding-left: 12px;
  }
  </style>
  
   <!-- <template>
    <div>
      <draggable v-model="items" @end="onDragEnd">
        <div v-for="(item, index) in items" :key="index" class="draggable-item">
          {{ item }}
        </div>
      </draggable>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      };
    },
    methods: {
      onDragEnd(event) {
        // 处理拖拽结束时的逻辑
        console.log('Drag ended:', event);
      },
    },
  };
  </script>
  
  <style>
  .draggable-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px;
    cursor: grab;
  }
  </style>
  
   -->