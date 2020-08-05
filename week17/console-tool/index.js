// https://stackoverflow.com/questions/10585683/how-do-you-edit-existing-text-and-move-the-cursor-around-in-the-terminal/10830168
// https://github.com/heapwolf/cdir/blob/223fe0039fade4fad2bb08c2f7affac3bdcf2f89/cdir.js#L24
var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

// var stdin = process.stdin;
// var stdout = process.stdout;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");


function getChar() {
    return new Promise(resolve => {
        stdin.once("data", key => {
            resolve(key);
        })
    });
}

function up (n = 1) {
    stdout.write("\033[" + n + "A");
}

function down (n = 1) {
    stdout.write("\033[" + n + "B");
}

function right (n = 1) {
    stdout.write("\033[" + n + "C");
}

function left (n = 1) {
    stdout.write("\033[" + n + "D");
}

void async function() {
    stdout.write("which do you want choose?\n");
    let answer = await select(["vue", "react", "angular"]);
    stdout.write("your has choose " + answer + "\n");
    process.exit();
}()

async function select(choices) {
    let selected = 0;
    for (let i = 0; i < choices.length; i++) {
        if (i === selected) {
            stdout.write("[x] " + choices[i] + "\n");
        } else {
            stdout.write("[ ] " + choices[i] + "\n");
        }
    }
    up(choices.length);
    right();
    while(true) {
        let char = await getChar();
        if (char === "\u0003") {
            process.exit();
            break;
        }

        if (char === "w" && selected > 0) {
            stdout.write(" ");
            left();
            selected--;
            up();
            stdout.write("x");
            left();
        }

        if (char === "s" && selected < choices.length - 1) {
            stdout.write(" ");
            left();
            selected++;
            down();
            stdout.write("x");
            left();
        }
        if (char === "\r") {
            down(choices.length - selected);
            return choices[selected];
        }
    }
}