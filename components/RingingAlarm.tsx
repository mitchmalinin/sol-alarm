import { useEffect, useState } from 'react'
import { ClockIcon, MoonIcon, SunIcon, XIcon } from './icons'
import { Button } from './ui/button'

interface RingingAlarmProps {
  onStop: () => void
  onSnooze: () => void
  solAmount: number // Amount of SOL to be burned
  duration: number // Duration in seconds
}

export default function RingingAlarm({
  onStop,
  onSnooze,
  solAmount,
  duration,
}: RingingAlarmProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      ampm,
    }
  }

  const { hours, minutes, ampm } = formatTime(currentTime)
  const progress = ((duration - timeLeft) / duration) * 100
  const circumference = 2 * Math.PI * 120 // 120 is the radius of the circle

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-800"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            className="transition-all duration-1000 ease-linear text-primary"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex absolute top-0 left-0 flex-col justify-center items-center w-full h-full">
          <div className="text-5xl font-bold text-primary">
            <span>
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, '0')}
              :{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <span className="mt-2 text-2xl">
            {ampm === 'AM' ? (
              <SunIcon className="w-8 h-8 animate-pulse" />
            ) : (
              <MoonIcon className="w-8 h-8 animate-pulse" />
            )}
          </span>
        </div>
        <div className="absolute -top-4 left-1/2 px-4 py-2 rounded-full transform -translate-x-1/2 bg-background">
          <div className="flex gap-2 items-center text-lg font-semibold whitespace-nowrap text-primary">
            <ClockIcon className="w-5 h-5 animate-bounce text-primary" />
            <span>{solAmount} SOL burns in</span>
          </div>
        </div>
      </div>
      <div className="text-xl font-semibold text-secondary-foreground">
        Current time: {hours}:{minutes} {ampm}
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onSnooze}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          Snooze
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={onStop}
          className="hover:bg-red-100"
        >
          <XIcon className="mr-2 w-5 h-5 text-red-500" />
          <span className="text-red-500">Stop</span>
        </Button>
      </div>
    </div>
  )
}
