import anime from "animejs";

export interface FLIPParams {
  duration?: number;
  easing?: string;
}

export interface FLIPAnimation {
  play: (option?: { promisify: boolean }) => Promise<void>;
}

export const FLIP = (
  el: HTMLElement,
  oldPos: DOMRect,
  params?: FLIPParams
): FLIPAnimation => {
  const options: FLIPParams = {
    duration: 800,
    easing: "easeOutExpo",
    ...params
  };

  const newFlagPos: DOMRect = el.getBoundingClientRect();

  const dx = oldPos.x - newFlagPos.x;
  const dy = oldPos.y - newFlagPos.y;
  const dw = oldPos.width / newFlagPos.width;
  const dh = oldPos.height / newFlagPos.height;

  const play = (opts?: { promisify: boolean }) => {
    const animation = anime({
      targets: el,
      translateX: [dx, 0],
      translateY: [dy, 0],
      scaleX: [dw, 1],
      scaleY: [dh, 1],
      duration: options.duration,
      easing: options.easing
    });

    return opts && opts.promisify ? animation.finished : animation;
  };
  return <FLIPAnimation>{
    play
  };
};
