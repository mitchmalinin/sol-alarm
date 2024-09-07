import { useCallback, useState } from 'react'
import CountdownTimer from './CountdownTimer'

interface RingingAlarmProps {
  onStop: () => void
  onSnooze: () => void
}

export default function RingingAlarm({ onStop, onSnooze }: RingingAlarmProps) {
  const [countdownTime, setCountdownTime] = useState(60)

  const handleTick = useCallback((timeLeft: number) => {
    setCountdownTime(timeLeft)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-4xl mb-6 animate-pulse text-red-500">
        Alarm!
      </div>
      <div className="relative w-64 h-64 mb-8">
        <CountdownTimer duration={60} onComplete={onStop} onTick={handleTick} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex flex-col items-center justify-center shadow-lg">
            <span className="text-2xl md:text-3xl font-bold text-white text-center">
              1 SOL
            </span>
            <span className="text-xl md:text-2xl font-bold text-white text-center">
              burns in
            </span>
            <span className="text-3xl md:text-4xl font-bold text-white text-center mt-2">
              {countdownTime}s
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          onClick={onStop}
        >
          Stop
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          onClick={onSnooze}
        >
          Snooze
        </button>
      </div>
    </div>
  )
}
