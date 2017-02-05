
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	init: function () {
		this.preloadBar = null;
		this.ready = false;
	},

	preload: function () {
		
		//	These are the assets we loaded in Boot.js				
		this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloaderBar');		
		this.preloadBar.anchor.setTo(0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

		this.load.image('menu_bg', 'assets/images/menu_background.png');
		this.load.image('logo', 'assets/images/logo.png');
		this.load.image('para_menu', 'assets/images/para-menu.png');
		this.load.image('water', 'assets/images/water.png');

		// Load Levels config
		this.game.global.levels = this.cache.getJSON('levels');
		console.log(this.game.global.levels);
		// Load level backgrounds
		for (var i in this.game.global.levels) {
			var stage = this.game.global.levels[i];
			this.load.image('background'+i, stage.background);
		}

		// Audio track Attribution 
		this.load.audio('menuMusic', ['assets/audio/beat1.ogg']);
		this.load.audio('music0', ['assets/audio/campfire.mp3']);
	},

	create: function () {

		//this.state.start('MainMenu');
	},
	update: function () {

		if (this.cache.isSoundDecoded('menuMusic') && this.ready == false) {
			this.ready = true;
			this.state.start('MainMenu');
		}
	}

};
