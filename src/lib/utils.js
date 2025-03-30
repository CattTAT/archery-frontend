export function getScoreColor(score) {
  if (!isNaN(score)) {
    score = parseInt(score);
  }
  switch (score) {
    case "X":
    case 10:
    case 9:
      return "#FFF946";
    case 8:
    case 7:
      return "#FF5959";
    case 6:
    case 5:
      return "#4D99E5";
    case 4:
    case 3:
      return "black";
    case "M":
      return "#ABABAB";
    default:
      return "white";
  }
}

export function getRealScore(score) {
  switch (score) {
    case "X":
      return 10;
    case "M":
      return 0;
    default:
      return +score;
  }
}


