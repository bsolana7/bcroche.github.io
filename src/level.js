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


  //Crea objetos dinamicos con el metodo add.group
  createRandomBalls(){
    
    console.log('createRandomBalls starting');
    let { width, height } = this.sys.game.canvas;
    this.balls =  this.physics.add.group({
      key: 'aqua_ball',
      repeat: 20,
      allowGravity: true,
      collideWorldBounds: true,
      setXY: { x: 100, y: 150, stepX: 120}
      });
      //añadimos el collider al grupo
      this.physics.add.collider(this.player, this.balls);  

      //recorremos el grupo y ponemos posiciones aleatorias
      this.balls.children.iterate( child => 
            child.setPosition(Phaser.Math.RND.between(0,width), Phaser.Math.RND.between(0,height/2)))    
                    
  }

  //Crea objetos dinamicos con el metodo add.group
  createRandomBallsMetodo2(){
    
    console.log('createRandomBalls starting');
    let { width, height } = this.sys.game.canvas;
    this.balls =  this.physics.add.group();
    
    let i= 0;
    for (i=0; i< 20; i++)
    {
      let ball= this.balls.create(Phaser.Math.RND.between(0,width), Phaser.Math.RND.between(0,height/2), 'aqua_ball').setName('aqua_ball_' + i);
        ball.body.collideWorldBounds= true;
    }
    
      //añadimos el collider al grupo
      this.physics.add.collider(this.player, this.balls);  

      
                    
  }
  

  createRandomPlatforms()
  {
    
    console.log('createRandomPlatforms starting');
    let { width, height } = this.sys.game.canvas;
    this.platformsrandom =  this.add.group();
    //let xx= Phaser.Math.RND.between(0,width);
    let i;
    for (i=0;i<10; i++)
    {
      new Platform(this, this.player,this.platformsrandom, Phaser.Math.RND.between(100,width), Phaser.Math.RND.between(100,height*0.6) );    
    }
    
    
    //this.balls.children.iterate(function (child) {
//      child.setPosition(Phaser.Math.RND.between(0,width), Phaser.Math.RND.between(0,height/2));    
  
  
    this.physics.add.collider(this.player, this.platformsrandom);
    

  
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    //this.cameras.main.setBounds(0, 0, 200, 500);
    let { width, height } = this.sys.game.canvas;
    this.cameras.main.setViewport(300, 0, width/2, height);
    this.stars = 10;
    this.bases = this.add.group();
    
   
    this.creaBotones();
    
    
    this.creaBordeJuego(width, height);
    

    this.player = new Player(this, 200, height);
      
    // La camara principal sigue al jugador, con un offset en Y para que no quede en el centro de la pantalla
    this.cameras.main.startFollow(this.player, false, 1,1,0,height/2 - (this.player.height/2)-3);
    
    //this.spawn();

    /*
    this.input
    .setTopOnly(false) // If you want to check if more than the top most hitbox was clicked
  
    .on('pointerdown', (pointer, objectsClicked) => {    

      objectsClicked.forEach(element => {
        console.log(element.name);
        if (element.name == 'mibola') {
        //this.createRandomBalls();
        this.createRandomPlatforms();
      } 
    }     
      );
      console.log(objectsClicked)


  });
  */
  }




  creaBordeJuego(width, height) {
    let graphics= this.add.graphics();
    graphics.lineStyle(5, 0xFF00FF, 1.0);
    graphics.strokeRect(0, 5, width, height - 5);
    

    // Esto crea un cuadrado que se puede pulsar con el ratón
    /*
    this.add
      .rectangle(200, 150, 50, 50, 0xff0000)
      .setName("red")
      .setInteractive();
      */
  }

  creaBolasEstaticas() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(300, 300, 'mibola').setInteractive().setName('mibola');
    this.platforms.create(400, 300, 'mibola');
    this.platforms.create(500, 300, 'mibola');
    this.platforms.create(600, 300, 'mibola');
  }

  creaBotones()
  {    
    const botonEstaticos = this.add.text(100, 30, 'Crea objetos estáticos', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.createRandomPlatforms() );    

      const botonDinamicos = this.add.text(100, 60, 'Crea objetos dinámicos', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.createRandomBalls() );    
      const botonDinamicos2 = this.add.text(100, 90, 'Crea objetos dinámicos v2', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.createRandomBallsMetodo2() );    


  }

  
  
  updateClickCountText(clickCount) {
    this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
  }

}