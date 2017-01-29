
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
    this.totalParachutes = 0;
    
    this.setRandomY = function () {
        // var  max = Math.floor(this.game.width);
        // var scaleY =  Math.floor(Math.random() * (max - 100)) + 100;
        // console.log(max, scaleY);
        // console.log(scaleY);
        // return scaleY;
    };
    this.sendParachutes = function () {
        var speed = this.levelData.parachutes.speed;
        var parachute = this.game.add.sprite(this.game.width / Math.floor(this.rnd), 50 /*this.setRandomY(), this.game.height-10*/, 'parachute');
        parachute.scale.setTo(1, 1);

        //  If you prefer to work in degrees rather than radians then you can use Phaser.Sprite.angle
        //  otherwise use Phaser.Sprite.rotation
        parachute.angle = this.game.rnd.angle();

        parachute.animations.add('fall', [0,1,0,2,0,1,0,2,0], 20);
        //parachute.animations.add('dance', [0,1,0,2,0,1,0,2,0], 20);
        parachute.animations.play('fall');
        //parachute.animations.play('dance');

        this.game.add.tween(parachute).to({ y: this.game.height }, speed, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        this.totalParachutes++;
        timer = this.game.time.now + 100;
    }
};
BasicGame.Game.prototype = {

	create: function () {
        
        this.level      = this.level || 0;
        this.levelData  = this.game.global.levels[this.level];
        this.points     = 0;

        // Background
        this.add.sprite(this.width / 2, this.height / 2, 'background' + this.level);
        
        // boat
        boat = this.add.sprite(this.game.width / 2, this.game.height - 150, 'boat');
        
        // Parachutes
        this.sendParachutes();
    },

	update: function () {

		//	Launch Parachute
        if (this.totalParachutes < this.levelData.parachutes.count && game.time.now < timer) {
            this.sendParachutes();
        }

        // Move the boat
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            boat.x -= 4;
            boat.scale.setTo(-1, 1);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            boat.x += 4;
            boat.scale.setTo(1, 1);
        }
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}
};
