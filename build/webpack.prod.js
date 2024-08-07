/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 03:47:04
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-10-26 06:05:00
 * @FilePath: /webpack5-react-ts-template/build/webpack.prod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webpack.prod.js

const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin"); //gzip
// const globAll = require('glob-all')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包环境抽离CSS 方便缓存 开发环境则不要 开发环境style-loader嵌入head内
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 压缩CSS
const TerserPlugin = require("terser-webpack-plugin"); // 压缩JS
// const PurgeCSSPlugin = require('purgecss-webpack-plugin') //tree-shaking清理未使用css
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  // 优化项
  optimization: {
    // 分隔代码
    splitChunks: {
      // 分组
      cacheGroups: {
        // 第三方模块
        vendors: {
          // 提取node_modules代码
          priority: 1, // 提取优先级为1 优先抽离进vendors chunk
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: "vendors", //  chunk 名字 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来 不然改动一次代码就要重新打包一次node_module里面的代码 耗时
          chunks: "all", // 只提取初始化就能获取到的模块,不管异步的 all: 入口和异步代码都要管
          minSize: 2000, // 提取代码体积大于2 kb就提取出来  太小的包抽离出来没意义
        },
        // 公共模块
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons.js
          minChunks: 2, // 只要使用两次就提取出来 因为一次的话 拆出来没任何意义 跟 第三方模块不同 一般第三方模块体积较大 所以第三方模块引用一次就要拆出来
          chunks: "all", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 1000, // 提取代码体积大于1kb就提取出来
          reuseExistingChunk: true, //表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
        },
      },
    },
    // 压缩
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"], // 删除console.log
          },
        },
      }),
    ],
  },
  plugins: [
    // 生产环境抽离css 不使用style-loader
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css", // 抽离css的输出目录和名称
    }),
    // 前端gzip压缩
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
    }),
    // 清理无用css (我觉得还是别用了 万一出现问题呢)
    // new PurgeCSSPlugin({
    //   // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
    //   // 只打包这些文件中用到的样式
    //   paths: globAll.sync([
    //     `${path.join(__dirname, '../src')}/**/*.tsx`,
    //     path.join(__dirname, '../public/index.html')
    //   ]),
    // }),
    // 复制文件插件方便打包后 能引入到public中的静态资源
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
          filter: (source) => {
            return !source.includes("index.html"); // 忽略index.html
          },
        },
      ],
    }),
  ],
});
