import { useState } from 'react'

interface AlarmFormProps {
  onSetAlarm: (time: string) => void
}

export default function AlarmForm({ onSetAlarm }: AlarmFormProps) {
  const [alarmTime, setAlarmTime] = useState('')

  const handleSetAlarm = () => {
    if (alarmTime) {
      onSetAlarm(alarmTime)
      setAlarmTime('')
    }
  }

  return (
    <div className="flex flex-col items-center mb-8">
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
        className="mb-4 p-3 rounded-lg text-gray-200 text-lg w-full max-w-xs bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        onClick={handleSetAlarm}
      >
        Set Alarm
      </button>
    </div>
  )
}
