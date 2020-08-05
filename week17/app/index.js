var Generator = require('yeoman-generator');

module.exports = class extends Generator {
      // The name `constructor` is important here
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.answers = await this.prompt([
        {
            type: "confirm",
            name: "cool",
            message: "Would you like to enable the Cool feature?"
        }
        ]);
    }

    writing() {
        this.log("cool feature", this.answers.cool); // user answer `cool` used
    }
};