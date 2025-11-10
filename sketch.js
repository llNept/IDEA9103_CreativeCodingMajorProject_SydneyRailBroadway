
// sketch.js — orchestrator/glue

function setup() {
  createCanvas(1000, 800);
  angleMode(DEGREES);
  textFont("sans-serif");
  textAlign(LEFT, TOP);

  // init the car path (T3 right rectangle)
  initCarPath_T3Rect();
}

function draw() {
  background(255);

  // fixed composition: 20px margin on left/right, 960x800 design-space scaled from 600x500
  push();
  translate(20, 0);
  scale(960 / ORIG_W, 800 / ORIG_H);

  // 1) background/sea
  drawSea();

  // 2) Mondrian town (under rails)
  drawMondrianTownSimple();
  drawTownLinesAndCollect();
  drawMondrianBlocksOnYellow();

  // 3) rails & stations
  drawRails();
  drawStations();

  // 4) car animation
  advanceCar();
  drawCar();

  pop();
}
