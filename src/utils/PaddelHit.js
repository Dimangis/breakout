export default function PaddleHit(ballObj, paddleProps) {
  if (
    ballObj.x < paddleProps.x + paddleProps.width &&
    ballObj.x > paddleProps.x &&
    paddleProps.y < paddleProps.y + paddleProps.height &&
    ballObj.y + ballObj.rad > paddleProps.y - paddleProps.height / 2
  ) {
    //Смотрим в какой части мячик ударяется о платформу игрока
    let collidePoint = ballObj.x - (paddleProps.x + paddleProps.width / 2);
    //Нормализуем значение
    collidePoint = collidePoint / (paddleProps.width / 2);
    //Вычисляем угол
    let angle = (collidePoint * Math.PI) / 3;
    console.log(angle);

    ballObj.dx = ballObj.speed * Math.sin(angle);
    ballObj.dy = -ballObj.speed * Math.cos(angle);
  }
}
