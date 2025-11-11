
// Mondrian Town - Generates a Mondrian style abstract town map.

/*
(1) Style — Defines colors and stroke.
(2) Outline — Draws the outer polygonal shape of the town.
(3) Grid — Creates randomized inner grid lines.
(4) Blocks — Fills outline and grid with colored rectangles.
(5) Mondrian Town — Generates random rectangles in the interior area.
*/


// 1) Style
let mondrianYellow = "#F2D10D";
let mondrianRed    = "#C43B31";
let mondrianBlue   = "#2E66B3";
let mondrianWhite  = "#FBFAF8";
let palette = [mondrianBlue, mondrianRed, mondrianWhite];
let townLineW = 5;


// 2) Outline
const townOutline = [
  {x: 62,  y: 100},
  {x: 310, y: 100},
  {x: 360, y: 200},
  {x: 360, y: 287},
  {x: 255, y: 287},
  {x: 165, y: 200},
  {x: 100, y: 200},
  {x: 62,  y: 180},
  {x: 62,  y: 100}
];

function drawTownOutline() {
  stroke(mondrianYellow);
  strokeWeight(townLineW);
  noFill();

  for (let i = 0; i < townOutline.length - 1; i++) {
    let a = townOutline[i];
    let b = townOutline[i + 1];
    line(a.x, a.y, b.x, b.y);
  }
}


// 3) Grid
let townGridXs = [];
let townGridYs = [];

// Randomnize Initial Grid Position
function initTownGrid() {
  let numX = int(random(3, 5));
  townGridXs = [];
  for (let i = 0; i < numX; i++) {
    townGridXs.push(random(100, 330)+ random(-10, 10));
  }
  
  // Ensure grid lines are ordered from left to right.
  townGridXs.sort((a, b) => a - b);


  let numY = int(random(2, 4));
  townGridYs = [];
  for (let i = 0; i < numY; i++) {
    townGridYs.push(random(130, 250)+ random(-10, 10));
  }
  
  // Same.
  townGridYs.sort((a, b) => a - b);
}


function drawTownGrid() {
  if (townGridXs.length === 0) initTownGrid();

  stroke(mondrianYellow);
  strokeWeight(townLineW);
  noFill();

  // Draw vertical lines
  for (let x of townGridXs) {
    for (let y = 100; y < 300; y += 2) {
      if (pointInPoly(x, y, townOutline)) point(x, y);
    }
  }

  // Draw horizontal lines
  for (let y of townGridYs) {
    for (let x = 60; x < 370; x += 2) {
      if (pointInPoly(x, y, townOutline)) point(x, y);
    }
  }
}

// Helper: A Point-in-polygon Test
function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    let xi = poly[i].x, yi = poly[i].y;
    let xj = poly[j].x, yj = poly[j].y;
    let intersect =
      ((yi > py) !== (yj > py)) &&
      (px < ((xj - xi) * (py - yi)) / ((yj - yi) || 1e-9) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}


// 4) Blocks

// Outline Blocks
let outlineBlocks = [];

// Anchors along the outline
const outlineTickAnchors = [
  { cx: 110, cy: 100, ang:   0 },
  { cx: 180, cy: 100, ang:   0 },
  { cx: 260, cy: 100, ang:   0 },
  { cx: 330, cy: 140, ang:  63.435 },
  { cx: 360, cy: 220, ang:  90 },
  { cx: 360, cy: 260, ang:  90 },
  { cx: 340, cy: 287, ang:   0 },
  { cx: 290, cy: 287, ang:   0 },
  { cx: 210, cy: 245, ang: -136.565 },
  { cx: 140, cy: 200, ang:   0 },
  { cx:  82, cy: 190, ang: -152.47 },
  { cx:  62, cy: 140, ang:  90 }
];

// Size of the small coloror ticks
let outlineTickT = Math.max(1, townLineW - 2);
let outlineTickLMin = 14;
let outlineTickLMax = 28;

function initOutlineBlocks() {
  outlineBlocks = [];
  for (let a of outlineTickAnchors) {
    let L = random(outlineTickLMin, outlineTickLMax);
    let W = outlineTickT;
    let color = random(palette);
    outlineBlocks.push({ cx: a.cx, cy: a.cy, ang: a.ang, L, W, color });
  }
}

function drawOutlineBlocks() {
  if (outlineBlocks.length === 0) initOutlineBlocks();
  noStroke();
  rectMode(CENTER);
  for (let r of outlineBlocks) {
    push();
    translate(r.cx, r.cy);
    rotate(r.ang);
    fill(r.color);
    rect(0, 0, r.L, r.W);
    pop();
  }
  
  // Restore for grid blocks.
  rectMode(CORNER);
}


// Grid Blocks
let gridBlocks = [];

// Check if a rectangle stays fully inside the polygon
function insidePolyWithMargin(cx, cy, halfW, halfH, poly) {
  let pts = [
    {x: cx,         y: cy},          // center
    {x: cx - halfW, y: cy},          // left middle
    {x: cx + halfW, y: cy},          // right middle
    {x: cx,         y: cy - halfH},  // top middle
    {x: cx,         y: cy + halfH},  // bottom middle
    {x: cx - halfW, y: cy - halfH},  // top-left corner
    {x: cx + halfW, y: cy - halfH},  // top-right corner
    {x: cx - halfW, y: cy + halfH},  // bottom-left corner
    {x: cx + halfW, y: cy + halfH}  // bottom-right corner
  ];
  
  for (let p of pts) {
    if (!pointInPoly(p.x, p.y, poly)) return false;
  }
  return true;
}

function initGridBlocks() {
  gridBlocks = [];

  let tickT = Math.max(1, townLineW - 2);

  // Vertical grid lines
  for (let x of townGridXs) {
    let k = int(random(1, 4));
    for (let i = 0; i < k; i++) {
      let cy = random(115, 285);
      let w  = tickT;
      let h  = random(12, 26);
      let hw = w / 2, hh = h / 2;

      if (insidePolyWithMargin(x, cy, hw, hh, townOutline)) {
        let color = palette[int(random(palette.length))];
        gridBlocks.push({ x: x - hw, y: cy - hh, w, h, color });
      }
    }
  }

  // Horizontal grid lines
  for (let y of townGridYs) {
    let k = int(random(1, 3));
    for (let i = 0; i < k; i++) {
      let cx = random(75, 355);
      let w  = random(16, 32);
      let h  = tickT;
      let hw = w / 2, hh = h / 2;

      if (insidePolyWithMargin(cx, y, hw, hh, townOutline)) {
        let color = palette[int(random(palette.length))];
        gridBlocks.push({ x: cx - hw, y: y - hh, w, h, color });
      }
    }
  }
}

function drawGridBlocks() {
  if (gridBlocks.length === 0) {
    if (townGridXs.length === 0 || townGridYs.length === 0) initTownGrid();
    initGridBlocks();
  }
  noStroke();
  for (let r of gridBlocks) {
    fill(r.color);
    rect(r.x, r.y, r.w, r.h);
  }
}


// 5) Mondrian Town
let mondrianTown = [];

function initMondrianTown() {
  mondrianTown = [];

  // Total number of rectangles
  let n = int(random(7, 12));

  // Bounding box of the outline to narrow down the scope.
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let p of townOutline) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const margin = 12; // Leave a little bit space there.

  for (let i = 0; i < n; i++) {
    let colorGroup = random() < 0.6; // More chance for red and blue.

    let w, h, color, alpha;
    if (colorGroup) {
      // Red, Blue
      w = random(15, 40);
      h = random(12, 35);
      color = random([mondrianRed, mondrianBlue]);
      alpha = 255;
    } else {
      // Yellow, White
      w = random(10, 25);
      h = random(7, 22);
      color = random([mondrianYellow, mondrianWhite]);
      alpha = random(150, 200); // Make color which same with the back transparent.
    }

    let cx = random(minX + margin, maxX - margin);
    let cy = random(minY + margin, maxY - margin);

    // If the rectangle is not fully inside the town outline, skip this iteration and retry.
    if (!insidePolyWithMargin(cx, cy, w / 2, h / 2, townOutline)) {
      i--;
      continue;
    }

    mondrianTown.push({ x: cx - w / 2, y: cy - h / 2, w, h, color, alpha });
  }
}

function drawMondrianTown() {
  if (mondrianTown.length === 0) initMondrianTown();
  noStroke();

  for (let r of mondrianTown) {
    let c = color(r.color);
    c.setAlpha(r.alpha);
    fill(c);
    rect(r.x, r.y, r.w, r.h);
  }
}

