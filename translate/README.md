# @zhouatie/fanyi

## 说明

平时开发的时候，遇到不会的单词，总要打开 一个翻译软件，或者浏览器翻译插件去查。所以就想开发一个命令行翻译插件，并发布到npm库上供大家使用。

## 安装

`npm i @zhouatie/fanyi -g`

## 使用

### 翻译英文

```shell
# 翻译单词apple的意思
fanyi apple

----------------------

英 [ˈæpl]   美 [ˈæpl]

n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。
```

```shell
# 翻译句子
fanyi my name is bob

---------------

我叫鲍勃

```

### 翻译中文

```shell
fanyi 苹果

----------

苹果 [píng guǒ]

[园艺] apple
```

```shell
fanyi 我是前端工程师

-----------

I'm a front end engineer
```

## TODO

- [x] 支持句子翻译
- [ ] 加入commonader
- [ ] 支持选择多个翻译平台
