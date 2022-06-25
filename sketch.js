var PLAY=1;
var END =0;
var gamestate=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nube,nibe,nubeses;
var moltre,moltres,mole;
var cact1,cact2,cact3,cact4,cactus,cactuses;
var lestart,gameOver, macaco,chango,fin,dale,mas,suerte;
var jump,f,tulin;
var score=0
var box;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
    nibe=loadImage("nube.png");
    moltre=loadImage("moltres.png");
    cact1=loadImage("cactus 1.png");
    cact2=loadImage("cactus 2.png");
    cact3=loadImage("cactus 3.png");
    cact4=loadImage("cactus 4.png");
    lestart=loadImage("restart.png");
    macaco=loadImage("buan dia.png");
    gameOver=loadImage("gameOver.png");
    mas =loadImage ("mas suerte.png");
    jump = loadSound ("jump.mp3");
    f = loadSound ("die.mp3");
    tulin= loadSound ("checkpoint.mp3");

}

function setup() {
    createCanvas(windowWidth,windowHeight);
    //create a trex sprite
    trex = createSprite(50,height-15,20,50);
    trex.addAnimation("running", trex_running);
    trex.addImage("collided", trex_collided);
    trex.scale = 1;
    trex.setCollider("circle", 5,5,30);
    trex.depth = 5;
   /////// trex.debug=true;
    //create a ground sprite
    ground = createSprite(200,height-20,width,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    //create invisible pisotion
    invisibleGround = createSprite (200,height-10,400,10);
    invisibleGround.visible = false;
    chango = createSprite(width/2,height/2);
    chango.addImage("macaco",macaco);
    nubeses=new Group ();
    mole=new Group ();
    cactuses=new Group ();
    fin = createSprite (width/2,height/2-200);
    fin.addImage ("fin",gameOver);
   // fin.shapeColor= "green";
    dale = createSprite (width/2,height/2+200);
    dale.addImage ("restart",lestart);
    suerte=createSprite (width/2,height/2+100);
    suerte.addImage ("mas",mas);
    suerte.scale=0.5;
    box= new Box (500,400,150,123,1.3,1.3)
}
function draw() {
    background(220);
    textSize(20);
    fill("#276200");
    text("tus puntitos panita "+score,width-300,100 );
    if (gamestate === PLAY){
        score = score +Math.round(getFrameRate()/60);
        if(score%100===0){
            tulin.play();
        }
        if (keyDown("space") || touches.length>0 &&  trex.y >= 80) {
            trex.velocityY = -10; 
            jump.play();
            touches=[];
        }
        trex.velocityY = trex.velocityY + 0.8;
        if (ground.x < 0) {
            ground.x = ground.width / 2; 
        }
        trex.collide(invisibleGround);
        nubes ();
        ave();
        cactuseses();
        fin.visible=false;
        dale.visible=false;
        suerte.visible=false;
        if (cactuses.isTouching(trex)|| mole.isTouching(trex)){
            gamestate = END;
            f.play();
        }
       box.show ();
       box.move();

    }
    else if (gamestate === END){
        trex.changeAnimation("collided", trex_collided);
        trex.velocityY=0;
        ground.velocityX=0;
        cactuses.setVelocityXEach(0);
        mole.setVelocityXEach(0);
        nubeses.setVelocityXEach(0);
        cactuses.setLifetimeEach(-1);
        mole.setLifetimeEach(-1); 
        nubeses.setLifetimeEach(-1);
        fin.visible=true;
        dale.visible=true;
        suerte.visible=true;
        if (keyDown(ENTER)|| mousePressedOver(fin)|| mousePressedOver(dale)|| keyDown("SPACE")|| touches.legth>0){
        restart();
        touches=[];
        }
    }

  
    drawSprites();
}
    function nubes () { 
        if(frameCount % 60 === 0 ){
            nube = createSprite (width,random (0,300),40,10);
            nube.addImage("nibe",nibe);
            nube.scale = 0.08;
            nube.velocityX = -3;
            nube.lifetime=500;
            //nube.depth=trex.depth;
            nubeses.add (nube);

        } 
        
    
        
    }
    function ave () {
        if(frameCount % 60 === 0){
            moltres = createSprite (width,random(0,500),40,10);
            moltres.addImage("moltre",moltre) ;
            moltres.scale = 0.5 ;
            moltres.velocityX=-5;
            moltres.lifetime=300;
            mole.add (moltres);
        }

    }
    function cactuseses(){
        if(frameCount % 60 === 0){
            cactus = createSprite (width,height-50,10,40);
            var num= Math.round(random(1,4));
            switch(num){
                case 1:cactus.addImage(cact1);cactus.scale = 0.2; break;
                case 2:cactus.addImage(cact2);cactus.scale = 0.1 ; break;
                case 3:cactus.addImage(cact3);cactus.scale = 0.1 ; break;
                case 4:cactus.addImage(cact4);cactus.scale = 0.1 ; break;
               
                default:break;
            }
            
            cactus.velocityX=-5;
            cactus.lifetime=300;
            cactuses.add (cactus);
        }
    }
     function restart (){
        gamestate = PLAY;
     cactuses.destroyEach();
     mole.destroyEach();
     nubeses.destroyEach();
     trex.changeAnimation("running");
     score=0;


    }