interface emitFn extends Function {
  _?: () => {};
}
export default function HarexsMitt(data?: Map<string, any>) {
  const allData = data ? data : new Map();

  function on(type: string, fn: emitFn, thisArg?: any) {
    const handlers = allData.get(type);
    const newFn = fn.bind(thisArg); //支持this
    newFn._ = fn; //用于删除时函数对比
    if (handlers) {
      handlers.push(newFn);
    } else {
      allData.set(type, [newFn]);
    }
  }
  function emit(type: string, ...evt: any[]) {
    const handlers = allData.get(type);
    if (handlers) {
      //由于可能会碰到once splice移除的操作 导致索引变化问题 不能正确触发函数
      //所以使用 slice 创建一个副本来 执行
      handlers.slice().forEach((handler: Function) => handler(...evt));
    }
    //默认会触发 * 的事件 - mitt
    const everys = allData.get("*");
    if (everys) {
      everys.slice().forEach((every: Function) => every(...evt));
    }
  }
  function once(type: string, fn: Function, thisArg?: any) {
    let handlers = allData.get(type);
    function onceFn() {
      //函数执行时 重新获取一次 handlers
      handlers = allData.get(type);
      fn.apply(thisArg, arguments);
      //一旦执行后 就移除本次订阅的事件
      handlers.splice(handlers.indexOf(onceFn) >>> 0, 1);
    }
    //用于移除时对比
    onceFn._ = fn;

    if (handlers) {
      handlers.push(onceFn);
    } else {
      allData.set(type, [onceFn]);
    }
  }
  function off(type: string, fn?: emitFn) {
    let handlers = allData.get(type);
    let newFnAry: Function[] = [];
    if (handlers) {
      if (fn) {
        handlers.forEach((handler: emitFn) => {
          if (handler._ !== fn) {
            newFnAry.push(handler);
          }
        });
        //如果有匹配到的函数 则使用接收了这些函数的newFnAry赋值
        newFnAry.length ? (handlers = newFnAry.slice()) : allData.set(type, []);
      } else {
        allData.delete(type);
      }
    }
  }
  return { allData, on, emit, off, once };
}
