<!-- <template>
  <button>111</button>
  
</template>

<script>
export default {

}
</script>

<style>

</style> -->
<template>
  <el-container class="sidebar">
      <el-aside class="aside">
          <div class="head">
          <el-avatar :src="userAvatarUrl" :size="90" class="custom-avatar"></el-avatar>
          <p class="name">{{ username }},欢迎回来</p>
          </div>
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleMenuSelect">
          <el-menu-item index="ptlfirst" class="el-menu-item" :class="{'menu-item-active': activeIndex === 'ptlfirst'}">
              <el-icon><FirstAidKit /></el-icon>
              <span>首页</span>
          </el-menu-item>
          <el-menu-item index="ptldetect" class="el-menu-item" :class="{'menu-item-active': activeIndex === 'ptldetect'}">
              <el-icon><FirstAidKit /></el-icon>
              <span>开启诊断</span>
          </el-menu-item>
          <el-menu-item index="ptlmessage" class="el-menu-item" :class="{'menu-item-active': activeIndex === 'ptlmessage'}">
              <el-icon><ChatLineRound /></el-icon>
              <span>消息列表</span>
          </el-menu-item>
           <el-menu-item index="ptlhistory" class="el-menu-item" :class="{'menu-item-active': activeIndex === 'ptlhistory'}">
              <el-icon><Clock /></el-icon>
              <span>诊断历史</span>
          </el-menu-item>
         <!-- <el-menu-item index="history" class="el-menu-item">
              <el-icon><Memo /></el-icon>
              <span>病人列表</span>
          </el-menu-item>
          <el-menu-item class="el-menu-item">
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
          </el-menu-item>  -->
          </el-menu>
      </el-aside>
      <el-main class="main">
          <!-- 这里是主要内容 -->
          <div class="top">
          <el-input
              v-model="input2"
              class="search"
              placeholder="Type something"
              :prefix-icon="Search"
          >
          <template #prepend>
              <el-icon class="el-icon-search"><search /></el-icon>
          </template>
          </el-input>
          <el-icon @click="showMessage" class="messageIcon"><Bell /></el-icon>
          </div>
          <div class="view">
          <router-view :key="activeIndex" ></router-view>
          </div>
      </el-main>
  </el-container>
</template>
<script setup>
import {RouterLink} from 'vue-router';
import {ref} from 'vue';
const activeIndex = ref('ptlfirst');
import { useRouter } from "vue-router";
const router = useRouter();
const userAvatarUrl = ref('/src/assets/images/ptl.png');
const username = ref('林医生')
const input2 = ref('');
function handleMenuSelect(index)
{
    activeIndex.value = index;
    router.push(activeIndex.value);
}
// handleMenuSelect("first");
</script>
<style scoped>
.sidebar{
    /* margin: left 0px; */
    position: absolute;
    left: 0;
    top:0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
.aside{
    width:200px;
    background-color: #E8EEF4;
}
.el-menu-vertical-demo{
    margin-top: 30px;
    
}
.el-menu-item{
    font-size: 15px;
    color:#fff;
    background-color: #5D6375;
    display: flex;
    box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.1); 
    /* justify-content: center; */
}
.el-menu-item:hover{
    font-size:18px;
    color:#409EFF;
    background-color: #fff;
}

.el-menu-item span{
    margin-left: 10px;
}
.main{
    /* margin-top: 100px; */
    width: 100%;
    /* padding-left: 0;
    padding-right: 0;
    padding-top:0; */
    padding: 0;
    /* background-color: skyblue; */
}
.top{
    height: 10%;
    margin-top: 0;
    /* background-color: skyblue; */
    align-items: center;
    display: flex;
    flex-direction: row;
}
.view{
    /* margin-top: ; */
    height: 90%;
    background-color:#EEF0F2;
    padding: 20px;
}
.custom-avatar {
    margin-top: 30px;
    border: 2px solid #4a84be;
    border-radius: 100%;
}
.name{
    font-size: 20px;
}
.head{
    display: flex;
    flex-direction: column;
    justify-content: centers;
    align-items: center;
}
.menu-item-active {
    background-color: #409EFF !important; /* 设置选中项的背景色 */
    color: #fff !important; /* 设置选中项的文字颜色 */
    font-size:18px;
}
.messageIcon{
  /* cursor: pointer;
  color:skyblue; */
  margin-left: 25%;
  margin-top: 0.3%;
  font-size: 25px;
}
.search{
    margin-left: 7%;
    width: 50%;
    height: 40px;
}
.el-icon-search{
    font-size: 25px;
    color: #409EFF ;
}
</style>