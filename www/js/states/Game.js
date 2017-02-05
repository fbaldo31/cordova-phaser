
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
    this.scale;
    this.levelData;
    this.totalParachutes;
    this.font;
    this.falling;
    this.levelText;
    this.randomY;
};
BasicGame.Game.prototype = {

	create: function () {
        
        this.levelData  = this.game.global.levels[this.game.global.currentLevel];
        this.game.global.life = this.levelData.health;
        this.game.global.points = 0;
        this.totalParachutes = 0;
        this.falling    = [];
        this.randomY =
        timer = this.game.time.now + 100;

        // Background
        this.add.sprite(this.width / 2, this.height / 2, 'background' + this.game.global.currentLevel);
        
        //  Set the stage (global) gravity
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = this.levelData.parachutes.gravity;

        // Score
        this.font = { font: "20px Arial", fill: "#ffc500", align: "left" };
        this.game.global.scoreText = this.game.add.text(20, 40, 'Score: 0', this.font);
        // Life
        this.game.global.lifeText = this.game.add.text(20, 60, 'Life: '+ this.game.global.life, this.font);
        // Level
        this.levelText = this.game.add.text(20 , 20, 'Level: '+ this.game.global.currentLevel, this.font);
        
        // boat                    x axis       y axis             index in Phaser cache
        boat = this.add.sprite(this.game.width / 2, this.game.height - 180, 'boat');
                
        // parachute
        var y = this.world.randomY < 100 ? 100 : this.world.randomY > this.game.width * 0.9 ? this.game.width * 0.9 : this.world.randomY;
        parachute = new Parachute(this.game, y , 0);
        // and add it to the game
        this.game.add.existing(parachute);
        this.falling.push(parachute);
        
        // Physics
        this.game.physics.enable(boat, Phaser.Physics.ARCADE);
        this.game.physics.enable(parachute, Phaser.Physics.ARCADE);
        boat.body.checkCollision.up = false; // Allow parachutes pass over
        boat.body.allowGravity = false; // Prevent from fall out of the bottom
        boat.body.collideWorldBounds = true;

        // Music
        if (this.add.audio('music'+ this.game.global.currentLevel)) {
            this.music = this.add.audio('music'+ this.game.global.currentLevel);
            this.music.loop = true;
            this.music.play();
        }
    },

	update: function () {
        
		//	Launch Parachutes
        var fallingGroup = this.game.add.group();
        if (this.totalParachutes < this.levelData.parachutes.count && game.time.now < timer) {
            this.game.time.events.loop(3000, function () {
                var y = this.world.randomY < 100 ? 100 : this.world.randomY > this.game.width * 0.9 ? this.game.width * 0.9 : this.world.randomY;
                var parachute = new Parachute(this.game, y, 0);
                this.game.add.existing(parachute);
                this.falling.push(parachute);
                fallingGroup.add(parachute);
            }, this);
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
        this.falling.forEach(function (parachute, index) {
            this.game.physics.arcade.collide(boat, parachute);
        });
        
        // Pause
        // we wait fort tap event: callback reference      event
        this.game.input.onDown.add(this.pauseOrResumeGame, this);

        // Lose the stage
        if (this.game.global.life == 0){
            this.quitGame();
        }

        // Win the stage
        if (this.game.global.points == this.levelData.minScore) {
            this.gotToNextLevel();
        }
	},
    /**
     *  Display data on screen
     *  Uncomment these lines for debug data of sprites
     */
    render: function () {
        
        //this.game.debug.bodyInfo(boat);
        
        // this.falling.forEach(function (value, index) {
        //     if (value.body.onCollide) {
        //         console.log(index, value.onCollide);
        //     }
        //     value.game.debug.body(value);
        // });
    },
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        boat.destroy();
        this.falling.forEach(function (parachute, index) {
            parachute.destroy();
        });
		//	Then let's go back to the main menu.
		this.state.start('GameOver');
	},
    pauseOrResumeGame: function (event){
        this.game.paused = !this.game.paused;
    },
    gotToNextLevel: function (pointer) {
        // destroy all sprites
        boat.destroy();
        this.falling.forEach(function (parachute, index) {
            parachute.destroy();
        });
        
        // Change level
        // This commented because in this sample, only one level is available
        this.game.global.currentLevel++;
        
        //	Then let's go to menu.
        this.state.start('NextLevel');
    }
};
