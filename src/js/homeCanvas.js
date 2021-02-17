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
        radius: 40,
      },
      triangle: {
        x: 0,
        y: 0,
        hypo: 60,
      },
      line: {
        x: 0,
        y: 0,
      },
    };
    this.scale = 3;
    this.color = "#BD00FF";
    this.sectionPadding = 0;
  }

  init() {
    this.setCanvas();
    this.setElementsPos();

    if (this.ctx) {
      this.draw();
    }

    console.log(this.elements);
    console.log(this.cnvWidth, this.cnvHeight, this.cnv);
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

  setElementsPos() {
    let header1 = document.querySelector("#home h1").getBoundingClientRect();
    let header2 = document.querySelector("#home h3").getBoundingClientRect();
    let header3 = document
      .querySelector("#home header")
      .getBoundingClientRect();

    this.elements.circle.x = Math.floor(header1.x - this.sectionPadding);
    this.elements.circle.y = Math.floor(header1.y);

    this.elements.triangle.x = Math.floor(
      header2.x + header2.width - this.sectionPadding / 1.2
    );
    this.elements.triangle.y = Math.floor(header2.y + 16);

    this.elements.line.x = Math.floor(this.cnvWidth / 2);
    this.elements.line.y = Math.floor(header3.y + header3.height / 2);
  }

  draw() {
    this.drawElements();
  }

  drawElements() {
    this.ctx.strokeStyle = this.color;

    this.drawLine();
    this.drawTriangle();
    this.drawCircle();
  }

  drawLine() {
    let line = this.elements.line;

    this.ctx.beginPath();
    this.ctx.moveTo(line.x + 100, line.y - 120);
    this.ctx.lineTo(line.x - 120, line.y + 100);
    this.ctx.stroke();
  }

  drawCircle() {
    let circle = this.elements.circle;

    this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
  }

  drawTriangle() {
    let circle = this.elements.circle;
    let triangle = this.elements.triangle;
    let secondPos = {
      x: Math.floor(triangle.x - triangle.hypo),
      y: Math.floor(
        triangle.y -
          Math.sqrt(
            triangle.hypo ** 2 -
              (triangle.hypo * Math.cos(this.degToRad(28))) ** 2
          )
      ),
    };

    this.ctx.beginPath();
    this.ctx.moveTo(triangle.x, triangle.y);
    this.ctx.lineTo(secondPos.x, secondPos.y);
    this.ctx.lineTo(
      Math.floor(
        secondPos.x +
          Math.sqrt(
            triangle.hypo ** 2 -
              (triangle.hypo * Math.sin(this.degToRad(86))) ** 2
          )
      ),
      Math.floor(secondPos.y + triangle.hypo)
    );
    this.ctx.lineTo(triangle.x, triangle.y);
    this.ctx.moveTo(circle.x + circle.radius, circle.y);
    this.ctx.stroke();
  }

  degToRad(deg) {
    return (deg * Math.PI) / 180;
  }
}

let homeCanvas = new canvasParallax();

window.addEventListener("load", () => {
  homeCanvas.init();
});
