import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './FilterMeals.module.css';

const FilterMeals = (props) => {
	const [keyword, setkeyWord] = useState('');

	/* const inputChangeHandler = (e) => {
      const keyword = e.target.value.trim();
      props.onFilter(keyword)
	}; */

	//痛殴Effect改造练习
	useEffect(() => {
		//降低数据过滤的次数，提高用户体验
		// 用户输入完了再过滤，用户输入过程中，不用过滤
		//当用户停止输入动作一秒后，才做查询
		//在开启一个定时器的同时，关闭上一个定时器
	const timer=	setTimeout(() => {
			props.onFilter(keyword);
		}, 1000);
		return () => {
			clearTimeout(timer)
		}
		
	}, [keyword]);

	const inputChangeHandler = (e) => {
		setkeyWord(e.target.value.trim());
		
	};
	return (
		<div className={classes.FilterMeals}>
			<div className={classes.InputOuter}>
				<input
					value={keyword}
					onChange={inputChangeHandler}
					className={classes.SearchInput}
					type="text"
					placeholder="请输入关键字"
				/>
				<FontAwesomeIcon className={classes.SearchIcon} icon={faSearch} />
			</div>
		</div>
	);
};

export default FilterMeals;
