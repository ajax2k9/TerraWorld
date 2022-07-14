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
        this.modes[TOWN].unlocked = true;
        this.modes[BUILD].unlocked = true;
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

    Resource("water",inventory["lake"]);
    Resource("oxygen",inventory["oxygen"]);
    Resource("plants",inventory["plants"]);
    Resource("bread",inventory["food"]);
    Resource("science",inventory["science"]);
    Resource("ore",inventory["ore"]);
    Resource("metal",inventory["metal"]);
    Resource("wood",inventory["wood"]);  
    Resource("trees",inventory["trees"]);  
}

class BuildMenu{
    constructor(_x,_y){
        this.buttons = [];
        this.x = _x;
        this.y= _y;
        let spacing = 75;

        let x = this.x+160;
        let y = this.y;

        let reqs = [["oxygen",1000]];
        x = this.AddButton("platform",reqs,x,y,spacing,"Brings in the people!");

        reqs = [["wood",1000],["population",2]];
        x = this.AddButton("house",reqs,x,y,spacing,"Increases population by 5, can buy multiple times");
        
        reqs = [["wood",1000],["population",10]];
        x = this.AddButton("mine",reqs,x,y,spacing, "Unlocks Miner Job, mines ore from the ground");
        
        reqs = [["wood",1000],["ore",1000]];
        x = this.AddButton("smelter",reqs,x,y,spacing,"Unlocks Smelter Job, converts wood, ore, oxygen to Metal");

        reqs = [["wood",1000],["metal",1000]];
        x = this.AddButton("lab",reqs,x,y,spacing,"Unlocks Research Job and Opens Research Tab, gathers Research");
    }
    
    AddButton(name,reqs,x,y,spacing, caption){
        let b = new Button(x,y,50,50,true).SetIcon(icons[name]);
        reqs.forEach(r=>{
            b.AddReq(new ItemStack(r[0],r[1]));
        });

        b.SetCallback(()=>{
            if(buildings[name].building || buildings[name].built){
                return false;
            }

            let tooExpenive = false;
            b.reqs.forEach(r=>{
                if(inventory[r.name] == undefined || inventory[r.name] < r.quant ){
                    tooExpenive = true;
                }
            });

            if(tooExpenive){
                return false;
            }

            b.reqs.forEach(r=>{
                inventory[r.name] -= r.quant;
            });
            buildings[name].building = true;
            return true;

        });

        b.caption = caption;
        this.buttons.push(b);
        return x + spacing;

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
                
                let x = 200;
                let y = 700;
                textAlign(LEFT);
                text(b.caption,x-16,735);

                textAlign(CENTER);
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

        this.tabs.push(new Tab(this.x + offsX,this.y + offsY,icons["axe"],"wood cutting"));
        this.tabs.push(new Tab(this.x + offsX + spacing,this.y + offsY,icons["scythe"],"harvesting",color(100,100,0)));
        //this.tabs.push(new Tab(this.x + 310 + 120,this.y + 60,icons["house"],"house making, cost 1000 wood",color(0,0,255)));
        this.tabs.push(new Tab(this.x + 310 + 120,this.y + 60,icons["flask"],"research",color(155,0,155)));
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
        image(icons["population"],this.x+160,this.y+20,32,32);

        fill(255,255,255);
        text(floor(inventory["population"]),this.x + 180, this.y + 25);
        
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
        this.name = name;
    }

    Draw(x,y){
        image(this.icon,x,y,32,32);
        stroke(0,0,0);
        strokeWeight(2);
        fill(255,255,255);
        text(this.quant,x+20, y+10);
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
        if(trees >= 40 && plants >= 50){
            spinner.modes[BUILD].unlocked = true;
        }   
    }

    if(spinner.modes[TOWN].unlocked == false){
        if(inventory["population"] > 0){
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