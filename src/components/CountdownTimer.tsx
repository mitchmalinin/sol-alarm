import React, { useEffect, useState } from 'react'

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
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1
        onTick(newTime)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onComplete, onTick])

  return (
    <div className="w-full h-full rounded-full border-4 border-blue-500">
      <div
        className="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-linear"
        style={{ width: `${(timeLeft / duration) * 100}%` }}
      ></div>
    </div>
  )
}

export default CountdownTimer
