"use strict";

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(
      this.x + v.x,
      this.y + v.y);
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    return new Vector(
      this.x - v.x,
      this.y - v.y);
  }

  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    return new Vector(this.x * n, this.y * n);
  }

  div(n) {
    return new Vector(this.x / n, this.y / n);
  }

  setAngle(angle) {
    var length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  setLength(length) {
    var angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getLengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  distanceTo(v) {
    return this.sub(v).getLength();
  }
}



/*
  -----------------------------------------------------------------
*/

const colorConfig = {
  particleOpacity: 0.99,
  baseHue: 350,
  hueRange: 9,
  hueSpeed: 0.04,
  colorSaturation: 100,
};

// A line that is part of forming the text
class Planet {
  constructor(x, y, g) {
    this.pos = new Vector(x, y);
    this.g = g;
    this.vel = 10;
  }
  draw() {
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, spikeLength);
  }

  move(force) {
    if (force) {
      this.vel.addTo(force);
    }
    if (this.vel.getLength() > spikeLength) {
      this.vel.setLength(spikeLength);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    let p2 = this.pos.add(this.vel);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}

let canvas;
let ctx;
let w, h;
let hue;
let particles;
let spikeLength;
let planets;
let A;
let B;
let a;
let b;
let tick;

function setup() {
  tick = 0;
  planets = [];
  let len = 1; //Math.round(Math.random() * 3 + 3);
  for (let i = 0; i < len; i++) {
    let p = new Planet(0, window.innerHeight / 2, 2000);
    planets.push(p);
  }
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", reset);
  canvas.addEventListener("mousemove", mousemove);
  reset();
}

function reset() {
  hue = parameterVM.baseHue();
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  spikeLength = w * parameterVM.widthToSpikeLengthRatio();
  A = w / 2.2;
  B = h / 2.2;
  a = Math.round(Math.random() + 2);
  b = Math.round(Math.random() + 2);
  drawText();
}

function mousemove(event) {
  let x = event.clientX;
  let y = event.clientY;
  planets[0].pos.x = x;
  planets[0].pos.y = y;
}

function draw() {
  clear();
  requestAnimationFrame(draw);
  updateParticles();
  updatePlanets();
  tick++;
}

function clear() {
  ctx.clearRect(0, 0, w, h);
}


function reduceParticleSum() {
  var foo = new Array();
  for (var i = 0; i < particles.length; i++) {
    if (i % 2 === 0) {
      foo.push(particles[i]);
    }
  }
  particles = foo;

  return particles.length;
}

var textX, textY;

function drawText() {
  ctx.save();
  //let fontSize = w * 0.2;
  console.log(parameterVM.getFont());
  ctx.font = parameterVM.getFont();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = parameterVM.lineWidth();
  ctx.strokeStyle = "white";
  ctx.strokeText(parameterVM.text(), w / 2, h / 2);
    textX = w / 2;
    textY = h / 2;
  ctx.restore();
  let imageData = ctx.getImageData(0, 0, w, h);

  particles = [];

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let i = (x + w * y) * 4;
      let average = (imageData.data[i] +
        imageData.data[i + 1] +
        imageData.data[i + 2] +
        imageData.data[i + 3]) / 4;
      if (average > 200) {
        let particle = new Particle(x, y);
        particles.push(particle);
      }
    }
  }
  parameterVM.particlesLength(particles.length);
  clear();
}

function updatePlanets() {
  let len = planets.length;
  for (let i = 1; i < len; i++) {
    //    let angle = Math.PI * 2 / (len - 1) * i;
    //    let x = A * Math.sin(a * tick / 100 + angle) + w / 2;
    //    let y = B * Math.sin(b * tick / 100 + angle) + h / 2;

    let p = planets[i];

    p.pos.x += p.vel;

    if (p.pos.x >= window.innerWidth) {
      p.vel = -p.vel;
    } else if (p.pos.x <= 0) {
      p.vel = -p.vel;
      console.log(p.vel);
    }
    //p.pos.y = y;
    p.draw();
  }
}

function updateParticles() {
  hue += parameterVM.hueSpeed();
  let h = Math.sin(hue) * parameterVM.hueRange() + parameterVM.baseHue();
  ctx.strokeStyle = `hsla(${h}, ${parameterVM.colorSaturation()}%, 50%, ${parameterVM.particleOpacity()})`;
  particles.forEach(p => {
    // Apply the force of each planet (repeller) to the current particle
    planets.forEach(planet => {
      let d = p.pos.sub(planet.pos);
      let length = d.getLength();
      let g = planet.g / length;
      if (g > 40) {
        g = 40;
      }
      // We keep the angle of the distance
      d.setLength(g);
      p.move(d);
    });
    p.draw();
  });
    
    ctx.fillStyle = `hsla(${h}, ${parameterVM.colorSaturation()}%, 50%, ${parameterVM.textOpacity()})`;
    
    ctx.font = parameterVM.getFont();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = parameterVM.lineWidth();
    //ctx.fillStyle = "white";
    ctx.fillText(parameterVM.text(), textX, textY);
    
    
    
}

setup();
draw();












