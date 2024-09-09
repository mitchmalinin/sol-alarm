import { Alarm } from '../types/alarm'
import { MoonIcon, SunIcon, TrashIcon } from './icons'
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
    <div className="mt-8 space-y-4">
      <h2 className="mb-4 text-2xl font-semibold text-primary">Alarms</h2>
      {alarms.map((alarm) => (
        <div
          key={alarm.id}
          className="flex justify-between items-center p-4 rounded-lg shadow-md bg-muted"
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary">
              {alarm.time.split(' ')[0]}
            </span>
            <span className="text-xl text-muted-foreground">
              {alarm.time.includes('AM') ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={alarm.isActive}
              onCheckedChange={() => onToggleAlarm(alarm.id)}
              className="data-[state=unchecked]:bg-gray-400"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteAlarm(alarm.id)}
              className="hover:bg-red-100"
            >
              <TrashIcon className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
