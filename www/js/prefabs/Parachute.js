/**
 * Created by Frederick BALDO on 29/01/2017.
 */

'use strict';

var Parachute = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'parachute', frame);

    // initialize your prefab here
    this.scale.setTo(1, 1);
    // parachute.angle = game.rnd.angle();
    // Add a physic body
    this.game.physics.arcade.enableBody(this);
};

Parachute.prototype = Object.create(Phaser.Sprite.prototype);
Parachute.prototype.constructor = Parachute;

Parachute.prototype.update = function() {

    // write your prefab’s specific update code here
    this.game.physics.arcade.collide(parachute);
    this.body.checkCollision.down = true;
    this.body.checkCollision.up = true;
    this.body.checkCollision.left = true;
    this.body.checkCollision.right = true;
    
    // Handle the collision with the boat
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(Parachute.prototype.saved, this);

    //  This makes the game world bounce-able
    this.events.onOutOfBounds.add(Parachute.prototype.died, this);
};
Parachute.prototype.saved = function () {
    var newPoint = 1;
    // var points = localStorage.getItem('points') || 0;
    // points++;
    this.game.global.points = this.game.global.points + newPoint;
    console.log('+1 Point', this.game.global.points);

    // this.game.time.events(500, function() {
    //     this.destroy();
    // });
};
Parachute.prototype.died = function () {
    this.game.global.life--;
    console.log('Dead -1 point');
    this.destroy();
};
//
// module.exports = Parachute;