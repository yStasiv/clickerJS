let score = 0;
let clickPower = 1;

const scoreEl = document.getElementById("score");
const clickBtn = document.getElementById("click-btn");
const upgradeBtn = document.getElementById("upgrade-btn");

clickBtn.addEventListener("click", () => {
  score += clickPower;
  scoreEl.textContent = score;
});

upgradeBtn.addEventListener("click", () => {
  if (score >= 10) {
    score -= 10;
    clickPower++;
    scoreEl.textContent = score;
    upgradeBtn.textContent = `Апгрейд (${10 * clickPower} очок)`;
  }

  localStorage.setItem('score', score);
    score = Number(localStorage.getItem('score')) || 0;

    
});
