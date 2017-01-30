
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    // Custom
    this.totalParachutes;
    
    this.setRandomY = function () {
        return Math.floor(Math.random() * this.game.width +1);
    };
    this.sendParachutes = function () {
        var speed = this.levelData.parachutes.speed;
        console.log(speed);
        var parachute = this.game.add.sprite(this.setRandomY(), 0, 'parachute');
        parachute.scale.setTo(1, 1);
        //  If you prefer to work in degrees rather than radians then you can use Phaser.Sprite.angle
        //  otherwise use Phaser.Sprite.rotation
        parachute.angle = this.game.rnd.angle();

        // Make the sprite solid in the stage (and gravity has effect ...)
        this.game.physics.enable(parachute, Phaser.Physics.ARCADE);
        this.game.physics.arcade.collide(parachute);
        
        // Handle the on touch event
        parachute.body.onCollide = new Phaser.Signal();
        parachute.body.onCollide.add(this.saved, this);

        // Method for animation: target  -  direction                    -  type                               - loop
        var currentGame = this.game;

        this.totalParachutes++;

        return parachute;
    };
    this.saved = function (parachute) {
        parachute.destroy();
    }
};
BasicGame.Game.prototype = {

	create: function () {
        
        this.level      = this.level || 0;
        this.levelData  = this.game.global.levels[this.level];
        this.points     = 0;
        this.totalParachutes = 0;
        timer = this.game.time.now + 100;

        // Background
        this.add.sprite(this.width / 2, this.height / 2, 'background' + this.level);
        
        //  Set the stage (global) gravity
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = this.levelData.parachutes.gravity;

        // boat                    x axis              y axis             index in Phaser cache
        boat = this.add.sprite(this.game.width / 2, this.game.height - 180, 'boat');
                
        // Parachutes
        var parachute = this.sendParachutes;
        console.log(parachute);
        // Physics
        this.game.physics.enable(boat, Phaser.Physics.ARCADE);
        this.game.physics.enable(parachute, Phaser.Physics.ARCADE);
        boat.body.checkCollision.up = true;
        boat.body.allowGravity = false; // Prevent from fall out of the bottom
        // parachute.body.checkCollision.down = true;

        boat.body.collideWorldBounds = true;
        boat.body.collideWorldBounds = true;
    },

	update: function () {

		//	Launch Parachute
        if (this.totalParachutes < this.levelData.parachutes.count && game.time.now < timer) {
            this.game.time.events.loop(Phaser.Timer.SECOND, this.sendParachutes, this);
        }

        // Move the boat
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            boat.x -= 4;
            boat.scale.setTo(-1, 1);
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            boat.x += 4;
            boat.scale.setTo(1, 1);
        }

        this.game.physics.arcade.collide(boat);
        // parachute.body.onCollide = new Phaser.Signal();
        // parachute.body.onCollide.add(this.saved, this);
	},
    /**
     *  Display data on screen
     */
    render: function () {
        this.game.debug.bodyInfo(boat);
        //this.game.debug.bodyInfo(parachute);
    },
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}
};
