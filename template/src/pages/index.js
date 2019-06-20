import Datasets from './Datasets/Loadable'
import DatasetsNew from './DatasetsNew/Loadable'
import DatasetsView from './DatasetsView/Loadable'
import Models from './Models/Loadable'
import ModelsNew from './ModelsNew/Loadable'
import ModelsEdit from './ModelsNew/edit'
import ModelsView from './ModelsNew/view'
import Train from './Train/Loadable'
import Download from './Download/Loadable'
import Users from './Users/Loadable'
import Password from './Password/Loadable'
import UsersAdd from './UsersAdd/Loadable'
import UsersEdit from './UsersEdit/Loadable'



 // 组件和路径的转换
 const compMapRoute = (item)=>{
  // 获取组件名称
  // item = item.toString()
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
  [compMapRoute('Datasets')]: Datasets,
  [compMapRoute('DatasetsNew')]: DatasetsNew,
  [compMapRoute('DatasetsView')]: DatasetsView,
  [compMapRoute('Models')]: Models,
  [compMapRoute('ModelsNew')]: ModelsNew,
  [compMapRoute('ModelsEdit')]: ModelsEdit,
  [compMapRoute('ModelsView')]: ModelsView,
  [compMapRoute('Train')]: Train,
  [compMapRoute('Download')]: Download,
  [compMapRoute('Users')]: Users,
  [compMapRoute('Password')]: Password,
  [compMapRoute('UsersAdd')]: UsersAdd,
  [compMapRoute('UsersEdit')]: UsersEdit,
}
 
// there are two ways to accomplish it, you can chose any of these
// export default {
//   '/datasets': Datasets,
//   '/datasets/new': DatasetsNew,
//   '/datasets/view': DatasetsView,
//   '/models': Models,
//   '/models/new': ModelsNew,
//   '/models/edit': ModelsEdit,
//   '/models/view': ModelsView,
//   '/train': Train,
//   '/download': Download
// }
 

