<template>
  <div class="boxx">
    <div class="boxleft">
      <div class="bigbbox">
        <div v-if="selectedImage" class="picdiv">
          <span><img src="/src/assets/images/camera.png" class="img">病理图片展示</span>
          <img :src="selectedImage" class="picc"/>
          <!-- <img v-else src="/src/assets/images/goaldetect.png" class="picc"> -->
        </div>
        <div v-else>这里什么也没有~</div>
        <div class="bboxtop">
          <input type="file" ref="fileInput" @change="handleFileInputChange" style="display: none" />
          <el-button @click="openFileInput" class="bbtn">请上传病理图片</el-button>
          <el-button @click="startdetect" class="bbtn">点击诊断</el-button>
        </div>
      </div>
      <div class="lbottom">
        <div class="lefttop">
          <span><img src="/src/assets/images/ai.png" class="img">AI智能诊断结果</span>
        </div>
        <div class="bottom">
          <div :class="{ loader: true, loading: isLoading }" v-show="isLoading"></div>
          <div class="text" v-if="isdetect">
            {{ text }}
          </div>
          <img v-if="isdetect" src="/src/assets/images/detectdoctor.png" class="baishepic">
        </div>
      </div>
    </div>
    <div class="boxright">
      <div class="righttop">
        <div class="information">
            <div v-for="(item,index) in patientData" :key="index" class="per">
              <img :src="item.img" width="25" height="25">
              <span>{{item.name}}</span>
              <span>{{ item.value }}</span>
            </div>
        </div>
        <img src="/src/assets/images/skinn.jpg" alt="111" class="skinimg"/>
        <!-- <span>{{ capturedPhotoData }}</span> -->
        <div class="bbtn">
          <el-button @click="centerDialogVisible = true">填写诊断结果</el-button>
          <el-dialog
            v-model="centerDialogVisible"
            title="诊断结果"
            width="30%"
            align-center
          >
          <el-form :model="form" label-width="130px">
            <el-form-item label="患者姓名">
              <!-- <el-input v-model="form.name" /> -->
              <span>张三</span>
            </el-form-item>
            <el-form-item label="问诊结果">
              <el-select v-model="form.region" placeholder="请选择诊断结果">
                <el-option label="黑色素痣" value="nv" />
                <el-option label="基底细胞癌" value="bcc" />
                <el-option label="黑色素瘤" value="mel"/>
                <el-option label="其他" value="else"/>
              </el-select>
            </el-form-item>
            <el-form-item label="病理描述">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
          </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button :plain="true" type="primary" @click="confirm">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>  
      <div class="rightbottom">
        <div class="bottomtop">
          <span><img src="/src/assets/images/message.png" class="msg">问诊消息</span>
        </div>
        <div>
          <div v-for="(item,index) in messageContent" :key="index" class="rightbottomm">
            <img
              class="avatar"
              :src="item.avt"
            >
            <span v-if="item.unread>0" class="red-dot"></span>
            <div class="msgbox">
              <span class="s1">{{ item.name }}</span>
              <span class="s2">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
const capturedPhotoData = inject('capturedPhotoData');
import {ElMessage} from 'element-plus'
const selectedImage = ref(null);
const fileInput = ref(null); 
const isdetect = ref(false);
const text = ref("   框选区域检测到异常梭形细胞，大概率为黑色素细胞肿瘤，请您根据自身经验，综合考虑做出判断");
function startdetect(){
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        isdetect.value = !isdetect.value;
        draw();
      }, 1500);
      alert(capturedPhotoData.value)
}

const centerDialogVisible = ref(false)
const isLoading = ref(false);
const openFileInput = () => {
  // 触发文件选择对话框
  fileInput.value.click();
};
const messageContent = ref([
  {avt:"/src/assets/images/zhuzhi.png",name:"白方民医生",text:"A3173号患者需要进一步进行病理诊断",unread:1},
  {avt:"/src/assets/images/medicare.png",name:"病理采集",text:"林医生，病人的切片信息已经采集好了",unread:0}
])
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const patientData = ref([
  {img:"/src/assets/images/hospital.png",name:"预约号:  ",value:"A3173"},
  {img:"/src/assets/images/name.png",name:"姓名:  ",value:"张三"},
  {img:"/src/assets/images/age.png",name:"年龄:  ",value:"35"},
  {img:"/src/assets/images/gender.png",name:"性别:  ",value:"男"},
  {img:"/src/assets/images/historyy.png",name:"病史:  ",value:"高血压，糖尿病"},
  {img:"/src/assets/images/doctor.png",name:"主治医生:  ",value:"白方民"},
  {img:"/src/assets/images/result.png",name:"镜下诊断结果:  ",value:"黑色素瘤"},
 ])

function confirm(){
    centerDialogVisible.value = false;
    ElMessage({
    message: '提交成功！',
    type: 'success',
  })
  }
const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 读取选定的图片文件
    const reader = new FileReader();
    reader.onload = (e) => {
      // 读取成功后将图片数据赋值给selectedImage
      selectedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.red-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}
.s1{
  font-size: 15px;
}
.s2{
  font-size: 13px;
  color: #7F7F7F;
}
.rightbottomm{
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-top: 10px;
  height: 50px;
}
.msgbox{
  display: flex;
  flex-direction: column;

}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }
.msg{
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.bottomtop{
  width: 100%;
  height: 20%;
  border-bottom: 2px solid #d6dce4;
  align-items: center;
}
.bottomtop span{
  font-size: 20px;
  font-weight: bolder;
  font-family: "幼圆", Arial, Helvetica, sans-serif;
  margin-left: 30px;
}
.skinimg{
  height: 200px;
  width: 250px;
  margin-left: 30px;
}
.boxx{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.text{
  font-size: 17px;
  margin-top: 40px;
  width: 400px;
  margin-left: 40px;
}
.bottom{
  display: flex;
  flex-direction: row;
}
.lefttop{
  width: 75%;
  height: 10%;
  margin-left: 30px;
}
.lefttop span{
  margin-left: 30px;
  font-weight: bolder;
  font-size: 20px;
  font-family: "幼圆", Arial, Helvetica, sans-serif;
}
.baishepic{
  width: 100px;
  height: 200px;
  margin-top: 5px;
  /* margin-right: 20px; */
  margin-left: 140px;
}
  .loader{
    border: 4px solid #f3f3f3; /* 设置加载动画的边框样式 */
    border-top: 4px solid #3498db; /* 设置加载动画的顶部边框样式 */
    border-radius: 50%; /* 设置边框为圆形 */
    width: 40px;
    height: 40px;
    /* margin-left: 200px; */
    animation: spin 1s linear infinite; /* 使用名为"spin"的动画，持续时间为1秒，线性过渡，无限循环 */
  }
  @keyframes spin {
  0% { transform: rotate(0deg); } /* 从0度开始旋转 */
  100% { transform: rotate(360deg); } /* 旋转一周，回到初始位置 */
}
  .loader.loading {
  /* 加载动画的样式 */
    animation: spin 1s linear infinite;
  }
.boxleft{
  height: 100%;
  width: 50%;
  margin-left: 40px;
}
.lbottom{
  margin-top: 30px;
  height: 30%;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.img{
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
  }
.bbtn{
  margin-left: 22px;
  margin-top: 25px;
}
.bigbbox{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65%;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.bboxtop{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: 160px;
  margin-right: 200px;
}
.picdiv{
  width: 80%;
  height: 80%;
  margin-left: 60px;
  margin-top:10px;
}
.picdiv span{
  font-family: "幼圆", Arial, Helvetica, sans-serif;
  font-size: 20px;
}
.picc{
  margin-top: 10px;
  margin-left: 30px;
  width: 90%;
  height: 90%;
}
.rightbottom{
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 35%;
    width: 90%;
    margin-left: 30px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .bbtn{
    display: flex; /* 使用 flex 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 100%; /* 设置容器宽度 */
    /* height: 100vh; 设置容器高度，这里使用视窗高度 */
    /* background-color: #f0f0f0;  */
  }
  .rightmiddle{
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 40%;
    width: 90%;
    margin-left: 30px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
  }
  .per{
    display: flex;
    flex-direction: row;
    justify-content: left;
  }
  .per span{
    margin-left: 10px;
  }
  .information{
    width: 100%;
    padding: 10px;
    font-size: 20px;
  }
  
  .boxright{
    height:100%;
    width: 30%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
  .righttop{
    height: 70%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    /* margin-top: 15px; */
    margin-left: 30px;
    width: 90%;
    background-color: #fff;
    padding: 10px;
  }

  .boxleft{
    width: 55%;

  }
  .photobox{
    width: 100%;
    height: 60%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
    /* margin-left: 20px; */
    /* margin-top: 20px; */
  }
  .img{
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
  }

</style>