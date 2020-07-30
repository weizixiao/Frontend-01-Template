import { Wrapper, Text, create } from './createElement';
export class Carousel {
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

        let run = () => {
            this.next();
            setTimeout(run, this.duration);
        }
        this.timeline.start();
        setTimeout(run, this.duration);
    }

    next () {
        let nextPosition = (this.position + 1) % this.data.length;
        let current = this.root.children[this.position];
        let next = this.root.children[nextPosition];

        let currentAnimation = new Animation(current.style, "transform", v => `translateX(${v}%)`, -100 * this.position,
            -100 - 100 * this.position, 500, 0, ease);
        let nextAnimation = new Animation(next.style, "transform", v => `translateX(${v}%)`, 100 - 100 * nextPosition,
            -100 * nextPosition, 500, 0, ease);
        
        this.timeline.add(currentAnimation);
        this.timeline.add(nextAnimation);

        this.position = nextPosition;
    }
    // 上一张只可能是通过拖拽
    prev () {
        let prevPosition = (this.position - 1 + this.data.length) % this.data.length;
        let current = this.root.children[this.position];
        let prev = this.root.children[prevPosition];

        current.style.transition = 'ease 0.5s';
        prev.style.transition = 'ease 0.5s';

        current.style.transform = `translateX(${100 - 100 * this.position}%)`;
        prev.style.transform = `translateX(${ -100 * prevPosition}%)`;

        this.position = prevPosition;
    }
    render (){
        return <div class='carousel'>
            {this.data.map(url => {
                const item = <img src={url} alt='carouselItem' class='carousel-item' />;
                item.addEventListener('dragstart', e => e.preventDefault());
                return item;
            })}
        </div>;
    }
}