<!-- <template>
  <div class="msg">

  </div>
</template>

<script setup>

</script>

<style scoped>

</style> -->
<template>
    <div class="bigbox">
        <div class="boxtop">
            <span>人气TOP</span>
        </div>
        <div class="patient-list">
            <div class="patient-items" ref="patientItems">
              <div v-for="(item,index) in patientData" :key="index" class="per">
                <!-- <img :src="item.img" width="25" height="25"> -->
                <span>{{item.name}}</span>
                <span :class="{data1:index===0,data2:index===1,data3:index===2,data4:index===3}">{{ item.medicalRecordNumber }}</span>
              </div>
            </div>
        </div>
    </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        patientData: [
          {
            id: 1,
            name: '水果捞',
            medicalRecordNumber: '125',
          },
          {
            id: 2,
            name: '安慕希',
            medicalRecordNumber: '100',
          },
          {
            id: 3,
            name: '鼠标垫',
            medicalRecordNumber: '93',
          },
          {
            id: 4,
            name: '金枕榴莲',
            medicalRecordNumber: '80',
          },
          // 添加更多病人数据
        ],
        // currentPatientIndex: 0, // 当前显示的病人索引
        // autoScrollInterval: null, // 定时器
      };
    }
//     mounted() {
//       // 开始自动滚动
//       this.startAutoScroll();
//     },
//     methods: {
//       startAutoScroll() {
//         // 每隔5秒滚动到下一条病人信息
//         this.autoScrollInterval = setInterval(() => {
//           this.currentPatientIndex = (this.currentPatientIndex + 1) % this.patients.length;
//           this.scrollToCurrentPatient();
//         }, 5000);
//       },
//       scrollToCurrentPatient() {
//         // 滚动到当前病人信息位置
//         const patientItems = this.$refs.patientItems;
//         const itemHeight = patientItems.children[0].offsetHeight;
//         patientItems.scrollTop = this.currentPatientIndex * itemHeight;
//       },
//     },
//     beforeDestroy() {
//       // 在组件销毁前清除定时器
//       clearInterval(this.autoScrollInterval);
//     },
 };
  </script>
  
  <style scoped>
  .data1{
    color: #6133CC;
    font-weight: bolder;
    
  }
  .data2{
    color: #5DAAF6;
    font-weight: bolder;
  }
  .data3{
    color: #E98F62;
    font-weight: bolder;
  }
  .data4{
    color: #E45D7E;
    font-weight: bolder;
  
@keyframes floatUp {
  0% {
    transform: translateY(10%); /* 初始位置在底部 */
    opacity: 0; /* 初始时透明 */
  }
  100% {
    transform: translateY(0); /* 最终位置在原始位置 */
    opacity: 1; /* 完全不透明 */
  }
}
  }
   .per{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    font-size: 17px;
    margin-left: 10px;
    margin-right: 20px;
  }
  .bigbox{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .boxtop{
    height: 24%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .boxtop span{
    margin-left: 50px;
  }
  .boxtop span{
       font-family: yahei;
       font-size: 20px; 
    }
  .patient-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    height:75%;
  }
  
  .patient-items {
    /* 这个容器用于包含病人项 */
    display: flex;
    flex-direction: column;
    overflow-y: hidden; /* 隐藏垂直滚动条 */
  }
  
  .patient-item {
    /* padding: 10px; */
    border: 1px solid #ccc;
    width: 100%;
    height: 20%;
    /* margin: 5px; */
    background-color: fff;
    transition: transform 0.5s ease; /* 添加滚动动画效果 */
  }
  
  .patient-info {
    /* 样式病人信息的容器 */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  </style>
  