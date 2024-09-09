import { Alarm } from '../types/alarm'
import { formatTime } from '../utils/timeUtils'
import { Button } from './ui/button'
import { Switch } from './ui/switch'

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
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">Alarms</h2>
      {alarms.map((alarm) => (
        <div
          key={alarm.id}
          className="flex justify-between items-center p-4 bg-gray-700 rounded-lg shadow-md"
        >
          <span className="text-xl text-gray-200">
            {formatTime(alarm.time)}
          </span>
          <div className="flex items-center space-x-2">
            <Switch
              checked={alarm.isActive}
              onCheckedChange={() => onToggleAlarm(alarm.id)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeleteAlarm(alarm.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
