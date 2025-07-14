// Set up canvas for stars
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Star setup
let stars = [];
for (let i = 0; i < 40; i++) {

  stars.push({
    x: Math.random() * (canvas.width - 200) + 100,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1.5, // radius
    o: Math.random() * 0.5 + 0.5, // opacity
    d: Math.random() * 0.015 + 0.01 // sparkle speed
  });
}

// Draw stars and connecting lines
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowBlur = 4;
  ctx.shadowColor = "#ffffff";

  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];

    // Draw star
    ctx.beginPath();
    ctx.globalAlpha = s.o;
    ctx.fillStyle = "#ffffff";
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    // Twinkle animation
    s.o += s.d;
    if (s.o <= 0.5 || s.o >= 1) s.d = -s.d;

    // Draw lines to nearby stars
    for (let j = i + 1; j < stars.length; j++) {
      let t = stars[j];
      let dx = s.x - t.x;
      let dy = s.y - t.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 150})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawStars);
}

drawStars();

// Flip book cover
let musicPlayed = false;

function flipCover(el) {
  el.classList.toggle('flipped');

  if (el.classList.contains('flipped')) {
    setTimeout(() => {
      el.style.zIndex = "0";
    }, 1000); // Wait until flip ends
  } else {
    el.style.zIndex = "121";
  }

  if (!musicPlayed) {
    const music = document.getElementById('bg-music');
    music.volume = 0.6;
    music.play().catch(() => {
      console.log("Music blocked. Tap again.");
    });
    musicPlayed = true;
  }
}

// Flip regular pages
function flipPage(el) {
  el.classList.toggle('flipped');
}