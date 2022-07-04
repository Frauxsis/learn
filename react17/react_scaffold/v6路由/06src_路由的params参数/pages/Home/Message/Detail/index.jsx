import React from 'react';
import { useParams ,useMatch} from 'react-router-dom';

export default function Detail() {
	const { id, title, content } = useParams();

	const x = useMatch('/home/message/detail/:id/:title/:content')
	console.log(x);
	
	return (
		<ul>
			<li>编号：{id}</li>
			<li>标题：{title}</li>
			<li>内容：{content}</li>
		</ul>
	);
}
