const data = [
  {
    children:[{
      tit: '首页',
      id: 'tasks',
      icon: "ordered-list",
      link: 'tasks'
    },{ 
      show: false,
      tit: '例子',
      id: 'example',
      parentLink:'/tasks',
      parentTit:'首页',
      link: 'example'
    }]
  }
]

module.exports = data;