import IVector2 from "./IVector2";

export default interface IRenderer {
  setScaling(scale: IVector2): void;

  antialiasing(val: boolean): void;

  drawImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    sX: number,
    sY: number,
    sW: number,
    sH: number,
    originX: number,
    originY: number,
    alpha?: number
  ): void;

  drawRectangle(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    color: string,
    originX: number,
    originY: number,
    lineColor: string,
    lineWidth: number,
    alpha?: number
  ): void;

  drawCircle(
    x: number,
    y: number,
    radius: number,
    radians: number,
    color: string,
    originX: number,
    originY: number,
    lineColor: string,
    lineWidth: number,
    alpha?: number
  ): void;

  drawText(
    text: string,
    font: string,
    color: string,
    size: number,
    x: number,
    y: number,
    alpha?: number
  ): void;

  start?(offset: IVector2): void;

  end?(): void;
}
