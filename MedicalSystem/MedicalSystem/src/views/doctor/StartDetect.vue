   <template>
     <div class="wholebox">
      <div class="boxleft">
        <div class="photobox">
          <input type="file" ref="fileInput" @change="handleFileInputChange" style="display: none" />
          <div class="vdbox">
            <div width="360px" height="300px" class="boxbox">
              <span height="20px" ><img src="/src/assets/images/camera.png" class="img">拍摄画面</span>
              <video v-show="check" ref="videoElement" autoplay class="display"></video>
              <img v-if="selectedImage" :src="selectedImage" class="display"/>
            </div>
            <div width="360px" height="300px" class="boxbox">
              <span height="20px" ><img src="/src/assets/images/photo.png" class="img">捕获图像</span>
              <canvas v-show="check" ref="canvasElement" class="display"></canvas>
              <img v-if="selectedImage" :src="selectedImage" class="display"/>
            </div>
          </div>
         
          <div class="buttonbox">
              <el-button @click="startCaptureTimer" class="btn">自动拍照</el-button>
              <el-button @click="detect" class="btn">开始诊断</el-button>
              <el-button @click="openFileInput" class="btn">上传图片</el-button>
          </div>
        </div>
        <div class="result">
          <div class="tabletop">
            <img src="/src/assets/images/ai.png" class="img">
            <span v-if="isdetected ">AI预测结果展示如下（结果仅供参考，请结合您的自身经验综合考量）</span>
            <span v-else>请点击“开始诊断”按钮</span>
          </div>
          <div class="leftbottom" >
            <div :class="{ loader: true, loading: isLoading }" v-show="isLoading"></div>
            <div class="table" v-show="isdetected ">
              <el-table  :data="tableData" style="border: none;width: 100%;margin-left: 10px;">
                <el-table-column prop="name" label="结果"></el-table-column>
                <el-table-column prop="rate" label="概率"></el-table-column>
              </el-table>
            </div>
            <div ref="chart" class="chart" ></div>
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
              <el-form-item label="是否需要病理诊断">
                <el-radio-group v-model="form.resource">
                  <el-radio label="是" />
                  <el-radio label="否" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="镜下表现">
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
        <div class="rightmiddle">
          <div class="lianxiren">
            <div class="avt">
              <img src="/src/assets/images/elderAvatar.png" class="avatar"/>
            </div>           
            <div class="name">
              <span class="s1">张三</span>
            </div>            
          </div>
          <dataMessage class="msg"/>
        </div>
        <div class="rightbottom">
          <div class="lianxiren">
            <div class="avt">
             <img src="/src/assets/images/ptl.png" class="avatar"/>
            </div>   
            <div class="name">
              <span class="s1">病理林智芙医生</span>
            </div>                  
          </div>
          <dataMessage class="msg"/>
        </div>
      </div>
    </div> 
    
    
  </template>
  
  <script setup>
  import { ref, onMounted, provide, computed } from 'vue';
  import * as echarts from 'echarts';
  import {ElMessage} from 'element-plus'
  import { watch } from 'vue'
  import dataMessage from '/MedicalSystem/MedicalSystem/src/components/doctorData/detect-message.vue'
  const videoElement = ref(null);
  const canvasElement = ref(null);

  const centerDialogVisible = ref(false)
  const isLoading = ref(false);
  const ischeck = ref(true);
  const isdetected = ref(false);
    
  const selectedImage = ref(null);
  const fileInput = ref(null);

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
  const Data = ref([
        { name: "黑色素痣", rate: 0.863 },
        { name: "基底细胞癌", rate: 0.164},
        { name: "黑色素瘤", rate: 0.057 },
      ]);
  const Data2 = ref([
    { name: "黑色素瘤", rate: 0.893 },
    { name: "基底细胞癌", rate: 0.257},
    { name: "黑色素瘤", rate: 0.0169 },
  ]); 
  const tableData = computed(() => {
        return ischeck.value ? Data.value : Data2.value;
    });
  const patientData = ref([
  {img:"/src/assets/images/hospital.png",name:"预约号:  ",value:"A3173"},
  {img:"/src/assets/images/name.png",name:"姓名:  ",value:"张三"},
  {img:"/src/assets/images/age.png",name:"年龄:  ",value:"35"},
  {img:"/src/assets/images/gender.png",name:"性别:  ",value:"男"},
  {img:"/src/assets/images/historyy.png",name:"病史:  ",value:"高血压，糖尿病"}
 ])
 const check = ref(false);
  onMounted(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        if (videoElement.value) {
          videoElement.value.srcObject = stream;
          check.value = true;
        }
      })
      .catch(function (error) {
        console.log(error);
        check.value = false;
      });
  });
  const capturePhoto = () => {
    if (!videoElement.value || !canvasElement.value) return;
  
    const canvasContext = canvasElement.value.getContext('2d');
    canvasContext.clearRect(0, 0, canvasElement.value.width, canvasElement.value.height);
  
    const brightnessValue = 1.2; // 亮度调整值，可根据需求自行调整
    const sharpnessValue = 1.5; // 清晰度调整值，可根据需求自行调整
  
    // 调整亮度和清晰度
    // canvasContext.filter = 'brightness(' + brightnessValue + ') contrast(' + sharpnessValue + ')';
    canvasContext.drawImage(videoElement.value, 0, 0, canvasElement.value.width, canvasElement.value.height);
  
    const photoURL = canvasElement.value.toDataURL('image/jpeg');
    // 将图片保存或展示到页面上
    // 可以使用图片的 base64 数据进行操作
  };
  
  const startCaptureTimer = () => {
    setTimeout(capturePhoto, 1000);// 1秒后执行 capturePhoto
    
    ischeck.value = !ischeck.value;
  };
  function confirm(){
    centerDialogVisible.value = false;
    ElMessage({
    message: '提交成功！',
    type: 'success',
  })
  }
  const openFileInput = () => {
    if (!check.value)
  // 触发文件选择对话框
      fileInput.value.click();
      else {
        alert("您正在使用摄像头");
        console.log(videoElement.value,canvasElement.value);
      }
};
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

  const loader = document.querySelector('.loader');

  function detect(){
    // loader.classList.add('loading');
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        isdetected.value = true;
        ischeck.value = !ischeck.value;
        draw();
      }, 1500);
  }
  const chart = ref(null);
    function draw(){
      const myChart = echarts.init(chart.value);

      // 饼图配置
      const pieOption = {
        series: [
          {
            type: 'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 0.863,
                name: '黑色素痣',
                itemStyle: { color: '#ED8C5C' },
                label: { show: false }, // 禁用标签
                emphasis: {
                  label: { show: true }, // 在高亮状态下显示标签
                },
              },
              {
                value: 0.164,
                name: '基底细胞癌',
                itemStyle: { color: '#6D42D2' },
                label: { show: false },
                emphasis: {
                  label: { show: true },
                },
              },
              {
                value: 0.057,
                name: '黑色素瘤',
                itemStyle: { color: '#E55C7D' },
                label: { show: false },
                emphasis: {
                  label: { show: true },
                },
              },
            ],
          },
        ],
      };
      const pieOption2 = {
        series: [
          {
            type: 'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 0.0169,
                name: '黑色素痣',
                itemStyle: { color: '#ED8C5C' },
                label: { show: false }, // 禁用标签
                emphasis: {
                  label: { show: true }, // 在高亮状态下显示标签
                },
              },
              {
                value: 0.257,
                name: '基底细胞癌',
                itemStyle: { color: '#6D42D2' },
                label: { show: false },
                emphasis: {
                  label: { show: true },
                },
              },
              {
                value: 0.893,
                name: '黑色素瘤',
                itemStyle: { color: '#E55C7D' },
                label: { show: false },
                emphasis: {
                  label: { show: true },
                },
              },
            ],
          },
        ],
      };
      // 中心图片配置
      const centerImageOption = {
        type: 'image',
        style: {
          image: '/MedicalSystem/MedicalSystem/src/assets/images/doctor.png',
          x: 'center',
          y: 'center',
          width: 100,
          height: 100,
        },
      };

      // 合并配置
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '90%',
          left: 'center',
        },
        graphic: [centerImageOption], // 将中心图片配置添加到图表中
        series: pieOption.series,
      };
      const option2 = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '90%',
          left: 'center',
        },
        graphic: [centerImageOption], // 将中心图片配置添加到图表中
        series: pieOption2.series,
      };
      myChart.resize();
      if(ischeck.value) myChart.setOption(option);
      else myChart.setOption(option2);
      };
  </script>
  
  <style scoped>
  .msg{
    height: 80%;
    width:100%;
  }
    .lianxiren{
    border-bottom: 2px solid #d6dce4;
    height: 20%;
    display: flex;
    flex-direction: row;
  }
  .avt{
    height: 100%;
    width: 13%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .name{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .name span{
    font-size: 18px;
    /* font-weight: bold; */
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
    margin-left: 20px;
    /* margin-top: 4px; */
  }
  .loader{
    border: 4px solid #f3f3f3; /* 设置加载动画的边框样式 */
    border-top: 4px solid #3498db; /* 设置加载动画的顶部边框样式 */
    border-radius: 50%; /* 设置边框为圆形 */
    width: 40px;
    height: 40px;
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
    justify-content: space-between;
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
    flex-direction: column;
    justify-content: space-between;
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
  
  .leftbottom{
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
  }
  .wholebox{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .chart{
    width: 300px;
    height: 240px;
    margin-left: 40px;
  }
  .boxright{
    height:100%;
    width: 40%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
  .righttop{
    height: 33%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    /* margin-top: 15px; */
    margin-left: 30px;
    width: 90%;
    background-color: #fff;
    padding: 10px;
  }
  .tabletop span{
    font-family: "幼圆", Arial, Helvetica, sans-serif;
    font-size: 20px;
  }
  .result{
    width: 100%;
    height:300px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-top: 15px;
    background-color: #fff;
    /* padding-top: 20px; */
  }
  .table{
    margin-top: 30px;
    margin-left: 30px;
    width: 50%;
    display: flex;
  }
  .buttonbox{
    display: flex;
    flex-direction: row;
    margin-left: 27%;
    width: 40%;
    justify-content: space-between;
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
  .boxbox{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .vdbox{
    width: 55%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .display{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 30px;
    width: 360px;
    height: 270px;
  }
  .boxbox span{
    margin-top: 30px;
    font-family: "幼圆", Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bolder;
  }
  .btn{
    /* margin-left: 150px; */
    margin-top: 25px;
    margin-bottom: 20px;
    /* color: ; */
  }
  </style>
  
   
   