import "./styles/styles.css";

import Tank from "./js/Tank";
import Camera from "./js/Camera";
import Rectangle from "./js/Rectangle";
import Sat from "./js/Sat";

const canvasElem = document.createElement("canvas");
canvasElem.width = window.innerWidth;
canvasElem.height = window.innerHeight;

const ctx = canvasElem.getContext("2d");
ctx.imageSmoothingEnabled = false;

const images = [
  {
    name: "основание",
    src: "../assets/tank_1/1.png",
  },
  {
    name: "двигатель_трансмиссия",
    src: "../assets/tank_1/2.png",
  },
  {
    name: "боезапас",
    src: "../assets/tank_1/3.png",
  },
  {
    name: "механизм_башни",
    src: "../assets/tank_1/4.png",
  },
  {
    name: "крышка",
    src: "../assets/tank_1/5.png",
  },
  {
    name: "turret",
    src: "../assets/tank_1/6.png",
  },
  {
    name: "shell_1",
    src: "../assets/shells/1.png",
  },
  {
    name: "shell_2",
    src: "../assets/shells/2.png",
  },
];

// Примерный вид информации о танке (Будет использоваться JSON)
const tank_1_data = {
  w: 66,
  h: 33,
  turret: {
    w: 56,
    h: 19,
  },
  details: [
    { imgName: "основание", x: 0, y: 0, w: 66, h: 33 },
    { imgName: "двигатель_трансмиссия", x: -1, y: 7, w: 61, h: 19 },
    { imgName: "боезапас", x: 19, y: 10, w: 7, h: 13 },
    { imgName: "механизм_башни", x: 29, y: 10, w: 13, h: 13 },
    { imgName: "крышка", x: 1, y: 7, w: 64, h: 19 },
  ],
};

const loadedImages = {};

const tanks = [];
const shells = [];
const camera = new Camera(canvasElem.width, canvasElem.height);

function loadResources() {
  let alreadyLoaded = 0;

  return new Promise((resolve) => {
    for (const img of images) {
      const image = new Image();
      image.src = img.src;

      image.onload = () => {
        loadedImages[img.name] = image;

        alreadyLoaded++;
        if (alreadyLoaded >= images.length) {
          resolve();
        }
      };
    }
  });
}

let lastDt = Date.now();

function loop() {
  const dt = Date.now() - lastDt;
  lastDt = Date.now();

  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);

  ctx.save();
  ctx.scale(camera.zoom, camera.zoom);
  const cameraPosition = camera.getPosition();
  ctx.translate(-cameraPosition.x, -cameraPosition.y);

  ctx.fillStyle = "#516952";
  ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

  for (const tank of tanks) {
    tank.update(dt);
    tank.render(ctx, loadedImages);
  }

  camera.update(dt);
  ctx.restore();

  requestAnimationFrame(loop);
}

async function start() {
  await loadResources();

  const tank = new Tank(true);
  tank.setSize(tank_1_data.w, tank_1_data.h);
  tank.setPosition(250, 250);
  tank.setDetails(tank_1_data.details);

  tank.getTurret().setSize(tank_1_data.turret.w, tank_1_data.turret.h);

  //camera.lookAt(tank);
  tanks.push(tank);

  document.body.appendChild(canvasElem);

  requestAnimationFrame(loop);
}

start();
