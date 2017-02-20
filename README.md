# file upload example server
使用Node.js实现文件流转存服务 测试的后端server

## Installation

```
npm install
npm start
```

## How to Use

npm start 启动之后， 默认监听本地3000端口。
接收到的文件会保存在receive文件夹下面。

## 代码解释

发送端会在filename内部使用特殊的字符串：`_IDSPLIT_` 来分割分片的index和文件名。
来保证服务端在连续收到来自多个文件的不同分片的时候，也能够进行区分。