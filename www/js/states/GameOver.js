
BasicGame.GameOver = function (game) {

	// this.bg;
	this.music = null;

};

BasicGame.GameOver.prototype = {

	create: function () {

		this.gameoverPanel.show(this.game.score);
	}

};
