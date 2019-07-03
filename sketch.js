var wircles = [];
var itr = 0;
var diam = 20;
var textFader = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
	
	background(100, 120, 140);

  if(wircles.length > 0 && textFader > 0)
		textFader -= 2;

    
  if(textFader > 0){
    fill(255, textFader);
    textSize(32);
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
   	text("CLICK TO MAKE SOME WIGGLY TENDRILS", width/2, height/2); 
  }
	
	for (var i = 0; i < wircles.length; i++){
		wircles[i].resetHit();
    wircles[i].move();
    wircles[i].checkHit();
		wircles[i].display();
   // wircles[wircles.length-1].debug();
	}
	
}

function mouseClicked(){
	wircles.push(new Wircle(itr++));
}

function Wircle(id) {
	
  this.id = id;
  
	this.x = mouseX;
	this.y = mouseY;
	
	this.homeX = width/2;
	this.distance = this.homeX - this.x;
	this.speed = this.distance * .05;
  
  this.accel = this.distance/200;
  
  this.drag = .99;

	
	this.move = function() {
    
    this.distance = this.homeX - this.x;
    this.accel = this.distance/800;
    this.speed += this.accel;
    this.speed *= this.drag;
		this.x += this.speed;
    
    this.hit = [];
	
	}
	
	this.display = function() {
    stroke(255);
    noFill();
    curve(width/2, height, width/2, height, this.x, this.y, this.x-(5*this.distance), this.y-((height-this.y)/2));
	
  	noStroke();
		fill(200);
		ellipse(this.x, this.y, diam);
  }
  
  this.debug = function(){
   	textSize(32);
    fill(255);
  	text("Distance: " + this.distance, 10, 50);
    text("Speed: " + this.speed, 10, 100);
    text("Acceleration: " + this.accel, 10, 150);
  }
  
  this.checkHit = function(){
  	for(var i = 0; i < wircles.length; i++){
    	if(i == this.id)
        continue;
      for(var j = 0; j < this.hit.length; j++){
        if(this.hit[j] == i)
          continue;
      }
      
      if(dist(this.x, this.y, wircles[i].x, wircles[i].y) < diam){
       	this.hit.push(i);
        
        
        var tmp = this.speed;
        this.speed = wircles[i].speed;
        
        wircles[i].hit.push(this.id);
        wircles[i].speed = tmp;
      }
      
    }
  }
  
  this.resetHit = function(){
    this.hit = [];
  }
  
}