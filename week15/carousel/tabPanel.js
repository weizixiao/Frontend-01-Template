import { Wrapper, Text, create } from './createElement';
export class Panel {
    constructor (config) {
        this.position = 0;
        this.children = [];
        this.root = null;
        this.title = config.title;
        this.state = Object.create(null);
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

    select(i) {
        for (const view of this.childView) {
            view.style.display = "none";
        }
        this.childView[i].stype.display = "";
    }

    render (){
        this.childView = this.children.map(child => <div>{child}</div>);
        this.titleView = <h1 style="background: red; width: 300px">{this.title}</h1>;
        return <div class='panel'>
            {this.titleView}
            {this.childView}
        </div>;
    }
}
