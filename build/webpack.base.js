/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 03:46:51
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-26 03:46:37
 * @FilePath: /webpack5-react-ts-template/build/webpack.base.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// webpack.base.js
// 基础配置
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包注入到html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包环境抽离CSS 方便缓存 开发环境则不要 开发环境style-loader嵌入head内

const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式
const chalk = require("chalk");

const g = chalk.green.bold;
const r = chalk.red.bold;

// ...
// console.log('NODE_ENV', process.env.NODE_ENV)
// console.log('BASE_ENV', process.env.BASE_ENV)

module.exports = {
  // 入口文件
  entry: path.join(__dirname, "../src/index.tsx"),
  // 打包文件出口
  output: {
    filename: "static/js/[name].[chunkHash:8].js", // 每个输出js的路径名称 加上8位hash利用缓存
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  // 利用loader处理文件
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx|js|jsx)$/,
        // thread-loader 在这个loader之后的loader都新开web worker中心运行 多线程
        use: ["thread-loader", "babel-loader"],
        // webpack自动引入babel.config.js中的配置
        // options: {
        //    // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
        //    presets: [
        //     [
        //       "@babel/preset-env",
        //       {
        //         // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
        //         // "targets": {
        //         //  "chrome": 35,
        //         //  "ie": 9
        //         // },
        //          "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        //          "corejs": 3, // 配置使用core-js低版本
        //         }
        //       ],
        //     '@babel/preset-react',
        //     '@babel/preset-typescript'
        //   ]
        // }
      },
      // {
      //   include: [path.resolve(__dirname, '../src')],
      //   test: /.(css|less)$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'postcss-loader',
      //     'less-loader'
      //   ]
      // },
      //匹配 css less 文件 执行顺序是从右往左 从下往上
      // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
      // css-loader: 解析css文件代码
      // 'less-loader' less解析成CSS
      {
        test: /.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /.less$/, //匹配所有的 less 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|webp)$/, // 匹配所有图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base 64位
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  // 解析
  resolve: {
    // 识别不带后缀的文件
    extensions: [".js", ".tsx", ".ts"],
    // 别名 方便项目引用
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  // 开启缓存 提速90%
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  // inline 代码内通过dataUrl 形式引入SourceMap
  // hidden 生成 SourceMap 文件,但不使用
  // eval eval(...) 形式执行代码,通过 dataUrl 形式引入 SourceMap
  // nosources 不生成 SourceMap
  // cheap 只需要定位到行信息,不需要列信息
  // module 展示源代码中的错误位置
  // source map配置
  // devtool的命名规则为 ^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$
  devtool: "eval-cheap-module-source-map",
  // 插件
  plugins: [
    // webpack需要把最终构建好的静态资源都引入到一个html文件中
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    // 把环境变量注入到代码中
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
