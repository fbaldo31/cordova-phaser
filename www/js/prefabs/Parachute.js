/**
 * Created by Frederick BALDO on 29/01/2017.
 */

'use strict';

var Parachute = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'parachute', frame);

    // initialize your prefab here
    this.scale.setTo(1, 1);
    parachute.angle = this.game.rnd.angle();
    
    // Add a physic body
    this.game.physics.arcade.enableBody(this);

    // Make the sprite solid in the stage (and gravity has effect ...)
    this.game.physics.enable(parachute, Phaser.Physics.ARCADE);
    this.game.physics.arcade.collide(parachute);

    this.animations.add('balance', [0, 1, 2, 3]);
    this.frame = 0;
    console.log(this.animations);
    this.animations.play('balance', 3, true);
};

Parachute.prototype = Object.create(Phaser.Sprite.prototype);
Parachute.prototype.constructor = Parachute;

Parachute.prototype.update = function() {

    // Write your prefab’s specific update code here
    this.game.physics.arcade.collide(parachute);
    this.body.checkCollision.down = true;
    this.body.checkCollision.up = true;
    this.body.checkCollision.left = true;
    this.body.checkCollision.right = true;
    
    // Handle the collision with the boat
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(Parachute.prototype.saved, this);

    //  This makes the game world bounce-able
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(Parachute.prototype.died, this);
};
Parachute.prototype.saved = function () {
    this.game.global.points++;
    this.game.global.scoreText.text = 'Score: '+ this.game.global.points;

    this.kill();
};
Parachute.prototype.died = function () {
    this.game.global.life--;
    this.game.global.lifeText.text = 'Life: '+ this.game.global.life;

    this.kill();
};

// module.exports = Parachute;