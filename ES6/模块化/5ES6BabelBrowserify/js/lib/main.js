"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _module = require("./module1");

var _module2 = require("./module2");

var _module3 = _interopRequireDefault(require("./module3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//引入其她的模块
//语法   import xxx from '路径'
// console.log(module1, module2);
(0, _jquery["default"])('body').css('background', 'green');
(0, _module.foo)();
(0, _module.bar)();
(0, _module2.fun)();
(0, _module2.fun2)();

_module3["default"].foo();