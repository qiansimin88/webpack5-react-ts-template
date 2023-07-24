/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 03:47:58
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-25 05:50:19
 * @FilePath: /webpack5-react-ts-template/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import './app.less'
import meinv from '../public/meinv.webp'

function App() {
  return <div>
      <h2>webpack5-r22222211111eact-ts113322221131</h2>
      {/* <img src="/public/result@2.png" alt="" /> */}
      <img src={meinv} alt="" />
  </div>
}

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

export default App