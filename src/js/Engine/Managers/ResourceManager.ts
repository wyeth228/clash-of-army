import IImageLoader from "../Interfaces/IImageLoader";
import IResourceManager from "../Interfaces/IResourceManager";
import { SpriteSheetLoadInfoType } from "../Types";

export class ResourceManager implements IResourceManager {
  private readonly _spriteSheets: Map<string, HTMLImageElement> = new Map();
  private readonly _sounds: Map<string, HTMLAudioElement> = new Map();

  private readonly _imageLoader: IImageLoader;

  constructor(imageLoader: IImageLoader) {
    this._imageLoader = imageLoader;
  }

  getSpriteSheets(): Map<string, HTMLImageElement> {
    return this._spriteSheets;
  }

  getSounds(): Map<string, HTMLAudioElement> {
    return this._sounds;
  }

  async loadSpriteSheets(
    spriteSheets: Array<SpriteSheetLoadInfoType>
  ): Promise<void> {
    for (const spriteSheetInfo of spriteSheets) {
      const spriteSheet = await this._imageLoader.loadImage(
        spriteSheetInfo.src
      );

      if (spriteSheet) {
        this._spriteSheets.set(spriteSheetInfo.name, spriteSheet);
      }
    }
  }

  async loadSounds(sounds: Array<String>): Promise<void> {}
}
