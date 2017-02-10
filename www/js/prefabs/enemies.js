  var Enemies = function(game, count, enemyDesc, hero, parent) {
    var desc = this.desc = enemyDesc;

    // Loading
    Phaser.Group.call(this, game, parent);

    this.count = count = count || 5;

    this.livingEnemies = count;

    this.killedAll = true;

    var enemy,
        padding = 10;
    // Not sure why there is a bug here... bah
    for (var i = 0; i < count; i++) {
      enemy = this.add(
        new Enemy(this.game, 0, 0, desc, enemy || hero)
      );
      enemy.x = enemy ? enemy.x : this.game.rnd.integerInRange(enemy.width, game.width - enemy.width);
      enemy.y = -(this.game.height + enemy.height/2 + i * (enemy.height));
    }
  };

  Enemies.prototype = Object.create(Phaser.Group.prototype);
  Enemies.constructor = Enemies;

  Enemies.prototype.update = function() {
    this.callAll('update');
  };

  Enemies.prototype.reset = function(from, to, speed) {
    this.exists = true;
    this.livingEnemies = this.count;
    this.killedAll = true;

    var i = 0;
    this.forEach(function(enemy) {
      if (i === 0) {
        enemy.resetTarget(to);
      }

      enemy.reload(i, from, speed);
      i++;
    }, this);
  };

  Enemies.prototype.updateStatus = function(enemy, autoKill){
    this.livingEnemies--;

    if(autoKill){
      this.killedAll = false;
    }

    if(this.livingEnemies === 0){
      this.exists = false;

      // Randomly activate a bonus if killed all the enemies
      if(this.killedAll){
        var rdm = this.game.rnd.integerInRange(1, this.count);
        
        if(rdm === 1) {
          this.game.state.getCurrentState().addBonus(enemy);
        }
      }
    }
  };

  // module.exports = Enemies;