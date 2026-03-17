const words = ["crane", "slate", "stare", "flame", "grape"];

let feedback = ["b","b","b","b","b"];

const grid = document.getElementById("grid");

// create boxes
for (let i = 0; i < 5; i++) {
    let div = document.createElement("div");
    div.classList.add("box", "black");

    div.onclick = () => toggle(div, i);

    grid.appendChild(div);
}

function toggle(el, i) {
    if (feedback[i] === "b") {
        feedback[i] = "y";
        el.className = "box yellow";
    } else if (feedback[i] === "y") {
        feedback[i] = "g";
        el.className = "box green";
    } else {
        feedback[i] = "b";
        el.className = "box black";
    }
}

function matches(word, guess, feedback) {
    for (let i = 0; i < 5; i++) {
        if (feedback[i] === "g" && word[i] !== guess[i]) return false;
        if (feedback[i] === "y" && (!word.includes(guess[i]) || word[i] === guess[i])) return false;
        if (feedback[i] === "b" && word.includes(guess[i])) return false;
    }
    return true;
}

function solve() {
    let guess = document.getElementById("guessInput").value.toLowerCase();

    if (guess.length !== 5) {
        alert("Enter 5-letter word");
        return;
    }

    let result = words.filter(w => matches(w, guess, feedback));

    document.getElementById("output").innerText =
        result.length ? result.join(", ") : "No matches 😢";
}
