# 一.redux
## 1.求和案例_redux精简版
   1 去除Count组件自身的状念
   2 src下建立：
      -redux
         -store.js
         -count_reducer.js
   3 store.js:
      1).引入redux中的createStore函数，创建一个store
      2).createStore调用时要穿入一个为其服务的reducer
      3).记得暴露store对象
   4 count_reducer.js
      1).reducer的本质就是一个函数，接收preState,action，返回加工后的状态
      2).reducer有两个作用：初始化状态，加工状态
      3).reducer被第一次调用时，是store自动触发的，传递的preState是undefined
   5 在index.js中监测store中状态的改变，一旦发生改变重新演染<App/>
      备注：redux只负责管理状态，至子状态的改变驱动着页面的展示，要靠我们自己写。

## 2.求和案例_redux完整版
   新增文件：
      1.count_action.js 专门用于创建action对象
      2.constant.js 放置容易写错的type值

## 3.求和案例_redux异步action版
   1 明确：延迟的动作不想交给组件自身，想交给action
   2 何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
   3 具体貓码：
      1) yarn add redux-thunk  并配置在store中
      2) 创建action的函数不再返回一般对象，而是一个函数。该函数中写异步任务。
      3) 异步任务有结果后，分发一个同步的action去真正操作数据
   4 备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。

## 4.求和案例_react-redux的基本使用
   1 明确两个概念：
      1）UI组件：不能使用任何redux的api，只负责页面的呈现、交互等。
      2）容器组件：负责和redux通信，将结果交给UI组件。
   2 如何创建一个容器组件————靠react-redux 的 connect函数
      connect(mapStateToProps,mapDispatchToProps)(UI组件)
         mapStateToProps：映射状态，返回值是一个对象
         mapDispatchToProps：映射操作状态的方法，返回值是一个对象
   3 备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
   4 备注2：mapDispatchToProps也可以是一个对象

## 5.求和案例_react-redux优化
   1 容器组件和UI组件整合成一个文件
   2 无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}></Provider>即可
   3 使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
   4 mapDispatchToProps也可以简单的写成一个对象
   5 一个组件要和redux“打交道”要经过哪几步？
      1）定义好UI组件----不暴露
      2）引入 connect 生成一个容器组件，并暴露，写法如下：
         connect(
            state => ({key:value}), //映射状态
            {key:xxxxAction} //映射操作状态的方法
         )(UI组件)
      3）在UI组件中通过this.props.xxxxxxx读取和操作状态

## 6.求和案例_react-redux数据共享版
   1 定义一个Person组件，和Count组件通过redux共享数据。
   2 为Person组件编写：reducer，action，配置constant常量
   3 重点：Person的reducer和Count的reducer要使用 combineReducers() 进行合并，合并后的总状态是一个对象
   4 交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”

## 7.求和案例_react-redux开发者工具的使用
   1 yarn add redux-devtools-extension
   2 store中进行配置
      import {composeWithDevTools} from 'redux-devtools-extension'
      const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))

## 8.求和案例_react-redux最终版
   1 所有变量名字要规范，尽量触发对象的简写形式。
   2 reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer


# 二.extension
## 1.setState更新状态的2种写法
   1 setState (stateChange, [callback]) ---- 对象式的setState
      1) stateChange为状态改变对象(该对象可以体现出状态的更改)
      2) ca11back是可选的回调函数，它在状态更新完毕、界面也更新后 (render调用后)才被调用
   2 setStatet(updater, [callback]) ---- 函数式的setState
      1) updater为返回stateChange对象的函数。
      2) updater可以接收到state和props。
      3) ca11back是可选的回调函数，它在状态更新、界面也更新后 (render调用后)才被调用。
   3 总结：
      1) 对象式的setState是函数式的setState的简写方式(语法糖）
      2) 使用原则：
         (1) 如果新状态不依赖于原状态 ===> 使用对象方式
         (2) 如果新状态依赖于原状态 ===> 使用函数方式
         (3) 如果需要在setState()执行后获取最新的状态数据，要在第二个ca11back函数中读取

## 2.路由组件的lazyLoad
   1 // 通过React的1azy函数配合 import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
      const Login = lazy(() => import('@/pages/Login'))
   2 // 通过<Suspense></Suspense>指定在加载得到路由打包文件前显示一个自定义1oading界面
      <Suspense fallback={<h1>loading...</h1>}>
         <Routes>
         	<Route path="/xxx" element={<Xxx />} />
         </Routes>
      </Suspense>

