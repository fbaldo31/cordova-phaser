
BasicGame.MainMenu = function (game) {

	// this.bg;
	this.music = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.music = this.add.audio('menuMusic');
        this.music.loop = true;
        this.music.play();

		// Backgroung image
		// this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'menu_bg');

		// Background color
		this.game.stage.backgroundColor = "#6DCC61";

		//water
		water = this.add.sprite(this.game.width * 0.35, this.game.height - 130, 'water');
		
		// Parachute 
		parachute = this.add.sprite(this.game.width * 0.5, 180, 'para_menu');

		// boat                    x axis       y axis             index in Phaser cache
		boat = this.add.sprite(this.game.width * 0.5, this.game.height - 180, 'boat');

		var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Tap to Start!', {
			font: '42px Arial', fill: '#ffffff', align: 'center'
		});
		text.anchor.set(0.5);

		this.input.onDown.add(this.startGame, this);


	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

		// this.bg.width = width;
		// this.bg.height = height;


	},

	startGame: function () {
		this.music.stop();
		this.state.start("Game");
	}

};
