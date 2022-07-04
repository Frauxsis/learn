## 一、todolist案例相关知识点
   1.拆分组件、实现静念组件，注意：className、style的写法
   2.动态初始化列表，如何确定将数据放在哪个组件的state中？
      某个组件使用：放在其自身的state中
      某些组件使用：放在她们共同的母组件state中（官方称此操作为：状念提升）
   3.关于母女之间通信：
      1.【母组件】给【女组件】传递数据：通过props传道
      2.【女组件】给【母组件】传遊数据：通过props传遊，要求母提前给女传递一个函数
   4.注意defaultchecked 和 checked的区别，类似的还有：defaultvalue 和 value
   5.状态在哪里，操作状态的方法就在哪里

## 二、github搜素案例相关知识点
   1.设计状态时要考虑全面，例如带有网络请求的组作，要考虑请求失败怎么办。
   2.ES6小知识点：解构斌值＋重命名
      let obj = {a:{b:1}}
      const {a} = obj; //传统解构赋值
      const {a:{b}} = obj; //连续解构赋值
      const {a{b:value}} = obj; //连续解构赋值＋重命名
   3.消息订阅与发布机制
      1. 先订阅，再发布（理解：有一种隔空对话的感觉)
      2. 适用于任意组件间通信
      3. 要在组件的componentWi11Unmount中取消订阅
   4.fetch发送请求（关注分离的设计思想）
      try {
			const response = await fetch(`/api1/search/users2?q=${keyWord}`);
			const data = await response.json();
		} catch (error) {
			console.log('请求出错', error);
		}

## 三、路由的基本使用
   1.明确好界面中的导航区、展示区
   2.导航区的a标签改为Link标签
      <Link to="/xxxxx">Demo</Link>
   3.屐示区写Route标签逃行路径的匹配
      <Routes>
         <Route path="/xxxx" element={<Demo />} />
      </Routes>
   4.<App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>

## 四、路由组件与一般组件
   1.写法不同
      一般组件： 	<Demo />
      路由组件：  
      <Routes>
         <Route path="/demo" element={<Demo />} />
      </Routes>
   2.存放位置不同
      一般组件： components
      路由组件： pages 
   3.接收到的props不同
      一般组件： 写组件标签时传递了什么，就能收到什么
      路由组件： (接收到三个固定的路由属性  history,location, match   react-router-dom@5)
      react-router-dom@6已可以传递props

## 五、NavLink与封装NavLink
   1.NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
   2.标签体内容是一个特殊的标签属性
   3.通过this.props.children可以获取标签体内容

## 六、Routes的使用（v5使用Switch)
   1.通常情况下，path和component是一一对应的关系
   2.Routes可以提高路由匹配效率（单一匹配）

## 七、解决多级路径刷新页面样式丢失的问題
   1.public/index.html中 引入样式时 不写 ./ ，写 / （常用）
   2.public/index.html中 引入样式时 不写 ./ ，写 %PUBLIC URL% （常用）
   3.使用 HashRouter

## 八、路由的严格匹配与模糊匹配
   1.模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
   2.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由
   3.v5 默认使用的是模糊匹配，开启严格匹配： <Route exact={true] path="/about" component={About}/>
   4.v6 默认使用的是严格匹配，开启模糊匹配：	<Route path="/home/*" element={<Home />} />

## 九. Redirect（v5)及Navigate（v6）的使用
   1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
   2.v5 具体编码：
      ‹Switch>
         ‹Route path="/about" component={About}/>
         ‹Route path="/home" component={Home}/>
         ‹Redirect to="/about"/>
      </Switch>
   3.v6 具体编码：
      import { Routes, Route, Navigate } from 'react-router-dom';
      <Routes>
			<Route path="/about" element={<About/>} />
			<Route path="/" element={<Navigate to="/about" replace />} />
		</Routes>

## 十、嵌套路由（v5）
   1.注册女路由时要写上母路由的path值
   2.路由的匹配是按照注册路由的顺序进行的
   
## 十一、向路由组件传递参数（v5）
   1.params 参数
      路由链接(携带参数)：<Link to='/demo/test/tom/18'>详情</Link>
      注册路由(声明接收)：<Route path="/demo/test/:name/:age” component={Test}/> 
      接收參数：const {id, title} = this.props.match.params
   2.search参数
      路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'>详情</Link>
      注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
      按收參数： this.props.location.search
      备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
   3.state参数
      路由链接(携带参数)：<Link to={{pathname:'/demo/test', state:{name:'tom',age:18}}}>详情</Link>
      注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
      按收參数：this.props.location.state
      备注：刷新也可以保留住参数

## 十二、编程式路由导航
   借助this.props.history对象上的API操作路由跳转、前进、后退
      -this.props.history.push()
      -this.props.history.replace()
      -this.props.history.goBack()
      -this.props.history.goForward()
      -this.props.history.go()
   
## 十三、BrowserRouter与HashRouter的区别
   1.底层原理不一样：
      BrowserRouter使用的是H5的history API，不兼容IE9及以下浏览器
      HashRouter使用的是URL的hash值
   2.path表现形式不一样
      BrowserRouter的路径中没有＃，例如：1ocalhost：3000/demo/test
      HashRouter的路径包含＃，例如：1ocalhost：3000/#/demo/test
   3.刷新后对路由state參数的影啊
      BrowserRouter没有任何影响，因为state保存在history对象中。
      HashRouter刷新后会导致路由state参数的丢失。
   4.备注：HashRouter可以用于解决一些路径错误相关的问题。

## 十四、