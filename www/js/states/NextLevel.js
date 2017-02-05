
BasicGame.NextLevel = function (game) {

	// this.bg;
	this.music = null;

};

BasicGame.NextLevel.prototype = {

	create: function () {

		this.music = this.add.audio('menuMusic');
        this.music.loop = true;
        this.music.play();

		// Backgroung image
		// this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'menu_bg');

		// Background color
		this.game.stage.backgroundColor = "#6DCC61";

		var winnerText = this.add.text(this.game.width * 0.5, this.game.height * 0.4, 'Congratulations ! You won', {
			font: '42px Arial', fill: '#ffffff', align: 'center'
		});
		winnerText.anchor.set(0.5);

		var startText = this.add.text(this.game.width * 0.5, this.game.height * 0.6, 'Tap to Start', {
			font: '42px Arial', fill: '#ffffff', align: 'center'
		});
		startText.anchor.set(0.5);
		
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
