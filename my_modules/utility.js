
function getRandomLeg() {
    return Math.round(Math.random() * (5 - 4 * 1)) + 4;
  }
  
  function getRandomStart() {
    return Math.round(Math.random());
  }

  module.exports = {
    getRandomLeg,
    getRandomStart
  };