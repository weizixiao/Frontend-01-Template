function match (string) {
    let foundA = false;
    for (const c of string) {
        if (c === "a") {
            foundA = true;
        } else if (foundA && c == "b") {
            return true;
        } else {
            foundA = false;
        }
    }
    return false;
}

console.log(match("I abm b groot"));





