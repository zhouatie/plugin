# 原生js实现拖拽缩放预览图片插件

## 前言
插件功能暂只满足我司业务需求，如果希望有更多的功能，可在下方留言，我尽量扩展！如果你有需要或者喜欢的话，可以给我github来个star 😆

> [仓库地址](https://github.com/zhouatie/plugin/tree/master/previewImg)

> [在线预览](https://zhouatie.github.io/plugin/previewImg/preview.html)

## 准备
1. 引入preview.js文件
2. 指定一个容器的id，插件只预览该容器内的图片，举个栗子🌰：

  ```html
  <div id="wrap">
      <div>
          <img src="./data/girl1.jpg" alt="" />
      </div>
      <img src="./data/girl2.jpg" alt="" />
      <img src="./data/girl3.jpg" alt="">
  </div>
  ```
  > 其中id为wrap的div就是 2 中所指的容器。插件只预览该容器下的所有图片。

  ```javaScript
  var preview = new Preview({
      imgWrap: 'wrap' // 指定该容器里的图片点击预览
  })
  ```
  > imgWrap键的值就是容器的id

3. 如果觉得样式不满意什么的，可以直接css覆盖就可以了。

## 预览
![girl](https://github.com/zhouatie/plugin/raw/master/previewImg/data/myGirl.gif)

## 总结
如有疏忽或错误，希望您及时指出，我会尽早修改😆。有什么需要交流的可在评论区与我交流
