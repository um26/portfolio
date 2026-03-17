const words = ["crane", "slate", "stare", "flame", "grape"];

function matches(word, guess, feedback) {
    for (let i = 0; i < 5; i++) {
        if (feedback[i] === "g" && word[i] !== guess[i]) return false;
        if (feedback[i] === "y" && (!word.includes(guess[i]) || word[i] === guess[i])) return false;
        if (feedback[i] === "b" && word.includes(guess[i])) return false;
    }
    return true;
}

function solve() {
    let guess = document.getElementById("guess").value;
    let feedback = document.getElementById("feedback").value.split(" ");

    let result = words.filter(w => matches(w, guess, feedback));

    document.getElementById("output").innerText = result.join(", ");
}
