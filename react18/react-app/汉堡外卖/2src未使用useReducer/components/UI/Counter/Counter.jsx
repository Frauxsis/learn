import React, { useContext } from 'react';
import classes from './Counter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import CartContext from '../../../store/cart-context';

/*  引入FontAwesome
   1 安装依赖
   npm i --save @fortawesome/fontawesome-svg-core
   # Free icons styles
   npm i --save @fortawesome/free-solid-svg-icons
   npm i --save @fortawesome/free-regular-svg-icons
   npm i --save @fortawesome/react-fontawesome@latest
   
   2 引入组件
      import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
   3 引入图标
      import {faPlus} from '@fortawesome/free-solid-svg-icons'
   4 使用组件
        <FontAwesomeIcon icon={ faPlus } />

*/

//计数器的组件
const Counter = (props) => {
	//获取cartContext
	const ctx = useContext(CartContext);

	//添加购物车的函数
	const addButtonHander = () => {
		ctx.addItem(props.meal);
	};

	//减少购物车的函数
	const subButtonHander = () => {
		ctx.removeItem(props.meal);
	};

	return (
		<div className={classes.Counter}>
			{props.meal.amount && props.meal.amount !== 0 ? (
				<>
					<button className={classes.Sub} onClick={subButtonHander}>
						<FontAwesomeIcon icon={faMinus} />
					</button>
					<span className={classes.count}>{props.meal.amount}</span>
				</>
			) : null}

			<button className={classes.Add} onClick={addButtonHander}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	);
};

export default Counter;
