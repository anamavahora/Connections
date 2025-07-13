const wordSets = {
  easy: [
    { group: "Fruits", words: ["Apple", "Banana", "Grape", "Orange"] },
    { group: "Colors", words: ["Red", "Blue", "Yellow", "Green"] },
    { group: "Animals", words: ["Dog", "Cat", "Lion", "Bear"] },
    { group: "Shapes", words: ["Circle", "Square", "Triangle", "Star"] }
  ],
  medium: [
    { group: "Instruments", words: ["Piano", "Violin", "Guitar", "Drum"] },
    { group: "Planets", words: ["Mars", "Venus", "Earth", "Jupiter"] },
    { group: "Jobs", words: ["Teacher", "Doctor", "Chef", "Pilot"] },
    { group: "Transport", words: ["Car", "Train", "Plane", "Boat"] }
  ],
  hard: [
    { group: "Emotions", words: ["Joy", "Fear", "Anger", "Love"] },
    { group: "Languages", words: ["Python", "Java", "Ruby", "Swift"] },
    { group: "Currency", words: ["Dollar", "Euro", "Rupee", "Yen"] },
    { group: "Tools", words: ["Hammer", "Screwdriver", "Wrench", "Saw"] }
  ]
};

let selectedWords = [];
let foundGroups = [];
let currentWords = [];
let wordToGroup = {};

function startGame() {
  const level = document.getElementById("levelSelect").value;
  const board = document.getElementById("gameBoard");
  const found = document.getElementById("foundGroups");
  const msg = document.getElementById("message");
  board.innerHTML = "";
  found.innerHTML = "";
  msg.textContent = "";
  selectedWords = [];
  foundGroups = [];
  currentWords = [];
  wordToGroup = {};

  const wordList = wordSets[level].flatMap(set => {
    set.words.forEach(word => wordToGroup[word] = set.group);
    return set.words;
  });

  currentWords = shuffleArray(wordList);

  currentWords.forEach(word => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.onclick = () => selectWord(btn, word);
    board.appendChild(btn);
  });
}

function selectWord(btn, word) {
  if (btn.classList.contains("found")) return;
  if (btn.classList.contains("selected")) {
    btn.classList.remove("selected");
    selectedWords = selectedWords.filter(w => w !== word);
  } else if (selectedWords.length < 4) {
    btn.classList.add("selected");
    selectedWords.push(word);
  }
}

function submitSelection() {
  const msg = document.getElementById("message");
  if (selectedWords.length !== 4) {
    msg.textContent = "Select exactly 4 words!";
    return;
  }

  const groupName = wordToGroup[selectedWords[0]];
  const allSameGroup = selectedWords.every(word => wordToGroup[word] === groupName);

  if (allSameGroup && !foundGroups.includes(groupName)) {
    foundGroups.push(groupName);
    markFound(selectedWords);
    document.getElementById("foundGroups").innerHTML += `<p><strong>${groupName}</strong> ✓</p>`;
    msg.textContent = "✅ Correct group!";
  } else {
    msg.textContent = "❌ Try again!";
  }

  clearSelection();

  if (foundGroups.length === 4) {
    msg.textContent = "🎉 You solved them all!";
  }
}

function clearSelection() {
  const buttons = document.querySelectorAll(".board button");
  buttons.forEach(btn => btn.classList.remove("selected"));
  selectedWords = [];
}

function markFound(words) {
  const buttons = document.querySelectorAll(".board button");
  buttons.forEach(btn => {
    if (words.includes(btn.textContent)) {
      btn.classList.add("found");
      btn.disabled = true;
    }
  });
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
