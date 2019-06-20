const data = [
  {
    group:'数据中心',
    children:[{
      tit: '数据集列表',
      id: 'datasets',
      icon: "ordered-list",
      link: 'datasets'
    },{
      tit: '创建数据集',
      id: 'datasetsNew',
      icon: "plus",
      link: 'datasets/new'
    },{
      show: false,
      tit: '查看数据集',
      link: 'datasets/view'
    }]
  },{
    group:'工程中心',
    children:[{
      tit: '工程列表',
      id: 'models',
      icon: "ordered-list",
      link: 'models'
    },{
      tit: '创建工程',
      id: 'modelsNew',
      icon: "plus",
      link: 'models/new'
    },{
      show: false,
      tit: '查看训练工程',
      link: 'models/view'
    },{
      show: false,
      tit: '编辑训练工程',
      link: 'models/edit'
    },{
      tit: '训练工程',
      id: 'train',
      icon: "hourglass",
      link: 'train'
    },{
      tit: 'SDK下载',
      id: 'download',
      icon: "download",
      link: 'download'
    }]
  },{
    group:'用户中心',
    children:[{
      tit: '用户管理',
      id: 'users',
      icon: "user",
      link: 'users'
    },{
      tit: '密码管理',
      id: 'password',
      icon: "lock",
      link: 'password'
    },{
      show: false,
      tit: '添加用户',
      link: 'users/add'
    },
    {
      show: false,
      tit: '编辑用户',
      link: 'users/edit'
    }
  ]
  }
]

module.exports = data;