# yxie7183_9103 Major Project_tut3

## Interaction Description
I chose User Input as my personal Task, which involves animating in conjunction with mouse or keyboard input.

1. **Mouse Movement**: Slowly move the mouse over the canvas to draw semi-transparent shapes (I originally wanted to make it look like a dark cloud, but in the end I could only make it look like street graffiti). The size of these patterns changes with the coordinates. Press the "G" key to toggle this graffiti mode on and off.
   
2. **Clicking**: Click on the canvas to add a rectangle at the nearest grid position with a random color.

3. **Keyboard Controls**:
   - Press the **Arrow Keys** to add or remove horizontal and vertical lines.
   
      - **" ↑ / ↓"** means every press deletes / adds one horizontal line.
      - **" ← / →"** means every press deletes / adds one vertical line.
  
   - Press the **"G" key** to toggle graffiti mode on and off.

## Individual Approach
Since the group code uses the noLoop function, it was difficult for me to animate another pattern while keeping certain patterns intact. So I chose a more minimalistic design solution.

### Inspiration for Animating
When I saw this artwork, I imagined the yellow lines as roads, with the colored rectangles representing buildings. The smaller rectangles on the lines are boys and girls wearing colorful clothes, dancing joyfully. The semi-transparent shapes resemble dark clouds, suggesting that it’s almost about to rain. Despite the impending rain, the people continue dancing, sharing their happiness with one another. Just like we try to capture the spirit of the original artwork "Broadway Boogie Woogie"

![Broadway Building](https://travel.ulifestyle.com.hk/cms/spots_photo/original/20140103185003_0_1.jpg)
*Broadway buildings*

![People in Broadway](https://www.tennessean.com/gcdn/-mm-/d33db090cfff60b970185eccf6650843fe71ecf8/c=0-338-3296-2200/local/-/media/2018/05/30/TennGroup/Nashville/636632979990070976-Broadway-Edit1-19.jpg?width=1600&height=800&fit=crop&format=pjpg&auto=webp)
*People in Broadway*

![Black cloud comes, we still singing in the rain](https://cdn.britannica.com/38/93438-050-FA15A0BF/Gene-Kelly-Singin-in-the-Rain-1952.jpg)
*People singing in the rain*

Those pictures made me confirm the design. I think adding rectangles is like adding houses on a Broadway block. Controlling the lines is like controlling the number of people dancing down the road. The semi- transparent black represents this dark cloud or something else negative. Even though it spreads here, people's happiness can still be seen through the dark cloud.

### Changes Made to Group Code
**Introduced Class for Rectangle and Line:** The original group code did not use classes. I converted the rectangle and line into two classes, making the code more concise.

**Replacing randomly created lines with a fixed number of lines:** The original group code use random() function to draw both horizontal and vertical lines. I changed the random number to a fixed number, so that users can control the number of lines and interact.

### Internet Technique
**Copilot:** I use it for simple code input and bug fixing.

**ChatGPT:** It gave some functions that were not used in class, and I thus found those functions on p5.js.