/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 03:46:51
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-25 05:44:38
 * @FilePath: /webpack5-react-ts-template/build/webpack.base.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// webpack.base.js  
// 基础配置
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const chalk = require( 'chalk' )

const g = chalk.green.bold
const r = chalk.red.bold

// ...
// console.log('NODE_ENV', process.env.NODE_ENV)
// console.log('BASE_ENV', process.env.BASE_ENV)

module.exports = {
    // 入口文件
    entry: path.join(__dirname, '../src/index.tsx'), 
    // 打包文件出口
    output: {
        filename: 'static/js/[name].js', // 每个输出js的路径名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    // 利用loader处理文件
    module: {
        rules: [
          {
              test: /.(ts|tsx)$/,
              use: 'babel-loader'
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
          {
            test: /.(css|less)$/, //匹配 css less 文件 执行顺序是从右往左 从下往上
            // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
            // css-loader: 解析css文件代码
            // 'less-loader' less解析成CSS
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          },
          {
            test:/.(png|jpg|jpeg|gif|svg|webp)$/, // 匹配所有图片文件
            type: "asset", // type选择asset
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              }
            },
            generator:{ 
              filename:'static/images/[name][ext]', // 文件输出目录和命名
            },
          },
          {
            test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
            type: "asset", // type选择asset
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              }
            },
            generator:{ 
              filename:'static/fonts/[name][ext]', // 文件输出目录和命名
            },
          },
          {
            test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
            type: "asset", // type选择asset
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              }
            },
            generator:{ 
              filename:'static/media/[name][ext]', // 文件输出目录和命名
            },
          },
        ]
    },
    resolve: {
        // 识别不带后缀的文件
        extensions: ['.js', '.tsx', '.ts'],
    },
    // 插件
    plugins: [
        // webpack需要把最终构建好的静态资源都引入到一个html文件中
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
          inject: true, // 自动注入静态资源
        }),
        // 把环境变量注入到代码中
        new webpack.DefinePlugin({
          'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}
