//This is a preliminary sketch for the group task, made by Yusong Xie
//Set properties for the Mondrian painting
let rectSize = 50;

//Make an object to hold the properties of the Mondrian design
let mondrian = {aspect: 0, width: 600, height: 600, xOffset: 0, yOffset: 0};
//Set width equal to height, because I want to make a square design

//A variable for the canvas aspect ratio
let canvasAspectRatio = 0;

//Make two arrays to store the horizontal and vertical lines
let horizontalLines = [];
let verticalLines = [];
let rectangles = [];

let numHorizontalLines = 7; // Default number of horizontal lines
let numVerticalLines = 7; // Default number of vertical lines

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 250, 240); //Floralwhite
  calculateMondrian();
  noLoop(); //make the draw function only run once
}

function draw() {
  background(255, 250, 240); //Floralwhite
  drawGrid();
  drawLine(); // draw line first
  drawRectangle();
}

function drawGrid(){
  //rectangle layout
  //This divides the whole canvas into grids, so that the specific grid
  //can be filled with color.
  for (let y = 0; y < mondrian.height; y += rectSize){
    for (let x = 0; x < mondrian.width; x += rectSize){
      fill(255, 250, 240);
      noStroke(); //remove the outline of the grids, you can check the difference by commenting this line
      square(x + mondrian.xOffset, y + mondrian.yOffset, rectSize);
    }
  }
}

function drawRectangle() {
  let rectangles = []; // Array to store generated rectangles
  let minRectangles = 10; // Minimum number of rectangles
  let maxRectangles = 15; // Maximum number of rectangles

  // Generate rectangles between adjacent horizontal lines, ensuring no overlap
  for (let i = 0; i < horizontalLines.length - 1 && rectangles.length < maxRectangles; i++) {
    // Determine boundaries for the rectangle
    let yMin = horizontalLines[i].y + horizontalLines[i].h;
    let yMax = horizontalLines[i + 1].y;
    let h = yMax - yMin;

    // Attempt to place the rectangle without overlap, with a maximum number of attempts
    let attempts = 0;
    let validPosition = false;
    let newRect;
    while (!validPosition && attempts < 1000) { 
      x = floor(random(mondrian.width / rectSize)) * rectSize;
      w = rectSize; // Keep rectangle width constant

      // Adjust rectangle position to align with horizontal lines
      y = yMin; // Set top edge of rectangle to bottom edge of horizontal line
      if (y + h > yMax) {
        y -= (y + h - yMax); // Adjust position if exceeding top boundary
      }
      
      //Personal task: add a rectangle class to store the properties of the rectangles
      newRect = new Rectangle(x, y, w, h, random([color(238,216,34), color(173,57,42), color(67,103,187), color(200)]));
      
      validPosition = true;
      // Check for overlap with existing rectangles
      for (let rect of rectangles) {
        //if (!(x + w < rect.x || x > rect.x + rect.w || y + h < rect.y || y > rect.y + rect.h)) {
        if (newRect.overlaps(rect)) { //Abouve is the group task, this is my personal change
        validPosition = false;
          break;
        }
      }
      attempts++;
    }

    // Draw the rectangle if a valid position is found
    if (validPosition && h > 0) {
      // Draw the rectangle with a random color
      /*
      let randomColor = random([color(238,216,34), color(173,57,42), color(67,103,187), color(200)]);
      fill(randomColor);
      noStroke();
      strokeWeight(1);
      rect(x + mondrian.xOffset, y + mondrian.yOffset, w, h);
      Above is the group task, I will use the newRect object to draw the rectangle
      */
      newRect.display(); //Personal task
      //rectangles.push({x: x, y: y, w: w, h: h}); // Add the rectangle to the array
      rectangles.push(newRect); //Personal task
      if((w>rectSize||h>rectSize)&&h>w){
        let smallRectW = w;
        let smallRectH = floor(random(h/4,h/2));
        let smallX = x;
        let smallY = y + floor(random(0, h - smallRectH));
        let smallColor = random([color(238, 216, 34), color(173, 57, 42), color(67, 103, 187), color(200)]);
        fill(smallColor);
        noStroke();
        rect(smallX + mondrian.xOffset, smallY + mondrian.yOffset, smallRectW, smallRectH);
        //To generate a smaller rectangle in the middle of a larger rectangle
        if(smallRectH>rectSize&&smallRectW>rectSize){
          let centerRectW = smallRectW / 2;
          let centerRectH = smallRectH / 2;
          let centerX = smallX + (smallRectW - centerRectW) / 2;
          let centerY = smallY + (smallRectH - centerRectH) / 2;
          let centerColor = random([color(238, 216, 34),color(200)]);
          fill(centerColor);
          noStroke();
          rect(centerX + mondrian.xOffset, centerY + mondrian.yOffset, centerRectW, centerRectH);
        }
      }
      if((w>rectSize||h>rectSize)&&h<w){
        let smallRectW = floor(random(w/4,w/2));
        let smallRectH = h;
        let smallX = x + floor(random(0, w - smallRectW));
        let smallY = y;
        let smallColor = random([color(238, 216, 34), color(173, 57, 42), color(67, 103, 187), color(200)]);
        fill(smallColor);
        noStroke();
        rect(smallX + mondrian.xOffset, smallY + mondrian.yOffset, smallRectW, smallRectH);
        //To generate a smaller rectangle in the middle of a larger rectangle
        if(smallRectH>rectSize&&smallRectW>rectSize){
          let centerRectW = smallRectW / 2;
          let centerRectH = smallRectH / 2;
          let centerX = smallX + (smallRectW - centerRectW) / 2;
          let centerY = smallY + (smallRectH - centerRectH) / 2;
          let centerColor = random([color(238, 216, 34),color(200)]);
          fill(centerColor);
          noStroke();
          rect(centerX + mondrian.xOffset, centerY + mondrian.yOffset, centerRectW, centerRectH);
        }
      }
    }
  }

  // Generate rectangles between adjacent vertical lines, ensuring no overlap
  for (let i = 0; i < verticalLines.length - 1 && rectangles.length < maxRectangles; i++) {
    // Determine boundaries for the rectangle
    let xMin = verticalLines[i].x + verticalLines[i].w;
    let xMax = verticalLines[i + 1].x;
    let w = xMax - xMin;

    // Attempt to place the rectangle without overlap, with a maximum number of attempts
    let attempts = 0;
    let validPosition = false;
    let x, y, h;
    while (!validPosition && attempts < 1000) { // Increase maximum attempts
      y = floor(random(mondrian.height / rectSize)) * rectSize;
      h = rectSize; // Keep rectangle height constant

      // Adjust rectangle position to align with vertical lines
      x = xMin; // Set left edge of rectangle to right edge of vertical line
      if (x + w > xMax) {
        x -= (x + w - xMax); // Adjust position if exceeding left boundary
      }

      validPosition = true;

      // Check for overlap with existing rectangles
      for (let rect of rectangles) {
        if (!(x + w < rect.x || x > rect.x + rect.w || y + h < rect.y || y > rect.y + rect.h)) {
          validPosition = false;
          break;
        }
      }
      attempts++;
    }

    // Draw the rectangle if a valid position is found
    if (validPosition && w > 0) {
      // Draw the rectangle with a random color
      let randomColor = random([color(238,216,34), color(173,57,42), color(67,103,187), color(200)]);
      fill(randomColor);
      noStroke();
      strokeWeight(1);
      rect(x + mondrian.xOffset, y + mondrian.yOffset, w, h);
      rectangles.push({x: x, y: y, w: w, h: h}); // Add the rectangle to the array
      if((w>rectSize||h>rectSize)&&h>w){
        let smallRectW = w;
        let smallRectH = floor(random(h/4,h/2));
        let smallX = x;
        let smallY = y + floor(random(0, h - smallRectH));
        let smallColor = random([color(238, 216, 34), color(173, 57, 42), color(67, 103, 187), color(200)]);
        fill(smallColor);
        noStroke();
        rect(smallX + mondrian.xOffset, smallY + mondrian.yOffset, smallRectW, smallRectH);
        //To generate a smaller rectangle in the middle of a larger rectangle
        if(smallRectH>=rectSize&&smallRectW>=rectSize){
          let centerRectW = smallRectW / 2;
          let centerRectH = smallRectH / 2;
          let centerX = smallX + (smallRectW - centerRectW) / 2;
          let centerY = smallY + (smallRectH - centerRectH) / 2;
          let centerColor = random([color(238, 216, 34),color(200)]);
          fill(centerColor);
          noStroke();
          rect(centerX + mondrian.xOffset, centerY + mondrian.yOffset, centerRectW, centerRectH);
        }
      }
      if((w>rectSize||h>rectSize)&&h<w){
        let smallRectW = floor(random(w/4,w/2));
        let smallRectH = h;
        let smallX = x + floor(random(0, w - smallRectW));
        let smallY = y;
        let smallColor = random([color(238, 216, 34), color(173, 57, 42), color(67, 103, 187), color(200)]);
        fill(smallColor);
        noStroke();
        rect(smallX + mondrian.xOffset, smallY + mondrian.yOffset, smallRectW, smallRectH);
        //To generate a smaller rectangle in the middle of a larger rectangle
        if(smallRectH>=rectSize&&smallRectW>=rectSize){
          let centerRectW = smallRectW / 2;
          let centerRectH = smallRectH / 2;
          let centerX = smallX + (smallRectW - centerRectW) / 2;
          let centerY = smallY + (smallRectH - centerRectH) / 2;
          let centerColor = random([color(238, 216, 34),color(200)]);
          fill(centerColor);
          noStroke();
          rect(centerX + mondrian.xOffset, centerY + mondrian.yOffset, centerRectW, centerRectH);
        }
      }
    }
  }

  // Generate additional rectangles if the minimum quantity is not met
  while (rectangles.length < minRectangles) {
    let yMin = floor(random(mondrian.height / rectSize)) * rectSize;
    let xMin = floor(random(mondrian.width / rectSize)) * rectSize;
    let w = rectSize;
    let h = rectSize;
    let validPosition = true;

    // Check for overlap with existing rectangles
    for (let rect of rectangles) {
      if (!(xMin + w < rect.x || xMin > rect.x + rect.w || yMin + h < rect.y || yMin > rect.y + rect.h)) {
        validPosition = false;
        break;
      }
    }

    // Draw the rectangle if a valid position is found
    if (validPosition) {
      // Draw the rectangle with a random color
      let randomColor = random([color(238,216,34), color(173,57,42), color(67,103,187), color(200)]);
      fill(randomColor);
      noStroke();
      strokeWeight(1);
      rect(xMin + mondrian.xOffset, yMin + mondrian.yOffset, w, h);
      rectangles.push({x: xMin, y: yMin, w: w, h: h}); // Add the rectangle to the array
    }
  }
}

function drawLine(){
  //Make two arrays to store the horizontal and vertical lines
  horizontalLines = [];
  verticalLines = [];

//The starting point coordinates of Y, this is the position of the first horizontal line, and the subsequent vertical lines are arranged based on this.
    let firstY=floor(random(0,2))*rectSize;
    let firstX=floor(random(0,2))*rectSize;
  //Draw Horizontal lines
  for (let i = 0; i < numHorizontalLines; i ++){
    let y=firstY+floor(random(i,i*2))*rectSize+rectSize;

    //Limit the maximum value
    if(y>mondrian.height){
      y=mondrian.height
    }
    let h = rectSize/2;

    let newLine = new Line(0, y, mondrian.width, h, color(238,216,34));
    newLine.display();
    horizontalLines.push(newLine);
    
    /* Group Task
    //store the y and h values in the array, so the cross points can be 
    //drawn later
    horizontalLines.push({y: y, h: h, x: 0, w: mondrian.width});
    */

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
  for (let i = 0; i < numVerticalLines; i ++){
    let x = firstX+floor(random(i,i*2))*rectSize+rectSize;
    if(x>mondrian.width){
      x=mondrian.width
    }

    let w =  rectSize/2;

    let newLine = new Line(x, 0, w, mondrian.height, color(238, 216, 34));
    newLine.display();
    verticalLines.push(newLine);

    /*Group task 
    fill(238,216,34);
    noStroke();
    rect(x + mondrian.xOffset, mondrian.yOffset, w, mondrian.height);
    
    //store the x and w values in the array
    verticalLines.push({x: x, w: w, y: 0, h: mondrian.height});
    */

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
      //Check if the cross point is within the Mondrian painting
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

//My personal task start here
//Add a rectangle at the nearest grid position when the mouse is clicked
/*
Sometimes the rectangles are not shown on the canvas, not sure why.
You can try to click on the canvas multiple times to see if it works
*/
function mouseClicked(){
  let x = floor((mouseX - mondrian.xOffset) / rectSize) * rectSize;
  let y = floor((mouseY - mondrian.yOffset) / rectSize) * rectSize;
  let w = floor(random(1, 3)) * rectSize;
  let h = floor(random(1, 3)) * rectSize;

  //Make sure the rectangles' positions are within the Mondrian painting
  if(x >= 0 && y >= 0 && x <= mondrian.width && y <= mondrian.height){
    let randomColor = random([color(238,216,34), color(173,57,42), color(67,103,187), color(200)]);
    fill(randomColor);
    noStroke();
    rect(x + mondrian.xOffset, y + mondrian.yOffset, w, h);

    //Add the rectangle to the array
    rectangles.push({x: x, y: y, w: w, h: h});
  }
}

//Add rectangle class to store the properties of the rectangles
class Rectangle {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    
  }

  display() {
    fill(this.color);
    noStroke();
    rect(this.x + mondrian.xOffset, this.y + mondrian.yOffset, this.w, this.h);
  }

  // Method to check if this rectangle overlaps with another rectangle
  overlaps(other) {
    return !(this.x + this.w <= other.x || this.x >= other.x + other.w ||
             this.y + this.h <= other.y || this.y >= other.y + other.h);
  }
}

//Add a Line class to store the properties of the lines
class Line {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  display() {
    fill(this.color);
    noStroke();
    rect(this.x + mondrian.xOffset, this.y + mondrian.yOffset, this.w, this.h);
  }
}

//Add keyboard control to add or reduce lines
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    numHorizontalLines = min(13, numHorizontalLines + 1);
  } else if (keyCode === UP_ARROW) {
    numHorizontalLines = max(0, numHorizontalLines - 1);
  } else if (keyCode === RIGHT_ARROW) {
    numVerticalLines = min(13, numVerticalLines + 1);
  } else if (keyCode === LEFT_ARROW) {
    numVerticalLines = max(0, numVerticalLines - 1);
  }

  background(255, 250, 240); // Clear the canvas
  draw();
}