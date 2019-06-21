import Tasks from './Tasks/Loadable'
import Example from './Example/Loadable'

 // 组件和路径的转换
 const compMapRoute = (item)=>{
  // 获取组件名称
  let route = ''
  for (let i of item) {
    if (i == undefined ) return 
    if (i.toLowerCase() !== i) {
      route = route + '/' + i.toLowerCase()
    } else {
      route = route + i
    }
  }
  return route
}


export default {
  [compMapRoute('Tasks')]: Tasks,
  [compMapRoute('Example')]: Example,
}
 