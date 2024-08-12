// React
import { useRef, useEffect, CSSProperties } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
};

const ANIMATION_MIN_SPEED = 5;
const ANIMATION_MAX_SPEED = 30;

/**
 * Generate some stars coordinates randomly
 * @param {number} nbStars - the number of stars to generate
 * @param {number} canvasWidth - the computed width of the rendered canvas HTML element
 * @param {number} canvasHeight - the computed height of the rendered canvas HTML element
 */
function generateStars(
  nbStars: number,
  canvasWidth: number,
  canvasHeight: number,
): Star[] {
  const stars = [];
  for (let i = 0; i < nbStars; i++) {
    const star = {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      z: Math.random() * canvasWidth,
    };
    stars.push(star);
  }

  return stars;
}

/**
 * Draw a circle representing a star
 * @param {number} starx - the x coordinate of the circle
 * @param {number} stary - the y coordinate of the circle
 * @param {CanvasRenderingContext} canvasContext - the canvas 2d context to be able to manipulate and draw element inside the canvas
 */
function drawCircle(
  starx: number,
  stary: number,
  starRadius: number,
  canvasContext: CanvasRenderingContext2D,
) {
  canvasContext.beginPath();
  canvasContext.arc(starx, stary, starRadius, 0, 2 * Math.PI, false);
  canvasContext.fillStyle = "#fff";
  canvasContext.fill();
  canvasContext.closePath();
}

/**
 * Draw the stars into the canvas
 * @param {Star[]} stars - the list of stars to draw
 * @param {number} canvasWidth - the computed width of the rendered canvas HTML element
 * @param {number} canvasHeight - the computed height of the rendered canvas HTML element
 * @param {Point} canvasCenter - the point { x, y, z } representing the center of the canvas
 * @param {number} focalLength - the length of the focal for the fake 3d effect
 * @param {CanvasRenderingContext} canvasContext - the canvas 2d context to be able to manipulate and draw element inside the canvas
 */
function drawStars(
  canvasContext: CanvasRenderingContext2D | null | undefined,
  canvasWidth: number,
  canvasHeight: number,
  canvasCenter: { x: number; y: number },
  focalLength: number,
  stars: Star[],
) {
  if (canvasContext === null || canvasContext === undefined) {
    return;
  }

  canvasContext.fillStyle = "#212121";
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
  stars.forEach((star: Star) => {
    const delta = { x: star.x - canvasCenter.x, y: star.y - canvasCenter.y };
    const x = (delta.x * focalLength) / star.z + canvasCenter.x;
    const y = delta.y * (focalLength / star.z) + canvasCenter.y;
    const radius = 0.5 * (focalLength / star.z);

    // start drawing
    if (x > 0 && x < canvasWidth && y > 0 && y < canvasHeight) {
      drawCircle(x, y, radius, canvasContext);
    }
  });
}

/**
 * Animate one frame of the hyperspace effect
 * @param {Star[]} stars - the list of stars drawed into the canvas
 * @param {number} speed - the current speed of the animation
 * @param {number} canvasWidth - the computed width of the rendered canvas HTML element
 */
function animateStars(stars: Star[], speed: number, canvasWidth: number) {
  stars.forEach((star) => {
    star.z -= speed;

    if (star.z <= 0) {
      star.z = canvasWidth;
    }
  });
}

type SpaceProps = {
  className?: string;
  isHyperSpace?: boolean;
  style?: CSSProperties;
};

export function Space({
  className = "",
  isHyperSpace = false,
  style,
}: SpaceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let speed = ANIMATION_MIN_SPEED;
  const generatedStars = useRef<Star[]>([]);
  const animationId = useRef<number>(-1);

  /**
   * Draw the stars into the canvas and set the amination (id isHyperSpace = true)
   * @param {Star[]} stars - the list of stars to draw
   * @param {number} canvasWidth - the computed width of the rendered canvas HTML element
   * @param {number} canvasHeight - the computed height of the rendered canvas HTML element
   * @param {Point} canvasCenter - the point { x, y, z } representing the center of the canvas
   * @param {number} focalLength - the length of the focal for the fake 3d effect
   * @param {CanvasRenderingContext} canvasContext - the canvas 2d context to be able to manipulate and draw element inside the canvas
   */
  const draw = (
    stars: Star[],
    canvasWidth: number,
    canvasHeight: number,
    canvasCenter: { x: number; y: number },
    focalLength: number,
    canvasContext: CanvasRenderingContext2D | null | undefined,
  ) => {
    if (canvasContext === null || canvasContext === undefined) {
      return;
    }
    if (!isHyperSpace) {
      window.cancelAnimationFrame(animationId.current);
    }

    if (isHyperSpace && speed < ANIMATION_MAX_SPEED) {
      speed += 1;
    }
    drawStars(
      canvasContext,
      canvasWidth,
      canvasHeight,
      canvasCenter,
      focalLength,
      stars,
    );
    if (isHyperSpace) {
      animateStars(stars, speed, canvasWidth);
      animationId.current = window.requestAnimationFrame(() => {
        draw(
          stars,
          canvasWidth,
          canvasHeight,
          canvasCenter,
          focalLength,
          canvasContext,
        );
      });
    }
  };

  useEffect(() => {
    // Init / Draw / Generate stars / Aminate the canvas.
    const parent = canvasRef.current?.parentNode as HTMLElement;
    let canvasHeight = parent?.offsetHeight ?? 0;
    let canvasWidth = parent?.offsetWidth ?? 0;
    const canvasContext = canvasRef.current?.getContext("2d");
    // @ts-expect-error: the ref is always defined here because the component is mounted
    canvasRef.current.width = canvasWidth;
    // @ts-expect-error: the ref is always defined here because the component is mounted
    canvasRef.current.height = canvasHeight;
    const nbStars = canvasWidth;
    const focalLength = canvasWidth;
    const canvasCenter = { x: canvasWidth / 2, y: canvasHeight / 2 };

    if (generatedStars.current.length === 0) {
      generatedStars.current = generateStars(
        nbStars,
        canvasWidth,
        canvasHeight,
      );
    }

    draw(
      generatedStars.current,
      canvasWidth,
      canvasHeight,
      canvasCenter,
      focalLength,
      canvasContext,
    );

    window.addEventListener("resize", () => {
      canvasHeight = parent?.offsetHeight ?? 0;
      canvasWidth = parent?.offsetWidth ?? 0;
      // @ts-expect-error: the ref is always defined here because the component is mounted
      canvasRef.current.width = canvasWidth;
      // @ts-expect-error: the ref is always defined here because the component is mounted
      canvasRef.current.height = canvasHeight;
      generatedStars.current = generateStars(
        nbStars,
        canvasWidth,
        canvasHeight,
      );
      draw(
        generatedStars.current,
        canvasWidth,
        canvasHeight,
        canvasCenter,
        focalLength,
        canvasContext,
      );
    });
  }, [isHyperSpace]);

  return <canvas ref={canvasRef} className={className} style={style} />;
}
