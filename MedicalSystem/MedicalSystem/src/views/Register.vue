<template>
  <div class="register">
    <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">皮肤癌诊断系统</h3>
      <el-form-item prop="username">
        <el-input 
          v-model="registerForm.username" 
          type="text" 
          size="large" 
          auto-complete="off" 
          placeholder="账号"
        >
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          size="large" 
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="isNone"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large" 
          auto-complete="off"
          placeholder="确认密码"
          @keyup.enter="handleRegister"
          :disabled="isDisabled"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large" 
          type="primary"
          style="width:100%;"
          @click="check"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="float: right;">
          <router-link class="link-type" :to="'/'">使用已有账户登录</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import {computed, ref} from 'vue'
import { useRouter } from "vue-router";
import {register} from '../api/register/register.js' 
import axios from 'axios'
// import { getCodeImg, register } from "@/api/login";

// const router = useRouter();
// const { proxy } = getCurrentInstance();

const registerForm = ref({

  username: "",
  password: "",
  identity: 1,

});

const router = useRouter();
const isDisabled = computed(() => {
      return !registerForm.value.password; 
    });

function isNone(){
  if(registerForm.value.password === ''){
    alert("密码不能为空")
  }
}

function check(){
  if(registerForm.value.password !== registerForm.value.confirmPassword){
    alert("两次输入的密码不一致")
    registerForm.value.confirmPassword = ''
  }else if(registerForm.value.username === ''){
    alert("请输入账号")
  }else{
    axios({
        url: '/api/start/register',
        method: 'post',
    }).then(response => {
        if(response.data.flag)
        {
            router.push('/')
            alert('注册成功')
        }
    }).catch(error => {
        console.log(error.message);
    })
    // register(registerForm.value) // 传递registerForm的数据给后端
    //     .then(response => {
    //       // 处理后端响应
    //       if (response.status === 200) {
    //         // 注册成功，你可以在这里处理成功的逻辑
    //       } else {
    //         // 注册失败，你可以在这里处理失败的逻辑
    //       }
    //     })
    //     .catch(error => {
    //       // 处理请求错误
    //       console.error('请求错误:', error);
    //     });
  }
}

// const equalToPassword = (rule, value, callback) => {
//   if (registerForm.value.password !== value) {
//     callback(new Error("两次输入的密码不一致"));
//   } else {
//     callback();
//   }
// };

// const registerRules = {
//   username: [
//     { required: true, trigger: "blur", message: "请输入您的账号" },
//     { min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur" }
//   ],
//   password: [
//     { required: true, trigger: "blur", message: "请输入您的密码" },
//     { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }
//   ],
//   confirmPassword: [
//     { required: true, trigger: "blur", message: "请再次输入您的密码" },
//     { required: true, validator: equalToPassword, trigger: "blur" }
//   ],
// };

const loading = ref(false);

function handleRegister() {
  proxy.$refs.registerRef.validate(valid => {
    if (valid) {
      loading.value = true;
      register(registerForm.value).then(res => {
        const username = registerForm.value.username;
        ElMessageBox.alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", "系统提示", {
          dangerouslyUseHTMLString: true,
          type: "success",
        }).then(() => {
          router.push("/login");
        }).catch(() => {});
      }).catch(() => {
        loading.value = false;
      });
    }
  });
}

</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
}
  .el-input {
    height: 40px;
  }
    input {
      height: 40px;
    }
  
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }

.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.el-register-footer {
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
.register-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
