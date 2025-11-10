
// mondrianTown.js — Mondrian-style town area

// 1) Region
const TOWN_OUTLINE = { x: 55, y: 185, w: 305, h: 150 };

// 2) Random rectangles (generated once)
let mondrianGenerated = false;
let mondrianRects = [];
const MONDRIAN_COLORS = ['#F2D10D', '#C43B31', '#2E66B3', '#FBFAF8']; // yellow/red/blue/off-white

function drawMondrianTownSimple() {
  if (!mondrianGenerated) {
    generateMondrianTownSimple();
    mondrianGenerated = true;
  }
  push(); rectMode(CORNER); noStroke();
  for (const r of mondrianRects) { fill(r.c); rect(r.x, r.y, r.w, r.h); }
  pop();
}

function generateMondrianTownSimple() {
  mondrianRects.length = 0;
  const P = 8;
  const x0 = TOWN_OUTLINE.x + P;
  const y0 = TOWN_OUTLINE.y + P;
  const w0 = TOWN_OUTLINE.w - 2 * P;
  const h0 = TOWN_OUTLINE.h - 2 * P;

  const n = int(random(10, 15));
  const stepX = w0 / 6;
  const stepY = h0 / 5;

  for (let i = 0; i < n; i++) {
    const rw = random(w0 * 0.08, w0 * 0.22);
    const rh = random(h0 * 0.12, h0 * 0.28);
    let rx = random(x0, x0 + w0 - rw);
    let ry = random(y0, y0 + h0 - rh);
    rx = x0 + round((rx - x0) / stepX) * stepX;
    ry = y0 + round((ry - y0) / stepY) * stepY;
    rx = constrain(rx, x0, x0 + w0 - rw);
    ry = constrain(ry, y0, y0 + h0 - rh);
    mondrianRects.push({ x: rx, y: ry, w: rw, h: rh, c: random(MONDRIAN_COLORS) });
  }
}

// 3) Yellow outline + grid + inline color ticks
let townLineSegments = [];

const MON_YELLOW = "#F2D10D";
const MON_RED    = "#C43B31";
const MON_BLUE   = "#2E66B3";
const MON_WHITE  = "#FBFAF8";

const TOWN_LINE_W   = 8;
const BLOCK_THICK   = TOWN_LINE_W - 2;
const BLOCK_LONG_V  = 18;
const BLOCK_LONG_H  = 22;

function drawTownLinesAndCollect() {
  townLineSegments = [];

  const P = 8;
  const x = TOWN_OUTLINE.x, y = TOWN_OUTLINE.y, w = TOWN_OUTLINE.w, h = TOWN_OUTLINE.h;
  const gx0 = x + P, gy0 = y + P, gw = w - 2 * P, gh = h - 2 * P;
  const cols = 4, rows = 3;

  stroke(MON_YELLOW);
  strokeWeight(TOWN_LINE_W);
  noFill();

  // grid (verticals)
  for (let i = 1; i < cols; i++) {
    const vx = gx0 + (gw * i) / cols;
    line(vx, gy0, vx, gy0 + gh);
    townLineSegments.push({ x1: vx, y1: gy0, x2: vx, y2: gy0 + gh, orient: "v" });
  }
  // grid (horizontals)
  for (let j = 1; j < rows; j++) {
    const hy = gy0 + (gh * j) / rows;
    line(gx0, hy, gx0 + gw, hy);
    townLineSegments.push({ x1: gx0, y1: hy, x2: gx0 + gw, y2: hy, orient: "h" });
  }

  // outer border
  rect(x, y, w, h);
  townLineSegments.push(
    { x1: x,   y1: y,   x2: x + w, y2: y,     orient: "h" },
    { x1: x,   y1: y+h, x2: x + w, y2: y + h, orient: "h" },
    { x1: x,   y1: y,   x2: x,     y2: y + h, orient: "v" },
    { x1: x+w, y1: y,   x2: x + w, y2: y + h, orient: "v" }
  );
}

function drawMondrianBlocksOnYellow() {
  if (!townLineSegments.length) return;

  const tickColors = [MON_BLUE, MON_RED, MON_WHITE];
  const ratios = [0.18, 0.5, 0.82];
  noStroke();

  let idx = 0;
  for (const seg of townLineSegments) {
    for (const r of ratios) {
      const cx = seg.x1 + (seg.x2 - seg.x1) * r;
      const cy = seg.y1 + (seg.y2 - seg.y1) * r;
      fill(tickColors[idx % tickColors.length]);
      if (seg.orient === "v") {
        rect(cx - BLOCK_THICK / 2, cy - BLOCK_LONG_V / 2, BLOCK_THICK, BLOCK_LONG_V);
      } else {
        rect(cx - BLOCK_LONG_H / 2, cy - BLOCK_THICK / 2, BLOCK_LONG_H, BLOCK_THICK);
      }
      idx++;
    }
  }
}
