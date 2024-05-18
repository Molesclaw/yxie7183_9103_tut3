//set properties for the Mondrian painting
let rectSize = 40;

function setup() {
  createCanvas(600, 600);
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
  //This divides the whole canvas into grids, so that the specific grid
  //can be filled with color.
  for (let y = 0; y < height; y += rectSize){
    for (let x = 0; x < width; x += rectSize){
      fill(255, 250, 240);
      noStroke(); //remove the outline of the grids
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
    let w = random(1, 1.5) * rectSize;
    let h = random(1, 1.5) * rectSize;

    let randomColor = random([color(255, 221, 0), //yellow
                              color(255, 0, 0),   //red
                              color(0, 0, 255),    //blue
                              color(200, 200, 200)]);  //grey
    fill(randomColor);
    stroke(255, 250, 240);
    strokeWeight(1);
    rect(x, y, w, h);
  }
}

function drawLine(){
  //Make two arrays to store the horizontal and vertical lines
  let horizontalLines = [];
  let verticalLines = [];

  //Draw Horizontal lines
  for (let i = 0; i < random(8,10); i ++){
    let y = floor(random(height/rectSize)) * rectSize;
    let h = rectSize/2;

    fill(255, 221, 0);
    stroke(255, 250, 240);
    rect(0, y, width, h);
    
    //store the y and h values in the array, so the cross points can be 
    //drawn later
    horizontalLines.push({y: y, h: h});

    //Add random colored squares along the horizontal line to mimic 
    //Mondrian painting
    for (let i = rectSize; i < width; i += rectSize){
      if(random() > 0.3){ //Randomly decide to place a colored square
        let randomColor = random([color(255, 221, 0), //yellow
                                  color(255, 0, 0), //red
                                  color(0, 0, 255), //blue
                                  color(200, 200, 200)]); //grey
        fill(randomColor);
        noStroke();
        square(i, y, rectSize/2);
      }
    }
  }

  //Draw Vertical lines
  for (let i = 0; i < random(8,10); i ++){
    let x = floor(random(width/rectSize)) * rectSize;
    let w =  rectSize/2;

    fill(255, 221, 0);
    stroke(255, 250, 240);
    rect(x, 0, w, height);
    
    //store the x and w values in the array
    verticalLines.push({x: x, w: w});
  
    //Add random colored squares along the vertical line
    for (let i = rectSize; i < height; i += rectSize){
      if(random() > 0.3){ //Randomly decide to place a colored square
        let randomColor = random([color(255, 221, 0), //yellow
                                  color(255, 0, 0), //red
                                  color(0, 0, 255), //blue
                                  color(200, 200, 200)]); //grey
        fill(randomColor);
        noStroke();
        square(x, i, rectSize/2);
      }
    }
  }

  //Draw cross points with new color, the cross points are the 
  //intersection of the horizontal and vertical lines
  for (let horizontal of horizontalLines){ 
    for (let vertical of verticalLines){
      //
      if(vertical.x < width && horizontal.y < height){ 
        let randomColor = random([color(255, 0, 0),   //red
                                  color(0, 0, 255),    //blue
                                  color(200, 200, 200)]);  //grey
      
        fill(randomColor);
        square(vertical.x, horizontal.y, rectSize/2);
      }
    }
  }
}