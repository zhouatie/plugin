# 原生js实现拾色器插件

## 前言
插件功能只满足我司业务需求，如果希望有更多功能的，可在下方留言，我尽量扩展！如果你有需要或者喜欢的话，可以给我github来个star 😆
> [仓库地址](https://github.com/zhouatie/plugin/tree/master/colorpicker)

> [在线预览](https://zhouatie.github.io/plugin/colorpicker/colorpicker.html)


### 预览
![拾色器](https://github.com/zhouatie/plugin/raw/master/colorpicker/data/colorpicker.gif)

### 准备
首先在页面中引入js文件

在页面中写上如下代码:

```javaScript
Colorpicker.create({
    bindClass:'picker', // 这里的picker可随意填 不需要跟我一样
    change: function(elem,hex){
      // elem: 绑定的元素
      // hex：当前选中颜色的hex值

      elem.style.backgroundColor = hex;
    }
})
```

>**`bindClass`**:参数填入你要绑定拾色器的元素，页面中class为picker有几个，拾色器将会生成几个。拾色器将会分别绑定每个元素。点击每个元素时，都会自动打开该元素绑定的拾色器。

>**`change`**:在选择的色彩改变的时候会触发该回调方法。会回传两个参数，第一个`elem`就是该拾色器生成时绑定的`picker`;第二个参数，hex代表是回传的颜色值。起初是插件直接改变绑定元素的颜色，但是想到有些拾色器插件是绑定input表单，改变表单颜色值，有些是改变绑定元素的颜色。所以为了让使用者自由度更高点，暂提供两个回调参数让你自定义。如上面 我是直接改变元素颜色。

> **如果需要更多回调方法，我会尽量扩展**


## 结尾
如有什么功能需要增加的，可在评论区留言，我尽量满足。如有什么疏忽或错误，希望您指出。我会尽早修改，以免误导他人。
