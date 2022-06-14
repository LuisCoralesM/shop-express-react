export function colorGenerator() {
  let r = randomNumber();
  let g = randomNumber();
  let b = randomNumber();
  return `rgb(${r},${g},${b})`;
}

function randomNumber(n = 255) {
  return Math.floor(Math.random() * 255).toString();
}
