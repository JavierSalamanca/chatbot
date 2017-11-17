
PhaserHelloWorld.Preloader = function(game) {
    this.background = null;
    this.preloadBar = null;
    
    this.ready = false;
};

PhaserHelloWorld.Preloader.prototype = {
    preload:function(){
        console.log("Preloader.preload");
        //
        this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');
        
        // This sets the preloadBar sprite as a loader sprite.
        // What that does is automatically crop the sprite from 0 to full-width
        // as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);
        
        
        //game assets
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        
        
        
        var arPreventedKeys = [
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        ];
        this.input.keyboard.addKeyCapture(arPreventedKeys);        
    },
    create:function(){
        console.log("Preloader.create");
        
        //add preloader - start Preloader state
        
        this.state.start(PhaserHelloWorld.State.MAIN_MENU);
    },
    update: function () {
    }
};
