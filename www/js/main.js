document.addEventListener("deviceready", onDeviceReady, false);
//	100% of the browser window - see Boot.js for additional configuration
var game = new Phaser.Game("100%", "100%", Phaser.AUTO);
game.global = {
    //Global Vars
	levels: [],
	points: 0,
	life: 100,
	scoreText: {},
	lifeText: {},
	currentLevel: 0,
	accelerometer: {},
	device: '' // mobile, desktop
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
	console.log(navigator.maxTouchPoints);

	if (navigator.maxTouchPoints > 0) {
		game.global.device = 'mobile';
	} else {
		// Here we assume touching device is not available
		game.global.device = 'desktop';
	}
    // navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);
    
	//	Now start the Boot state.
	game.state.start('Boot');
}
