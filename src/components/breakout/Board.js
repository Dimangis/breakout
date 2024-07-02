import React, { useEffect, useRef } from "react";
import { BallMovement } from "./BallMovement";
import data from "../../data";
import WallCollision from "../utils/WallCollision";
import Paddle from "./Paddle";
import Brick from "./Brik";
import BrickCollision from "../utils/BrickCollision";

let bricks = [];
let { ballObj, paddleProps, brickObj } = data;

export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let newBrickSet = Brick(2, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      BallMovement(ctx, ballObj);

      WallCollision(ballObj, canvas);

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
          // player.score += 10;
        }
      }

      Paddle(ctx, canvas, paddleProps);

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
