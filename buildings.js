let buildings = {};
let buildMode = false;

class Rocket{
    constructor(){
        this.x=0;
        this.y=0;
        this.angle=0;
        this.scale=0.3;
        this.r = 600;
        this.landing = false;
        this.landed = false;
        this.timer = new Timer(10)
    }

    Land(){
       this.r += Math.min((180 - this.r)/100,-0.5)
       if(this.r<=180){
           this.landing = false;
           this.landed = true;
           population = 10;
       }
   }


    Draw(){
        if(this.landing){
            this.Land();
        }

        if(this.landed && population == 0){
        
        }

        let c = Cartesian(this.r,this.angle-90);
        push();
        translate(c.x,c.y);
        rotate(this.angle * PI / 180);
        scale(this.scale);
        noStroke();
        fill(187,179,173);
        beginShape();
        vertex(60,0);
        vertex(60,-120);
        vertex(0,-180);
        vertex(-60,-120);
        vertex(-60,0);
        vertex(-30,30);
        vertex(30,30);
        vertex(60,0);
        endShape();
        noStroke();
        fill(52,117,117);
        beginShape();
        vertex(60,0);
        vertex(90,30);
        vertex(90,90);
        vertex(60,90);
        vertex(30,60);
        vertex(30,30);
        vertex(60,0);
        endShape();
        noStroke();
        fill(52,117,117);
        beginShape();
        vertex(-30,30);
        vertex(-30,60);
        vertex(-60,90);
        vertex(-90,90);
        vertex(-90,60);
        vertex(-90,30);
        vertex(-60,0);
        vertex(-30,30);
        endShape();
        noStroke();
        fill(117,63,63);
        beginShape();
        vertex(0,-180);
        vertex(0,-120);
        vertex(30,-90);
        vertex(30,-60);
        vertex(0,-30);
        vertex(0,30);
        vertex(30,30);
        vertex(60,0);
        vertex(60,-120);
        vertex(0,-180);
        endShape();
        noStroke();
        fill(39,33,33);
        beginShape();
        vertex(0,-120);
        vertex(-30,-90);
        vertex(-30,-60);
        vertex(0,-30);
        vertex(30,-60);
        vertex(30,-90);
        vertex(0,-120);
        endShape();
        pop();
    }
}

class Building{
    constructor(_scale,_r1){
        this.x=0;
        this.y=0;
        this.r1=_r1;
        this.angle=Math.random()*360;
        this.scale=_scale;
        this.r = 1;
        this.building = false;
        this.built = false;
    }

    Build(){
        this.r += Math.max((this.r1 - this.r)/100,0.5)
        if(this.r>=this.r1){
            this.building = false;
            this.built = true;
        }
    }

    Shape(){

    }

    Draw(){
        if(!this.building && !this.built){
            return;
        }

        if(this.building){
            this.Build();
        }

        let c = Cartesian(this.r,this.angle-90);
        push();
        translate(c.x,c.y);
        rotate(this.angle * PI / 180);
        scale(this.scale);
        this.Shape();
        pop();
    }
}

class smelter extends Building{
    constructor(){
        super(0.25,145);
   }
   
   Shape(){
        strokeWeight(1);
        stroke(128,160,192);
        fill(128,160,192);
        beginShape();
        vertex(90,-60);
        vertex(60,-120);
        vertex(-30,-120);
        vertex(-60,-60);
        vertex(-30,0);
        vertex(60,0);
        vertex(90,-60);
        endShape();
        strokeWeight(1);
        stroke(192,192,192);
        fill(192,192,192);
        beginShape();
        vertex(-60,-60);
        vertex(-30,0);
        vertex(-150,0);
        vertex(-120,-60);
        vertex(-60,-60);
        endShape();
        strokeWeight(1);
        stroke(64,96,192);
        fill(64,96,192);
        beginShape();
        vertex(-30,-120);
        vertex(-60,-180);
        vertex(-120,-180);
        vertex(-150,-120);
        vertex(-120,-60);
        vertex(-60,-60);
        vertex(-30,-120);
        endShape();
        strokeWeight(1);
        stroke(0,0,0);
        fill(0,0,0);
        beginShape();
        vertex(-120,0);
        vertex(-90,-60);
        vertex(-60,0);
        vertex(-120,0);
        endShape();
        noStroke();
        fill(192,192,192);
        rect(-120,-60,60,30,1);
        noStroke();
        fill(192,192,192);
        beginShape();
        vertex(-30,-120);
        vertex(0,-180);
        vertex(30,-180);
        vertex(60,-120);
        vertex(-30,-120);
        endShape();
        noStroke();
        fill(192,192,192);
        beginShape();
        vertex(0,-90);
        vertex(30,-90);
        vertex(60,-60);
        vertex(30,-30);
        vertex(0,-30);
        vertex(-30,-60);
        vertex(0,-90);
        endShape();
        pop();
    }
}
class platform extends Building{
     constructor(){
         super(0.25,145);
    }
    
    Shape(){
       stroke(214,98,98);
       strokeWeight(5);
       line(120,60,120,0);
       stroke(214,98,98);
       strokeWeight(5);
       line(120,0,90,0);
       stroke(214,98,98);
       strokeWeight(5);
       line(90,0,90,60);
       stroke(214,98,98);
       strokeWeight(5);
       line(90,0,120,30);
       stroke(214,98,98);
       strokeWeight(5);
       line(120,30,90,30);
       stroke(214,98,98);
       strokeWeight(5);
       line(90,30,120,60);
       stroke(214,98,98);
       strokeWeight(5);
       line(-90,0,-90,60);
       stroke(214,98,98);
       strokeWeight(5);
       line(-90,0,-120,0);
       stroke(214,98,98);
       strokeWeight(5);
       line(-120,0,-120,60);
       stroke(214,98,98);
       strokeWeight(5);
       line(-120,0,-90,30);
       stroke(214,98,98);
       strokeWeight(5);
       line(-90,30,-120,30);
       stroke(214,98,98);
       strokeWeight(5);
       line(-120,30,-90,60);
       noStroke();
       fill(141,125,128);
       rect(-150,-30,300,30,1);
       noStroke();
       fill(79,82,82);
       beginShape();
       vertex(150,0);
       vertex(120,-30);
       vertex(90,-30);
       vertex(120,0);
       vertex(150,0);
       endShape();
       noStroke();
       fill(79,82,82);
       beginShape();
       vertex(90,0);
       vertex(60,-30);
       vertex(30,-30);
       vertex(60,0);
       vertex(90,0);
       endShape();
       noStroke();
       fill(79,82,82);
       beginShape();
       vertex(30,0);
       vertex(0,-30);
       vertex(-30,-30);
       vertex(0,0);
       vertex(30,0);
       endShape();
       noStroke();
       fill(79,82,82);
       beginShape();
       vertex(-30,0);
       vertex(-60,-30);
       vertex(-90,-30);
       vertex(-60,0);
       vertex(-30,0);
       endShape();
       noStroke();
       fill(79,82,82);
       beginShape();
       vertex(-90,0);
       vertex(-120,-30);
       vertex(-150,-30);
       vertex(-120,0);
       vertex(-90,0);
       endShape();
   }
}

class mine extends Building{
    constructor(){
        super(0.25,130)
    }

    Shape(){
        noStroke();
        fill(0,160,224);
        beginShape();
        vertex(180,0);
        vertex(150,-90);
        vertex(120,-60);
        vertex(180,0);
        endShape();
        noStroke();
        fill(128,192,224);
        beginShape();
        vertex(120,-60);
        vertex(90,0);
        vertex(180,0);
        vertex(120,-60);
        endShape();
        noStroke();
        fill(128,192,224);
        beginShape();
        vertex(150,-90);
        vertex(60,-180);
        vertex(120,-60);
        vertex(150,-90);
        endShape();
        noStroke();
        fill(32,192,224);
        beginShape();
        vertex(60,-180);
        vertex(0,-180);
        vertex(120,-60);
        vertex(60,-180);
        endShape();
        noStroke();
        fill(160,192,224);
        beginShape();
        vertex(60,-120);
        vertex(-60,-120);
        vertex(0,-180);
        vertex(60,-120);
        endShape();
        noStroke();
        fill(96,192,224);
        beginShape();
        vertex(0,-180);
        vertex(-120,-60);
        vertex(-60,-180);
        vertex(0,-180);
        endShape();
        noStroke();
        fill(192,192,224);
        beginShape();
        vertex(-60,-180);
        vertex(-150,-90);
        vertex(-120,-60);
        vertex(-60,-180);
        endShape();
        noStroke();
        fill(32,96,224);
        beginShape();
        vertex(-150,-90);
        vertex(-180,0);
        vertex(-120,-60);
        vertex(-150,-90);
        endShape();
        noStroke();
        fill(32,192,192);
        beginShape();
        vertex(-120,-60);
        vertex(-90,0);
        vertex(-180,0);
        vertex(-120,-60);
        endShape();
        strokeWeight(1);
        stroke(0,0,0);
        fill(0,0,0);
        beginShape();
        vertex(-60,-120);
        vertex(60,-120);
        vertex(120,-60);
        vertex(90,0);
        vertex(-90,0);
        vertex(-120,-60);
        vertex(-60,-120);
        endShape();
        stroke(192,192,256);
        strokeWeight(1);
        line(30,-180,30,-240);
        stroke(192,192,256);
        strokeWeight(1);
        line(-30,-180,-30,-270);
        strokeWeight(1);
        stroke(192,192,256);
        noFill();
        circle(30,-240,10);
        strokeWeight(1);
        stroke(192,192,256);
        noFill();
        circle(-30,-270,10);
        stroke(192,192,256);
        strokeWeight(1);
        line(120,-120,150,-150);
        stroke(192,192,256);
        strokeWeight(1);
        line(-90,-150,-150,-210);
        stroke(192,192,256);
        strokeWeight(1);
        line(-150,-210,-150,-240);
        stroke(192,192,256);
        strokeWeight(1);
        line(150,-150,150,-180);
        strokeWeight(1);
        stroke(192,192,256);
        fill(256,0,0);
        circle(150,-180,10);
        strokeWeight(1);
        stroke(192,192,256);
        fill(256,0,0);
        circle(-150,-240,10);
    }
}

class Tree{
    constructor(ang,dist){
       this.angle=ang+90;
        this.x=dist*cosd(ang);
        this.y=dist*sind(ang);
        this.scale=0.05+Math.random()*0.05;
        this.r = Math.random()*80-10;
        this.g = Math.random()*10-5;
        this.age = 0;
    }

    
    Draw(){
        push();
        translate(this.x,this.y);
        rotate(this.angle * PI / 180);
        scale(this.scale*Math.min(1,this.age/100));
        strokeWeight(2);
        stroke(49,82,9);
        fill(14+this.r,74+this.g,22);
        beginShape();
        vertex(0,-30);
        vertex(90,-30);
        vertex(0,-330);
        vertex(-90,-30);
        vertex(0,-30);
        endShape();
        stroke(71,39,9);
        strokeWeight(3);
        line(0,0,0,-300);
        stroke(71,39,9);
        strokeWeight(3);
        line(0,-60,30,-90);
        stroke(71,39,9);
        strokeWeight(3);
        line(0,-90,-30,-120);
        stroke(71,39,9);
        strokeWeight(3);
        line(0,-120,30,-150);
        stroke(71,39,9);
        strokeWeight(3);
        line(0,-150,-30,-180);
        strokeWeight(3);
        stroke(71,0,0);
        fill(255,0,22);
        circle(30,-150,10);
        strokeWeight(3);
        stroke(71,0,0);
        fill(255,0,22);
        circle(-30,-120,10);
        pop();
    }
}

class Asteroid{
    constructor(){
        this.angle=0;
        this.scale=0.1;
       this.timer = new Timer(0.1)
        this.Spawn();
    }

    Spawn(){
       let speed = Math.random()*0.3 + 0.5;
       this.ang = Math.random()*360;
       let r = 500;
       let c = Cartesian(r,this.ang);
       let v = Cartesian(speed,this.ang+135);
       this.speed = createVector(v.x,v.y);
       this.accel = createVector();
       this.pos= createVector(c.x,c.y);
       this.g = -100;
       this.falling = false;
    }

    Stall(){
        let mPos = createVector(mouseX-400,mouseY-400);
        if(mPos.dist(this.pos)<20){
            this.g-=1000;
           this.falling = true;
        }
    }

    Simulate(){
       
       let d = this.pos.mag();
       let f = this.g/(d*d);
       this.accel.x = f * this.pos.x/d;
       this.accel.y = f * this.pos.y/d;

       this.speed.x +=this.accel.x;
       this.speed.y +=this.accel.y;

       this.pos.x+=this.speed.x;
       this.pos.y+=this.speed.y;
       if(d<140){
           storage+=100;
           this.Spawn();
       }

       if(d > 600){
           this.Spawn();
       }

       if(this.falling && this.timer.Update(true)){
           new Particle(this.pos.x+400,this.pos.y+400,color(200,200,200),20,1);
       }
    }

    Draw(){
        this.Simulate();
        push();
        translate(this.pos.x,this.pos.y);
        rotate(this.angle * PI / 180);
        scale(this.scale);
        noStroke();
        fill(109,255,255);
        beginShape();
        vertex(0,-90);
        vertex(60,-30);
        vertex(60,30);
        vertex(0,90);
        vertex(-90,90);
        vertex(-120,60);
        vertex(-120,0);
        vertex(-30,-90);
        vertex(0,-90);
        endShape();
        noStroke();
        fill(255,255,255);
        beginShape();
        vertex(-30,-60);
        vertex(0,-60);
        vertex(90,30);
        vertex(90,90);
        vertex(60,120);
        vertex(-30,120);
        vertex(-90,60);
        vertex(-90,0);
        vertex(-30,-60);
        endShape();
        pop();
    }
}

class Wheat{
	constructor(ang,dist){
		this.angle=ang+90;
		 this.x=dist*cosd(ang);
		 this.y=dist*sind(ang);
		 this.scale=0.05+Math.random()*0.005;
		 this.age = 0;
	}

	 Draw(){
		 push();
		 translate(this.x,this.y);
		 rotate(this.angle * PI / 180);
		 scale(this.scale*Math.min(1,this.age/100));
		 noStroke();
		 fill(255,255,0);
		 beginShape();
		 vertex(-30,-210);
		 vertex(30,-210);
		 vertex(0,-240);
		 vertex(-30,-210);
		 endShape();
		 strokeWeight(1);
		 stroke(255,192,0);
		 fill(71,60,0);
		 beginShape();
		 vertex(30,-240);
		 vertex(30,-60);
		 vertex(0,-30);
		 vertex(-30,-60);
		 vertex(-30,-240);
		 vertex(0,-210);
		 vertex(30,-240);
		 endShape();
		 stroke(255,192,0);
		 strokeWeight(1);
		 line(0,-150,30,-180);
		 stroke(255,192,0);
		 strokeWeight(1);
		 line(0,-120,-30,-150);
		 stroke(255,192,0);
		 strokeWeight(1);
		 line(0,-180,-30,-210);
		 stroke(255,192,0);
		 strokeWeight(1);
		 line(0,-90,30,-120);
		 stroke(255,192,0);
		 strokeWeight(1);
		 line(0,-60,-30,-90);
		 stroke(255,192,0);
		 strokeWeight(1);
		 line(0,-210,0,0);
		 pop();
	 }
}

class Ship{
    constructor(){
        this.x=0;
        this.y=0;
        this.angle=0;
        this.scale=0.2;
    }

    FireLaser(){
        strokeWeight(10);
        let c = color(0,0,0);
        if(spinner.activeMode == FARM){
           c.setRed(255);
           c.setGreen(255);
        } else if(spinner.activeMode == LAND){
            c.setRed(0);
            c.setGreen(255);
        }
        
        else {
            return 0;
        }
           
       stroke(c);
        line(this.x,this.y,0,0);

        strokeWeight(6);
        stroke(255,255,255);
        line(this.x,this.y,0,0);
        return this.angle;
    }

    Draw(){
       strokeWeight(1/this.scale);
        push();
        translate(this.x,this.y);
        rotate(this.angle * PI / 180);
        scale(this.scale);
        noStroke();
		 fill(96,0,0);
		 beginShape();
		 vertex(-180,-30);
		 vertex(180,-30);
		 vertex(150,0);
		 vertex(-150,0);
		 vertex(-180,-30);
		 endShape();
		 strokeWeight(1);
		 stroke(0,160,160);
		 fill(0,192,192);
		 beginShape();
		 vertex(-30,0);
		 vertex(0,30);
		 vertex(30,0);
		 vertex(-30,0);
		 endShape();
		 strokeWeight(1);
		 stroke(192,32,0);
		 fill(160,32,0);
		 beginShape();
		 vertex(180,-30);
		 vertex(120,-90);
		 vertex(-120,-90);
		 vertex(-180,-30);
		 vertex(180,-30);
		 endShape();
		 strokeWeight(1);
		 stroke(32,0,0);
		 fill(64,0,0);
		 beginShape();
		 vertex(0,-120);
		 vertex(90,-30);
		 vertex(-90,-30);
		 vertex(0,-120);
		 endShape();
		 noStroke();
		 fill(96,160,224);
		 beginShape();
		 vertex(30,-90);
		 vertex(60,-90);
		 vertex(120,-30);
		 vertex(90,-30);
		 vertex(30,-90);
		 endShape();
		 noStroke();
		 fill(96,160,224);
		 beginShape();
		 vertex(-30,-90);
		 vertex(-90,-30);
		 vertex(-120,-30);
		 vertex(-60,-90);
		 vertex(-30,-90);
		 endShape();
		 noStroke();
		 fill(32,0,0);
		 beginShape();
		 vertex(90,-30);
		 vertex(120,-30);
		 vertex(90,0);
		 vertex(60,0);
		 vertex(90,-30);
		 endShape();
		 noStroke();
		 fill(32,0,0);
		 beginShape();
		 vertex(-120,-30);
		 vertex(-90,0);
		 vertex(-60,0);
		 vertex(-90,-30);
		 vertex(-120,-30);
		 endShape();
        pop();
    }
}

class lab extends Building{
    constructor(){
        super(0.25,130)
    }
    Shape(){
        noStroke();
		 fill(224,224,256);
		 beginShape();
		 vertex(0,0);
		 vertex(60,0);
		 vertex(90,-30);
		 vertex(90,-120);
		 vertex(60,-150);
		 vertex(0,-150);
		 vertex(-30,-120);
		 vertex(-30,-30);
		 vertex(0,0);
		 endShape();
		 noStroke();
		 fill(128,224,256);
		 beginShape();
		 vertex(0,0);
		 vertex(30,-30);
		 vertex(30,-150);
		 vertex(30,-210);
		 vertex(0,-240);
		 vertex(-60,-240);
		 vertex(-90,-210);
		 vertex(-90,-30);
		 vertex(-60,0);
		 vertex(0,0);
		 endShape();
		 noStroke();
		 fill(192,224,256);
		 beginShape();
		 vertex(-120,-150);
		 vertex(-90,-150);
		 vertex(-30,-90);
		 vertex(-30,0);
		 vertex(-120,0);
		 vertex(-180,-60);
		 vertex(-180,-90);
		 vertex(-120,-150);
		 endShape();
		 stroke(64,224,256);
		 strokeWeight(1);
		 line(-150,-120,-180,-150);
		 noStroke();
		 fill(256,224,256);
		 beginShape();
		 vertex(-150,-180);
		 vertex(-150,-150);
		 vertex(-180,-120);
		 vertex(-210,-120);
		 vertex(-150,-180);
		 endShape();
		 noStroke();
		 fill(128,128,128);
		 beginShape();
		 vertex(-150,-30);
		 vertex(-180,0);
		 vertex(-120,0);
		 vertex(-150,-30);
		 endShape();
		 noStroke();
		 fill(128,128,128);
		 beginShape();
		 vertex(90,-30);
		 vertex(120,0);
		 vertex(60,0);
		 vertex(90,-30);
		 endShape();
		 stroke(64,224,256);
		 strokeWeight(1);
		 line(30,-150,60,-180);
		 noStroke();
		 fill(192,192,192);
		 beginShape();
		 vertex(30,-210);
		 vertex(90,-150);
		 vertex(120,-150);
		 vertex(30,-240);
		 vertex(30,-210);
		 endShape();
		 noStroke();
		 fill(64,64,64);
		 beginShape();
		 vertex(-120,-120);
		 vertex(-90,-120);
		 vertex(-60,-90);
		 vertex(-60,-60);
		 vertex(-90,-30);
		 vertex(-120,-30);
		 vertex(-150,-60);
		 vertex(-150,-90);
		 vertex(-120,-120);
		 endShape();
		 stroke(64,224,256);
		 strokeWeight(1);
		 line(-120,-90,-90,-60);
		 stroke(64,224,256);
		 strokeWeight(1);
		 line(-90,-90,-120,-60);
    }
}

class house extends Building{
    constructor(){
        super(0.25,130)
    }
    Shape(){
        noStroke();
        fill(171,176,179);
        beginShape();
        vertex(0,-180);
        vertex(60,-180);
        vertex(90,-120);
        vertex(30,-120);
        vertex(0,-180);
        endShape();
        noStroke();
        fill(138,141,144);
        beginShape();
        vertex(90,-120);
        vertex(120,-60);
        vertex(90,0);
        vertex(30,0);
        vertex(0,-60);
        vertex(30,-120);
        vertex(90,-120);
        endShape();
        noStroke();
        fill(138,141,216);
        beginShape();
        vertex(30,-120);
        vertex(0,-60);
        vertex(-60,-60);
        vertex(-90,-120);
        vertex(-60,-180);
        vertex(0,-180);
        vertex(30,-120);
        endShape();
        noStroke();
        fill(181,181,184);
        beginShape();
        vertex(30,0);
        vertex(-90,0);
        vertex(-60,-60);
        vertex(0,-60);
        vertex(30,0);
        endShape();
        stroke(125,125,119);
        fill(125,125,119);
        beginShape();
        vertex(-90,-120);
        vertex(-120,-60);
        vertex(-90,0);
        vertex(-60,-60);
        vertex(-90,-120);
        endShape();
    }
}

function SetupBuildings(){
    buildings["platform"] = new platform();
    buildings["mine"] = new mine();
    buildings["lab"] = new lab();
    buildings["smelter"] = new smelter();

}

function AddHouse(){
    let h = new house();
    h.building = true;
    houses.push(h);
}

function DrawBuildings(){
    for (const [key, value] of Object.entries(buildings)) {
        value.Draw();
      }

      houses.forEach(h=>{h.Draw()});

}