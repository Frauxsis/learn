## 1.css module
   使用步骤：
      1 创建一个xxx.module.css
      2 在组件中引入css
         import classes from './App.module.css'
      3 通过classes来设置类
         <p className={classes.p1}></p>
   css模块可以动态设置唯一的class值

## 2.setState执行流程
   setState执行流程（函数式组件）
      setCount--->dispatchSetState()
                  会先判断组件当前处于什么阶段
                     渲染阶段 ==> 不会检查state值是否相同
                     非渲染阶段（渲染完毕） ==> 会检查state值是否相同，如果值不同，则对组件进行重新渲染，如果值相同，则不对组件进行重新渲染

                     如果值相同，React在一些情况下会继续执行当前组件的渲染，但是这个渲染不会触发女组件的渲染，这次渲染不会产生实际效果
                     这种情况通常发生在值第一次相同时

## 3.useEffect
   useEffect是一个钩子函数，需要一个函数作为参数
      这个作为参数的函数，将会在组件渲染完毕后执行
   useEffect(()=>{})
   useEffect(()=>{setCount(1)})
   在开发中，可以将那些会产生副作用的代码编写到useEffect的回调函数中，这样就可以避免这些代码影响到组件的渲染

   默认情况下，useEffect中的函数，会在组件渲染完毕后调用，且是每次渲染完成后都会调用

   在useEffect()中可以传递第二个参数
      第二个参数是一个数组，在数组中可以指定Effect的依赖项，指定后，只有当依赖发生变化时，Effect才会被触发
      通常会将Effect中使用的所有的局部变量都设置为她的依赖项，这样一来可以确保这些值发生变化时，会触发Effect的执行

      像setState是由钩子函数useState生成的
         useState()会确保组件的每次渲染都会获取到相同的swtState()对象，
         所以setState()方法可以不设置到依赖中
      如果依赖项设置了空数组，则意味着Effect追在组件初始化时触发一次

      在Effect的回调函数中，可以指定一个函数作为返回值
      return ()=>{}
      这个函数称为清理函数，她会在下次Effect执行前调用，可以在这个函数中做一些工作，来清除上次执行Effect带来的影响

## 4.useReducer
   useReducer(reducer, initialArg)
   参数：
      1 reducer  整合函数
         对于当前state的所有操作都应该在该函数中定义
         该函数的返回值会成为state的新值
         reducer在执行时，会收到两个参数
            1) state 当前最新的state
            2) action 她需要一个对象
                  在对象中存储dispatch所发送的命令
                  可以根据action中不同的type来执行不同的操作
         为了避免reducer会重复创建，通常reducer会定义到组件外面

      2 initialArg   state的初始值，作用和useState()中的值是一样的
         返回值：数组
         第一个参数：state 用来获取state的值
         第二个参数：state 修改的派发器
            通过派发器可以发送操作state的命令
            具体的修改行为会由另一个函数执行

      3 

   const counterReducer = ( state, action )=>{ 
    <!--   
      if( action.type === 'ADD' ){
          return state+1 
      }else if( action.type === 'SUB' ){
         return state-1
      }  
      return state -->

      switch (action.type){
         case 'ADD':
            return state+1 
         case 'SUB':
            return state-1
         default:
            return state
      }
   }

   const [count, countDispatch] = useReducer(countReducer , 1, )
   const add=()=>{
      countDispatch({ type:'ADD' })
   }

## 5.React.memo
   React.memo() 是一个高阶组件
      她接收另一个组件作为参数，并且会返回一个包装过的新组件
      包装过的新组件就会具有缓存功能
         包装过后，只有组件的props发生变化后，才会触发组件的重新渲染，否则总是返回缓存中的结果
      export default React.memo(B)

## 6.useCallback
   useCallback() 是一个猴子猴孙，用来创建React中的回调函数
   useCallback() 创建的回调函数，不会总在组件重新渲染时重新创建
      参数：
         1）回调函数
         2）依赖数组
         当依赖数组中的变量发生变化时，回调函数才会重新创建
         如果不指定依赖数组，回调函数每次都会重新创建
         一定要将回调函数中使用到的所有变量都设置到依赖项中，除了setState

   const click = () => {
      setCount( preState => preState+1 )
   }
   --->
   const click= useCallback( () => {
      setCount( preState => preState+1 )
   },[])

## 7.strapi
   
## 8.自定义钩子函数
   React中的钩子函数只能在函数组件或自定钩子中调用
   当需要React中钩子函数提取到一个公共区域时，就可以使用自定义钩子
   自定义钩子其实就是个普通函数，只是她的名字需要以use开头

## 9.RTK,RTKQ
