//This is a preliminary sketch for the group task, made by Yusong Xie
//Set properties for the Mondrian painting
let rectSize = 40;

//Make an object to hold the properties of the Mondrian design
let mondrian = {aspect: 0, width: 600, height: 600, xOffset: 0, yOffset: 0};
//Set width equal to height, because I want to make a square design

//A variable for the canvas aspect ratio
let canvasAspectRatio = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 250, 240); //Floralwhite
  noLoop(); //make the draw function only run once
  calculateMondrian();
}

function draw() {
  drawGrid();
  drawRectangle();
  drawLine();
}

function drawGrid(){
  //rectangle layout
  //This divides the whole canvas into grids, so that the specific grid
  //can be filled with color.
  for (let y = 0; y < mondrian.height; y += rectSize){
    for (let x = 0; x < mondrian.width; x += rectSize){
      fill(255, 250, 240);
      noStroke(); //remove the outline of the grids
      square(x + mondrian.xOffset, y + mondrian.yOffset, rectSize);
    }
  }
}

//draw random rectangles with random colors to mimic Mondrian painting
function drawRectangle(){
  for (let i = 0; i < 15; i ++){
    //floor() is used to round the number down to the nearest whole number
    let x = floor(random(mondrian.width/rectSize)) * rectSize;
    let y = floor(random(mondrian.height/rectSize)) * rectSize;
    let w = random(2, 4) * rectSize;
    let h = random(2, 4) * rectSize;

    let randomColor = random([color(238,216,34), //yellow
                              color(173,57,42),   //red
                              color(67,103,187),    //blue
                              color(200, 200, 200)]);  //grey
    fill(randomColor);
    stroke(255, 250, 240);
    strokeWeight(1);
    rect(x + mondrian.xOffset, y + mondrian.yOffset, w, h);
  }
}

function drawLine(){
  //Make two arrays to store the horizontal and vertical lines
  let horizontalLines = [];
  let verticalLines = [];

  //Draw Horizontal lines
  for (let i = 0; i < random(8,10); i ++){
    let y = floor(random(mondrian.height/rectSize)) * rectSize;
    let h = rectSize/2;

    fill(238,216,34);
    stroke(255, 250, 240);
    rect(mondrian.xOffset, y + mondrian.yOffset, mondrian.width, h);
    
    //store the y and h values in the array, so the cross points can be 
    //drawn later
    horizontalLines.push({y: y, h: h});

    //Add random colored squares along the horizontal line to mimic 
    //Mondrian painting
    for (let i = rectSize; i < mondrian.width; i += rectSize){
      if(random() > 0.5){ //Randomly decide to place a colored square
        let randomColor = random([color(238,216,34), //yellow
                                  color(173,57,42), //red
                                  color(67,103,187), //blue
                                  color(200, 200, 200)]); //grey
        fill(randomColor);
        noStroke();
        square(i + mondrian.xOffset, y + mondrian.yOffset, rectSize/2);
      }
    }
  }

  //Draw Vertical lines
  for (let i = 0; i < random(8,10); i ++){
    let x = floor(random(mondrian.width/rectSize)) * rectSize;
    let w =  rectSize/2;

    fill(238,216,34);
    stroke(255, 250, 240);
    rect(x + mondrian.xOffset, mondrian.yOffset, w, mondrian.height);
    
    //store the x and w values in the array
    verticalLines.push({x: x, w: w});
  
    //Add random colored squares along the vertical line
    for (let i = rectSize; i < mondrian.height; i += rectSize){
      if(random() > 0.5){
        let randomColor = random([color(238,216,34), //yellow
                                  color(173,57,42), //red
                                  color(67,103,187), //blue
                                  color(200, 200, 200)]); //grey
        fill(randomColor);
        noStroke();
        square(x + mondrian.xOffset, i + mondrian.yOffset, rectSize/2);
      }
    }
  }

  //Draw cross points with new color, the cross points are the 
  //intersection of the horizontal and vertical lines
  for (let horizontal of horizontalLines){ 
    for (let vertical of verticalLines){
      //
      if(vertical.x < mondrian.width && horizontal.y < mondrian.height){ 
        let randomColor = random([color(173,57,42),   //red
                                  color(67,103,187),    //blue
                                  color(200, 200, 200)]);  //grey
      
        fill(randomColor);
        square(vertical.x + mondrian.xOffset, 
               horizontal.y + mondrian.yOffset, rectSize/2);
      }
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(255, 250, 240);
  calculateMondrian(); 
  draw();
}

function calculateMondrian(){
  canvasAspectRatio = width/height;
  mondrian.aspect = 1; //Square aspect ratio
  
  if(1 > canvasAspectRatio){
    mondrian.width = width;
    mondrian.height = width / mondrian.aspect;
    mondrian.yOffset = (height - mondrian.height) / 2;
    mondrian.xOffset = 0;
  } else if (1 < canvasAspectRatio){
    mondrian.width = height * mondrian.aspect;
    mondrian.height = height;
    mondrian.xOffset = (width - mondrian.width) / 2;
    mondrian.yOffset = 0;
  } else if (1 == canvasAspectRatio){
    mondrian.width = width;
    mondrian.height = height;
    mondrian.xOffset = 0;
    mondrian.yOffset = 0;
  }
}