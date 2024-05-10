# harexs-emitter

a simple event emitter

## Install

```
$ npm install @harexs/emitter
```

## Usage

```js
import harexsEmitter from "@harexs/emitter";

const emitter = harexsEmitter();

emitter.on("harexs", (e) => console.log(e));
//or by once
emitter.once("harexs"); //remove itself after use emit

emitter.emit("harexs", "whoami");
// remove emit
emitter.off("harexs");
```
