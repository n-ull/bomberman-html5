//var PIXI = require('pixi.js');
let app = new PIXI.Application({ width: 360, height: 360 });
let loader = new PIXI.Loader();
loader.add('bomberman', './assets/spritesheet.json');
//let spriteSheet = PIXI.Loader.shared.add('bomberman', './assets/spritesheet.json');

//Create a Pixi Application
const grassTexture = PIXI.Texture.from('./assets/pastito.gif');
const grassSprite = new PIXI.TilingSprite(grassTexture, app.screen.width, app.screen.height);
app.stage.addChild(grassSprite);

class Entity {
  constructor(frame, pos){
    this.setup = function (){
      const txture = PIXI.Texture.from(frame);
      const playerSprite = new PIXI.Sprite(txture);
      playerSprite.position.set(pos.x, pos.y);
      app.stage.addChild(playerSprite);
    }
    loader.load(this.setup);
  }
};


class Player extends Entity {
  constructor(){
    super('abajo (5).gif', {x: 0, y: 0});
    // this.move = {left: false, right: false, down: false, up: false};
    this.vel = 1;
  }
}

let entity2 = new Entity('abajo (5).gif', {x: 150, y: 150});
let entity = new Entity('arriba (2).gif', {x: 0, y: 150});
// let players = new Player();

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);