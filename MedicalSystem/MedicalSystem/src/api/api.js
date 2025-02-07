import jsonp from 'jsonp'
const getData = () => {
  let url = 'https://suggest.taobao.com/sug?code=utf-8&q=%E8%A1%A3%E6%9C%8D&_ksTS=1577354356112_350'
  // param给后端传递函数名的字段 由后端确定的 不能随便写
  return new Promise((resolve, reject) => {
    jsonp(url,{params:('callback')},(err, data) => {
      if(err){
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
}
export default getData;