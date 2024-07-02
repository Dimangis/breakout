import React, { useEffect, useRef } from "react";
import { BallMovement } from "./BallMovement";
import data from "../../data";
import WallCollision from "../utils/WallCollision";
import Paddle from "./Paddle";
let { ballObj, paddleProps } = data;
export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      BallMovement(ctx, ballObj);

      WallCollision(ballObj, canvas);

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
      height="500px"
      width="800px"
    ></canvas>
  );
}
