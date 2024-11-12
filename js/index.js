/* scenes is like a map */
import MainScene from "./MainScene.js";

const config = {
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: '#696f6f',
    type: Phaser.AUTO,
    parent: 'Kingdom',
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH, // centers the game in screen
        zoom: 2,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 },
        }
    }
}

/* initializing game */
const game = new Phaser.Game(config);