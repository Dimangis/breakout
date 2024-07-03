import React, { useEffect, useRef } from "react";
import { BallMovement } from "./BallMovement";
import data from "../../data";
import WallCollision from "../utils/WallCollision";
import Paddle from "./Paddle";
import Brick from "./Brik";
import BrickCollision from "../utils/BrickCollision";
import PaddleHit from "../utils/PaddelHit";
import PlayerStats from "./PlayerStats";
import AllBroken from "../utils/AllBroke";
import ResetBall from "../utils/ResetBall";

let bricks = [];
let { ballObj, paddleProps, brickObj, player } = data;

export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      paddleProps.y = canvas.height - 20;

      let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      PlayerStats(ctx, player, canvas);

      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      BallMovement(ctx, ballObj);

      AllBroken(bricks, player, canvas, ballObj);

      if (player.lives === 0) {
        alert("Game Over! Press ok to restart");

        player.lives = 5;
        player.level = 1;
        player.score = 0;
        brickObj.y = 50;
        ResetBall(ballObj, canvas, paddleProps);
        bricks.length = 0;
      }

      WallCollision(ballObj, canvas, player, paddleProps);

      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          player.score += 10;
        }
      }

      Paddle(ctx, canvas, paddleProps);

      //Panel + Ball collision
      PaddleHit(ballObj, paddleProps);

      requestAnimationFrame(render);
    };
    render(); //обертка для многократного вызова рендера
  }, []);
  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseMove={
        (event) => (paddleProps.x = event.clientX - paddleProps.width / 2 - 10) //центрируем платформу относительно курсора
      }
      height={window.innerHeight - 20}
      width={window.innerWidth - 20}
    ></canvas>
  );
}
