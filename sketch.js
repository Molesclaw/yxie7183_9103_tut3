//set properties for the Mondrian painting
let rectSize = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 250, 240); //Floralwhite
}

function draw() {
  drawMondrian();
  testRect();
}

function drawMondrian(){
  //rectangle layout
  //This divides the whole canvas into grids, 
  //so that the specific grid can be filled with color.
  for (let y = 0; y < height; y += rectSize){
    for (let x = 0; x < width; x += rectSize){
      fill(255, 250, 240);
      square(x, y, rectSize);
    }
  }
}

function testRect(){
  fill(255, 221, 0); //yellow
  square(80, 40, rectSize);
  square(160, 40, rectSize);
  rect(200, 120, rectSize*2, rectSize*3);
  rect(300, 120, rectSize*3, rectSize);

  fill(255, 0, 0); //red
  square(40, 80, rectSize);
  square(200, 40, rectSize);
  rect(320, 80, rectSize, rectSize*2);

  fill(0, 0, 255); //blue
  square(120, 40, rectSize);
  square(40, 200, rectSize);
  rect(320, 240, rectSize, rectSize*2);
  rect(160, 360, rectSize, rectSize);
}
