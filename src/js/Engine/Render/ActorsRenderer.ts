import { Sprite } from "../ActorComponents";
import IActor from "../Interfaces/IActor";
import IActorRenderer from "../Interfaces/IActorsRenderer";
import IRenderer from "../Interfaces/IRenderer";
import IResourceManager from "../Interfaces/IResourceManager";

export class ActorsRenderer implements IActorRenderer {
  private readonly _renderer: IRenderer;
  private readonly _resourceManager: IResourceManager;

  constructor(renderer: IRenderer, resourceManager: IResourceManager) {
    this._renderer = renderer;
    this._resourceManager = resourceManager;
  }

  renderActor(actor: IActor) {
    const sprite = actor.getComponent(Sprite);

    if (!sprite) {
      return;
    }

    const spriteSheet = this._resourceManager
      .getSpriteSheets()
      .get(sprite.getSheetName());

    if (!spriteSheet) {
      return;
    }

    this._renderer.drawImage(
      spriteSheet,
      actor.getPosition().x,
      actor.getPosition().y,
      sprite.getSize().x,
      sprite.getSize().y,
      actor.getRadians(),
      sprite.getSource().x,
      sprite.getSource().y,
      sprite.getSize().x,
      sprite.getSize().y,
      sprite.getOrigin().x,
      sprite.getOrigin().y
    );
  }
}