# 原生js实现移动端选择器插件

## 前言
插件功能只满足我司业务需求，如果希望有更多功能的，可在下方留言，我尽量扩展！如果你有需要或者喜欢的话，可以给我github来个star 😆
> [仓库地址](https://github.com/zhouatie/plugin/tree/master/pickerView)

> [在线预览(记得将浏览器切换到手机模式)](https://zhouatie.github.io/plugin/pickerView/pickerView.html)


### 预览
![省市区](https://github.com/zhouatie/plugin/raw/master/pickerView/data/pickerView2.gif)

### 准备
首先在页面中引入css,js文件

每次需要弹出该组件时通过new一个实例来生成，代码如下:

```javaScript
var data = {
    1:{
      2:[3,4]
    }
}
var pickerView = new PickerView({
    bindElem: elem, // 绑定的元素,用于区别多个组件存在时回显区别，如果单个可以随意填某个元素
    data: data, // 说明：该参数必须符合json格式 且最里层是个数组，如上面的data变量所展示的[3,4]。
    title: '标题2', // 顶部标题文本 默认为“标题”
    leftText: '取消', // 头部左侧按钮文本 默认为‘取消’
    rightText: '确定', // 头部右侧按钮文本 默认为“确定”
    rightFn: function( selectArr ){  // 点击头部右侧按钮的回调函数，参数为一个数组，数组对应滚轮中每项对应的值

    }
});
```
> 字段介绍如上注释，滚轮的数量取决于你json嵌套的层数。如下：


```javascript
var data = [1,2,3]
```

![data1](https://github.com/zhouatie/plugin/raw/master/pickerView/data/img1.png)


```javaScript
var data = {
    "小明家":["小明爸爸","小明妈妈","小明爷爷","小明奶奶","小明爸爸","小明妈妈","小明爷爷","小明奶奶"],
    "小红家":["小红爸爸","小红妈妈"]
}
```
![data2](https://github.com/zhouatie/plugin/raw/master/pickerView/data/img2.png)



### 案例
```html
<!-- html -->
<button style="font-size:50px;" id="btn">按钮</button>
<div class="showText"></div>
```
> button标签是用来每次点击的时候打开组件

> div标签用来展示选择的内容

```javaScript
//js

// var data = 地级市json数据，过大 就不展示了

var data = {
    "小明家":{
      "小明爸爸":[1,2,6,7,7,8,8,9,0,6,98,76,5],
      "小明妈妈":[3,4]
    },
    "小红家":{
      "小红爸爸":[5,6],
      "小红妈妈":[7,8]
    }
}
var btn = document.getElementById("btn");
btn.onclick = function(){
  var pickerView = new PickerView({
      bindElem: btn,
      data: data,
      title: '家庭',
      leftText: '取消',
      rightText: '确定',
      rightFn: function( selectArr ){
          console.log(selectArr,'selectarr');
          // 将家庭成员展示到showText类名的div中
          document.querySelector(".showText").innerText = selectArr.join("-");
      }
  });
}
```
> 说明： 每次显示组件的时候都需要new一个实例，如上button标签每次被点击的时候都new一个。效果如下：

![预览](https://github.com/zhouatie/plugin/raw/master/pickerView/data/img4.png)

## 结尾
如有什么功能需要增加的，可在评论区留言，我尽量满足。如有什么疏忽或错误，希望您指出。我会尽早修改，以免误导他人。
