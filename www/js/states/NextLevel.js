
BasicGame.NextLevel = function (game) {

	this.music = null;

};

BasicGame.NextLevel.prototype = {

	create: function () {

		BasicGame.currentLevel = BasicGame.currentLevel || 0;
		var game = this.game;

		// Move to the next level
		BasicGame.currentLevel += 1;

		if (BasicGame.currentLevel < BasicGame.Levels.length) {
			this.showNextLevel(function() {
				console.log('go again!', BasicGame.Levels.length, BasicGame.currentLevel);
				game.state.start('Game');
			});
		} else {
			this.showYouWin(function() {
				console.log('you totally won it all!');
				game.state.start('MainMenu');
			});
		}
	},
	update: function () {

		//	Do some nice funky main menu effect here
	}
};
