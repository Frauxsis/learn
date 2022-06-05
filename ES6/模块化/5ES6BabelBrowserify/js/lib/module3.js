"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _module = require("./module1");

//默认暴露，可以暴露任意数据类型，
// 暴露什么数据接收到的就是什么数据
//只能一次
//语法      export default value
// export default () => {
// 	console.log('这是默认暴露的箭头函数');
// }
var _default = {
  msg: '默认暴露',
  foo: function foo() {
    console.log(this.msg);
  }
};
exports["default"] = _default;