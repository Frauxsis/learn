/* 
自定义Promise函数模块:IIFE
*/
(function (window) {
	const PENDING = 'pending';
	const RESOLVED = 'resolved';
	const REJECTED = 'rejected';

	class Promise {
		constructor(executor) {
			//将当前promise对象保存起来
			const self = this;
			self.status = PENDING; //给promise对象绑定status属性，初始值为pending
			self.data = undefined; // 给promise对象指定一个用于存储结果数据的属性
			self.callbacks = []; //每个元素的结构： { onResolved(){}, onRejected(){} }

			function resolve(value) {
				//如果当前状态不是pending，直接结束
				if (self.status !== PENDING) {
					return;
				}

				//将状态改为resolved
				self.status = RESOLVED;
				//保存value数据
				self.data = value;
				//如果有待执行的callback函数，立即异步执行回调
				if (self.callbacks.length > 0) {
					setTimeout(() => {
						//执行所有成功的回调
						self.callbacks.forEach((callbacksObj) => {
							callbacksObj.onResolved(value);
						});
					}, 0);
				}
			}
			function reject(reason) {
				//如果当前状态不是pending，直接结束
				if (self.status !== PENDING) {
					return;
				}

				//将状态改为rejected
				self.status = REJECTED;
				//保存value数据
				self.data = reason;
				//如果有待执行的callback函数，立即异步执行回调
				if (self.callbacks.length > 0) {
					setTimeout(() => {
						//执行所有失败的回调
						self.callbacks.forEach((callbacksObj) => {
							callbacksObj.onRejected(reason);
						});
					}, 0);
				}
			}

			//立即同步执行executor
			try {
				executor(resolve, reject);
			} catch (error) {
				reject(error); //如果执行器抛出异常，promise对象变为rejected状态
			}
		}
		/* Promise原型对象的then() 
   指定成功和失败的回调函数
   返回一个新的promise对象
   返回promise的结果由onResolved/onRejected执行结果决定
   
   */

		then(onResolved, onRejected) {
			//向后传递成功的value
			onResolved =
				typeof onResolved === 'function' ? onResolved : (value) => value;

			//指定默认的失败的回调（实现错误/异常穿透的关键点）
			//向后传递失败的 reason
			onRejected =
				typeof onRejected === 'function'
					? onRejected
					: (reason) => {
							throw reason;
					  };

			const self = this;

			return new Promise((resolve, reject) => {
				//调用指定的回调函数处理，根据执行结果，改变return的promise状态
				function handle(callback) {
					/* 
               1 如果抛出异常，return的promise就会失败，reason就是error
               2 如果回调函数返回 非promise，return的promise就会成功，value就是返回的值
               3 如果回调函数返回 promise，return的promise结果就是这个promise的结果

               */
					try {
						const result = callback(self.data);
						if (result instanceof Promise) {
							// 3
							/* 	result.then(
								(value) => resolve(value),
								(reason) => reject(reason)
							); */

							result.then(resolve, reject);
						} else {
							// 2
							resolve(result);
						}
					} catch (error) {
						// 1
						reject(error);
					}
				}

				if (self.status === PENDING) {
					//当前状态还是pending状态，将回调函数保存起来
					self.callbacks.push({
						onResolved(value) {
							handle(onResolved);
						},
						onRejected(reason) {
							handle(onRejected);
						},
					});
				} else if (self.status === RESOLVED) {
					//如果当前是resolved状态，异步执行onResolved并改变return的promise状态

					setTimeout(() => {
						handle(onResolved);
					}, 0);
				} else {
					//'rejected'
					setTimeout(() => {
						handle(onRejected);
					});
				}
			});
		}

		catch(onRejected) {
			return this.then(undefined, onRejected);
		}

		static resolve = function (value) {
			return new Promise((resolve, reject) => {
				//value是promise
				if (value instanceof Promise) {
					//使用value的结果作为promise的结果
					value.then(resolve, reject);
				} else {
					//value不是promise
					resolve(value);
				}
			});
		};

		static reject = function (reason) {
			return new Promise((resolve, reject) => {
				reject(reason);
			});
		};

		static all = function (promises) {
			// 用来保存所有成功value的数组
			const values = new Array(promises.length);
			//用来保存成功promise的数量
			let resolvedCount = 0;

			return new Promise((resolve, reject) => {
				//遍历promises获取每个promise的结果
				promises.forEach((p, index) => {
					Promise.resolve(p).then(
						(value) => {
							resolvedCount++; //成功的数量加1
							//p成功，将成功的value保存到values
							values[index] = value;

							//如果全部成功了，将return的promise改变成功
							if (resolvedCount === promises.length) {
								resolve(values);
							}
						},
						(reason) => {
							//只要有一个失败了，return的promise就失败
							reject(reason);
						}
					);
				});
			});
		};

		static race = function (promises) {
			return new Promise((resolve, reject) => {
				//遍历promises获取每个promise的结果
				promises.forEach((p, index) => {
					Promise.resolve(p).then(
						(value) => {
							//一旦有成功的，将return的promise变为成功
							resolve(value);
						},
						(reason) => {
							// 一旦有失败的，将return的promise变为失败
							reject(reason);
						}
					);
				});
			});
		};

		//返回一个promise对象，她在在指定的时间后才确定结果
		static resolveDelay = function (value, time) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					//value是promise
					if (value instanceof Promise) {
						//使用value的结果作为promise的结果
						value.then(resolve, reject);
					} else {
						//value不是promise
						resolve(value);
					}
				}, time);
			});
		};

		//返回一个promise对象，她在在指定的时间后才失败
		static rejectDelay = function (reason, time) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					reject(reason);
				}, time);
			});
		};
	}

	//向外暴露Promise函数
	window.Promise = Promise;
})(window);
