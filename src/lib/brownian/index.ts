import { getPositiveModulo } from "$lib/util/math";
import particlesModel from "./model";

export default class Brownian {
  private static readonly UPDATE_RATE = 30; // hz
  private static readonly MOBILE_WIDTH_THRESHOLD = 600;
  private static readonly SPEED_FACTOR_X_DESKTOP = 2.5;
  private static readonly SPEED_FACTOR_X_MOBILE = 1.75;
  private static readonly SPEED_FACTOR_Y = -0.25;
  private static readonly RADIUS_FACTOR = 3;

  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly speedFactorX: number;
  private readonly speedFactorY: number;
  private readonly radiusFactor: number;

  constructor(canvas: HTMLCanvasElement, devicePixelRatio: number, clientWidth: number, clientHeight: number) {
    this.canvas = canvas;
    this.context = Brownian.initContext(canvas);
    this.canvas.width = clientWidth * devicePixelRatio;
    this.canvas.height = clientHeight * devicePixelRatio;

    this.speedFactorX = Brownian.initSpeedFactorX(clientWidth);
    this.speedFactorY = Brownian.SPEED_FACTOR_Y;
    this.radiusFactor = Brownian.RADIUS_FACTOR;
  }

  public draw(): void {
    this.drawInitialFrame();
  }

  private drawInitialFrame(): void {
    const delay = 1000 / Brownian.UPDATE_RATE;

    this.canvas.style.opacity = "0";
    this.canvas.style.transition = "opacity 1.5s ease";

    this.renderFrame();

    setTimeout(() => {
      requestAnimationFrame(() => this.drawSubsequentFrame());

      this.canvas.style.opacity = "1";
    }, delay);
  }

  private drawSubsequentFrame() {
    const delay = 1000 / Brownian.UPDATE_RATE;

    this.renderFrame();

    setTimeout(() => {
      requestAnimationFrame(() => this.drawSubsequentFrame());
    }, delay);
  }

  private renderFrame(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const model of particlesModel) {
      model.x += model.speedX * this.speedFactorX;
      model.y += model.speedY * this.speedFactorY;

      const canvasX = getPositiveModulo(model.x, this.canvas.width);
      const canvasY = getPositiveModulo(model.y, this.canvas.height);
      this.context.beginPath();
      this.context.arc(canvasX, canvasY, model.radius * this.radiusFactor, 0, 2 * Math.PI);
      this.context.fillStyle = `rgba(255, 255, 255, ${model.opacity})`;
      this.context.fill();
    }
  }

  private static initContext(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (context === null) {
      throw new Error(`Expected a canvas context, but received 'null'`);
    }

    return context;
  }

  private static initSpeedFactorX(clientWidth: number): number {
    const mobileWidth = clientWidth < Brownian.MOBILE_WIDTH_THRESHOLD;
    if (mobileWidth) {
      return Brownian.SPEED_FACTOR_X_MOBILE;
    }

    return Brownian.SPEED_FACTOR_X_DESKTOP;
  }
}
