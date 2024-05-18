//set properties for the Mondrian painting
let rectSize = 40;

function setup() {
  createCanvas(800, 800);
  background(255, 250, 240); //Floralwhite
  noLoop(); //make the draw function only run once
}

function draw() {
  drawGrid();
  drawRectangle();
  drawLine();
}

function drawGrid(){
  //rectangle layout
  //This divides the whole canvas into grids, 
  //so that the specific grid can be filled with color.
  for (let y = 0; y < height; y += rectSize){
    for (let x = 0; x < width; x += rectSize){
      fill(255, 250, 240);
      //noStroke();
      square(x, y, rectSize);
    }
  }
}

//draw random rectangles with random colors to mimic Mondrian painting
function drawRectangle(){
  for (let i = 0; i < 25; i ++){
    //floor() is used to round the number down to the nearest whole number
    let x = floor(random(width/rectSize)) * rectSize;
    let y = floor(random(height/rectSize)) * rectSize;
    let w = random(1, 4) * rectSize;
    let h = random(1, 4) * rectSize;

    let randomColor = random([color(255, 221, 0), //yellow
                              color(255, 0, 0),   //red
                              color(0, 0, 255)]); //blue
    fill(randomColor);
    rect(x, y, w, h);
  }
}

function drawLine(){
  //Draw Horizontal lines
  for (let i = 0; i < 10; i ++){
    let x = 0;
    let y = floor(random(height/rectSize)) * rectSize;
    let w = width;
    let h = random(rectSize/4, rectSize/2);

    fill(255, 221, 0);
    rect(x, y, w, h);
  }

  //Draw Vertical lines
  for (let i = 0; i < 10; i ++){
    let x = floor(random(width/rectSize)) * rectSize;
    let y = 0;
    let w = random(rectSize/4, rectSize/2);
    let h = height;

    fill(255, 221, 0);
    rect(x, y, w, h);
  }
}