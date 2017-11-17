//namespace
PhaserHelloWorld = {};
//States
PhaserHelloWorld.State = {
  BOOT: "Boot",
  PRELOADER: "Preloader",
  MAIN_MENU: "MainMenu",
  GAME: "Game"
};


PhaserHelloWorld.Boot = function (game) {

};

PhaserHelloWorld.Boot.prototype = {
  preload: function () {
    console.log("Boot.preload");

    //preloader assets
    this.load.image('preloaderBar', 'assets/preloader_bar.png');
    this.load.image('perro', 'assets/perro-bosque.png');

  },
  create: function () {
    console.log("Boot.create");

    // Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.game.input.maxPointers = 1;
    // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    this.game.stage.disableVisibilityChange = true;

    this.state.start(PhaserHelloWorld.State.PRELOADER);
  }
};
