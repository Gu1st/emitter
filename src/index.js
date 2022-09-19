export default function HarexsMitt(all = new Map()) {
	return {
		all,
		//支持this指向 - tiny-mitter
		on(type, fn, thisArg) {
			const handlers = all.get(type);
			const newFn = fn.bind(thisArg); //支持this
			newFn._ = fn; //用于删除时函数对比
			if (handlers) {
				//通过bind 支持this指向
				handlers.push(newFn);
			} else {
				all.set(type, [newFn]);
			}
		},
		emit(type, ...evt) {
			const handlers = all.get(type);
			if (handlers) {
				//由于可能会碰到once splice移除的操作 导致索引变化问题 不能正确触发函数
				//所以使用 slice 创建一个副本来 执行
				handlers.slice().forEach((handler) => handler(...evt));
			}
			//默认会触发 * 的事件 - mitt
			const everys = all.get("*");
			if (everys) {
				everys.slice().forEach((every) => every(...evt));
			}
		},
		//支持once事件 - tiny-mitter
		once(type, fn, thisArg = window) {
			let handlers = all.get(type);
			function onceFn() {
				//函数执行时 重新获取一次 handlers
				handlers = all.get(type);
				fn.apply(thisArg, arguments);
				//一旦执行后 就移除本次订阅的事件
				handlers.splice(handlers.indexOf(onceFn) >>> 0, 1);
			}
			//用于移除时对比
			onceFn._ = fn;

			if (handlers) {
				handlers.push(onceFn);
			} else {
				all.set(type, [onceFn]);
			}
		},
		off(type, fn) {
			let handlers = all.get(type);
			let newFnAry = [];
			if (handlers) {
				if (fn) {
					handlers.forEach((handler) => {
						if (handler._ !== fn) {
							newFnAry.push(handler);
						}
					});
					//如果有匹配到的函数 则使用接收了这些函数的newFnAry赋值
					newFnAry.length
						? (handlers = newFnAry.slice())
						: all.set(type, []);
				} else {
					//重置type
					all.set(type, []);
				}
			}
		},
	};
}
