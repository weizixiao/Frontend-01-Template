// realm里面的对象
var queue = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
];
var set = new Set();
let current;
while(queue.length) {
    current = queue.shift();
    if (set.has(current)) continue;
    set.add(current);
    console.log(current);
    for (let p of Object.getOwnPropertyNames(current)) {
        var property = Object.getOwnPropertyDescriptor(current, p);
        if (property.hasOwnProperty("value") &&  property.value instanceof Object) {
            queue.push(property.value);
        }
        // if (property.hasOwnProperty("get") &&  property.get instanceof Object) {
        //     queue.push(property.get);
        // }
        // if (property.hasOwnProperty("set") &&  property.get instanceof Object) {
        //     queue.push(property.set);
        // }
    }
}
