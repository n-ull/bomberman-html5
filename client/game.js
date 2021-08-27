//var PIXI = require('pixi.js');
let app = {};
let loader = {};

// Componentes para las entidades y quizá objetos colicionables
class Component {
  constructor() {

  }
}

// Es un objecto con textura
class Entity extends PIXI.Sprite {
  constructor(frame = PIXI.Texture.from('./assets/laldrillito.gif'), pos) {
    //const sheet = loader.resources.bomberman.spritesheet;
    //loader.resources[ "bomberman" ].spritesheet
    super(frame);
  }
};

// Crea el juego y le coloca los listeners para saber si el browser cambia de tamaño
// agrega el tamaño del canvas segun el tamaño del browser
class System {
  constructor() {
    app = new PIXI.Application({ width: 360, height: 360 });
    //********************* TESTING LOADERS *********************
    loader = PIXI.Loader.shared;
    loader.add('bomberman', './assets/spritesheet.json');
    loader.load((loader, resources) => {
      let sheet = resources["bomberman"].spritesheet;
      this.player = new Player(sheet.textures['abajo (5).gif']);
      app.stage.addChild(this.player);
      console.log('Resources loaded!');
    });
    //console.log('Inmediato', loader)
    const grassTexture = PIXI.Texture.from('./assets/pastito.gif');
    const grassSprite = new PIXI.TilingSprite(grassTexture, app.screen.width, app.screen.height);
    app.stage.addChild(grassSprite);
    // Ejemplo de lo que se le podría agregar a la instancia Game
    this.Scene = 1;
    
    //app.stage.addChild(this.player);
  }
}


class Player extends Entity {
  constructor(sheet) {
    super(sheet, { x: 0, y: 0 });
    this.config = {
      moveLeft: "ArrowLeft",
      moveRight: "ArrowRight",
      moveUp: "ArrowUp",
      moveDown: "ArrowDown"
    }
    this.moving = {
      up: false,
      down: false,
      left: false,
      right: false
    }
    this.velocity = 3;
    this.initControls();
    app.ticker.add((delta) => {
      if (this.moving[ "up" ])
        this.position.y -= this.velocity;
      if (this.moving[ "down" ])
        this.position.y += this.velocity;
      if (this.moving[ "left" ])
        this.position.x -= this.velocity;
      if (this.moving[ "right" ])
        this.position.x += this.velocity;
    })
  }
  initControls() {
    document.addEventListener('keydown', this.movement(this));
    document.addEventListener('keyup', this.movement(this));
  }

  movement(player) {
    return function (k) {
      let keypress = k.type == "keydown";
      if (k.code == player.config[ "moveUp" ])
        player.moving.up = keypress;
      if (k.code == player.config[ "moveDown" ])
        player.moving.down = keypress;
      if (k.code == player.config[ "moveRight" ])
        player.moving.right = keypress;
      if (k.code == player.config[ "moveLeft" ])
        player.moving.left = keypress;
    }
  }
}



let Game = new System();
//Add the canvas that Pixi automatically created for you to the HTML document

document.body.appendChild(app.view);