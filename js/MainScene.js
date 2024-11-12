/*
Function used to create a characters animations
scene - the scene that the animation is being registered to
characterName - the name of the character sprite being rendered
animations - the set of animations to be rendered
*/
function createCharacterAnimations(scene, characterName, animations) {
    animations.forEach(animation => {
        scene.anims.create({
            key: `${characterName}_${animation.name}`, // Animation key
            frames: scene.anims.generateFrameNames(characterName, {
                prefix: `${characterName}_${animation.name}_`,
                start: animation.startFrame,
                end: animation.endFrame,
                zeroPad: 1
            }),
            frameRate: animation.frameRate,
            repeat: animation.repeat ? -1 : 0
        });
    });
}

/* 
Wrapper function for creating the animation sets
scene - the scene that the animation is being registered to
*/
function createAnimations(scene) {
    
    createCharacterAnimations(scene, 'soldier', [
        { name: 'idle', startFrame: 0, endFrame: 5, frameRate: 5, repeat: true },
        { name: 'walk', startFrame: 0, endFrame: 7, frameRate: 10, repeat: true }
    ]);

    createCharacterAnimations(scene, 'orc', [
        { name: 'idle', startFrame: 0, endFrame: 5, frameRate: 5, repeat: true },
        { name: 'walk', startFrame: 0, endFrame: 7, frameRate: 10, repeat: true }
    ]);
}

class Player {
    constructor(scene, x, y, texture, name, options = {}) {
        
        this.sprite = scene.physics.add.sprite(x, y, texture, `${name}_idle_0`);
        this.sprite.setScale(5);
        this.sprite.setCollideWorldBounds(true);

        this.idleAnimationKey = options.idleAnimationKey || `${texture}_idle`;
        this.walkAnimationKey = options.walkAnimationKey || `${texture}_walk`;

        /* AI generated code */
        if (scene.anims.exists(this.idleAnimationKey)) {
            this.sprite.play(this.idleAnimationKey);
        } else {
            console.warn(`Animation '${this.idleAnimationKey}' does not exist.`);
        }

        /*
        Create the name text and position it above the player sprite 
        Semi-smooth now, maybe find better way to do this
        */
        this.nameText = scene.add.text(x, y - 85, name, {
            fontSize: '25px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        this.scene = scene;
    }

    update(inputKeys, speed) {
        this.sprite.setVelocity(0);
        let isMoving = false;

        /* Move left */
        if (inputKeys.left.isDown) {
            this.sprite.setVelocityX(-speed);
            isMoving = true;
        /* Move right */
        } else if (inputKeys.right.isDown) {
            this.sprite.setVelocityX(speed);
            isMoving = true;
        }

        /* Move up */
        if (inputKeys.up.isDown) {
            this.sprite.setVelocityY(-speed);
            isMoving = true;
        /* Move down */
        } else if (inputKeys.down.isDown) {
            this.sprite.setVelocityY(speed);
            isMoving = true;
        }

        /*
        Playing animations

        when not moving, we are idle animation
        if we are moving we play the walking right animation
        */
        if (!isMoving) {
            if (!this.sprite.anims.isPlaying || this.sprite.anims.getName() !== this.idleAnimationKey) {
                if (this.scene.anims.exists(this.idleAnimationKey)) {
                    this.sprite.play(this.idleAnimationKey);
                }
            }
        } else {
            if (this.sprite.anims.getName() !== this.walkAnimationKey) {
                if (this.scene.anims.exists(this.walkAnimationKey)) {
                    this.sprite.play(this.walkAnimationKey);
                }
            }
        }

        /* Keep updating the name plate when moving */
        this.nameText.x = this.sprite.x;
        this.nameText.y = this.sprite.y - 85;
    }
}

/* MainScene with animations and player management */
export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        /* Pre-loading the sprites and atlas' */
        this.load.atlas('soldier', '../assets/soldier/soldier.png', '../assets/soldier/soldier_atlas.json');
        this.load.atlas('orc', '../assets/orc/orc.png', '../assets/orc/orc_atlas.json')
    }

    create() {
        /* Initializing all the animations */
        createAnimations(this);

        let playername = 'Orc'
        let playername2 = 'Soldier'
        
        this.player = new Player(this, 500, 500, 'orc', playername);
        this.player2 = new Player(this, 1500, 500, 'soldier', playername2);

        /* Define input keys for Player 1 (WASD keys) */
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        /* Define input keys for Player 2 (Arrow keys) */
        this.inputKeys2 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        });
    }

    update() {
        const speed = 250;

        /* Update players with their respective input keys */
        this.player.update(this.inputKeys, speed);
        this.player2.update(this.inputKeys2, speed);
    }
}
