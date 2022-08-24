import React from 'react';
import TextContext from '../store/testContext';

/* 
   使用方法一
      1 引入context
      2 使用 Xxx.Consumer组件来创建元素
         Consumer的标签体中需要一个回调函数
         她会将context设置为回调函数的参数，
            通过参数就可以访问到context中存储的数据



*/

const A = () => {
	return (
		<TextContext.Consumer>
			{(ctx) => {
				return (
					<div>
						{ctx.name}--{ctx.age}
					</div>
				);
			}}
		</TextContext.Consumer>
	);
};

export default A;
