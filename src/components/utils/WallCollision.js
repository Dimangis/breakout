export default function WallCollision(ballObj, canvas, player) {
  // Логика отскакивания от стен
  if (ballObj.y + ballObj.rad >= canvas.height) {
    player.lives--;
    ballObj.dy *= -1;
  }
  if (
    ballObj.y - ballObj.rad <=
    0
    // ballObj.y + ballObj.rad >= canvas.height
  ) {
    ballObj.dy *= -1;
  }

  if (ballObj.x - ballObj.rad <= 0 || ballObj.x + ballObj.rad >= canvas.width) {
    ballObj.dx *= -1;
  }
}
