import axios from 'axios';

// 创建 Axios 实例
const service = axios.create({
  baseURL: '/', // 设置接口的基本URL
  timeout: 10000, // 请求超时时间（单位：毫秒）
});

// 请求拦截器
// service.interceptors.request.use(
//   config => {
//     // 添加 token 到请求头（如果需要的话）
//     const token = getToken(); // 请根据你的项目实际情况获取 token
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token;
//     }
    
//     // 在这里可以根据需要对请求进行其他处理
//     return config;
//   },
//   error => {
//     // 处理请求错误
//     console.error('请求拦截器错误:', error);
//     return Promise.reject(error);
//   }
// );

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 在这里可以对响应进行处理，如解析数据或处理错误信息
    return response.data;
  },
  error => {
    // 处理响应错误
    console.error('响应拦截器错误:', error);
    return Promise.reject(error);
  }
);

export default service;
