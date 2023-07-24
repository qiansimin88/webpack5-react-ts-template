/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 03:47:04
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-25 05:34:55
 * @FilePath: /webpack5-react-ts-template/build/webpack.prod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webpack.prod.js

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');


module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    // 复制文件插件方便打包后 能引入到public中的静态资源
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => {
            return !source.includes('index.html') // 忽略index.html
          }
        },
      ],
    }),
  ]
})
