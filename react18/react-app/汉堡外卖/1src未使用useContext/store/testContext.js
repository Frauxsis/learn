/* 
   Context 相当于一个公共的存储空间，
      可以将多个组件中都需要访问的数据统一存储到一个Context中，
      这样无需通过props逐层传递，即可使组件访问到这些数据

   通过 React.createContext() 创建context
*/
import React from 'react';
const TestContext= React.createContext({
	name: '',
	age: 0,
});
export default TestContext;