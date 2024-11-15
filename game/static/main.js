import MainScene from "../scenes/MainScene.js";

const config = {
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: '#696f6f',
    type: Phaser.AUTO,
    parent: 'Kingdom',
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH, 
        zoom: 2,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 },
        }
    },
    dom: {
        createContainer: true
    }
}

new Phaser.Game(config);