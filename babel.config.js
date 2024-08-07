/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 05:19:20
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-25 05:49:06
 * @FilePath: /webpack5-react-ts-template/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// babel.config.js
const isDEV = process.env.NODE_ENV === "development"; // 是否是开发模式

module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      "@babel/preset-env",
      {
        // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
        // "targets": {
        //  "chrome": 35,
        //  "ie": 9
        // },
        useBuiltIns: "usage", // 按需引入相应的polyfill api 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // polyfill 的库
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    isDEV && require.resolve("react-refresh/babel"), // 如果是开发模式,就启动react热更新插件
    // ...
  ].filter(Boolean), // 过滤空值
};
