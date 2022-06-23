let spinner;
let bMenu;
let tMenu;
let bookButton;
let imgs = [];
let icons = {};
let tooltips=[];
const LAND = 0;
const FARM = 1;
const BUILD = 2;
const TOWN = 3;


class ToolTip{
    constructor(x,y,w,h,desc){
        this.x=x;
        this.y=y;
        this.x2=w+x;
        this.y2=h+y;

        this.desc=desc;
        tooltips.push(this);
    }

    Draw(){
        fill(255,255,255);
        textAlign(LEFT,CENTER);
        textSize(14);
        textStyle(NORMAL);
        text(this.desc,10,60);
    }
    Hover(){

        if(mouseX > this.x2 || mouseX < this.x) return false; 
        if(mouseY > this.y2 || mouseY < this.y) return false;
        return true;
    }
}

class Spinner{
    constructor(_x,_y){
        this.x = _x;
        this.y = _y;
        this.angle = -360/8;
        this.desiredAngle = -360/8;
        this.modes = [];
        this.activeMode = 0;

        for(let i = 0; i<8; i++){
            let a = 360/8 * i           
            this.modes.push({index:i,ang:a,name:"farm",size:1,unlocked:false});
        }
        this.modes[FARM].unlocked = true;
        this.modes[LAND].unlocked = true;
    }

    Rotate(right = true){
        if(right){
            this.desiredAngle += 360/8;
            this.activeMode--;
        } else {
            this.desiredAngle -= 360/8;
            this.activeMode++;
        }

        this.activeMode=mod(this.activeMode,8);
    }

    Draw(){
        this.angle += (this.desiredAngle - this.angle)/20;
        stroke(255,255,0);
        fill(0,0,0);
        strokeWeight(2);
        circle(this.x,this.y,300);
        circle(this.x,this.y,100);
        this.modes.forEach( m=>{
            let ang = this.angle + m.ang;
            
            if(this.activeMode == m.index){
                m.size += (1.25 - m.size)/20;
            } else {
                m.size += (1 - m.size)/20;
            }
            let c = Cartesian(100*m.size,ang);
            circle(c.x+this.x,c.y+this.y,70*m.size);

            if(m.unlocked){
                image(imgs[m.index],c.x+this.x,c.y+this.y);
            }
        });

        if(abs(this.angle - this.desiredAngle)<0.1){
            this.angle %=360;
            this.desiredAngle = this.angle;
        }
    }
}

let resX = 0;
let resSpacing = 70;
let tOffs = 20;

function Resource(icon,res,desc){
    imageMode(CORNER);
    image(icons[icon],resX,5,32,32);
    text(DrawNumber(res),resX+tOffs,30);
    new ToolTip(resX,0,50,50,icon);
    
    resX+=resSpacing;
} 


function DrawResources(){
    noStroke();
    fill(100,100,255,40);
    rect(0,0,width,50);
    
    textAlign(LEFT, CENTER);
    fill(255,255,255);   
    textSize(18);
    textStyle(BOLD);

    resX = 0;

    Resource("water",lake);
    Resource("oxygen",oxygen);
    Resource("plants",plants);
    Resource("bread",food);
    Resource("science",science);
    Resource("ore",ore);
    Resource("metal",metal);
    Resource("wood",wood);  
    Resource("trees",trees);  
}

class BuildMenu{
    constructor(_x,_y){
        this.buttons = [];
        this.x = _x;
        this.y= _y;
        let b1 = new Button(this.x +150,this.y,100,50,true).SetIcon(icons["rocket"]).SetCallback(()=>{
            
            if(oxygen > 3000  && !buildings["platform"].built && !buildings["platform"].building){
                buildings["platform"].building = true;
                return true;
            }
            return false;
        });

        b1.AddReq(new ItemStack("oxygen",3000));
        this.buttons.push(b1);
        
        let b2 = new Button(this.x +250,this.y,100,50,true).SetIcon(icons["mine"]).SetCallback(()=>{
            
            if(wood > 1000 && population > 10 && !buildings["mine"].built && !buildings["mine"].building){
                buildings["mine"].building = true;
                return true;
            }
            return false;
        });

        b2.AddReq(new ItemStack("wood",1000));
        b2.AddReq(new ItemStack("population",200));
        this.buttons.push(b2);

        let b3 = new Button(this.x +350,this.y,100,50,true).SetIcon(icons["smelter"]).SetCallback(()=>{
            
            if(ore > 1000 && wood > 1000 && !buildings["smelter"].built && !buildings["smelter"].building){
                buildings["smelter"].building = true;
                return true;
            }
            return false;
        });

        b3.AddReq(new ItemStack("ore",1000));
        b3.AddReq(new ItemStack("wood",1000));
        this.buttons.push(b3);

        let b4 = new Button(this.x +450,this.y,100,50,true).SetIcon(icons["lab"]).SetCallback(()=>{
            
            if(metal > 1000 && wood > 1000 && !buildings["lab"].built && !buildings["lab"].building){
                buildings["lab"].building = true;
                return true;
            }
            return false;
        });

        b4.AddReq(new ItemStack("metal",1000));
        b4.AddReq(new ItemStack("wood",1000));
        this.buttons.push(b4);

        let b5 = new Button(this.x +550,this.y,100,50,true).SetIcon(icons["cannon"]).SetCallback(()=>{
            
            if(metal > 1000 && wood > 1000 && !buildings["cannon"].built && !buildings["cannon"].building){
                buildings["cannon"].building = true;
                return true;
            }
            return false;
        });

        b5.AddReq(new ItemStack("research",3000));
        b5.AddReq(new ItemStack("oxygen",2000));
        b5.AddReq(new ItemStack("metal",3000));
        this.buttons.push(b5);
    }

    CheckClicks(){
        this.buttons.forEach(b=>{
            b.Clicked();
        });
    }

    Draw(){
        textStyle(NORMAL);
        noStroke();
        fill(0,0,255,100);
        rect(this.x,this.y,width,height-this.y);
        this.buttons.forEach(b=>{
            b.Draw();
            if(b.Hover()){
                
                fill(255,255,255);
                text("cost :",230,730);
                
                let x = 260;
                let y = 700;

                b.reqs.forEach(r=>{
                    r.Draw(x,y);
                    x+=60;
                });
            }
        });
    }


}

class TownMenu{
    constructor(_x,_y){
        this.buttons = [];
        this.x = _x;
        this.y = _y;
        this.tabs=[];
        let spacing = 60;
        let offsX = 310;
        let offsY = 60;

        this.tabs.push(new Tab(this.x + offsX,this.y + offsY,icons["axe"]));
        this.tabs.push(new Tab(this.x + offsX + spacing,this.y + offsY,icons["scythe"],color(100,100,0)));
        this.tabs.push(new Tab(this.x + 310 + 120,this.y + 60,icons["house"],color(0,0,255)));
        this.tabs.push(new Tab(this.x + 310 + 180,this.y + 60,icons["flask"],color(155,0,155)));
    }

    CheckClicks(){
        this.buttons.forEach(b=>{
            b.Clicked();
        });
    }

    
    Draw(){
        noStroke();
        fill(0,0,100,255);
        rect(this.x,this.y,width,height-this.y);
        image(icons["population"],this.x+150,this.y+10,32,32);

        fill(255,255,255);
        text(floor(population),this.x + 180, this.y + 25);
        
        fill(0,0,10,255);
        rect(this.x+300,this.y+10,width-400,height-this.y,12);

        this.tabs.forEach(t=>{t.Draw()});
       
    }


}
function SetupUI(){
  spinner = new Spinner(0,height);
  bMenu = new BuildMenu(0,height-50);
  tMenu = new TownMenu(0,height-80);
  bookButton = new Button(width - 20,20,32,32,false).SetIcon(icons["bookbutt"]).SetCallback(()=>{
            book.Show();
});
}

class ItemStack{
    constructor(name,quant){
        this.icon = icons[name];
        this.quant = quant;
    }

    Draw(x,y){
        image(this.icon,x,y,32,32);
        stroke(0,0,0);
        strokeWeight(2);
        fill(255,255,255);
        text(this.quant,x+20, y+30);
    }

}

function DrawUI(){

    noFill();
    stroke(255,255,255);
    strokeWeight(1);
    arc(spinner.x,spinner.y,340,340,rads(-60),rads(-30));
    let c1 = Cartesian(170,-20);
    noStroke();
    fill(255,255,255);
    textAlign(CENTER,CENTER);
    let c2 = Cartesian(170,-70);
    text("E",spinner.x+c1.x,spinner.y + c1.y);
    text("Q",spinner.x+c2.x,spinner.y + c2.y);

    if(spinner.activeMode == BUILD && spinner.modes[BUILD].unlocked){
        bMenu.Draw();
    }

    if(spinner.activeMode == TOWN && spinner.modes[TOWN].unlocked){
        tMenu.Draw();
    }

    spinner.Draw();
    DrawResources();

    if(spinner.modes[BUILD].unlocked == false){
        if(trees > 40 && plants > 50){
            spinner.modes[BUILD].unlocked = true;
        }   
    }

    if(spinner.modes[TOWN].unlocked == false){
        if(population > 0){
            spinner.modes[TOWN].unlocked = true;
        }   
    }

    tooltips.forEach(tip=>{
        if(tip.Hover()){
            tip.Draw();
        }
    })

    bookButton.Draw();
    
}