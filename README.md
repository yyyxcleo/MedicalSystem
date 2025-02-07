# 基于 EasyDL 的皮肤癌多用户辅助诊断系统
皮肤癌多用户诊断系统目标用户包含患者、主治医生和病理医师三种角色。患者模块为小程序端应用，主体功能包括拍照诊断、AI 智能问诊与医患交互；主治医生模块分为硬件与网页端应用，医生通过皮肤显微镜拍摄病人皮肤，画面显示在树莓派开发板显示屏上，点击显示屏触控按钮，摄像头在画面录制期间进行图片抓拍，将图片交给模型诊断，预测结果呈现在显示屏上，具体结果分析可在网页端查看，并且根据患者病情决定是否交给病理医师进一步问诊；病理医师接收主治医生传来的患者的诊断信息，可在网页上传患者的病理采集图片，生成诊断结果，结合主治医生的问诊建议进行确诊。
```bash
# 克隆项目
git clone https://gitee.com/KonBAI-Q/ruoyi-flowable-plus.git

# 进入项目目录
cd ruoyi-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
