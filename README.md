# vite-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```
- src
  - assets  // 存放静态资源文件，如图像、字体等
  - components  // 存放可复用的Vue组件
  - views  // 存放页面级组件
  - router  // 存放路由配置文件
  - store  // 存放Vuex状态管理相关文件
  - utils  // 存放通用的工具函数或类
  - plugins  // 存放Vue插件
  - styles  // 存放全局样式文件
  - api  // 存放与后端API交互的文件
  - directives  // 存放自定义指令
  - filters  // 存放自定义过滤器
  - mixins  // 存放Vue混入
  - locales  // 存放国际化相关文件
  - tests  // 存放测试文件
  - main.js  // 项目入口文件
- public  // 存放不需要被Webpack处理的静态资源
- dist  // 存放打包后的生产代码
- node_modules  // 存放第三方依赖包
- babel.config.js  // Babel配置文件
- package.json  // 项目配置文件
- README.md  // 项目说明文档
```
