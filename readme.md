# harexs-emitter

a simple event emitter

## Install

```
$ npm install harexs-emitter
```

## Usage

```js
// foo.js
import emitter from 'harexs-emitter';

emitter.on('harexs',(e)=>console.log(e));
//or
emitter.once('harexs'); //remove itself after use emit

emitter.emit('harexs','whoami');

emitter.off('harexs');

```