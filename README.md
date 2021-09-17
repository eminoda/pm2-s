# pm2-s

> pm2 顺序执行插件

**为什么有这个？**

pm2 可以说是 Node.js 服务进程管理的 **最佳实践** 的工具，但没有类似 [run-s](https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/run-s.md) 的功能。

好在翻阅文档后，发现可以通过 [Programmatic API](https://pm2.keymetrics.io/docs/usage/pm2-api/) 来实现，所有就有了 pm2-s，希望有类似需求的同学可以以此借鉴。

## quickstart

1. 项目根路径添加 ecosystem.config.js, 就和 pm2 一样

   ```js
   module.exports = {
     apps: [
       {
         name: "app1",
         script: "./app.js",
         env_production: {
           NODE_ENV: "production",
         },
         env_development: {
           NODE_ENV: "development",
         },
       },
       {
         name: "app2",
         script: "./app.js",
         env_production: {
           NODE_ENV: "production",
         },
         env_development: {
           NODE_ENV: "development",
         },
       },
     ],
   };
   ```

2. 启动 pm2-s

   ```shell
   pm2-s start ecosystem.config.js
   ```
