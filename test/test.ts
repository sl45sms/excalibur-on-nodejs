import "../src/index";
import { Text,Loader, Actor, DisplayMode, CollisionType, Color, Engine, vec } from "excalibur";

const loader = new Loader();
loader.playButtonText = "Sword";
loader.backgroundColor = ""+Color.Green;

const game = new Engine({
    width: 800,
    height: 600,
    suppressHiDPIScaling: true,
    resolution:{
      width: 800,
      height: 600
    },
    configurePerformanceCanvas2DFallback:{
      allow:true,
      showPlayerMessage:false
    },
    displayMode: DisplayMode.FitScreen,
    suppressPlayButton: true,
    suppressMinimumBrowserFeatureDetection: true,
  });

const actor = new Actor({
    name: 'red',
    pos: vec(100, 100),
    width: 50,
    height: 50,
    color: Color.Red,
    collisionType: CollisionType.Active
});

//move the actor 15px to the right every frame
actor.vel.x = 15;

//when the player goes off screen, show a message
actor.on('exitviewport', () => {
    //display a message to prove the engine works
    console.log('off screen');
});

game.add(actor);
game.start(loader).then(function () {
  // ready, set, go!
  console.log("ready, set, go!");
  setTimeout(() => {
    //on 10 seconds, get the canvas data to prove a red rectangle is on the screen
    console.log(window.document.getElementsByTagName("canvas")[0].toDataURL());    
  }, 10000);
})
