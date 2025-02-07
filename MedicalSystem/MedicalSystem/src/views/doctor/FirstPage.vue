<template>
  <div class="firstPage">
     <div class="topData">
      <div v-for="(dataBox,index) in boxes" :key="index" class="box">
        <div class="left">
          <img :src="dataBox.image" style=" width: 90px;height: 90px;margin-left: 20px;">
        </div>
        <div class="right">
          <span class="num" >{{ dataBox.num }}</span>
          <span class="name">{{ dataBox.name }}</span>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="middle-left">
        <data1 class="data1"/>
        <data2/>
      </div>  
      <div class="middle-right">
        <data3/>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <data4/>
      </div>
      <div class="bottom-middle">
        <detectData/>
      </div>
      <div class="bottom-right">
        <message/>
      </div>
    </div>
  </div>
 
</template>

<script setup>
import { ref } from "vue";
import data1 from '/MedicalSystem/MedicalSystem/src/components/doctorData/data1.vue'
import data2 from '/MedicalSystem/MedicalSystem/src/components/doctorData/data2.vue'
import data3 from '/MedicalSystem/MedicalSystem/src/components/doctorData/data3.vue'
import data4 from '/MedicalSystem/MedicalSystem/src/components/doctorData/data4.vue'
import detectData from '/MedicalSystem/MedicalSystem/src/components/doctorData/detectData.vue'
import message from '/MedicalSystem/MedicalSystem/src/components/doctorData/data5.vue'
// import data1 from "@/src/components/doctorData/data1.vue"

const boxes = ref([
  {image:'/src/assets/images/sell.png',name:'总销售',num:2365},
  {image:'/src/assets/images/out.png',name:'今日出库',num:37},
  {image:'/src/assets/images/in.png',name:'今日入库',num:25},
  {image:'/src/assets/images/num.png',name:'订单数',num:20}
])





</script>
                                                  
<style scoped>
.middle-right{
  margin-left: 100px;
  width: 20%;
  height:100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
}
.data1{
  width: 70%;
}
.middle-left{
  /* margin-top: 50px; */
  margin-left: 50px;
  width:66%;
  height:100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.firstPage{
  width:100%;
  height:100%;
}
.topData{
  /* margin-top: 25px; */
  height:15%;
  width:100%;
  display: flex;
  /* background-color: pink; */
  justify-content: space-between;
}
.box{
  margin-top: 20px;
  width:20%;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
}
.left{
  display: flex;
  align-items: center;
}
.right{
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  margin-left: 0;
}
.name{
  margin-left: 10px;
  /* margin-top: 20px; */
  font-family: SimHei;
  font-size: 18px;
  font-weight: bold;
  color: #a8aaad;
}
.num{
  margin-left: 10px;
  margin-top:17px;
  font-family: Futura;
  font-size: 27px;
  animation: floatUp 1s ease-in-out forwards; /* 使用 floatUp 动画，持续 1 秒，缓动效果 */
  transform-origin: bottom center; /* 从底部中心开始动画 */
  opacity: 0; /* 初始时透明 */
}
.middle{
  margin-top: 50px;
  width: 100%;
  height:37%;
  /* background-color: skyblue; */
  display: flex;
  flex-direction: row;
}
.bottom{
  height:30%;
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  /* background-color: pink; */
}
.bottom-left{
  width: 45%;
  height: 100%;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
}
@keyframes floatUp {
  0% {
    transform: translateY(50%); /* 初始位置在底部 */
    opacity: 0; /* 初始时透明 */
  }
  100% {
    transform: translateY(0); /* 最终位置在原始位置 */
    opacity: 1; /* 完全不透明 */
  }
}
.bottom-middle{
  width: 20%;
  height: 100%;
  margin-left: 40px;
  margin-right: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
}
.bottom-right{
  width: 20%;
  height: 100%;
  margin-left: 40px;
  margin-right: 20px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
}
</style>
