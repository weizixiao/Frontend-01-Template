import { Wrapper, Text, create } from './createElement';
import { Timeline, Animation } from "./animation.js"
import { ease } from "./cubicBezier.js";

class Carousel {
    constructor () {
        this.position = 0;
        this.children = [];
        this.root = null;
        this.timeline = new Timeline();
    }
    setAttribute (name, value) {
        this[name] = value;
    }
    appendChild (child) {
        this.children.push(child);
    }
    mountTo (parent) {
        const render = this.render();
        this.root = render.root;
        render.mountTo(parent);

        this.autoplay && this.loop();
    }
    loop () {
        this.nextPicStopHandler = null;
        let run = () => {
            this.next();
            this.nextPicStopHandler = setTimeout(run, this.duration);
        }

        this.nextPicStopHandler = setTimeout(run, this.duration);
    }

    next () {
        let nextPosition = (this.position + 1) % this.data.length;
        let current = this.root.children[this.position];
        let next = this.root.children[nextPosition];

        let currentAnimation = new Animation(current.style, "transform", v => `translateX(${5 * v}px)`, -100 * this.position,
            -100 - 100 * this.position, 500, 0, ease);
        let nextAnimation = new Animation(next.style, "transform", v => `translateX(${5 * v}px)`, 100 - 100 * nextPosition,
            -100 * nextPosition, 500, 0, ease);
        
        this.timeline.add(currentAnimation);
        this.timeline.add(nextAnimation);

        this.position = nextPosition;
    }

    render (){
        this.timeline.start();
        let children = this.data.map((url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;

            let offset = 0;
            let onStart = () => {
                this.timeline.pause();
                clearTimeout(this.nextPicStopHandler);

                let currentElement = children[currentPosition].root;
                let currentTransformValue = Number(currentElement.style.transform.match(/^translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            }
            let onPan = event => {
                let lastElement = children[lastPosition].root;
                let currentElement = children[currentPosition].root;
                let nextElement = children[nextPosition].root;

                let currentTransformValue = -500 * currentPosition + offset;
                let lastTransformValue = -500 -500 * lastPosition + offset;
                let nextTransformValue = 500 -500 * nextPosition + offset;

                let dx = event.clientX - event.startX;
                lastElement.style.transform = `translateX(${lastTransformValue + dx}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue + dx}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue + dx}px)`;
                // console.log("currentTransformValue", currentTransformValue);
            }

            let onPanend = (event) => {
                let lastElement = children[lastPosition].root;
                let currentElement = children[currentPosition].root;
                let nextElement = children[nextPosition].root;
                let direction = 0;
                let dx = event.clientX - event.startX;
                if (dx + offset > 250) {
                    direction = 1;
                } else if (dx + offset < -250) {
                    direction = -1;
                }
                this.timeline.restart();

                let lastAnimation = new Animation(lastElement.style, "transform", v => `translateX(${v}px)`,
                    -500 - 500 * lastPosition + offset + dx,
                    -500 - 500 * lastPosition + direction * 500, 500, 0, ease);
                let currentAnimation = new Animation(currentElement.style, "transform", v => `translateX(${v}px)`, 
                    -500 * currentPosition + offset + dx,
                    - 500 * currentPosition + direction * 500, 500, 0, ease);
                let nextAnimation = new Animation(nextElement.style, "transform", v => `translateX(${v}px)`, 
                    500 - 500 * nextPosition + offset + dx,
                    500 -500 * nextPosition + direction * 500, 500, 0, ease);
                this.timeline.add(lastAnimation);
                this.timeline.add(currentAnimation);
                this.timeline.add(nextAnimation);

                this.position = (this.position - direction + this.data.length) % this.data.length;

                this.loop();
            }
            const item = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} alt='carouselItem' class='carousel-item' />;
            item.root.style.transform = `translateX(0px)`;
            item.addEventListener('dragstart', e => e.preventDefault());
            return item;
        });
        return <div class='carousel'>
            {children}
        </div>;
    }
}

let data = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
];
let component = <Carousel data={data} duration={2000} autoplay>
                </Carousel>;
component.mountTo(document.body);
