var WB = WB || {};
WB.GameState = WB.GameState || {};

var CancelBtn = {};

CancelBtn.createCancelBtn = function(callback) {
    this.GAME_WIDTH = WB.game.world.width;
    this.GAME_HEIGHT = WB.game.world.height;
    
    var btn = WB.game.add.button(0 , this.GAME_HEIGHT / 5, 'cancel_button', callback, this);
   
    btn.anchor.setTo(0, 0); // Set anchor to the bottom/center
    btn.scale.setTo((this.GAME_WIDTH/btn.width)*0.5);
};


WB.GameState.CancelBtn = CancelBtn;
