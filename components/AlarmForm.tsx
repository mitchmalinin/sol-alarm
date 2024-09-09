import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface AlarmFormProps {
  onSetAlarm: (time: string) => void
}

export default function AlarmForm({ onSetAlarm }: AlarmFormProps) {
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSetAlarm = () => {
    if (hour && minute) {
      let formattedHour = parseInt(hour)
      if (period === 'PM' && formattedHour !== 12) {
        formattedHour += 12
      } else if (period === 'AM' && formattedHour === 12) {
        formattedHour = 0
      }
      const alarmTime = `${formattedHour
        .toString()
        .padStart(2, '0')}:${minute.padStart(2, '0')}`
      onSetAlarm(alarmTime)
      setHour('')
      setMinute('')
      setPeriod('AM')
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setHour('')
    setMinute('')
    setPeriod('AM')
    setIsOpen(false)
  }

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

  const togglePeriod = () => {
    setPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'))
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-8 text-8xl font-bold text-primary">
        <div className="flex gap-4 items-center">
          <span>{hours}</span>:<span>{minutes}</span>
          <span className="text-4xl">
            {ampm === 'AM' ? (
              <SunIcon className="w-8 h-8" />
            ) : (
              <MoonIcon className="w-8 h-8" />
            )}
          </span>
        </div>
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="h-10">
            {!isOpen ? (
              <Button onClick={() => setIsOpen(true)}>Set Alarm</Button>
            ) : (
              <div className="w-[87px]" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[320px]"
          side="bottom"
          align="center"
          sideOffset={-50}
        >
          <div className="flex gap-4 p-4">
            <div className="flex flex-col flex-1 items-center space-y-2">
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <ClockIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  className="px-3 py-2 pl-10 w-full rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="12"
                  value={hour}
                  onChange={(e) => {
                    const value = e.target.value
                    if (/^(0?[1-9]|1[0-2])$/.test(value) || value === '') {
                      setHour(value)
                    }
                  }}
                />
              </div>
              <div className="text-sm text-muted-foreground">Hour</div>
            </div>
            <div className="flex flex-col flex-1 items-center space-y-2">
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <ClockIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  className="px-3 py-2 pl-10 w-full rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="00"
                  value={minute}
                  onChange={(e) => {
                    const value = e.target.value
                    if (/^[0-5]?[0-9]$/.test(value) || value === '') {
                      setMinute(value)
                    }
                  }}
                />
              </div>
              <div className="text-sm text-muted-foreground">Minute</div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePeriod}
                className="w-16 h-10"
              >
                {period === 'AM' ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </Button>
              <div className="text-sm text-muted-foreground">{period}</div>
            </div>
          </div>
          <div className="flex justify-between p-4 border-t">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSetAlarm}>Set Alarm</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
