export default function enableGesture(element) {
    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol("mouse");

    if (document.ontouchstart !== null)
        element.addEventListener("mousedown", (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL]);
            let mousemove = event => {
                // console.log(event.clientX, event.clientY);
                move(event, contexts[MOUSE_SYMBOL])
            }
            let mouseup = event => {
                end(event, contexts[MOUSE_SYMBOL]);
                document.removeEventListener("mousemove", mousemove);
                document.removeEventListener("mouseup", mouseup);
            }
            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseup);
        })


    element.addEventListener("touchstart", event => {
        // event.changedTouches[0]触发的起始元素
        for (const touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    })

    element.addEventListener("touchmove", event => {
        // console.log("move");
        for (const touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    })

    element.addEventListener("touchend", event => {
        // console.log("end");
        for (const touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    })
    // 系统事件进来，或者是系统手势
    element.addEventListener("touchcancel", event => {
        // console.log("cancel");
        for (const touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    })

    // 手势
    // tap
    // pan -> panstart panmove panend
    // flick
    // press -> pressstart pressend

    let start = (point, context) => {
        element.dispatchEvent(new CustomEvent("start", {
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        }));
        context.startX = point.clientX,
        context.startY = point.clientY;
        context.moves = [];
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;

        context.timehandler = setTimeout(() => {
            if (context.isPan) return;

            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            element.dispatchEvent(new CustomEvent("pressstart", { }));
        }, 500);
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY;
        // console.log("move", dx, dy);

        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress)
                element.dispatchEvent(new CustomEvent("presscancel", { }));
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            // console.log("panStart");
            element.dispatchEvent(Object.assign(new CustomEvent("panstart"), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }));
        }

        if (context.isPan) {
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            });    
            context.moves = context.moves.filter(record => (Date.now() - record.t) < 300);
            element.dispatchEvent(Object.assign(new CustomEvent("pan"), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }));
        }
    }

    let end = (point, context) => {
        if (context.isTap)
            element.dispatchEvent(new CustomEvent("tap", {}));
        if (context.isPress)
            element.dispatchEvent(new CustomEvent("pressend", {}));
        if (context.isPan) {
            let dx = point.clientX - context.startX,
                dy = point.clientY - context.startY;
            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            let isFlick = speed > 2.5;
            if (isFlick) {
                element.dispatchEvent(Object.assign(new CustomEvent("flick"), {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed
                }));
            }
            element.dispatchEvent(Object.assign(new CustomEvent("panend"), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed,
                isFlick
            }));
        }

        clearTimeout(context.timehandler);
    }

    let cancel = (point, context) => {
        element.dispatchEvent(new CustomEvent("canceled", {}));
        clearTimeout(context.timehandler);
    }
}
