class Clouds{
    constructor(){
        this.x=0;
        this.y=0;
        this.angle=0;
        this.scale=0;
        this.max_clouds=5;
        this.circles = [];
        this.GenerateCloud();
        this.dist = 200;
        this.speed = 0.1;
        this.water = 0;

        this.stormTime = 100;
        this.stormDelay = 50;
        this.timer = 0;

        this.drops = [];
    }

    Rain(){
        let diff = this.water*tx_rate;
        this.water-=diff;
        if(this.water<0)this.water = 0;
        let index = Math.floor(XN360(this.angle +270) / spacing);
        segments[index].water+=diff;

        if(this.drops.length<20){
            let drop = {x:Math.random()*80-40};
            drop.maxlife =Math.random()*20+20;
            drop.life =drop.maxlife;
            this.drops.push(drop);
        }
    }

    Simulate(){
        let radians = (this.angle - 90)* PI/180;
        this.x = this.dist*cos(radians);
        this.y = this.dist*sin(radians);

        this.angle+=this.speed;
        this.angle = XN360(this.angle);
        if(this.water<=0){
            this.scale = 0;
        } else {
            this.scale = Math.min(Math.max(0,Math.log10(this.water))/4,1);
        }

        if(this.timer> this.stormDelay + this.stormTime){
            this.timer=0;
        } else if(this.timer> this.stormDelay){
            this.timer+=0.1;
            this.Rain();

        } else {
            this.timer+=0.1;
        }

        this.drops.forEach(d=>{
            d.life-=0.1;
        });

        for(let i = this.drops.length - 1;i > 0; i--){
            if(this.drops[i].life<=0)this.drops.splice(i,1);
        }

    }

    GenerateCloud(){
        let rad = 20;
        this.circles.push({x:0,y:-rad,r:rad+5});
        let dist = rad;

        for(let i = 1; i<this.max_clouds; i++){
            rad -=3;
            let sign = 1;
            if(i%2 == 0){
                sign = -1;
            }
            this.circles.push({x:dist*sign/1.5,y:-rad,r:rad+5});
            dist +=rad-Math.random()*2;
        }
    }

    Draw(){
        push();
		 translate(this.x,this.y);
		 rotate(this.angle * PI / 180);
		 scale(this.scale);
         
         this.drops.forEach(d=>{
        
            stroke(200,200,255,sind(d.life/d.maxlife*180)*200);
            strokeWeight(10);
            line(d.x,0,d.x,100/Math.max(0.1,this.scale));
         });
         
         noStroke();
         fill(255,255,255);
         this.circles.forEach(c=>{
             circle(c.x,c.y,c.r * 2);
         });

         pop();

        

       
    }
}