const canvas = document.createElement("canvas");
const borderWidth = 4;

function resizeCanvas() {
    canvas.width = window.innerWidth - borderWidth;
    canvas.height = 400;
}

canvas.id = "GameCanvas";
canvas.style.cssText = `
    border: 2px solid #000;
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
`;

document.body.style.margin = "0";
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// Audio Context Setup
let audioContext;
let masterGainNode;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGainNode = audioContext.createGain();
        masterGainNode.gain.value = 0.3; // Master volume
        masterGainNode.connect(audioContext.destination);
    }
}

function playJumpSound() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function playCoinSound() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
}

function playPowerupSound() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function playHitSound() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.4);

    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
}

function playPauseSound() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function playUnpauseSound() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function playGameOverMelody() {
    if (!audioContext) return;

    const notes = [
        { freq: 300, start: 0, duration: 0.4 },
        { freq: 250, start: 0.4, duration: 0.4 },
        { freq: 200, start: 0.8, duration: 0.4 },
        { freq: 150, start: 1.2, duration: 0.8 }
    ];

    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(masterGainNode);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.start);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.start);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + note.start + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.start + note.duration);

        oscillator.start(audioContext.currentTime + note.start);
        oscillator.stop(audioContext.currentTime + note.start + note.duration);
    });
}

// Declare variables before event listeners to avoid TDZ
let isTabActive = true;
let isPaused = false;
let gameOver = false;

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        isTabActive = false;
        if (!gameOver && !isPaused) {
            isPaused = true; // Pause when tab is hidden
            if (audioContext) playPauseSound();
        }
    } else {
        isTabActive = true; // Set active but don't unpause
    }
});
document.addEventListener("blur", () => {
    if (!gameOver && !isPaused) {
        isPaused = true; // Pause on blur
        if (audioContext) playPauseSound();
    }
    isTabActive = false;
});
document.addEventListener("focus", () => {
    isTabActive = true; // Set active but don't unpause
});

const startPositionX = 100;
let isJumping = false;
let isCrouching = false;
let jumpVelocity = 0;
let dinoY = 300;
const gravity = 1000;
const jumpStrength = -350;
let score = 0;
let gameSpeed = 200;

// Powerup system
let scoreMultiplier = 1;
let powerupEndTime = 0;
const powerupDuration = 5000; // 5 seconds in milliseconds

let animationFrame = 0;
let animationTimer = 0;
const animationSpeed = 0.15;
let bobOffset = 0;

resizeCanvas();
dinoY = canvas.height - 100;

const obstacleTemplates = {
    cactus: { name: "cactus", width: 20, height: 40, color: "#228B22", isHazard: true, groundOffset: 0, shape: "rectangle" },
    rock: { name: "rock", width: 25, height: 25, color: "#8B4513", isHazard: true, groundOffset: 0, shape: "rectangle" },
    bird: { name: "bird", width: 30, height: 15, color: "#4169E1", isHazard: true, groundOffset: -30, shape: "ellipse" },
    coin: { name: "coin", width: 15, height: 15, color: "#FFD700", isHazard: false, groundOffset: -20, shape: "circle" },
    powerup: { name: "powerup", width: 20, height: 20, color: "#FF69B4", isHazard: false, groundOffset: -10, shape: "rectangle" }
};

let obstacles = [];
let lastObstacleSpawn = 0;
const minObstacleDistance = 400;
const maxObstacleDistance = 800;
let highScore = 0;
let gameOverProcessed = false;
let gameOverTime = 0;
let canRestart = false;
const restartDelay = 3000;

function loadHighScore() {
    const saved = localStorage.getItem('dinoHighScore');
    return saved ? parseInt(saved) : 0;
}

function saveHighScore(score) {
    const currentHigh = loadHighScore();
    if (score > currentHigh) {
        localStorage.setItem('dinoHighScore', score.toString());
        return true;
    }
    return false;
}

highScore = loadHighScore();

document.addEventListener("keydown", (e) => {
    // Initialize audio context on first user interaction
    if (!audioContext) {
        initAudioContext();
    }

    if (e.code === "Space" && !isJumping && !gameOver && !isCrouching && !isPaused) {
        isJumping = true;
        jumpVelocity = jumpStrength;
        playJumpSound();
    }
    if (e.code === "KeyC" && !gameOver && !isJumping && !isPaused) {
        isCrouching = true;
    }
    if (e.code === "Space" && gameOver && canRestart) {
        gameOver = false;
        gameOverProcessed = false;
        score = 0;
        gameSpeed = 200;
        obstacles = [];
        lastObstacleSpawn = 0;
        dinoY = canvas.height - 100;
        isJumping = false;
        jumpVelocity = 0;
        isCrouching = false;
        animationFrame = 0;
        animationTimer = 0;
        bobOffset = 0;
        // Reset powerup
        scoreMultiplier = 1;
        powerupEndTime = 0;
    }
    if ((e.code === "Space" || e.code === "Escape") && isPaused && isTabActive) {
        isPaused = false; // Resume on Space or Escape
        playUnpauseSound();
    } else if (e.code === "Escape" && !gameOver && !isPaused) {
        isPaused = true; // Pause on Escape
        playPauseSound();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "KeyC") {
        isCrouching = false;
    }
});

function checkCollision(dino, obstacle) {
    const padding = 5;
    const dinoRect = {
        x: dino.x + padding,
        y: dino.y + padding,
        width: dino.width - (padding * 2),
        height: dino.height - (padding * 2)
    };
    const obstacleRect = {
        x: obstacle.x + padding,
        y: obstacle.y + padding,
        width: obstacle.width - (padding * 2),
        height: obstacle.height - (padding * 2)
    };
    return dinoRect.x < obstacleRect.x + obstacleRect.width &&
        dinoRect.x + dinoRect.width > obstacleRect.x &&
        dinoRect.y < obstacleRect.y + obstacleRect.height &&
        dinoRect.y + dinoRect.height > obstacleRect.y;
}

function getAvailableObstacles() {
    const stage = Math.floor(score / 500);
    const maxStage = 5;
    const currentStage = Math.min(stage, maxStage);
    const stageObstacles = [
        ["cactus", "rock", "coin"],
        ["cactus", "rock", "coin", "powerup"],
        ["cactus", "rock", "coin", "powerup"],
        ["cactus", "rock", "coin", "powerup", "bird"],
        ["cactus", "rock", "coin", "powerup", "bird"],
        ["cactus", "rock", "coin", "powerup", "bird"]
    ];
    return stageObstacles[currentStage] || stageObstacles[maxStage];
}

function getSpawnMultiplier() {
    const stage = Math.floor(score / 500);
    return Math.min(1 + (stage * 0.3), 3);
}

function spawnObstacle(x) {
    const availableObstacles = getAvailableObstacles();
    const randomTemplate = availableObstacles[Math.floor(Math.random() * availableObstacles.length)];
    const template = obstacleTemplates[randomTemplate];
    const groundLevel = canvas.height - 50;
    const obstacle = {
        ...template,
        x: x,
        y: groundLevel - template.height + template.groundOffset,
        id: Date.now() + Math.random()
    };
    obstacles.push(obstacle);
    const spawnMultiplier = getSpawnMultiplier();
    if (Math.random() < (spawnMultiplier - 1) / 3 && obstacles.length < 8) {
        const safeSpacing = 200 + Math.random() * 150;
        setTimeout(() => {
            if (!gameOver && !isPaused) { // Check isPaused in spawn
                spawnObstacle(x + safeSpacing);
            }
        }, 0);
    }
}

function drawObstacle(obstacle) {
    ctx.fillStyle = obstacle.color;
    switch (obstacle.shape) {
        case "rectangle":
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            break;
        case "circle":
            ctx.beginPath();
            ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, obstacle.width / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
        case "ellipse":
            ctx.beginPath();
            ctx.ellipse(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, obstacle.width / 2, obstacle.height / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.fillText(obstacle.name, obstacle.x, obstacle.y - 5);
}

function drawAnimatedDino(x, y, width, height) {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x, y, width, height);
    ctx.fillRect(x + width - 20, y - 10, 15, 15);
    ctx.fillStyle = "#000";
    ctx.fillRect(x + width - 10, y - 5, 3, 3);
    ctx.fillStyle = "#8B4513";
    const tailBob = animationFrame === 0 ? 0 : 1;
    ctx.fillRect(x - 10, y + 10 + tailBob, 15, 8);
    if (!isJumping && !gameOver) {
        ctx.fillStyle = "#654321";
        if (animationFrame === 0) {
            ctx.fillRect(x + 8, y + height, 7, 14);
            ctx.fillRect(x + width - 15, y + height + 4, 6, 8);
        } else {
            ctx.fillRect(x + 8, y + height + 4, 6, 8);
            ctx.fillRect(x + width - 15, y + height, 7, 14);
        }
    } else if (!isJumping) {
        ctx.fillStyle = "#654321";
        ctx.fillRect(x + 8, y + height, 6, 10);
        ctx.fillRect(x + width - 15, y + height, 6, 10);
    }
}

function start() {
    const dino = new Image();
    dino.src = "dino.png";
    const background = new Image();
    background.src = "clouds.jpg";
    let lastTime = performance.now();

    function update(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime; // Always update lastTime to prevent fast-forward on resume

        if (isPaused && !gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            const shake = Math.sin(currentTime * 0.01) * 2;
            ctx.translate(shake, 0);
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFF";
            ctx.shadowColor = "#FFD700";
            ctx.shadowBlur = 5;
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Paused - Press Space or Esc to Resume", canvas.width / 2, canvas.height / 2);
            ctx.shadowBlur = 0;
            ctx.textAlign = "left";
            ctx.restore();
            requestAnimationFrame(update);
            return;
        }

        if (gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (!gameOverProcessed) {
                const finalScore = Math.floor(score);
                const isNewRecord = saveHighScore(finalScore);
                highScore = loadHighScore();
                gameOverProcessed = true;
                playGameOverMelody();
            }
            if (currentTime - gameOverTime >= restartDelay) {
                canRestart = true;
            }
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const finalScore = Math.floor(score);
            if (finalScore >= highScore) {
                ctx.fillStyle = "#FFD700";
                ctx.font = "24px Arial";
                ctx.textAlign = "center";
                ctx.fillText("🎉 NEW HIGH SCORE! 🎉", canvas.width / 2, canvas.height / 2 - 60);
            }
            ctx.fillStyle = "#FFF";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "16px Arial";
            ctx.fillText(`Score: ${finalScore}`, canvas.width / 2, canvas.height / 2 + 10);
            ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 30);
            if (!canRestart) {
                const timeLeft = Math.max(0, restartDelay - (currentTime - gameOverTime));
                const secondsLeft = Math.ceil(timeLeft / 1000);
                ctx.fillText(`Wait ${secondsLeft} second${secondsLeft > 1 ? 's' : ''} to restart...`, canvas.width / 2, canvas.height / 2 + 60);
            } else {
                ctx.fillText("Press Space to Restart", canvas.width / 2, canvas.height / 2 + 60);
            }
            ctx.textAlign = "left";
            requestAnimationFrame(update);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isPaused) {
            // Update powerup state
            const currentTime = performance.now();
            if (powerupEndTime > 0 && currentTime >= powerupEndTime) {
                scoreMultiplier = 1;
                powerupEndTime = 0;
            }

            if (!isJumping) {
                animationTimer += deltaTime;
                if (animationTimer >= animationSpeed) {
                    animationFrame = (animationFrame + 1) % 2;
                    animationTimer = 0;
                }
                bobOffset = animationFrame === 0 ? -4 : 0;
            } else {
                bobOffset = 0;
            }

            score += gameSpeed * deltaTime / 10 * scoreMultiplier;
            const maxSpeed = 800;
            gameSpeed = Math.min(gameSpeed + 2 * deltaTime, maxSpeed);

            if (isJumping && !isCrouching) {
                dinoY += jumpVelocity * deltaTime;
                jumpVelocity += gravity * deltaTime;
                if (dinoY >= canvas.height - 100) {
                    dinoY = canvas.height - 100;
                    isJumping = false;
                    jumpVelocity = 0;
                }
            }

            const dinoHeight = isCrouching && !isJumping ? 25 : 50;
            const dinoRenderY = (isCrouching && !isJumping ? canvas.height - 75 : dinoY) + bobOffset;

            if (obstacles.length === 0 ||
                (canvas.width - obstacles[obstacles.length - 1].x) >
                (minObstacleDistance + Math.random() * (maxObstacleDistance - minObstacleDistance))) {
                spawnObstacle(canvas.width + 50);
            }

            for (let i = obstacles.length - 1; i >= 0; i--) {
                const obstacle = obstacles[i];
                obstacle.x -= gameSpeed * deltaTime;
                if (obstacle.x + obstacle.width < 0) {
                    obstacles.splice(i, 1);
                    continue;
                }
                const dinoRect = {
                    x: startPositionX,
                    y: (isCrouching && !isJumping ? canvas.height - 75 : dinoY) + bobOffset,
                    width: 50,
                    height: isCrouching && !isJumping ? 25 : 50
                };
                if (checkCollision(dinoRect, obstacle)) {
                    console.log(`Collision detected with: ${obstacle.name}, isHazard: ${obstacle.isHazard}`);
                    if (obstacle.isHazard) {
                        console.log(`GAME OVER - Hit hazard: ${obstacle.name}`);
                        gameOver = true;
                        gameOverTime = performance.now();
                        canRestart = false;
                        playHitSound();
                        break;
                    } else {
                        console.log(`Collected: ${obstacle.name}`);
                        obstacles.splice(i, 1);

                        // Handle different collectibles
                        if (obstacle.name === 'coin') {
                            score += 50 * scoreMultiplier;
                            playCoinSound();
                        } else if (obstacle.name === 'powerup') {
                            // Activate or extend powerup
                            const currentTime = performance.now();
                            scoreMultiplier = 2;

                            // If already active, extend the time, otherwise start fresh
                            if (powerupEndTime > currentTime) {
                                powerupEndTime += powerupDuration; // Add 5 more seconds
                            } else {
                                powerupEndTime = currentTime + powerupDuration; // Start 5 second timer
                            }

                            playPowerupSound();
                        }
                    }
                }
            }

            ctx.fillStyle = "#87CEEB";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (background.complete && background.naturalWidth > 0) {
                const bgWidth = background.naturalWidth;
                const bgHeight = background.naturalHeight;
                let baseScale = 1;
                if (bgWidth > 300) baseScale = 300 / bgWidth;
                if (bgHeight > 300) baseScale = Math.min(baseScale, 300 / bgHeight);
                const baseWidth = bgWidth * baseScale;
                const baseHeight = bgHeight * baseScale;
                const cloudSpacing = baseWidth * 0.8;
                for (let x = -baseWidth; x < canvas.width + baseWidth; x += cloudSpacing) {
                    for (let yBase = -baseHeight; yBase < canvas.height + baseHeight; yBase += baseHeight * 1.5) {
                        const seed = Math.floor(x / cloudSpacing) * 1000 + Math.floor(yBase / (baseHeight * 1.5));
                        const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
                        const random2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280;
                        const random3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280;
                        const randomScale = 0.7 + (random1 * 0.6);
                        const finalWidth = baseWidth * randomScale;
                        const finalHeight = baseHeight * randomScale;
                        const randomY = yBase + (random2 - 0.5) * 100;
                        const randomX = x + (random3 - 0.5) * 60;
                        if (randomX + finalWidth > 0 && randomX < canvas.width &&
                            randomY + finalHeight > 0 && randomY < canvas.height) {
                            ctx.drawImage(background, randomX, randomY, finalWidth, finalHeight);
                        }
                    }
                }
            }

            if (dino.complete && dino.naturalWidth > 0) {
                ctx.drawImage(dino, startPositionX, dinoRenderY, 50, dinoHeight);
            } else {
                drawAnimatedDino(startPositionX, dinoRenderY, 50, dinoHeight);
            }

            ctx.fillStyle = "#8B4513";
            ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
            obstacles.forEach(drawObstacle);
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.fillText(`Score: ${Math.floor(score)}`, 10, 30);
            ctx.fillText(`High: ${highScore}`, 10, 55);
            ctx.fillText(`Speed: ${Math.floor(gameSpeed)}`, 10, 80);
            const currentStage = Math.floor(score / 500);
            ctx.fillText(`Stage: ${currentStage}`, 10, 105);

            ctx.font = "15.75px Arial";
            ctx.fillText("Space: Jump | C: Crouch | Esc: Pause", 10, canvas.height - 25.75);

            // Draw powerup indicator near the controls
            if (scoreMultiplier > 1 && powerupEndTime > 0) {
                const currentTime = performance.now();
                const timeLeft = Math.max(0, powerupEndTime - currentTime) / 1000;

                ctx.fillStyle = "#FF1493";
                ctx.font = "bold 11px Arial";
                ctx.fillText(`🚀 ${scoreMultiplier}x BOOST - ${timeLeft.toFixed(1)}s`, 10, canvas.height - 10);
            }
        }

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

start();
