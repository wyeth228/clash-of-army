import DetailAbstraction from "../../Abstractions/DefaultTank/DetailAbstraction";
import IVector2 from "../../Engine/Interfaces/IVector2";

export class Engine extends DetailAbstraction {
  private readonly _isDestroyed: boolean = false;

  private readonly _positionOnTank: IVector2;

  constructor(positionOnTank: IVector2) {
    super();

    this._positionOnTank = positionOnTank;
  }

  isDestroyed(): boolean {
    return this._isDestroyed;
  }

  getPositionOnTank(): IVector2 {
    return this._positionOnTank;
  }

  updatePositionOnTank(leftTopCornerOfTank: IVector2, radians: number): void {
    this.setPosition(
      leftTopCornerOfTank
        .add(this._positionOnTank)
        .rotateAround(this._position, this._radians)
    );

    this._radians = radians;
  }
}
