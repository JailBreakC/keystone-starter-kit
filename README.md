# keystone starter kit

keystone starter kit 是一个基于 keystone.js@4.0.0 开发模板。它在 keystone 的基础上，增加了前端代码 webpack 打包支持，可以自由的使用 es6语法、es6 的模块系统。使其可以支撑大型 cms 的开发。

使用本模板之前，需要先了解 keystone 的开发文档。<https://keystonejs.com/>
同时，可以下载 <https://github.com/keystonejs/keystone-demo> 官方 demo 了解基础用法。 

## 准备工作

### 安装 mongodb
本文推荐使用 docker 来安装 mongodb 依赖
1. 安装 docker 社区版 <https://docs.docker-cn.com/engine/installation/>
2. 下载 MongoDB 镜像 `docker pull mongo:3.2`
3. 启动 MongoDB 容器 `docker run --name mongo32 -p 27017:27017 -v /data/db:/data/db -d mongo:3.2`

### 安装依赖包
```
npm install
```

### 配置环境文件
在根目录下创建 `.env` 文件
写入：
```
COOKIE_SECRET=yoursecret
NODE_ENV=dev
```

如果是开发环境，请设置
```
NODE_ENV=pro
```

### 启动 node 进程
```
npm start
```

### 启动 webpack watch
```
npm run watch
```
`public/js` 目录下的代码，会被自动编译到 `public/dev` 目录下

上述工作完成，你应该就可以进行开发工作了，编辑 `public/js` 目录下的代码，webpack 会自动进行打包工作。

## 更多

### 发布构建
```
npm run build
```
`public/js` 目录下的代码，会被自动编译到 `public/dist` 目录下
webpack 会自动将加过 hash 之后的 js/css 替换到模板中去

### 创建一个新的页面
你需要在 `templates/views` 下面创建一个 new_page.hbs 文件，使用模板语法引入 js 和 css

```
{{!< default}} 
{{#contentFor 'pageStyles'}}
  {{>style/new_page}}
{{/contentFor}}
your things
{{#contentFor 'pageScripts'}}
  {{>js/new_page}}
{{/contentFor}}
```

然后在 `routes/views` 中为其配置好 node.js 路由
最后，在 public/js 中创建好 **同名** 的 new_page.js 文件
这样，一个新的页面就配置好了。
