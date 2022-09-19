export interface Emitter {
	all: Map<string, unknown>;
	on(type: string, fn: Function, thisArg?: any): void;
	emit(type: string, ...args: []): void;
	once(type: string, fn: Function, thisArg?: any): void;
	off(type: string, fn?: Function): void;
}

export default function HarexsMitt(all: Map<string, unknown>): Emitter;
