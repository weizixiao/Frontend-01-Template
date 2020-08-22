var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    collecting() {
        this.log('method 1 just ran');
    }

    creating() {
        this.fs.copyTpl(
            this.templatePath("package.json"),
            this.destinationPath("package.json"),
            { title: "sss" }
        );
        this.fs.copyTpl(
            this.templatePath("createElement.js"),
            this.destinationPath("lib/createElement.js"),
            { title: "createElement" }
        );
        this.fs.copyTpl(
            this.templatePath("main.js"),
            this.destinationPath("src/main.js"),
            { title: "main" }
        );
        this.fs.copyTpl(
            this.templatePath("main.test.js"),
            this.destinationPath("test/main.test.js"),
            { title: "test" }
        );
        this.fs.copyTpl(
            this.templatePath("gesture.js"),
            this.destinationPath("lib/gesture.js"),
            { title: "gesture" }
        );
        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath("index.html"),
            { title: "template with yemo" }
        );
        this.fs.copyTpl(
            this.templatePath("webpack.config.js"),
            this.destinationPath("webpack.config.js"),
            { title: "template with yemo" }
        );
        this.npmInstall([
            "webpack",
            "webpack-cli",
            "webpack-dev-server",
            "@babel/core",
            "@babel/preset-env",
            "@babel/plugin-transform-react-jsx",
            "babel-loader",
            "mocha",
            "nyc",
            "@istanbuljs/nyc-config-babel",
            "babel-plugin-istanbul"
        ], {"save-dev": true})
    }
};