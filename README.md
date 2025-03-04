## 描述
Nodejs全栈项目模版

前端：Vue3+Typescript+Quasar

后端：Nest.js+TypeScript+TypeORM+MySQL+Redis

## 快速开始
1. 安装依赖
```sh
pnpm install
```
2. 打包依赖
```sh
# 分开打包
pnpm build:types && pnpm build:utils
# 或 一起打包
pnpm build:packages
```
3. 配置环境变量

后端：在 `projects/server` 目录下创建 `.env` 文件，具体配置见`projects/server/src/types/global.d.ts` 文件

前端：在 `projects/shared` 目录下创建 `.env` 文件，具体配置见 `projects/shared/types/env.d.ts` 文件

4. 启动项目
```sh
# 启动后端
pnpm dev:server

# 启动客户端
pnpm dev:client

# 启动管理后台
pnpm dev:admin
```


