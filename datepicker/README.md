# 原生js实现日期选择器插件

## 前言
距离自己上次写插件差不多半年了。公司技术栈都是用框架，调解下口味就写了此原生插件。因为本意是想兼容到ie9就不用es6语法写了。前段时间在看vue源码受了点启发，本插件有点接近数据驱动视图更新的响应式渲染。如果希望有更多功能的，可在下方留言，我尽量扩展！如果你有需要或者喜欢的话，可以给我github来个star 😆
> [仓库地址](https://github.com/zhouatie/plugin/tree/master/datepicker)

> [在线预览](https://zhouatie.github.io/plugin/datepicker/datepicker.html)

### 预览
![日期选择器](https://github.com/zhouatie/plugin/raw/master/datepicker/data/datepicker.gif)

### 准备
首先在页面中引入css、js文件(文件在我的github，如何引入可看github示例html)

在页面中写上如下代码:

```javaScript
Calendar.create({
    classN: 'calendar-item', // 这里的calendar-item可随意填 不需要跟我一样
    callBack: function(bindElem, dateObj) {
        // bindElem: 该控件绑定的元素
        // dateObj: 选中的年、月、日 如： {year: 2018, month: 8, date: 12}

        // 用户可通过bindElem和dateObj搞事情啦 😆
        bindElem.innerHTML = dateObj.year + '-' + dateObj.month + '-' + dateObj.date;
    }
})
```

>**`String: classN`**:参数填入你要绑定日期控件的元素。本插件初始化的时候，会根据用户提供的`classN`类名生成相应个数

>**`Function: callBack`**:`bindElem`: 该控件绑定的元素,`dateObj`: 选中的年、月、日 如： `{year: 2018, month: 8, date: 12}`。通过返回参数，让用户在回调函数中通过回调参数做操作，给用户更高的自由度。
> **如果需要更多回调方法，我会尽量扩展**


## 结尾
如有什么功能需要增加的，可在评论区留言，我尽量满足。如有什么疏忽或错误，希望您指出。我会尽早修改，以免误导他人。
