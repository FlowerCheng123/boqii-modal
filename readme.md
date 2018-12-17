#弹窗骨架封装
boqii-modal主要是用来在移动端显示弹窗莫太框
## 使用方法
```
import 'boqii-modal'
import AComponent from '@/component/AComponent'
let propsdata = []
this.$modal({
  template: AComponent,
  params: propsdata,
  enter: 'slideInUp', //莫太框进入时的动画，不需要动画时填 none
  leave: 'slideOutDown', //莫太框离开时的动画，不需要动画时填 none
  success:function(data){
     console.log(" success callback data", data)
     //this.emit('hide')  //隐藏当前莫太框
     //this.emit('show')  //显示当前莫太框
  },
  fail: function(err){
    console.log(" failed callback err", err)  
  },
  duration: 700 //默认700ms， 动画执行的过渡时间
  backScroll: false //默认为false, 莫太框展开时是否让背面滚动， true为滚动
  backdropClickable: true //默认为false, 灰色背景是否可以点击
  backdropColor: 'transparent' //蒙层背景颜色，不填默认是rgba(0, 0, 0, 0.7)
})
```

## Changelog
```
2018/12/17  给蒙层添加背景颜色，默认是灰色rgba(0, 0, 0, 0.7)，透明色可以是transparent
2018/12/14  增加每个莫太框show and hide的方法，添加灰色背景是否可以点击的参数
2018/12/13  添加backScroll参数，使背景框可以滚动，修改模态框背包滚动的bug
2018/11/11  添加animate.css，给动态莫太框添加动效
2018/10/13  模态框基本搭建完成
```