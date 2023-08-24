
function getRandomLeg() {
    return Math.round(Math.random() * (5 - 4 * 1)) + 4;
  }
  
  function getRandomStart() {
    return Math.round(Math.random());
  }


  function getSpinRoulette() {
    let randomNumber = getRandomInt();
    return values[randomNumber];
}

function getRandomInt() {
    return Math.floor(Math.random() * (37 - 0 + 1)) + 0;
}

const values = {
    0: { number: 0, degrees: 5 },
    1: { number: 1,  degrees: 140.8 },
    2: { number: 2,  degrees: 306 },
    3: { number: 3,  degrees: 24.4 },
    4: { number: 4,  degrees: 326 },
    5: { number: 5,  degrees: 179.9 },
    6: { number: 6,  degrees: 268.7 },
    7: { number: 7,  degrees: 63.2 },
    8: { number: 8,  degrees: 210 },
    9: { number: 9,  degrees: 102 },
    10: { number: 10,  degrees: 190 },
    11: { number: 11, degrees: 230 },
    12: { number: 12, degrees: 43.8 },
    13: { number: 13, degrees: 249.3 },
    14: { number: 14, degrees: 121.4 },
    15: { number: 15, degrees: 346 },
    16: { number: 16, degrees: 160.2 },
    17: { number: 17, degrees: 288.1 },
    18: { number: 18, degrees: 82.6 },
    19: { number: 19, degrees: 336 },
    20: { number: 20, degrees: 131.1 },
    21: { number: 21, degrees: 317.2 },
    22: { number: 22, degrees: 92.3 },
    23: { number: 23, degrees: 200 },
    24: { number: 24, degrees: 170.2 },
    25: { number: 25, degrees: 297.8 },
    26: { number: 26, degrees: 14.7 },
    27: { number: 27, degrees: 258 },
    28: { number: 28, degrees: 53.5 },
    29: { number: 29, degrees: 72.9 },
    30: { number: 30, degrees: 220 },
    31: { number: 31, degrees: 111.7 },
    32: { number: 32, degrees: 355 },
    33: { number: 33, degrees: 150.5 },
    34: { number: 34, degrees: 278.4 },
    35: { number: 35, degrees: 34.1 },
    36: { number: 36, degrees: 240 },
};

// Function to calculate rewards
function calculateReward(randomNumber1, randomNumber2) {
    if (randomNumber1 === randomNumber2) {
      return "It's a Draw!";
    } else if (randomNumber1 < randomNumber2) {
      return "Player 2 WINS!";
    } else {
      return "Player 1 WINS!";
    }
  }
  
  // Function to calculate the winner
  function calculateWinner(randomNumber1, randomNumber2) {
    if (randomNumber1 === randomNumber2) {
      return "draw";
    } else if (randomNumber1 < randomNumber2) {
      return "player2";
    } else {
      return "player1";
    }
  }

  function rollTheDice() {
    const randomNumber1 = getRandomNumber();
    const randomNumber2 = getRandomNumber();
    return { randomNumber1, randomNumber2 };
  }
  
  function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

module.exports = {
    getSpinRoulette,
    calculateReward,
     calculateWinner,
     getRandomLeg,
    getRandomStart,
    rollTheDice
};





