# wepy-plugin-compress
wepy-plugin-compress compress json wxml wxss js

compress json wxml wxss js

## 安装

```
npm install wepy-plugin-compress --save-dev
```

## 配置`wepy.config.js`

```js
const path = require("path");
module.exports.plugins = {
    'compress': {
        filter: /\.(json|wxml|wxss|js)$/,
        //默认使用 `UglifyJS` 与 `pretty-data`作为压缩器,可按文件后缀自定义解析器
        //可使用Promise
        pretty:{
            json:(code)=>{return code;}
            js:(code)=>{return code;}
            wxss:(code)=>{return code;},
            wxml:(code)=>{return code;}
        }
    }
};
```