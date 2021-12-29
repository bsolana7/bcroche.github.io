import Platform from './platform.js';
import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    //this.cameras.main.setBounds(0, 0, 200, 500);
    let { width, height } = this.sys.game.canvas;
    this.cameras.main.setViewport(0, 0, width/2, height);
    this.stars = 10;
    this.bases = this.add.group();
    
    
    let graphics= this.add.graphics();
    graphics.fillStyle(0x00FF00,1);
    graphics.lineStyle(5, 0xFF00FF, 1.0);
    graphics.strokeRect(0,5,width,height-5);


    new Platform(this, this.player, this.bases, 150, 350);
    new Platform(this, this.player, this.bases, 850, 350);
    new Platform(this, this.player, this.bases, 500, 200);
    new Platform(this, this.player, this.bases, 150, 100);
    new Platform(this, this.player, this.bases, 850, 100);
    new Platform(this, this.player, this.bases, 1000, 100);
    new Platform(this, this.player, this.bases, 1300, 100);
    new Platform(this, this.player, this.bases, 1700, 100);

    this.player = new Player(this, 200, height);
    this.cameras.main.startFollow(this.player, false, 1,1,0,height/2 - (this.player.height/2)-3);
    this.spawn();
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }
}