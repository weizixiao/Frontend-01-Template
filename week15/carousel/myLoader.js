const parser = require("./parser.js");
module.exports = function(source, map) {
    let tree = parser.parseHTML(source);
    // console.log(tree.children[1].children[0].content);
    
    let tempate = null;
    let script = null;

    for (let node of tree.children) {
        if (node.tagName === "template")
            tempate = node;
        if (node.tagName === "script")
            script = node.children[0].content
    }

    let createCode = "";

    console.log(tempate);

    let visit = (node, depth) => {
        if (node.type === "text") {
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for (const attribute of node.attributes) {
            attrs[attribute.name] = attribute.value;
        }

        let children = node.children.map(node => visit(node));
        return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
    }
    // console.log(createCode);
    let r = `
        import { Wrapper, Text, create } from './createElement';
        export class Carousel{
            render() {
                ${visit(tempate)}
            }
        }
    `;
    console.log(r);
    return r;
}