import { LottieOptions, useLottie } from "lottie-react"
import React from "react"

import loadingAnimation from "./loader.json"

const animationOptions: LottieOptions = {
  animationData: loadingAnimation,
  loop: true
}

interface LoadingAnimationProps {
  className?: string
  style?: React.CSSProperties
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  className,
  style
}) => {
  const { View } = useLottie(animationOptions)

  return (
    <div className={className} style={style}>
      {View}
    </div>
  )
}

const LoadingAnimationMemo = React.memo(LoadingAnimation)
export { LoadingAnimationMemo as LoadingAnimation }
