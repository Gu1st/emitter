interface emitFn extends Function {
    _?: () => {};
}
export default function HarexsMitt(data?: Map<string, any>): {
    allData: Map<any, any>;
    on: (type: string, fn: emitFn, thisArg?: any) => void;
    emit: (type: string, ...evt: any[]) => void;
    off: (type: string, fn: emitFn) => void;
    once: (type: string, fn: emitFn, thisArg?: any) => void;
};
export {};
