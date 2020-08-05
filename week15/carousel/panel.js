import { Wrapper, Text, create } from './createElement';
export class Panel {
    constructor (config) {
        this.position = 0;
        this.children = [];
        this.root = null;
        this.title = config.title;
        // this.timeline = new Timeline();
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

    render (){
        return <div class='panel'>
            <h1 style="background: red; width: 300px">{this.title}</h1>
            {this.children}
        </div>;
    }
}
