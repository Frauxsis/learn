import React, { useRef, useState } from 'react';

const AuthForm = () => {
	const [isLoginForm, setIsLoginForm] = useState(true);

	const usernameInp = useRef();
	const pwdInp = useRef();
   const emailInp = useRef();
   
	const submitHandler = (e) => {
		e.preventDefault();
		//获取用户输入的内容
		const username = usernameInp.current.value;
		const password = pwdInp.current.value;
		//处理登陆功能
      if (isLoginForm) {
         console.log('登陆',username,password);
      } else {
         const email = emailInp.current.value
         console.log('注册', username, password,email);
      }


	};

	return (
		<div>
			<h2>{isLoginForm ? '登陆' : '注册'}</h2>
			<form onSubmit={submitHandler}>
				<div>
					<input ref={usernameInp} type="text" placeholder="用户名" />
            </div>
            {
               !isLoginForm && <div>
                  <input ref={emailInp} type="email" placeholder='电子邮箱' />
               </div>
            }
				<div>
					<input ref={pwdInp} type="password" placeholder="密码" />
				</div>
				<div>
					<button>{isLoginForm ? '登陆' : '注册'}</button>
					<a
						href="#"
						onClick={(event) => {
							event.preventDefault();
							setIsLoginForm((preState) => !preState);
						}}
					>
						{isLoginForm ? '没有账号，点击注册' : '已有账号，点击登陆'}
					</a>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;
