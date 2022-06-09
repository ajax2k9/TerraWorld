p5.disableFriendlyErrors = true; // disables FES
let spacing = 10;
let ship; 
let rad = 300;
let segments = [];
let jobs = [];

let lake =  0;
let storage = 0;
let max_storage = 50;
let oxygen = 0;
let tx_rate = 0.001;
let food = 0;
let wood = 0;
let science = 0;
let ore = 0;
let metal = 0;
let clouds;
let asteroid;
let rocket;
let plants;
let trees;
let population = 0;
let maxPop = 0;
let houses = [];
let treeTimer = new Timer(10);
let farmTimer = new Timer(10);
let HouseTimer = new Timer(30);
let popDelay = 20;
let book;

function setup(){
    ship = new Ship();
    clouds = new Clouds();
    asteroid = new Asteroid();
    rocket = new Rocket();
    let c = createCanvas(800,800);
    MakeSegments();
    SetupUI();
    SetupBuildings();

    book = new Book();
}

function preload(){
    imgs.push(loadImage('images/img0.png'));
    imgs.push(loadImage('images/img1.png'));
    imgs.push(loadImage('images/img2.png'));
    imgs.push(loadImage('images/img3.png'));
    imgs.push(loadImage('images/img4.png'));
    imgs.push(loadImage('images/null.png'));
    imgs.push(loadImage('images/null.png'));
    imgs.push(loadImage('images/null.png'));
    icons["water"] = loadImage('images/water.png');
    icons["ice"] = loadImage('images/ice.png');
    icons["science"] = loadImage('images/science.png');
    icons["metal"] = loadImage('images/iron.png');
    icons["trees"] = loadImage('images/trees.png');
    icons["bread"] = loadImage('images/bread.png');
    icons["ore"] = loadImage('images/ore.png');
    icons["wood"] = loadImage('images/log.png');
    icons["population"] = loadImage('images/person.png');
    icons["plants"] = loadImage('images/wheat.png');
    icons["oxygen"] = loadImage('images/oxygen.png');
    icons["rocket"] = loadImage('images/rocketbutt.png');
    icons["house"] = loadImage('images/house.png');
    icons["lab"] = loadImage('images/lab.png');
    icons["mine"] = loadImage('images/mine.png');
    icons["smelter"] = loadImage('images/smelter.png');
    icons["check"] = loadImage('images/check.png');
    icons["axe"] = loadImage('images/axe.png');
    icons["scythe"] = loadImage('images/scythe.png');
    icons["flask"] = loadImage('images/flask.png');
}

function MakeSegments(){
    let d = 140;
    for(let i = 0; i<360; i+=spacing){
        segments.push({r1:d,r2:d,ang1:i,ang2:i+spacing,water:0,mode:LAND,trees:[],plants:[]});
    }
}


function DrawGround(){

    segments.forEach(s=>{   
        let c2 = {r:138,g:78,b:40};
        let c1 = {r:102,g:39,b:0};
        let level =LogRatio(s.water,3);

        let r = lerp(c2.r,c1.r,level);
        let g = lerp(c2.g,c1.g,level);
        let b = lerp(c2.b,c1.b,level);
        fill(r,g,b);
        strokeWeight(2);
        stroke(r,g,b);
        
        beginShape();
        let x1 = s.r1*cosd(s.ang1);
        let y1 = s.r1*sind(s.ang1);
     
        let x2 = s.r2*cosd(s.ang2);
        let y2 = s.r2*sind(s.ang2);
     
        vertex(x1,y1);
        vertex(x2,y2);
        vertex(0,0);
        endShape();
        if(s.mode == LAND){
            c1 = {r:0,g:200,b:0};
            r = lerp(c2.r,c1.r,level);
            g = lerp(c2.g,c1.g,level);
            b = lerp(c2.b,c1.b,level);
            stroke(r,g,b);
        } else {
            c1 = {r:20,g:20,b:0};
            r = lerp(c2.r,c1.r,level);
            g = lerp(c2.g,c1.g,level);
            b = lerp(c2.b,c1.b,level);
            stroke(r,g,b);
        }
        strokeWeight(2);
        line(x1,y1,x2,y2)
        s.trees.forEach(t=>{t.Draw();});
        s.plants.forEach(p=>{p.Draw();});
    });

    
}
function keyPressed() {
    if(keyCode == 69){
        spinner.Rotate(false);
    }
    if(keyCode == 81){
        spinner.Rotate(true);
    }
}

function HandleKeys() {
    if (keyIsDown(65)) {
      ship.angle-=0.5;
    } else if (keyIsDown(68)){
        ship.angle+=0.5;
    }
    ship.angle = XN360(ship.angle);

    let radians = (ship.angle - 90)* PI/180;
    ship.x = rad*cos(radians);
    ship.y = rad*sin(radians);

    if (keyIsDown(32)) {
        let ang = XN360(ship.FireLaser()+270);
        let index = Math.floor(ang/spacing);
        let s = segments[index];
        let i = index - 1;
        
        if(i < 0){
            i = segments.length - 1;
        }
        let s1 = segments[i];

        if(spinner.activeMode == FARM){
            let rad2 = 130;
            s1.r2 = rad2;
            s.r1 = rad2;
            s1.plants = [];
            s.trees = [];
            s.mode = FARM;
            s1.mode = FARM;
        }

        if(spinner.activeMode == LAND){
            let rad2 = 140;
            s1.r2 = rad2;
            s.r1 = rad2;
            s1.plants = [];
            s.trees = [];
            s.mode = LAND;
            s1.mode = LAND;
        }
    }
  }

  function DrawStorage(){
      noStroke();  
      fill(50,50,50);
      circle(0,0,80);

      fill(10,10,10);
      circle(0,0,65);

      fill(255,255,255);
      let level = LogRatio(storage,5);
      circle(0,0,65 * level);
  }

  function DrawAtmo(){
      stroke(200,200,255,200*min(oxygen/10000,1));
      strokeWeight(10);
      fill(200,200,255,100*min(oxygen/10000,1));
      circle(0,0,500);

  }

  function HandlePopulation(){
      let eat_rate = population*0.001;
      if(eat_rate > food){
          if(popDelay > 0){// countdown till famine starts
              popDelay -=0.01;
          } else {
            population-=0.0001*population;
            population = max(1,population);
          }
          food = 0;
      } else {
        popDelay = 20;// reset famine
        food -= eat_rate;
        population+=population*0.01;
        population = min(maxPop,population);
      }

      if(jobs[2] > 0.9){
          if(HouseTimer.Update()){
              let cost = (houses.length + 1) * 400;
              if(wood >=cost){
                  AddHouse();
                  wood -= cost;
              }
          }
      }

  }

  function Simulate(){
      maxPop = 10 + houses.length*20;
      if(storage>0){
          let transfer = storage*tx_rate; 
          lake+= transfer;
          storage-= transfer; 
      }

      diff = lake*tx_rate;
      clouds.water+=diff;
      lake-=diff;
      clouds.Simulate();

      plants = 0;
      trees = 0;

      segments.forEach(s=>{
        s.plants.forEach(p=>{
            if(p.age>=100){
                plants++;
            }
        });

        s.trees.forEach(t=>{
            if(t.age>=100){
                trees++;
            }
        });
      });
      
      let tree_cutters = population *jobs[0];
      let farmers = population *jobs[1];
      let cut_tree = false;
      let farm = false;

      if(tree_cutters > 0){
          treeTimer.SetMaxTime(10 / tree_cutters);
          cut_tree = treeTimer.Update();
      }

      if(farmers > 0){
        farmTimer.SetMaxTime(10 / farmers);
        farm = farmTimer.Update();
      }

     
      segments.forEach(s=>{
        if(s.mode == LAND){
          if(s.trees.length <5 && s.water > 0){
              let ang = Math.random()*spacing+s.ang1;
              let d = (s.r2-s.r1)/spacing*(ang-s.ang1) + s.r1;
              s.trees.push(new Tree(ang,d));
              s.water-=10;
              if(s.water<0)s.water = 0;
          }

          s.trees.forEach(
             t=>{
                if(s.water> 10 && t.age<100){
                    t.age+=0.1;
                    s.water-=0.01;
                    if(s.water<0)s.water = 0;
                }

                if(t.age>=100 && cut_tree){
                    let r = random() < 0.1;
                    if(r){
                        t.age = 0;
                        wood+=2;
                        treeTimer.Reset();
                        cut_tree = false;
                    }
                }

                oxygen += t.age*0.0001;
            });
        } else {
            if(s.plants.length<5 && s.water > 0){

                let ang = Math.random()*spacing+s.ang1;
                let d = (s.r2-s.r1)/spacing*(ang-s.ang1) + s.r1;
                s.plants.push(new Wheat(ang,d));
                s.water-=10;
                if(s.water<0)s.water = 0;
            }

            s.plants.forEach(p=>{
                if(s.water> 10 && p.age<100){
                    p.age+=0.1;
                    s.water-=0.01;
                    if(s.water<0)s.water = 0;
                }
                if(p.age>=100 && farm){
                    let r = random() < 0.1;
                    if(r){
                        p.age = 0;
                        food+=10;
                        farmTimer.Reset();
                        farm = false;
                    }
                }
            });
        }
      });

      if(rocket.landed == false && buildings["platform"].built){
        rocket.angle = buildings["platform"].angle;
        rocket.landing = true;

      }
      if(population > 0){
        HandlePopulation();
      }
  } 

  function mousePressed(){
    bMenu.CheckClicks();
    asteroid.Stall();
    book.CheckClicks(mouseX,mouseY);
  }




function draw(){
    background(0,0,0);
    Simulate();
    strokeWeight(2)
    translate(width/2,height/2);
    DrawAtmo();
    DrawBuildings();
    HandleKeys();
    clouds.Draw();
    ship.Draw();
    DrawGround();
   
    stroke(70,40,40);
    fill(36,20,20);
    circle(0,0,200);

    stroke(100,100,255);
    fill(50,50,255);
    let level = Math.min(Math.log10(lake)/4,1);
    circle(0,0,200* level);

    DrawStorage();
    
    asteroid.Draw();
    rocket.Draw();
    translate(-width/2,-height/2);
    HandleEffects();

    DrawUI();
    //book.Draw();
    
}