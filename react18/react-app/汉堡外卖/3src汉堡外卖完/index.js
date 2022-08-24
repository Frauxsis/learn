import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

//设置移动端的适配
//除以几视口宽度就是几rem，现在视口宽度750rem
document.documentElement.style.fontSize = 100 / 750 + 'vw';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<App />
	// </React.StrictMode>
);
