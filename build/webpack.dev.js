/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 03:46:59
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-25 05:28:22
 * @FilePath: /webpack5-react-ts-template/build/webpack.dev.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// webpack.dev.js
const path = require("path");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const baseConfig = require("./webpack.base.js");

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
  devtool: "eval-cheap-module-source-map", // 源码调试模式,后面会讲
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹 方便页面引入public文件下的静态资源
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件 不刷新页面查看效果
  ],
});
