let spinner;
let bMenu;
let tMenu;
let imgs = [];
let icons = {};
const LAND = 0;
const FARM = 1;
const BUILD = 2;
const TOWN = 3;

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
            this.modes.push({index:i,ang:a,name:"farm"});
        }

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
            let c = Cartesian(100,ang); 
            circle(c.x+this.x,c.y+this.y,70);
            image(imgs[m.index],c.x+this.x-imgs[m.index].width/2,c.y+this.y-imgs[m.index].height/2);
        });

        if(abs(this.angle - this.desiredAngle)<0.1){
            this.angle %=360;
            this.desiredAngle = this.angle;
        }
    }
}
function DrawResources(){
    noStroke();
    fill(100,100,255,40);
    rect(0,0,width,50);
    
    textAlign(LEFT, CENTER);
    fill(255,255,255);   
    textSize(18);
    textStyle(BOLD);

    image(icons["water"],5,5);
    text(lake.toPrecision(3),40,25);
    
    image(icons["oxygen"],120,5);
    text(oxygen.toPrecision(3),160,25);

    image(icons["plants"],230,5);
    text(food.toPrecision(3),265,25);

    image(icons["science"],340,5);
    text(science.toPrecision(3),375,25);

    image(icons["ore"],450,5);
    text(ore.toPrecision(3),490,25);

    image(icons["metal"],560,5);
    text(metal.toPrecision(3),605,25);

    image(icons["wood"],670,5);
    text(wood.toPrecision(3),720,25);
  
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
        b2.AddReq(new ItemStack("population",10));
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
    }

    CheckClicks(){
        this.buttons.forEach(b=>{
            b.Clicked();
        });
    }

    Draw(){
        noStroke();
        fill(0,0,255,100);
        rect(this.x,this.y,width,height-this.y);
        this.buttons.forEach(b=>{
            b.Draw();
            if(b.Hover()){
                let x = 150;
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
        this.y= _y;
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
        fill(0,0,255,100);
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
  //  new Button(20,20,100,20).Name("test").SetCallback(()=>{console.log("clicked");});
  spinner = new Spinner(0,height);
  bMenu = new BuildMenu(0,height-50);
  tMenu = new TownMenu(0,height-80);
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
    if(spinner.activeMode == BUILD){
        bMenu.Draw();
    }

    if(spinner.activeMode == TOWN){
        tMenu.Draw();
    }

    spinner.Draw();
    DrawResources();
    
}