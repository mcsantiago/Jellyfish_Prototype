//AT THIS POINT ALL THAT I HAVE IS THE JELLY FOLLOWS THE MOUSE AND PLANKTON FLOATS UPWARD

/*
what I have so far is a sand dollar, plankton, and jellyfish.

plankton will randomly spawn along the bottom of screen
plankton will float upward zig zagging
plankton will stay inside of jelly for a couple seconds, then disappear

sand dollar will float upward slowly rotating

jellyfish will rotate around pointer, like its following it (need help with this)

UI:
+points for lasting
+points for collecting plankton

sand dollar amount (only shows after you catch one, then fades away)
*/

/**
 * Draws a Jellyfish
 * @param {x-position} x 
 * @param {y-position} y 
 */
function jellyFish(x, y) {
  push();
      
  translate(x,y);
  noStroke();
  
  //jellybody
  fill(204, 183, 63, 200);
  arc(0, 0, 30, 25, 180, 360);
  
  //jelly tentacles
  for(var i = 0; i < 5; i++) {
      push();
      translate(-12, 8);
      translate(i * 6, 0);
      rotate(21 + i * -14);
      ellipse(0,0, 5, 10);
      pop();
  }

  pop();
};

/**
 * Draws a Sand Dollar
 * @param {x-position} x 
 * @param {y-position} y 
 */
function sandDollar(x, y) {
  push();
  translate(x,y);
  scale(2);
  noStroke();
  fill(227, 221, 207);
  ellipse(0, 0, 14, 13);
  
  for(var i = 0; i < 4; i++) {
      fill(209, 201, 182);
      rotate(i * 90);
      ellipse(0, -3, 2, 5);
  }
  pop();
  
};

/**
 * Draws a Coral obstacle
 * @param {x-position} x 
 * @param {y-position} y 
 */
function coralBar(x, y, w, h) {
    push();
    fill(255, 0, 0);
    rect(x, y, w, h);
    pop();
}

/**
 * Draws a plankton
 * @param {x-position} x 
 * @param {y-position} y 
 * @param {rotation} r 
 */
function plankton(x, y, r) {
  push();

  translate(x,y);
  rotate(r);
  //plankton body
  fill(245, 0, 114, 150);
  ellipse(0,0,4,14);
  
  //plankton left legs
  for(var i = 0; i < 6; i++){
      push();
      translate(2, i * 0.3);
      rotate(i * -19.3);
      stroke(255, 255, 255, 150);
      line(-3,-4, -5, -7);
      pop();
  }
      
  for(var i = 0; i < 6; i++){
      push();
      translate(-2, i * 0.3);
      rotate(i * 19.3);
      stroke(255, 255, 255, 150);
      line(3,-4, 5, -7);
      pop();
  }

  pop();
};

var wave;
var isMousePressed;
var planktonCount;
var sandDollarCount;
var health;

var maxPlankton;
var maxSandDollar;
var maxCoral;

var xPlankton;
var yPlankton;
var xSandDollar;
var ySandDollar;
var xCoral;
var yCoral;
var dyCoral;
var wCoral;
var hCoral;
var jellyFishX;
var jellyFishY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  maxPlankton = 5;
  maxSandDollar = 1;
  maxCoral = 10;

  xPlankton = [];
  yPlankton = [];
  xCoral = [];
  yCoral = [];
  dyCoral = [];
  wCoral = [];
  hCoral = [];
  xSandDollar = [];
  ySandDollar = [];
  jellyFishX = windowWidth/2;
  jellyFishY = windowHeight/5;

  planktonCount = 0;
  sandDollarCount = 0;

  health = 1000;
  isMousePressed = false;
  wave = 0;

  for(var i = 0; i < maxPlankton; i++){
    xPlankton.push(random(100, windowWidth-100));
    yPlankton.push(windowHeight - 100);

  }

  for (var i = 0; i < maxSandDollar; i++) {
    xSandDollar.push(windowWidth/2);
    ySandDollar.push(windowHeight/2);
  }

  for (var i = 0; i < maxCoral; i++) {
    var w = (random() * windowWidth/2) + 50;

    if (random() < 0.5) {
      xCoral.push(0);
    } else {
      xCoral.push(windowWidth-w);
    }

    yCoral.push(windowHeight - i * 100);
    dyCoral.push(random()*4 + 1);
    wCoral.push(w);
    hCoral.push(50);
  }

  textSize(28);
}

function mouseDragged() {
  jellyFishX = mouseX;
}

function draw() {
  /************** Draw *****************/
  background(138, 163, 189);
  
  for (var i = 0; i < maxCoral; i++) {
    coralBar(xCoral[i], yCoral[i], wCoral[i], hCoral[i]);
  }

  for (var i = 0; i < maxPlankton; i++) {
    plankton(xPlankton[i], yPlankton[i], 90 + yPlankton[i] * 1.2);
  }

  for (var i = 0; i < maxSandDollar; i++) {
    sandDollar(xSandDollar[i], ySandDollar[i]);
  } 

  jellyFish(jellyFishX, jellyFishY);

  text('Plankton: ' + planktonCount, 50, 50);
  text('Sand Dollars: ' + sandDollarCount, 50, 90);
  text('Health: ' + health, 50, 130);
  /************** /Draw *****************/

  /************** Translation *****************/
  for (var i = 0; i < maxPlankton; i++) {
    if (random(0, 1) > 0.5) {
      xPlankton[i] += cos(wave * random(0.0625, 0.125)) * random(1, 3.256);
    } else {
      xPlankton[i] += sin(wave * random(0.0625, 0.125)) * random(1, 3.256);
    }
    yPlankton[i] -= random(.5, 5);
    if(yPlankton[i] <= -5){
        yPlankton[i] = windowHeight - 100;
        xPlankton[i] = random(50, 350);
    }
  }

  for (var i = 0; i < maxCoral; i++) {
    if (yCoral[i] <= -5) {
      var w = (random() * windowWidth/2) + 50;

      if (random() < 0.5) {
        xCoral[i] = 0;
      } else {
        xCoral[i] = windowWidth-w;
      }

      yCoral[i] = windowHeight - 100;
      wCoral[i] = w;
      hCoral[i] = 50;
    }
    yCoral[i] -= 5;
  }

  wave++;
  /************** /Translation ****************/

  /************** Collision *****************/
  for (var i = 0; i < maxPlankton; i++) {
    if (abs(xPlankton[i] - jellyFishX) < 10 && abs(yPlankton[i] - jellyFishY) < 10) {
      yPlankton[i] = windowHeight - 100;
      xPlankton[i] = random(50, 350);
      if (health + 50 > 1000) {
        health = 1000;
      } else {
        health += 50;
      }
      planktonCount++;
    }
    if (abs(xSandDollar[i] - jellyFishX) < 10 && abs(xSandDollar[i] - jellyFishY) < 10) {
      maxSandDollar = 0;
      sandDollarCount++;
    }
  }

  for (var i = 0; i < maxCoral; i++) {
    if (abs(xCoral[i] - jellyFishX) < wCoral[i] && abs(yCoral[i] - jellyFishY) < hCoral[i]) {
      health -= 50;
    }
  }
  /************** /Collision *****************/

  health--;
}
