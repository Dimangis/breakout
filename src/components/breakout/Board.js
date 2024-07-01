import React, { useEffect, useRef } from "react";
import { BallMovement } from "./BallMovement";
import data from "../../data";

export default function Board() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let { ballObj } = data;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      BallMovement(ctx, ballObj);

      if (
        ballObj.y - ballObj.rad <= 0 ||
        ballObj.y + ballObj.rad >= canvas.height
      ) {
        ballObj.dy *= -1;
      }

      if (
        ballObj.x + ballObj.rad >= canvas.width ||
        ballObj.x - ballObj.rad <= 0
      ) {
        ballObj.dx *= -1;
      }

      requestAnimationFrame(render);
    };
    render(); //обертка для многократного вызова рендера
  }, []);
  return (
    <canvas id="canvas" ref={canvasRef} height="500px" width="800px"></canvas>
  );
}
