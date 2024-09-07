'use client'

import { useEffect, useState } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState(60)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (seconds === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, seconds])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setSeconds(60)
    setIsActive(false)
  }

  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold mb-2">1 Minute Timer</h3>
      <div className="text-3xl font-bold mb-4">{seconds}s</div>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-full ${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white transition duration-300`}
          onClick={toggleTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition duration-300"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
