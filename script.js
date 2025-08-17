// Achievement bonus flags TODO: rename
let achievement1BonusApplied = localStorage.getItem('achievement1BonusApplied') === 'true';
let achievement2BonusApplied = localStorage.getItem('achievement2BonusApplied') === 'true';
let achievement3BonusApplied = localStorage.getItem('achievement3BonusApplied') === 'true';
let achievement4BonusApplied = localStorage.getItem('achievement4BonusApplied') === 'true';
let achievement5BonusApplied = localStorage.getItem('achievement5BonusApplied') === 'true';
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
let autoClickPower = Number(localStorage.getItem('autoClickPower')) || 0;
let clickCount = Number(localStorage.getItem('clickCounter')) || 0;
let upgradeCount1 = Number(localStorage.getItem('upgradeCount1')) || 0;
let upgradeCount2 = Number(localStorage.getItem('upgradeCount2')) || 0;
let upgradeCount3 = Number(localStorage.getItem('upgradeCount3')) || 0;
let upgradeCount4 = Number(localStorage.getItem('upgradeCount4')) || 0;
let basePriceSize = 1.1; // Base price size for upgrades
let lastMilestone = Number(localStorage.getItem('lastMilestone')) || 0;





// Score
const scoreEl = document.getElementById("score");
const clickBtn = document.getElementById("click-btn");
// Upgrades
const upgradeBtn = document.getElementById("upgrade-btn");
const upgrade2Btn = document.getElementById("upgrade2-btn");
const upgrade3Btn = document.getElementById("upgrade3-btn");
const upgrade4Btn = document.getElementById("upgrade4-btn");
// Test Boost Button
const testBoostBtn = document.getElementById("test-boost-btn");
const resetBtn = document.getElementById("reset-btn");
// Counters
const totalScoreCounter = document.getElementById("total-score-counter");
const clickCounter = document.getElementById("click-counter");
const preClickCounter = document.getElementById("pre-click-counter");
const preSecondCounter = document.getElementById("per-second-counter");
// Achivements
const achievement1 = document.getElementById("first-1k-coins");
const achievement2 = document.getElementById("100-clicks");
const achievement3 = document.getElementById("each-ubgrade-bought");
const achievement4 = document.getElementById("10-ubgrades-were-bought");
const achievement5 = document.getElementById("all-to-max-level");



function updateUI() {
  scoreEl.textContent = score;
  upgradeBtn.textContent = `Basic \n Cost: ${parseInt(10 * Math.pow(basePriceSize, upgradeCount1))} coins\n Lvl: ${upgradeCount1}\n curent bonus: +${upgradeCount1*1}/click`;
  upgrade2Btn.textContent = `Super \n Cost: ${parseInt(50 * Math.pow(basePriceSize, upgradeCount2))} coins\n Lvl: ${upgradeCount2}\n curent bonus: +${upgradeCount2*10}/click`;
  upgrade3Btn.textContent = `Mega \n Cost: ${parseInt(200 * Math.pow(basePriceSize, upgradeCount3))} coins\n Lvl: ${upgradeCount3}\n curent bonus: +${upgradeCount3*20}/click`;
  upgrade4Btn.textContent = `Auto \n Cost: ${parseInt(20 * Math.pow(basePriceSize, upgradeCount4))} coins\n Lvl: ${upgradeCount4}\n curent bonus: +${upgradeCount4*1}/second`;
  testBoostBtn.textContent = `+100k`;

  if (totalScoreCounter) totalScoreCounter.textContent = totalScore;
  if (clickCounter) clickCounter.textContent = clickCount;
  if (preClickCounter) preClickCounter.textContent = clickPower;
  if (preSecondCounter) preSecondCounter.textContent = autoClickPower;
}

// Відновлення статусу досягнень при завантаженні сторінки
if (achievement1BonusApplied) {
  achievement1.textContent = "First 1k coins!";
}
if (achievement2BonusApplied) {
  achievement2.textContent = "100 clicks!";
}
if (achievement3BonusApplied) {
  achievement3.textContent = "Each upgrade bought!";
}
if (achievement4BonusApplied) {
  achievement4.textContent = "10 upgrades bought!";
}
if (achievement5BonusApplied) {
  achievement5.textContent = "All upgrades were bought!";
}
updateUI();

// autoClick each second
setInterval(() => {
  if (autoClickPower > 0) {
    score += autoClickPower;
    totalScore += autoClickPower;
    localStorage.setItem('score', score);
    localStorage.setItem('totalScore', totalScore);
    checkDifficulty();
    updateUI();
  }
}, 1000);

clickBtn.addEventListener("click", () => {
  score += clickPower;
  totalScore += clickPower;
  clickCount += 1;
  localStorage.setItem('score', score);
  localStorage.setItem('totalScore', totalScore);
  localStorage.setItem('clickCounter', clickCount);
  checkDifficulty();
  checkAchievements();  // this also run updateUI()
  playSound(clickSound);
});


// upgrade buttons functionality
upgradeBtn.addEventListener("click", () => {
  const upgradeCost = parseInt(10 * Math.pow(basePriceSize, upgradeCount1));
  if (upgradeCount1 >= 100 || upgradeCost > Number.MAX_SAFE_INTEGER) {
    playSound(noMoneySound);
    return;
  }
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower++;
    upgradeCount1++;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    localStorage.setItem('upgradeCount1', upgradeCount1);
    playSound(upgradeSound);
    checkDifficulty();
    checkAchievements();  // this also run updateUI()
  } else {
    playSound(noMoneySound);
  }
});
upgrade2Btn.addEventListener("click", () => {
  const upgradeCost = parseInt(50 * Math.pow(basePriceSize, upgradeCount2));
  if (upgradeCount2 >= 100 || upgradeCost > Number.MAX_SAFE_INTEGER) {
    playSound(noMoneySound);
    return;
  }
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower += 5;
    upgradeCount2++;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    localStorage.setItem('upgradeCount2', upgradeCount2);
    playSound(upgradeSound);
    checkDifficulty();
    checkAchievements();  // this also run updateUI()
  } else {
    playSound(noMoneySound);
  }
});

upgrade3Btn.addEventListener("click", () => {
  const upgradeCost = parseInt(200 * Math.pow(basePriceSize, upgradeCount3));
  if (upgradeCount3 >= 100 || upgradeCost > Number.MAX_SAFE_INTEGER) {
    playSound(noMoneySound);
    return;
  }
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower += 20;
    upgradeCount3++;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    localStorage.setItem('upgradeCount3', upgradeCount3);
    playSound(upgradeSound);
    checkDifficulty();
    checkAchievements();  // this also run updateUI()
  } else {
    playSound(noMoneySound);
  }
});

upgrade4Btn.addEventListener("click", () => {
  const upgradeCost = parseInt(20 * Math.pow(basePriceSize, upgradeCount4));
  if (upgradeCount4 >= 100 || upgradeCost > Number.MAX_SAFE_INTEGER) {
    playSound(noMoneySound);
    return;
  }
  if (score >= upgradeCost) {
    score -= upgradeCost;
    autoClickPower += 1;
    upgradeCount4++;
    localStorage.setItem('score', score);
    localStorage.setItem('autoClickPower', autoClickPower);
    localStorage.setItem('upgradeCount4', upgradeCount4);
    playSound(upgradeSound);
    checkDifficulty();
    updateUI();
  } else {
    playSound(noMoneySound);
  }
});

testBoostBtn.addEventListener("click", () => {
    testBoostBtn.textContent = "This btn not for you=)";
//   const upgradeCost = 0;
//   if (score >= upgradeCost) {
//     score -= upgradeCost;
//     score += 10000000000;
//     localStorage.setItem('score', score);
//     localStorage.setItem('clickPower', clickPower);
//     updateUI();
//   }
});
resetBtn.addEventListener("click", () => {
    // TODO: Think if I need to refresh all counters
    totalScore = 0;
    clickCount = 0;
    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('clickCounter', clickCount);
    // 
    // Refresh upgrades info
    upgradeCount1 = 0;
    upgradeCount2 = 0;
    upgradeCount3 = 0;
    upgradeCount4 = 0;
    localStorage.setItem('upgradeCount1', upgradeCount1);
    localStorage.setItem('upgradeCount2', upgradeCount2);
    localStorage.setItem('upgradeCount3', upgradeCount3);
    localStorage.setItem('upgradeCount4', upgradeCount4);
    // Refresh achievements
    // achievement1.classList.remove('unlocked');
    // achievement2.classList.remove('unlocked');
    // achievement3.classList.remove('unlocked');
    achievement1BonusApplied = false;
    achievement2BonusApplied = false;
    achievement3BonusApplied = false;
    achievement4BonusApplied = false;
    achievement5BonusApplied = false;
    localStorage.setItem('achievement1BonusApplied', 'false');
    localStorage.setItem('achievement2BonusApplied', 'false');
    localStorage.setItem('achievement3BonusApplied', 'false');
    localStorage.setItem('achievement4BonusApplied', 'false');
    localStorage.setItem('achievement5BonusApplied', 'false');
    
    // Refresh current score
    score = 0;
    clickPower = 1;
    autoClickPower = 0;
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    localStorage.setItem('autoClickPower', autoClickPower);
    // Refresh price lvl
    lastMilestone = 0;
    localStorage.setItem('lastMilestone', '0');


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

function checkAchievements() {
  // First 1k coins
  if (score >= 1000) {
    if (!achievement1BonusApplied) {
      achievement1.textContent = "First 1k coins!";
      clickPower += 10;
      achievement1BonusApplied = true;
      localStorage.setItem('clickPower', clickPower);
      localStorage.setItem('achievement1BonusApplied', 'true');
    }
    updateUI();
  }
  // 100 manual clicks
  if (clickCount >= 100) {
    if (!achievement2BonusApplied) {
      achievement2.textContent = "100 clicks!";
      autoClickPower += 1;
      achievement2BonusApplied = true;
      localStorage.setItem('autoClickPower', autoClickPower);
      localStorage.setItem('achievement2BonusApplied', 'true');
    }
    updateUI();
  }
  // Each upgrade bought
  if ((upgradeCount1 > 0 && upgradeCount2 > 0 && upgradeCount3 > 0 && upgradeCount4 > 0)) {
      if (!achievement3BonusApplied) {
        achievement3.textContent = "Each upgrade bought!";
        score += 1000;
        totalScore += 1000;
        achievement3BonusApplied = true;
        localStorage.setItem('score', score);
        localStorage.setItem('achievement3BonusApplied', 'true');
      }
    updateUI();

    }
  
   // 10 upgrades bought
   const totalUpgrades = upgradeCount1 + upgradeCount2 + upgradeCount3 + upgradeCount4;
  if (totalUpgrades >= 10) {
      if (!achievement4BonusApplied) {
        achievement4.textContent = "10 upgrades were bought!";
        autoClickPower += 5;
        achievement4BonusApplied = true;
        localStorage.setItem('autoClickPower', autoClickPower);
        localStorage.setItem('achievement4BonusApplied', 'true');
      }
    updateUI();
    }
    // All upgrades bought
  if (totalUpgrades >= 400) {
      if (!achievement5BonusApplied) {
        achievement5.textContent = "All upgrades bought!";
        score = Number.MAX_SAFE_INTEGER;
        totalScore = Number.MAX_SAFE_INTEGER;
        achievement5BonusApplied = true;
        localStorage.setItem('score', score);
        localStorage.setItem('achievement5BonusApplied', 'true');
      }
    updateUI();
    }
    checkDifficulty();
    updateUI();
  }
checkAchievements();


function checkDifficulty() {
  let milestone = Math.floor(totalScore / 100000);
  if (milestone > lastMilestone) {
    basePriceSize *= 1.01;
    lastMilestone = milestone;
    console.log("New difficulty level reached:", milestone);
  }
}


