## 描述
uni-app 全栈项目

前端：Vue3+TS

后端：Nest.js+TS+TypeORM

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

# 启动h5端
pnpm dev:app-h5

# 启动微信小程序端
pnpm dev:app-mp-weixin

# 启动管理后台
pnpm dev:admin
```


