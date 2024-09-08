import React, { useEffect, useRef, useState } from 'react'
import CountdownTimer from './CountdownTimer'

interface RingingAlarmProps {
  onStop: () => void
  onSnooze: () => void
}

const RingingAlarm: React.FC<RingingAlarmProps> = React.memo(
  ({ onStop, onSnooze }) => {
    const [countdownTime, setCountdownTime] = useState(60)
    const progressRef = useRef<SVGCircleElement>(null)
    const duration = 60
    const circumference = 2 * Math.PI * 120

    const handleTick = (timeLeft: number) => {
      setCountdownTime(Math.ceil(timeLeft))
      const progress = (1 - timeLeft / duration) * 100
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(
          circumference * (progress / 100)
        )
      }
    }

    useEffect(() => {
      const fireEffect = document.createElement('div')
      fireEffect.className = 'fire-effect'
      document.querySelector('.clock-content')?.appendChild(fireEffect)

      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = '0'
      }

      return () => {
        fireEffect.remove()
      }
    }, [])

    return (
      <div className="flex flex-col items-center w-full max-w-sm">
        <div className="mb-6 text-3xl text-red-500 animate-pulse md:text-4xl">
          Alarm!
        </div>
        <div className="relative mb-8 w-64 h-64">
          <svg className="w-full h-full rotate-90">
            <defs>
              <linearGradient
                id="fireGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FF0000" />
              </linearGradient>
            </defs>
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#4B5563"
              strokeWidth="8"
              fill="none"
            />
            <circle
              ref={progressRef}
              cx="128"
              cy="128"
              r="120"
              stroke="url(#fireGradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset="0"
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.1s linear',
              }}
            />
          </svg>
          <div className="flex absolute top-0 left-0 justify-center items-center w-full h-full">
            <div className="flex overflow-hidden flex-col justify-center items-center w-56 h-56 bg-gray-800 rounded-full shadow-lg clock-content">
              <span className="text-2xl font-bold text-center text-white md:text-3xl">
                1 SOL
              </span>
              <span className="text-xl font-bold text-center text-white md:text-2xl">
                burns in
              </span>
              <span className="mt-2 text-3xl font-bold text-center text-white md:text-4xl">
                {countdownTime}s
              </span>
            </div>
          </div>
        </div>
        <CountdownTimer
          duration={duration}
          onComplete={onStop}
          onTick={handleTick}
        />
        <div className="flex mt-4 space-x-4">
          <button
            className="px-6 py-2 text-lg text-white bg-red-600 rounded-full shadow-md transition duration-300 ease-in-out transform hover:bg-red-700 hover:scale-105"
            onClick={onStop}
          >
            Stop
          </button>
          <button
            className="px-6 py-2 text-lg text-white bg-blue-600 rounded-full shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            onClick={onSnooze}
          >
            Snooze
          </button>
        </div>
      </div>
    )
  }
)

RingingAlarm.displayName = 'RingingAlarm'

export default RingingAlarm
