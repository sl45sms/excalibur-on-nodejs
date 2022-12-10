import "../src/index";
import { Actor,DisplayMode, CollisionType, Color, Engine, vec } from "excalibur";

const game = new Engine({
    width: 800,
    height: 600,
    suppressHiDPIScaling: true,
    resolution:{
      width: 800,
      height: 600
    },
    displayMode: DisplayMode.FitScreen
  });

const actor = new Actor({
    name: 'red',
    pos: vec(150, 150),
    width: 50,
    height: 50,
    color: Color.Red,
    collisionType: CollisionType.Active
});

// move the actor 15px to the right every frame
actor.vel.x = 15

//when the player goes off screen, wrap them to the other side
actor.on('precollision', (ev) => {
     console.log(ev)
    }
);


game.add(actor);
game.start().then(function () {
  // ready, set, go!
  console.log("ready, set, go!");
  console.log(window.document.getElementsByTagName("canvas")[0].toDataURL());
})

