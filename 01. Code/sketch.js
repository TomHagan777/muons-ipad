//intial loader ¬
let mode;
let radiationAlpha = 255;
let notFoundAlpha = 0;
let loadBar1 = 0;
let barAlpha1 = 255;
let loadBar2 = 0;
let barAlpha2 = 0;

//muon detector simulation intialise ¬
let muon = 0;
let muon2 = 1;
let LEDoff = true;
let offTimer = 1;

//user control intialise ¬
let newMouseX = 1;
let fluxMode = false;     //flux control
let burnMode = false;     //burn
let resetButton = false;  //reset
let hideControl = 0;
let standByFill = [0,0,75,100];

//star intialise ¬
let tails = 100;
let noiseScale = 500;
let noiseStrength = 1;
let stars = [];   //<–– stars fill here
let bigStar = []; //<–– big stars fill here

//clock intialise ¬
let seconds = 0;
let minutes = 0;
let hours = 0;
let colonVarH = '0';
let colonVarM = ':0';
let colonVarS = ':0';

function setup() {
  mode = 1;
  cnv = createCanvas(windowWidth,windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(RADIANS);
  rectMode(CENTER);

  background(0,0,0,100);
  noCursor();

  textSize(14) //make this reponsive to media width along with 'twinkle'
  textFont('Inter');
  textStyle(400);

  //for clock ¬
  setInterval(timeItSeconds,  1000); //runs every second
  setInterval(timeItMinutes, 60000); //runs every minute
  setInterval(timeItHours, 3600000); //runs every hour

  //buttons ¬
  resetButton = createButton("Reset");
  resetButton.mousePressed(resetCount);
    resetButton.position(width-130,height-35);
    resetButton.style('padding-right: 82px;');
    resetButton.addClass("buttonClass");

  fluxButton = createButton("Flux");
  fluxButton.mousePressed(fluxModeActivated);
    fluxButton.position(width-270,height-35);
    fluxButton.style('padding-right: 100px;');
    fluxButton.addClass("buttonClass");

  burnButton = createButton("Burn");
  burnButton.mousePressed(trailModeActivated);
    burnButton.position(width-410,height-35);
    burnButton.style('padding-right: 95px;');
    burnButton.addClass("buttonClass");

  //variable for saving canvas (currently switched off) ¬
  saveCanvas = createGraphics(windowWidth, windowHeight); 
  //cnv.mousePressed(exportCanvas); //<–– switch this function on to 'click' to save canvas
  exportButton = false;

////INTIALISE MUONS FOR TESTING////////////////////////////////////////////////////////////////////////////////////
 
  muon = 100;
  muon2 = muon+1;

  for (let i=0; i<muon; i++) {
    let loc = createVector(random(width), random(height), random(0.5,2));
    let angle = 0;
    let dir = createVector(cos(angle), sin(angle));
    let speed = random(0.15,0.50)
    
    let randomInterval1 = int(random(0,75));
    if (randomInterval1 === 1) {   //REDS
      newFill = random(0,50);
      bigStarFill = random(0,50);
    } else {
      newFill = random(230,260); //PURPLES
      bigStarFill = random(230,260);
    }

    if (randomInterval1 <= 7){
      let flare = random(20, width-20);
      let bigStarSize = random(1,3);
      let bS = new BigStar (loc, dir, speed, bigStarFill, bigStarSize, flare);
      bigStar.push(bS);
    } else {
      let p = new StarNature (loc, dir, speed, newFill);
      stars.push(p);
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
}

function draw() {
  if (mode == 0){
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// Initaliser Loading ¬
  
  background(0);
  fill(255,radiationAlpha);
  text('searching for radiation detector...', width/2-90, height/2);
  fill(255,notFoundAlpha);
  text('no detector found — starting simulator...', width/2-110, height/2);
  
  fill(0,0,50,barAlpha1)
  rectMode(CORNER);
  rect(width/2-90, height/2+20, loadBar1++, 10);
  
  if(loadBar1 > 130){
    barAlpha1 = 0;
    fill(loadBar2*1.5,100,50+loadBar2/3,barAlpha2)
    barAlpha2 = 255;
    rect(width/2-90, height/2+20, loadBar2++, 10);
    radiationAlpha = 0; 
    notFoundAlpha = 255;
  }

  if (loadBar2 > 180){
    barAlpha2 = 0;
    notFoundAlpha = 0;
    mode = 1;
  }
}

if (mode == 1){
  blendMode(BLEND); //so additive blending does not affect background
  fill(0,0,0,tails); //background
  rect(width/2, height/2, width, height);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////// LED Off ¬ 

  let waitTimer = map(offTimer, 0, 60, 3, 1, true);

  if (LEDoff == true){
      offTimer++;
    } else {
      LEDoff = true;
      }
  
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////  
///////////////////////////////////////////////////////// LED On ¬

  let randomInterval = int(random(0,400)); //muon detector simulator
  if (randomInterval <= 5){  
      muon++;  
  }

  if (muon == muon2) { //muon = inData... muon2 = inData+1. When they match, run ¬
      let angle = 0;   //initialise angle as number
      let dir = createVector(cos(angle), sin(angle));
      let speed = random(0.15,0.50); //depth: new star is differnt speed for parallaxing. 35 possible speeds
      let rSize = waitTimer;         //depth: the quicker a muon is found the bigger it is. 20 possible sizes
      let loc = createVector(random(width), random(height), rSize); //random location .x and .y and size .z 
      
      //colours ¬
      let randomIntervalColour = int(random(0,75));
      if (randomIntervalColour === 1) { //1 in 75 chance of hitting yellow/orange/red
        newFill = random(0,50);
        bigStarFill = random(0,50);
      } else {
        newFill = random(230,260);
        bigStarFill = random(230,260);
      }

      if (offTimer <= 20){ //if offTimer is less or equal to 20, run star with flare, otherwise –> normal star
        let flare = random(20, width-20);
        let bigStarSize = random(1,3);
        let bS = new BigStar (loc, dir, speed, bigStarFill, bigStarSize, flare);
        bigStar.push(bS);
      } else {
        let p = new StarNature (loc, dir, speed, newFill);
        stars.push(p);
      }
      
      offTimer = 0;     //resets off timer back to zero to start again
      LEDoff = false 
      console.log(bigStar.length + '/' + muon); //handy: 'how many flared stars are created vs total stars in console log'
      
      muon2++;   //vital: muon2 is always one ahead of muon, kicking us out of this star creation conditional
    } 

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// Run Stars ¬ 
for (let i=0; i < stars.length; i++) {
      stars[i].move();
      stars[i].checkEdges();
      stars[i].update();
      }

for (let i=0; i < bigStar.length; i++) {
      bigStar[i].move();
      bigStar[i].checkEdges();
      bigStar[i].update();
      }
  
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////  
//////////////////////////////////////////////////////// Twinkle ¬  

let responsiveWidth = width/7
//console.log(width, '+', responsiveWidth);

if (burnMode == true && muon > 0){
  tails = 5;
  scintillationAmount = 0;
  burnButton.style('border: solid 1px; padding-top: 5px; padding-left: 6px;')
} else if (burnMode == false && muon < responsiveWidth){        //220
  tails = 100;
  scintillationAmount = 100;
} else if (burnMode == false && muon < responsiveWidth+80){     //300
  tails = 100;
  scintillationAmount = 80;
} else if (burnMode == false && muon < responsiveWidth+140){    //360
  tails = 100;
  scintillationAmount = 50;
} else if (burnMode == false && muon < responsiveWidth+160){    //380
  tails = 100;
  scintillationAmount = 30;
} else if (burnMode == false && muon < responsiveWidth+180){    //400
  tails = 100;
  scintillationAmount = 20;
} else if (burnMode == false && muon >= responsiveWidth+180){   //400
  tails = 100;
  scintillationAmount = 20; //scintillation gradually phases out as muon count increases
}

if (burnMode == false){
  burnButton.style('border: 0px; border-top: solid 1px; padding-top: 5px; padding-left: 7px;')
}

  push() //fast moving black forms covering the canvas causing stars to twinkle. Nice.
    for (let scintillationX = 0; scintillationX <= width; scintillationX+=width/200){
      for (let scintillationY = 0; scintillationY <= height; scintillationY+=height/20){
        blendMode(NORMAL)
        fill(360,100,0,scintillationAmount);
        rotate(sin(frameCount));
        ellipse(scintillationX, scintillationY, 20, 20 * sin(frameCount/10-scintillationY));
      }
    }
  pop()

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////  
//////////////////////////////////////////////// Button Functions ¬  
noiseMap = map(mouseY, 0, height, 100, 2000);

if(fluxMode == true){
  newMouseX = float(map(mouseX, 0, width, -50, 50)) //direction + speed control
  noiseScale = noiseMap; //scale of constellation line control
  fluxButton.style('border: solid 1px; padding-top: 5px; padding-left: 6px');
} else {
  newMouseX = 1;
  noiseScale = 500;
  fluxButton.style('border: 0px; border-top: solid 1px; padding-top: 5px; padding-left: 7px')
}

if (exportButton == true){
    annotationsFill = [0,0,0,0]; //makes annotations temporarily invisible for export
    let c = get(0, 0, width, height);
    saveCanvas.image(c, 0, 0);
    save(saveCanvas, muon+" stars"+".png");
    exportButton = !exportButton; //kicks you out of the conditional for only one download
} else {
    annotationsFill = [0,0,75,100]; //text back to white
}

///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////// Annotations ¬  

if (seconds >= 10){ //clock conditionals for double digit format, eg:'00:00:00'
  colonVarS = ':';
} else {
  colonVarS = ':0';
}
if (minutes >= 10){
  colonVarM = ':';
} else {
  colonVarM = ':0';
}
if (hours >= 10){
  colonVarH = '';
} else {
  colonVarH = '0';
}

if (keyCode === DOWN_ARROW){ //keyboard controls to hide text + menu
  hideControl++;
  standByFill = [0,0,100,0];
} else {
  hideControl = 100;
  standByFill = [0,0,100,0];
}
if (hideControl >= 100){
  hideControl = 100;
} 

if (keyCode === UP_ARROW){
  hideControl--;
} 
if (hideControl <= 0){
  hideControl = 0;
}

  rectMode(CORNER);
  fill(standByFill);
  rect(76, height-11+hideControl, 1, -offTimer);
  rectMode(CENTER);

  fill(annotationsFill); //all visible text is here ¬
  text('Stand By:  ' + offTimer, 10, height-12+hideControl);
  text('Muon Count: '+ muon, 210, height-12+hideControl);
  text('Up Time: ' + colonVarH + hours + colonVarM + minutes + colonVarS + seconds, 410, height-12+hideControl);
  
  resetButton.position(width-132,height-35+hideControl);
  fluxButton.position(width-271.5,height-35+hideControl);
  burnButton.position(width-410,height-35+hideControl);

///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////// Custom Cursors ¬  

  //conditiionals for different cursors ¬
  // if (fluxMode == true || burnMode == true){
  //   cursorVisibility = 0;
  // } 
  // if (fluxMode == true && burnMode == false){
  //   cursor('grab');
  // } else if (fluxMode == false && burnMode == true && keyCode != DOWN_ARROW){
  //   cursor('cell');
  // } else if (fluxMode == true && burnMode == true){
  //   cursor('grab');
  // } else {
  //   noCursor();
  //   cursorVisibility = 1;
  // }

  // //cursor disappears when mouse runs off canvas ¬
  // if (mouseX <= 0 || mouseX >= width-1 || mouseY <= 0 || mouseY >= height-1 || keyCode === DOWN_ARROW){
  //   cursorVisibility = 0;
  // }

  // //cursor design ¬
  // stroke(annotationsFill);
  // strokeWeight(cursorVisibility);
  // line(mouseX-5, mouseY, mouseX+5, mouseY);
  // line(mouseX, mouseY-5, mouseX, mouseY+5);
  // noStroke();
}

  if (muon >= 1000){ //resets sketch when muons get to 600
    resetCount();
  }
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// Star Nature ¬ 

class StarNature{
  constructor(_loc, _dir, _speed, _newFill){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    this.fill = _newFill;
  }
  
  move(){
    let angle=noise(this.loc.x / noiseScale, this.loc.y / noiseScale, 
                    frameCount / noiseScale) * TWO_PI * noiseStrength; //perlin noise line
    this.dir.x = sin(angle);        //x and y constrained to same angle to meet noise line
    this.dir.y = sin(angle);
    let velocity = this.dir.copy(); //copies direction vector for the below ¬
    let directionNew = 8;           //where speed + direction mouse control happens
    velocity.mult(this.speed * directionNew); //velocity * (speed * directionNew)
    this.loc.add(velocity);         //adds velocity to locaiton
  }
  
  checkEdges(){
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || 
        this.loc.y > height) {      //plots stars back on the map in a new random…
        this.loc.x = random(width); //…location when they travel off canvas
        this.loc.y = random(height);
    }
  }

  update(){ //star form creation ¬
    blendMode(ADD);      
    noStroke()

    //outer orb glow ¬
    fill(this.fill, 100, 5);
    for(let r = 0.0; r < 6; r+=1){
      ellipse(this.loc.x, this.loc.y, this.loc.z * 2 * r);
      }
    
    //white core ¬
    fill(this.fill, 0, 100);
    ellipse(this.loc.x,this.loc.y,this.loc.z);
  }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Big Star Nature ¬ 

class BigStar{
  constructor(_loc, _dir, _speed, _bigStarFill, _bigStarSize, _flare){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    this.fill = _bigStarFill;
    this.coreSize = _bigStarSize;
    this.flare = _flare;
  }

  move(){ //same as star nature above
    let angle=noise(this.loc.x / noiseScale, this.loc.y / noiseScale, 
                    frameCount / noiseScale) * TWO_PI * noiseStrength;
    this.dir.x = sin(angle);
    this.dir.y = sin(angle);
    let velocity = this.dir.copy();
    let directionNew = newMouseX;
    velocity.mult(this.speed * directionNew);
    this.loc.add(velocity);
  }
  
  checkEdges(){ //same as star nature above
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || 
        this.loc.y>height) {    
        this.loc.x = random(width);
        this.loc.y = random(height);
    }
  }

  update(){ //star with flare creation ¬
    blendMode(ADD);
    noStroke()
    let starSpanWidth = 1   

    //cross flare growth ¬
    let starSpan = map(this.loc.x, this.flare-100, this.flare+10, 1, 8, true)
    let starSpan2 = map(this.loc.x, this.flare-10, this.flare+100, 1, 8, true)
    let starSpanMaster = starSpan - starSpan2; //at a random x-point on the canvas the span…
                                               //of the cross flare will increase and decrease…
                                               //this is more natural/realistic than a constant flare

    //cross flare diagonal ¬
    push()
      translate(this.loc.x, this.loc.y);
      rotate(0.785398); //45 degree angle
      fill(this.fill, 100, 1, 100);
      for(let x = 0.0; x <= starSpanMaster/1.5; x+=0.5){
        for(let y = 0.0; y <= starSpanMaster/1.5; y+=0.5){
          rect(0, 0, this.coreSize * 2 * x, starSpanWidth);
          rect(0, 0, starSpanWidth, this.coreSize * 2 * y);
        }
      }
    pop()

    //cross flare horizontal ¬
    fill(this.fill, 100, 0.5, 100);
    for(let x = 0.0; x <= starSpanMaster; x+=0.5){
      for(let y = 0.0; y <= starSpanMaster; y+=0.5){
        rect(this.loc.x, this.loc.y, this.coreSize * 2 * x, starSpanWidth);
        rect(this.loc.x, this.loc.y, starSpanWidth, this.coreSize * 2 * y);
      }
    }

    //outer orb glow ¬
    fill(this.fill, 100, 5, 100);
    for(let r = 0.0; r < 6; r+=1){
      ellipse(this.loc.x, this.loc.y, this.coreSize * 2 * r);
    }
    
    //inner orb glow ¬
    fill(this.fill/2, 100, 5, 100); //a slightly different colour blended with 'outer orb glow'
    for(let r = 0.0; r < 3; r+=0.5){
      ellipse(this.loc.x, this.loc.y, this.coreSize * 2 * r);
    }

    //white core ¬
    blendMode(NORMAL);
    fill(0, 0, 100, 100);
    ellipse(this.loc.x, this.loc.y, this.coreSize/2);
  }
}

////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////// Other Functions ¬

function fluxModeActivated(){      //User Interaction Switches ¬
  fluxMode = !fluxMode;
}

function trailModeActivated(){ 
  burnMode = !burnMode;
}

function exportCanvas() {         //Export Switch
  exportButton = !exportButton;
}

function keyTyped() {             //Hot Key Shortcuts
  if (key === 'f') {
    fluxMode = !fluxMode;
  } else if (key === 'b') {
    burnMode = !burnMode;
  } else if (key === 'r') {
    resetCount();
  }
}

function resetCount(){            //Reset Function
  muon = 0;
  muon2 = 1;
  stars = [];
  bigStar = [];
  frameCount = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  background(0,0,100,100);
}

function timeItSeconds() {        //Clock Functions ¬
  if (seconds < 59) {
    seconds ++;
  } else {
    seconds = 0;
  }
}

function timeItMinutes() {
  if (minutes < 59) {
    minutes ++;
  } else {
    minutes = 0;
  }
}

function timeItHours() {
  if (hours < 23) {
    hours ++;
  } else {
    resetCount(); //if more than a day restarts entire sketch
  }
}

function windowResized() {        //Auto Media Resize Function
  resizeCanvas(windowWidth, windowHeight);
}