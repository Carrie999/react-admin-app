const data = [
  {
    group:'group1',
    children:[{
      tit: 'option1',
      id: 'option',
      icon: "mail",
      list: [{
        tit: 'item1',
        link: 'home1'
      },{
        tit: 'item2',
        link: 'home2'
      },{
        tit: 'item3',
        link: 'home3'
      },{
        tit: 'item4',
        link: 'home4'
      },{
        tit: 'item5',
        link: 'home5'
      },{
        tit: 'item6',
        link: 'home6'
      },{
        tit: 'item7',
        link: 'home7'
      }]
    }]
  },{
    group:'option2',
    children:[{
      tit: 'item1',
      id: 'item1',
      icon: "pie-chart",
      link: 'item1'
    },{
      tit: 'item2',
      id: 'item2',
      icon: "pie-chart",
      link: 'item2'
    }]
  }
]

module.exports = data;