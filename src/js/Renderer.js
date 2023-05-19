export default class Renderer {
  canvas;
  ctx;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  getCanvas() {
    return this.canvas;
  }

  getCtx() {
    return this.ctx;
  }

  antialiasing(val) {
    this.ctx.imageSmoothingEnabled = val;
  }

  drawImage(
    img,
    x,
    y,
    w,
    h,
    r,
    sX,
    sY,
    sW,
    sH,
    centerShiftX = 0,
    centerShiftY = 0
  ) {
    this.ctx.save();

    this.ctx.translate(x, y);
    this.ctx.rotate(r);
    this.ctx.translate(-w / 2 + centerShiftX, -h / 2 + centerShiftY);

    this.ctx.drawImage(img, sX, sY, sW, sH, 0, 0, w, h);

    this.ctx.restore();
  }

  drawRectangle(x, y, w, h, r) {
    this.ctx.save();

    this.ctx.translate(x, y);
    this.ctx.rotate(r);
    this.ctx.translate(-w / 2, -h / 2);

    this.ctx.fillRect(0, 0, w, h);

    this.ctx.restore();
  }

  drawText(text, font, color, size, x, y) {
    this.ctx.save();

    this.ctx.font = `${size}px ${font}`;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);

    this.ctx.this.ctx.restore();
  }
}
