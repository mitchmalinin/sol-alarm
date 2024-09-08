import React, { useCallback, useEffect, useRef } from 'react'

interface CountdownTimerProps {
  duration: number
  onComplete: () => void
  onTick: (timeLeft: number) => void
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  onComplete,
  onTick,
}) => {
  const startTimeRef = useRef<number | null>(null)
  const requestRef = useRef<number | null>(null)

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const timeLeft = Math.max(duration - elapsed / 1000, 0)

      onTick(timeLeft)

      if (timeLeft > 0) {
        requestRef.current = requestAnimationFrame(animate)
      } else {
        onComplete()
      }
    },
    [duration, onComplete, onTick]
  )

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])

  return null
}

export default CountdownTimer
