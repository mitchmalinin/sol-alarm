'use client'

import { useAlarms } from '../hooks/useAlarms'

import AlarmForm from './AlarmForm'
import AlarmList from './AlarmList'
import RingingAlarm from './RingingAlarm'

export default function AlarmClock() {
  const {
    alarms,
    addAlarm,
    deleteAlarm,
    snoozeAlarm,
    stopAlarm,
    isAlarmRinging,
    ringingAlarmId,
    toggleAlarm,
  } = useAlarms()

  const formatTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(':')
    let hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour ? hour : 12 // the hour '0' should be '12'
    return `${hour}:${minutes} ${ampm}`
  }

  const formattedAlarms = alarms.map((alarm) => ({
    ...alarm,
    time: formatTo12Hour(alarm.time),
  }))

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full min-h-screen bg-background">
      <div className="p-8 w-full max-w-md rounded-3xl shadow-lg bg-card">
        {isAlarmRinging ? (
          <RingingAlarm
            onStop={stopAlarm}
            onSnooze={() => ringingAlarmId && snoozeAlarm(ringingAlarmId)}
          />
        ) : (
          <>
            <AlarmForm onSetAlarm={addAlarm} />
            <AlarmList
              alarms={formattedAlarms}
              onDeleteAlarm={deleteAlarm}
              onToggleAlarm={toggleAlarm}
            />
          </>
        )}
      </div>
    </div>
  )
}
