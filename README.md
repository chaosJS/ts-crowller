1. 需要 superagent 的 d.ts 文件 `npm i --save-dev @types/superagent`
2. cheerio 提取 html
3. 拆分爬虫功能
4. 单例模式
5. 增加 build 执行 tsc 编译 ts 为 js
   1. `tsc -w` 自动监测 ts 文件变动
   2. add concurrently 合并 `tsc -w` 和 `nodemon ` 命令
6. tsconfig 配置项 直接运行 tsc 会使用 tsconfig.js 文件
   1. `noImplicitAny` strict 为 true 时 是否显式的设置 any
   2. `strictNullChecks` 强制检查 null 的赋值
7. 联合类型和类型保护
8. d.ts 编写
9. 使用 express 启动服务器，添加登陆功能 使用 cookie-session
10. 基本优化
11. 装饰器模式。。
