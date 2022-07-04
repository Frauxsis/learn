import React from 'react';
import { useSearchParams,useLocation } from 'react-router-dom';

export default function Detail() {
	const [search, setSearch] = useSearchParams();
	const id=search.get('id')
	const title=search.get('title')
	const content = search.get('content')
	
	const x = useLocation()
	console.log(x);
	return (
		<ul>
			<li><button onClick={()=>setSearch('id=008&title=message&content=fuck')} >点击更新收到的search参数</button></li>
			<li>编号：{id}</li>
			<li>标题：{title}</li>
			<li>内容：{content}</li>
		</ul>
	);
}
