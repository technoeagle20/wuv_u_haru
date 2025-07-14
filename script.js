// --------------------
// STAR CANVAS SETUP
// --------------------
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Generate stars
let stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,     // radius (0.3 - 1.8 px)
    o: Math.random(),                // initial opacity
    d: Math.random() * 0.02 + 0.005  // twinkle delta
  });
}

// Draw and animate stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowBlur = 5;
  ctx.shadowColor = "#ffffff";

  for (let s of stars) {
    ctx.beginPath();
    ctx.globalAlpha = s.o;
    ctx.fillStyle = "#ffffff";
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    // Twinkle effect
    s.o += s.d;
    if (s.o <= 0.1 || s.o >= 1) s.d = -s.d;
  }

  requestAnimationFrame(drawStars);
}
drawStars();


// --------------------
// FLIPBOOK LOGIC
// --------------------
let musicPlayed = false;

// Flip the cover page
function flipCover(el) {
  el.classList.toggle('flipped');

  // Set z-index after animation
  if (el.classList.contains('flipped')) {
    setTimeout(() => {
      el.style.zIndex = "0";
    }, 1000); // match transition time
  } else {
    el.style.zIndex = "121";
  }

  // Play background music once
  if (!musicPlayed) {
    const music = document.getElementById('bg-music');
    music.volume = 0.6;
    music.play().catch(() => {
      console.log("Music autoplay was blocked. Tap again.");
    });
    musicPlayed = true;
  }
}

// Flip any other page
function flipPage(el) {
  el.classList.toggle('flipped');
}
