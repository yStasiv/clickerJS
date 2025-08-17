// ...existing code...
// Звук кліку
const clickSound = document.getElementById('click-sound');
const noMoneySound = document.getElementById('no-money-sound');
const upgradeSound = document.getElementById('upgrade-sound');
// Перемикання табів
const cityTab = document.getElementById('city-tab');
const achievementsTab = document.getElementById('achievements-tab');
const cityContent = document.getElementById('city-content');
const achievementsContent = document.getElementById('achievements-content');

cityTab.addEventListener('click', () => {
  cityTab.classList.add('active');
  achievementsTab.classList.remove('active');
  cityContent.style.display = '';
  achievementsContent.style.display = 'none';
});

achievementsTab.addEventListener('click', () => {
  achievementsTab.classList.add('active');
  cityTab.classList.remove('active');
  cityContent.style.display = 'none';
  achievementsContent.style.display = '';
});

let score = Number(localStorage.getItem('score')) || 0;
let totalScore = Number(localStorage.getItem('totalScore')) || 0;
let clickPower = Number(localStorage.getItem('clickPower')) || 1;
let clickCount = Number(localStorage.getItem('clickCounter')) || 0;


// Score
const scoreEl = document.getElementById("score");
const clickBtn = document.getElementById("click-btn");
// Upgrades
const upgradeBtn = document.getElementById("upgrade-btn");
const upgrade2Btn = document.getElementById("upgrade2-btn");
const upgrade3Btn = document.getElementById("upgrade3-btn");
// Test Boost Button
const testBoostBtn = document.getElementById("test-boost-btn");
const resetBtn = document.getElementById("reset-btn");
// Counters
const totalScoreCounter = document.getElementById("total-score-counter");
const clickCounter = document.getElementById("click-counter");
const preClickCounter = document.getElementById("pre-click-counter");
const preSecondCounter = document.getElementById("per-second-counter");




function updateUI() {
  scoreEl.textContent = score;
  upgradeBtn.textContent = `Апгрейд (${10 * clickPower} очок)`;
  upgrade2Btn.textContent = `Супер апгрейд (${50 * clickPower} очок)`;
  upgrade3Btn.textContent = `Мега апгрейд (${200 * clickPower} очок)`;
  testBoostBtn.textContent = `+100k`;

  if (totalScoreCounter) totalScoreCounter.textContent = totalScore;
  if (clickCounter) clickCounter.textContent = clickCount;
  if (preClickCounter) preClickCounter.textContent = clickPower;
  if (preSecondCounter) preSecondCounter.textContent = clickPower;
}

updateUI();

clickBtn.addEventListener("click", () => {
  score += clickPower;
  totalScore += clickPower;
  clickCount += 1;
  localStorage.setItem('score', score);
  localStorage.setItem('totalScore', totalScore);
  localStorage.setItem('clickCounter', clickCount);
  updateUI();
  playSound(clickSound);
});


// upgrade buttons functionality
upgradeBtn.addEventListener("click", () => {
  const upgradeCost = 10 * clickPower;
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower++;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    updateUI();
  } else {
    playSound(noMoneySound);
  }
});
upgrade2Btn.addEventListener("click", () => {
  const upgradeCost = 50 * clickPower;
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower += 5;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    updateUI();
  } else {
    playSound(noMoneySound);
  }
});

upgrade3Btn.addEventListener("click", () => {
  const upgradeCost = 200 * clickPower;
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower += 20;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    updateUI();
  } else {
    playSound(noMoneySound);
  }
});

testBoostBtn.addEventListener("click", () => {
  const upgradeCost = 0;
  if (score >= upgradeCost) {
    score -= upgradeCost;
    score += 100000;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    updateUI();
  }
});
resetBtn.addEventListener("click", () => {
    // TODO: Think if I need to refresh all counters
      totalScore = 0;
      clickCount = 0;
      localStorage.setItem('totalScore', totalScore);
      localStorage.setItem('clickCounter', clickCount);
    // 
  score = 0;
  clickPower = 1;
  localStorage.setItem('score', score);
  localStorage.setItem('clickPower', clickPower);

  updateUI();
});

function playSound(sound) {
    // Check if sound is defined before playing and playing it
  if (sound) {
    sound.currentTime = 0;
    sound.volume = 0.3; // Set volume to 10%
    sound.play().catch(error => {
        console.error("Error playing sound:", error);
    });
  }
}