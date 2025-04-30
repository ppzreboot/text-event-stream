# text/event-stream

演示 http 响应头 —— `Content-Type: text/event-stream` 的用法。

## 缘起

我猜你肯定用过 ChatGPT 或腾讯元宝之类的 AI 工具。

问*问题*时，腾讯元宝会把*回答*分成一小片、一小片的，
看起来像断断续续传给前端，
就像在试卷上写答案时一样。

这并不是什么高深的技术，只是一个 http 响应头：
``` json
{
  "Content-Type": "text/event-stream"
}
```

这个仓库的代码，就是演示这个响应头的用法。

## 使用方法

##### 1. 下载源码、并运行

``` bash
git@github.com:ppzreboot/text-event-stream.git
cd text-event-stream
node main.js
```

##### 2. 查看程序运行效果

+ 打开浏览器访问：http://127.0.0.1/
+ 打开控制台，注意 `console.log`

## 异常

##### 反向代理（以 nginx 为例）

服务端使用 nginx（或其他服务器）做反向代理时，需配置（在恰当的位置）：

``` nginx
server {
  location /xxx {
    proxy_buffering off;
    chunked_transfer_encoding on;
    proxy_pass http://xxxx.yyy/;
  }
}
```
