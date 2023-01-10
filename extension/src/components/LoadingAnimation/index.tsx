import { LottieOptions, useLottie } from "lottie-react";
import React, { useEffect } from "react";

import loadingAnimation from "./loader.json";

const animationOptions: LottieOptions = {
  animationData: loadingAnimation,
  loop: true,
};

interface LoadingAnimationProps {
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  className,
  style,
  animate = true,
}) => {
  const { View, play, pause } = useLottie(animationOptions);
  useEffect(() => {
    if (animate) {
      play();
    } else {
      pause();
    }
  }, [animate, play, pause]);

  return (
    <div className={className} style={style}>
      {View}
    </div>
  );
};

const LoadingAnimationMemo = React.memo(LoadingAnimation);
export { LoadingAnimationMemo as LoadingAnimation };
