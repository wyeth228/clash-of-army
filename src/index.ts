import "./styles/styles.css";

import Engine from "./js/Engine/Engine";
import {
  CANVAS_SIZE,
  LOOP_TIME_STEP,
  TANKS_DATA_JSON_NAME,
  WORLD_ENTITY_DATA_PATH,
} from "./js/ClientConfig";
import Loop from "./js/Engine/Loop";
import SceneManager from "./js/Engine/Managers/SceneManager";
import WorldScene from "./js/Scenes/WorldScene";
import MenuScene from "./js/Scenes/MenuScene";
import CanvasRenderer from "./js/CanvasRenderer";
import ActorsRenderer from "./js/Engine/ActorsRenderer";
import ResourceManager from "./js/Engine/Managers/ResourceManager";
import ImageLoader from "./js/ImageLoader";
import SpriteSheetLoadInfo from "./js/SpriteSheetLoadInfo";
import TankBuilder from "./js/Builders/TankBuilder";
import ActorSpriteComponentBuilder from "./js/Builders/ActorSpriteComponentBuilder";
import TankTurretBuilder from "./js/Builders/TankTurretBuilder";
import WorldEntityDataLoader from "./js/WorldEntityDataLoader";
import FetchClient from "./js/FetchClient";
import WorldEntityDataConverter from "./js/WorldEntityDataConverter";
import Vector2 from "./js/Engine/Vector2";
import EventManager from "./js/Engine/Managers/EventManager";
import InputKeyHandler from "./js/Engine/InputKeyHandler";
import MouseHandler from "./js/Engine/MouseHandler";
import Camera from "./js/Engine/Camera";
import PlayerTankControlling from "./js/PlayerTankControlling";
import ActorAccelerationComponentBuilder from "./js/Builders/ActorAccelerationComponentBuilder";

const canvas = document.createElement("canvas");
canvas.width = CANVAS_SIZE.WIDTH;
canvas.height = CANVAS_SIZE.HEIGHT;
canvas.classList.add("canvas");

async function main() {
  const actorSpriteComponentBuilder = new ActorSpriteComponentBuilder();
  const actorAccelerationComponentBuilder =
    new ActorAccelerationComponentBuilder();
  const tankTurretBuilder = new TankTurretBuilder();
  const tankBuilder = new TankBuilder();

  const worldEntityDataLoader = new WorldEntityDataLoader(
    new FetchClient(),
    WORLD_ENTITY_DATA_PATH,
    TANKS_DATA_JSON_NAME
  );
  const worldEntityDataConverter = new WorldEntityDataConverter();

  const tanksData = await worldEntityDataLoader.getTanksData();
  const tankData = worldEntityDataConverter.tankDataToModel(tanksData[1]);
  const tankTurretData = tankData.getTurretData();

  const turret = tankTurretBuilder
    .setPosition(new Vector2(165, 150))
    .setSpriteComponent(
      actorSpriteComponentBuilder
        .setSpriteSheetName(tankTurretData.getSpriteData().getSheetName())
        .setSize(tankTurretData.getSpriteData().getSize())
        .setSource(tankTurretData.getSpriteData().getSource())
        .setOrigin(tankTurretData.getSpriteData().getOrigin())
        .build()
    )
    .build();

  const tank = tankBuilder
    .setPosition(new Vector2(150, 150))
    .setSpriteComponent(
      actorSpriteComponentBuilder
        .setSpriteSheetName(tankData.getSpriteData().getSheetName())
        .setSize(tankData.getSpriteData().getSize())
        .setSource(tankData.getSpriteData().getSource())
        .setOrigin(tankData.getSpriteData().getOrigin())
        .build()
    )
    .setTurret(turret)
    .build();

  tank.setAccelerationComponent(
    actorAccelerationComponentBuilder.setMass(10000).build(tank)
  );

  const camera = new Camera(new Vector2(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT));
  camera.lookAt(tank);

  const menuScene = new MenuScene(camera);
  const worldScene = new WorldScene(camera);
  worldScene.addActor(tank);
  worldScene.addActor(turret);

  const eventManager = new EventManager(window);
  const inputKeyHandler = new InputKeyHandler();
  const mouseHandler = new MouseHandler(worldScene.getCamera());

  eventManager.onMouseMove(mouseHandler.onMouseMove.bind(mouseHandler));
  eventManager.onKeyDown(inputKeyHandler.onKeyDown.bind(inputKeyHandler));
  eventManager.onKeyUp(inputKeyHandler.onKeyUp.bind(inputKeyHandler));

  const resourceManager = new ResourceManager(new ImageLoader());
  await resourceManager.loadSpriteSheets([
    new SpriteSheetLoadInfo("tanks", "../assets/tanks.png"),
  ]);

  const canvasRenderer = new CanvasRenderer(canvas);
  const actorsRenderer = new ActorsRenderer(canvasRenderer, resourceManager);

  const sceneManager = new SceneManager();
  sceneManager.addScene(menuScene);
  sceneManager.addScene(worldScene);
  sceneManager.loadScene("world");

  const engine = new Engine(
    new Loop(LOOP_TIME_STEP),
    sceneManager,
    actorsRenderer,
    canvasRenderer
  );

  const tankControlling = new PlayerTankControlling(
    tank,
    inputKeyHandler,
    mouseHandler
  );
  engine.getLoop().onUpdate(tankControlling.update.bind(tankControlling));

  document.body.appendChild(canvas);
}

main();
