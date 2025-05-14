let boxi = document.querySelectorAll('.box');
let msg = document.querySelector('.msg');
let msghide = document.querySelector('.msghide');
let btn = document.querySelector('#reset-game');

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWinner() {
  for (let pattern of winPatterns) {
    let [pv1, pv2, pv3] = pattern;
    if (board[pv1] && board[pv1] === board[pv2] && board[pv1] === board[pv3]) {
      msg.innerText = `Player ${board[pv1]} Wins!`;
      // addEventListener.winPatterns
      msghide.classList.remove("msghide");
      gameActive = false;

      boxi[pv1].classList.add("win");
      boxi[pv2].classList.add("win");
        boxi[pv3].classList.add("win");
      return;
    }
  }
    // if game draw !

    if (!board.includes("")) {
      msg.innerText = "It's a Draw!";
      msghide.classList.remove("msghide");
      gameActive = false;
  
      // highlight all boxes for draw
      boxi.forEach(box => box.classList.add("draw"));
    }

}



function handleBoxClick(evt) {
  const index = evt.target.getAttribute("data-index");

  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  evt.target.innerHTML = `<span class="${currentPlayer}">${currentPlayer}</span>`;
evt.target.classList.add(currentPlayer);



  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  msghide.classList.add("msghide");

  boxi.forEach(box => {
    box.innerHTML = ""; 
    box.classList.remove("X", "O", "win" ,"draw"); 
  });
}




boxi.forEach(box => {
  box.addEventListener("click", handleBoxClick);
});

btn.addEventListener("click", resetGame);