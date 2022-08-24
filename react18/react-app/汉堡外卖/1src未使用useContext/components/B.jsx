import React, { useContext } from 'react';
import TestContext from '../store/testContext';

/* 
   使用Context方法二
      1 导入Context
      2 使用钩子函数 useContext() 来获取context
         useContext() 需要一个Context作为参数
         她会将Context中的数据获取并作为返回值返回

   Xxx.Provider
      表示数据中的生产者，可以使用她来指定Context中的数据
      通过value来指定Context中存储的数据
         这样一来，在该组件的所有的女组件都可以通过Context来访问她所指定的数据
    
    当通过Context访问数据时，她会读取离她最近的Provider中的数据
      如果没有Provider，则读取Context中的默认数据
*/

const B = () => {
	// 使用钩子函数 useContext() 来获取context
	const ctx = useContext(TestContext);

	return (
		<div>
			{ctx.name}---{ctx.age}
		</div>
	);
};

export default B;
