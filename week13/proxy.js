let handlers = new Map();
let reacvities = new Map();

let usedReacvities = [];

let object = {
    a: 1,
    b: 2
}

// let proxy = new Proxy(object, {
//     get(obj, prop) {
//         console.log(obj, prop);
//     }
// })


function reactive(obj) {
    if (reacvities.has(obj)) {
        return reacvities.get(obj);
    }
    let proxy = new Proxy(obj, {
        get(obj, prop) {
            console.log(obj, prop);
            usedReacvities.push([obj, prop]);
            if (typeof obj[prop] === "object") {
                return reactive(obj[prop]);
            }
            return obj[prop];
        },
        set(obj, prop, val) {
            console.log(obj, prop, val);
            obj[prop] = val;
            if (handlers.get(obj)) {
                if (handlers.get(obj).get(prop)) {
                    for (const handler of handlers.get(obj).get(prop)) {
                        handler();
                    }
                }
            }
            return obj[prop];
        }
    });
    reacvities.set(obj, proxy);
    return proxy;
}

function effect(handler) {
    usedReacvities = [];
    handler();
    console.log(handler);
    // handlers.push(handler);
    for (const usedReacvity of usedReacvities) {
        let [obj, prop] = usedReacvity;
        if (!handlers.get(obj)) {
            handlers.set(obj, new Map())
        }

        if (!handlers.get(obj).get(prop)) {
            handlers.get(obj).set(prop, [])
        }
        handlers.get(obj).get(prop).push(handler);
    }
}

let dummy;
let proxy = reactive(object);
effect(() => dummy = proxy.a);
console.log(dummy);
proxy.a = 2;
console.log(dummy);