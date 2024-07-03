export default function WallCollision(ballObj, canvas, player, paddleProps) {
  if (ballObj.y + ballObj.rad > canvas.height) {
    player.lives--;
    ballObj.x = paddleProps.x + paddleProps.width / 2;
    ballObj.y = paddleProps.y - 20;
    ballObj.dx = 6 * (Math.random() * 2 - 1);
    ballObj.dy = -6;
  }
  if (ballObj.y - ballObj.rad < 0) {
    ballObj.dy *= -1;
  }

  if (ballObj.x + ballObj.rad > canvas.width || ballObj.x - ballObj.rad < 0) {
    ballObj.dx *= -1;
  }
}
