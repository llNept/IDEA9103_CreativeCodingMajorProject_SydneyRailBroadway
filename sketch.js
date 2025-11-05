
// sketch.js — Sydney Rail Network
// Canvas: 800x800. Original design space: 600x500.
// All coordinates preserved; scaled up uniformly for full-canvas adaptation.

const ORIG_W = 600;
const ORIG_H = 500;

// Base colors
const COL_BG_BASE = "#FBFAF8";
const COL_SEA = "#D4E8EF";

// Line colors
const C_M1 = "#80FFF7";
const C_T5 = "#FF007F";
const C_T1 = "#FFAE42";
const C_T2 = "#00788D";
const C_T3 = "#FF8000";
const C_T8 = "#008000";
const C_T4 = "#0047AB";
const C_T9 = "#ED1C24";
const C_T6 = "#4D3900";
const C_PINK = "#FFB6C1";
const C_T7 = "#808080";
const C_UNDEF = "#D3D3D3";

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  noLoop();
  textFont("sans-serif"); // unified font
  textAlign(LEFT, TOP);
}

function draw() {
  background(255);
  push();
  scale(width / ORIG_W, height / ORIG_H);
  drawScene();
  pop();
}

function drawScene() {
  // Background
  noStroke();
  fill(COL_BG_BASE);
  rect(0, 0, 500, 500);

  // Sea panels
  fill(COL_SEA);
  rect(500, 0, 70, 500, 2);
  rect(440, 0, 60, 70, 2);
  rect(440, 350, 130, 120, 2);
  rect(440, 480, 130, 5, 2);
  rect(440, 0, 10, 100, 2);
  rect(470, 200, 30, 25, 2);
  rect(190, 220, 100, 5, 2);
  rect(290, 225, 50, 20, 2);
  rect(360, 240, 70, 30, 2);

  push();
  translate(340, 230);
  rotate(40);
  rect(0, 0, 40, 10, 2);
  pop();

  push();
  translate(420, 240);
  rotate(-20);
  rect(0, 0, 60, 10, 2);
  pop();

  push();
  translate(450, 330);
  rotate(70);
  rect(0, 0, 60, 20, 2);
  pop();

  push();
  translate(430, 450);
  rotate(45);
  fill(COL_BG_BASE);
  rect(0, 0, 30, 20, 2);
  pop();

  // Title
  fill("#323369");
  noStroke();
  textSize(18);
  text("Sydney rail network map", 10, 10);

  // --- M1 ---
  stroke(C_M1);
  strokeWeight(1);
  noFill();
  fill(C_M1);
  noStroke();
  circle(100, 150, 6);
  circle(380, 340, 6);
  stroke(C_M1);
  line(100, 150, 293, 150);
  line(293, 150, 293, 170);
  line(293, 170, 355, 170);
  line(355, 170, 370, 200);
  line(370, 200, 370, 240);
  line(370, 240, 405, 240);
  line(405, 240, 405, 270);
  line(405, 270, 402, 280);
  line(402, 280, 402, 320);
  line(402, 320, 380, 340);
  noStroke();
  fill(C_M1);
  textSize(14);
  text("M1", 105, 135);

  // --- T5 ---
  noStroke();
  fill(C_T5);
  circle(50, 50, 6);
  circle(60, 400, 6);
  stroke(C_T5);
  line(50, 50, 50, 190);
  line(50, 190, 100, 215);
  line(100, 215, 150, 215);
  line(150, 215, 190, 250);
  line(190, 250, 140, 300);
  line(140, 300, 140, 400);
  line(140, 400, 60, 400);
  noStroke();
  fill("#4D798A");
  textSize(14);
  text("T5", 30, 60);

  // --- T1 ---
  noStroke();
  fill(C_T1);
  circle(55, 50, 6);
  circle(300, 15, 6);
  circle(30, 210, 6);
  stroke(C_T1);
  line(55, 50, 55, 185);
  line(55, 185, 100, 210);
  line(100, 210, 155, 210);
  line(30, 210, 100, 210);
  line(155, 210, 250, 300);
  line(250, 300, 380, 300);
  line(380, 300, 380, 200);
  line(380, 200, 300, 55);
  line(300, 55, 300, 15);
  noStroke();
  fill("#4D798A");
  textSize(12);
  text("T1", 30, 220);

  // --- T2 ---
  noStroke();
  fill(C_T2);
  circle(385, 280, 6);
  circle(60, 405, 6);
  stroke(C_T2);
  line(178, 245, 192, 258);
  line(192, 258, 145, 305);
  line(145, 305, 145, 405);
  line(145, 405, 60, 405);
  line(192, 258, 245, 305);
  line(245, 305, 385, 305);
  line(385, 305, 385, 220);
  line(385, 220, 430, 220);
  line(430, 220, 430, 280);
  line(430, 280, 385, 280);
  noStroke();
  fill("#4D798A");
  text("T2", 65, 410);

  // --- T3 ---
  noStroke();
  fill(C_T3);
  circle(390, 275, 6);
  stroke(C_T3);
  line(150, 380, 150, 340);
  line(150, 340, 245, 340);
  line(245, 340, 245, 310);
  line(245, 310, 390, 310);
  line(390, 310, 390, 225);
  line(390, 225, 425, 225);
  line(425, 225, 425, 275);
  line(425, 275, 390, 275);
  noStroke();
  fill("#4D798A");
  text("T3", 155, 370);

  // --- T8 ---
  noStroke();
  fill(C_T8);
  circle(150, 450, 6);
  circle(340, 360, 6);
  stroke(C_T8);
  line(150, 450, 150, 395);
  line(150, 395, 300, 395);
  line(300, 395, 395, 310);
  line(395, 310, 395, 230);
  line(395, 230, 420, 230);
  line(420, 230, 420, 270);
  line(420, 270, 395, 270);
  line(395, 270, 395, 350);
  line(395, 350, 385, 360);
  line(385, 360, 340, 360);
  noStroke();
  fill("#4D798A");
  text("T8", 155, 440);

  // --- T4 ---
  noStroke();
  fill(C_T4);
  circle(370, 480, 6);
  circle(440, 470, 6);
  circle(490, 255, 6);
  stroke(C_T4);
  line(370, 480, 370, 338);
  line(370, 338, 400, 313);
  line(400, 313, 400, 255);
  line(400, 255, 490, 255);
  line(370, 470, 440, 470);
  noStroke();
  fill("#4D798A");
  text("T4", 375, 460);

  // --- T9 ---
  noStroke();
  fill(C_T9);
  circle(297, 55, 6);
  circle(330, 120, 6);
  stroke(C_T9);
  line(297, 55, 297, 295);
  line(297, 295, 375, 295);
  line(375, 295, 375, 200);
  line(375, 200, 330, 120);
  noStroke();
  fill("#4D798A");
  text("T9", 275, 65);

  // --- T6 ---
  noStroke();
  fill(C_T6);
  circle(270, 355, 6);
  circle(250, 312, 6);
  stroke(C_T6);
  line(270, 355, 250, 340);
  line(250, 340, 250, 312);
  noStroke();
  fill("#4D798A");
  text("T6", 253, 320);

  // --- Pink line ---
  noStroke();
  fill(C_PINK);
  circle(267, 355, 6);
  circle(355, 340, 6);
  stroke(C_PINK);
  line(270, 355, 310, 355);
  line(310, 355, 330, 340);
  line(330, 340, 355, 340);

  // --- T7 ---
  noStroke();
  fill(C_T7);
  circle(250, 295, 6);
  circle(270, 240, 6);
  stroke(C_T7);
  line(250, 295, 270, 280);
  line(270, 280, 270, 240);
  noStroke();
  fill("#4D798A");
  text("T7", 253, 250);

  // --- Undefined gray lines ---
  stroke(C_UNDEF);
  line(50, 380, 50, 260);
  line(50, 260, 70, 210);
  line(165, 210, 190, 235);
  line(190, 235, 370, 235);
}

