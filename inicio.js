class Inicio extends Phaser.Scene{

constructor(){
super("Inicio");
}

preload(){
    this.load.image("fondo","/fondo.png");
    this.load.image("bird","/bird1.png");
    this.load.image("pipe","/pipe.png");
}

create(){

// ACTIVIDAD:

// Cambiar estas posiciones fijas para que se adapten al tamaño del celular

// usando this.scale.width y this.scale.height

this.add.image(this.scale.width / 2,this.scale.height / 2 ,"fondo")
.setDisplaySize(this.scale.width,this.scale.height);

this.add.text(60,200,"El chiken \nvolador",{
    fontSize:"40px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 6,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
});
    let boton = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 80,
        "Play",
            {
                fontSize: "32px",
                color: "#000000",
                backgroundColor: "#2c82d3a6",
                stroke: "#ffffff",
                fontStyle: "bold",
                strokeThickness: 3,
                padding: { x: 20, y: 10 }
            }
        ).setOrigin(0.5);

        boton.setInteractive();
        boton.on("pointerdown", () => {
            this.scene.start("Juego");
        });
    }
}