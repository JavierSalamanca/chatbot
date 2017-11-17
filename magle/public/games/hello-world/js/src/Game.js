PhaserHelloWorld.Game = function (game) {
    this.cursors = null;
    this.platforms = null;
    this.player = null;

    this.walking = false;
    this.destination = null;
    this.speed = 150;
};

PhaserHelloWorld.Game.prototype = {
    create: function () {
        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        var ground = this.platforms.create(0, this.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = this.platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = this.platforms.create(-150, 250, 'ground');

        ledge.body.immovable = true;    
        
        
        this.createPlayer();
        
        this.cursors = this.input.keyboard.createCursorKeys();
        //add a click handler
        this.input.onDown.add(this.click, this);
    },

    update: function () {
        //collision
        this.physics.arcade.collide(this.player, this.platforms);


        if (this.cursors.left.isDown)
        {
            this.playerGoLeft();
        }
        else if (this.cursors.right.isDown)
        {
            this.playerGoRight();
        }
        else {
            this.playerStandStill();
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -350;
        }



        if (this.walking) {
            if(this.destination != null && this.distanceX(this.destination.x, this.player.position.x, true) > 2.5) {
                //walk left or right
                if(this.destination.x > this.player.position.x){
                    //right
                    this.playerGoRight();
                } else {
                    this.playerGoLeft();
                }
            } else {
                this.playerStandStill();
                this.player.position.x = this.destination.x;
                this.destination = null;
                this.walking = false;
            }
        }

    },
    click: function (loc, event) {
        console.log("click", loc.x, loc.y, event);
        this.walkTo(loc.x, loc.y);
    },
    /**
     * When user will click anywhere this function checks if player can go there and then sets the player animation
     * @param x
     * @param y
     */
    walkTo: function (x, y) {
        console.log("walkTo", x, y);
        this.destination = new Phaser.Point(x, y);
        this.walking = true;
    },
    playerStandStill: function () {
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
        //  Stand still
        this.player.animations.stop();
        this.player.frame = 4;
    },
    playerGoRight: function () {
        //  Move to the right
        this.player.body.velocity.x = this.speed;
        this.player.animations.play('right');
    },
    playerGoLeft: function () {
        //  Move to the left
        this.player.body.velocity.x = -this.speed;
        this.player.animations.play('left');
    },
    createPlayer: function () {
        this.player = this.add.sprite(32, this.world.height - 150, "dude");
        //  We need to enable physics on the player
        this.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 0);

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    },
    distanceX: function (x1, x2, round) {
        var distance = Math.abs(x1 - x2);
        return round ? Math.round(distance) : distance;
    }
};