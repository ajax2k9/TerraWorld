let buttons = [];
let curr_type = 0;
class Button{
    constructor(_x,_y,_w,_h,_box = true){
        this.x = _x;
        this.y = _y;
        this.x2 = _x +_w;
        this.y2 = _y +_h;
        this.h = _h;
        this.w = _w;
        this.offs = 0;
        this.IsBox = _box;
        this.showCheck = false;
        this.check = icons["check"];
    }

    AddReq(req){
        if(this.reqs == undefined){
            this.reqs=[];
        }

        this.reqs.push(req);
    }

    SetIcon(_icon){
        this.icon = _icon;
        return this;
    }

    SetCallback(callback){
        this.callback = callback;
        return this;
    }
    Name(_name){
        this.name = _name;
        return this;
    }

    Hover(){
        if(this.x < 0 || this.x > width)return false;
        if(this.y - this.offs < 0 || this.y - this.offs > height)return false;
        
        if(mouseX < this.x2 && mouseX > this.x){
            if(mouseY < this.y2 - this.offs && mouseY > this.y - this.offs){
                return true;
            }
        }

        return false;
    }

    Clicked(){
        if(this.x < 0 || this.x > width)return;
        if(this.y < 0 || this.y > height)return;

        if(this.IsBox == false){
            let m = createVector(mouseX,mouseY);
            let p = createVector(this.x,this.y);

            if(m.dist(p)< this.w/2){
                if(this.callback != undefined){
                    this.callback();
                }
            }
        } else {    
            if(mouseX < this.x2 && mouseX > this.x){
                if(mouseY < this.y2 && mouseY > this.y){
                    if(this.callback != undefined){
                        let success = this.callback();
                        if(success){
                            this.showCheck = true;
                        }
                    }
                }
            }
        }
    }


    Draw(){
        noStroke();
        noFill();

        if(this.IsBox){
            if(this.name != undefined){
                strokeWeight(1);
                textAlign(CENTER,CENTER);
                text(this.name,this.x+this.w/2,this.y+this.h/2);
            }

            if(this.icon != undefined){
                image(this.icon,this.x + this.w/2 - this.icon.width/2,this.y+this.h/2 - this.icon.height/2);

            } 
            if(this.showCheck){
                image(this.check,this.x + this.w/2 - this.check.width/2,this.y+this.h/2 - this.check.height/2);
            }

        } else {
            circle(this.x,this.y,this.w);
            if(this.name != undefined){
                strokeWeight(1);
                textAlign(CENTER,CENTER);
                text(this.name,this.x,this.y);
            }
        }
    }
}

class Tab extends Button{
    constructor(_x,_y,_icon, _c = color(255,0,0)){
        super(_x,_y,50,100,true);
        this.icon = _icon;
        this.index = jobs.length;
        this.color =_c;
        this.offs = 0;
        jobs.push(0);
    }

    Draw(){
        if(this.Hover()){
            curr_type = this.index;
        }

        this.ratio = 1 - abs(this.index - curr_type)/jobs.length;
        jobs[this.index] = this.ratio;
        this.offs = 40 * this.ratio;
        fill(this.color);
        stroke(255,255,255);
        strokeWeight(4);

        rect(this.x,this.y - this.offs,this.w,this.h,6);
        image(this.icon,this.x + this.w/2 - this.icon.width/2, this.y - this.offs + 10);
        image(this.icon,this.x + this.w/2 - this.icon.width/2, this.y - this.offs + 10);
    }
}
