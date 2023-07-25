/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-26 02:42:02
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-26 03:24:58
 * @FilePath: /webpack5-react-ts-template/build/webpack.analy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 打包分析配置

const prodConfig = require('./webpack.prod.js') // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require('webpack-merge') // 引入合并webpack配置方法
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 引入分析打包结果插件

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin() // 配置分析打包结果插件
    ]
}))
