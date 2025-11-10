
// carAnimation.js — simple loop car around a given polyline

const CAR_COLOR = "#ED1C24";
const CAR_R = 7;

let carPath = [];
let carSegLens = [];
let carTotalLen = 0;
let carDist = 0;
let carSpeed = 1;

// call this in setup(), AFTER p5 is ready
function initCarPath_T3Rect() {
  carPath = [
    createVector(390, 225),
    createVector(425, 225),
    createVector(425, 275),
    createVector(390, 275),
    createVector(390, 225)
  ];
  carSegLens = [];
  carTotalLen = 0;
  for (let i = 0; i < carPath.length - 1; i++) {
    const d = p5.Vector.dist(carPath[i], carPath[i + 1]);
    carSegLens.push(d);
    carTotalLen += d;
  }
}

function advanceCar() {
  carDist += carSpeed;
  if (carDist >= carTotalLen) carDist -= carTotalLen;
}

function drawCar() {
  let d = carDist;
  let idx = 0;
  while (idx < carSegLens.length && d > carSegLens[idx]) {
    d -= carSegLens[idx];
    idx++;
  }
  idx = constrain(idx, 0, carSegLens.length - 1);
  const a = carPath[idx], b = carPath[idx + 1];
  const t = d / Math.max(carSegLens[idx], 0.0001);
  const pos = p5.Vector.lerp(a, b, t);

  noStroke();
  fill(CAR_COLOR);
  circle(pos.x, pos.y, CAR_R);
}
