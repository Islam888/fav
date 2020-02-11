setInterval(() => changeFavicon(), 500);

function changeFavicon() {
  const random = Math.floor(Math.random() * 2);
  document
    .querySelectorAll(".favicon")[0]
    .setAttribute("href", `favicon${random}/apple-touch-icon-${random}.png`);
  document
    .querySelectorAll(".favicon")[1]
    .setAttribute("href", `favicon${random}/favicon-32x32-${random}.png`);
  document
    .querySelectorAll(".favicon")[2]
    .setAttribute("href", `favicon${random}/favicon-16x16-${random}.png`);
  /* document
    .querySelectorAll(".favicon")[3]
    .setAttribute("href", `favicon${random}/site.webmanifest`); */
    
}
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
/* c.fillStyle = "#ff1"; */
/* c.fillRect(100, 100, 200, 100); */
/* c.fillStyle = "#0f1"; */
/* c.fillRect(300, 200, 200, 100); */

/* c.beginPath();
c.moveTo(800, 300);
c.lineTo(200, 100);
c.strokeStyle = "#35ABB6";
c.stroke(); */

/* for (let i = 0; i < 1000; i++) {
const colors = ['red', 'blue', 'green', 'violet']
  var x = Math.random() * window.innerWidth
  var y = Math.random() * window.innerHeight
  c.beginPath();
  c.arc(x, y, 80, 0, Math.PI * 2, false);
  c.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
  c.stroke();
} */
let mouseObj = {
  x: null,
  y: null
};
window.addEventListener("mousemove", function(evt) {
  mouseObj.x = evt.x;
  mouseObj.y = evt.y;
  console.log(mouseObj)
  for (const circle of circles) {
    circle.moveCircles(mouseObj)
  }
  
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Circle {
  constructor(x, y, dx, dy, radius, color, maxRadius, minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.maxRadius = maxRadius;
    this.minRadius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fill();
    c.fillStyle = this.color;
  }

  update() {
    
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
   
    
    
    this.draw();

    //interactivity

    if (
      mouseObj.x - this.x < 50 &&
      mouseObj.x - this.x > -50 &&
      mouseObj.y - this.y < 50 &&
      mouseObj.y - this.y > -50
    ) {
      if (this.radius < this.maxRadius) {
        this.radius+=2;
      }
    } else {
      if (this.radius > this.minRadius) this.radius-=2;
    }

    //this.dx = this.x - 5
  }
  moveCircles(mouseObj) {
    if (mouseObj.x > window.innerWidth / 2 ) {
      this.x -= mouseObj.x / 1000;
    } else {
      this.x += mouseObj.x / 1000;
    }
    if (mouseObj.y > window.innerHeight / 2) {
      this.y -= mouseObj.y / 1000;
    } else {
      this.y += mouseObj.y / 1000;
    }
  }
}
let circles = [];
function init() {
  console.log(mouseObj)
  circles = []
  for (let i = 0; i < 5; i++) {
    let radius = 10;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    console.log(x, y)
    let dx = 0//Math.random() - 0.5;
    let dy =0//Math.random() - 0.5;

    const colors = [
      "#373854",
      "#9e379f",
      "#35abb6",
      "#e86af0",
      "#7bb3ff"
    ];
    let color = colors[Math.floor(Math.random() * 10)];
    let maxRadius = 60;
    let minRadius = 10;
    circles.push(new Circle(x, y, dx, dy, radius, color, maxRadius, minRadius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const circle of circles) {
    circle.update();
  }
}


init();
animate();

//image
//const img = document.querySelector('img')
/* const img = new Image()
img.src = './img.jpg' */
//img.setAttribute('src', img.getAttribute('data-src'))
/* if (!img.complete) {
  setTimeout(() => c.drawImage(img, 10, 10, 150, 150), 1000)
}
c.drawImage(img, 10, 10)*/

/* class Pic {
  constructor(src, x, y, width, height) {
    this.img = new Image()
    this.src = src;
    this.img.src = src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    if (!img.complete) {
      setTimeout(() => c.drawImage(this.img, this.x, this.y, this.width, this.height), 500)
      return;
    }
    c.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  update() {
    this.draw()
  }

}

const img = new Pic('./img.jpg', 50, 100, 400, 300)
const img2 = new Pic('./img.jpg', 100, 100, 400, 300)
const img3 = new Pic('./img.jpg', 300, 500, 400, 300)
const img4 = new Pic('./img.jpg', 200, 200, 400, 300)
img.update()
img2.update()
img3.update()
img4.update() */