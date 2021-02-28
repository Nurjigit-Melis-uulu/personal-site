class canvasParallax {
  constructor() {
    this.cnv = null;
    this.ctx = null;
    this.cnvWidth = 0;
    this.cnvHeight = 0;
    this.elements = {
      circle: {
        x: 0,
        y: 0,
        src: null,
        width: 80,
        startingPos: {
          x: 0,
          y: 0,
        },
      },
      triangle: {
        x: 0,
        y: 0,
        src: null,
        width: 100,
        startingPos: {
          x: 0,
          y: 0,
        },
      },
      line: {
        x: 0,
        y: 0,
        src: null,
        width: 360,
        startingPos: {
          x: 0,
          y: 0,
        },
      },
    };
    this.scale = 3;
    this.color = "#BD00FF";
    this.sectionPadding = 0;
    this.savedMousePos = {
      x: 0,
      y: 0,
    };
  }

  init() {
    this.setCanvas();
    this.setElements();

    if (this.ctx) {
      this.draw();
    }
  }

  resize() {
    let cnvParent = document.querySelector("#home");
    let cnvParentParams = cnvParent.getBoundingClientRect();
    this.cnvWidth = this.cnv.width = Math.floor(cnvParentParams.width);
    this.cnvHeight = this.cnv.height = Math.floor(cnvParentParams.height);
    this.sectionPadding = Math.floor(cnvParentParams.x);
    this.setElements();

    this.draw();
  }

  setCanvas() {
    let cnvParent = document.querySelector("#home");
    let cnvParentParams = cnvParent.getBoundingClientRect();
    this.cnv = document.createElement("canvas");
    this.ctx = this.cnv.getContext("2d");
    this.cnv.id = "home__canvas";
    this.cnvWidth = this.cnv.width = Math.floor(cnvParentParams.width);
    this.cnvHeight = this.cnv.height = Math.floor(cnvParentParams.height);
    this.sectionPadding = Math.floor(cnvParentParams.x);
    cnvParent.appendChild(this.cnv);
  }

  setElements() {
    this.setCircle();
    this.setLine();
    this.setTriangle();
  }

  setCircle() {
    let header = document.querySelector("#home h1").getBoundingClientRect();

    this.elements.circle.src = document.querySelector("#ellipse");
    this.elements.circle.x = Math.floor(header.x - this.sectionPadding);
    this.elements.circle.y = Math.floor(header.y);
    this.elements.circle.startingPos = {
      x: this.elements.circle.x,
      y: this.elements.circle.y,
    };
  }

  setLine() {
    let header = document.querySelector("#home header").getBoundingClientRect();

    this.elements.line.src = document.querySelector("#line");
    this.elements.line.x = Math.floor(this.cnvWidth / 2);
    this.elements.line.y = Math.floor(header.y + header.height / 2);
    this.elements.line.startingPos = {
      x: this.elements.line.x,
      y: this.elements.line.y,
    };
  }

  setTriangle() {
    let header = document.querySelector("#home h3").getBoundingClientRect();

    this.elements.triangle.src = document.querySelector("#triangle");
    this.elements.triangle.x = Math.floor(
      header.x + header.width - this.sectionPadding / 1.2
    );
    this.elements.triangle.y = Math.floor(header.y + 16);
    this.elements.triangle.startingPos = {
      x: this.elements.triangle.x,
      y: this.elements.triangle.y,
    };
  }

  draw() {
    this.cleanCanvas();
    this.drawElements();
  }

  drawElements() {
    this.drawCircle();
    this.drawTriangle();
    this.drawLine();
  }

  drawCircle() {
    let circle = this.elements.circle;
    this.ctx.drawImage(
      circle.src,
      circle.x - circle.width / 2,
      circle.y - circle.width / 2,
      circle.width,
      circle.width
    );
  }

  drawTriangle() {
    let triangle = this.elements.triangle;
    this.ctx.drawImage(
      triangle.src,
      triangle.x - triangle.width / 1.5,
      triangle.y - triangle.width / 2,
      80,
      80
    );
  }

  drawLine() {
    let line = this.elements.line;
    this.ctx.drawImage(
      line.src,
      line.x - line.width / 2,
      line.y - line.width / 2,
      line.width,
      line.width
    );
  }

  cleanCanvas() {
    this.ctx.clearRect(0, 0, this.cnvWidth, this.cnvHeight);
  }

  getMousePos(x, y) {
    this.checkingMousePos(x, y);
  }

  getMouseLeaveEvent() {
    let triangle = this.elements.triangle;
    let circle = this.elements.circle;
    let line = this.elements.line;

    triangle.x = triangle.startingPos.x;
    triangle.y = triangle.startingPos.y;
    circle.x = circle.startingPos.x;
    circle.y = circle.startingPos.y;
    line.x = line.startingPos.x;
    line.y = line.startingPos.y;

    this.update();
  }

  checkingMousePos(x, y) {
    let checking = {
      x: false,
      y: false,
    };
    let cnvPos = this.cnv.getBoundingClientRect();

    if (x > cnvPos.x || x < cnvPos.x + cnvPos.cnvWidth) {
      checking.x = true;
    }
    if (y > cnvPos.y || y < cnvPos.y + cnvPos.cnvHeight) {
      checking.y = true;
    }

    if (checking.x && checking.y) {
      this.updateElementsPos(x, y);
    }
  }

  updateElementsPos(x, y) {
    let triangle = this.elements.triangle;
    let circle = this.elements.circle;
    let line = this.elements.line;
    let speed = 40;

    triangle.x = triangle.startingPos.x + x / speed;
    triangle.y = triangle.startingPos.y + y / speed;
    circle.x = circle.startingPos.x + x / speed;
    circle.y = circle.startingPos.y + y / speed;
    line.x = line.startingPos.x + x / speed;
    line.y = line.startingPos.y + y / speed;

    this.update();
  }

  update() {
    window.requestAnimationFrame(() => this.draw());
  }
}

let homeCanvas = new canvasParallax();

window.addEventListener("load", () => {
  homeCanvas.init();
});

window.addEventListener("resize", () => {
  homeCanvas.resize();
});

document.querySelector("#home").addEventListener("mousemove", (e) => {
  homeCanvas.getMousePos(e.clientX, e.clientY);
});

// document.querySelector("#home").addEventListener("mouseleave", () => {
//   homeCanvas.getMouseLeaveEvent();
// });
