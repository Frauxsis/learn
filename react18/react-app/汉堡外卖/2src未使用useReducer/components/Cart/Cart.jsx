import React, { useContext, useEffect, useState } from 'react';
import classes from './Cart.module.css';
import iconImg from '../../asset/bag.png';
import CartContext from '../../store/cart-context';
import CartDetails from './CartDetails/CartDetails';
import Checkout from './Checkout/Checkout';

//购物车的组件
const Cart = () => {
	const ctx = useContext(CartContext);

	//添加一个state，来控制详情是否显示
	const [showDetails, setShowDetails] = useState(false);

	//添加一个state，设置结账页的显示与隐藏
	const [showCheckout, setShowCheckout] = useState(false);

	//在组件每次重新渲染时，检查一下商品的总数量，
	//如果数量为0，则修改 showDetails 为false
	//组件每次重新渲染，组件的函数体就会执行
	/* 以下代码会报错
		Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
	
	
	*/
	useEffect(() => {
		if (ctx.totalAmount === 0) {
			//购物车已被清空
			setShowDetails(false);
			setShowCheckout(false);
		}
	}, [ctx]);

	//添加一个显示详情页的函数
	const toggleDetailsHandler = () => {
		if (ctx.totalAmount === 0) {
			setShowDetails(false);
			return;
		}
		setShowDetails((preState) => !preState);
	};

	//
	const showCheckoutHandler = () => {
		if (ctx.totalAmount === 0) return;
		setShowCheckout(true);
	};

	//
	const hideCheckoutHandler = () => {
		setShowCheckout(false);
	};

	return (
		<div className={classes.Cart} onClick={toggleDetailsHandler}>
			{showCheckout && <Checkout onHide={hideCheckoutHandler} />}

			{/* 引入购物车详情 */}
			{showDetails && <CartDetails />}

			<div className={classes.Icon}>
				<img src={iconImg} alt="bag" />
				{ctx.totalAmount === 0 ? null : (
					<span className={classes.TotalAmount}>{ctx.totalAmount}</span>
				)}
			</div>
			{ctx.totalAmount === 0 ? (
				<p className={classes.NoMeal}>未选购商品</p>
			) : (
				<p className={classes.Price}>{ctx.totalPrice}</p>
			)}
			<button
				onClick={showCheckoutHandler}
				className={`${classes.Button} ${
					ctx.totalAmount === 0 ? classes.Disabled : ''
				}`}
			>
				去结算
			</button>
		</div>
	);
};

export default Cart;
