const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImage;
var platform, score=0, gamestate="onSling", hit=0;
var birds=[];

function preload()
{
    getBackgroundImage();   
}
function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    platform = new Ground(100,330,200,150);
    ground = new Ground(600,height,1200,20);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
    
    bird = new Bird(130,90);
    bird2 = new Bird(100,250);
    bird3 = new Bird(70,250);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);
     
    slingshot= new Slingshot(birds[birds.length-1].body,{x:130,y:90});
}

function draw(){
    if(backgroundImage)
    {
        background(backgroundImage);
    }
    Engine.update(engine);
    text("Score: "+score, 50, 50);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    platform.display();
    slingshot.display();
}
function mouseDragged()
{
    if(gamestate=="onSling")
    {
        Matter.Body.setPosition(birds[birds.length-1].body,{x:mouseX, y:mouseY});
    }
}
function mouseReleased()
{
    slingshot.fly();
    gamestate="fly";
    if(hit<2)
            hit++;
    else
    {
        hit=0;
        World.remove(world,birds[birds.length-1]);
        birds.pop();
    }
}
function keyPressed()
{
    if(keyCode==32)
    {
        birds[birds.length-1].path=[];
        Matter.Body.setPosition(birds[birds.length-1].body, {x:130, y:90});
        slingshot.attach(birds[birds.length-1].body);
        gamestate="onSling";
    }
}
async function getBackgroundImage()
{
    var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var response_json=await response.json();
    var date_time=response_json.datetime;
    var hour=date_time.slice(11,13);
    if(hour>=06 && hour<=16)
    {
        bg="sprites/bg.png";
    }
    else
    {
        bg="sprites/bg2.jpg";
    }
    backgroundImage=loadImage(bg);
}