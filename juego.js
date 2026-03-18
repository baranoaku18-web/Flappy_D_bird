class Juego extends Phaser.Scene {

constructor(){
    super("Juego");
}

create(){

    // ---------------- PANTALLA ----------------
    this.ancho = this.scale.width;
    this.alto = this.scale.height;

    // ---------------- FONDO ----------------
    this.add.image(this.ancho/2, this.alto/2, "fondo");

    // ---------------- PAJARO ----------------
    this.bird = this.physics.add.sprite(100, this.alto/2, "bird")
    .setScale(0.15); //escala el pajaro por si lo requieres
    this.bird.body.gravity.y = 900;

    // hitbox del pajaro
    this.bird.body.setSize(this.bird.width * 0.6, this.bird.height * 0.6);

    // ---------------- GRUPO DE TUBOS ----------------
    this.pipes = this.physics.add.group();

    // ---------------- PUNTOS ----------------
    this.puntos = 0;
    this.textoPuntos = this.add.text(20,20,"0",{
        fontSize:"40px",
        fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#ffffff",
        strokeThickness: 6
    });

    // ---------------- CONTROLES ----------------
    this.input.on("pointerdown", this.saltar, this);
    this.input.keyboard.on("keydown-SPACE", this.saltar, this);

    // ---------------- GENERADOR DE TUBOS ----------------
    this.time.addEvent({
        delay: 2500, //Temporizador que Aumenta o Disminulle el tiempo en el que se generan los tubos
        callback:this.crearTubos,
        callbackScope:this,
        loop:true
    });

    // ---------------- COLISION ----------------
    this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this);

    // ---------------- DEBUG HITBOX ----------------
    this.debugGraphics = this.add.graphics();
    this.physics.world.createDebugGraphic();

}

update(){

    this.verificarCaida();
    this.verificarPuntos();

}

// ---------------- SALTO ----------------
saltar(){
    this.bird.setVelocityY(-350);
}

// ---------------- VERIFICAR CAIDA ----------------
verificarCaida(){

    if(this.bird.y > this.alto){
        this.gameOver();
    }

}


// ---------------- CONTAR PUNTOS ----------------
verificarPuntos(){

    this.pipes.getChildren().forEach(pipe=>{

        if(pipe.getData("tipo") == "arriba"){

            if(pipe.x < this.bird.x && !pipe.getData("pasado")){

                pipe.setData("pasado",true);
                this.puntos++;
                this.textoPuntos.setText(this.puntos);
            }
        }
    });
    this.debugGraphics.clear();
    this.physics.world.drawDebug = true;
}

// ---------------- CREAR TUBOS ----------------
crearTubos(){

    let espacio = 200; //Aumenta o disminuye el espacio entre los tubos
    let posicion = Phaser.Math.Between(this.alto * 0.3, this.alto * 0.7);

    // tubo arriba
    let arriba = this.pipes.create(this.ancho, posicion-espacio,"pipe");

    arriba.setOrigin(0,1);
    arriba.body.allowGravity = false;
    arriba.setVelocityX(-200);

    arriba.setData("tipo","arriba");
    arriba.setData("pasado",false);


    // Ajusta el tamaño de la colision tubo arriba
    arriba.body.setSize(arriba.width * 0.7, arriba.height);
    arriba.body.setOffset(arriba.width * 0.10, 0);

    // tubo abajo
    let abajo = this.pipes.create(this.ancho,posicion,"pipe");

    abajo.setOrigin(0,0);
    abajo.body.allowGravity = false;
    abajo.setVelocityX(-200);

    abajo.setData("tipo","abajo");

    
    // Ajusta el tamaño de la colision tubo abajo
    abajo.body.setSize(abajo.width * 0.7, abajo.height);
    abajo.body.setOffset(abajo.width * 0.10, 0);

    this.pipes.getChildren().forEach(pipe=>{
        if(pipe.x < -100){
            pipe.destroy();
        }
    });
}

// ---------------- GAME OVER ----------------
gameOver(){
        this.scene.start("GameOver",{puntos:this.puntos});
    }
}