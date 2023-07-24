/*
 * @Author: qsm 348867341@qq.com
 * @Date: 2023-07-25 03:48:03
 * @LastEditors: qsm 348867341@qq.com
 * @LastEditTime: 2023-07-25 04:49:46
 * @FilePath: /webpack5-react-ts-template/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 项目入口文件

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
if(root) {
  createRoot(root).render(<App />)
}
