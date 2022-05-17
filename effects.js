let effects = [];
class Effect{
    constructor(_x,_y,_maxtime){
        this.x = _x;
        this.y = _y;
        this.timer =new Timer(_maxtime);
        effects.push(this);
        this.alive = true;
    }

    Draw(){
        if(this.timer.Update()){
            this.alive = false;
        }
    }
}

class Pop extends Effect{
    constructor(_x,_y){
        super(_x,_y,0.3);
    }

    Draw(){
        super.Draw();
        let r = this.timer.time * 60;

        stroke(255,255,255);
        fill(255,255,0);
        circle(this.x,this.y,r);
    }
}

class Particle extends Effect{
    constructor(_x,_y,_color,_size,_time){
        super(_x,_y,_time);
        this.color = _color;
        this.r=_size;
    }

    Draw(){
        super.Draw();
        this.color.setAlpha(this.timer.InvScale(255));
        fill(this.color);
        noStroke();
        circle(this.x,this.y,this.r);
        
    }
}


function HandleEffects(){
    effects.forEach(e=>{
        if(e.alive){
            e.Draw();
        }
    });

    for(let i = effects.length-1; i >= 0; i--){
        if(effects[i].alive == false){
            effects.splice(i,1);
        }
    }
}
