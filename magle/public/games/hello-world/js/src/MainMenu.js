PhaserHelloWorld.MainMenu = function (game) {
  this.title = null;
};

PhaserHelloWorld.MainMenu.prototype = {
  create: function () {

    this.add.sprite(0, 0, 'star');
    this.title = this.add.text(this.world.centerX, 100, "Hello World example", {
      font: "20px Arial",
      fill: "#ffffff",
      align: "center"
    });
    this.title.anchor.setTo(0.5, 0);

    this.add.sprite(0, 0, 'perro');
    //add a click handler
    this.input.onDown.add(this.click, this);
  },
  update: function () {
  },
  click: function (x, y, timedown) {
    this.state.start(PhaserHelloWorld.State.GAME);
  }
};
