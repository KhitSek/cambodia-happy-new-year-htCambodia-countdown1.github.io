const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.x, this.y, this.colors));
    }
  }

  update() {
    this.particles.forEach(particle => particle.update());
  }

  draw() {
    this.particles.forEach(particle => particle.draw());
  }
}

class Particle {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 20 + 2;
    this.gravity = 0.05;
    this.opacity = 1;
    
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.speed *= 0.98; // Slow down over time
    this.opacity -= 0.02;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

const fireworks = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const colors = ['255, 0, 0', '0, 255, 0', '0, 0, 255', '255, 255, 0', '255, 0, 255', '0, 255, 255'];
  fireworks.push(new Firework(x, y, colors));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.particles[0].opacity <= 0) {
      fireworks.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}


setInterval(createFirework, 500);
animate();