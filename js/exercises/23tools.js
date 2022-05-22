function move(obj, attr, target, speed, callback) {
	// 关闭上一个定时器
	clearInterval(obj.timer);

	// 获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));

	// 判断speed正负值
	if (current > target) {
		speed = -speed;
	}

	// 开启一个定时器，用来执行动画效果
	// 向执行动画的对象中添加一个timer属性，用来保存她自己的定时器标识
	obj.timer = setInterval(function () {
		// 获取box1原来left值
		var oldValue = parseInt(getStyle(obj, attr));

		// 在旧值基础上增加
		var newValue = oldValue + speed;

		// 向左移动时，需要判断 newValue 是否 小于target
		// 向右移动时，需要判断 newValue 是否 大于target
		if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		// 将新值设置给box1
		obj.style[attr] = newValue + "px";

		// 当元素执行到500px时，使其停止动画
		if (newValue == target) {
			clearInterval(obj.timer);

			// 动画执行完毕，调用回调函数
			callback && callback();
		}
	}, 100);
}

function getStyle(obj, name) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}

/* 定义一个函数，用来向一个元素中添加指定的 class属性值
                参数  obj 要添加class属性的元素
                     cn  要添加class值
            */

function addClass(obj, cn) {
	// 检查obj中是否含有cn
	if (!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}
}

/* 判断一个函数中，是否含有指定的 class属性值
                如果有，返回true，没有则返回false
            */
function hasClass(obj, cn) {
	// 判断obj中是否含有 cn class
	var reg = new RegExp("\\b" + cn + "\\b");

	return reg.test(obj.className);
}

/* 删除一个元素中指定的class属性
            
            */
function removeClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");

	// 删除class
	obj.className = obj.className.replace(reg, "");
}

/* toggleClass 可以用来切换一个类
                如果元素中有该类，则删除；
                如果元素中没有该类，则添加。
            
            */
function toggleClass(obj, cn) {
	// 判断obj中是否含有cn
	if (hasClass(obj, cn)) {
		removeClass(obj, cn);
	} else {
		addClass(obj, cn);
	}
}
