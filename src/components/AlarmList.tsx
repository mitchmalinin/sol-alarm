import { Alarm } from '../types/alarm'
import { formatTime } from '../utils/timeUtils'
import Switch from './ui/Switch'

interface AlarmListProps {
  alarms: Alarm[]
  onDeleteAlarm: (id: string) => void
  onToggleAlarm: (id: string) => void
}

export default function AlarmList({
  alarms,
  onDeleteAlarm,
  onToggleAlarm,
}: AlarmListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">Alarms</h2>
      {alarms.map((alarm) => (
        <div
          key={alarm.id}
          className="flex items-center justify-between bg-gray-700 rounded-lg p-4 shadow-md"
        >
          <span className="text-xl text-gray-200">
            {formatTime(alarm.time)}
          </span>
          <div className="flex items-center space-x-2">
            <Switch
              checked={alarm.isActive}
              onCheckedChange={() => onToggleAlarm(alarm.id)}
            />
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition duration-300"
              onClick={() => onDeleteAlarm(alarm.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
