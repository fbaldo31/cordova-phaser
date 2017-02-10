document.addEventListener("deviceready", onDeviceReady, false);
//	100% of the browser window - see Boot.js for additional configuration
var game = new Phaser.Game("100%", "100%", Phaser.AUTO);
game.global = {
    //Global Vars
	name: 'ng-invader',
	// States of our game
	States: {},
	// Prefabs
	Prefabs: {},
	// Levels
	Levels: {},
	currentLevel: 0,
	orientated: true,
	backgroundX: 0,
	backgroundY: 0,
	paused: true,
	multiplayer: true,
	// Map
	mapData: {},
	// Socket
	socket: {},
	remotePlayers: [],
	toAdd: [],
	toRemove: [],
	latency: 0,
	width: 800,
	height: 600,
	// Helpers
	cpc: function(x) {
		return x * 64 + 32;
	},

	playerById: function(id) {
		for (var i = 0; i < this.remotePlayers.length; i++) {
			if (this.remotePlayers[i].id === id) {
				return this.remotePlayers[i];
			}
		}
		return false;
	},

	resetCallbacks: [],
	reset: function() {
		_.map(Game.resetCallbacks, function(i,v) {
			Game.resetCallbacks[i].apply(this);
		});
	},

	winner: false
};
// Helpers
game.cpc = function(x) {
	return x * 64 + 32;
};
game.playerById = function(id) {
	for (var i = 0; i < this.remotePlayers.length; i++) {
		if (this.remotePlayers[i].id === id) {
			return this.remotePlayers[i];
		}
	}
	return false;
};
game.resetCallbacks = [];
game.reset = function() {
	_.map(game.resetCallbacks, function(i,v) {
		game.resetCallbacks[i].apply(this);
	});
};
//	Add the States your game has.
	//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('MainMenu', BasicGame.MainMenu);
	game.state.add('NextLevel', BasicGame.NextLevel);
	game.state.add('GameOver', BasicGame.GameOver);
	game.state.add('Game', BasicGame.Game);

function onDeviceReady() {
    // Now safe to use device APIs    
    //	Now start the Boot state.
	game.state.start('Boot');
}


