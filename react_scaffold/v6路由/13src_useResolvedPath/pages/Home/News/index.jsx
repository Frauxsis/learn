import React from 'react';
import { useNavigationType, useResolvedPath } from 'react-router-dom';
export default function News() {
	console.log('useNavigationType', useNavigationType()); //POP---刷新
	console.log('useResolvedPath', useResolvedPath('/user?id=001&name=anna#qwe'));
	return (
		<ul>
			<li>news001</li>
			<li>news002</li>
			<li>news003</li>
		</ul>
	);
}
