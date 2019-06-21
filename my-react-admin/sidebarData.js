const data = [
  {
    group:'训练工程',
    children:[{
      tit: 'OCR识别',
      id: 'OCR',
      list: [{
        tit: '新建训练工程',
        link: ''
      },{
        tit: '选择数据集',
        link: ''
      },{
        tit: '图片预处理',
        link: ''
      },{
        tit: '定位',
        link: ''
      },{
        tit: '识别',
        link: ''
      },{
        tit: '模型检查',
        link: ''
      },{
        tit: '模型发布',
        link: ''
      }]
    }]
  },{
    group:'管理中心',
    children:[{
      tit: '工程管理中心',
      id: 'OCR1',
      link: 'home'
    },{
      tit: '数据集管理',
      id: 'OCR2',
      link: 'home'
    }]
  }
]

module.exports = data;