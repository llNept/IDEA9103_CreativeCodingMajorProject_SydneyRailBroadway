
// railMap.js — map constants + layered drawing

// ---- Design space ----
const ORIG_W = 600;
const ORIG_H = 500;

// ---- Style ----
const STROKE_W = 1;
const DOT_R = 6;
const TITLE_FONT_SIZE = 18;
const LABEL_FONT_SIZE = 12;

// ---- Colors ----
const COL_BG_BASE = "#FBFAF8";
const COL_SEA = "#D4E8EF";

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

// ---- Path data ----
const P_M1 = [
  {x:100,y:150},{x:293,y:150},{x:293,y:170},{x:355,y:170},{x:370,y:200},
  {x:370,y:240},{x:405,y:240},{x:405,y:270},{x:402,y:280},{x:402,y:320},{x:380,y:340}
];
const P_T5 = [
  {x:50,y:50},{x:50,y:190},{x:100,y:215},{x:150,y:215},{x:190,y:250},
  {x:140,y:300},{x:140,y:400},{x:60,y:400}
];
const P_T1 = [
  {x:55,y:50},{x:55,y:185},{x:100,y:210},{x:155,y:210},
  {x:30,y:210},{x:100,y:210},
  {x:155,y:210},{x:250,y:300},{x:380,y:300},{x:380,y:200},{x:300,y:55},{x:300,y:15}
];
const P_T2 = [
  {x:178,y:245},{x:192,y:258},{x:145,y:305},{x:145,y:405},{x:60,y:405},
  {x:192,y:258},{x:245,y:305},{x:385,y:305},{x:385,y:220},{x:430,y:220},{x:430,y:280},{x:385,y:280}
];
const P_T3 = [
  {x:150,y:380},{x:150,y:340},{x:245,y:340},{x:245,y:310},
  {x:390,y:310},{x:390,y:225},{x:425,y:225},{x:425,y:275},{x:390,y:275}
];
const P_T8 = [
  {x:150,y:450},{x:150,y:395},{x:300,y:395},{x:395,y:310},{x:395,y:230},
  {x:420,y:230},{x:420,y:270},{x:395,y:270},{x:395,y:350},{x:385,y:360},{x:340,y:360}
];
const P_T4 = [
  {x:370,y:480},{x:370,y:338},{x:400,y:313},{x:400,y:255},{x:490,y:255}
];
const P_T4_SHORT = [{x:370,y:470},{x:440,y:470}];
const P_T9 = [{x:297,y:55},{x:297,y:295},{x:375,y:295},{x:375,y:200},{x:330,y:120}];
const P_T6 = [{x:270,y:355},{x:250,y:340},{x:250,y:312}];
const P_PINK = [{x:270,y:355},{x:310,y:355},{x:330,y:340},{x:355,y:340}];
const P_T7 = [{x:250,y:295},{x:270,y:280},{x:270,y:240}];
const P_UNDEF1 = [{x:50,y:380},{x:50,y:260},{x:70,y:210}];
const P_UNDEF2 = [{x:165,y:210},{x:190,y:235},{x:370,y:235}];

// ---- Layers ----
function drawSea() {
  noStroke();
  fill(COL_BG_BASE);
  rect(0, 0, 500, 500);

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

  push(); translate(340,230); rotate(40); rect(0,0,40,10,2); pop();
  push(); translate(420,240); rotate(-20); rect(0,0,60,10,2); pop();
  push(); translate(450,330); rotate(70); rect(0,0,60,20,2); pop();
  push(); translate(430,450); rotate(45); fill(COL_BG_BASE); rect(0,0,30,20,2); pop();

  fill("#323369");
  noStroke();
  textSize(TITLE_FONT_SIZE);
  text("Sydney Rail Network Map", 10, 10);
}

function drawRails() {
  strokeWeight(STROKE_W); noFill();
  drawPolyline(P_M1, C_M1);
  drawPolyline(P_T5, C_T5);
  drawPolyline(P_T1, C_T1);
  drawPolyline(P_T2, C_T2);
  drawPolyline(P_T3, C_T3);
  drawPolyline(P_T8, C_T8);
  drawPolyline(P_T4, C_T4);
  drawPolyline(P_T4_SHORT, C_T4);
  drawPolyline(P_T9, C_T9);
  drawPolyline(P_T6, C_T6);
  drawPolyline(P_PINK, C_PINK);
  drawPolyline(P_T7, C_T7);
  drawPolyline(P_UNDEF1, C_UNDEF);
  drawPolyline(P_UNDEF2, C_UNDEF);
}

function drawStations() {
  noStroke(); textAlign(LEFT, TOP);
  fill(C_M1); circle(100,150, DOT_R); circle(380,340, DOT_R);
  fill(C_M1); textSize(14); text("M1",105,135);

  fill(C_T5); circle(50,50, DOT_R); circle(60,400, DOT_R);
  fill("#4D798A"); textSize(14); text("T5",30,60);

  fill(C_T1); circle(55,50, DOT_R); circle(300,15, DOT_R); circle(30,210, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T1",30,220);

  fill(C_T2); circle(385,280, DOT_R); circle(60,405, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T2",65,410);

  fill(C_T3); circle(390,275, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T3",155,370);

  fill(C_T8); circle(150,450, DOT_R); circle(340,360, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T8",155,440);

  fill(C_T4); circle(370,480, DOT_R); circle(440,470, DOT_R); circle(490,255, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T4",375,460);

  fill(C_T9); circle(297,55, DOT_R); circle(330,120, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T9",275,65);

  fill(C_T6); circle(270,355, DOT_R); circle(250,312, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T6",253,320);

  fill(C_PINK); circle(267,355, DOT_R); circle(355,340, DOT_R);

  fill(C_T7); circle(250,295, DOT_R); circle(270,240, DOT_R);
  fill("#4D798A"); textSize(LABEL_FONT_SIZE); text("T7",253,250);
}

function drawPolyline(points, col) {
  if (!points || points.length < 2) return;
  stroke(col);
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i + 1];
    line(a.x, a.y, b.x, b.y);
  }
}
