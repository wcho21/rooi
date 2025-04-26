  export default class AnimationTyping {
    private static readonly INIT_TIMEOUT_HANDLE = -1; // impossible value

    private readonly text: string;
    private readonly target: HTMLElement;
    private timeoutHandle: number;
    private charIndex: number;
    private animating: boolean;
    private initialDelay: number;
    private frameDelay: number;
    private beginCallback: (() => void) | null;
    private endCallback: (() => void) | null;
    private clearCallback: (() => void) | null;

    constructor(target: HTMLElement, text: string, initialDelay?: number, frameDelay?: number) {
      this.text = text;
      this.target = target;
      this.timeoutHandle = AnimationTyping.INIT_TIMEOUT_HANDLE;
      this.charIndex = 0;
      this.animating = false;
      this.initialDelay = initialDelay ?? 100;
      this.frameDelay = frameDelay ?? 100;
      this.beginCallback = null;
      this.endCallback = null;
      this.clearCallback = null;
    }

    public animate(): void {
      this.animating = true;
      this.target.textContent = "";

      const renderFirstFrame = () => {
        this.renderFrame();
        if (this.beginCallback !== null) {
          this.beginCallback();
        }
      };
      this.timeoutHandle = window.setTimeout(renderFirstFrame, this.initialDelay);
    }

    public clear(): void {
      this.animating = false;
      this.target.textContent = "";

      window.clearTimeout(this.timeoutHandle);
      this.timeoutHandle = AnimationTyping.INIT_TIMEOUT_HANDLE;

      this.charIndex = 0;

      if (this.clearCallback !== null) {
        this.clearCallback();
      }
    }

    public onBegin(callback: () => void) {
      this.beginCallback = callback;
    }

    public onEnd(callback: () => void) {
      this.endCallback = callback;
    }

    public onClear(callback: () => void) {
      this.clearCallback = callback;
    }

    private renderFrame(): void {
      if (!this.animating) {
        return;
      }

      this.target.textContent += this.text.charAt(this.charIndex++);

      if (this.charIndex === this.text.length) {
        if (this.endCallback !== null) {
          this.endCallback();
        }
        return;
      }

      this.timeoutHandle = window.setTimeout(() => this.renderFrame(), this.frameDelay);
    }
  }